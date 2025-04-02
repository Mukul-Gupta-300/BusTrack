import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { getToken } from 'C:/Users/mukul/OneDrive/Desktop/app/BusTrackingApp/services/authService.js';
import { getBusList } from 'C:/Users/mukul/OneDrive/Desktop/app/BusTrackingApp/services/busService.js';
import { Ionicons } from '@expo/vector-icons';

export default function PlanTripScreen({ navigation }) {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [busType, setBusType] = useState('');

  const findAvailableBuses = async (source, destination) => {
    const buses = await getBusList();
    const dummyBusData = {
      'RJ-BUS-001': { routes: ['Jaipur', 'Ajmer', 'Pushkar'], type: 'AC', currentLocation: { latitude: 26.9124, longitude: 75.7873 } },
      'RJ-BUS-002': { routes: ['Udaipur', 'Chittorgarh', 'Bhilwara'], type: 'Non-AC', currentLocation: { latitude: 24.5854, longitude: 73.7125 } },
      'RJ-BUS-003': { routes: ['Jodhpur', 'Jaisalmer', 'Barmer'], type: 'AC', currentLocation: { latitude: 26.2389, longitude: 73.0243 } },
    };

    const availableBuses = buses.filter(bus => {
      const routes = dummyBusData[bus.id].routes;
      const matchesType = !busType || dummyBusData[bus.id].type === busType;
      return routes.includes(source) && routes.includes(destination) && matchesType;
    });

    if (availableBuses.length === 0) {
      throw new Error('No buses available for this route and bus type');
    }

    return availableBuses.map(bus => {
      const distance = Math.floor(Math.random() * 50) + 10;
      const eta = distance * 2;
      return {
        busId: bus.id,
        busName: bus.name,
        distance,
        eta,
        currentLocation: dummyBusData[bus.id].currentLocation, // Add currentLocation
      };
    });
  };

  const handlePlan = async () => {
    if (!source || !destination) {
      Alert.alert('Error', 'Please enter both source and destination');
      return;
    }

    const token = await getToken();
    if (!token) {
      Alert.alert('Error', 'Please login to plan a trip');
      navigation.navigate('Login');
      return;
    }

    try {
      const availableBuses = await findAvailableBuses(source, destination);
      const tripDetails = availableBuses.map(bus => 
        `${bus.busName}: ${bus.distance} km, ETA: ${bus.eta} minutes`
      ).join('\n');
      Alert.alert(
        'Trip Planned',
        `Available options from ${source} to ${destination}:\n${tripDetails}`,
        [
          { text: 'OK', onPress: () => {} },
          { text: 'Track One', onPress: () => navigation.navigate('Map', { 
            source, 
            destination, 
            busId: availableBuses[0].busId, 
            distance: availableBuses[0].distance, 
            eta: availableBuses[0].eta, 
            currentLocation: availableBuses[0].currentLocation 
          }) }
        ]
      );
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Plan Your Trip</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name="location-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Source (e.g., Jaipur)"
              value={source}
              onChangeText={setSource}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Ionicons name="location-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Destination (e.g., Ajmer)"
              value={destination}
              onChangeText={setDestination}
            />
          </View>
          
          <View style={styles.options}>
            <TouchableOpacity
              style={[styles.optionButton, busType === 'AC' && styles.selectedOption]}
              onPress={() => setBusType('AC')}
            >
              <Text style={styles.optionText}>AC</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, busType === 'Non-AC' && styles.selectedOption]}
              onPress={() => setBusType('Non-AC')}
            >
              <Text style={styles.optionText}>Non-AC</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, busType === '' && styles.selectedOption]}
              onPress={() => setBusType('')}
            >
              <Text style={styles.optionText}>Any</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.planButton} onPress={handlePlan}>
            <Text style={styles.planButtonText}>Plan Trip</Text>
          </TouchableOpacity>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333333',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  optionButton: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  selectedOption: {
    backgroundColor: '#FFE0B2',
    borderWidth: 1,
    borderColor: '#FF8C00',
  },
  optionText: {
    fontWeight: 'bold',
    color: '#333333',
  },
  planButton: {
    backgroundColor: '#FF8C00',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  planButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});