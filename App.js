import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, Linking } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Import screens
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import UpdatePasswordScreen from './src/screens/UpdatePasswordScreen';
import HomeScreen from './src/screens/HomeScreen';
import TrackScreen from './src/screens/TrackScreen';
import PlanTripScreen from './src/screens/PlanTripScreen';
import SafetyScreen from './src/screens/SafetyScreen';
import MapScreen from './src/screens/MapScreen';

const Stack = createStackNavigator();

const linking = {
  prefixes: ['bustrackingapp://', 'https://bustrackingapp.com'],
  config: {
    screens: {
      UpdatePassword: 'reset-password',
      Login: 'login',
      SignUp: 'signup',
      ForgotPassword: 'forgot-password',
    },
  },
};

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <NavigationContainer linking={linking}>
          <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="UpdatePassword" component={UpdatePasswordScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Track" component={TrackScreen} />
            <Stack.Screen name="PlanTrip" component={PlanTripScreen} />
            <Stack.Screen name="Safety" component={SafetyScreen} />
            <Stack.Screen name="Map" component={MapScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;