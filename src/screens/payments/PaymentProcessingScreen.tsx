import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

interface Props {
  amount?: string;
  paymentMethod?: string;
  recipient?: string;
  transactionId?: string;
  onSuccess?: () => void;
  onFailure?: (error: string) => void;
  onCancel?: () => void;
}

type PaymentStage = 'processing' | 'verifying' | 'success' | 'failed';

const PaymentProcessingScreen: React.FC<Props> = ({
  amount = '25,000 SAR',
  paymentMethod = 'mada Card ending in 4521',
  recipient = 'Ahmed Al-Rashid',
  transactionId = 'TXN-2024-001234',
  onSuccess,
  onFailure,
  onCancel,
}) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [currentStage, setCurrentStage] = useState<PaymentStage>('processing');
  const [progress, setProgress] = useState(0);
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const spinAnimation = new Animated.Value(0);
  const scaleAnimation = new Animated.Value(1);
  const fadeAnimation = new Animated.Value(1);
  const progressAnimation = new Animated.Value(0);

  useEffect(() => {
    // Start spinning animation for processing
    const spinAnimationLoop = () => {
      Animated.timing(spinAnimation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        spinAnimation.setValue(0);
        if (currentStage === 'processing' || currentStage === 'verifying') {
          spinAnimationLoop();
        }
      });
    };

    spinAnimationLoop();

    // Simulate payment processing stages
    const processPayment = async () => {
      // Stage 1: Processing (3 seconds)
      setCurrentStage('processing');
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Stage 2: Verifying (2 seconds)
      setCurrentStage('verifying');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Stage 3: Success or Failure (simulate 90% success rate)
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        setCurrentStage('success');
        // Success animation
        Animated.sequence([
          Animated.timing(scaleAnimation, {
            toValue: 1.2,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnimation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
        
        setTimeout(() => onSuccess?.(), 2000);
      } else {
        setCurrentStage('failed');
        // Failure animation
        Animated.sequence([
          Animated.timing(scaleAnimation, {
            toValue: 0.8,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnimation, {
            toValue: 1.1,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnimation, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start();
        
        setTimeout(() => onFailure?.('Payment verification failed'), 2000);
      }
    };

    // Progress animation
    Animated.timing(progressAnimation, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start();

    processPayment();
  }, []);

  useEffect(() => {
    const listener = progressAnimation.addListener(({ value }) => {
      setProgress(value * 100);
    });

    return () => progressAnimation.removeListener(listener);
  }, []);

  const spin = spinAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const getStageIcon = () => {
    switch (currentStage) {
      case 'processing':
        return 'card';
      case 'verifying':
        return 'shield-checkmark';
      case 'success':
        return 'checkmark-circle';
      case 'failed':
        return 'close-circle';
      default:
        return 'card';
    }
  };

  const getStageColor = () => {
    switch (currentStage) {
      case 'processing':
        return COLORS.primary;
      case 'verifying':
        return COLORS.warning;
      case 'success':
        return COLORS.success;
      case 'failed':
        return COLORS.error;
      default:
        return COLORS.primary;
    }
  };

  const getStageMessage = () => {
    switch (currentStage) {
      case 'processing':
        return getText({
          en: 'Processing your payment...',
          ar: 'معالجة دفعتك...'
        });
      case 'verifying':
        return getText({
          en: 'Verifying with bank...',
          ar: 'التحقق مع البنك...'
        });
      case 'success':
        return getText({
          en: 'Payment successful!',
          ar: 'تم الدفع بنجاح!'
        });
      case 'failed':
        return getText({
          en: 'Payment failed',
          ar: 'فشل الدفع'
        });
      default:
        return '';
    }
  };

  const getStageDescription = () => {
    switch (currentStage) {
      case 'processing':
        return getText({
          en: 'Please wait while we securely process your payment. Do not close this screen.',
          ar: 'يرجى الانتظار بينما نعالج دفعتك بأمان. لا تغلق هذه الشاشة.'
        });
      case 'verifying':
        return getText({
          en: 'Confirming transaction with your bank. This may take a moment.',
          ar: 'تأكيد المعاملة مع البنك الخاص بك. قد يستغرق هذا لحظة.'
        });
      case 'success':
        return getText({
          en: 'Your payment has been processed successfully. You will receive a confirmation shortly.',
          ar: 'تمت معالجة دفعتك بنجاح. ستتلقى تأكيداً قريباً.'
        });
      case 'failed':
        return getText({
          en: 'We couldn\'t process your payment. Please try again or use a different payment method.',
          ar: 'لم نتمكن من معالجة دفعتك. يرجى المحاولة مرة أخرى أو استخدام وسيلة دفع مختلفة.'
        });
      default:
        return '';
    }
  };

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1a1a1a', '#2d2d2d'] : ['#f8f9fa', '#ffffff']}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Processing Animation */}
        <View style={styles.animationContainer}>
          <Animated.View 
            style={[
              styles.iconBackground,
              { 
                backgroundColor: getStageColor() + '15',
                transform: [
                  { scale: scaleAnimation },
                  ...(currentStage === 'processing' || currentStage === 'verifying' ? [{ rotate: spin }] : [])
                ]
              }
            ]}
          >
            <Ionicons name={getStageIcon() as any} size={80} color={getStageColor()} />
            
            {/* Processing rings */}
            {(currentStage === 'processing' || currentStage === 'verifying') && (
              <>
                <Animated.View 
                  style={[
                    styles.processingRing,
                    styles.ring1,
                    { 
                      borderColor: getStageColor() + '30',
                      transform: [{ rotate: spin }]
                    }
                  ]} 
                />
                <Animated.View 
                  style={[
                    styles.processingRing,
                    styles.ring2,
                    { 
                      borderColor: getStageColor() + '20',
                      transform: [{ 
                        rotate: spinAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['360deg', '0deg'],
                        })
                      }]
                    }
                  ]} 
                />
              </>
            )}
          </Animated.View>
        </View>

        {/* Status Message */}
        <View style={styles.messageContainer}>
          <Text style={[styles.stageTitle, { color: theme.text }]}>
            {getStageMessage()}
          </Text>
          
          <Text style={[styles.stageDescription, { color: theme.textSecondary }]}>
            {getStageDescription()}
          </Text>
        </View>

        {/* Progress Bar */}
        {(currentStage === 'processing' || currentStage === 'verifying') && (
          <View style={styles.progressContainer}>
            <View style={[styles.progressBarContainer, { backgroundColor: theme.inputBackground }]}>
              <Animated.View 
                style={[
                  styles.progressBar,
                  { 
                    backgroundColor: getStageColor(),
                    width: progressAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    })
                  }
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: theme.textSecondary }]}>
              {Math.round(progress)}% {getText({ en: 'complete', ar: 'مكتمل' })}
            </Text>
          </View>
        )}

        {/* Transaction Details */}
        <View style={[styles.detailsCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.detailsTitle, { color: theme.text }]}>
            {getText({ en: 'Transaction Details', ar: 'تفاصيل المعاملة' })}
          </Text>
          
          <View style={styles.detailsList}>
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                {getText({ en: 'Amount:', ar: 'المبلغ:' })}
              </Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>
                {amount}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                {getText({ en: 'Payment Method:', ar: 'وسيلة الدفع:' })}
              </Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>
                {paymentMethod}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                {getText({ en: 'Recipient:', ar: 'المستلم:' })}
              </Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>
                {recipient}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                {getText({ en: 'Transaction ID:', ar: 'رقم المعاملة:' })}
              </Text>
              <Text style={[styles.detailValue, { color: theme.text, fontFamily: 'monospace' }]}>
                {transactionId}
              </Text>
            </View>
          </View>
        </View>

        {/* Security Notice */}
        <View style={[styles.securityNotice, { backgroundColor: COLORS.info + '10' }]}>
          <Ionicons name="shield-checkmark" size={20} color={COLORS.info} />
          <Text style={[styles.securityText, { color: theme.textSecondary }]}>
            {getText({
              en: 'Your payment is protected by bank-level encryption and Saudi banking security standards.',
              ar: 'دفعتك محمية بتشفير مستوى البنك ومعايير الأمان المصرفية السعودية.'
            })}
          </Text>
        </View>

        {/* Processing Steps */}
        {(currentStage === 'processing' || currentStage === 'verifying') && (
          <View style={[styles.stepsCard, { backgroundColor: theme.surface }]}>
            <Text style={[styles.stepsTitle, { color: theme.text }]}>
              {getText({ en: 'Processing Steps', ar: 'خطوات المعالجة' })}
            </Text>
            
            <View style={styles.stepsList}>
              <View style={styles.stepItem}>
                <View style={[
                  styles.stepIndicator,
                  { backgroundColor: COLORS.success }
                ]}>
                  <Ionicons name="checkmark" size={12} color={COLORS.white} />
                </View>
                <Text style={[styles.stepText, { color: theme.text }]}>
                  {getText({ en: 'Payment initiated', ar: 'تم بدء الدفع' })}
                </Text>
              </View>
              
              <View style={styles.stepItem}>
                <View style={[
                  styles.stepIndicator,
                  { backgroundColor: currentStage === 'processing' ? COLORS.primary : COLORS.success }
                ]}>
                  {currentStage === 'processing' ? (
                    <Animated.View style={{ transform: [{ rotate: spin }] }}>
                      <Ionicons name="sync" size={12} color={COLORS.white} />
                    </Animated.View>
                  ) : (
                    <Ionicons name="checkmark" size={12} color={COLORS.white} />
                  )}
                </View>
                <Text style={[styles.stepText, { color: theme.text }]}>
                  {getText({ en: 'Processing payment', ar: 'معالجة الدفع' })}
                </Text>
              </View>
              
              <View style={styles.stepItem}>
                <View style={[
                  styles.stepIndicator,
                  { backgroundColor: currentStage === 'verifying' ? COLORS.warning : 
                    currentStage === 'success' ? COLORS.success : theme.border }
                ]}>
                  {currentStage === 'verifying' ? (
                    <Animated.View style={{ transform: [{ rotate: spin }] }}>
                      <Ionicons name="sync" size={12} color={COLORS.white} />
                    </Animated.View>
                  ) : currentStage === 'success' ? (
                    <Ionicons name="checkmark" size={12} color={COLORS.white} />
                  ) : (
                    <Ionicons name="time" size={12} color={theme.textSecondary} />
                  )}
                </View>
                <Text style={[styles.stepText, { color: theme.text }]}>
                  {getText({ en: 'Bank verification', ar: 'التحقق المصرفي' })}
                </Text>
              </View>
              
              <View style={styles.stepItem}>
                <View style={[
                  styles.stepIndicator,
                  { backgroundColor: currentStage === 'success' ? COLORS.success : theme.border }
                ]}>
                  {currentStage === 'success' ? (
                    <Ionicons name="checkmark" size={12} color={COLORS.white} />
                  ) : (
                    <Ionicons name="time" size={12} color={theme.textSecondary} />
                  )}
                </View>
                <Text style={[styles.stepText, { color: theme.text }]}>
                  {getText({ en: 'Payment complete', ar: 'اكتمال الدفع' })}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Action Buttons */}
        {currentStage === 'success' && (
          <View style={styles.actionContainer}>
            <CustomButton
              title={getText({ en: 'Continue', ar: 'متابعة' })}
              onPress={onSuccess}
              icon="checkmark"
              size="large"
              fullWidth
              customStyle={styles.continueButton}
            />
          </View>
        )}

        {currentStage === 'failed' && (
          <View style={styles.actionContainer}>
            <CustomButton
              title={getText({ en: 'Try Again', ar: 'حاول مرة أخرى' })}
              onPress={() => onFailure?.('Payment failed')}
              icon="refresh"
              size="large"
              fullWidth
              customStyle={styles.retryButton}
            />
            
            <CustomButton
              title={getText({ en: 'Use Different Method', ar: 'استخدم وسيلة أخرى' })}
              onPress={onCancel}
              variant="outline"
              icon="card"
              size="medium"
              fullWidth
              customStyle={styles.changeMethodButton}
            />
          </View>
        )}

        {/* Cancel Button (only during processing) */}
        {(currentStage === 'processing' || currentStage === 'verifying') && (
          <View style={styles.cancelContainer}>
            <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
              <Text style={[styles.cancelText, { color: theme.textSecondary }]}>
                {getText({ en: 'Cancel Payment', ar: 'إلغاء الدفع' })}
              </Text>
            </TouchableOpacity>
          </View>
        )}
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
  animationContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  iconBackground: {
    width: 160,
    height: 160,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  processingRing: {
    position: 'absolute',
    borderWidth: 2,
    borderRadius: 100,
  },
  ring1: {
    width: 200,
    height: 200,
  },
  ring2: {
    width: 240,
    height: 240,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  stageTitle: {
    fontSize: TYPOGRAPHY.sizes.h1,
    fontWeight: TYPOGRAPHY.weights.bold,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  stageDescription: {
    fontSize: TYPOGRAPHY.sizes.body1,
    textAlign: 'center',
    lineHeight: 24,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.sm,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: BORDER_RADIUS.sm,
  },
  progressText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  detailsCard: {
    width: '100%',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  detailsTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  detailsList: {
    gap: SPACING.sm,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
  },
  detailValue: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    textAlign: 'right',
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  securityText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    flex: 1,
    textAlign: 'center',
    lineHeight: 16,
  },
  stepsCard: {
    width: '100%',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  stepsTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle2,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  stepsList: {
    gap: SPACING.md,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  stepIndicator: {
    width: 24,
    height: 24,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
  },
  actionContainer: {
    width: '100%',
    gap: SPACING.md,
  },
  continueButton: {
    elevation: 3,
    shadowColor: COLORS.success,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  retryButton: {
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  changeMethodButton: {},
  cancelContainer: {
    marginTop: SPACING.lg,
  },
  cancelButton: {
    padding: SPACING.md,
  },
  cancelText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default PaymentProcessingScreen;