// App.js
import React, { useState, useEffect } from 'react';
import { StatusBar, SafeAreaView, LogBox, Text, View, ActivityIndicator } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

// Ignore specific warnings - you can remove this in production
LogBox.ignoreLogs(['Remote debugger', 'Reanimated 2']);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Basic initialization with error handling
    try {
      // Simulate initialization process
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      console.error("App initialization error:", err);
      setError(err.message);
      setIsLoading(false);
    }
  }, []);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ color: 'red', fontSize: 16, marginBottom: 20 }}>
          Error: {error}
        </Text>
        <Text>
          Please restart the app or contact support if the problem persists.
        </Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF8C00' }}>
        <ActivityIndicator size="large" color="white" />
        <Text style={{ color: 'white', marginTop: 20 }}>Starting application...</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#FF8C00" />
      <AppNavigator />
    </>
  );
}