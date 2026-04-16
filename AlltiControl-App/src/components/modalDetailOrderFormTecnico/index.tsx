import React, { useState, useRef, useEffect, ReactElement } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ActivityIndicator, KeyboardAvoidingView, Platform,
  ScrollView, Dimensions, Alert
} from 'react-native';
import { api } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignatureScreen, { SignatureViewRef } from 'react-native-signature-canvas';
import { MaterialIcons } from '@expo/vector-icons';
import { MultiSelect } from 'react-native-element-dropdown'; // Nova Lib

interface Atividade {
  id: string;
  descricao: string;
}

interface ModalDetailOrderTecnicoProps {
  ordemId: string;
  handleCloseModal: () => void;
}

const SCREEN_WIDTH = Dimensions.get('window').width || 300;

export function ModalDetailOrderFormTecnico({
  ordemId,
  handleCloseModal,
}: ModalDetailOrderTecnicoProps): ReactElement {
  const [nameTecnico, setNameTecnico] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [solucao, setSolucao] = useState('');
  const [assinante, setAssinante] = useState('');
  
  const [atividadesDB, setAtividadesDB] = useState<Atividade[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const [signature, setSignature] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const signatureRef = useRef<SignatureViewRef>(null);

  useEffect(() => {
    async function loadAtividades() {
      try {
        const response = await api.get('/listatividade');
        if (response.data) setAtividadesDB(response.data);
      } catch (error) {
        console.error("Erro ao carregar atividades:", error);
      }
    }
    loadAtividades();
  }, []);

  const handleSubmit = async () => {
    if (!signature) {
      Alert.alert('Assinatura', 'Por favor, confirme a assinatura digital.');
      return;
    }

    try {
      setLoading(true);
      const storageToken = await AsyncStorage.getItem('@AlltiService');
      if (!storageToken) return;
      const { token } = JSON.parse(storageToken);

      // Envio para o Backend
      await api.patch(
        `/ordemdeservico/update/${ordemId}`,
        {
          nameTecnico,
          diagnostico,
          solucao,
          assinante,
          atividades_ids: selectedItems, 
          statusOrdemdeServico_id: '80e14fbe-c7fd-45bc-b3cd-cfa51ede44e0',
          assinaturaBase64: signature
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Alert.alert('Sucesso', 'Ordem finalizada!');
      handleCloseModal();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar os dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.overlay}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={[styles.container, { width: SCREEN_WIDTH - 40, alignSelf: 'center' }]}>
            
            <View style={styles.header}>
              <Text style={styles.title}>Finalizar Chamado</Text>
              <TouchableOpacity onPress={handleCloseModal}>
                <MaterialIcons name="close" size={26} color="#4E3182" />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Atividades Realizadas</Text>
            <MultiSelect
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={atividadesDB}
              labelField="descricao"
              valueField="id"
              placeholder="Selecione as atividades..."
              value={selectedItems}
              search
              searchPlaceholder="Pesquisar..."
              onChange={item => setSelectedItems(item)}
              selectedStyle={styles.selectedStyle}
              activeColor="#f2f0f7"
            />

            <Text style={styles.label}>Diagnóstico</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={diagnostico}
              onChangeText={setDiagnostico}
              multiline
              placeholder="Relato técnico..."
            />

            <Text style={styles.label}>Solução</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={solucao}
              onChangeText={setSolucao}
              multiline
              placeholder="O que foi resolvido..."
            />

            <View style={styles.signatureContainer}>
              <SignatureScreen
                ref={signatureRef}
                onOK={(sig) => setSignature(sig)}
                descriptionText="Assinatura Digital"
                webStyle={`.m-signature-pad--footer {display: none;}`}
              />
            </View>

            <View style={styles.signatureButtons}>
              <TouchableOpacity style={styles.buttonSecondary} onPress={() => signatureRef.current?.clearSignature()}>
                <Text style={styles.buttonText}>Limpar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonConfirm} onPress={() => signatureRef.current?.readSignature()}>
                <Text style={styles.buttonText}>Confirmar Assinatura</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.buttonPrimary} onPress={handleSubmit} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>FINALIZAR</Text>}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
  scrollContent: { paddingVertical: 40 },
  container: { backgroundColor: '#fff', padding: 20, borderRadius: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  title: { fontSize: 18, fontWeight: 'bold' },
  label: { fontSize: 13, fontWeight: 'bold', color: '#4E3182', marginBottom: 5, marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, backgroundColor: '#fdfdfd' },
  textArea: { height: 80, textAlignVertical: 'top' },
  dropdown: {
    height: 50,
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  placeholderStyle: { fontSize: 16 },
  selectedTextStyle: { fontSize: 14 },
  iconStyle: { width: 20, height: 20 },
  inputSearchStyle: { height: 40, fontSize: 16 },
  selectedStyle: {
    borderRadius: 12,
    backgroundColor: '#4E3182',
    marginTop: 8,
    marginRight: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  signatureContainer: { height: 150, borderWidth: 1, borderColor: '#ddd', marginTop: 15, borderRadius: 8 },
  signatureButtons: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 },
  buttonPrimary: { backgroundColor: '#4E3182', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonSecondary: { backgroundColor: '#6c757d', padding: 10, borderRadius: 8, width: '30%', alignItems: 'center' },
  buttonConfirm: { backgroundColor: '#28a745', padding: 10, borderRadius: 8, width: '65%', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});