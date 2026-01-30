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
} from 'react-native';
import { api } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignatureScreen, { SignatureViewRef } from 'react-native-signature-canvas';

interface ModalDetailOrderTecnicoProps {
  ordemId: string;
  handleCloseModal: () => void;
}

export function ModalDetailOrderFormTecnico({
  ordemId,
  handleCloseModal,
}: ModalDetailOrderTecnicoProps) {
  const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

  // Inputs adicionais
  const [nameTecnico, setNameTecnico] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [solucao, setSolucao] = useState('');
  const [assinante, setAssinante] = useState('')

  // Assinatura
  const [signature, setSignature] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const signatureRef = useRef<SignatureViewRef>(null);

  const handleSignature = (sig: string) => setSignature(sig);
  const handleClear = () => {
    signatureRef.current?.clearSignature();
    setSignature(null);
  };

  const handleSubmit = async () => {
    if (!signature) {
      alert('Por favor, adicione a assinatura antes de salvar.');
      return;
    }

    try {
      setLoading(true);
      const storageToken = await AsyncStorage.getItem('@AlltiService');
      if (!storageToken) return;
      const { token } = JSON.parse(storageToken);

      // Envia assinatura para o backend (que vai para o Cloudinary)
      await api.patch(
        `/assinatura/${ordemId}`,
        { assinaturaBase64: signature },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Atualiza os outros campos da ordem
      await api.patch(
        `/ordemdeservico/update/${ordemId}`,
        {
          nameTecnico,
          diagnostico,
          solucao,
          assinante,
          statusOrdemdeServico_id: '80e14fbe-c7fd-45bc-b3cd-cfa51ede44e0',
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Ordem de Serviço atualizada com sucesso!');
      handleCloseModal();
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      width: WIDTH - 30,
      maxHeight: HEIGHT - 100,
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 12,
    },
  });

  return (
    <View style={styles.overlay}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={dynamicStyles.container}>
            <Text style={styles.title}>Adicionar Descrição Técnica</Text>

            {/* Inputs do Técnico */}
            <TextInput
              placeholder="Nome do Técnico"
              style={styles.input}
              value={nameTecnico}
              onChangeText={setNameTecnico}
            />
            <TextInput
              placeholder="Diagnóstico"
              style={[styles.input, styles.textArea]}
              value={diagnostico}
              onChangeText={setDiagnostico}
              multiline
              numberOfLines={3}
            />
            <TextInput
              placeholder="Solução"
              style={[styles.input, styles.textArea]}
              value={solucao}
              onChangeText={setSolucao}
              multiline
              numberOfLines={3}
            />

            {/* Assinatura Digital */}
            <Text style={{ marginBottom: 8, fontWeight: '600' }}>
              Assinante 
            </Text>
            <TextInput
              placeholder="Quem Está Assinando ?"
              style={[styles.input, styles.textArea]}
              value={assinante}
              onChangeText={setAssinante}
              multiline
              numberOfLines={3}
            />
            <View style={styles.signatureContainer}>
              <SignatureScreen
                ref={signatureRef}
                onOK={handleSignature}
                onEmpty={() => alert('Assinatura em branco')}
                descriptionText="Assine aqui"
                clearText="Limpar"
                confirmText="Salvar"
                webStyle={`
                  .m-signature-pad--footer {display: none; margin: 0px;}
                  .m-signature-pad {box-shadow: none; border: none;}
                `}
              />
            </View>

            {/* Botões da assinatura */}
            <View style={styles.signatureButtons}>
              <TouchableOpacity style={styles.buttonSmall} onPress={handleClear}>
                <Text style={styles.buttonText}>Limpar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonSmall}
                onPress={() => signatureRef.current?.readSignature()}
              >
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
            </View>

            {/* Botão Enviar */}
            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.7 }]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Salvar Ordem</Text>}
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonClose} onPress={handleCloseModal}>
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#111111',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    fontSize: 14,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  signatureContainer: {
    height: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
  },
  signatureButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#3859F3',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonSmall: {
    backgroundColor: '#3859F3',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
    width: '48%',
  },
  buttonClose: {
    backgroundColor: '#888',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
