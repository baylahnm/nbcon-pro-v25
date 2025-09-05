import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import CustomButton from '../../../components/CustomButton';

interface PlanFeature {
  id: string;
  included: boolean;
  text: string;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: 'monthly' | 'quarterly' | 'yearly';
  discount?: number;
  features: PlanFeature[];
  popular?: boolean;
  color: string;
  billingAmount: number;
}

const SubscriptionPlansScreen = ({ navigation }: any) => {
  const { isDarkMode } = useTheme();
  const { language, getText } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'basic',
      name: getText('basicPlan', 'Basic Plan'),
      price: billingPeriod === 'monthly' ? 99 : 990,
      period: billingPeriod,
      features: [
        { id: '1', included: true, text: getText('basicProjects', 'Up to 5 projects') },
        { id: '2', included: true, text: getText('basicSupport', 'Email support') },
        { id: '3', included: true, text: getText('basicStorage', '10GB storage') },
        { id: '4', included: false, text: getText('prioritySupport', 'Priority support') },
        { id: '5', included: false, text: getText('customBranding', 'Custom branding') },
        { id: '6', included: false, text: getText('advancedAnalytics', 'Advanced analytics') },
      ],
      color: '#6366F1',
      billingAmount: billingPeriod === 'monthly' ? 99 : 990,
    },
    {
      id: 'pro',
      name: getText('proPlan', 'Professional'),
      price: billingPeriod === 'monthly' ? 299 : 2990,
      period: billingPeriod,
      discount: billingPeriod === 'yearly' ? 20 : undefined,
      features: [
        { id: '1', included: true, text: getText('proProjects', 'Unlimited projects') },
        { id: '2', included: true, text: getText('proSupport', 'Priority support') },
        { id: '3', included: true, text: getText('proStorage', '100GB storage') },
        { id: '4', included: true, text: getText('customBranding', 'Custom branding') },
        { id: '5', included: true, text: getText('advancedAnalytics', 'Advanced analytics') },
        { id: '6', included: false, text: getText('dedicatedManager', 'Dedicated account manager') },
      ],
      popular: true,
      color: '#10B981',
      billingAmount: billingPeriod === 'monthly' ? 299 : 2990,
    },
    {
      id: 'enterprise',
      name: getText('enterprisePlan', 'Enterprise'),
      price: billingPeriod === 'monthly' ? 599 : 5990,
      period: billingPeriod,
      discount: billingPeriod === 'yearly' ? 25 : undefined,
      features: [
        { id: '1', included: true, text: getText('enterpriseProjects', 'Unlimited everything') },
        { id: '2', included: true, text: getText('dedicatedSupport', '24/7 dedicated support') },
        { id: '3', included: true, text: getText('unlimitedStorage', 'Unlimited storage') },
        { id: '4', included: true, text: getText('whiteLabel', 'White-label solution') },
        { id: '5', included: true, text: getText('apiAccess', 'Full API access') },
        { id: '6', included: true, text: getText('dedicatedManager', 'Dedicated account manager') },
      ],
      color: '#F59E0B',
      billingAmount: billingPeriod === 'monthly' ? 599 : 5990,
    },
  ];

  const handlePlanSelection = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleBillingPeriodChange = (period: 'monthly' | 'yearly') => {
    setBillingPeriod(period);
  };

  const handleSubscribe = () => {
    const plan = subscriptionPlans.find(p => p.id === selectedPlan);
    Alert.alert(
      getText('confirmSubscription', 'Confirm Subscription'),
      getText('subscribeToConfirm', `Subscribe to ${plan?.name} for ${plan?.billingAmount} SAR/${billingPeriod}?`),
      [
        { text: getText('cancel', 'Cancel'), style: 'cancel' },
        { 
          text: getText('subscribe', 'Subscribe'), 
          onPress: () => navigation.navigate('PaymentProcessing', { plan: plan })
        }
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#111827' : '#F9FAFB',
    },
    header: {
      padding: 20,
      paddingTop: 10,
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 8,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    headerSubtitle: {
      fontSize: 16,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    billingToggle: {
      flexDirection: 'row',
      backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
      borderRadius: 12,
      padding: 4,
      marginHorizontal: 20,
      marginTop: 20,
      marginBottom: 10,
    },
    billingOption: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      alignItems: 'center',
    },
    billingOptionActive: {
      backgroundColor: '#6366F1',
    },
    billingOptionText: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    billingOptionTextActive: {
      color: '#FFFFFF',
    },
    savingsBadge: {
      backgroundColor: '#10B981',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
      marginTop: 4,
    },
    savingsText: {
      fontSize: 10,
      color: '#FFFFFF',
      fontWeight: '600',
    },
    content: {
      flex: 1,
      paddingTop: 10,
    },
    planCard: {
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      marginHorizontal: 20,
      marginVertical: 8,
      borderRadius: 16,
      padding: 20,
      borderWidth: 2,
      borderColor: 'transparent',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    planCardSelected: {
      borderColor: '#6366F1',
      backgroundColor: isDarkMode ? '#1E1B4B' : '#F8FAFF',
    },
    planCardPopular: {
      borderColor: '#10B981',
    },
    popularBadge: {
      position: 'absolute',
      top: -8,
      right: 20,
      backgroundColor: '#10B981',
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
    },
    popularText: {
      fontSize: 12,
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    planHeader: {
      marginBottom: 16,
    },
    planName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 4,
    },
    planPriceContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
      marginBottom: 8,
    },
    planPrice: {
      fontSize: 32,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
    },
    planCurrency: {
      fontSize: 16,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      marginRight: 4,
    },
    planPeriod: {
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    discountBadge: {
      backgroundColor: '#EF4444',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
      marginLeft: 8,
    },
    discountText: {
      fontSize: 10,
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    planFeatures: {
      marginBottom: 20,
    },
    planFeature: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    featureIcon: {
      marginRight: language === 'ar' ? 0 : 8,
      marginLeft: language === 'ar' ? 8 : 0,
    },
    featureText: {
      flex: 1,
      fontSize: 14,
      color: isDarkMode ? '#D1D5DB' : '#4B5563',
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    featureTextIncluded: {
      color: isDarkMode ? '#FFFFFF' : '#111827',
    },
    footer: {
      padding: 20,
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    footerText: {
      fontSize: 12,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: 'center',
      marginBottom: 12,
      lineHeight: 16,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
        <Text style={styles.headerTitle}>
          {getText('subscriptionPlans', 'Subscription Plans')}
        </Text>
        <Text style={styles.headerSubtitle}>
          {getText('choosePlanDesc', 'Choose the perfect plan for your needs')}
        </Text>
      </Animated.View>

      <Animated.View entering={SlideInUp.delay(100)} style={styles.billingToggle}>
        <Pressable
          style={[styles.billingOption, billingPeriod === 'monthly' && styles.billingOptionActive]}
          onPress={() => handleBillingPeriodChange('monthly')}
        >
          <Text style={[
            styles.billingOptionText,
            billingPeriod === 'monthly' && styles.billingOptionTextActive
          ]}>
            {getText('monthly', 'Monthly')}
          </Text>
        </Pressable>
        <Pressable
          style={[styles.billingOption, billingPeriod === 'yearly' && styles.billingOptionActive]}
          onPress={() => handleBillingPeriodChange('yearly')}
        >
          <Text style={[
            styles.billingOptionText,
            billingPeriod === 'yearly' && styles.billingOptionTextActive
          ]}>
            {getText('yearly', 'Yearly')}
          </Text>
          {billingPeriod === 'yearly' && (
            <View style={styles.savingsBadge}>
              <Text style={styles.savingsText}>
                {getText('save20', 'Save 20%')}
              </Text>
            </View>
          )}
        </Pressable>
      </Animated.View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {subscriptionPlans.map((plan, index) => (
          <Animated.View
            key={plan.id}
            entering={SlideInUp.delay(200 + index * 100)}
          >
            <Pressable
              style={[
                styles.planCard,
                selectedPlan === plan.id && styles.planCardSelected,
                plan.popular && styles.planCardPopular,
              ]}
              onPress={() => handlePlanSelection(plan.id)}
            >
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>
                    {getText('mostPopular', 'MOST POPULAR')}
                  </Text>
                </View>
              )}

              <View style={styles.planHeader}>
                <Text style={styles.planName}>{plan.name}</Text>
                <View style={styles.planPriceContainer}>
                  <Text style={styles.planCurrency}>SAR</Text>
                  <Text style={styles.planPrice}>{plan.price}</Text>
                  <Text style={styles.planPeriod}>
                    /{getText(plan.period, plan.period)}
                  </Text>
                  {plan.discount && (
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>
                        -{plan.discount}%
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              <View style={styles.planFeatures}>
                {plan.features.map((feature) => (
                  <View key={feature.id} style={styles.planFeature}>
                    <Ionicons
                      name={feature.included ? 'checkmark-circle' : 'close-circle'}
                      size={16}
                      color={feature.included ? '#10B981' : '#EF4444'}
                      style={styles.featureIcon}
                    />
                    <Text style={[
                      styles.featureText,
                      feature.included && styles.featureTextIncluded
                    ]}>
                      {feature.text}
                    </Text>
                  </View>
                ))}
              </View>
            </Pressable>
          </Animated.View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {getText('subscriptionTerms', 'All subscriptions renew automatically. Cancel anytime from your account settings. Prices include VAT as per Saudi regulations.')}
        </Text>
        <CustomButton
          title={getText('subscribe', 'Subscribe')}
          onPress={handleSubscribe}
          variant="primary"
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
};

export default SubscriptionPlansScreen;