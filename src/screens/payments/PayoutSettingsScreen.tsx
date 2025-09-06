import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PayoutSettingsScreen: React.FC = () => {
  const [payoutSettings, setPayoutSettings] = useState({
    schedule: 'weekly',
    method: 'bank',
    autoPayout: true,
    minimumAmount: 1000,
    notifications: true,
  });

  const payoutMethods = [
    {
      id: 'bank',
      name: 'Bank Transfer',
      description: 'Direct transfer to your bank account',
      icon: 'business',
      enabled: true,
    },
    {
      id: 'mada',
      name: 'mada Card',
      description: 'Transfer to your mada card',
      icon: 'card',
      enabled: false,
    },
    {
      id: 'stcPay',
      name: 'STC Pay',
      description: 'Transfer to your STC Pay wallet',
      icon: 'phone-portrait',
      enabled: false,
    },
  ];

  const scheduleOptions = [
    { id: 'daily', label: 'Daily', description: 'Every day at 6:00 PM' },
    { id: 'weekly', label: 'Weekly', description: 'Every Monday at 6:00 PM' },
    { id: 'monthly', label: 'Monthly', description: '1st of every month at 6:00 PM' },
    { id: 'manual', label: 'Manual', description: 'Request payouts manually' },
  ];

  const updateSetting = (key: string, value: any) => {
    setPayoutSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const PayoutMethodCard = ({ method }: { method: any }) => (
    <TouchableOpacity
      style={[
        styles.methodCard,
        payoutSettings.method === method.id && styles.selectedMethodCard
      ]}
      onPress={() => updateSetting('method', method.id)}
    >
      <View style={styles.methodHeader}>
        <View style={styles.methodInfo}>
          <Ionicons name={method.icon as any} size={24} color="#007bff" />
          <View style={styles.methodText}>
            <Text style={styles.methodName}>{method.name}</Text>
            <Text style={styles.methodDescription}>{method.description}</Text>
          </View>
        </View>
        <View style={styles.methodSelector}>
          {payoutSettings.method === method.id && (
            <Ionicons name="checkmark-circle" size={24} color="#28a745" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const ScheduleOption = ({ option }: { option: any }) => (
    <TouchableOpacity
      style={[
        styles.scheduleOption,
        payoutSettings.schedule === option.id && styles.selectedScheduleOption
      ]}
      onPress={() => updateSetting('schedule', option.id)}
    >
      <View style={styles.scheduleInfo}>
        <Text style={styles.scheduleLabel}>{option.label}</Text>
        <Text style={styles.scheduleDescription}>{option.description}</Text>
      </View>
      <View style={styles.scheduleSelector}>
        {payoutSettings.schedule === option.id && (
          <Ionicons name="checkmark-circle" size={20} color="#28a745" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Payout Settings</Text>
      <Text style={styles.subtitle}>
        Configure how and when you receive your payments
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payout Schedule</Text>
        <Text style={styles.sectionDescription}>
          Choose how often you want to receive your earnings
        </Text>
        {scheduleOptions.map((option) => (
          <ScheduleOption key={option.id} option={option} />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payout Method</Text>
        <Text style={styles.sectionDescription}>
          Select your preferred payment method
        </Text>
        {payoutMethods.map((method) => (
          <PayoutMethodCard key={method.id} method={method} />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payout Preferences</Text>
        
        <View style={styles.preferenceItem}>
          <View style={styles.preferenceInfo}>
            <Text style={styles.preferenceLabel}>Auto Payout</Text>
            <Text style={styles.preferenceDescription}>
              Automatically process payouts based on your schedule
            </Text>
          </View>
          <Switch
            value={payoutSettings.autoPayout}
            onValueChange={(value) => updateSetting('autoPayout', value)}
            trackColor={{ false: '#767577', true: '#007bff' }}
            thumbColor={payoutSettings.autoPayout ? '#ffffff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.preferenceItem}>
          <View style={styles.preferenceInfo}>
            <Text style={styles.preferenceLabel}>Payout Notifications</Text>
            <Text style={styles.preferenceDescription}>
              Get notified when payouts are processed
            </Text>
          </View>
          <Switch
            value={payoutSettings.notifications}
            onValueChange={(value) => updateSetting('notifications', value)}
            trackColor={{ false: '#767577', true: '#007bff' }}
            thumbColor={payoutSettings.notifications ? '#ffffff' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Minimum Payout Amount</Text>
        <Text style={styles.sectionDescription}>
          Set the minimum amount before a payout is processed
        </Text>
        <View style={styles.amountInput}>
          <Text style={styles.amountLabel}>SAR</Text>
          <Text style={styles.amountValue}>{payoutSettings.minimumAmount.toLocaleString()}</Text>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={16} color="#007bff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.currentSettingsCard}>
        <Text style={styles.currentSettingsTitle}>Current Settings</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Schedule:</Text>
          <Text style={styles.settingValue}>
            {scheduleOptions.find(s => s.id === payoutSettings.schedule)?.label}
          </Text>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Method:</Text>
          <Text style={styles.settingValue}>
            {payoutMethods.find(m => m.id === payoutSettings.method)?.name}
          </Text>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Auto Payout:</Text>
          <Text style={styles.settingValue}>
            {payoutSettings.autoPayout ? 'Enabled' : 'Disabled'}
          </Text>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Minimum Amount:</Text>
          <Text style={styles.settingValue}>
            {payoutSettings.minimumAmount.toLocaleString()} SAR
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Settings</Text>
      </TouchableOpacity>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Payouts are processed within 1-3 business days. Bank transfers may take 
          additional time depending on your bank's processing time.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 15,
    lineHeight: 20,
  },
  scheduleOption: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedScheduleOption: {
    borderColor: '#28a745',
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  scheduleDescription: {
    fontSize: 14,
    color: '#cccccc',
  },
  scheduleSelector: {
    marginLeft: 10,
  },
  methodCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedMethodCard: {
    borderColor: '#28a745',
  },
  methodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  methodText: {
    marginLeft: 15,
    flex: 1,
  },
  methodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  methodDescription: {
    fontSize: 14,
    color: '#cccccc',
  },
  methodSelector: {
    marginLeft: 10,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  preferenceInfo: {
    flex: 1,
  },
  preferenceLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  preferenceDescription: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
  },
  amountInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 15,
    marginTop: 10,
  },
  amountLabel: {
    fontSize: 16,
    color: '#cccccc',
    marginRight: 10,
  },
  amountValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
  },
  editButton: {
    padding: 5,
  },
  currentSettingsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  currentSettingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingLabel: {
    fontSize: 14,
    color: '#cccccc',
  },
  settingValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  infoText: {
    color: '#cccccc',
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 10,
    flex: 1,
  },
});

export default PayoutSettingsScreen;
