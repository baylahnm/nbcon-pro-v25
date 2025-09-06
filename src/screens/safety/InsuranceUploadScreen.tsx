import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

interface InsuranceDocument {
  id: string;
  type: string;
  name: string;
  status: 'pending' | 'uploaded' | 'verified' | 'expired' | 'rejected';
  uploadDate?: string;
  expiryDate?: string;
  fileSize?: string;
  previewUrl?: string;
  required: boolean;
  description: string;
}

interface InsurancePolicy {
  id: string;
  provider: string;
  policyNumber: string;
  coverageAmount: number;
  expiryDate: string;
  status: 'active' | 'expired' | 'pending';
  documents: string[];
}

const InsuranceUploadScreen: React.FC = () => {
  const [selectedDocumentType, setSelectedDocumentType] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const [insuranceDocuments, setInsuranceDocuments] = useState<InsuranceDocument[]>([
    {
      id: '1',
      type: 'Professional Liability',
      name: 'Professional Liability Insurance',
      status: 'pending',
      required: true,
      description: 'Covers professional errors and omissions',
    },
    {
      id: '2',
      type: 'General Liability',
      name: 'General Liability Insurance',
      status: 'uploaded',
      uploadDate: '2024-12-01',
      expiryDate: '2025-12-01',
      fileSize: '2.3 MB',
      required: true,
      description: 'Covers bodily injury and property damage',
    },
    {
      id: '3',
      type: 'Workers Compensation',
      name: 'Workers Compensation Insurance',
      status: 'verified',
      uploadDate: '2024-11-15',
      expiryDate: '2025-11-15',
      fileSize: '1.8 MB',
      required: true,
      description: 'Covers work-related injuries and illnesses',
    },
    {
      id: '4',
      type: 'Equipment Insurance',
      name: 'Equipment Insurance',
      status: 'pending',
      required: false,
      description: 'Covers specialized equipment and tools',
    },
    {
      id: '5',
      type: 'Cyber Liability',
      name: 'Cyber Liability Insurance',
      status: 'pending',
      required: false,
      description: 'Covers data breaches and cyber incidents',
    },
  ]);

  const [insurancePolicies, setInsurancePolicies] = useState<InsurancePolicy[]>([
    {
      id: '1',
      provider: 'Saudi Insurance Company',
      policyNumber: 'SIC-2024-001234',
      coverageAmount: 1000000,
      expiryDate: '2025-12-01',
      status: 'active',
      documents: ['1', '2'],
    },
    {
      id: '2',
      provider: 'Takaful Insurance',
      policyNumber: 'TKF-2024-567890',
      coverageAmount: 500000,
      expiryDate: '2025-11-15',
      status: 'active',
      documents: ['3'],
    },
  ]);

  const documentTypes = [
    { id: 'professional_liability', name: 'Professional Liability', icon: '🛡️' },
    { id: 'general_liability', name: 'General Liability', icon: '🏢' },
    { id: 'workers_compensation', name: 'Workers Compensation', icon: '👷' },
    { id: 'equipment_insurance', name: 'Equipment Insurance', icon: '🔧' },
    { id: 'cyber_liability', name: 'Cyber Liability', icon: '💻' },
    { id: 'vehicle_insurance', name: 'Vehicle Insurance', icon: '🚗' },
  ];

  const handleDocumentTypeSelect = (typeId: string) => {
    setSelectedDocumentType(typeId);
  };

  const handleUploadDocument = () => {
    if (!selectedDocumentType) {
      Alert.alert('Error', 'Please select a document type first.');
      return;
    }

    setIsUploading(true);

    // Simulate file upload
    setTimeout(() => {
      setIsUploading(false);
      Alert.alert(
        'Upload Successful',
        'Your insurance document has been uploaded and is being reviewed.',
        [{ text: 'OK' }]
      );
    }, 2000);
  };

  const handleTakePhoto = () => {
    Alert.alert(
      'Take Photo',
      'Camera functionality will be implemented here.',
      [{ text: 'OK' }]
    );
  };

  const handleSelectFromGallery = () => {
    Alert.alert(
      'Select from Gallery',
      'Gallery functionality will be implemented here.',
      [{ text: 'OK' }]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#6b7280';
      case 'uploaded': return '#1e3a8a';
      case 'verified': return '#059669';
      case 'expired': return '#dc2626';
      case 'rejected': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'PENDING';
      case 'uploaded': return 'UPLOADED';
      case 'verified': return 'VERIFIED';
      case 'expired': return 'EXPIRED';
      case 'rejected': return 'REJECTED';
      default: return status;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-SA', {
      style: 'currency',
      currency: 'SAR',
    }).format(amount);
  };

  const renderDocumentType = (type: any) => (
    <TouchableOpacity
      key={type.id}
      style={[
        styles.documentTypeCard,
        selectedDocumentType === type.id && styles.selectedDocumentTypeCard
      ]}
      onPress={() => handleDocumentTypeSelect(type.id)}
    >
      <Text style={styles.documentTypeIcon}>{type.icon}</Text>
      <Text style={styles.documentTypeName}>{type.name}</Text>
    </TouchableOpacity>
  );

  const renderInsuranceDocument = (document: InsuranceDocument) => (
    <View key={document.id} style={styles.documentCard}>
      <View style={styles.documentHeader}>
        <Text style={styles.documentName}>{document.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(document.status) }]}>
          <Text style={styles.statusText}>{getStatusText(document.status)}</Text>
        </View>
      </View>
      
      <Text style={styles.documentDescription}>{document.description}</Text>
      
      {document.uploadDate && (
        <View style={styles.documentDetails}>
          <Text style={styles.documentDetail}>Uploaded: {new Date(document.uploadDate).toLocaleDateString()}</Text>
          {document.expiryDate && (
            <Text style={styles.documentDetail}>Expires: {new Date(document.expiryDate).toLocaleDateString()}</Text>
          )}
          {document.fileSize && (
            <Text style={styles.documentDetail}>Size: {document.fileSize}</Text>
          )}
        </View>
      )}
      
      {document.status === 'pending' && (
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>Upload Document</Text>
        </TouchableOpacity>
      )}
      
      {document.status === 'uploaded' && (
        <View style={styles.documentActions}>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.replaceButton}>
            <Text style={styles.replaceButtonText}>Replace</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderInsurancePolicy = (policy: InsurancePolicy) => (
    <View key={policy.id} style={styles.policyCard}>
      <View style={styles.policyHeader}>
        <Text style={styles.policyProvider}>{policy.provider}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(policy.status) }]}>
          <Text style={styles.statusText}>{policy.status.toUpperCase()}</Text>
        </View>
      </View>
      
      <Text style={styles.policyNumber}>Policy: {policy.policyNumber}</Text>
      <Text style={styles.policyCoverage}>Coverage: {formatCurrency(policy.coverageAmount)}</Text>
      <Text style={styles.policyExpiry}>Expires: {new Date(policy.expiryDate).toLocaleDateString()}</Text>
      
      <TouchableOpacity style={styles.policyButton}>
        <Text style={styles.policyButtonText}>View Policy Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Insurance Documents</Text>
        <Text style={styles.headerSubtitle}>
          Upload and manage your insurance documentation
        </Text>
      </View>

      {/* Insurance Policies Overview */}
      <View style={styles.policiesSection}>
        <Text style={styles.sectionTitle}>Active Insurance Policies</Text>
        <Text style={styles.sectionSubtitle}>
          Your current insurance coverage and policies
        </Text>
        
        {insurancePolicies.map(renderInsurancePolicy)}
      </View>

      {/* Document Upload */}
      <View style={styles.uploadSection}>
        <Text style={styles.sectionTitle}>Upload New Document</Text>
        <Text style={styles.sectionSubtitle}>
          Select document type and upload your insurance documents
        </Text>
        
        <View style={styles.documentTypesGrid}>
          {documentTypes.map(renderDocumentType)}
        </View>
        
        {selectedDocumentType && (
          <View style={styles.uploadActions}>
            <TouchableOpacity style={styles.uploadActionButton} onPress={handleTakePhoto}>
              <Text style={styles.uploadActionIcon}>📷</Text>
              <Text style={styles.uploadActionText}>Take Photo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.uploadActionButton} onPress={handleSelectFromGallery}>
              <Text style={styles.uploadActionIcon}>📁</Text>
              <Text style={styles.uploadActionText}>Select from Gallery</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {selectedDocumentType && (
          <TouchableOpacity
            style={[styles.uploadButton, isUploading && styles.uploadButtonDisabled]}
            onPress={handleUploadDocument}
            disabled={isUploading}
          >
            <Text style={styles.uploadButtonText}>
              {isUploading ? 'Uploading...' : 'Upload Document'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Required Documents */}
      <View style={styles.documentsSection}>
        <Text style={styles.sectionTitle}>Required Documents</Text>
        <Text style={styles.sectionSubtitle}>
          Upload these documents to maintain your account status
        </Text>
        
        {insuranceDocuments.map(renderInsuranceDocument)}
      </View>

      {/* Insurance Requirements */}
      <View style={styles.requirementsSection}>
        <Text style={styles.sectionTitle}>Insurance Requirements</Text>
        
        <View style={styles.requirementsGrid}>
          <View style={styles.requirementCard}>
            <Text style={styles.requirementIcon}>🛡️</Text>
            <Text style={styles.requirementTitle}>Professional Liability</Text>
            <Text style={styles.requirementDescription}>
              Minimum 500,000 SAR coverage required
            </Text>
          </View>
          
          <View style={styles.requirementCard}>
            <Text style={styles.requirementIcon}>🏢</Text>
            <Text style={styles.requirementTitle}>General Liability</Text>
            <Text style={styles.requirementDescription}>
              Minimum 1,000,000 SAR coverage required
            </Text>
          </View>
          
          <View style={styles.requirementCard}>
            <Text style={styles.requirementIcon}>👷</Text>
            <Text style={styles.requirementTitle}>Workers Compensation</Text>
            <Text style={styles.requirementDescription}>
              Required for all employees and contractors
            </Text>
          </View>
          
          <View style={styles.requirementCard}>
            <Text style={styles.requirementIcon}>📋</Text>
            <Text style={styles.requirementTitle}>Documentation</Text>
            <Text style={styles.requirementDescription}>
              All documents must be current and valid
            </Text>
          </View>
        </View>
      </View>

      {/* Compliance Status */}
      <View style={styles.complianceSection}>
        <Text style={styles.sectionTitle}>Compliance Status</Text>
        
        <View style={styles.complianceCard}>
          <View style={styles.complianceHeader}>
            <Text style={styles.complianceTitle}>Insurance Compliance</Text>
            <View style={styles.complianceBadge}>
              <Text style={styles.complianceBadgeText}>COMPLIANT</Text>
            </View>
          </View>
          
          <Text style={styles.complianceDescription}>
            Your insurance documentation is up to date and compliant with 
            platform requirements.
          </Text>
          
          <View style={styles.complianceMetrics}>
            <View style={styles.complianceMetric}>
              <Text style={styles.complianceMetricValue}>3/3</Text>
              <Text style={styles.complianceMetricLabel}>Required Docs</Text>
            </View>
            <View style={styles.complianceMetric}>
              <Text style={styles.complianceMetricValue}>2</Text>
              <Text style={styles.complianceMetricLabel}>Active Policies</Text>
            </View>
            <View style={styles.complianceMetric}>
              <Text style={styles.complianceMetricValue}>100%</Text>
              <Text style={styles.complianceMetricLabel}>Compliance</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Contact Information */}
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Need Help with Insurance?</Text>
        <Text style={styles.contactText}>
          Contact our insurance team for assistance with documentation, 
          requirements, or policy questions.
        </Text>
        
        <View style={styles.contactInfo}>
          <Text style={styles.contactItem}>Email: insurance@nbcon.pro</Text>
          <Text style={styles.contactItem}>Phone: +966 11 123 4567</Text>
          <Text style={styles.contactItem}>Hours: 9 AM - 6 PM (Saudi Time)</Text>
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
  policiesSection: {
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
  policyCard: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  policyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  policyProvider: {
    fontSize: 18,
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
  policyNumber: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 5,
  },
  policyCoverage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 5,
  },
  policyExpiry: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 15,
  },
  policyButton: {
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  policyButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  uploadSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  documentTypesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  documentTypeCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  selectedDocumentTypeCard: {
    borderColor: '#1e3a8a',
    borderWidth: 2,
    backgroundColor: '#f0f9ff',
  },
  documentTypeIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  documentTypeName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
  },
  uploadActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  uploadActionButton: {
    backgroundColor: '#f3f4f6',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  uploadActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  uploadActionText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  uploadButton: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  documentsSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  documentCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  documentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  documentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  documentDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  documentDetails: {
    marginBottom: 10,
  },
  documentDetail: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  documentActions: {
    flexDirection: 'row',
    gap: 10,
  },
  viewButton: {
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  viewButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  replaceButton: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  replaceButtonText: {
    color: '#374151',
    fontSize: 12,
    fontWeight: '600',
  },
  requirementsSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  requirementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  requirementCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  requirementIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  requirementTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 4,
    textAlign: 'center',
  },
  requirementDescription: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 16,
  },
  complianceSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  complianceCard: {
    backgroundColor: '#f0f9ff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bae6fd',
  },
  complianceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  complianceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  complianceBadge: {
    backgroundColor: '#059669',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  complianceBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  complianceDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 15,
    lineHeight: 20,
  },
  complianceMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  complianceMetric: {
    alignItems: 'center',
  },
  complianceMetricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 4,
  },
  complianceMetricLabel: {
    fontSize: 12,
    color: '#6b7280',
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

export default InsuranceUploadScreen;
