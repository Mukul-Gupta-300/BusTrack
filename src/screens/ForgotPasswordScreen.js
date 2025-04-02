import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { resetPassword } from 'C:/Users/mukul/OneDrive/Desktop/app/BusTrackingApp/services/authService.js';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    try {
      await resetPassword(email);
      Alert.alert(
        'Password Reset Email Sent',
        'Please check your email for password reset instructions.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FF8C00', '#FFA500']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../../assets/bus_logo.png')}
            />
            <Text style={styles.appName}>Bus Booking App</Text>
            <Text style={styles.welcomeText}>Reset Password</Text>
          </View>
          
          <View style={styles.formContainer}>
            <Text style={styles.instructionText}>
              Enter your email address and we'll send you instructions to reset your password.
            </Text>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
            
            {loading ? (
              <ActivityIndicator size="large" color="#FF8C00" style={styles.loader} />
            ) : (
              <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
                <Text style={styles.resetButtonText}>Send Reset Link</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 30,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  instructionText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  input: {
    paddingVertical: 12,
    fontSize: 16,
    color: '#333333',
  },
  resetButton: {
    backgroundColor: '#FF8C00',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginVertical: 10,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FF8C00',
    fontSize: 14,
    fontWeight: '500',
  },
  loader: {
    marginVertical: 15,
  },
}); 