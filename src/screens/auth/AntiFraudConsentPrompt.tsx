import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';

interface FraudPreventionMeasure {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  required: boolean;
  dataTypes: string[];
  purposes: string[];
}

const AntiFraudConsentPrompt: React.FC = () => {
  const [consentGiven, setConsentGiven] = useState(false);
  const [fraudMeasures, setFraudMeasures] = useState<FraudPreventionMeasure[]>([
    {
      id: 'identity_verification',
      name: 'Identity Verification',
      description: 'Verify your identity using government-issued documents and biometric data',
      enabled: true,
      required: true,
      dataTypes: ['National ID', 'Biometric data', 'Document images'],
      purposes: ['Identity verification', 'Account security', 'Fraud prevention'],
    },
    {
      id: 'transaction_monitoring',
      name: 'Transaction Monitoring',
      description: 'Monitor transactions for suspicious patterns and unusual activity',
      enabled: true,
      required: true,
      dataTypes: ['Transaction data', 'Payment information', 'Usage patterns'],
      purposes: ['Fraud detection', 'Risk assessment', 'Security monitoring'],
    },
    {
      id: 'device_fingerprinting',
      name: 'Device Fingerprinting',
      description: 'Analyze device characteristics to detect suspicious login attempts',
      enabled: false,
      required: false,
      dataTypes: ['Device information', 'Browser data', 'IP address'],
      purposes: ['Device recognition', 'Login security', 'Fraud prevention'],
    },
    {
      id: 'behavioral_analysis',
      name: 'Behavioral Analysis',
      description: 'Analyze user behavior patterns to detect anomalies',
      enabled: false,
      required: false,
      dataTypes: ['Usage patterns', 'Interaction data', 'Navigation history'],
      purposes: ['Behavioral profiling', 'Anomaly detection', 'Risk assessment'],
    },
    {
      id: 'third_party_verification',
      name: 'Third-Party Verification',
      description: 'Share data with trusted partners for enhanced fraud detection',
      enabled: false,
      required: false,
      dataTypes: ['Identity data', 'Transaction data', 'Risk scores'],
      purposes: ['Enhanced verification', 'Fraud intelligence', 'Risk scoring'],
    },
    {
      id: 'ai_fraud_detection',
      name: 'AI Fraud Detection',
      description: 'Use artificial intelligence to detect and prevent fraudulent activities',
      enabled: false,
      required: false,
      dataTypes: ['All user data', 'Machine learning models', 'Pattern analysis'],
      purposes: ['AI-powered detection', 'Pattern recognition', 'Automated prevention'],
    },
  ]);

  const [isProcessing, setIsProcessing] = useState(false);

  const toggleFraudMeasure = (measureId: string) => {
    setFraudMeasures(prev =>
      prev.map(measure =>
        measure.id === measureId
          ? { ...measure, enabled: !measure.enabled }
          : measure
      )
    );
  };

  const handleAcceptAll = () => {
    setFraudMeasures(prev =>
      prev.map(measure => ({ ...measure, enabled: true }))
    );
    setConsentGiven(true);
  };

  const handleRejectAll = () => {
    setFraudMeasures(prev =>
      prev.map(measure => ({ ...measure, enabled: measure.required }))
    );
    setConsentGiven(false);
  };

  const handleCustomize = () => {
    // Allow user to customize individual measures
    setConsentGiven(true);
  };

  const handleSubmitConsent = () => {
    if (!consentGiven) {
      Alert.alert(
        'Consent Required',
        'You must provide consent to anti-fraud measures to use this platform. These measures are essential for protecting your account and the platform from fraudulent activities.',
        [{ text: 'OK' }]
      );
      return;
    }

    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert(
        'Consent Saved',
        'Your anti-fraud consent preferences have been saved successfully. You can change these settings anytime in your privacy settings.',
        [{ text: 'OK' }]
      );
    }, 2000);
  };

  const renderFraudMeasure = (measure: FraudPreventionMeasure) => (
    <View key={measure.id} style={styles.measureCard}>
      <View style={styles.measureHeader}>
        <View style={styles.measureInfo}>
          <Text style={styles.measureName}>{measure.name}</Text>
          <Text style={styles.measureDescription}>{measure.description}</Text>
        </View>
        <Switch
          value={measure.enabled}
          onValueChange={() => toggleFraudMeasure(measure.id)}
          disabled={measure.required}
          trackColor={{ false: '#e5e7eb', true: '#1e3a8a' }}
          thumbColor={measure.enabled ? '#ffffff' : '#f3f4f6'}
        />
      </View>
      
      {measure.required && (
        <Text style={styles.requiredText}>Required for platform security</Text>
      )}
      
      <View style={styles.measureDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Data Types:</Text>
          <Text style={styles.detailValue}>{measure.dataTypes.join(', ')}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Purposes:</Text>
          <Text style={styles.detailValue}>{measure.purposes.join(', ')}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Anti-Fraud Protection</Text>
        <Text style={styles.headerSubtitle}>
          Help us protect your account and the platform from fraudulent activities
        </Text>
      </View>

      {/* Introduction */}
      <View style={styles.introSection}>
        <Text style={styles.introTitle}>🛡️ Enhanced Security Measures</Text>
        <Text style={styles.introText}>
          To ensure the safety and integrity of our platform, we implement 
          advanced anti-fraud measures. These measures help protect your 
          account and prevent unauthorized access.
        </Text>
        <Text style={styles.introText}>
          By consenting to these measures, you help us maintain a secure 
          environment for all users while protecting your personal and 
          financial information.
        </Text>
      </View>

      {/* Fraud Prevention Measures */}
      <View style={styles.measuresSection}>
        <Text style={styles.sectionTitle}>Fraud Prevention Measures</Text>
        <Text style={styles.sectionSubtitle}>
          Choose which security measures you consent to
        </Text>
        
        {fraudMeasures.map(renderFraudMeasure)}
      </View>

      {/* Benefits Section */}
      <View style={styles.benefitsSection}>
        <Text style={styles.sectionTitle}>How This Protects You</Text>
        
        <View style={styles.benefitsGrid}>
          <View style={styles.benefitCard}>
            <Text style={styles.benefitIcon}>🔒</Text>
            <Text style={styles.benefitTitle}>Account Security</Text>
            <Text style={styles.benefitDescription}>
              Protect your account from unauthorized access and identity theft
            </Text>
          </View>
          
          <View style={styles.benefitCard}>
            <Text style={styles.benefitIcon}>💰</Text>
            <Text style={styles.benefitTitle}>Financial Protection</Text>
            <Text style={styles.benefitDescription}>
              Prevent fraudulent transactions and financial losses
            </Text>
          </View>
          
          <View style={styles.benefitCard}>
            <Text style={styles.benefitIcon}>⚡</Text>
            <Text style={styles.benefitTitle}>Real-time Detection</Text>
            <Text style={styles.benefitDescription}>
              Detect and prevent fraud as it happens
            </Text>
          </View>
          
          <View style={styles.benefitCard}>
            <Text style={styles.benefitIcon}>🤖</Text>
            <Text style={styles.benefitTitle}>AI-Powered</Text>
            <Text style={styles.benefitDescription}>
              Advanced AI algorithms for superior fraud detection
            </Text>
          </View>
        </View>
      </View>

      {/* Legal Information */}
      <View style={styles.legalSection}>
        <Text style={styles.sectionTitle}>Legal Information</Text>
        
        <View style={styles.legalCard}>
          <Text style={styles.legalTitle}>Data Processing</Text>
          <Text style={styles.legalText}>
            Your data will be processed in accordance with Saudi Arabia's 
            Personal Data Protection Law (PDPL) and our Privacy Policy. 
            We only process data necessary for fraud prevention and security.
          </Text>
        </View>
        
        <View style={styles.legalCard}>
          <Text style={styles.legalTitle}>Data Retention</Text>
          <Text style={styles.legalText}>
            Fraud prevention data is retained for as long as necessary 
            for security purposes, typically 7 years, or as required by law.
          </Text>
        </View>
        
        <View style={styles.legalCard}>
          <Text style={styles.legalTitle}>Your Rights</Text>
          <Text style={styles.legalText}>
            You have the right to access, correct, or delete your data, 
            and to object to processing. Contact us for more information.
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionSection}>
        <View style={styles.consentButtons}>
          <TouchableOpacity
            style={styles.rejectButton}
            onPress={handleRejectAll}
          >
            <Text style={styles.rejectButtonText}>Reject All</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.customizeButton}
            onPress={handleCustomize}
          >
            <Text style={styles.customizeButtonText}>Customize</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={handleAcceptAll}
          >
            <Text style={styles.acceptButtonText}>Accept All</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={[styles.submitButton, isProcessing && styles.submitButtonDisabled]}
          onPress={handleSubmitConsent}
          disabled={isProcessing}
        >
          <Text style={styles.submitButtonText}>
            {isProcessing ? 'Saving...' : 'Save Consent Preferences'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Contact Information */}
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Questions About Security?</Text>
        <Text style={styles.contactText}>
          If you have questions about our anti-fraud measures or data processing, 
          contact our security team.
        </Text>
        
        <View style={styles.contactInfo}>
          <Text style={styles.contactItem}>Email: security@nbcon.pro</Text>
          <Text style={styles.contactItem}>Phone: +966 11 123 4567</Text>
          <Text style={styles.contactItem}>Address: Riyadh, Saudi Arabia</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#1e3a8a',
    padding: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e0e7ff',
    textAlign: 'center',
    lineHeight: 24,
  },
  introSection: {
    backgroundColor: 'white',
    padding: 30,
    marginBottom: 20,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
  },
  introText: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
    marginBottom: 15,
  },
  measuresSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
    lineHeight: 24,
  },
  measureCard: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  measureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  measureInfo: {
    flex: 1,
    marginRight: 15,
  },
  measureName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  measureDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  requiredText: {
    fontSize: 12,
    color: '#dc2626',
    fontWeight: '500',
    marginBottom: 10,
  },
  measureDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  detailLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
    width: 100,
  },
  detailValue: {
    fontSize: 12,
    color: '#374151',
    flex: 1,
    textAlign: 'right',
  },
  benefitsSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  benefitCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  benefitIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 8,
    textAlign: 'center',
  },
  benefitDescription: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
  legalSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  legalCard: {
    backgroundColor: '#f0f9ff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#bae6fd',
  },
  legalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 8,
  },
  legalText: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 20,
  },
  actionSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  consentButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rejectButton: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  rejectButtonText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '600',
  },
  customizeButton: {
    backgroundColor: '#e0e7ff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  customizeButtonText: {
    color: '#1e3a8a',
    fontSize: 14,
    fontWeight: '600',
  },
  acceptButton: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#059669',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  contactSection: {
    backgroundColor: '#1e3a8a',
    padding: 30,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 16,
    color: '#e0e7ff',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  contactInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  contactItem: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
  },
});

export default AntiFraudConsentPrompt;
