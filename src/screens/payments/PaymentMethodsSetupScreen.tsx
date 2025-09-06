import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PaymentMethodsSetupScreen: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState({
    mada: { enabled: false, verified: false },
    stcPay: { enabled: false, verified: false },
    applePay: { enabled: false, verified: false },
    bankTransfer: { enabled: false, verified: false },
  });

  const togglePaymentMethod = (method: keyof typeof paymentMethods) => {
    setPaymentMethods(prev => ({
      ...prev,
      [method]: {
        ...prev[method],
        enabled: !prev[method].enabled
      }
    }));
  };

  const PaymentMethodCard = ({ 
    title, 
    description, 
    icon, 
    method, 
    isEnabled, 
    isVerified 
  }: {
    title: string;
    description: string;
    icon: string;
    method: keyof typeof paymentMethods;
    isEnabled: boolean;
    isVerified: boolean;
  }) => (
    <View style={styles.paymentCard}>
      <View style={styles.paymentHeader}>
        <View style={styles.paymentInfo}>
          <Ionicons name={icon as any} size={24} color="#007bff" />
          <View style={styles.paymentText}>
            <Text style={styles.paymentTitle}>{title}</Text>
            <Text style={styles.paymentDescription}>{description}</Text>
          </View>
        </View>
        <View style={styles.paymentControls}>
          {isVerified && (
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#28a745" />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          )}
          <Switch
            value={isEnabled}
            onValueChange={() => togglePaymentMethod(method)}
            trackColor={{ false: '#767577', true: '#007bff' }}
            thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
          />
        </View>
      </View>
      {isEnabled && !isVerified && (
        <TouchableOpacity style={styles.verifyButton}>
          <Text style={styles.verifyButtonText}>Verify Account</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Payment Methods Setup</Text>
      <Text style={styles.subtitle}>
        Configure your preferred payment methods for receiving payments
      </Text>

      <View style={styles.content}>
        <PaymentMethodCard
          title="mada"
          description="Saudi Arabia's national payment network"
          icon="card"
          method="mada"
          isEnabled={paymentMethods.mada.enabled}
          isVerified={paymentMethods.mada.verified}
        />

        <PaymentMethodCard
          title="STC Pay"
          description="Mobile wallet by STC"
          icon="phone-portrait"
          method="stcPay"
          isEnabled={paymentMethods.stcPay.enabled}
          isVerified={paymentMethods.stcPay.verified}
        />

        <PaymentMethodCard
          title="Apple Pay"
          description="Apple's mobile payment service"
          icon="logo-apple"
          method="applePay"
          isEnabled={paymentMethods.applePay.enabled}
          isVerified={paymentMethods.applePay.verified}
        />

        <PaymentMethodCard
          title="Bank Transfer"
          description="Direct bank account transfer"
          icon="business"
          method="bankTransfer"
          isEnabled={paymentMethods.bankTransfer.enabled}
          isVerified={paymentMethods.bankTransfer.verified}
        />

        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={20} color="#007bff" />
          <Text style={styles.infoText}>
            Verified payment methods are required to receive payments. 
            You can add multiple methods for flexibility.
          </Text>
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Payment Methods</Text>
        </TouchableOpacity>
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
  content: {
    flex: 1,
  },
  paymentCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentText: {
    marginLeft: 15,
    flex: 1,
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  paymentDescription: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
  },
  paymentControls: {
    alignItems: 'center',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  verifiedText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  verifyButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  verifyButtonText: {
    color: '#ffffff',
    fontSize: 16,
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
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentMethodsSetupScreen;
