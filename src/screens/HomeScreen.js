import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { logoutUser } from 'C:/Users/mukul/OneDrive/Desktop/app/BusTrackingApp/services/authService.js';

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await logoutUser();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bus Tracking App</Text>
      </View>
      
      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('Track')}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="bus-outline" size={24} color="#FF8C00" />
          </View>
          <Text style={styles.menuText}>Track Bus</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('PlanTrip')}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="map-outline" size={24} color="#FF8C00" />
          </View>
          <Text style={styles.menuText}>Plan Trip</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('Safety')}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="shield-outline" size={24} color="#FF8C00" />
          </View>
          <Text style={styles.menuText}>Safety</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF8C00',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: '80%',
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  logoutButton: {
    backgroundColor: '#FF0000',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
    width: '80%',
  },
  logoutText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
