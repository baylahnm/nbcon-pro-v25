import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

import { RootState } from '../../store';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { Language } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SAUDI_REGIONS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

type ServiceAreaNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'ServiceArea'>;
type ServiceAreaRouteProp = RouteProp<AuthStackParamList, 'ServiceArea'>;

interface Props {
  navigation: ServiceAreaNavigationProp;
  route: ServiceAreaRouteProp;
}

interface ServiceArea {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number; // in kilometers
}

const { width, height } = Dimensions.get('window');

// Saudi Arabia coordinates for major cities
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

const ServiceAreaScreen: React.FC<Props> = ({ navigation, route }) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const { userInfo } = route.params;

  const [serviceAreas, setServiceAreas] = useState<ServiceArea[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [customRadius, setCustomRadius] = useState<string>('25');
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      }
    } catch (error) {
      // Use Riyadh as default if location not available
      setCurrentLocation({ lat: 24.7136, lng: 46.6753 });
    }
  };

  const addServiceArea = (cityId: string) => {
    const city = SAUDI_CITIES.find(c => c.id === cityId);
    if (!city) return;

    const radius = parseInt(customRadius) || 25;
    const area: ServiceArea = {
      id: `${cityId}_${Date.now()}`,
      name: getText(city.name),
      latitude: city.lat,
      longitude: city.lng,
      radius: radius,
    };

    setServiceAreas(prev => [...prev, area]);
    setSelectedCity('');
  };

  const removeServiceArea = (id: string) => {
    setServiceAreas(prev => prev.filter(area => area.id !== id));
  };

  const handleContinue = async () => {
    if (serviceAreas.length === 0) {
      Alert.alert(
        isArabic ? 'منطقة خدمة مطلوبة' : 'Service Area Required',
        isArabic 
          ? 'يرجى إضافة منطقة خدمة واحدة على الأقل'
          : 'Please add at least one service area',
        [{ text: isArabic ? 'موافق' : 'OK' }]
      );
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call to save service areas
      await new Promise(resolve => setTimeout(resolve, 1500));

      const updatedUserInfo = {
        ...userInfo,
        serviceAreas,
      };

      navigation.navigate('RateSetting', { userInfo: updatedUserInfo });
    } catch (error) {
      Alert.alert(
        isArabic ? 'خطأ' : 'Error',
        isArabic 
          ? 'حدث خطأ أثناء حفظ مناطق الخدمة. يرجى المحاولة مرة أخرى.'
          : 'Failed to save service areas. Please try again.',
        [{ text: isArabic ? 'موافق' : 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1a1a1a', '#2d2d2d'] : ['#f8f9fa', '#ffffff']}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: COLORS.primary }]}>
            <Ionicons name="location" size={40} color={COLORS.white} />
          </View>
          
          <Text style={[styles.title, { color: theme.text }]}>
            {isArabic ? 'مناطق الخدمة' : 'Service Areas'}
          </Text>
          
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {isArabic 
              ? 'حدد المناطق التي تقدم فيها خدماتك الهندسية'
              : 'Define the areas where you provide your engineering services'
            }
          </Text>
        </View>

        {/* Saudi Map Representation */}
        <View style={[styles.mapContainer, { backgroundColor: theme.surface }]}>
          <Text style={[styles.mapTitle, { color: theme.text }]}>
            {isArabic ? 'المملكة العربية السعودية' : 'Kingdom of Saudi Arabia'}
          </Text>
          
          {/* Simplified Saudi map representation */}
          <View style={styles.mapPlaceholder}>
            <View style={styles.saudiMapOutline}>
              {/* Show service area circles */}
              {serviceAreas.map((area, index) => (
                <View
                  key={area.id}
                  style={[
                    styles.serviceCircle,
                    {
                      left: `${20 + (index * 15)}%`,
                      top: `${30 + (index * 10)}%`,
                      width: area.radius * 2,
                      height: area.radius * 2,
                      borderRadius: area.radius,
                    },
                  ]}
                />
              ))}
              
              {/* Major cities indicators */}
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

        {/* Add Service Area */}
        <View style={styles.addAreaContainer}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {isArabic ? 'إضافة منطقة خدمة' : 'Add Service Area'}
          </Text>

          {/* City Selection */}
          <View style={styles.citySelection}>
            <Text style={[styles.label, { color: theme.text }]}>
              {isArabic ? 'اختر المدينة' : 'Select City'}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cityList}>
              {SAUDI_CITIES.map((city) => (
                <TouchableOpacity
                  key={city.id}
                  style={[
                    styles.cityChip,
                    { 
                      backgroundColor: selectedCity === city.id ? COLORS.primary : theme.surface,
                      borderColor: selectedCity === city.id ? COLORS.primary : theme.border,
                    },
                  ]}
                  onPress={() => setSelectedCity(city.id)}
                >
                  <Text
                    style={[
                      styles.cityChipText,
                      { color: selectedCity === city.id ? COLORS.white : theme.text },
                    ]}
                  >
                    {getText(city.name)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Radius Selection */}
          <View style={styles.radiusSelection}>
            <Text style={[styles.label, { color: theme.text }]}>
              {isArabic ? 'نطاق الخدمة (كم)' : 'Service Radius (km)'}
            </Text>
            <View style={styles.radiusInputContainer}>
              <TextInput
                style={[
                  styles.radiusInput,
                  { 
                    backgroundColor: theme.surface,
                    borderColor: theme.border,
                    color: theme.text,
                  },
                ]}
                value={customRadius}
                onChangeText={setCustomRadius}
                keyboardType="number-pad"
                placeholder="25"
                placeholderTextColor={theme.textSecondary}
              />
              <Text style={[styles.radiusLabel, { color: theme.textSecondary }]}>
                {isArabic ? 'كيلومتر' : 'kilometers'}
              </Text>
            </View>
          </View>

          {/* Add Button */}
          <TouchableOpacity
            style={[
              styles.addButton,
              { 
                backgroundColor: selectedCity ? COLORS.primary : theme.border,
                opacity: selectedCity ? 1 : 0.5,
              },
            ]}
            onPress={() => selectedCity && addServiceArea(selectedCity)}
            disabled={!selectedCity}
          >
            <Ionicons name="add" size={20} color={COLORS.white} />
            <Text style={styles.addButtonText}>
              {isArabic ? 'إضافة منطقة' : 'Add Area'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Service Areas List */}
        {serviceAreas.length > 0 && (
          <View style={styles.areasListContainer}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {isArabic ? 'مناطق الخدمة المختارة' : 'Selected Service Areas'}
            </Text>
            
            {serviceAreas.map((area) => (
              <View key={area.id} style={[styles.areaItem, { backgroundColor: theme.surface }]}>
                <View style={styles.areaInfo}>
                  <Ionicons name="location" size={20} color={COLORS.primary} />
                  <View style={styles.areaDetails}>
                    <Text style={[styles.areaName, { color: theme.text }]}>
                      {area.name}
                    </Text>
                    <Text style={[styles.areaRadius, { color: theme.textSecondary }]}>
                      {isArabic 
                        ? `نطاق ${area.radius} كم`
                        : `${area.radius} km radius`
                      }
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => removeServiceArea(area.id)}>
                  <Ionicons name="close-circle" size={24} color={COLORS.error} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        <CustomButton
          title={{ 
            en: 'Continue', 
            ar: 'متابعة' 
          }}
          onPress={handleContinue}
          loading={isLoading}
          disabled={serviceAreas.length === 0}
          icon="arrow-forward"
          fullWidth
          size="large"
          customStyle={styles.continueButton}
        />

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '90%', backgroundColor: COLORS.primary }]} />
          </View>
          <Text style={[styles.progressText, { color: theme.textSecondary }]}>
            {isArabic ? '4 من 5' : '4 of 5'}
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    marginTop: SPACING.lg,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.h5,
    fontWeight: TYPOGRAPHY.weights.bold,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.regular,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: SPACING.md,
  },
  mapContainer: {
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    minHeight: 200,
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
    minHeight: 150,
  },
  saudiMapOutline: {
    width: '90%',
    height: 120,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    position: 'relative',
    backgroundColor: 'rgba(27, 122, 62, 0.1)',
  },
  serviceCircle: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: COLORS.accent,
    backgroundColor: 'rgba(255, 152, 0, 0.2)',
  },
  cityDot: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.secondary,
  },
  cityLabel: {
    position: 'absolute',
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  addAreaContainer: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.md,
  },
  citySelection: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.sm,
  },
  cityList: {
    flexDirection: 'row',
  },
  cityChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    marginRight: SPACING.sm,
  },
  cityChipText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  radiusSelection: {
    marginBottom: SPACING.lg,
  },
  radiusInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radiusInput: {
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: TYPOGRAPHY.sizes.body1,
    width: 80,
    textAlign: 'center',
  },
  radiusLabel: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: SPACING.sm,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
  },
  addButtonText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.white,
  },
  areasListContainer: {
    marginBottom: SPACING.xl,
  },
  areaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
  },
  areaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  areaDetails: {
    marginLeft: SPACING.sm,
    flex: 1,
  },
  areaName: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.xs,
  },
  areaRadius: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  continueButton: {
    marginTop: SPACING.lg,
  },
  progressContainer: {
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: COLORS.light.border,
    borderRadius: 2,
    marginBottom: SPACING.sm,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
});

export default ServiceAreaScreen;
