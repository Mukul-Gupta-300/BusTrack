import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert, Image } from 'react-native';
import { loginUser } from 'C:/Users/mukul/OneDrive/Desktop/app/BusTrackingApp/services/authService.js';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    setLoading(true);
    try {
      await loginUser(email, password);
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    } catch (err) {
      Alert.alert('Login Failed', err.message);
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
              source={require('C:/Users/mukul/OneDrive/Desktop/app/BusTrackingApp/assets/bus_logo.png')}  // Make sure you have this icon in your assets
            />
            <Text style={styles.appName}>Bus Booking App</Text>
            <Text style={styles.welcomeText}>Namaste</Text>
          </View>
          
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity 
              style={styles.forgotPassword}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            
            {loading ? (
              <ActivityIndicator size="large" color="#FF8C00" style={styles.loader} />
            ) : (
              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Log In</Text>
              </TouchableOpacity>
            )}
            
            <View style={styles.accountContainer}>
              <Text style={styles.accountText}>Don't Have An Account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.createText}>Create</Text>
              </TouchableOpacity>
            </View>
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#FF8C00',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#FF8C00',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginVertical: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  accountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  accountText: {
    color: '#666666',
    marginRight: 5,
  },
  createText: {
    color: '#FF8C00',
    fontWeight: 'bold',
  },
  loader: {
    marginVertical: 15,
  },
});