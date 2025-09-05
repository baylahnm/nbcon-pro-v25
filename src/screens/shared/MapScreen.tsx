import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import * as Location from 'expo-location';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

interface MapMarker {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  type: 'job' | 'engineer' | 'service_area';
  status?: 'active' | 'pending' | 'completed';
  budget?: number;
  engineer?: string;
  client?: string;
}

interface ServiceArea {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number;
  engineerCount: number;
  activeJobs: number;
}

const { width, height } = Dimensions.get('window');

// Saudi Arabia major cities coordinates
const SAUDI_CITIES = [
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
];

const MapScreen: React.FC = () => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [activeTab, setActiveTab] = useState<'jobs' | 'engineers' | 'areas'>('jobs');
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 24.7136, lng: 46.6753 }); // Riyadh as default
  const [isLoading, setIsLoading] = useState(false);

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  useEffect(() => {
    getCurrentLocation();
    loadMapData();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        const newLocation = {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        };
        setCurrentLocation(newLocation);
        setMapCenter(newLocation);
      }
    } catch (error) {
      console.log('Location error:', error);
    }
  };

  const loadMapData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  // Mock data - in real app, this would come from Redux store
  const jobMarkers: MapMarker[] = [
    {
      id: '1',
      title: 'Site Survey for NEOM Project',
      description: 'Comprehensive site survey for new construction project',
      latitude: 24.7136,
      longitude: 46.6753,
      type: 'job',
      status: 'active',
      budget: 15000,
      client: 'Ahmed Al-Rashid',
    },
    {
      id: '2',
      title: 'MEP Design Review',
      description: 'Review MEP designs for commercial building',
      latitude: 21.4858,
      longitude: 39.1925,
      type: 'job',
      status: 'pending',
      budget: 8000,
      client: 'Sarah Al-Mansouri',
    },
    {
      id: '3',
      title: 'Safety Inspection',
      description: 'Urgent safety inspection required for industrial site',
      latitude: 26.4207,
      longitude: 50.0888,
      type: 'job',
      status: 'active',
      budget: 5000,
      client: 'Mohammed Al-Zahrani',
    },
  ];

  const engineerMarkers: MapMarker[] = [
    {
      id: '1',
      title: 'Sarah Al-Mansouri',
      description: 'Civil Engineer - Available',
      latitude: 24.7500,
      longitude: 46.7000,
      type: 'engineer',
    },
    {
      id: '2',
      title: 'Ahmed Al-Rashid',
      description: 'MEP Engineer - Busy',
      latitude: 21.5000,
      longitude: 39.2000,
      type: 'engineer',
    },
    {
      id: '3',
      title: 'Fatima Al-Sheikh',
      description: 'HSE Engineer - Available',
      latitude: 26.4500,
      longitude: 50.1000,
      type: 'engineer',
    },
  ];

  const serviceAreas: ServiceArea[] = [
    {
      id: '1',
      name: 'Riyadh Central',
      latitude: 24.7136,
      longitude: 46.6753,
      radius: 25,
      engineerCount: 15,
      activeJobs: 8,
    },
    {
      id: '2',
      name: 'Jeddah Industrial',
      latitude: 21.4858,
      longitude: 39.1925,
      radius: 30,
      engineerCount: 12,
      activeJobs: 5,
    },
    {
      id: '3',
      name: 'Dammam Port Area',
      latitude: 26.4207,
      longitude: 50.0888,
      radius: 20,
      engineerCount: 8,
      activeJobs: 3,
    },
  ];

  const getCurrentMarkers = () => {
    switch (activeTab) {
      case 'jobs':
        return jobMarkers;
      case 'engineers':
        return engineerMarkers;
      case 'areas':
        return serviceAreas.map(area => ({
          id: area.id,
          title: area.name,
          description: `${area.engineerCount} engineers, ${area.activeJobs} active jobs`,
          latitude: area.latitude,
          longitude: area.longitude,
          type: 'service_area' as const,
        }));
      default:
        return [];
    }
  };

  const getMarkerIcon = (type: string, status?: string) => {
    switch (type) {
      case 'job':
        return status === 'active' ? 'briefcase' : 'briefcase-outline';
      case 'engineer':
        return 'person';
      case 'service_area':
        return 'location';
      default:
        return 'pin';
    }
  };

  const getMarkerColor = (type: string, status?: string) => {
    switch (type) {
      case 'job':
        return status === 'active' ? COLORS.primary : COLORS.warning;
      case 'engineer':
        return COLORS.secondary;
      case 'service_area':
        return COLORS.accent;
      default:
        return COLORS.light.textSecondary;
    }
  };

  const renderMap = () => (
    <View style={[styles.mapContainer, { backgroundColor: theme.surface }]}>
      <Text style={[styles.mapTitle, { color: theme.text }]}>
        {isArabic ? 'المملكة العربية السعودية' : 'Kingdom of Saudi Arabia'}
      </Text>
      
      {/* Simplified map representation */}
      <View style={styles.mapPlaceholder}>
        <View style={styles.saudiMapOutline}>
          {/* Current location indicator */}
          {currentLocation && (
            <View style={[styles.currentLocationDot, { 
              left: '50%', 
              top: '50%',
              transform: [{ translateX: -3 }, { translateY: -3 }]
            }]} />
          )}
          
          {/* Markers */}
          {getCurrentMarkers().map((marker, index) => (
            <TouchableOpacity
              key={marker.id}
              style={[
                styles.marker,
                {
                  left: `${30 + (index * 20)}%`,
                  top: `${25 + (index * 15)}%`,
                  backgroundColor: getMarkerColor(marker.type, marker.status),
                },
              ]}
              onPress={() => setSelectedMarker(marker)}
            >
              <Ionicons 
                name={getMarkerIcon(marker.type, marker.status) as any} 
                size={16} 
                color="white" 
              />
            </TouchableOpacity>
          ))}
          
          {/* Service area circles for areas tab */}
          {activeTab === 'areas' && serviceAreas.map((area, index) => (
            <View
              key={area.id}
              style={[
                styles.serviceAreaCircle,
                {
                  left: `${30 + (index * 20)}%`,
                  top: `${25 + (index * 15)}%`,
                  width: area.radius,
                  height: area.radius,
                  borderRadius: area.radius / 2,
                },
              ]}
            />
          ))}
          
          {/* City labels */}
          <View style={[styles.cityDot, { left: '45%', top: '40%' }]} />
          <Text style={[styles.cityLabel, { left: '47%', top: '37%', color: theme.text }]}>
            {isArabic ? 'الرياض' : 'Riyadh'}
          </Text>
          
          <View style={[styles.cityDot, { left: '25%', top: '60%' }]} />
          <Text style={[styles.cityLabel, { left: '27%', top: '57%', color: theme.text }]}>
            {isArabic ? 'جدة' : 'Jeddah'}
          </Text>
          
          <View style={[styles.cityDot, { left: '65%', top: '45%' }]} />
          <Text style={[styles.cityLabel, { left: '67%', top: '42%', color: theme.text }]}>
            {isArabic ? 'الدمام' : 'Dammam'}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderMarkerDetails = () => {
    if (!selectedMarker) return null;

    return (
      <View style={[styles.markerDetails, { backgroundColor: theme.surface }]}>
        <View style={styles.markerHeader}>
          <View style={styles.markerInfo}>
            <Ionicons 
              name={getMarkerIcon(selectedMarker.type, selectedMarker.status) as any} 
              size={24} 
              color={getMarkerColor(selectedMarker.type, selectedMarker.status)} 
            />
            <View style={styles.markerText}>
              <Text style={[styles.markerTitle, { color: theme.text }]}>
                {selectedMarker.title}
              </Text>
              <Text style={[styles.markerDescription, { color: theme.textSecondary }]}>
                {selectedMarker.description}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => setSelectedMarker(null)}>
            <Ionicons name="close" size={24} color={theme.textSecondary} />
          </TouchableOpacity>
        </View>
        
        {selectedMarker.budget && (
          <View style={styles.markerBudget}>
            <Text style={[styles.budgetLabel, { color: theme.textSecondary }]}>
              {isArabic ? 'الميزانية' : 'Budget'}
            </Text>
            <Text style={[styles.budgetAmount, { color: theme.text }]}>
              {selectedMarker.budget.toLocaleString()} SAR
            </Text>
          </View>
        )}
        
        {selectedMarker.client && (
          <View style={styles.markerClient}>
            <Text style={[styles.clientLabel, { color: theme.textSecondary }]}>
              {isArabic ? 'العميل' : 'Client'}
            </Text>
            <Text style={[styles.clientName, { color: theme.text }]}>
              {selectedMarker.client}
            </Text>
          </View>
        )}
        
        <CustomButton
          title={{ 
            en: selectedMarker.type === 'job' ? 'View Details' : 'Contact',
            ar: selectedMarker.type === 'job' ? 'عرض التفاصيل' : 'تواصل'
          }}
          onPress={() => console.log('Action for marker:', selectedMarker.id)}
          size="small"
          style={styles.markerAction}
        />
      </View>
    );
  };

  const renderTabContent = () => {
    const markers = getCurrentMarkers();
    
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderMap()}
        
        {/* Markers List */}
        <View style={styles.markersList}>
          <Text style={[styles.listTitle, { color: theme.text }]}>
            {isArabic ? 'القائمة' : 'List View'}
          </Text>
          
          {markers.map((marker) => (
            <TouchableOpacity
              key={marker.id}
              style={[styles.markerItem, { backgroundColor: theme.surface }]}
              onPress={() => setSelectedMarker(marker)}
            >
              <View style={styles.markerItemInfo}>
                <Ionicons 
                  name={getMarkerIcon(marker.type, marker.status) as any} 
                  size={20} 
                  color={getMarkerColor(marker.type, marker.status)} 
                />
                <View style={styles.markerItemText}>
                  <Text style={[styles.markerItemTitle, { color: theme.text }]}>
                    {marker.title}
                  </Text>
                  <Text style={[styles.markerItemDescription, { color: theme.textSecondary }]}>
                    {marker.description}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          {isArabic ? 'الخريطة' : 'Map'}
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          {isArabic ? 'عرض الوظائف والمهندسين والمناطق' : 'View jobs, engineers, and service areas'}
        </Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {[
          { id: 'jobs', title: { en: 'Jobs', ar: 'الوظائف' }, icon: 'briefcase' },
          { id: 'engineers', title: { en: 'Engineers', ar: 'المهندسين' }, icon: 'people' },
          { id: 'areas', title: { en: 'Areas', ar: 'المناطق' }, icon: 'location' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              {
                borderBottomColor: activeTab === tab.id ? COLORS.primary : 'transparent',
              },
            ]}
            onPress={() => setActiveTab(tab.id as any)}
          >
            <Ionicons 
              name={tab.icon as any} 
              size={20} 
              color={activeTab === tab.id ? COLORS.primary : theme.textSecondary} 
            />
            <Text
              style={[
                styles.tabText,
                {
                  color: activeTab === tab.id ? COLORS.primary : theme.textSecondary,
                },
              ]}
            >
              {getText(tab.title)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {renderTabContent()}
      </View>

      {/* Marker Details Modal */}
      {selectedMarker && renderMarkerDetails()}

      {/* Location Button */}
      <TouchableOpacity
        style={[styles.locationButton, { backgroundColor: COLORS.primary }]}
        onPress={getCurrentLocation}
      >
        <Ionicons name="locate" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.h2,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.regular,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light.border,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 2,
    gap: SPACING.xs,
  },
  tabText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  content: {
    flex: 1,
  },
  mapContainer: {
    margin: SPACING.lg,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.light.border,
  },
  mapTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  saudiMapOutline: {
    width: '90%',
    height: 150,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    position: 'relative',
    backgroundColor: 'rgba(27, 122, 62, 0.1)',
  },
  currentLocationDot: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.error,
    borderWidth: 2,
    borderColor: 'white',
  },
  marker: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  serviceAreaCircle: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: COLORS.accent,
    backgroundColor: 'rgba(255, 152, 0, 0.2)',
  },
  cityDot: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.secondary,
  },
  cityLabel: {
    position: 'absolute',
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  markersList: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  listTitle: {
    fontSize: TYPOGRAPHY.sizes.h4,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.md,
  },
  markerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.light.border,
    marginBottom: SPACING.sm,
  },
  markerItemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  markerItemText: {
    marginLeft: SPACING.sm,
    flex: 1,
  },
  markerItemTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.xs,
  },
  markerItemDescription: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  markerDetails: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.lg,
    borderTopLeftRadius: BORDER_RADIUS.lg,
    borderTopRightRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.light.border,
    borderBottomWidth: 0,
  },
  markerHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  markerInfo: {
    flexDirection: 'row',
    flex: 1,
    marginRight: SPACING.sm,
  },
  markerText: {
    marginLeft: SPACING.sm,
    flex: 1,
  },
  markerTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  markerDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 18,
  },
  markerBudget: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  budgetLabel: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  budgetAmount: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  markerClient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  clientLabel: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  clientName: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  markerAction: {
    marginTop: SPACING.sm,
  },
  locationButton: {
    position: 'absolute',
    bottom: 100,
    right: SPACING.lg,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default MapScreen;
