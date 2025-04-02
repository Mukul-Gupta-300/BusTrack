import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { subscribeToBusLocation } from 'C:/Users/mukul/OneDrive/Desktop/app/BusTrackingApp/services/busService.js';

export default function MapScreen({ navigation, route }) {
  const { source, destination, busId, distance, eta, currentLocation } = route.params;
  const [userLocation, setUserLocation] = useState(null);
  const [busLocation, setBusLocation] = useState(
    currentLocation || { latitude: 26.9124, longitude: 75.7873 } // Fallback to Jaipur if currentLocation is missing
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();

    // Subscribe to bus location updates
    const unsubscribe = subscribeToBusLocation(busId, (newLocation) => {
      setBusLocation(newLocation);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [busId]);

  const getInitialRegion = () => {
    if (userLocation) {
      return {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    }
    return {
      latitude: busLocation.latitude,
      longitude: busLocation.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tracking {busId}</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={getInitialRegion()}
          showsUserLocation={true}
        >
          {busLocation && (
            <Marker
              coordinate={busLocation}
              title={busId}
              description={`${source} to ${destination}`}
            >
              <View style={styles.busMarker}>
                <Ionicons name="bus" size={24} color="#FFFFFF" />
              </View>
            </Marker>
          )}
          {userLocation && busLocation && (
            <Polyline
              coordinates={[userLocation, busLocation]}
              strokeColor="#FF8C00"
              strokeWidth={3}
            />
          )}
        </MapView>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>From: {source}</Text>
          <Text style={styles.infoText}>To: {destination}</Text>
          <Text style={styles.infoText}>Distance: {distance} km</Text>
          <Text style={styles.infoText}>ETA: {eta} minutes</Text>
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
  mapContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  busMarker: {
    backgroundColor: '#FF8C00',
    borderRadius: 15,
    padding: 5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 5,
  },
});