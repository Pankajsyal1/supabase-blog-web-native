import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const VerifyEmailScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Email 📩</Text>
      <Text style={styles.subtitle}>
        We have sent a verification link to your email. Please check your inbox and verify your account.
      </Text>

      {/* ✅ Open Email App Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Open Email App</Text>
      </TouchableOpacity>

      {/* 🔄 Resend Email Link */}
      <TouchableOpacity style={styles.resendButton}>
        <Text style={styles.resendText}>Resend Verification Email</Text>
      </TouchableOpacity>

      {/* 🔙 Back to Login */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("register")}>
        <Text style={styles.backText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginVertical: 20 },
  button: { width: '100%', height: 50, backgroundColor: '#007bff', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  buttonText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  resendButton: { marginTop: 20 },
  resendText: { fontSize: 16, color: '#007bff', fontWeight: 'bold' },
  backButton: { marginTop: 10 },
  backText: { fontSize: 16, color: '#666' },
});

export default VerifyEmailScreen;
