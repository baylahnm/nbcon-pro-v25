import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { COLORS, TYPOGRAPHY } from '../../constants';

const { width, height } = Dimensions.get('window');

interface GeofencedCheckInScreenProps {
  jobId: string;
  onCheckIn: (location: Location.LocationObject) => void;
  onCheckOut: (location: Location.LocationObject) => void;
  onClose: () => void;
}

const GeofencedCheckInScreen: React.FC<GeofencedCheckInScreenProps> = ({
  jobId,
  onCheckIn,
  onCheckOut,
  onClose,
}) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [isWithinGeofence, setIsWithinGeofence] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Location permission is required for geofenced check-in.'
        );
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      
      setLocation(currentLocation);
      
      // Check if within geofence (simplified - in real app, compare with job location)
      const distance = calculateDistance(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude,
        24.7136, // Riyadh coordinates (example)
        46.6753
      );
      
      setIsWithinGeofence(distance <= 100); // 100 meters radius
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Failed to get current location');
    } finally {
      setLoading(false);
    }
  };

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

    return R * c;
  };

  const handleCheckIn = async () => {
    if (!location) {
      Alert.alert('Error', 'Location not available');
      return;
    }

    if (!isWithinGeofence) {
      Alert.alert(
        'Outside Geofence',
        'You must be within the job site to check in.'
      );
      return;
    }

    try {
      setLoading(true);
      await onCheckIn(location);
      setIsCheckedIn(true);
      setCheckInTime(new Date());
      Alert.alert('Success', 'Checked in successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to check in');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    if (!location) {
      Alert.alert('Error', 'Location not available');
      return;
    }

    try {
      setLoading(true);
      await onCheckOut(location);
      setIsCheckedIn(false);
      setCheckInTime(null);
      Alert.alert('Success', 'Checked out successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to check out');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Geofenced Check-In</Text>
      </View>

      <View style={styles.content}>
        {/* Location Status */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Ionicons 
              name={isWithinGeofence ? "checkmark-circle" : "close-circle"} 
              size={32} 
              color={isWithinGeofence ? COLORS.success : COLORS.error} 
            />
            <Text style={[styles.statusText, { 
              color: isWithinGeofence ? COLORS.success : COLORS.error 
            }]}>
              {isWithinGeofence ? 'Within Job Site' : 'Outside Job Site'}
            </Text>
          </View>
          
          {location && (
            <Text style={styles.locationText}>
              Lat: {location.coords.latitude.toFixed(6)}
              {'\n'}Lng: {location.coords.longitude.toFixed(6)}
            </Text>
          )}
        </View>

        {/* Check-in Status */}
        {isCheckedIn && checkInTime && (
          <View style={styles.checkInStatus}>
            <Ionicons name="time" size={24} color={COLORS.primary} />
            <Text style={styles.checkInText}>
              Checked in at {checkInTime.toLocaleTimeString()}
            </Text>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          {!isCheckedIn ? (
            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.checkInButton,
                (!isWithinGeofence || loading) && styles.disabledButton
              ]}
              onPress={handleCheckIn}
              disabled={!isWithinGeofence || loading}
            >
              <Ionicons name="log-in" size={24} color={COLORS.white} />
              <Text style={styles.buttonText}>
                {loading ? 'Checking In...' : 'Check In'}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.actionButton, styles.checkOutButton]}
              onPress={handleCheckOut}
              disabled={loading}
            >
              <Ionicons name="log-out" size={24} color={COLORS.white} />
              <Text style={styles.buttonText}>
                {loading ? 'Checking Out...' : 'Check Out'}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.actionButton, styles.refreshButton]}
            onPress={getCurrentLocation}
            disabled={loading}
          >
            <Ionicons name="refresh" size={24} color={COLORS.primary} />
            <Text style={[styles.buttonText, { color: COLORS.primary }]}>
              Refresh Location
            </Text>
          </TouchableOpacity>
        </View>

        {/* Instructions */}
        <View style={styles.instructions}>
          <Text style={styles.instructionText}>
            • You must be within 100 meters of the job site to check in
          </Text>
          <Text style={styles.instructionText}>
            • Location services must be enabled
          </Text>
          <Text style={styles.instructionText}>
            • Check in when you arrive at the job site
          </Text>
          <Text style={styles.instructionText}>
            • Check out when you complete your work
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  closeButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statusCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  locationText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: 'monospace',
  },
  checkInStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  checkInText: {
    fontSize: 16,
    color: COLORS.primary,
    marginLeft: 10,
    fontWeight: '500',
  },
  buttonContainer: {
    gap: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 10,
  },
  checkInButton: {
    backgroundColor: COLORS.success,
  },
  checkOutButton: {
    backgroundColor: COLORS.error,
  },
  refreshButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  disabledButton: {
    backgroundColor: COLORS.textSecondary,
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  instructions: {
    marginTop: 30,
    padding: 20,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
  },
  instructionText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default GeofencedCheckInScreen;
