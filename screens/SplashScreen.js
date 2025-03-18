import React, { useEffect } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Navigate to Login screen after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/bus_logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.appName}>Bus Booking App</Text>
      <Text style={styles.sanskritText}>यात्रामाणी</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF8C00', // Orange background
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  sanskritText: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 50,
  },
});

export default SplashScreen;

