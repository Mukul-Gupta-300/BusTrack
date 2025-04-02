// screens/SplashScreen.js
import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  // Check for auth token and navigate accordingly after delay
  useEffect(() => {
    const checkTokenAndNavigate = async () => {
      try {
        // Wait for splash screen to display (2 seconds)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Check if user is already logged in
        const token = await AsyncStorage.getItem('userToken');
        
        // Navigate to appropriate screen
        if (token) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }
      } catch (error) {
        console.error('Error checking token:', error);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
    };

    checkTokenAndNavigate();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Bus Logo */}
        <Image
          source={require('../../assets/bus_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        
        {/* Namaste background (absolute positioned) */}
        <Image
          source={require('../../assets/Namaste.png')}
          style={styles.namasteBg}
          resizeMode="contain"
        />
        
        {/* App Name */}
        <Text style={styles.appName}>Rajasthan Bus Tracking</Text>
        
        {/* Khammaghani text at bottom */}
        <Text style={styles.greeting}>खम्माघणी</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF8C00',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 40,
  },
  namasteBg: {
    position: 'absolute',
    width: '80%',
    height: '50%',
    opacity: 0.2,
    top: '25%',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
  },
  greeting: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 40,
    fontFamily: 'System',
  }
});

export default SplashScreen;