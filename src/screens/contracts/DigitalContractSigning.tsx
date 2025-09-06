import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';

interface Contract {
  id: string;
  title: string;
  type: 'service_agreement' | 'nda' | 'payment_terms' | 'project_scope';
  status: 'draft' | 'pending_signature' | 'signed' | 'expired' | 'cancelled';
  createdDate: string;
  expiryDate?: string;
  parties: string[];
  description: string;
  terms: string[];
  signatureRequired: boolean;
}

interface Signature {
  id: string;
  signatory: string;
  role: 'client' | 'engineer' | 'witness';
  signedDate?: string;
  signatureMethod: 'digital' | 'biometric' | 'pin';
  status: 'pending' | 'signed' | 'declined';
}

const DigitalContractSigning: React.FC = () => {
  const [selectedContract, setSelectedContract] = useState<string>('');
  const [signatureMethod, setSignatureMethod] = useState<string>('digital');
  const [isSigning, setIsSigning] = useState(false);
  const [signaturePin, setSignaturePin] = useState('');

  const [contracts, setContracts] = useState<Contract[]>([
    {
      id: '1',
      title: 'Engineering Services Agreement',
      type: 'service_agreement',
      status: 'pending_signature',
      createdDate: '2024-12-15',
      expiryDate: '2024-12-22',
      parties: ['Client: ABC Construction', 'Engineer: John Smith'],
      description: 'Agreement for structural engineering services for the new office building project.',
      terms: [
        'Services to be provided include structural analysis and design',
        'Project timeline: 6 months from contract signing',
        'Payment terms: 50% upfront, 50% upon completion',
        'Engineer responsible for all design calculations and drawings',
        'Client responsible for providing site access and necessary permits'
      ],
      signatureRequired: true,
    },
    {
      id: '2',
      title: 'Non-Disclosure Agreement',
      type: 'nda',
      status: 'signed',
      createdDate: '2024-12-10',
      parties: ['Client: XYZ Corporation', 'Engineer: Sarah Johnson'],
      description: 'Confidentiality agreement for proprietary project information.',
      terms: [
        'All project information is confidential',
        'No disclosure to third parties without written consent',
        'Agreement valid for 2 years from signing',
        'Return all confidential materials upon project completion'
      ],
      signatureRequired: true,
    },
    {
      id: '3',
      title: 'Payment Terms Agreement',
      type: 'payment_terms',
      status: 'draft',
      createdDate: '2024-12-14',
      parties: ['Client: DEF Industries', 'Engineer: Mike Wilson'],
      description: 'Payment schedule and terms for engineering services.',
      terms: [
        'Payment due within 30 days of invoice',
        'Late payment fee: 2% per month',
        'Dispute resolution through arbitration',
        'Governing law: Saudi Arabia'
      ],
      signatureRequired: false,
    },
  ]);

  const [signatures, setSignatures] = useState<Signature[]>([
    {
      id: '1',
      signatory: 'John Smith',
      role: 'engineer',
      signedDate: '2024-12-15T10:30:00Z',
      signatureMethod: 'digital',
      status: 'signed',
    },
    {
      id: '2',
      signatory: 'ABC Construction',
      role: 'client',
      status: 'pending',
      signatureMethod: 'digital',
    },
  ]);

  const signatureMethods = [
    { id: 'digital', name: 'Digital Signature', icon: '✍️', description: 'Draw your signature' },
    { id: 'biometric', name: 'Biometric', icon: '👆', description: 'Use fingerprint or face ID' },
    { id: 'pin', name: 'PIN Code', icon: '🔢', description: 'Enter your PIN' },
  ];

  const handleContractSelect = (contractId: string) => {
    setSelectedContract(contractId);
  };

  const handleSignatureMethodSelect = (methodId: string) => {
    setSignatureMethod(methodId);
  };

  const handleSignContract = () => {
    if (!selectedContract) {
      Alert.alert('Error', 'Please select a contract to sign.');
      return;
    }

    if (signatureMethod === 'pin' && !signaturePin) {
      Alert.alert('Error', 'Please enter your PIN.');
      return;
    }

    setIsSigning(true);

    // Simulate signing process
    setTimeout(() => {
      setIsSigning(false);
      Alert.alert(
        'Contract Signed',
        'Your digital signature has been applied successfully. The contract is now legally binding.',
        [{ text: 'OK' }]
      );
    }, 3000);
  };

  const handleDeclineContract = () => {
    Alert.alert(
      'Decline Contract',
      'Are you sure you want to decline this contract? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Decline', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Contract Declined', 'The contract has been declined.');
          }
        }
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return '#6b7280';
      case 'pending_signature': return '#d97706';
      case 'signed': return '#059669';
      case 'expired': return '#dc2626';
      case 'cancelled': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return 'DRAFT';
      case 'pending_signature': return 'PENDING SIGNATURE';
      case 'signed': return 'SIGNED';
      case 'expired': return 'EXPIRED';
      case 'cancelled': return 'CANCELLED';
      default: return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'service_agreement': return '📋';
      case 'nda': return '🔒';
      case 'payment_terms': return '💰';
      case 'project_scope': return '🎯';
      default: return '📄';
    }
  };

  const renderContract = (contract: Contract) => (
    <TouchableOpacity
      key={contract.id}
      style={[
        styles.contractCard,
        selectedContract === contract.id && styles.selectedContractCard
      ]}
      onPress={() => handleContractSelect(contract.id)}
    >
      <View style={styles.contractHeader}>
        <View style={styles.contractInfo}>
          <Text style={styles.contractIcon}>{getTypeIcon(contract.type)}</Text>
          <View style={styles.contractDetails}>
            <Text style={styles.contractTitle}>{contract.title}</Text>
            <Text style={styles.contractDate}>
              Created: {new Date(contract.createdDate).toLocaleDateString()}
            </Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(contract.status) }]}>
          <Text style={styles.statusText}>{getStatusText(contract.status)}</Text>
        </View>
      </View>
      
      <Text style={styles.contractDescription}>{contract.description}</Text>
      
      <View style={styles.contractParties}>
        <Text style={styles.partiesTitle}>Parties:</Text>
        {contract.parties.map((party, index) => (
          <Text key={index} style={styles.partyText}>• {party}</Text>
        ))}
      </View>
      
      {contract.expiryDate && (
        <Text style={styles.contractExpiry}>
          Expires: {new Date(contract.expiryDate).toLocaleDateString()}
        </Text>
      )}
    </TouchableOpacity>
  );

  const renderSignatureMethod = (method: any) => (
    <TouchableOpacity
      key={method.id}
      style={[
        styles.signatureMethodCard,
        signatureMethod === method.id && styles.selectedSignatureMethodCard
      ]}
      onPress={() => handleSignatureMethodSelect(method.id)}
    >
      <Text style={styles.signatureMethodIcon}>{method.icon}</Text>
      <Text style={styles.signatureMethodName}>{method.name}</Text>
      <Text style={styles.signatureMethodDescription}>{method.description}</Text>
    </TouchableOpacity>
  );

  const renderSignature = (signature: Signature) => (
    <View key={signature.id} style={styles.signatureCard}>
      <View style={styles.signatureHeader}>
        <Text style={styles.signatureSignatory}>{signature.signatory}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(signature.status) }]}>
          <Text style={styles.statusText}>{signature.status.toUpperCase()}</Text>
        </View>
      </View>
      
      <Text style={styles.signatureRole}>Role: {signature.role}</Text>
      <Text style={styles.signatureMethod}>Method: {signature.signatureMethod}</Text>
      
      {signature.signedDate && (
        <Text style={styles.signatureDate}>
          Signed: {new Date(signature.signedDate).toLocaleString()}
        </Text>
      )}
    </View>
  );

  const selectedContractData = contracts.find(c => c.id === selectedContract);

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Digital Contract Signing</Text>
        <Text style={styles.headerSubtitle}>
          Review and sign contracts digitally with legal validity
        </Text>
      </View>

      {/* Contracts List */}
      <View style={styles.contractsSection}>
        <Text style={styles.sectionTitle}>Available Contracts</Text>
        <Text style={styles.sectionSubtitle}>
          Select a contract to review and sign
        </Text>
        
        {contracts.map(renderContract)}
      </View>

      {/* Contract Details */}
      {selectedContractData && (
        <View style={styles.contractDetailsSection}>
          <Text style={styles.sectionTitle}>Contract Details</Text>
          
          <View style={styles.contractDetailsCard}>
            <Text style={styles.contractDetailsTitle}>{selectedContractData.title}</Text>
            <Text style={styles.contractDetailsDescription}>{selectedContractData.description}</Text>
            
            <View style={styles.termsSection}>
              <Text style={styles.termsTitle}>Terms and Conditions:</Text>
              {selectedContractData.terms.map((term, index) => (
                <Text key={index} style={styles.termText}>• {term}</Text>
              ))}
            </View>
            
            <View style={styles.partiesSection}>
              <Text style={styles.partiesTitle}>Contracting Parties:</Text>
              {selectedContractData.parties.map((party, index) => (
                <Text key={index} style={styles.partyText}>• {party}</Text>
              ))}
            </View>
          </View>
        </View>
      )}

      {/* Signature Methods */}
      {selectedContractData && selectedContractData.status === 'pending_signature' && (
        <View style={styles.signatureSection}>
          <Text style={styles.sectionTitle}>Signature Method</Text>
          <Text style={styles.sectionSubtitle}>
            Choose how you want to sign the contract
          </Text>
          
          <View style={styles.signatureMethodsGrid}>
            {signatureMethods.map(renderSignatureMethod)}
          </View>
          
          {signatureMethod === 'pin' && (
            <View style={styles.pinSection}>
              <Text style={styles.pinLabel}>Enter your PIN:</Text>
              <TextInput
                style={styles.pinInput}
                value={signaturePin}
                onChangeText={setSignaturePin}
                placeholder="Enter 6-digit PIN"
                placeholderTextColor="#9ca3af"
                secureTextEntry
                keyboardType="numeric"
                maxLength={6}
              />
            </View>
          )}
        </View>
      )}

      {/* Signatures Status */}
      {selectedContractData && (
        <View style={styles.signaturesSection}>
          <Text style={styles.sectionTitle}>Signature Status</Text>
          <Text style={styles.sectionSubtitle}>
            Track who has signed the contract
          </Text>
          
          {signatures.map(renderSignature)}
        </View>
      )}

      {/* Action Buttons */}
      {selectedContractData && selectedContractData.status === 'pending_signature' && (
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={[styles.signButton, isSigning && styles.signButtonDisabled]}
            onPress={handleSignContract}
            disabled={isSigning}
          >
            <Text style={styles.signButtonText}>
              {isSigning ? 'Signing...' : 'Sign Contract'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.declineButton}
            onPress={handleDeclineContract}
          >
            <Text style={styles.declineButtonText}>Decline Contract</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Legal Information */}
      <View style={styles.legalSection}>
        <Text style={styles.sectionTitle}>Legal Information</Text>
        
        <View style={styles.legalCard}>
          <Text style={styles.legalTitle}>Digital Signature Validity</Text>
          <Text style={styles.legalText}>
            Digital signatures are legally binding in Saudi Arabia under the 
            Electronic Transactions Law. Your signature is cryptographically 
            secured and tamper-proof.
          </Text>
        </View>
        
        <View style={styles.legalCard}>
          <Text style={styles.legalTitle}>Contract Terms</Text>
          <Text style={styles.legalText}>
            By signing this contract, you agree to all terms and conditions. 
            The contract is governed by Saudi Arabian law and any disputes 
            will be resolved through the appropriate legal channels.
          </Text>
        </View>
        
        <View style={styles.legalCard}>
          <Text style={styles.legalTitle}>Data Protection</Text>
          <Text style={styles.legalText}>
            All contract data is encrypted and stored securely in compliance 
            with Saudi Arabia's Personal Data Protection Law (PDPL).
          </Text>
        </View>
      </View>

      {/* Contact Information */}
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Need Legal Assistance?</Text>
        <Text style={styles.contactText}>
          Contact our legal team for questions about contracts, terms, 
          or legal requirements.
        </Text>
        
        <View style={styles.contactInfo}>
          <Text style={styles.contactItem}>Email: legal@nbcon.pro</Text>
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
  contractsSection: {
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
  contractCard: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  selectedContractCard: {
    borderColor: '#1e3a8a',
    borderWidth: 2,
    backgroundColor: '#f0f9ff',
  },
  contractHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  contractInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contractIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  contractDetails: {
    flex: 1,
  },
  contractTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  contractDate: {
    fontSize: 14,
    color: '#6b7280',
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
  contractDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 10,
    lineHeight: 20,
  },
  contractParties: {
    marginBottom: 10,
  },
  partiesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  partyText: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  contractExpiry: {
    fontSize: 12,
    color: '#d97706',
    fontWeight: '500',
  },
  contractDetailsSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  contractDetailsCard: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  contractDetailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  contractDetailsDescription: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
    lineHeight: 24,
  },
  termsSection: {
    marginBottom: 20,
  },
  termsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  termText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 5,
    lineHeight: 20,
  },
  partiesSection: {
    marginBottom: 10,
  },
  partiesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  signatureSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  signatureMethodsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  signatureMethodCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  selectedSignatureMethodCard: {
    borderColor: '#1e3a8a',
    borderWidth: 2,
    backgroundColor: '#f0f9ff',
  },
  signatureMethodIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  signatureMethodName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  signatureMethodDescription: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  pinSection: {
    marginBottom: 20,
  },
  pinLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  pinInput: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
  },
  signaturesSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  signatureCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  signatureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  signatureSignatory: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  signatureRole: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  signatureMethod: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  signatureDate: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
  },
  actionSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  signButton: {
    backgroundColor: '#059669',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  signButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  signButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  declineButton: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  declineButtonText: {
    color: '#374151',
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

export default DigitalContractSigning;
