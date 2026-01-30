import { StatusBar } from "expo-status-bar";
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { AuthContext } from "../../contexts/AuthContext";

export default function Signin() {
  const { signIn, loadingAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin() {
    if (email === "" || password === "") {
      setMessage("Preencha todos os campos.");
      setTimeout(() => setMessage(""), 1600);
      return;
    }

    try {
      await signIn({ email, password });
    } catch (err) {
      console.log("Erro no login:", err);
      setMessage("Erro ao fazer login");
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      
      <View style={styles.circleTop} />
      <View style={styles.circleBottom} />
      <View style={styles.card}>
        <Image
          style={styles.logo}
          source={require("../../assets/Logo8.png")}
        />
        <Text style={styles.title}>Faça seu Login</Text>
        <TextInput
          placeholder="Digite seu email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#aaa"
        />

        <TextInput
          placeholder="Digite sua senha"
          style={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#aaa"
        />

        
        {message !== "" && <Text style={styles.message}>{message}</Text>}

        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          {loadingAuth ? (
            <ActivityIndicator size={25} color={"#FFF"} />
          ) : (
            <Text style={styles.buttonText}>Acessar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3859F3", 
    justifyContent: "center",
    alignItems: "center",
  },

  circleTop: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(255,255,255,0.2)",
    top: -80,
    right: -80,
  },
  circleBottom: {
    position: "absolute",
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: "rgba(255,255,255,0.15)",
    bottom: -120,
    left: -100,
  },

  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 25,
    alignItems: "center",
    elevation: 6, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    zIndex: 2,
  },
  logo: {
    width: 230,
    height: 60,
    resizeMode: "contain",
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#444",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    color: "#333",
  },
  button: {
    width: "60%",
    height: 50,
    backgroundColor: "#3859F3",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  message: {
    color: "#FF3F4B",
    marginBottom: 10,
    fontWeight: "bold",
  },
});
