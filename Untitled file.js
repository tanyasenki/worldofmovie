import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar
} from 'react-native';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Topo / Logo */}
      <View style={styles.logoContainer}>
        {/* Usamos textShadow para simular o efeito de desfoque/rastro atrás do texto */}
        <Text style={styles.titleWorld}>World</Text>
        <Text style={styles.titleOfMovie}>of Movie</Text>
      </View>

      {/* Área de Formulário */}
      <View style={styles.formContainer}>
        <Text style={styles.loginLabel}>Login:</Text>

        {/* Input: Email ou Telefone */}
        <TextInput
          style={styles.input}
          placeholder="Email ou Telefone"
          placeholderTextColor="#222"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Input: Senha */}
        <TextInput
          style={[styles.input, styles.inputMargin]}
          placeholder="Senha"
          placeholderTextColor="#222"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Esqueceu a senha */}
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Esqueceu a senha</Text>
        </TouchableOpacity>

        {/* Linha inferior: Checkbox e Botão Entrar */}
        <View style={styles.bottomRow}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            activeOpacity={0.7}
            onPress={() => setRemember(!remember)}
          >
            <View style={styles.checkbox}>
              {remember && <View style={styles.checkboxInner} />}
            </View>
            <Text style={styles.rememberText}>Lembra usuário</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} activeOpacity={0.8}>
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b50e0e', // Vermelho escuro de fundo
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  titleWorld: {
    fontSize: 55,
    fontWeight: '900',
    color: '#1a1a1a',
    letterSpacing: -1,
    // Efeito de sombra simulando o borrão atrás do texto na imagem original
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: -15, height: -15 },
    textShadowRadius: 20,
  },
  titleOfMovie: {
    fontSize: 24,
    color: '#1a1a1a',
    fontWeight: '400',
    marginTop: 5,
  },
  formContainer: {
    flex: 1.2,
    paddingHorizontal: 40,
  },
  loginLabel: {
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: 8,
    marginLeft: 15,
  },
  input: {
    backgroundColor: '#dfb542', // Amarelo mostarda
    borderRadius: 25,
    height: 50,
    paddingHorizontal: 25,
    fontSize: 16,
    color: '#1a1a1a',
  },
  inputMargin: {
    marginTop: 40,
  },
  forgotPassword: {
    color: '#1a1a1a',
    fontSize: 12,
    marginLeft: 25,
    marginTop: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    paddingHorizontal: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 14,
    height: 14,
    borderWidth: 1,
    borderColor: '#1a1a1a',
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 8,
    height: 8,
    backgroundColor: '#1a1a1a',
  },
  rememberText: {
    color: '#1a1a1a',
    fontSize: 12,
  },
  loginButton: {
    backgroundColor: '#dfb542',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  loginButtonText: {
    color: '#1a1a1a',
    fontSize: 16,
    fontWeight: '500',
  },
});
