import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

interface ExportRestriction {
  id: string;
  category: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  applicableCountries: string[];
  restrictions: string[];
}

interface ComplianceRequirement {
  id: string;
  title: string;
  description: string;
  required: boolean;
  completed: boolean;
  deadline?: string;
}

const ExportComplianceNotice: React.FC = () => {
  const [acknowledged, setAcknowledged] = useState(false);
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>([]);

  const exportRestrictions: ExportRestriction[] = [
    {
      id: '1',
      category: 'Technical Data',
      description: 'Engineering drawings, specifications, and technical documentation',
      severity: 'high',
      applicableCountries: ['Iran', 'North Korea', 'Syria', 'Cuba'],
      restrictions: [
        'No sharing of technical drawings',
        'No export of CAD files',
        'No transfer of specifications',
        'No technical assistance'
      ],
    },
    {
      id: '2',
      category: 'Software & Technology',
      description: 'Engineering software, algorithms, and proprietary technology',
      severity: 'critical',
      applicableCountries: ['Iran', 'North Korea', 'Syria', 'Cuba', 'Russia', 'China'],
      restrictions: [
        'No software exports',
        'No technology transfers',
        'No source code sharing',
        'No API access'
      ],
    },
    {
      id: '3',
      category: 'Personal Data',
      description: 'User information, project data, and personal details',
      severity: 'medium',
      applicableCountries: ['All non-GDPR countries'],
      restrictions: [
        'GDPR compliance required',
        'Data localization rules',
        'Consent requirements',
        'Transfer restrictions'
      ],
    },
    {
      id: '4',
      category: 'Financial Data',
      description: 'Payment information, transaction data, and financial records',
      severity: 'high',
      applicableCountries: ['All countries'],
      restrictions: [
        'PCI DSS compliance',
        'Financial regulations',
        'Anti-money laundering',
        'Tax compliance'
      ],
    },
  ];

  const complianceRequirements: ComplianceRequirement[] = [
    {
      id: '1',
      title: 'Export Control Training',
      description: 'Complete mandatory export control training for all users',
      required: true,
      completed: false,
      deadline: '2024-12-31',
    },
    {
      id: '2',
      title: 'Data Classification',
      description: 'Classify all project data according to export control categories',
      required: true,
      completed: false,
      deadline: '2024-12-31',
    },
    {
      id: '3',
      title: 'Access Controls',
      description: 'Implement proper access controls for restricted data',
      required: true,
      completed: false,
      deadline: '2024-12-31',
    },
    {
      id: '4',
      title: 'Audit Trail',
      description: 'Maintain comprehensive audit trail for all data access',
      required: true,
      completed: false,
      deadline: '2024-12-31',
    },
    {
      id: '5',
      title: 'Compliance Monitoring',
      description: 'Implement automated compliance monitoring system',
      required: false,
      completed: false,
    },
  ];

  const handleRestrictionSelect = (restrictionId: string) => {
    setSelectedRestrictions(prev =>
      prev.includes(restrictionId)
        ? prev.filter(id => id !== restrictionId)
        : [...prev, restrictionId]
    );
  };

  const handleAcknowledge = () => {
    if (selectedRestrictions.length === 0) {
      Alert.alert(
        'Selection Required',
        'Please select at least one export restriction category to acknowledge.',
        [{ text: 'OK' }]
      );
      return;
    }

    setAcknowledged(true);
    Alert.alert(
      'Acknowledgment Recorded',
      'Your acknowledgment of export compliance requirements has been recorded. You will be required to complete mandatory training within 30 days.',
      [{ text: 'OK' }]
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return '#059669';
      case 'medium': return '#d97706';
      case 'high': return '#dc2626';
      case 'critical': return '#991b1b';
      default: return '#6b7280';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'low': return 'LOW RISK';
      case 'medium': return 'MEDIUM RISK';
      case 'high': return 'HIGH RISK';
      case 'critical': return 'CRITICAL RISK';
      default: return severity;
    }
  };

  const renderExportRestriction = (restriction: ExportRestriction) => (
    <TouchableOpacity
      key={restriction.id}
      style={[
        styles.restrictionCard,
        selectedRestrictions.includes(restriction.id) && styles.selectedRestrictionCard
      ]}
      onPress={() => handleRestrictionSelect(restriction.id)}
    >
      <View style={styles.restrictionHeader}>
        <Text style={styles.restrictionCategory}>{restriction.category}</Text>
        <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(restriction.severity) }]}>
          <Text style={styles.severityText}>{getSeverityText(restriction.severity)}</Text>
        </View>
      </View>
      
      <Text style={styles.restrictionDescription}>{restriction.description}</Text>
      
      <View style={styles.restrictionDetails}>
        <Text style={styles.detailLabel}>Applicable Countries:</Text>
        <Text style={styles.detailValue}>{restriction.applicableCountries.join(', ')}</Text>
      </View>
      
      <View style={styles.restrictionsList}>
        <Text style={styles.restrictionsTitle}>Restrictions:</Text>
        {restriction.restrictions.map((restriction, index) => (
          <Text key={index} style={styles.restrictionItem}>• {restriction}</Text>
        ))}
      </View>
    </TouchableOpacity>
  );

  const renderComplianceRequirement = (requirement: ComplianceRequirement) => (
    <View key={requirement.id} style={styles.requirementCard}>
      <View style={styles.requirementHeader}>
        <Text style={styles.requirementTitle}>{requirement.title}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: requirement.completed ? '#059669' : '#6b7280' }
        ]}>
          <Text style={styles.statusText}>
            {requirement.completed ? 'COMPLETED' : 'PENDING'}
          </Text>
        </View>
      </View>
      
      <Text style={styles.requirementDescription}>{requirement.description}</Text>
      
      {requirement.deadline && (
        <Text style={styles.requirementDeadline}>
          Deadline: {new Date(requirement.deadline).toLocaleDateString()}
        </Text>
      )}
      
      {!requirement.completed && (
        <TouchableOpacity style={styles.completeButton}>
          <Text style={styles.completeButtonText}>Mark as Complete</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Export Compliance Notice</Text>
        <Text style={styles.headerSubtitle}>
          Important information about export control regulations and restrictions
        </Text>
      </View>

      {/* Warning Notice */}
      <View style={styles.warningSection}>
        <Text style={styles.warningTitle}>⚠️ IMPORTANT NOTICE</Text>
        <Text style={styles.warningText}>
          This platform is subject to export control regulations. By using this service, 
          you acknowledge and agree to comply with all applicable export control laws 
          and regulations.
        </Text>
        <Text style={styles.warningText}>
          Violation of export control regulations may result in severe penalties, 
          including criminal prosecution and civil fines.
        </Text>
      </View>

      {/* Export Restrictions */}
      <View style={styles.restrictionsSection}>
        <Text style={styles.sectionTitle}>Export Control Categories</Text>
        <Text style={styles.sectionSubtitle}>
          Select the categories that apply to your use of this platform
        </Text>
        
        {exportRestrictions.map(renderExportRestriction)}
      </View>

      {/* Compliance Requirements */}
      <View style={styles.requirementsSection}>
        <Text style={styles.sectionTitle}>Compliance Requirements</Text>
        <Text style={styles.sectionSubtitle}>
          Complete these requirements to ensure full compliance
        </Text>
        
        {complianceRequirements.map(renderComplianceRequirement)}
      </View>

      {/* Legal Information */}
      <View style={styles.legalSection}>
        <Text style={styles.sectionTitle}>Legal Information</Text>
        
        <View style={styles.legalCard}>
          <Text style={styles.legalTitle}>Applicable Laws</Text>
          <Text style={styles.legalText}>
            • Saudi Arabia Export Control Regulations{'\n'}
            • US Export Administration Regulations (EAR){'\n'}
            • International Traffic in Arms Regulations (ITAR){'\n'}
            • European Union Export Control Regulations{'\n'}
            • United Nations Security Council Resolutions
          </Text>
        </View>
        
        <View style={styles.legalCard}>
          <Text style={styles.legalTitle}>Penalties for Non-Compliance</Text>
          <Text style={styles.legalText}>
            • Civil penalties up to $1,000,000 per violation{'\n'}
            • Criminal penalties up to 20 years imprisonment{'\n'}
            • Loss of export privileges{'\n'}
            • Corporate liability and fines{'\n'}
            • Personal liability for individuals
          </Text>
        </View>
        
        <View style={styles.legalCard}>
          <Text style={styles.legalTitle}>Your Responsibilities</Text>
          <Text style={styles.legalText}>
            • Understand and comply with all applicable regulations{'\n'}
            • Classify data and technology correctly{'\n'}
            • Implement proper access controls{'\n'}
            • Maintain audit trails{'\n'}
            • Report any suspected violations immediately
          </Text>
        </View>
      </View>

      {/* Acknowledgment Section */}
      <View style={styles.acknowledgmentSection}>
        <Text style={styles.sectionTitle}>Acknowledgment Required</Text>
        <Text style={styles.sectionSubtitle}>
          You must acknowledge your understanding of these requirements to continue
        </Text>
        
        <View style={styles.acknowledgmentCard}>
          <Text style={styles.acknowledgmentText}>
            I acknowledge that I have read and understand the export control 
            regulations and restrictions outlined above. I agree to comply 
            with all applicable laws and regulations and understand the 
            penalties for non-compliance.
          </Text>
          
          <TouchableOpacity
            style={[
              styles.acknowledgeButton,
              acknowledged && styles.acknowledgedButton
            ]}
            onPress={handleAcknowledge}
            disabled={acknowledged}
          >
            <Text style={[
              styles.acknowledgeButtonText,
              acknowledged && styles.acknowledgedButtonText
            ]}>
              {acknowledged ? '✓ Acknowledged' : 'Acknowledge & Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Contact Information */}
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Need Help with Compliance?</Text>
        <Text style={styles.contactText}>
          Contact our compliance team for assistance with export control 
          regulations and requirements.
        </Text>
        
        <View style={styles.contactInfo}>
          <Text style={styles.contactItem}>Email: compliance@nbcon.pro</Text>
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
  warningSection: {
    backgroundColor: '#fef2f2',
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 10,
  },
  warningText: {
    fontSize: 14,
    color: '#dc2626',
    lineHeight: 20,
    marginBottom: 10,
  },
  restrictionsSection: {
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
  restrictionCard: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  selectedRestrictionCard: {
    borderColor: '#1e3a8a',
    borderWidth: 2,
    backgroundColor: '#f0f9ff',
  },
  restrictionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  restrictionCategory: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  severityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  restrictionDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 15,
    lineHeight: 20,
  },
  restrictionDetails: {
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 14,
    color: '#374151',
  },
  restrictionsList: {
    marginTop: 10,
  },
  restrictionsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  restrictionItem: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  requirementsSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  requirementCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  requirementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  requirementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  requirementDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  requirementDeadline: {
    fontSize: 12,
    color: '#d97706',
    marginBottom: 10,
  },
  completeButton: {
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  completeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
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
  acknowledgmentSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  acknowledgmentCard: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  acknowledgmentText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 20,
  },
  acknowledgeButton: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  acknowledgedButton: {
    backgroundColor: '#059669',
  },
  acknowledgeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  acknowledgedButtonText: {
    color: 'white',
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

export default ExportComplianceNotice;
