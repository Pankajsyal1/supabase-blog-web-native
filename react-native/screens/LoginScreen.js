import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { supabase } from '../supabase';

const LoginScreen = ({ navigation }) => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = async () => {
    if (!inputValues.email || !inputValues.password) {
      alert("Please enter the email and password!!!")
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: inputValues.email.toLowerCase(),
      password: inputValues.password
    })

    if (error) return alert("Error" + " " + error.message);
    console.log(data);
    alert("Success");
    navigation.reset({
      index: 0,
      routes: [{ name: "HOME_SCREEN" }],
    });

    console.log(inputValues, "submitting")
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back! 👋</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      {/* 📌 Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={inputValues.email}
        onChangeText={(text) => setInputValues({ ...inputValues, email: text })}
      />

      {/* 🔒 Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={inputValues.password}
        onChangeText={(text) => setInputValues({ ...inputValues, password: text })}
      />

      {/* 🔵 Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* 🔗 Forgot Password & Signup */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("FORGOT_PASSWORD_SCREEN")}><Text style={styles.footerText}>Forgot Password?</Text></TouchableOpacity>
        <Text style={styles.footerText}> | </Text>
        <TouchableOpacity onPress={() => navigation.navigate("REGISTER_SCREEN")}><Text style={styles.footerText}>Sign Up</Text></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#007bff',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  footerText: {
    fontSize: 14,
    color: '#007bff',
  },
});

export default LoginScreen;
