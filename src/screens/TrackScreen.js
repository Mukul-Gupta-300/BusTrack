import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Updated import
import { getToken } from 'C:/Users/mukul/OneDrive/Desktop/app/BusTrackingApp/services/authService.js';
import { getBusList, trackBus } from 'C:/Users/mukul/OneDrive/Desktop/app/BusTrackingApp/services/busService.js';
import { Ionicons } from '@expo/vector-icons';

export default function TrackScreen({ navigation }) {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedBus, setSelectedBus] = useState('');
  const [busList, setBusList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const buses = await getBusList();
        setBusList(buses);
        setSelectedBus(buses[0]?.id || '');
      } catch (error) {
        Alert.alert('Error', 'Failed to load bus list');
      }
    })();
  }, []);

  const handleTrack = async () => {
    if (!source || !destination || !selectedBus) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const token = await getToken();
    if (!token) {
      Alert.alert('Error', 'Please login to track a bus');
      navigation.navigate('Login');
      return;
    }

    try {
      const trackingData = await trackBus(selectedBus, source, destination);
      navigation.navigate('Map', trackingData);
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
        <Text style={styles.headerTitle}>Track Bus</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name="location-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Source"
              value={source}
              onChangeText={setSource}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Ionicons name="location-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Destination"
              value={destination}
              onChangeText={setDestination}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="bus-outline" size={20} color="#666" style={styles.icon} />
            <Picker
              selectedValue={selectedBus}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedBus(itemValue)}
            >
              {busList.map(bus => (
                <Picker.Item key={bus.id} label={bus.name} value={bus.id} />
              ))}
            </Picker>
          </View>
          
          <TouchableOpacity style={styles.trackButton} onPress={handleTrack}>
            <Text style={styles.trackButtonText}>Track</Text>
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
  picker: {
    flex: 1,
    height: 44,
    color: '#333333',
  },
  trackButton: {
    backgroundColor: '#FF8C00',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  trackButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});