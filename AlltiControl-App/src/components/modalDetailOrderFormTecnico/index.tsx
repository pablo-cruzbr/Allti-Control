import React, { useState, useRef, useEffect, ReactElement } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  Alert
} from 'react-native';
import { api } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignatureScreen, { SignatureViewRef } from 'react-native-signature-canvas';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

interface Atividade {
  id: string;
  descricao: string;
}

interface ModalDetailOrderTecnicoProps {
  ordemId: string;
  handleCloseModal: () => void;
}

// Usando um fallback caso o Dimensions falhe no primeiro render
const SCREEN_WIDTH = Dimensions.get('window').width || 300;

export function ModalDetailOrderFormTecnico({
  ordemId,
  handleCloseModal,
}: ModalDetailOrderTecnicoProps): ReactElement {
  const [nameTecnico, setNameTecnico] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [solucao, setSolucao] = useState('');
  const [assinante, setAssinante] = useState('');
  
  // IMPORTANTE: Inicializar sempre como array vazio
  const [atividadesDB, setAtividadesDB] = useState<Atividade[]>([]);
  const [selectedAtividadeId, setSelectedAtividadeId] = useState('');

  const [signature, setSignature] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const signatureRef = useRef<SignatureViewRef>(null);

  useEffect(() => {
    async function loadAtividades() {
      try {
        const response = await api.get('/listatividade');
        // Verificação extra de segurança
        if (response.data && Array.isArray(response.data)) {
          setAtividadesDB(response.data);
        }
      } catch (error) {
        console.error("Erro ao carregar lista de atividades:", error);
      }
    }
    loadAtividades();
  }, []);

  const handleSignature = (sig: string) => setSignature(sig);
  
  const handleClear = () => {
    signatureRef.current?.clearSignature();
    setSignature(null);
  };

  const handleSubmit = async () => {
    if (!signature) {
      Alert.alert('Assinatura Pendente', 'Por favor, confirme a assinatura digital.');
      return;
    }

    try {
      setLoading(true);
      const storageToken = await AsyncStorage.getItem('@AlltiService');
      if (!storageToken) return;
      const { token } = JSON.parse(storageToken);

      await api.patch(
        `/assinatura/${ordemId}`,
        { assinaturaBase64: signature },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await api.patch(
        `/ordemdeservico/update/${ordemId}`,
        {
          nameTecnico,
          diagnostico,
          solucao,
          assinante,
          atividades_ids: selectedAtividadeId ? [selectedAtividadeId] : [],
          statusOrdemdeServico_id: '80e14fbe-c7fd-45bc-b3cd-cfa51ede44e0',
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Alert.alert('Sucesso', 'Ordem de serviço finalizada!');
      handleCloseModal();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Houve um problema ao salvar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.overlay}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1, width: '100%' }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          keyboardShouldPersistTaps="handled"
        >
          {/* Ajuste na largura para garantir renderização */}
          <View style={[styles.container, { width: SCREEN_WIDTH - 40, alignSelf: 'center' }]}>
            
            <View style={styles.header}>
              <Text style={styles.title}>Finalizar Chamado</Text>
              <TouchableOpacity onPress={handleCloseModal}>
                <MaterialIcons name="close" size={26} color="#4E3182" />
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder="Nome do Técnico"
              style={styles.input}
              value={nameTecnico}
              onChangeText={setNameTecnico}
            />

            <Text style={styles.label}>Atividade Principal:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedAtividadeId}
                onValueChange={(itemValue) => setSelectedAtividadeId(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Selecione uma opção..." value="" />
                {atividadesDB?.map((atv) => (
                  <Picker.Item key={atv.id} label={atv.descricao} value={atv.id} />
                ))}
              </Picker>
            </View>

            <TextInput
              placeholder="Diagnóstico"
              style={[styles.input, styles.textArea]}
              value={diagnostico}
              onChangeText={setDiagnostico}
              multiline
            />
            
            <TextInput
              placeholder="Solução"
              style={[styles.input, styles.textArea]}
              value={solucao}
              onChangeText={setSolucao}
              multiline
            />

            <TextInput
              placeholder="Assinante"
              style={styles.input}
              value={assinante}
              onChangeText={setAssinante}
            />

            <View style={styles.signatureContainer}>
              <SignatureScreen
                ref={signatureRef}
                onOK={handleSignature}
                descriptionText="Assinatura Digital"
                webStyle={`.m-signature-pad--footer {display: none; margin: 0px;}`}
              />
            </View>

            <View style={styles.signatureButtons}>
              <TouchableOpacity style={styles.buttonSecondary} onPress={handleClear}>
                <Text style={styles.buttonText}>Limpar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonSecondary}
                onPress={() => signatureRef.current?.readSignature()}
              >
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.buttonPrimary, loading && { opacity: 0.7 }]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>FINALIZAR ORDEM</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingVertical: 60,
  },
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#4E3182'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 15,
    backgroundColor: '#fdfdfd'
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden'
  },
  picker: {
    height: 50,
    width: '100%',
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
  signatureContainer: {
    height: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    borderRadius: 8,
    overflow: 'hidden'
  },
  signatureButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buttonPrimary: {
    backgroundColor: '#4E3182',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: '#6c757d',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '48%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14
  },
});