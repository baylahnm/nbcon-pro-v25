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

interface SafetyRisk {
  id: string;
  category: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  mitigation: string[];
  acknowledgment: boolean;
}

interface SafetyRequirement {
  id: string;
  title: string;
  description: string;
  mandatory: boolean;
  completed: boolean;
  deadline?: string;
}

const RiskSafetyAcknowledgment: React.FC = () => {
  const [safetyRisks, setSafetyRisks] = useState<SafetyRisk[]>([
    {
      id: '1',
      category: 'Physical Hazards',
      description: 'Exposure to construction sites, heavy machinery, and hazardous materials',
      severity: 'high',
      mitigation: [
        'Wear appropriate PPE at all times',
        'Follow site safety protocols',
        'Report unsafe conditions immediately',
        'Complete safety training before site visits'
      ],
      acknowledgment: false,
    },
    {
      id: '2',
      category: 'Environmental Risks',
      description: 'Working in extreme weather conditions and environmental hazards',
      severity: 'medium',
      mitigation: [
        'Check weather conditions before work',
        'Use appropriate protective equipment',
        'Stay hydrated and take regular breaks',
        'Follow environmental safety guidelines'
      ],
      acknowledgment: false,
    },
    {
      id: '3',
      category: 'Electrical Hazards',
      description: 'Risk of electrical shock and electrical equipment hazards',
      severity: 'critical',
      mitigation: [
        'Ensure electrical equipment is properly grounded',
        'Use insulated tools and equipment',
        'Follow lockout/tagout procedures',
        'Never work on live electrical systems'
      ],
      acknowledgment: false,
    },
    {
      id: '4',
      category: 'Height and Fall Risks',
      description: 'Working at heights, on ladders, or elevated platforms',
      severity: 'high',
      mitigation: [
        'Use fall protection equipment',
        'Inspect equipment before use',
        'Follow proper ladder safety procedures',
        'Never work alone at heights'
      ],
      acknowledgment: false,
    },
    {
      id: '5',
      category: 'Chemical Exposure',
      description: 'Exposure to hazardous chemicals and materials',
      severity: 'medium',
      mitigation: [
        'Read and follow MSDS sheets',
        'Use appropriate ventilation',
        'Wear chemical-resistant PPE',
        'Store chemicals properly'
      ],
      acknowledgment: false,
    },
    {
      id: '6',
      category: 'Vehicle and Traffic',
      description: 'Working near roadways and vehicle traffic',
      severity: 'medium',
      mitigation: [
        'Wear high-visibility clothing',
        'Use traffic control measures',
        'Follow traffic safety protocols',
        'Stay alert and aware of surroundings'
      ],
      acknowledgment: false,
    },
  ]);

  const [safetyRequirements, setSafetyRequirements] = useState<SafetyRequirement[]>([
    {
      id: '1',
      title: 'Safety Training Certificate',
      description: 'Complete mandatory safety training and obtain certificate',
      mandatory: true,
      completed: false,
      deadline: '2024-12-31',
    },
    {
      id: '2',
      title: 'PPE Inspection',
      description: 'Inspect and verify all personal protective equipment',
      mandatory: true,
      completed: false,
      deadline: '2024-12-31',
    },
    {
      id: '3',
      title: 'Emergency Procedures',
      description: 'Review and understand emergency response procedures',
      mandatory: true,
      completed: false,
      deadline: '2024-12-31',
    },
    {
      id: '4',
      title: 'First Aid Certification',
      description: 'Obtain current first aid and CPR certification',
      mandatory: false,
      completed: false,
      deadline: '2025-06-30',
    },
    {
      id: '5',
      title: 'Safety Equipment Check',
      description: 'Verify all safety equipment is in working order',
      mandatory: true,
      completed: false,
      deadline: '2024-12-31',
    },
  ]);

  const [allAcknowledged, setAllAcknowledged] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleRiskAcknowledgment = (riskId: string) => {
    setSafetyRisks(prev =>
      prev.map(risk =>
        risk.id === riskId
          ? { ...risk, acknowledgment: !risk.acknowledgment }
          : risk
      )
    );
  };

  const toggleRequirementCompletion = (requirementId: string) => {
    setSafetyRequirements(prev =>
      prev.map(req =>
        req.id === requirementId
          ? { ...req, completed: !req.completed }
          : req
      )
    );
  };

  const handleAcknowledgeAll = () => {
    setSafetyRisks(prev =>
      prev.map(risk => ({ ...risk, acknowledgment: true }))
    );
    setAllAcknowledged(true);
  };

  const handleSubmitAcknowledgment = () => {
    const unacknowledgedRisks = safetyRisks.filter(risk => !risk.acknowledgment);
    const incompleteMandatoryRequirements = safetyRequirements.filter(
      req => req.mandatory && !req.completed
    );

    if (unacknowledgedRisks.length > 0) {
      Alert.alert(
        'Incomplete Acknowledgment',
        'You must acknowledge all safety risks before proceeding.',
        [{ text: 'OK' }]
      );
      return;
    }

    if (incompleteMandatoryRequirements.length > 0) {
      Alert.alert(
        'Incomplete Requirements',
        'You must complete all mandatory safety requirements before proceeding.',
        [{ text: 'OK' }]
      );
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Acknowledgment Submitted',
        'Your safety acknowledgment has been recorded. You may now proceed with job assignments.',
        [{ text: 'OK' }]
      );
    }, 2000);
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

  const renderSafetyRisk = (risk: SafetyRisk) => (
    <View key={risk.id} style={styles.riskCard}>
      <View style={styles.riskHeader}>
        <Text style={styles.riskCategory}>{risk.category}</Text>
        <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(risk.severity) }]}>
          <Text style={styles.severityText}>{getSeverityText(risk.severity)}</Text>
        </View>
      </View>
      
      <Text style={styles.riskDescription}>{risk.description}</Text>
      
      <View style={styles.mitigationSection}>
        <Text style={styles.mitigationTitle}>Mitigation Measures:</Text>
        {risk.mitigation.map((measure, index) => (
          <Text key={index} style={styles.mitigationItem}>• {measure}</Text>
        ))}
      </View>
      
      <View style={styles.acknowledgmentSection}>
        <Switch
          value={risk.acknowledgment}
          onValueChange={() => toggleRiskAcknowledgment(risk.id)}
          trackColor={{ false: '#e5e7eb', true: '#1e3a8a' }}
          thumbColor={risk.acknowledgment ? '#ffffff' : '#f3f4f6'}
        />
        <Text style={styles.acknowledgmentText}>
          I acknowledge and understand this risk
        </Text>
      </View>
    </View>
  );

  const renderSafetyRequirement = (requirement: SafetyRequirement) => (
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
      
      <View style={styles.requirementActions}>
        <Switch
          value={requirement.completed}
          onValueChange={() => toggleRequirementCompletion(requirement.id)}
          trackColor={{ false: '#e5e7eb', true: '#1e3a8a' }}
          thumbColor={requirement.completed ? '#ffffff' : '#f3f4f6'}
        />
        <Text style={styles.requirementActionText}>
          Mark as {requirement.completed ? 'Incomplete' : 'Complete'}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Safety Risk Acknowledgment</Text>
        <Text style={styles.headerSubtitle}>
          Acknowledge safety risks and complete requirements before job assignments
        </Text>
      </View>

      {/* Warning Notice */}
      <View style={styles.warningSection}>
        <Text style={styles.warningTitle}>⚠️ SAFETY NOTICE</Text>
        <Text style={styles.warningText}>
          Engineering work involves inherent risks. By acknowledging these risks, 
          you confirm that you understand the potential hazards and will take 
          appropriate safety measures.
        </Text>
        <Text style={styles.warningText}>
          Your safety is our priority. Always follow safety protocols and 
          report any unsafe conditions immediately.
        </Text>
      </View>

      {/* Safety Risks */}
      <View style={styles.risksSection}>
        <Text style={styles.sectionTitle}>Safety Risks</Text>
        <Text style={styles.sectionSubtitle}>
          Acknowledge each risk category to proceed
        </Text>
        
        {safetyRisks.map(renderSafetyRisk)}
      </View>

      {/* Safety Requirements */}
      <View style={styles.requirementsSection}>
        <Text style={styles.sectionTitle}>Safety Requirements</Text>
        <Text style={styles.sectionSubtitle}>
          Complete these requirements to ensure safety compliance
        </Text>
        
        {safetyRequirements.map(renderSafetyRequirement)}
      </View>

      {/* Safety Guidelines */}
      <View style={styles.guidelinesSection}>
        <Text style={styles.sectionTitle}>Safety Guidelines</Text>
        
        <View style={styles.guidelinesGrid}>
          <View style={styles.guidelineCard}>
            <Text style={styles.guidelineIcon}>🦺</Text>
            <Text style={styles.guidelineTitle}>PPE Required</Text>
            <Text style={styles.guidelineDescription}>
              Always wear appropriate personal protective equipment
            </Text>
          </View>
          
          <View style={styles.guidelineCard}>
            <Text style={styles.guidelineIcon}>📋</Text>
            <Text style={styles.guidelineTitle}>Follow Protocols</Text>
            <Text style={styles.guidelineDescription}>
              Adhere to all safety procedures and guidelines
            </Text>
          </View>
          
          <View style={styles.guidelineCard}>
            <Text style={styles.guidelineIcon}>🚨</Text>
            <Text style={styles.guidelineTitle}>Report Hazards</Text>
            <Text style={styles.guidelineDescription}>
              Immediately report any unsafe conditions
            </Text>
          </View>
          
          <View style={styles.guidelineCard}>
            <Text style={styles.guidelineIcon}>📞</Text>
            <Text style={styles.guidelineTitle}>Emergency Contact</Text>
            <Text style={styles.guidelineDescription}>
              Know emergency procedures and contacts
            </Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionSection}>
        <TouchableOpacity
          style={styles.acknowledgeAllButton}
          onPress={handleAcknowledgeAll}
        >
          <Text style={styles.acknowledgeAllButtonText}>Acknowledge All Risks</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmitAcknowledgment}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Submitting...' : 'Submit Acknowledgment'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Legal Information */}
      <View style={styles.legalSection}>
        <Text style={styles.sectionTitle}>Legal Information</Text>
        
        <View style={styles.legalCard}>
          <Text style={styles.legalTitle}>Liability Acknowledgment</Text>
          <Text style={styles.legalText}>
            By acknowledging these risks, you understand that NBCON Pro is not 
            liable for injuries resulting from failure to follow safety protocols 
            or use appropriate safety equipment.
          </Text>
        </View>
        
        <View style={styles.legalCard}>
          <Text style={styles.legalTitle}>Insurance Requirements</Text>
          <Text style={styles.legalText}>
            All engineers must maintain appropriate insurance coverage. 
            NBCON Pro provides platform insurance, but individual coverage 
            may be required for certain projects.
          </Text>
        </View>
        
        <View style={styles.legalCard}>
          <Text style={styles.legalTitle}>Regulatory Compliance</Text>
          <Text style={styles.legalText}>
            All work must comply with Saudi Arabia's occupational safety 
            regulations and international safety standards.
          </Text>
        </View>
      </View>

      {/* Contact Information */}
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Safety Support</Text>
        <Text style={styles.contactText}>
          Contact our safety team for questions about safety protocols, 
          training, or reporting safety concerns.
        </Text>
        
        <View style={styles.contactInfo}>
          <Text style={styles.contactItem}>Email: safety@nbcon.pro</Text>
          <Text style={styles.contactItem}>Phone: +966 11 123 4567</Text>
          <Text style={styles.contactItem}>Emergency: +966 11 999 9999</Text>
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
  risksSection: {
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
  riskCard: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  riskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  riskCategory: {
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
  riskDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 15,
    lineHeight: 20,
  },
  mitigationSection: {
    marginBottom: 15,
  },
  mitigationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  mitigationItem: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  acknowledgmentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  acknowledgmentText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
    marginLeft: 10,
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
  requirementActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  requirementActionText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
    marginLeft: 10,
  },
  guidelinesSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  guidelinesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  guidelineCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  guidelineIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  guidelineTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 4,
    textAlign: 'center',
  },
  guidelineDescription: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 16,
  },
  actionSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  acknowledgeAllButton: {
    backgroundColor: '#e0e7ff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  acknowledgeAllButtonText: {
    color: '#1e3a8a',
    fontSize: 16,
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

export default RiskSafetyAcknowledgment;
