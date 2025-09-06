import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

interface DataRequest {
  id: string;
  type: 'access' | 'portability' | 'deletion' | 'correction' | 'restriction';
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  submittedDate: string;
  completedDate?: string;
  description: string;
}

const PDPLDataRequestForm: React.FC = () => {
  const [selectedRequestType, setSelectedRequestType] = useState<string>('');
  const [requestDescription, setRequestDescription] = useState<string>('');
  const [contactMethod, setContactMethod] = useState<string>('email');
  const [verificationMethod, setVerificationMethod] = useState<string>('sms');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const requestTypes = [
    {
      id: 'access',
      title: 'Data Access Request',
      description: 'Request a copy of all personal data we hold about you',
      icon: '👁️',
      estimatedTime: '30 days',
    },
    {
      id: 'portability',
      title: 'Data Portability Request',
      description: 'Export your data in a machine-readable format',
      icon: '📤',
      estimatedTime: '30 days',
    },
    {
      id: 'deletion',
      title: 'Data Deletion Request',
      description: 'Request deletion of your personal data (Right to be forgotten)',
      icon: '🗑️',
      estimatedTime: '30 days',
    },
    {
      id: 'correction',
      title: 'Data Correction Request',
      description: 'Correct inaccurate or incomplete personal data',
      icon: '✏️',
      estimatedTime: '14 days',
    },
    {
      id: 'restriction',
      title: 'Data Restriction Request',
      description: 'Limit how we process your personal data',
      icon: '⏸️',
      estimatedTime: '14 days',
    },
  ];

  const existingRequests: DataRequest[] = [
    {
      id: '1',
      type: 'access',
      status: 'completed',
      submittedDate: '2024-12-01T10:30:00Z',
      completedDate: '2024-12-15T14:20:00Z',
      description: 'Request for complete data export',
    },
    {
      id: '2',
      type: 'correction',
      status: 'processing',
      submittedDate: '2024-12-10T09:15:00Z',
      description: 'Update incorrect phone number',
    },
  ];

  const handleRequestTypeSelect = (typeId: string) => {
    setSelectedRequestType(typeId);
  };

  const handleSubmitRequest = () => {
    if (!selectedRequestType) {
      Alert.alert('Error', 'Please select a request type.');
      return;
    }

    if (!requestDescription.trim()) {
      Alert.alert('Error', 'Please provide a description for your request.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Request Submitted',
        'Your data request has been submitted successfully. You will receive a confirmation email shortly.',
        [
          {
            text: 'OK',
            onPress: () => {
              setSelectedRequestType('');
              setRequestDescription('');
            }
          }
        ]
      );
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#d97706';
      case 'processing': return '#1e3a8a';
      case 'completed': return '#059669';
      case 'rejected': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending Review';
      case 'processing': return 'Processing';
      case 'completed': return 'Completed';
      case 'rejected': return 'Rejected';
      default: return status;
    }
  };

  const renderRequestType = (type: any) => (
    <TouchableOpacity
      key={type.id}
      style={[
        styles.requestTypeCard,
        selectedRequestType === type.id && styles.selectedRequestTypeCard
      ]}
      onPress={() => handleRequestTypeSelect(type.id)}
    >
      <View style={styles.requestTypeHeader}>
        <Text style={styles.requestTypeIcon}>{type.icon}</Text>
        <View style={styles.requestTypeInfo}>
          <Text style={styles.requestTypeTitle}>{type.title}</Text>
          <Text style={styles.requestTypeDescription}>{type.description}</Text>
        </View>
        <View style={styles.requestTypeBadge}>
          <Text style={styles.requestTypeTime}>{type.estimatedTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderExistingRequest = (request: DataRequest) => (
    <View key={request.id} style={styles.existingRequestCard}>
      <View style={styles.existingRequestHeader}>
        <Text style={styles.existingRequestType}>
          {requestTypes.find(t => t.id === request.type)?.title}
        </Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(request.status) }]}>
          <Text style={styles.statusText}>{getStatusText(request.status)}</Text>
        </View>
      </View>
      
      <Text style={styles.existingRequestDescription}>{request.description}</Text>
      
      <View style={styles.existingRequestDetails}>
        <Text style={styles.existingRequestDate}>
          Submitted: {new Date(request.submittedDate).toLocaleDateString()}
        </Text>
        {request.completedDate && (
          <Text style={styles.existingRequestDate}>
            Completed: {new Date(request.completedDate).toLocaleDateString()}
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Data Request Form</Text>
        <Text style={styles.headerSubtitle}>
          Exercise your rights under Saudi Arabia's Personal Data Protection Law (PDPL)
        </Text>
      </View>

      {/* Introduction */}
      <View style={styles.introSection}>
        <Text style={styles.introTitle}>Your Data Rights</Text>
        <Text style={styles.introText}>
          Under the Personal Data Protection Law (PDPL) of Saudi Arabia, you have 
          specific rights regarding your personal data. Use this form to exercise 
          these rights.
        </Text>
        <Text style={styles.introText}>
          All requests will be processed within 30 days as required by law, 
          and you will be notified of the outcome.
        </Text>
      </View>

      {/* Existing Requests */}
      {existingRequests.length > 0 && (
        <View style={styles.existingRequestsSection}>
          <Text style={styles.sectionTitle}>Your Recent Requests</Text>
          <Text style={styles.sectionSubtitle}>
            Track the status of your data requests
          </Text>
          
          {existingRequests.map(renderExistingRequest)}
        </View>
      )}

      {/* Request Type Selection */}
      <View style={styles.requestTypeSection}>
        <Text style={styles.sectionTitle}>Select Request Type</Text>
        <Text style={styles.sectionSubtitle}>
          Choose the type of data request you want to make
        </Text>
        
        {requestTypes.map(renderRequestType)}
      </View>

      {/* Request Details Form */}
      {selectedRequestType && (
        <View style={styles.requestFormSection}>
          <Text style={styles.sectionTitle}>Request Details</Text>
          
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Description *</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Please describe your request in detail..."
              value={requestDescription}
              onChangeText={setRequestDescription}
              multiline
              numberOfLines={4}
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Preferred Contact Method</Text>
            <View style={styles.contactMethodOptions}>
              <TouchableOpacity
                style={[
                  styles.contactMethodOption,
                  contactMethod === 'email' && styles.selectedContactMethod
                ]}
                onPress={() => setContactMethod('email')}
              >
                <Text style={[
                  styles.contactMethodText,
                  contactMethod === 'email' && styles.selectedContactMethodText
                ]}>
                  Email
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.contactMethodOption,
                  contactMethod === 'phone' && styles.selectedContactMethod
                ]}
                onPress={() => setContactMethod('phone')}
              >
                <Text style={[
                  styles.contactMethodText,
                  contactMethod === 'phone' && styles.selectedContactMethodText
                ]}>
                  Phone
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Verification Method</Text>
            <View style={styles.verificationMethodOptions}>
              <TouchableOpacity
                style={[
                  styles.verificationMethodOption,
                  verificationMethod === 'sms' && styles.selectedVerificationMethod
                ]}
                onPress={() => setVerificationMethod('sms')}
              >
                <Text style={[
                  styles.verificationMethodText,
                  verificationMethod === 'sms' && styles.selectedVerificationMethodText
                ]}>
                  SMS Code
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.verificationMethodOption,
                  verificationMethod === 'email' && styles.selectedVerificationMethod
                ]}
                onPress={() => setVerificationMethod('email')}
              >
                <Text style={[
                  styles.verificationMethodText,
                  verificationMethod === 'email' && styles.selectedVerificationMethodText
                ]}>
                  Email Code
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
            onPress={handleSubmitRequest}
            disabled={isSubmitting}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Information Section */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Important Information</Text>
        
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Processing Time</Text>
          <Text style={styles.infoText}>
            We will process your request within 30 days as required by PDPL. 
            Complex requests may take up to 60 days with prior notice.
          </Text>
        </View>
        
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Verification Required</Text>
          <Text style={styles.infoText}>
            We may need to verify your identity before processing your request. 
            This helps protect your personal data from unauthorized access.
          </Text>
        </View>
        
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Data Format</Text>
          <Text style={styles.infoText}>
            Data will be provided in a commonly used, machine-readable format 
            (PDF, JSON, or CSV) as required by law.
          </Text>
        </View>
      </View>

      {/* Contact Information */}
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Need Help?</Text>
        <Text style={styles.contactText}>
          If you have questions about your data rights or need assistance 
          with your request, contact our Data Protection Officer.
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
  existingRequestsSection: {
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
  existingRequestCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  existingRequestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  existingRequestType: {
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
  existingRequestDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  existingRequestDetails: {
    gap: 4,
  },
  existingRequestDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  requestTypeSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  requestTypeCard: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  selectedRequestTypeCard: {
    borderColor: '#1e3a8a',
    borderWidth: 2,
    backgroundColor: '#f0f9ff',
  },
  requestTypeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requestTypeIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  requestTypeInfo: {
    flex: 1,
    marginRight: 15,
  },
  requestTypeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  requestTypeDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  requestTypeBadge: {
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  requestTypeTime: {
    fontSize: 12,
    color: '#1e3a8a',
    fontWeight: '600',
  },
  requestFormSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
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
  textArea: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#374151',
    textAlignVertical: 'top',
  },
  contactMethodOptions: {
    flexDirection: 'row',
    gap: 10,
  },
  contactMethodOption: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedContactMethod: {
    backgroundColor: '#1e3a8a',
    borderColor: '#1e3a8a',
  },
  contactMethodText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  selectedContactMethodText: {
    color: 'white',
  },
  verificationMethodOptions: {
    flexDirection: 'row',
    gap: 10,
  },
  verificationMethodOption: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedVerificationMethod: {
    backgroundColor: '#1e3a8a',
    borderColor: '#1e3a8a',
  },
  verificationMethodText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  selectedVerificationMethodText: {
    color: 'white',
  },
  submitButton: {
    backgroundColor: '#1e3a8a',
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
  infoSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#6b7280',
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

export default PDPLDataRequestForm;
