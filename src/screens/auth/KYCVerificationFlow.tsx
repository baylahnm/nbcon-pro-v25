import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from 'react-native';

interface VerificationStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  required: boolean;
}

interface DocumentType {
  id: string;
  name: string;
  description: string;
  icon: string;
  acceptedFormats: string[];
  maxSize: string;
}

const KYCVerificationFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [verificationSteps, setVerificationSteps] = useState<VerificationStep[]>([
    {
      id: 'personal_info',
      title: 'Personal Information',
      description: 'Verify your personal details and identity',
      status: 'pending',
      required: true,
    },
    {
      id: 'document_upload',
      title: 'Document Upload',
      description: 'Upload required identity documents',
      status: 'pending',
      required: true,
    },
    {
      id: 'biometric_verification',
      title: 'Biometric Verification',
      description: 'Complete facial recognition and liveness check',
      status: 'pending',
      required: true,
    },
    {
      id: 'address_verification',
      title: 'Address Verification',
      description: 'Verify your residential address',
      status: 'pending',
      required: true,
    },
    {
      id: 'professional_credentials',
      title: 'Professional Credentials',
      description: 'Verify your engineering qualifications',
      status: 'pending',
      required: true,
    },
    {
      id: 'background_check',
      title: 'Background Check',
      description: 'Complete background verification process',
      status: 'pending',
      required: true,
    },
  ]);

  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    nationalId: '',
    dateOfBirth: '',
    nationality: '',
    gender: '',
  });

  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const documentTypes: DocumentType[] = [
    {
      id: 'national_id',
      name: 'National ID / Iqama',
      description: 'Saudi National ID or Iqama for expatriates',
      icon: '🆔',
      acceptedFormats: ['PDF', 'JPG', 'PNG'],
      maxSize: '5MB',
    },
    {
      id: 'passport',
      name: 'Passport',
      description: 'Valid passport (for expatriates)',
      icon: '📘',
      acceptedFormats: ['PDF', 'JPG', 'PNG'],
      maxSize: '5MB',
    },
    {
      id: 'driving_license',
      name: 'Driving License',
      description: 'Valid Saudi driving license',
      icon: '🚗',
      acceptedFormats: ['PDF', 'JPG', 'PNG'],
      maxSize: '5MB',
    },
    {
      id: 'sce_license',
      name: 'SCE License',
      description: 'Saudi Council of Engineers license',
      icon: '🏗️',
      acceptedFormats: ['PDF', 'JPG', 'PNG'],
      maxSize: '5MB',
    },
    {
      id: 'utility_bill',
      name: 'Utility Bill',
      description: 'Recent utility bill for address verification',
      icon: '📄',
      acceptedFormats: ['PDF', 'JPG', 'PNG'],
      maxSize: '5MB',
    },
  ];

  const handleStepComplete = (stepId: string) => {
    setVerificationSteps(prev =>
      prev.map(step =>
        step.id === stepId
          ? { ...step, status: 'completed' }
          : step
      )
    );
  };

  const handleNextStep = () => {
    if (currentStep < verificationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete verification
      handleCompleteVerification();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCompleteVerification = () => {
    setIsProcessing(true);
    
    // Simulate verification process
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert(
        'Verification Submitted',
        'Your KYC verification has been submitted successfully. You will receive a notification once the verification is complete.',
        [{ text: 'OK' }]
      );
    }, 3000);
  };

  const handleDocumentSelect = (documentId: string) => {
    setSelectedDocuments(prev =>
      prev.includes(documentId)
        ? prev.filter(id => id !== documentId)
        : [...prev, documentId]
    );
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {verificationSteps.map((step, index) => (
        <View key={step.id} style={styles.stepIndicatorItem}>
          <View style={[
            styles.stepIndicatorDot,
            index <= currentStep && styles.stepIndicatorDotActive,
            step.status === 'completed' && styles.stepIndicatorDotCompleted
          ]}>
            {step.status === 'completed' && (
              <Text style={styles.stepIndicatorCheck}>✓</Text>
            )}
          </View>
          {index < verificationSteps.length - 1 && (
            <View style={[
              styles.stepIndicatorLine,
              index < currentStep && styles.stepIndicatorLineActive
            ]} />
          )}
        </View>
      ))}
    </View>
  );

  const renderPersonalInfoStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Personal Information</Text>
      <Text style={styles.stepDescription}>
        Please provide your personal details for identity verification
      </Text>

      <View style={styles.formField}>
        <Text style={styles.fieldLabel}>Full Name *</Text>
        <TextInput
          style={styles.textInput}
          value={personalInfo.fullName}
          onChangeText={(text) => setPersonalInfo(prev => ({ ...prev, fullName: text }))}
          placeholder="Enter your full name as it appears on your ID"
          placeholderTextColor="#9ca3af"
        />
      </View>

      <View style={styles.formField}>
        <Text style={styles.fieldLabel}>National ID / Iqama *</Text>
        <TextInput
          style={styles.textInput}
          value={personalInfo.nationalId}
          onChangeText={(text) => setPersonalInfo(prev => ({ ...prev, nationalId: text }))}
          placeholder="Enter your National ID or Iqama number"
          placeholderTextColor="#9ca3af"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formField}>
        <Text style={styles.fieldLabel}>Date of Birth *</Text>
        <TextInput
          style={styles.textInput}
          value={personalInfo.dateOfBirth}
          onChangeText={(text) => setPersonalInfo(prev => ({ ...prev, dateOfBirth: text }))}
          placeholder="DD/MM/YYYY"
          placeholderTextColor="#9ca3af"
        />
      </View>

      <View style={styles.formField}>
        <Text style={styles.fieldLabel}>Nationality *</Text>
        <TextInput
          style={styles.textInput}
          value={personalInfo.nationality}
          onChangeText={(text) => setPersonalInfo(prev => ({ ...prev, nationality: text }))}
          placeholder="Enter your nationality"
          placeholderTextColor="#9ca3af"
        />
      </View>

      <View style={styles.formField}>
        <Text style={styles.fieldLabel}>Gender *</Text>
        <View style={styles.genderOptions}>
          <TouchableOpacity
            style={[
              styles.genderOption,
              personalInfo.gender === 'male' && styles.selectedGenderOption
            ]}
            onPress={() => setPersonalInfo(prev => ({ ...prev, gender: 'male' }))}
          >
            <Text style={[
              styles.genderOptionText,
              personalInfo.gender === 'male' && styles.selectedGenderOptionText
            ]}>
              Male
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderOption,
              personalInfo.gender === 'female' && styles.selectedGenderOption
            ]}
            onPress={() => setPersonalInfo(prev => ({ ...prev, gender: 'female' }))}
          >
            <Text style={[
              styles.genderOptionText,
              personalInfo.gender === 'female' && styles.selectedGenderOptionText
            ]}>
              Female
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderDocumentUploadStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Document Upload</Text>
      <Text style={styles.stepDescription}>
        Upload the required documents for verification
      </Text>

      {documentTypes.map((doc) => (
        <TouchableOpacity
          key={doc.id}
          style={[
            styles.documentCard,
            selectedDocuments.includes(doc.id) && styles.selectedDocumentCard
          ]}
          onPress={() => handleDocumentSelect(doc.id)}
        >
          <View style={styles.documentHeader}>
            <Text style={styles.documentIcon}>{doc.icon}</Text>
            <View style={styles.documentInfo}>
              <Text style={styles.documentName}>{doc.name}</Text>
              <Text style={styles.documentDescription}>{doc.description}</Text>
            </View>
            <View style={styles.documentBadge}>
              <Text style={styles.documentBadgeText}>Required</Text>
            </View>
          </View>
          
          <View style={styles.documentDetails}>
            <Text style={styles.documentFormat}>
              Accepted: {doc.acceptedFormats.join(', ')}
            </Text>
            <Text style={styles.documentSize}>Max size: {doc.maxSize}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderBiometricStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Biometric Verification</Text>
      <Text style={styles.stepDescription}>
        Complete facial recognition and liveness check for identity verification
      </Text>

      <View style={styles.biometricContainer}>
        <View style={styles.biometricPreview}>
          <Text style={styles.biometricIcon}>📷</Text>
          <Text style={styles.biometricText}>Camera Preview</Text>
        </View>
        
        <View style={styles.biometricInstructions}>
          <Text style={styles.instructionTitle}>Instructions:</Text>
          <Text style={styles.instructionText}>• Look directly at the camera</Text>
          <Text style={styles.instructionText}>• Ensure good lighting</Text>
          <Text style={styles.instructionText}>• Remove glasses and hats</Text>
          <Text style={styles.instructionText}>• Follow the on-screen prompts</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.biometricButton}>
        <Text style={styles.biometricButtonText}>Start Biometric Verification</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCurrentStep = () => {
    switch (verificationSteps[currentStep].id) {
      case 'personal_info':
        return renderPersonalInfoStep();
      case 'document_upload':
        return renderDocumentUploadStep();
      case 'biometric_verification':
        return renderBiometricStep();
      default:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>{verificationSteps[currentStep].title}</Text>
            <Text style={styles.stepDescription}>
              {verificationSteps[currentStep].description}
            </Text>
            <Text style={styles.comingSoonText}>This step will be available soon.</Text>
          </View>
        );
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>KYC Verification</Text>
        <Text style={styles.headerSubtitle}>
          Complete your identity verification to access all platform features
        </Text>
      </View>

      {/* Step Indicator */}
      {renderStepIndicator()}

      {/* Current Step */}
      {renderCurrentStep()}

      {/* Navigation Buttons */}
      <View style={styles.navigationSection}>
        <View style={styles.navigationButtons}>
          {currentStep > 0 && (
            <TouchableOpacity
              style={styles.previousButton}
              onPress={handlePreviousStep}
            >
              <Text style={styles.previousButtonText}>Previous</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            style={[
              styles.nextButton,
              isProcessing && styles.nextButtonDisabled
            ]}
            onPress={handleNextStep}
            disabled={isProcessing}
          >
            <Text style={styles.nextButtonText}>
              {isProcessing ? 'Processing...' : 
               currentStep === verificationSteps.length - 1 ? 'Complete Verification' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Progress Summary */}
      <View style={styles.progressSection}>
        <Text style={styles.progressTitle}>Verification Progress</Text>
        <Text style={styles.progressText}>
          Step {currentStep + 1} of {verificationSteps.length}
        </Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressBarFill, 
              { width: `${((currentStep + 1) / verificationSteps.length) * 100}%` }
            ]} 
          />
        </View>
      </View>

      {/* Security Notice */}
      <View style={styles.securityNotice}>
        <Text style={styles.securityTitle}>🔒 Security Notice</Text>
        <Text style={styles.securityText}>
          All your personal information and documents are encrypted and stored securely. 
          We comply with Saudi Arabia's Personal Data Protection Law (PDPL) and 
          international security standards.
        </Text>
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
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  stepIndicatorItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepIndicatorDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepIndicatorDotActive: {
    backgroundColor: '#1e3a8a',
  },
  stepIndicatorDotCompleted: {
    backgroundColor: '#059669',
  },
  stepIndicatorCheck: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepIndicatorLine: {
    width: 40,
    height: 2,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 5,
  },
  stepIndicatorLineActive: {
    backgroundColor: '#1e3a8a',
  },
  stepContent: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  stepDescription: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
    lineHeight: 24,
  },
  formField: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#374151',
  },
  genderOptions: {
    flexDirection: 'row',
    gap: 10,
  },
  genderOption: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedGenderOption: {
    backgroundColor: '#1e3a8a',
    borderColor: '#1e3a8a',
  },
  genderOptionText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  selectedGenderOptionText: {
    color: 'white',
  },
  documentCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  selectedDocumentCard: {
    borderColor: '#1e3a8a',
    borderWidth: 2,
    backgroundColor: '#f0f9ff',
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  documentIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  documentDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  documentBadge: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  documentBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  documentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  documentFormat: {
    fontSize: 12,
    color: '#6b7280',
  },
  documentSize: {
    fontSize: 12,
    color: '#6b7280',
  },
  biometricContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  biometricPreview: {
    width: 200,
    height: 200,
    backgroundColor: '#f3f4f6',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  biometricIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  biometricText: {
    fontSize: 14,
    color: '#6b7280',
  },
  biometricInstructions: {
    marginBottom: 20,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  biometricButton: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  biometricButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  comingSoonText: {
    fontSize: 16,
    color: '#6b7280',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
  navigationSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  previousButton: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  previousButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  nextButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  progressSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#1e3a8a',
  },
  securityNotice: {
    backgroundColor: '#f0f9ff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bae6fd',
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 8,
  },
  securityText: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 20,
  },
});

export default KYCVerificationFlow;
