import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { RootState } from '../../store';
import { setLanguage } from '../../store/slices/appSlice';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { Language } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';

type SplashScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Splash'>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  useEffect(() => {
    // Auto-proceed after 3 seconds if no language selection is made
    const timer = setTimeout(() => {
      navigation.navigate('RoleSelection');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  const handleLanguageSelect = (selectedLanguage: Language) => {
    dispatch(setLanguage(selectedLanguage));
    setShowLanguageSelector(false);
    navigation.navigate('RoleSelection');
  };

  const handleGetStarted = () => {
    setShowLanguageSelector(true);
  };

  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1a1a1a', '#2d2d2d'] : ['#1B7A3E', '#4CAF50']}
      style={styles.container}
    >
      {/* Saudi Skyline Background */}
      <View style={styles.skylineContainer}>
        <View style={[styles.building, { height: 120, left: 20 }]} />
        <View style={[styles.building, { height: 80, left: 60 }]} />
        <View style={[styles.building, { height: 150, left: 100 }]} />
        <View style={[styles.building, { height: 90, left: 140 }]} />
        <View style={[styles.building, { height: 110, left: 180 }]} />
        <View style={[styles.building, { height: 70, left: 220 }]} />
        <View style={[styles.building, { height: 130, left: 260 }]} />
        <View style={[styles.building, { height: 95, left: 300 }]} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Ionicons name="construct" size={60} color={COLORS.white} />
          </View>
          <Text style={styles.appName}>NBCON PRO</Text>
          <Text style={styles.taglineEn}>Engineering Services On Demand</Text>
          <Text style={styles.taglineAr}>خدمات هندسية عند الطلب</Text>
        </View>

        {/* Vision 2030 Badge */}
        <View style={styles.visionBadge}>
          <Text style={styles.visionText}>Supporting Vision 2030</Text>
          <Text style={styles.visionTextAr}>دعم رؤية 2030</Text>
        </View>

        {/* Language Selection */}
        {!showLanguageSelector ? (
          <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
            <Text style={styles.getStartedText}>Get Started</Text>
            <Text style={styles.getStartedTextAr}>ابدأ الآن</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.languageSelector}>
            <Text style={styles.languageSelectorTitle}>Choose Your Language</Text>
            <Text style={styles.languageSelectorTitleAr}>اختر لغتك</Text>
            
            <View style={styles.languageButtons}>
              <TouchableOpacity
                style={[
                  styles.languageButton,
                  language === Language.ENGLISH && styles.selectedLanguageButton,
                ]}
                onPress={() => handleLanguageSelect(Language.ENGLISH)}
              >
                <Text style={[
                  styles.languageButtonText,
                  language === Language.ENGLISH && styles.selectedLanguageButtonText,
                ]}>
                  English
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.languageButton,
                  language === Language.ARABIC && styles.selectedLanguageButton,
                ]}
                onPress={() => handleLanguageSelect(Language.ARABIC)}
              >
                <Text style={[
                  styles.languageButtonText,
                  language === Language.ARABIC && styles.selectedLanguageButtonText,
                ]}>
                  العربية
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Made in Saudi Arabia</Text>
        <Text style={styles.footerTextAr}>صُنع في المملكة العربية السعودية</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skylineContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    opacity: 0.2,
  },
  building: {
    position: 'absolute',
    bottom: 0,
    width: 30,
    backgroundColor: COLORS.white,
    opacity: 0.3,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  appName: {
    fontSize: TYPOGRAPHY.sizes.h4,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SPACING.sm,
    letterSpacing: 2,
  },
  taglineEn: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.white,
    textAlign: 'center',
    opacity: 0.9,
  },
  taglineAr: {
    fontSize: TYPOGRAPHY.sizes.subtitle2,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.white,
    textAlign: 'center',
    opacity: 0.8,
    marginTop: SPACING.xs,
  },
  visionBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.xxl,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  visionText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.white,
    textAlign: 'center',
  },
  visionTextAr: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.regular,
    color: COLORS.white,
    textAlign: 'center',
    opacity: 0.8,
    marginTop: 2,
  },
  getStartedButton: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    minWidth: 200,
    alignItems: 'center',
  },
  getStartedText: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
  },
  getStartedTextAr: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.primary,
    opacity: 0.8,
    marginTop: 2,
  },
  languageSelector: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    minWidth: 280,
  },
  languageSelectorTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  languageSelectorTitleAr: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.white,
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: SPACING.lg,
  },
  languageButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  languageButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    minWidth: 100,
    alignItems: 'center',
  },
  selectedLanguageButton: {
    backgroundColor: COLORS.white,
  },
  languageButtonText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.white,
  },
  selectedLanguageButtonText: {
    color: COLORS.primary,
  },
  footer: {
    position: 'absolute',
    bottom: SPACING.xl,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.regular,
    color: COLORS.white,
    opacity: 0.7,
  },
  footerTextAr: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.regular,
    color: COLORS.white,
    opacity: 0.6,
    marginTop: 2,
  },
});

// Import BORDER_RADIUS from constants
const { BORDER_RADIUS } = require('../../constants');

export default SplashScreen;