import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import TrackScreen from '../screens/TrackScreen';
import PlanTripScreen from '../screens/PlanTripScreen';
import SafetyScreen from '../screens/SafetyScreen';

// Temporary placeholder for the missing MapScreen
const MapScreen = ({ route }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF8C00' }}>
    <Text style={{ color: '#fff', fontSize: 18 }}>Map Screen</Text>
    <Text style={{ color: '#fff', marginTop: 20 }}>
      {route.params?.source} to {route.params?.destination}
    </Text>
    <Text style={{ color: '#fff', marginTop: 10 }}>
      Bus: {route.params?.busNumber || 'Not specified'}
    </Text>
  </View>
);

const Stack = createStackNavigator();

// Simplified stack navigation - remove Tab navigator temporarily
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Track" component={TrackScreen} />
        <Stack.Screen name="PlanTrip" component={PlanTripScreen} />
        <Stack.Screen name="Safety" component={SafetyScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;