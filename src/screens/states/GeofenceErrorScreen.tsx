import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, { Circle, Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

const GeofenceErrorScreen = () => {
  const [userLocation, setUserLocation] = useState<LocationData>({
    latitude: 24.7136,
    longitude: 46.6753, // Default to Riyadh
  });
  
  const [projectLocation] = useState<LocationData>({
    latitude: 24.7186,
    longitude: 46.6803,
  });

  const [distance, setDistance] = useState<number>(85); // meters
  const [pulseAnim] = useState(new Animated.Value(1));
  const [bounceAnim] = useState(new Animated.Value(0));
  const [isRetrying, setIsRetrying] = useState(false);

  const geofenceRadius = 50; // meters

  useEffect(() => {
    // Start pulsing animation for the error state
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Bounce animation for the error icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  };

  const handleRetryLocation = async () => {
    setIsRetrying(true);
    
    // Simulate GPS retry
    setTimeout(() => {
      // Simulate getting a slightly different location
      const newLat = userLocation.latitude + (Math.random() - 0.5) * 0.001;
      const newLon = userLocation.longitude + (Math.random() - 0.5) * 0.001;
      
      setUserLocation({ latitude: newLat, longitude: newLon });
      
      const newDistance = calculateDistance(
        newLat, newLon, 
        projectLocation.latitude, projectLocation.longitude
      );
      
      setDistance(Math.round(newDistance));
      setIsRetrying(false);
    }, 2000);
  };

  const handleContactClient = () => {
    // Handle contacting client
    console.log('Contact client');
  };

  const handleNavigateToSite = () => {
    // Open navigation app
    console.log('Navigate to site');
  };

  const handleReportIssue = () => {
    // Navigate to issue reporting screen
    console.log('Report GPS issue');
  };

  const isWithinGeofence = distance <= geofenceRadius;
  const distanceFromBoundary = Math.abs(distance - geofenceRadius);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#D32F2F', '#F44336']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Check-In Failed</Text>
          <TouchableOpacity style={styles.helpButton} onPress={handleReportIssue}>
            <MaterialIcons name="report-problem" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Error Status */}
        <View style={styles.errorBanner}>
          <Animated.View style={[styles.errorIcon, { transform: [{ translateY: bounceAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -10]
          })}] }]}>
            <MaterialIcons name="location-off" size={48} color="#F44336" />
          </Animated.View>
          <Text style={styles.errorTitle}>You're Outside the Project Zone</Text>
          <Text style={styles.errorSubtitle}>
            You need to be within {geofenceRadius}m of the project site to check in
          </Text>
        </View>

        {/* Distance Information */}
        <View style={styles.distanceCard}>
          <View style={styles.distanceHeader}>
            <MaterialIcons name="straighten" size={24} color="#FF9800" />
            <Text style={styles.distanceTitle}>Current Distance</Text>
          </View>
          <View style={styles.distanceInfo}>
            <Text style={styles.distanceValue}>{distance}m</Text>
            <Text style={styles.distanceLabel}>from project site</Text>
          </View>
          <View style={styles.distanceStatus}>
            <MaterialIcons 
              name={isWithinGeofence ? "check-circle" : "cancel"} 
              size={20} 
              color={isWithinGeofence ? "#4CAF50" : "#F44336"} 
            />
            <Text style={[styles.distanceStatusText, { 
              color: isWithinGeofence ? "#4CAF50" : "#F44336" 
            }]}>
              {isWithinGeofence ? "Within range" : `${distanceFromBoundary}m too far`}
            </Text>
          </View>
        </View>

        {/* Map View */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={{
              latitude: (userLocation.latitude + projectLocation.latitude) / 2,
              longitude: (userLocation.longitude + projectLocation.longitude) / 2,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            customMapStyle={[
              {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [{"color": "#242f3e"}]
              },
              {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [{"lightness": -80}]
              },
            ]}
          >
            {/* Project Site Geofence */}
            <Circle
              center={projectLocation}
              radius={geofenceRadius}
              strokeColor="rgba(76, 175, 80, 0.5)"
              fillColor="rgba(76, 175, 80, 0.2)"
              strokeWidth={2}
            />
            
            {/* Project Site Marker */}
            <Marker
              coordinate={projectLocation}
              title="Project Site"
              description="Check-in zone"
            >
              <View style={styles.projectMarker}>
                <MaterialIcons name="business" size={24} color="#4CAF50" />
              </View>
            </Marker>
            
            {/* User Location Marker */}
            <Marker
              coordinate={userLocation}
              title="Your Location"
              description="Current position"
            >
              <Animated.View style={[styles.userMarker, { transform: [{ scale: pulseAnim }] }]}>
                <MaterialIcons name="my-location" size={20} color="#2196F3" />
              </Animated.View>
            </Marker>
          </MapView>
          
          <View style={styles.mapOverlay}>
            <TouchableOpacity 
              style={styles.retryLocationButton}
              onPress={handleRetryLocation}
              disabled={isRetrying}
            >
              <MaterialIcons 
                name={isRetrying ? "refresh" : "gps-fixed"} 
                size={20} 
                color="#fff" 
              />
              <Text style={styles.retryLocationText}>
                {isRetrying ? "Updating..." : "Update Location"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsCard}>
          <Text style={styles.instructionsTitle}>To Check In Successfully:</Text>
          <View style={styles.instructionsList}>
            <View style={styles.instructionItem}>
              <MaterialIcons name="directions-walk" size={20} color="#4CAF50" />
              <Text style={styles.instructionText}>
                Move closer to the project site (within {geofenceRadius}m)
              </Text>
            </View>
            <View style={styles.instructionItem}>
              <MaterialIcons name="gps-fixed" size={20} color="#4CAF50" />
              <Text style={styles.instructionText}>
                Ensure GPS is enabled and accurate
              </Text>
            </View>
            <View style={styles.instructionItem}>
              <MaterialIcons name="signal-cellular-4-bar" size={20} color="#4CAF50" />
              <Text style={styles.instructionText}>
                Check your network connection
              </Text>
            </View>
          </View>
        </View>

        {/* Troubleshooting */}
        <View style={styles.troubleshootingCard}>
          <Text style={styles.troubleshootingTitle}>Having Trouble?</Text>
          <View style={styles.troubleshootingOptions}>
            <TouchableOpacity style={styles.troubleshootingOption} onPress={handleNavigateToSite}>
              <MaterialIcons name="navigation" size={20} color="#2196F3" />
              <Text style={styles.troubleshootingText}>Get Directions</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.troubleshootingOption} onPress={handleContactClient}>
              <MaterialIcons name="call" size={20} color="#4CAF50" />
              <Text style={styles.troubleshootingText}>Call Client</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.troubleshootingOption} onPress={handleReportIssue}>
              <MaterialIcons name="bug-report" size={20} color="#FF9800" />
              <Text style={styles.troubleshootingText}>Report GPS Issue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  header: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  helpButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  errorBanner: {
    alignItems: 'center',
    backgroundColor: '#1e1e3f',
    borderRadius: 12,
    padding: 24,
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(244, 67, 54, 0.3)',
  },
  errorIcon: {
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#F44336',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorSubtitle: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
    lineHeight: 20,
  },
  distanceCard: {
    backgroundColor: '#1e1e3f',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  distanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  distanceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
  distanceInfo: {
    alignItems: 'center',
    marginBottom: 12,
  },
  distanceValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FF9800',
  },
  distanceLabel: {
    fontSize: 14,
    color: '#aaa',
  },
  distanceStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  distanceStatusText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  mapContainer: {
    height: 200,
    backgroundColor: '#2a2a4a',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  mapOverlay: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  retryLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(33, 150, 243, 0.9)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  retryLocationText: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 4,
    fontWeight: '500',
  },
  projectMarker: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  userMarker: {
    backgroundColor: '#2196F3',
    borderRadius: 15,
    padding: 5,
    borderWidth: 2,
    borderColor: '#fff',
  },
  instructionsCard: {
    backgroundColor: '#1e1e3f',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  instructionsList: {
    gap: 12,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 14,
    color: '#ccc',
    marginLeft: 12,
    flex: 1,
    lineHeight: 18,
  },
  troubleshootingCard: {
    backgroundColor: '#1e1e3f',
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
  },
  troubleshootingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  troubleshootingOptions: {
    gap: 8,
  },
  troubleshootingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a4a',
    borderRadius: 8,
    padding: 12,
  },
  troubleshootingText: {
    fontSize: 14,
    color: '#ccc',
    marginLeft: 12,
    fontWeight: '500',
  },
});

export default GeofenceErrorScreen;