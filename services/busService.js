// services/busService.js
const dummyBusData = {
    'RJ-BUS-001': {
      routes: ['Jaipur', 'Ajmer', 'Pushkar'],
      currentLocation: { latitude: 26.9124, longitude: 75.7873 }, // Jaipur
    },
    'RJ-BUS-002': {
      routes: ['Udaipur', 'Chittorgarh', 'Bhilwara'],
      currentLocation: { latitude: 24.5854, longitude: 73.7125 }, // Udaipur
    },
    'RJ-BUS-003': {
      routes: ['Jodhpur', 'Jaisalmer', 'Barmer'],
      currentLocation: { latitude: 26.2389, longitude: 73.0243 }, // Jodhpur
    },
  };
  
  // Simulate API delay
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  // Mock API calls
  export const getBusList = async () => {
    await delay(500); // Simulate network delay
    return Object.keys(dummyBusData).map(busId => ({
      id: busId,
      name: `${busId} (${dummyBusData[busId].routes[0]} Route)`,
    }));
  };
  
  export const getBusRoutes = async (busId) => {
    await delay(500);
    if (!dummyBusData[busId]) throw new Error('Bus not found');
    return dummyBusData[busId].routes;
  };
  
  export const trackBus = async (busId, source, destination) => {
    await delay(500);
    const routes = dummyBusData[busId]?.routes;
    if (!routes) throw new Error('Bus not found');
    
    if (!routes.includes(destination)) {
      throw new Error(`Bus ${busId} does not go to ${destination}`);
    }
  
    const distance = Math.floor(Math.random() * 50) + 10; // 10-60 km
    const eta = distance * 2; // 2 minutes per km
  
    return {
      busId,
      source,
      destination,
      distance,
      eta,
      currentLocation: { ...dummyBusData[busId].currentLocation },
    };
  };
  
  // Simulate real-time location updates
  export const subscribeToBusLocation = (busId, callback) => {
    if (!dummyBusData[busId]) return () => {};
  
    const interval = setInterval(() => {
      const newLocation = {
        latitude: dummyBusData[busId].currentLocation.latitude + (Math.random() - 0.5) * 0.01,
        longitude: dummyBusData[busId].currentLocation.longitude + (Math.random() - 0.5) * 0.01,
      };
      dummyBusData[busId].currentLocation = newLocation;
      callback(newLocation);
    }, 5000);
  
    return () => clearInterval(interval);
  };