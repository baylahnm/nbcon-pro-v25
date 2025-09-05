import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import CustomButton from '../../../components/CustomButton';

interface SubscriptionInfo {
  planName: string;
  status: 'active' | 'cancelled' | 'paused' | 'expired';
  nextBillingDate: string;
  amount: number;
  currency: string;
  period: 'monthly' | 'quarterly' | 'yearly';
  autoRenewal: boolean;
  daysRemaining: number;
}

const SubscriptionManagementScreen = ({ navigation }: any) => {
  const { isDarkMode } = useTheme();
  const { language, getText } = useLanguage();
  const [subscriptionInfo] = useState<SubscriptionInfo>({
    planName: 'Professional Plan',
    status: 'active',
    nextBillingDate: '2024-02-15',
    amount: 299,
    currency: 'SAR',
    period: 'monthly',
    autoRenewal: true,
    daysRemaining: 12,
  });
  const [autoRenewal, setAutoRenewal] = useState(subscriptionInfo.autoRenewal);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'cancelled': return '#EF4444';
      case 'paused': return '#F59E0B';
      case 'expired': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return getText('active', 'Active');
      case 'cancelled': return getText('cancelled', 'Cancelled');
      case 'paused': return getText('paused', 'Paused');
      case 'expired': return getText('expired', 'Expired');
      default: return status;
    }
  };

  const handleCancelSubscription = () => {
    Alert.alert(
      getText('cancelSubscription', 'Cancel Subscription'),
      getText('cancelConfirmation', 'Are you sure you want to cancel your subscription? You will still have access until the end of your current billing period.'),
      [
        { text: getText('keepSubscription', 'Keep Subscription'), style: 'cancel' },
        { 
          text: getText('cancelConfirm', 'Yes, Cancel'), 
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              getText('subscriptionCancelled', 'Subscription Cancelled'),
              getText('cancelSuccess', 'Your subscription has been cancelled. You will continue to have access until February 15, 2024.')
            );
          }
        }
      ]
    );
  };

  const handlePauseSubscription = () => {
    Alert.alert(
      getText('pauseSubscription', 'Pause Subscription'),
      getText('pauseConfirmation', 'Your subscription will be paused and you can resume it anytime within 6 months.'),
      [
        { text: getText('cancel', 'Cancel'), style: 'cancel' },
        { 
          text: getText('pauseConfirm', 'Pause'), 
          onPress: () => {
            Alert.alert(
              getText('subscriptionPaused', 'Subscription Paused'),
              getText('pauseSuccess', 'Your subscription has been paused. You can resume it from your account anytime.')
            );
          }
        }
      ]
    );
  };

  const handleToggleAutoRenewal = () => {
    setAutoRenewal(!autoRenewal);
    Alert.alert(
      getText('autoRenewalUpdated', 'Auto-Renewal Updated'),
      autoRenewal 
        ? getText('autoRenewalOff', 'Auto-renewal has been turned off. Your subscription will not renew automatically.')
        : getText('autoRenewalOn', 'Auto-renewal has been turned on. Your subscription will renew automatically.')
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
    content: {
      flex: 1,
      padding: 20,
    },
    subscriptionCard: {
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    planName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 8,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    statusBadge: {
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 20,
      marginRight: language === 'ar' ? 0 : 8,
      marginLeft: language === 'ar' ? 8 : 0,
    },
    statusText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    daysRemaining: {
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    billingInfo: {
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? '#374151' : '#E5E7EB',
      paddingTop: 16,
    },
    billingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    billingLabel: {
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    billingValue: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? '#FFFFFF' : '#111827',
    },
    amountText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
    },
    quickActions: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 12,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    actionCard: {
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    actionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    actionInfo: {
      flex: 1,
      marginRight: language === 'ar' ? 0 : 12,
      marginLeft: language === 'ar' ? 12 : 0,
    },
    actionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 4,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    actionDescription: {
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    actionButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      borderWidth: 1,
    },
    primaryAction: {
      backgroundColor: '#6366F1',
      borderColor: '#6366F1',
    },
    secondaryAction: {
      backgroundColor: 'transparent',
      borderColor: isDarkMode ? '#4B5563' : '#D1D5DB',
    },
    dangerAction: {
      backgroundColor: 'transparent',
      borderColor: '#EF4444',
    },
    actionButtonText: {
      fontSize: 14,
      fontWeight: '600',
    },
    primaryButtonText: {
      color: '#FFFFFF',
    },
    secondaryButtonText: {
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    dangerButtonText: {
      color: '#EF4444',
    },
    toggleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    toggleSwitch: {
      width: 48,
      height: 28,
      borderRadius: 14,
      padding: 2,
      justifyContent: 'center',
    },
    toggleSwitchActive: {
      backgroundColor: '#6366F1',
      alignItems: 'flex-end',
    },
    toggleSwitchInactive: {
      backgroundColor: isDarkMode ? '#4B5563' : '#D1D5DB',
      alignItems: 'flex-start',
    },
    toggleKnob: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#FFFFFF',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    usageStats: {
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderRadius: 12,
      padding: 16,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    usageRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    usageLabel: {
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    usageValue: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? '#FFFFFF' : '#111827',
    },
    usageBar: {
      height: 4,
      backgroundColor: isDarkMode ? '#374151' : '#E5E7EB',
      borderRadius: 2,
      marginTop: 4,
    },
    usageProgress: {
      height: 4,
      backgroundColor: '#6366F1',
      borderRadius: 2,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
        <Text style={styles.headerTitle}>
          {getText('manageSubscription', 'Manage Subscription')}
        </Text>
        <Text style={styles.headerSubtitle}>
          {getText('subscriptionSettings', 'View and manage your subscription settings')}
        </Text>
      </Animated.View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={SlideInUp.delay(100)} style={styles.subscriptionCard}>
          <Text style={styles.planName}>{subscriptionInfo.planName}</Text>
          
          <View style={styles.statusContainer}>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(subscriptionInfo.status) }]}>
              <Text style={styles.statusText}>{getStatusText(subscriptionInfo.status)}</Text>
            </View>
            <Text style={styles.daysRemaining}>
              {subscriptionInfo.daysRemaining} {getText('daysRemaining', 'days remaining')}
            </Text>
          </View>

          <View style={styles.billingInfo}>
            <View style={styles.billingRow}>
              <Text style={styles.billingLabel}>{getText('nextBilling', 'Next billing')}</Text>
              <Text style={styles.billingValue}>{subscriptionInfo.nextBillingDate}</Text>
            </View>
            <View style={styles.billingRow}>
              <Text style={styles.billingLabel}>{getText('amount', 'Amount')}</Text>
              <Text style={styles.amountText}>
                {subscriptionInfo.amount} {subscriptionInfo.currency}
              </Text>
            </View>
            <View style={styles.billingRow}>
              <Text style={styles.billingLabel}>{getText('billingPeriod', 'Billing period')}</Text>
              <Text style={styles.billingValue}>
                {getText(subscriptionInfo.period, subscriptionInfo.period)}
              </Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={SlideInUp.delay(200)} style={styles.usageStats}>
          <Text style={styles.sectionTitle}>{getText('currentUsage', 'Current Usage')}</Text>
          
          <View style={styles.usageRow}>
            <Text style={styles.usageLabel}>{getText('projectsUsed', 'Projects')}</Text>
            <Text style={styles.usageValue}>12 / ∞</Text>
          </View>
          <View style={styles.usageBar}>
            <View style={[styles.usageProgress, { width: '25%' }]} />
          </View>

          <View style={styles.usageRow}>
            <Text style={styles.usageLabel}>{getText('storageUsed', 'Storage')}</Text>
            <Text style={styles.usageValue}>45.2 GB / 100 GB</Text>
          </View>
          <View style={styles.usageBar}>
            <View style={[styles.usageProgress, { width: '45%' }]} />
          </View>

          <View style={styles.usageRow}>
            <Text style={styles.usageLabel}>{getText('apiCalls', 'API Calls')}</Text>
            <Text style={styles.usageValue}>1,247 / 10,000</Text>
          </View>
          <View style={styles.usageBar}>
            <View style={[styles.usageProgress, { width: '12%' }]} />
          </View>
        </Animated.View>

        <Animated.View entering={SlideInUp.delay(300)} style={styles.quickActions}>
          <Text style={styles.sectionTitle}>{getText('subscriptionActions', 'Subscription Actions')}</Text>

          <View style={styles.actionCard}>
            <View style={styles.actionRow}>
              <View style={styles.actionInfo}>
                <Text style={styles.actionTitle}>{getText('autoRenewal', 'Auto-Renewal')}</Text>
                <Text style={styles.actionDescription}>
                  {autoRenewal 
                    ? getText('autoRenewalOnDesc', 'Your subscription will renew automatically')
                    : getText('autoRenewalOffDesc', 'Your subscription will not renew automatically')
                  }
                </Text>
              </View>
              <View style={styles.toggleContainer}>
                <Pressable
                  style={[
                    styles.toggleSwitch,
                    autoRenewal ? styles.toggleSwitchActive : styles.toggleSwitchInactive
                  ]}
                  onPress={handleToggleAutoRenewal}
                >
                  <View style={styles.toggleKnob} />
                </Pressable>
              </View>
            </View>
          </View>

          <View style={styles.actionCard}>
            <View style={styles.actionRow}>
              <View style={styles.actionInfo}>
                <Text style={styles.actionTitle}>{getText('changePlan', 'Change Plan')}</Text>
                <Text style={styles.actionDescription}>
                  {getText('changePlanDesc', 'Upgrade or downgrade your current plan')}
                </Text>
              </View>
              <Pressable
                style={[styles.actionButton, styles.primaryAction]}
                onPress={() => navigation.navigate('SubscriptionPlans')}
              >
                <Text style={[styles.actionButtonText, styles.primaryButtonText]}>
                  {getText('change', 'Change')}
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.actionCard}>
            <View style={styles.actionRow}>
              <View style={styles.actionInfo}>
                <Text style={styles.actionTitle}>{getText('pauseSubscription', 'Pause Subscription')}</Text>
                <Text style={styles.actionDescription}>
                  {getText('pauseDesc', 'Temporarily pause your subscription for up to 6 months')}
                </Text>
              </View>
              <Pressable
                style={[styles.actionButton, styles.secondaryAction]}
                onPress={handlePauseSubscription}
              >
                <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>
                  {getText('pause', 'Pause')}
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.actionCard}>
            <View style={styles.actionRow}>
              <View style={styles.actionInfo}>
                <Text style={styles.actionTitle}>{getText('cancelSubscription', 'Cancel Subscription')}</Text>
                <Text style={styles.actionDescription}>
                  {getText('cancelDesc', 'Cancel your subscription and access until billing period ends')}
                </Text>
              </View>
              <Pressable
                style={[styles.actionButton, styles.dangerAction]}
                onPress={handleCancelSubscription}
              >
                <Text style={[styles.actionButtonText, styles.dangerButtonText]}>
                  {getText('cancel', 'Cancel')}
                </Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>

        <View style={styles.actionCard}>
          <CustomButton
            title={getText('viewBillingHistory', 'View Billing History')}
            onPress={() => navigation.navigate('PaymentHistory')}
            variant="secondary"
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubscriptionManagementScreen;