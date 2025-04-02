import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SafetyScreen({ navigation }) {
  const handleCall = (number) => {
    Linking.openURL(`tel:${number}`).catch(() => Alert.alert('Error', 'Unable to make call'));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Safety</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.safetyContainer}>
          <TouchableOpacity style={styles.safetyItem} onPress={() => handleCall('123-456-7890')}>
            <View style={styles.iconContainer}>
              <Ionicons name="call-outline" size={24} color="#FF8C00" />
            </View>
            <Text style={styles.safetyText}>Helpline 1: 123-456-7890</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.safetyItem} onPress={() => handleCall('987-654-3210')}>
            <View style={styles.iconContainer}>
              <Ionicons name="call-outline" size={24} color="#FF8C00" />
            </View>
            <Text style={styles.safetyText}>Helpline 2: 987-654-3210</Text>
          </TouchableOpacity>
          
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>Safety Tips</Text>
            <Text style={styles.tipsText}>
              Keep your belongings secure and report suspicious activity.
            </Text>
          </View>
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
  safetyContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
  },
  safetyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
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
  safetyText: {
    fontSize: 16,
    color: '#333333',
  },
  tipsContainer: {
    marginTop: 20,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  tipsText: {
    fontSize: 16,
    color: '#666666',
  },
});