import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface RejectionReason {
  id: string;
  title: string;
  description: string;
  icon: string;
  solution: string;
}

const KYCDocumentRejectedScreen = () => {
  const [expandedReason, setExpandedReason] = useState<string | null>(null);

  const rejectionReasons: RejectionReason[] = [
    {
      id: 'quality',
      title: 'Poor Document Quality',
      description: 'The uploaded document is blurry, dark, or unreadable',
      icon: 'image-not-supported',
      solution: 'Ensure good lighting and focus when taking photos. Use a flat surface and avoid shadows.'
    },
    {
      id: 'incomplete',
      title: 'Incomplete Information',
      description: 'Some required fields or sections are missing or cut off',
      icon: 'content-cut',
      solution: 'Make sure all four corners and all text on the document are visible in the photo.'
    },
    {
      id: 'expired',
      title: 'Expired Document',
      description: 'The document has passed its expiration date',
      icon: 'event-busy',
      solution: 'Please obtain a renewed version of the document before uploading.'
    },
    {
      id: 'invalid',
      title: 'Invalid Document Type',
      description: 'The uploaded document is not accepted for verification',
      icon: 'cancel',
      solution: 'Upload a valid National ID, Iqama, or Saudi Council of Engineers certificate.'
    },
    {
      id: 'mismatch',
      title: 'Information Mismatch',
      description: 'Details on the document don\'t match your profile information',
      icon: 'error-outline',
      solution: 'Ensure the name and details match exactly with your registration information.'
    }
  ];

  const handleReUpload = () => {
    // Navigate to document upload screen
    console.log('Navigate to re-upload');
  };

  const handleContactSupport = () => {
    // Navigate to support screen
    console.log('Navigate to support');
  };

  const toggleReason = (reasonId: string) => {
    setExpandedReason(expandedReason === reasonId ? null : reasonId);
  };

  const renderRejectionReason = (reason: RejectionReason) => (
    <TouchableOpacity
      key={reason.id}
      style={styles.reasonCard}
      onPress={() => toggleReason(reason.id)}
    >
      <View style={styles.reasonHeader}>
        <MaterialIcons name={reason.icon as any} size={24} color="#F44336" />
        <View style={styles.reasonInfo}>
          <Text style={styles.reasonTitle}>{reason.title}</Text>
          <Text style={styles.reasonDescription}>{reason.description}</Text>
        </View>
        <MaterialIcons
          name={expandedReason === reason.id ? "expand-less" : "expand-more"}
          size={24}
          color="#888"
        />
      </View>
      
      {expandedReason === reason.id && (
        <View style={styles.solutionSection}>
          <Text style={styles.solutionLabel}>How to fix:</Text>
          <Text style={styles.solutionText}>{reason.solution}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Document Rejected</Text>
          <TouchableOpacity style={styles.helpButton} onPress={handleContactSupport}>
            <MaterialIcons name="help-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Status Banner */}
        <View style={styles.statusBanner}>
          <View style={styles.statusIcon}>
            <MaterialIcons name="cancel" size={32} color="#F44336" />
          </View>
          <Text style={styles.statusTitle}>Document Verification Failed</Text>
          <Text style={styles.statusSubtitle}>
            Your document couldn't be verified. Please review the reasons below and upload a new document.
          </Text>
        </View>

        {/* Document Preview */}
        <View style={styles.documentPreview}>
          <Text style={styles.sectionTitle}>Rejected Document</Text>
          <View style={styles.previewCard}>
            <MaterialIcons name="description" size={40} color="#666" />
            <Text style={styles.previewTitle}>National ID / Iqama</Text>
            <Text style={styles.previewDate}>Uploaded: March 15, 2024</Text>
            <View style={styles.rejectedBadge}>
              <MaterialIcons name="close" size={14} color="#fff" />
              <Text style={styles.rejectedText}>REJECTED</Text>
            </View>
          </View>
        </View>

        {/* Rejection Reasons */}
        <View style={styles.reasonsSection}>
          <Text style={styles.sectionTitle}>Common Rejection Reasons</Text>
          <Text style={styles.sectionSubtitle}>
            Tap on any reason to see how to fix it
          </Text>
          {rejectionReasons.map(renderRejectionReason)}
        </View>

        {/* Guidelines */}
        <View style={styles.guidelinesSection}>
          <Text style={styles.sectionTitle}>Document Guidelines</Text>
          <View style={styles.guidelinesList}>
            <View style={styles.guidelineItem}>
              <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
              <Text style={styles.guidelineText}>Use good lighting and avoid shadows</Text>
            </View>
            <View style={styles.guidelineItem}>
              <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
              <Text style={styles.guidelineText}>Ensure all four corners are visible</Text>
            </View>
            <View style={styles.guidelineItem}>
              <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
              <Text style={styles.guidelineText}>Keep the document flat and straight</Text>
            </View>
            <View style={styles.guidelineItem}>
              <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
              <Text style={styles.guidelineText}>Make sure all text is clearly readable</Text>
            </View>
            <View style={styles.guidelineItem}>
              <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
              <Text style={styles.guidelineText}>Use original document (not photocopies)</Text>
            </View>
          </View>
        </View>

        {/* Help Section */}
        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>Need Help?</Text>
          <Text style={styles.helpText}>
            If you're still having trouble or believe this rejection was made in error, 
            our support team is here to help you.
          </Text>
          
          <View style={styles.helpOptions}>
            <TouchableOpacity style={styles.helpOption}>
              <MaterialIcons name="chat" size={24} color="#2196F3" />
              <View style={styles.helpOptionText}>
                <Text style={styles.helpOptionTitle}>Live Chat</Text>
                <Text style={styles.helpOptionSubtitle}>Get instant help</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.helpOption}>
              <MaterialIcons name="email" size={24} color="#4CAF50" />
              <View style={styles.helpOptionText}>
                <Text style={styles.helpOptionTitle}>Email Support</Text>
                <Text style={styles.helpOptionSubtitle}>support@nbcon.pro</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.helpOption}>
              <MaterialIcons name="phone" size={24} color="#FF9800" />
              <View style={styles.helpOptionText}>
                <Text style={styles.helpOptionTitle}>Phone Support</Text>
                <Text style={styles.helpOptionSubtitle}>+966 11 XXX XXXX</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleContactSupport}>
            <MaterialIcons name="support-agent" size={20} color="#2196F3" />
            <Text style={styles.secondaryButtonText}>Contact Support</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.primaryButton} onPress={handleReUpload}>
            <MaterialIcons name="upload" size={20} color="#fff" />
            <Text style={styles.primaryButtonText}>Upload New Document</Text>
          </TouchableOpacity>
        </View>

        {/* Compliance Notice */}
        <View style={styles.complianceNotice}>
          <MaterialIcons name="security" size={20} color="#4CAF50" />
          <Text style={styles.complianceText}>
            Document verification is required by Saudi regulations and helps ensure 
            platform security for all users.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  header: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  helpButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statusBanner: {
    alignItems: 'center',
    backgroundColor: '#1e1e3f',
    borderRadius: 12,
    padding: 24,
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(244, 67, 54, 0.3)',
  },
  statusIcon: {
    marginBottom: 12,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#F44336',
    marginBottom: 8,
    textAlign: 'center',
  },
  statusSubtitle: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
    lineHeight: 20,
  },
  documentPreview: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 16,
  },
  previewCard: {
    backgroundColor: '#2a2a4a',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    position: 'relative',
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginTop: 8,
    marginBottom: 4,
  },
  previewDate: {
    fontSize: 12,
    color: '#888',
  },
  rejectedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#F44336',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rejectedText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 4,
  },
  reasonsSection: {
    marginBottom: 24,
  },
  reasonCard: {
    backgroundColor: '#1e1e3f',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  reasonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reasonInfo: {
    flex: 1,
    marginLeft: 12,
  },
  reasonTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 4,
  },
  reasonDescription: {
    fontSize: 14,
    color: '#aaa',
    lineHeight: 18,
  },
  solutionSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  solutionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4CAF50',
    marginBottom: 8,
  },
  solutionText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 18,
  },
  guidelinesSection: {
    marginBottom: 24,
  },
  guidelinesList: {
    gap: 12,
  },
  guidelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guidelineText: {
    fontSize: 14,
    color: '#ccc',
    marginLeft: 12,
    flex: 1,
  },
  helpSection: {
    backgroundColor: '#1e1e3f',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#aaa',
    lineHeight: 20,
    marginBottom: 16,
  },
  helpOptions: {
    gap: 12,
  },
  helpOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a4a',
    borderRadius: 8,
    padding: 12,
  },
  helpOptionText: {
    marginLeft: 12,
    flex: 1,
  },
  helpOptionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 2,
  },
  helpOptionSubtitle: {
    fontSize: 12,
    color: '#888',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    borderRadius: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2196F3',
    marginLeft: 8,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginLeft: 8,
  },
  complianceNotice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#2a2a4a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 30,
  },
  complianceText: {
    fontSize: 12,
    color: '#aaa',
    lineHeight: 16,
    marginLeft: 8,
    flex: 1,
  },
});

export default KYCDocumentRejectedScreen;