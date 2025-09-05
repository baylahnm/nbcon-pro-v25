import * as Location from 'expo-location';
import { Alert } from 'react-native';

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number;
  heading?: number;
  speed?: number;
}

export interface ServiceArea {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number; // in kilometers
}

export interface LocationPermission {
  granted: boolean;
  canAskAgain: boolean;
  status: Location.PermissionStatus;
}

// Saudi Arabia major cities coordinates
export const SAUDI_CITIES = [
  { id: 'riyadh', name: { en: 'Riyadh', ar: 'الرياض' }, lat: 24.7136, lng: 46.6753 },
  { id: 'jeddah', name: { en: 'Jeddah', ar: 'جدة' }, lat: 21.4858, lng: 39.1925 },
  { id: 'makkah', name: { en: 'Makkah', ar: 'مكة المكرمة' }, lat: 21.3891, lng: 39.8579 },
  { id: 'medina', name: { en: 'Medina', ar: 'المدينة المنورة' }, lat: 24.5247, lng: 39.5692 },
  { id: 'dammam', name: { en: 'Dammam', ar: 'الدمام' }, lat: 26.4207, lng: 50.0888 },
  { id: 'khobar', name: { en: 'Al Khobar', ar: 'الخبر' }, lat: 26.2172, lng: 50.1971 },
  { id: 'tabuk', name: { en: 'Tabuk', ar: 'تبوك' }, lat: 28.3998, lng: 36.5660 },
  { id: 'abha', name: { en: 'Abha', ar: 'أبها' }, lat: 18.2164, lng: 42.5053 },
  { id: 'hail', name: { en: 'Hail', ar: 'حائل' }, lat: 27.5114, lng: 41.7208 },
  { id: 'qassim', name: { en: 'Al Qassim', ar: 'القصيم' }, lat: 26.3260, lng: 43.9750 },
  { id: 'taif', name: { en: 'Taif', ar: 'الطائف' }, lat: 21.2703, lng: 40.4158 },
  { id: 'buraidah', name: { en: 'Buraidah', ar: 'بريدة' }, lat: 26.3260, lng: 43.9750 },
  { id: 'khamis_mushait', name: { en: 'Khamis Mushait', ar: 'خميس مشيط' }, lat: 18.3000, lng: 42.7333 },
  { id: 'hafr_al_batin', name: { en: 'Hafr Al-Batin', ar: 'حفر الباطن' }, lat: 28.4333, lng: 45.9667 },
  { id: 'jubail', name: { en: 'Jubail', ar: 'الجبيل' }, lat: 27.0174, lng: 49.6225 },
];

// Saudi Arabia boundaries
export const SAUDI_BOUNDARIES = {
  north: 32.1543,
  south: 16.3479,
  east: 55.6666,
  west: 34.4957,
};

class LocationServices {
  private static instance: LocationServices;
  private currentLocation: LocationData | null = null;
  private watchId: Location.LocationSubscription | null = null;

  private constructor() {}

  public static getInstance(): LocationServices {
    if (!LocationServices.instance) {
      LocationServices.instance = new LocationServices();
    }
    return LocationServices.instance;
  }

  /**
   * Request location permissions
   */
  public async requestLocationPermission(): Promise<LocationPermission> {
    try {
      const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();
      
      return {
        granted: status === 'granted',
        canAskAgain,
        status,
      };
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return {
        granted: false,
        canAskAgain: false,
        status: 'denied' as Location.PermissionStatus,
      };
    }
  }

  /**
   * Check if location permission is granted
   */
  public async checkLocationPermission(): Promise<LocationPermission> {
    try {
      const { status, canAskAgain } = await Location.getForegroundPermissionsAsync();
      
      return {
        granted: status === 'granted',
        canAskAgain,
        status,
      };
    } catch (error) {
      console.error('Error checking location permission:', error);
      return {
        granted: false,
        canAskAgain: false,
        status: 'denied' as Location.PermissionStatus,
      };
    }
  }

  /**
   * Get current location
   */
  public async getCurrentLocation(): Promise<LocationData | null> {
    try {
      const permission = await this.checkLocationPermission();
      
      if (!permission.granted) {
        const newPermission = await this.requestLocationPermission();
        if (!newPermission.granted) {
          throw new Error('Location permission denied');
        }
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 10000,
        distanceInterval: 100,
      });

      const locationData: LocationData = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy,
        altitude: location.coords.altitude,
        heading: location.coords.heading,
        speed: location.coords.speed,
      };

      this.currentLocation = locationData;
      return locationData;
    } catch (error) {
      console.error('Error getting current location:', error);
      return null;
    }
  }

  /**
   * Watch location changes
   */
  public async watchLocation(
    onLocationUpdate: (location: LocationData) => void,
    onError?: (error: Error) => void
  ): Promise<void> {
    try {
      const permission = await this.checkLocationPermission();
      
      if (!permission.granted) {
        const newPermission = await this.requestLocationPermission();
        if (!newPermission.granted) {
          throw new Error('Location permission denied');
        }
      }

      this.watchId = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (location) => {
          const locationData: LocationData = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            accuracy: location.coords.accuracy,
            altitude: location.coords.altitude,
            heading: location.coords.heading,
            speed: location.coords.speed,
          };
          
          this.currentLocation = locationData;
          onLocationUpdate(locationData);
        }
      );
    } catch (error) {
      console.error('Error watching location:', error);
      if (onError) {
        onError(error as Error);
      }
    }
  }

  /**
   * Stop watching location
   */
  public stopWatchingLocation(): void {
    if (this.watchId) {
      this.watchId.remove();
      this.watchId = null;
    }
  }

  /**
   * Get cached current location
   */
  public getCachedLocation(): LocationData | null {
    return this.currentLocation;
  }

  /**
   * Calculate distance between two points in kilometers
   */
  public calculateDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLng = this.toRadians(lng2 - lng1);
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /**
   * Check if a location is within a service area
   */
  public isLocationInServiceArea(
    location: LocationData,
    serviceArea: ServiceArea
  ): boolean {
    const distance = this.calculateDistance(
      location.latitude,
      location.longitude,
      serviceArea.latitude,
      serviceArea.longitude
    );
    
    return distance <= serviceArea.radius;
  }

  /**
   * Find nearby service areas
   */
  public findNearbyServiceAreas(
    location: LocationData,
    serviceAreas: ServiceArea[],
    maxDistance: number = 50
  ): ServiceArea[] {
    return serviceAreas.filter(area => {
      const distance = this.calculateDistance(
        location.latitude,
        location.longitude,
        area.latitude,
        area.longitude
      );
      return distance <= maxDistance;
    });
  }

  /**
   * Get nearest city
   */
  public getNearestCity(location: LocationData): typeof SAUDI_CITIES[0] | null {
    let nearestCity = null;
    let minDistance = Infinity;

    for (const city of SAUDI_CITIES) {
      const distance = this.calculateDistance(
        location.latitude,
        location.longitude,
        city.lat,
        city.lng
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        nearestCity = city;
      }
    }

    return nearestCity;
  }

  /**
   * Check if location is within Saudi Arabia
   */
  public isLocationInSaudiArabia(location: LocationData): boolean {
    return (
      location.latitude >= SAUDI_BOUNDARIES.south &&
      location.latitude <= SAUDI_BOUNDARIES.north &&
      location.longitude >= SAUDI_BOUNDARIES.west &&
      location.longitude <= SAUDI_BOUNDARIES.east
    );
  }

  /**
   * Get geocoded address from coordinates
   */
  public async getAddressFromCoordinates(
    latitude: number,
    longitude: number
  ): Promise<string | null> {
    try {
      const addresses = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (addresses.length > 0) {
        const address = addresses[0];
        const parts = [
          address.street,
          address.district,
          address.city,
          address.region,
          address.country,
        ].filter(Boolean);
        
        return parts.join(', ');
      }

      return null;
    } catch (error) {
      console.error('Error getting address from coordinates:', error);
      return null;
    }
  }

  /**
   * Get coordinates from address
   */
  public async getCoordinatesFromAddress(address: string): Promise<LocationData | null> {
    try {
      const locations = await Location.geocodeAsync(address);
      
      if (locations.length > 0) {
        const location = locations[0];
        return {
          latitude: location.latitude,
          longitude: location.longitude,
        };
      }

      return null;
    } catch (error) {
      console.error('Error getting coordinates from address:', error);
      return null;
    }
  }

  /**
   * Show location permission alert
   */
  public showLocationPermissionAlert(
    title: string,
    message: string,
    onPress: () => void
  ): void {
    Alert.alert(title, message, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Settings', onPress },
    ]);
  }

  /**
   * Convert degrees to radians
   */
  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  /**
   * Format distance for display
   */
  public formatDistance(distance: number): string {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    }
    return `${distance.toFixed(1)}km`;
  }

  /**
   * Get location accuracy description
   */
  public getAccuracyDescription(accuracy: number | null | undefined): string {
    if (!accuracy) return 'Unknown';
    
    if (accuracy <= 5) return 'Excellent';
    if (accuracy <= 10) return 'Good';
    if (accuracy <= 20) return 'Fair';
    if (accuracy <= 50) return 'Poor';
    return 'Very Poor';
  }
}

export default LocationServices.getInstance();
