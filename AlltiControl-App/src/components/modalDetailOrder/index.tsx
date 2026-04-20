import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Linking,
  Image,
  Alert,
  Platform,
  Modal
} from "react-native";
import { ScrollComIndicador } from "../ScrollComIndicador";
import { OrdensDeServico } from "../../pages/Dashboard";
import { MaterialIcons } from "@expo/vector-icons";
import { ModalDetailOrderFormTecnico } from "../modalDetailOrderFormTecnico";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../services/api";
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from "expo-image-picker";


interface ModalDetailOsProps {
  ordem: OrdensDeServico | null;
  handleCloseModal: () => void;
}

interface Setor {
  id: string;
  usuario: string;
  ramal: string;
  andar: string;
  setor: {
    id: string;
    name: string;
  };
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const IMAGE_SIZE = (WIDTH - 90) / 3;

export function ModalDetailOrder({ ordem, handleCloseModal }: ModalDetailOsProps) {
  const [modalTecnicoOpen, setModalTecnicoOpen] = useState(false);
  const [ordemAtual, setOrdemAtual] = useState<OrdensDeServico | null>(ordem);
  const [selectedImages, setSelectedImages] = useState<{ uri: string; base64: string }[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [time, setTime] = useState(0);
  const [assinatura, setAssinatura] = useState<string | null>(null);
  const [retomarSuccess, setRetomarSuccess] = useState(false);

const formatTime = (seconds: number) => {
  const totalSeconds = seconds < 0 ? 0 : seconds;

  const h = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");
  const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  
  return `${h}:${m}:${s}`;
};

useEffect(() => {
  // Correção Erro 1: Usando 'any' para evitar conflito NodeJS.Timeout vs number
  let interval: any = null;

  if (isRunning && !isPaused) {
    setLastUpdate(new Date());
    interval = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
  } else {
    if (interval) clearInterval(interval);
  }

  return () => {
    if (interval) clearInterval(interval);
  };
}, [isRunning, isPaused]);

useEffect(() => {
  if (ordemAtual?.startedAt) setHasStarted(true);
}, [ordemAtual]);


  if (!ordemAtual) return null;

  const endereco = ordemAtual.cliente?.endereco ?? ordemAtual.instituicaoUnidade?.endereco ?? "";

  const abrirWaze = (endereco: string) => {
    const url = `https://waze.com/ul?q=${encodeURIComponent(endereco)}`;
    Linking.canOpenURL(url).then(supported => supported ? Linking.openURL(url) : Alert.alert("Erro", "Não foi possível abrir o Waze."));
  };

  const abrirGoogleMaps = (endereco: string) => {
    // Correção Erro URL: Corrigido o protocolo e a interpolação
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
    Linking.openURL(url);
  };

  const atualizarOrdem = () => setOrdemAtual({ ...ordemAtual });

  const fetchAssinatura = async (ordemId: string) => {
    try {
      const storageToken = await AsyncStorage.getItem("@AlltiService");
      if (!storageToken) return;
      const { token } = JSON.parse(storageToken);

      const response = await api.get(`/assinatura/${ordemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssinatura(response.data?.bannerassinatura ?? null);
    } catch (err) {
      console.error("Erro ao buscar assinatura:", err);
    }
  };

const fetchTempo = async (ordemId: string) => {
  try {
    const storageToken = await AsyncStorage.getItem("@AlltiService");
    if (!storageToken) return;

    const { token } = JSON.parse(storageToken);

    const response = await api.get(`/ordemdeservico/tempo/${ordemId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { startedAt, endedAt } = response.data;

    if (!startedAt) return;

    const startedAtDate = new Date(startedAt);
    const endedAtDate = endedAt ? new Date(endedAt) : null;

    const diffSeconds = endedAtDate
      ? Math.floor((endedAtDate.getTime() - startedAtDate.getTime()) / 1000)
      : Math.floor((Date.now() - startedAtDate.getTime()) / 1000);

    setTime(diffSeconds > 0 ? diffSeconds : 0);
    setIsRunning(!endedAtDate);

    setOrdemAtual((prev) =>
      prev
        ? {
            ...prev,
            startedAt,
            endedAt,
          }
        : prev
    );
  } catch (error) {
    console.error("Erro ao buscar tempo da OS:", error);
  }
};

    useEffect(() => {
    if (ordemAtual?.id) {
      fetchAssinatura(ordemAtual.id);
      fetchTempo(ordemAtual.id); 
    }
  }, [ordemAtual?.id]); // Correção: Dependência específica do ID

  const enviarAssinatura = async (base64: string) => {
    try {
      const storageToken = await AsyncStorage.getItem("@AlltiService");
      if (!storageToken) return;
      const { token } = JSON.parse(storageToken);

      await api.patch(`/assinatura/${ordemAtual!.id}`, { assinatura: base64 }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Alert.alert("Sucesso", "Assinatura salva!");
      setAssinatura(base64);
    } catch (err) {
      console.error("Erro ao salvar assinatura:", err);
      Alert.alert("Erro", "Não foi possível salvar a assinatura.");
    }
  };

  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return Alert.alert("Permissão negada", "Habilite o acesso às fotos.");

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const imagesWithBase64 = result.assets.map(asset => ({
        uri: asset.uri,
        base64: `data:${asset.type};base64,${asset.base64}`,
      }));
      setSelectedImages([...selectedImages, ...imagesWithBase64]);
    }
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") return Alert.alert("Permissão negada", "Habilite o acesso à câmera.");

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const imagesWithBase64 = result.assets.map(asset => ({
        uri: asset.uri,
        base64: `data:${asset.type};base64,${asset.base64}`,
      }));
      setSelectedImages([...selectedImages, ...imagesWithBase64]);
    }
  };

  const removeImage = (index: number) => setSelectedImages(selectedImages.filter((_, i) => i !== index));

  const isJaConcluida = ordemAtual?.statusOrdemdeServico?.name?.trim().toUpperCase() === "CONCLUIDA";

  const handleFinalizarEEnviar = async () => {
  await uploadImages();

  if (!isJaConcluida) {
    await handleCloseAndComplete();
  } else {
    Alert.alert("Sucesso", "Novas imagens enviadas para esta OS já concluída.");
  }
};

const uploadImages = async () => {
  if (selectedImages.length === 0) {
    return Alert.alert("Atenção", "Selecione pelo menos uma imagem.");
  }

  try {
    for (let i = 0; i < selectedImages.length; i++) {
      const img = selectedImages[i]; 

      const manipResult = await ImageManipulator.manipulateAsync(
        img.uri,
        [{ resize: { width: 1920 } }], 
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG } 
      );

      const formData = new FormData();
      formData.append("ordemdeServico_id", ordemAtual.id);
      formData.append("file", {
        uri: Platform.OS === 'android' ? manipResult.uri : manipResult.uri.replace('file://', ''),
        name: `foto_${i}_${Date.now()}.jpg`,
        type: "image/jpeg",
      } as any);

      await api.post(`/foto`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 30000,
      });
    }

    Alert.alert( 
      "Operação concluída",
      "A ordem de serviço foi finalizada com sucesso.");
    setSelectedImages([]);

  } catch (err: any) {
    console.error("Erro no upload:", err.response?.data || err.message);
    Alert.alert("Erro", "Falha ao enviar uma ou mais imagens.");
  }
};

const refreshOrdemAtual = async () => {
  if (!ordemAtual?.id) return; 
  try {
    const storageToken = await AsyncStorage.getItem("@AlltiService");
    if (!storageToken) return;
    const { token } = JSON.parse(storageToken);

    const { data } = await api.get(`/ordemdeservico/${ordemAtual.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setOrdemAtual(data); 

  } catch (error) {
    console.error("Erro ao buscar OS atualizada:", error);
  }
};

const takePhoto = async () => {
  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    quality: 0.7, 
    base64: true, 
  });

  if (!result.canceled && result.assets[0]) {
    const asset = result.assets[0];
    const newImage = {
      uri: asset.uri,
      base64: asset.base64 ?? "", 
    };

    setSelectedImages((prev) => [...prev, newImage]);
  }
};

const handleStart = async () => {
  try {
    const storageToken = await AsyncStorage.getItem("@AlltiService");
    if (!storageToken) return;
    const { token } = JSON.parse(storageToken);

    await api.patch(
      `/ordemdeservico/iniciar/${ordemAtual.id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    await refreshOrdemAtual();

    setIsRunning(true);
    setIsPaused(false);
     setHasStarted(true);

  } catch (error) {
    console.error("Erro ao iniciar OS:", error);
  }
};

useEffect(() => {
  if (!ordem?.id) return;

  let isMounted = true; 

  const fetchOrdemAtualizada = async () => {
    try {
      const storageToken = await AsyncStorage.getItem("@AlltiService");
      if (!storageToken) return;
      const { token } = JSON.parse(storageToken);
      
      const response = await api.get(`/ordemdeservico/${ordem.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (isMounted) {
        setOrdemAtual(response.data);
        fetchAssinatura(ordem.id);
        fetchTempo(ordem.id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  fetchOrdemAtualizada();

  return () => { isMounted = false; };
}, [ordem?.id]); 

const handlePause = async () => {
  if (!ordemAtual?.id) return;

  try {
    const storageToken = await AsyncStorage.getItem("@AlltiService");
    if (!storageToken) return;
    const { token } = JSON.parse(storageToken);

    const payload = { endedAt: new Date().toISOString() };

    await api.patch(
      `/ordemdeservico/pausar/${ordemAtual.id}`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setIsRunning(false);
    setIsPaused(true);

    await refreshOrdemAtual();

  } catch (error: any) {
    Alert.alert("Erro", "Não foi possível pausar a OS.");
  }
};


const handleResume = async () => {
  if (!ordemAtual?.id) return;

  try {
    const storageToken = await AsyncStorage.getItem("@AlltiService");
    if (!storageToken) return;
    const { token } = JSON.parse(storageToken);

    await api.patch(
      `/ordemdeservico/retomar/${ordemAtual.id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setIsPaused(false);
    setIsRunning(true);
    setRetomarSuccess(true);

    Alert.alert("Ordem retomada", "A contagem de tempo foi retomada com sucesso.");

    setTimeout(async () => {
      await refreshOrdemAtual();
    }, 500);
  } catch (error: any) {
    Alert.alert("Erro", "Não foi possível retomar a OS.");
  }
};

const handleCloseAndComplete = async () => {
  try {
    const storageToken = await AsyncStorage.getItem("@AlltiService");
    if (!storageToken) return;
    const { token } = JSON.parse(storageToken);

    await api.patch(
      `/ordemdeservico/concluir/${ordemAtual.id}`, 
      {
        statusOrdemdeServico_id: '80e14fbe-c7fd-45bc-b3cd-cfa51ede44e0' 
      }, 
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    await refreshOrdemAtual();
    handleCloseModal();

    Alert.alert("Sucesso", "Ordem de Serviço concluída com sucesso!");
    
  } catch (error) {
    console.error("Erro ao concluir OS:", error);
    Alert.alert("Erro", "Não foi possível concluir a OS.");
  }
};
const isDisabled = selectedImages.length === 0;

  return (
    <>
   <TouchableOpacity
     activeOpacity={1}
     style={styles.overlay}
     onPress={handleCloseModal}
  />
    <View style={styles.modalContainer}>
      <ScrollComIndicador>
        
        <View style={styles.header}>
          <Text style={styles.title}>Detalhes da Ordem</Text>
          <TouchableOpacity onPress={atualizarOrdem} style={styles.refreshIcon}>
            <MaterialIcons name="refresh" size={24} color="#0F1431" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCloseModal} style={styles.closeIcon}>
            <MaterialIcons name="close" size={24} color="#0F1431" />
          </TouchableOpacity>
        </View>

        
        {ordemAtual.informacoesSetor && (
      <View style={{ marginTop: 20 }}>
      <Text style={styles.label}>Local do Chamado: </Text>
      
        {ordemAtual?.informacoesSetor?.instituicaoUnidade?.name ? (
          <Text>{ordemAtual.informacoesSetor.instituicaoUnidade.name}</Text>
          ) : ordemAtual?.informacoesSetor?.cliente?.name ? (
          <Text>{ordemAtual.informacoesSetor.cliente.name}</Text>
          ) : (
          <Text>Não informado</Text>
          )}
      
          <Text style={styles.label}>
          Informações do usuário que solicitou o chamado
          </Text>
                        
            <Text>Setor: {ordemAtual.informacoesSetor.setor.name}</Text>
            <Text>Usuário: {ordemAtual.informacoesSetor.usuario}</Text>
            <Text>Ramal: {ordemAtual.informacoesSetor.ramal}</Text>
          <Text>Andar: {ordemAtual.informacoesSetor.andar}</Text>
            </View>
            )}

        <Text style={styles.label}>Número: {ordemAtual.numeroOS ?? "Não Disponível"}</Text>
        <Text style={styles.label}>Status:</Text>
        <Text>{ordemAtual.statusOrdemdeServico?.name ?? "-"}</Text>
        <Text style={styles.label}>Quem abriu a OS:</Text>
        <Text>{ordemAtual.name}</Text>

        {ordemAtual.user?.cliente ? (
          <>
            <Text style={styles.label}>Empresa:</Text>
            <Text>{ordemAtual.user.cliente.name}</Text>
            <Text style={styles.label}>Endereço:</Text>
            <Text>{ordemAtual.user.cliente.endereco}</Text>
          </>
        ) : ordemAtual.instituicaoUnidade ? (
          <>
            <Text style={styles.label}>Instituição:</Text>
            <Text>{ordemAtual.instituicaoUnidade.name}</Text>
            <Text style={styles.label}>Endereço:</Text>
            <Text>{ordemAtual.instituicaoUnidade.endereco}</Text>
          </>
        ) : (
          <>
            <Text style={styles.label}>Endereço:</Text>
            <Text>-</Text>
          </>
        )}

        {endereco && (
          <>
            <TouchableOpacity style={[styles.buttonClose, styles.buttonNavigation]} onPress={() => abrirWaze(endereco)}>
              <View style={styles.buttonContent}>
                <MaterialIcons name="navigation" size={20} color="#FFF" />
                <Text style={styles.textButtonClose}>ABRIR NO WAZE</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonClose, styles.buttonNavigation]} onPress={() => abrirGoogleMaps(endereco)}>
              <View style={styles.buttonContent}>
                <MaterialIcons name="map" size={20} color="#FFF" />
                <Text style={styles.textButtonClose}>ABRIR NO GOOGLE MAPS</Text>
              </View>
            </TouchableOpacity>
          </>
        )}
        <View style={styles.timerContainer}>                
    <Text style={styles.timerText}>Tempo decorrido: {formatTime(time)}</Text>

    {!isRunning && ordemAtual?.statusOrdemdeServico?.name?.trim().toUpperCase() === "PAUSADA" && (
    <>
    <TouchableOpacity
      style={[styles.buttonClose, styles.timerBtnReset]}
      onPress={async () => {
        await handleResume();
        setIsRunning(true); 
      }}
      >
      <Text style={styles.textButtonClose}>
        {retomarSuccess ? "OS Retomada!" : "Retomar"}
      </Text>
      </TouchableOpacity>
        </>
    )}


    <View style={styles.timerButtons}>
    {!isRunning && !isPaused && !hasStarted && (
      <TouchableOpacity
        style={[styles.buttonClose, styles.timerBtn]}
        onPress={handleStart}
      >
        <Text style={styles.textButtonClose}>Iniciar</Text>
      </TouchableOpacity>
    )}

    {isRunning && (
      <TouchableOpacity
        style={[styles.buttonClose, styles.timerBtnPause]}
        onPress={handlePause}
      >
        <Text style={styles.textButtonClose}>Pausar</Text>
      </TouchableOpacity>
    )}

      {!isRunning && isPaused && (
        <TouchableOpacity
          style={[styles.buttonClose, styles.timerBtnReset]}
          onPress={async () => {
            await handleResume();
            setTimeout(() => {
              setIsRunning(true);
              setIsPaused(false);
            }, 300);
          }}
        >
          <Text style={styles.textButtonClose}>Retomar</Text>
        </TouchableOpacity>
      )}
    </View>
</View>
            <Text style={styles.label}>Tipo de Chamado:</Text>
            <Text>{ordemAtual.tipodeChamado?.name ?? "-"}</Text>
            <Text style={styles.label}>Problema:</Text>
            <Text>{ordemAtual.descricaodoProblemaouSolicitacao}</Text>
            
            <Text style={styles.label}>Início da OS:</Text>
              <Text>
                {ordemAtual?.startedAt
                  ? new Date(ordemAtual.startedAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
                  : "-"}
              </Text>

            <Text style={styles.label}>Assinatura:</Text>
            {assinatura && (
              <Image source={{ uri: assinatura }} style={{ width: 300, height: 230, marginTop: 5, borderWidth: 1 }} />
            )}

             <TouchableOpacity style={styles.buttonClose} onPress={() => setModalTecnicoOpen(true)}>
              <View style={styles.buttonContent}>
                <MaterialIcons name="description" size={20} color="#FFF" />
                <Text style={styles.textButtonClose}>ADICIONAR DESCRIÇÃO TÉCNICA</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonClose} onPress={takePhoto}>
              <View style={styles.buttonContent}>
                <MaterialIcons name="photo-camera" size={20} color="#FFF" />
                <Text style={styles.textButtonClose}>TIRAR FOTO</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonClose} onPress={pickImages}>
              <View style={styles.buttonContent}>
                <MaterialIcons name="photo-library" size={20} color="#FFF" />
                <Text style={styles.textButtonClose}>SELECIONAR IMAGENS</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.gridImages}>
              {selectedImages.map((img, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image source={{ uri: img.uri }} style={styles.imageItem} />
                  <TouchableOpacity style={styles.removeButton} onPress={() => removeImage(index)}>
                    <MaterialIcons name="close" size={16} color="#FFF" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

           <TouchableOpacity
          style={[
            styles.buttonClose,
            isJaConcluida ? { backgroundColor: '#555' } : styles.buttonComplete, 
            isDisabled && styles.buttonDisabled,
          ]}
          disabled={isDisabled}
          onPress={handleFinalizarEEnviar}
        >
          <View style={styles.buttonContent}>
            <MaterialIcons name="check-circle" size={20} color="#FFF" />
            <Text style={styles.textButtonClose}>
              {isJaConcluida ? "ENVIAR MAIS IMAGENS" : "CONCLUIR OS"}
            </Text>
          </View>
        </TouchableOpacity>

          </ScrollComIndicador>
        </View>

        <Modal
          visible={modalTecnicoOpen} 
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalTecnicoOpen(false)}
        >
          <ModalDetailOrderFormTecnico 
            ordemId={ordemAtual.id} 
            tempoFinal={time} 
            handleCloseModal={() => setModalTecnicoOpen(false)} 
          />
        </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)" },
  modalContainer: {
    width: WIDTH,
    maxHeight: HEIGHT * 0.95,
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 15,
  },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  title: { fontSize: 20, fontWeight: "bold" },
  refreshIcon: { left: 40 },
  closeIcon: { right: 4 },
  label: { marginTop: 10, fontWeight: "bold" },
  buttonClose: { marginTop: 20, backgroundColor: "#4E3182", padding: 12, borderRadius: 8, alignItems: "center" },
  buttonContent: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
  textButtonClose: { color: "#FFF", fontWeight: "bold", marginLeft: 8 },
  buttonNavigation: { backgroundColor: "#4E3182" },
  buttonDisabled: { backgroundColor: "#9CA3AF", opacity: 0.6 },
  timerContainer: { marginVertical: 15, alignItems: "center" },
  timerText: { fontSize: 16, fontWeight: "bold" },
  timerButtons: { flexDirection: "row", marginTop: 10 },
  timerBtn: { marginRight: 10, backgroundColor: "#4E3182" },
  timerBtnPause: { marginRight: 10, backgroundColor: "#888" },
  timerBtnReset: { backgroundColor: "#555" },
  gridImages: { flexDirection: "row", flexWrap: "wrap", marginTop: 10 },
  imageWrapper: { width: IMAGE_SIZE, height: IMAGE_SIZE, marginRight: 10, marginBottom: 10, position: "relative" },
  imageItem: { width: "100%", height: "100%", borderRadius: 8 },
  removeButton: { position: "absolute", top: 5, right: 5, backgroundColor: "rgba(0,0,0,0.6)", borderRadius: 12, padding: 2, zIndex: 10 },
  buttonComplete: { backgroundColor: "green" },
});