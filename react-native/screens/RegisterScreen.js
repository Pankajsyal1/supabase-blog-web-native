import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { supabase } from '../supabase';

const INITIAL_STATE = {
  email: "",
  password: ""
}

const RegisterScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [inputValues, setInputValues] = useState(INITIAL_STATE)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      console.log("Check inputs Submitting....")
      if (!inputValues.email || !inputValues.password) {
        setError("Please enter the email and password!!!")
        return;
      }

      console.log("Start Submitting....")
      const { data, error } = await supabase.auth.signUp({
        email: inputValues.email,
        password: inputValues.password
      })

      if (error) {
        throw new Error("Unable to register...", error);
      }

      console.log(data, "result");
      setInputValues(INITIAL_STATE);

      navigation.navigate("Home")

    } catch (error) {
      setError(error.message)
      console.log("eroror", error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account 🚀</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      {/* 📌 Full Name Input */}
      {/* <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#888"
        onChangeText={(text) => setInputValues({ ...inputValues, email: text })}
      /> */}

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

      {/* 🔒 Confirm Password Input */}
      {/* <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#888"
        secureTextEntry
        onChangeText={(text) => setInputValues({ ...inputValues, email: text })}
      /> */}

      {/* ✅ Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{loading ? <ActivityIndicator color={'white'} size={24} /> : "Sign Up"}</Text>
      </TouchableOpacity>
      <View style={{
        marginTop: 20, marginBottom: 0, backgroundColor: '#f8d7da', width: '100%', padding: 8, borderRadius: 4
      }}>
        {error && <Text style={{ color: "#dc3545", textAlign: 'center' }}>{error}</Text>
        }
      </View>

      {/* 🔗 Already have an account? Login */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("login")}>
          <Text style={styles.footerLink}> Login</Text>
        </TouchableOpacity>
      </View>
    </View >
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
    backgroundColor: '#28a745',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#28a745',
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
    color: '#666',
  },
  footerLink: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default RegisterScreen;
