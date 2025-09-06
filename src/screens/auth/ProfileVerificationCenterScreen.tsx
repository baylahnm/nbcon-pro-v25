import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, TYPOGRAPHY } from '../../constants';

interface VerificationDocument {
  id: string;
  type: 'national_id' | 'iqama' | 'passport' | 'sce_license' | 'insurance' | 'bank_statement';
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected' | 'not_uploaded';
  uploadedAt?: Date;
  rejectionReason?: string;
  fileUri?: string;
}

const ProfileVerificationCenterScreen: React.FC = () => {
  const [documents, setDocuments] = useState<VerificationDocument[]>([
    {
      id: '1',
      type: 'national_id',
      title: 'National ID / Iqama',
      description: 'Upload your Saudi National ID or Iqama',
      status: 'not_uploaded',
    },
    {
      id: '2',
      type: 'sce_license',
      title: 'SCE License',
      description: 'Upload your Saudi Council of Engineers license',
      status: 'not_uploaded',
    },
    {
      id: '3',
      type: 'insurance',
      title: 'Professional Insurance',
      description: 'Upload your professional liability insurance',
      status: 'not_uploaded',
    },
    {
      id: '4',
      type: 'bank_statement',
      title: 'Bank Statement',
      description: 'Upload recent bank statement for payment verification',
      status: 'not_uploaded',
    },
  ]);

  const [verificationProgress, setVerificationProgress] = useState(0);
  const [overallStatus, setOverallStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');

  useEffect(() => {
    calculateVerificationProgress();
  }, [documents]);

  const calculateVerificationProgress = () => {
    const approvedCount = documents.filter(doc => doc.status === 'approved').length;
    const totalCount = documents.length;
    const progress = (approvedCount / totalCount) * 100;
    
    setVerificationProgress(progress);
    
    if (progress === 100) {
      setOverallStatus('approved');
    } else if (documents.some(doc => doc.status === 'rejected')) {
      setOverallStatus('rejected');
    } else {
      setOverallStatus('pending');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return 'checkmark-circle';
      case 'rejected':
        return 'close-circle';
      case 'pending':
        return 'time';
      default:
        return 'document-outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return COLORS.success;
      case 'rejected':
        return COLORS.error;
      case 'pending':
        return COLORS.warning;
      default:
        return COLORS.textSecondary;
    }
  };

  const handleDocumentUpload = async (documentId: string) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        const fileUri = result.assets[0].uri;
        
        setDocuments(prev => prev.map(doc => 
          doc.id === documentId 
            ? { ...doc, fileUri, status: 'pending', uploadedAt: new Date() }
            : doc
        ));

        Alert.alert('Success', 'Document uploaded successfully. It will be reviewed within 24-48 hours.');
      }
    } catch (error) {
      console.error('Error uploading document:', error);
      Alert.alert('Error', 'Failed to upload document');
    }
  };

  const handleImageUpload = async (documentId: string) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const fileUri = result.assets[0].uri;
        
        setDocuments(prev => prev.map(doc => 
          doc.id === documentId 
            ? { ...doc, fileUri, status: 'pending', uploadedAt: new Date() }
            : doc
        ));

        Alert.alert('Success', 'Document uploaded successfully. It will be reviewed within 24-48 hours.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image');
    }
  };

  const getOverallStatusText = () => {
    switch (overallStatus) {
      case 'approved':
        return 'Profile Verified';
      case 'rejected':
        return 'Verification Failed';
      default:
        return 'Verification Pending';
    }
  };

  const getOverallStatusColor = () => {
    switch (overallStatus) {
      case 'approved':
        return COLORS.success;
      case 'rejected':
        return COLORS.error;
      default:
        return COLORS.warning;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile Verification Center</Text>
        <Text style={styles.subtitle}>
          Complete your verification to access all features
        </Text>
      </View>

      {/* Verification Status */}
      <View style={styles.statusCard}>
        <View style={styles.statusHeader}>
          <Ionicons 
            name={getStatusIcon(overallStatus)} 
            size={32} 
            color={getOverallStatusColor()} 
          />
          <View style={styles.statusInfo}>
            <Text style={[styles.statusTitle, { color: getOverallStatusColor() }]}>
              {getOverallStatusText()}
            </Text>
            <Text style={styles.progressText}>
              {verificationProgress.toFixed(0)}% Complete
            </Text>
          </View>
        </View>
        
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${verificationProgress}%`,
                backgroundColor: getOverallStatusColor()
              }
            ]} 
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Required Documents</Text>
        
        {documents.map((document) => (
          <View key={document.id} style={styles.documentCard}>
            <View style={styles.documentHeader}>
              <View style={styles.documentInfo}>
                <Text style={styles.documentTitle}>{document.title}</Text>
                <Text style={styles.documentDescription}>{document.description}</Text>
              </View>
              <Ionicons 
                name={getStatusIcon(document.status)} 
                size={24} 
                color={getStatusColor(document.status)} 
              />
            </View>

            {document.fileUri && (
              <View style={styles.uploadedFile}>
                <Ionicons name="document" size={20} color={COLORS.primary} />
                <Text style={styles.fileText}>Document uploaded</Text>
                <Text style={styles.uploadDate}>
                  {document.uploadedAt?.toLocaleDateString()}
                </Text>
              </View>
            )}

            {document.rejectionReason && (
              <View style={styles.rejectionReason}>
                <Text style={styles.rejectionText}>
                  Rejection Reason: {document.rejectionReason}
                </Text>
              </View>
            )}

            <View style={styles.documentActions}>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => handleDocumentUpload(document.id)}
              >
                <Ionicons name="cloud-upload" size={20} color={COLORS.primary} />
                <Text style={styles.uploadButtonText}>Upload Document</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={() => handleImageUpload(document.id)}
              >
                <Ionicons name="camera" size={20} color={COLORS.primary} />
                <Text style={styles.cameraButtonText}>Take Photo</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Verification Guidelines */}
        <View style={styles.guidelinesCard}>
          <Text style={styles.guidelinesTitle}>Verification Guidelines</Text>
          <View style={styles.guidelinesList}>
            <Text style={styles.guidelineItem}>
              • All documents must be clear and legible
            </Text>
            <Text style={styles.guidelineItem}>
              • Documents should be in PDF or image format
            </Text>
            <Text style={styles.guidelineItem}>
              • Ensure all text is visible and not cut off
            </Text>
            <Text style={styles.guidelineItem}>
              • Documents will be reviewed within 24-48 hours
            </Text>
            <Text style={styles.guidelineItem}>
              • You'll receive notifications about verification status
            </Text>
          </View>
        </View>

        {/* Contact Support */}
        <View style={styles.supportCard}>
          <Ionicons name="help-circle" size={24} color={COLORS.primary} />
          <View style={styles.supportInfo}>
            <Text style={styles.supportTitle}>Need Help?</Text>
            <Text style={styles.supportText}>
              Contact our support team if you have questions about verification
            </Text>
          </View>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  statusCard: {
    margin: 20,
    padding: 20,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusInfo: {
    marginLeft: 15,
    flex: 1,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  documentCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  documentInfo: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 5,
  },
  documentDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  uploadedFile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  fileText: {
    fontSize: 14,
    color: COLORS.primary,
    marginLeft: 8,
    flex: 1,
  },
  uploadDate: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  rejectionReason: {
    backgroundColor: COLORS.errorLight,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  rejectionText: {
    fontSize: 14,
    color: COLORS.error,
  },
  documentActions: {
    flexDirection: 'row',
    gap: 10,
  },
  uploadButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
  },
  uploadButtonText: {
    fontSize: 14,
    color: COLORS.primary,
    marginLeft: 5,
    fontWeight: '500',
  },
  cameraButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  cameraButtonText: {
    fontSize: 14,
    color: COLORS.white,
    marginLeft: 5,
    fontWeight: '500',
  },
  guidelinesCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  guidelinesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  guidelinesList: {
    gap: 5,
  },
  guidelineItem: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  supportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  supportInfo: {
    flex: 1,
    marginLeft: 15,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 5,
  },
  supportText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  contactButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
  contactButtonText: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: '500',
  },
});

export default ProfileVerificationCenterScreen;
