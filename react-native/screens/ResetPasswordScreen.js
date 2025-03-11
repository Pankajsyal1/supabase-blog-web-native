import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

const ResetPasswordScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Password 🔑</Text>
      <Text style={styles.subtitle}>Enter a new password for your account.</Text>

      {/* 🔒 New Password Input */}
      <TextInput style={styles.input} placeholder="New Password" placeholderTextColor="#888" secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirm Password" placeholderTextColor="#888" secureTextEntry />

      {/* ✅ Save Password Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save Password</Text>
      </TouchableOpacity>

      {/* 🔙 Back to Login */}
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginVertical: 20 },
  input: { width: '100%', height: 50, backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 15, fontSize: 16, marginBottom: 15 },
  button: { width: '100%', height: 50, backgroundColor: '#28a745', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  buttonText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  backButton: { marginTop: 15 },
  backText: { fontSize: 16, color: '#666' },
});

export default ResetPasswordScreen;
