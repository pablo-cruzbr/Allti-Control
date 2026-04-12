import React, { useState, useRef } from 'react';
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
  Alert,
} from 'react-native';
import { api } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignatureScreen, { SignatureViewRef } from 'react-native-signature-canvas';
import { MaterialIcons } from '@expo/vector-icons'; // Importação adicionada

interface ModalDetailOrderTecnicoProps {
  ordemId: string;
  handleCloseModal: () => void;
}

export function ModalDetailOrderFormOSTecnica({
  ordemId,
  handleCloseModal,
}: ModalDetailOrderTecnicoProps) {
  const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

  // Estados dos inputs
  const [nameTecnico, setNameTecnico] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [solucao, setSolucao] = useState('');

  // Estados da assinatura e loading
  const [signature, setSignature] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const signatureRef = useRef<SignatureViewRef>(null);

  const handleSignature = (sig: string) => {
    setSignature(sig);
  };

  const handleClear = () => {
    signatureRef.current?.clearSignature();
    setSignature(null);
  };

  const handleSubmit = async () => {
    if (!signature) {
      Alert.alert('Atenção', 'Por favor, adicione a assinatura antes de salvar.');
      return;
    }

    try {
      setLoading(true);
      const storageToken = await AsyncStorage.getItem('@AlltiService');
      if (!storageToken) return;
      const { token } = JSON.parse(storageToken);

      // 1. Envia assinatura (Base64 -> Cloudinary via Backend)
      await api.patch(
        `/assinatura/${ordemId}`,
        { assinaturaBase64: signature },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 2. Atualiza os dados técnicos e finaliza a OS
      await api.patch(
        `/ordemdeservico/update/${ordemId}`,
        {
          nameTecnico,
          diagnostico,
          solucao,
          statusOrdemdeServico_id: 'fa69ed32-20b2-4d3a-9a6d-e61c5b45efea', // ID Concluída
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Alert.alert('Sucesso', 'Ordem de Serviço finalizada com sucesso!');
      handleCloseModal(); // Fecha o modal após o sucesso
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível atualizar a ordem. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      width: WIDTH - 30,
      maxHeight: HEIGHT - 80,
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 12,
    },
  });

  return (
    <View style={styles.overlay}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={dynamicStyles.container}>
            <View style={styles.headerRow}>
              <Text style={styles.title}>Descrição Técnica & Assinatura</Text>
            </View>

            {/* Formulário */}
            <TextInput
              placeholder="Nome do Técnico Responsável"
              style={styles.input}
              value={nameTecnico}
              onChangeText={setNameTecnico}
            />
            <TextInput
              placeholder="Diagnóstico Técnico"
              style={[styles.input, styles.textArea]}
              value={diagnostico}
              onChangeText={setDiagnostico}
              multiline
              numberOfLines={3}
            />
            <TextInput
              placeholder="Solução Aplicada"
              style={[styles.input, styles.textArea]}
              value={solucao}
              onChangeText={setSolucao}
              multiline
              numberOfLines={3}
            />

            {/* Campo de Assinatura */}
            <Text style={styles.label}>Assinatura Digital:</Text>
            <View style={styles.signatureContainer}>
              <SignatureScreen
                ref={signatureRef}
                onOK={handleSignature}
                onEmpty={() => setSignature(null)}
                descriptionText="Assine acima"
                webStyle={`
                  .m-signature-pad--footer {display: none; margin: 0px;}
                  .m-signature-pad {box-shadow: none; border: 1px solid #f4f4f4;}
                  body,html {height: 200px;}
                `}
              />
            </View>

            {/* Controles da Assinatura */}
            <View style={styles.signatureButtons}>
              <TouchableOpacity style={styles.buttonSecondary} onPress={handleClear}>
                <Text style={styles.buttonTextSecondary}>Limpar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonSecondary}
                onPress={() => signatureRef.current?.readSignature()}
              >
                <Text style={styles.buttonTextSecondary}>Confirmar Assinatura</Text>
              </TouchableOpacity>
            </View>

            {/* Ações Finais */}
            <TouchableOpacity
              style={[styles.buttonSubmit, loading && { opacity: 0.7 }]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>FINALIZAR ORDEM</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonCancel} onPress={handleCloseModal}>
              <Text style={styles.buttonTextCancel}>CANCELAR</Text>
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
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4E3182',
  },
  closeButtonIcon: {
    padding: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#F8FAFC',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  signatureContainer: {
    height: 200,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
  },
  signatureButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buttonSubmit: {
    backgroundColor: '#4E3182',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonSecondary: {
    backgroundColor: '#EDF2F7',
    padding: 10,
    borderRadius: 6,
    width: '48%',
    alignItems: 'center',
  },
  buttonCancel: {
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
  buttonTextSecondary: {
    color: '#4E3182',
    fontWeight: '600',
    fontSize: 12,
  },
  buttonTextCancel: {
    color: '#E53E3E',
    fontWeight: '600',
  },
});