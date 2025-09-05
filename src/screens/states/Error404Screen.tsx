import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

interface Props {
  onBackToDashboard?: () => void;
  errorPath?: string;
}

const Error404Screen: React.FC<Props> = ({
  onBackToDashboard,
  errorPath,
}) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const floatAnimation = new Animated.Value(0);

  React.useEffect(() => {
    const float = () => {
      Animated.sequence([
        Animated.timing(floatAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start(() => float());
    };
    float();
  }, []);

  const translateY = floatAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1a1a1a', '#2d2d2d'] : ['#f8f9fa', '#ffffff']}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* 404 Illustration */}
        <View style={styles.illustrationContainer}>
          <Animated.View
            style={[
              styles.blueprintContainer,
              { transform: [{ translateY }] }
            ]}
          >
            <View style={[styles.blueprintBackground, { backgroundColor: theme.surface }]}>
              <Ionicons name="document-text" size={80} color={theme.textSecondary} />
              
              {/* Torn effect */}
              <View style={[styles.tearLine, { backgroundColor: COLORS.error }]} />
              <View style={[styles.tearZigzag, { borderTopColor: COLORS.error }]} />
            </View>
          </Animated.View>

          {/* 404 Text */}
          <View style={styles.errorNumberContainer}>
            <Text style={[styles.errorNumber, { color: COLORS.error }]}>404</Text>
            <View style={[styles.errorNumberGlow, { shadowColor: COLORS.error }]} />
          </View>
        </View>

        {/* Error Message */}
        <View style={styles.messageContainer}>
          <Text style={[styles.errorTitle, { color: theme.text }]}>
            {getText({
              en: 'Page Not Found',
              ar: 'الصفحة غير موجودة'
            })}
          </Text>
          
          <Text style={[styles.errorDescription, { color: theme.textSecondary }]}>
            {getText({
              en: 'The page you\'re looking for seems to have been moved, deleted, or doesn\'t exist.',
              ar: 'يبدو أن الصفحة التي تبحث عنها قد تم نقلها أو حذفها أو أنها غير موجودة.'
            })}
          </Text>

          {errorPath && (
            <View style={[styles.pathContainer, { backgroundColor: theme.surface }]}>
              <Ionicons name="link" size={16} color={theme.textSecondary} />
              <Text style={[styles.pathText, { color: theme.textSecondary }]} numberOfLines={1}>
                {errorPath}
              </Text>
            </View>
          )}
        </View>

        {/* Helpful Links */}
        <View style={[styles.helpSection, { backgroundColor: theme.surface }]}>
          <Text style={[styles.helpTitle, { color: theme.text }]}>
            {getText({
              en: 'What can you do?',
              ar: 'ماذا يمكنك فعله؟'
            })}
          </Text>
          
          <View style={styles.helpOptions}>
            <View style={styles.helpOption}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
              <Text style={[styles.helpText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Go back to the dashboard',
                  ar: 'العودة إلى لوحة التحكم'
                })}
              </Text>
            </View>
            
            <View style={styles.helpOption}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
              <Text style={[styles.helpText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Check the URL for typos',
                  ar: 'تحقق من الرابط للأخطاء الإملائية'
                })}
              </Text>
            </View>
            
            <View style={styles.helpOption}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
              <Text style={[styles.helpText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Contact support if the issue persists',
                  ar: 'اتصل بالدعم إذا استمرت المشكلة'
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <CustomButton
            title={getText({
              en: 'Back to Dashboard',
              ar: 'العودة للرئيسية'
            })}
            onPress={onBackToDashboard}
            icon="home"
            size="large"
            fullWidth
            customStyle={styles.primaryButton}
          />

          <CustomButton
            title={getText({
              en: 'Contact Support',
              ar: 'اتصل بالدعم'
            })}
            onPress={() => {}}
            variant="outline"
            icon="headset"
            size="medium"
            fullWidth
            customStyle={styles.supportButton}
          />
        </View>

        {/* Fun Fact */}
        <View style={styles.funFactContainer}>
          <Ionicons name="bulb" size={20} color={COLORS.warning} />
          <Text style={[styles.funFactText, { color: theme.textSecondary }]}>
            {getText({
              en: 'Did you know? The first 404 error was at CERN in 1992!',
              ar: 'هل تعلم؟ أول خطأ 404 كان في سيرن عام 1992!'
            })}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xxl,
    maxWidth: 400,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
    position: 'relative',
  },
  blueprintContainer: {
    marginBottom: SPACING.lg,
  },
  blueprintBackground: {
    width: 160,
    height: 160,
    borderRadius: BORDER_RADIUS.xl,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  tearLine: {
    position: 'absolute',
    top: 60,
    left: -10,
    right: -10,
    height: 3,
    transform: [{ rotate: '-15deg' }],
  },
  tearZigzag: {
    position: 'absolute',
    top: 63,
    left: -10,
    right: -10,
    height: 0,
    borderTopWidth: 8,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{ rotate: '-15deg' }],
  },
  errorNumberContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  errorNumber: {
    fontSize: 80,
    fontWeight: TYPOGRAPHY.weights.bold,
    textAlign: 'center',
    elevation: 3,
  },
  errorNumberGlow: {
    position: 'absolute',
    width: 120,
    height: 80,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 3,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  errorTitle: {
    fontSize: TYPOGRAPHY.sizes.h1,
    fontWeight: TYPOGRAPHY.weights.bold,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  errorDescription: {
    fontSize: TYPOGRAPHY.sizes.body1,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SPACING.lg,
  },
  pathContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
    maxWidth: '100%',
  },
  pathText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontFamily: 'monospace',
    flex: 1,
  },
  helpSection: {
    width: '100%',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.xl,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  helpTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  helpOptions: {
    gap: SPACING.md,
  },
  helpOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  helpText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
  },
  actionContainer: {
    width: '100%',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  primaryButton: {
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  supportButton: {},
  funFactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  funFactText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontStyle: 'italic',
    flex: 1,
    textAlign: 'center',
  },
});

export default Error404Screen;