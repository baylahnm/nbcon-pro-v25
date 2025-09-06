import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';

interface ConsentCategory {
  id: string;
  name: string;
  description: string;
  required: boolean;
  enabled: boolean;
  lastUpdated: string;
  legalBasis: string;
  dataTypes: string[];
  purposes: string[];
}

interface ConsentHistory {
  id: string;
  action: 'granted' | 'revoked' | 'modified';
  category: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
}

const ConsentManagementScreen: React.FC = () => {
  const [consentCategories, setConsentCategories] = useState<ConsentCategory[]>([]);
  const [consentHistory, setConsentHistory] = useState<ConsentHistory[]>([]);
  const [lastSaved, setLastSaved] = useState<string>('');

  useEffect(() => {
    initializeConsentData();
  }, []);

  const initializeConsentData = () => {
    const categories: ConsentCategory[] = [
      {
        id: 'essential',
        name: 'Essential Services',
        description: 'Required for basic platform functionality including authentication, security, and core features.',
        required: true,
        enabled: true,
        lastUpdated: '2024-12-15T10:30:00Z',
        legalBasis: 'Contract Performance',
        dataTypes: ['Authentication data', 'Session information', 'Security logs'],
        purposes: ['User authentication', 'Platform security', 'Service delivery'],
      },
      {
        id: 'analytics',
        name: 'Analytics & Performance',
        description: 'Help us understand how you use our platform to improve performance and user experience.',
        required: false,
        enabled: false,
        lastUpdated: '2024-12-15T10:30:00Z',
        legalBasis: 'Legitimate Interest',
        dataTypes: ['Usage patterns', 'Performance metrics', 'Device information'],
        purposes: ['Platform optimization', 'User experience improvement', 'Performance monitoring'],
      },
      {
        id: 'marketing',
        name: 'Marketing Communications',
        description: 'Receive promotional content, product updates, and marketing materials via email and push notifications.',
        required: false,
        enabled: false,
        lastUpdated: '2024-12-15T10:30:00Z',
        legalBasis: 'Consent',
        dataTypes: ['Email address', 'Communication preferences', 'Engagement data'],
        purposes: ['Marketing communications', 'Product updates', 'Promotional offers'],
      },
      {
        id: 'personalization',
        name: 'Personalization',
        description: 'Customize your experience with personalized content, recommendations, and interface preferences.',
        required: false,
        enabled: false,
        lastUpdated: '2024-12-15T10:30:00Z',
        legalBasis: 'Consent',
        dataTypes: ['Usage preferences', 'Behavioral data', 'Profile information'],
        purposes: ['Content personalization', 'Recommendation engine', 'UI customization'],
      },
      {
        id: 'third_party',
        name: 'Third-Party Services',
        description: 'Share data with trusted partners for payment processing, communication, and service enhancement.',
        required: false,
        enabled: false,
        lastUpdated: '2024-12-15T10:30:00Z',
        legalBasis: 'Consent',
        dataTypes: ['Payment information', 'Communication data', 'Service usage'],
        purposes: ['Payment processing', 'Communication services', 'Service integration'],
      },
      {
        id: 'research',
        name: 'Research & Development',
        description: 'Contribute to research studies and product development to advance engineering technology.',
        required: false,
        enabled: false,
        lastUpdated: '2024-12-15T10:30:00Z',
        legalBasis: 'Consent',
        dataTypes: ['Anonymized usage data', 'Survey responses', 'Feedback data'],
        purposes: ['Product research', 'Technology advancement', 'Industry insights'],
      },
    ];

    const history: ConsentHistory[] = [
      {
        id: '1',
        action: 'granted',
        category: 'Essential Services',
        timestamp: '2024-12-15T10:30:00Z',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      {
        id: '2',
        action: 'revoked',
        category: 'Marketing Communications',
        timestamp: '2024-12-14T15:45:00Z',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      {
        id: '3',
        action: 'modified',
        category: 'Analytics & Performance',
        timestamp: '2024-12-13T09:20:00Z',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    ];

    setConsentCategories(categories);
    setConsentHistory(history);
  };

  const toggleConsent = (categoryId: string) => {
    setConsentCategories(prev => 
      prev.map(category => 
        category.id === categoryId 
          ? { ...category, enabled: !category.enabled, lastUpdated: new Date().toISOString() }
          : category
      )
    );
  };

  const saveConsentChanges = () => {
    // Simulate API call
    const changes = consentCategories.filter(cat => 
      cat.lastUpdated > new Date(Date.now() - 60000).toISOString()
    );
    
    if (changes.length > 0) {
      // Log consent changes
      const newHistoryEntries: ConsentHistory[] = changes.map(category => ({
        id: Date.now().toString(),
        action: category.enabled ? 'granted' : 'revoked',
        category: category.name,
        timestamp: new Date().toISOString(),
        ipAddress: '192.168.1.100', // In real app, get actual IP
        userAgent: 'NBCON Pro Mobile App', // In real app, get actual user agent
      }));
      
      setConsentHistory(prev => [...newHistoryEntries, ...prev]);
      setLastSaved(new Date().toLocaleString());
      
      Alert.alert(
        'Consent Updated',
        'Your consent preferences have been saved successfully.',
        [{ text: 'OK' }]
      );
    }
  };

  const resetToDefaults = () => {
    Alert.alert(
      'Reset Consent Preferences',
      'This will reset all your consent preferences to their default values. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: () => {
            setConsentCategories(prev => 
              prev.map(category => ({
                ...category,
                enabled: category.required,
                lastUpdated: new Date().toISOString()
              }))
            );
          }
        }
      ]
    );
  };

  const exportConsentData = () => {
    Alert.alert(
      'Export Consent Data',
      'A copy of your consent preferences will be sent to your registered email address.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Export', 
          onPress: () => {
            // In real app, trigger email export
            Alert.alert('Export Initiated', 'Your consent data will be emailed to you within 24 hours.');
          }
        }
      ]
    );
  };

  const renderConsentCategory = (category: ConsentCategory) => (
    <View key={category.id} style={styles.consentCard}>
      <View style={styles.consentHeader}>
        <View style={styles.consentInfo}>
          <Text style={styles.consentName}>{category.name}</Text>
          <Text style={styles.consentDescription}>{category.description}</Text>
        </View>
        <Switch
          value={category.enabled}
          onValueChange={() => toggleConsent(category.id)}
          disabled={category.required}
          trackColor={{ false: '#e5e7eb', true: '#1e3a8a' }}
          thumbColor={category.enabled ? '#ffffff' : '#f3f4f6'}
        />
      </View>
      
      {category.required && (
        <Text style={styles.requiredText}>Required for platform functionality</Text>
      )}
      
      <View style={styles.consentDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Legal Basis:</Text>
          <Text style={styles.detailValue}>{category.legalBasis}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Data Types:</Text>
          <Text style={styles.detailValue}>{category.dataTypes.join(', ')}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Purposes:</Text>
          <Text style={styles.detailValue}>{category.purposes.join(', ')}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Last Updated:</Text>
          <Text style={styles.detailValue}>
            {new Date(category.lastUpdated).toLocaleString()}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderHistoryItem = (item: ConsentHistory) => (
    <View key={item.id} style={styles.historyItem}>
      <View style={styles.historyHeader}>
        <Text style={styles.historyAction}>
          {item.action === 'granted' ? '✓ Granted' : 
           item.action === 'revoked' ? '✗ Revoked' : '✏️ Modified'}
        </Text>
        <Text style={styles.historyTimestamp}>
          {new Date(item.timestamp).toLocaleString()}
        </Text>
      </View>
      
      <Text style={styles.historyCategory}>{item.category}</Text>
      
      <View style={styles.historyDetails}>
        <Text style={styles.historyDetail}>IP: {item.ipAddress}</Text>
        <Text style={styles.historyDetail}>Device: {item.userAgent}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Consent Management</Text>
        <Text style={styles.headerSubtitle}>
          Manage your data privacy preferences and consent settings
        </Text>
      </View>

      {/* Introduction */}
      <View style={styles.introSection}>
        <Text style={styles.introTitle}>Your Privacy, Your Choice</Text>
        <Text style={styles.introText}>
          You have the right to control how your personal data is used. 
          Manage your consent preferences below and change them at any time.
        </Text>
        <Text style={styles.introText}>
          Under Saudi Arabia's Personal Data Protection Law (PDPL), you have 
          specific rights regarding your personal data and consent.
        </Text>
      </View>

      {/* Consent Categories */}
      <View style={styles.consentSection}>
        <Text style={styles.sectionTitle}>Consent Preferences</Text>
        <Text style={styles.sectionSubtitle}>
          Choose which data processing activities you consent to
        </Text>
        
        {consentCategories.map(renderConsentCategory)}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionSection}>
        <TouchableOpacity style={styles.saveButton} onPress={saveConsentChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
        
        <View style={styles.secondaryActions}>
          <TouchableOpacity style={styles.secondaryButton} onPress={resetToDefaults}>
            <Text style={styles.secondaryButtonText}>Reset to Defaults</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton} onPress={exportConsentData}>
            <Text style={styles.secondaryButtonText}>Export Data</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Last Saved */}
      {lastSaved && (
        <View style={styles.lastSavedSection}>
          <Text style={styles.lastSavedText}>Last saved: {lastSaved}</Text>
        </View>
      )}

      {/* Consent History */}
      <View style={styles.historySection}>
        <Text style={styles.sectionTitle}>Consent History</Text>
        <Text style={styles.sectionSubtitle}>
          Track of all your consent changes and decisions
        </Text>
        
        {consentHistory.map(renderHistoryItem)}
      </View>

      {/* Your Rights */}
      <View style={styles.rightsSection}>
        <Text style={styles.sectionTitle}>Your Data Rights</Text>
        
        <View style={styles.rightsGrid}>
          <View style={styles.rightCard}>
            <Text style={styles.rightIcon}>👁️</Text>
            <Text style={styles.rightTitle}>Access</Text>
            <Text style={styles.rightDescription}>View your personal data</Text>
          </View>
          
          <View style={styles.rightCard}>
            <Text style={styles.rightIcon}>✏️</Text>
            <Text style={styles.rightTitle}>Correct</Text>
            <Text style={styles.rightDescription}>Update inaccurate information</Text>
          </View>
          
          <View style={styles.rightCard}>
            <Text style={styles.rightIcon}>🗑️</Text>
            <Text style={styles.rightTitle}>Delete</Text>
            <Text style={styles.rightDescription}>Request data deletion</Text>
          </View>
          
          <View style={styles.rightCard}>
            <Text style={styles.rightIcon}>📤</Text>
            <Text style={styles.rightTitle}>Export</Text>
            <Text style={styles.rightDescription}>Download your data</Text>
          </View>
          
          <View style={styles.rightCard}>
            <Text style={styles.rightIcon}>🚫</Text>
            <Text style={styles.rightTitle}>Object</Text>
            <Text style={styles.rightDescription}>Object to processing</Text>
          </View>
          
          <View style={styles.rightCard}>
            <Text style={styles.rightIcon}>⏸️</Text>
            <Text style={styles.rightTitle}>Restrict</Text>
            <Text style={styles.rightDescription}>Limit data processing</Text>
          </View>
        </View>
      </View>

      {/* Contact Information */}
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Questions About Your Data?</Text>
        <Text style={styles.contactText}>
          Contact our Data Protection Officer for any questions about your 
          personal data or privacy rights.
        </Text>
        
        <View style={styles.contactInfo}>
          <Text style={styles.contactItem}>Email: privacy@nbcon.pro</Text>
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
  consentSection: {
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
  consentCard: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  consentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  consentInfo: {
    flex: 1,
    marginRight: 15,
  },
  consentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  consentDescription: {
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
  consentDetails: {
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
  actionSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondaryButton: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
  },
  lastSavedSection: {
    backgroundColor: '#f0f9ff',
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  lastSavedText: {
    fontSize: 14,
    color: '#1e40af',
    fontWeight: '500',
  },
  historySection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  historyItem: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  historyAction: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  historyTimestamp: {
    fontSize: 12,
    color: '#6b7280',
  },
  historyCategory: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
  historyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historyDetail: {
    fontSize: 12,
    color: '#6b7280',
  },
  rightsSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  rightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  rightCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  rightIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  rightTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 4,
  },
  rightDescription: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
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

export default ConsentManagementScreen;
