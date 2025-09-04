import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';

export interface UploadedDocument {
  uri: string;
  name: string;
  type: string;
  size?: number;
}

interface DocumentUploadProps {
  label: { en: string; ar: string };
  value?: UploadedDocument | null;
  onDocumentSelect: (document: UploadedDocument | null) => void;
  required?: boolean;
  acceptedTypes?: string[];
  maxSizeInMB?: number;
  error?: string;
  helpText?: { en: string; ar: string };
  documentType?: 'image' | 'document' | 'any';
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  label,
  value,
  onDocumentSelect,
  required = false,
  acceptedTypes = ['application/pdf', 'image/*'],
  maxSizeInMB = 10,
  error,
  helpText,
  documentType = 'any',
}) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [isUploading, setIsUploading] = useState(false);

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const getFileTypeIcon = (type: string) => {
    if (type.startsWith('image/')) return 'image';
    if (type.includes('pdf')) return 'document-text';
    if (type.includes('word')) return 'document';
    return 'document-attach';
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    const kb = bytes / 1024;
    const mb = kb / 1024;
    
    if (mb > 1) {
      return `${mb.toFixed(1)} MB`;
    } else {
      return `${kb.toFixed(0)} KB`;
    }
  };

  const validateFileSize = (size?: number) => {
    if (!size) return true;
    const sizeInMB = size / (1024 * 1024);
    return sizeInMB <= maxSizeInMB;
  };

  const handleDocumentPicker = async () => {
    try {
      setIsUploading(true);
      
      const result = await DocumentPicker.getDocumentAsync({
        type: acceptedTypes,
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        
        if (!validateFileSize(asset.size)) {
          Alert.alert(
            isArabic ? 'خطأ' : 'Error',
            isArabic 
              ? `حجم الملف كبير جداً. الحد الأقصى ${maxSizeInMB} ميجابايت`
              : `File size too large. Maximum ${maxSizeInMB} MB allowed`,
            [{ text: isArabic ? 'موافق' : 'OK' }]
          );
          return;
        }

        const document: UploadedDocument = {
          uri: asset.uri,
          name: asset.name,
          type: asset.mimeType || 'application/octet-stream',
          size: asset.size,
        };

        onDocumentSelect(document);
      }
    } catch (error) {
      Alert.alert(
        isArabic ? 'خطأ' : 'Error',
        isArabic 
          ? 'حدث خطأ أثناء اختيار الملف'
          : 'Error selecting document',
        [{ text: isArabic ? 'موافق' : 'OK' }]
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleImagePicker = async () => {
    try {
      setIsUploading(true);

      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          isArabic ? 'إذن مطلوب' : 'Permission Required',
          isArabic 
            ? 'نحتاج إذنك للوصول إلى الصور'
            : 'We need permission to access your photos',
          [{ text: isArabic ? 'موافق' : 'OK' }]
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];

        const document: UploadedDocument = {
          uri: asset.uri,
          name: `image_${Date.now()}.jpg`,
          type: 'image/jpeg',
          size: asset.fileSize,
        };

        onDocumentSelect(document);
      }
    } catch (error) {
      Alert.alert(
        isArabic ? 'خطأ' : 'Error',
        isArabic 
          ? 'حدث خطأ أثناء اختيار الصورة'
          : 'Error selecting image',
        [{ text: isArabic ? 'موافق' : 'OK' }]
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleCameraPicker = async () => {
    try {
      setIsUploading(true);

      // Request permission
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          isArabic ? 'إذن مطلوب' : 'Permission Required',
          isArabic 
            ? 'نحتاج إذنك لاستخدام الكاميرا'
            : 'We need permission to use your camera',
          [{ text: isArabic ? 'موافق' : 'OK' }]
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];

        const document: UploadedDocument = {
          uri: asset.uri,
          name: `photo_${Date.now()}.jpg`,
          type: 'image/jpeg',
          size: asset.fileSize,
        };

        onDocumentSelect(document);
      }
    } catch (error) {
      Alert.alert(
        isArabic ? 'خطأ' : 'Error',
        isArabic 
          ? 'حدث خطأ أثناء التقاط الصورة'
          : 'Error taking photo',
        [{ text: isArabic ? 'موافق' : 'OK' }]
      );
    } finally {
      setIsUploading(false);
    }
  };

  const showUploadOptions = () => {
    const options = [];
    
    if (documentType === 'any' || documentType === 'document') {
      options.push({
        text: isArabic ? 'اختر من الملفات' : 'Choose from Files',
        onPress: handleDocumentPicker,
      });
    }
    
    if (documentType === 'any' || documentType === 'image') {
      options.push({
        text: isArabic ? 'اختر من المعرض' : 'Choose from Gallery',
        onPress: handleImagePicker,
      });
      
      options.push({
        text: isArabic ? 'التقط صورة' : 'Take Photo',
        onPress: handleCameraPicker,
      });
    }
    
    options.push({
      text: isArabic ? 'إلغاء' : 'Cancel',
      style: 'cancel',
    });

    Alert.alert(
      isArabic ? 'اختر طريقة الرفع' : 'Upload Method',
      isArabic ? 'كيف تريد رفع المستند؟' : 'How would you like to upload the document?',
      options
    );
  };

  const handleRemoveDocument = () => {
    Alert.alert(
      isArabic ? 'حذف المستند' : 'Remove Document',
      isArabic ? 'هل تريد حذف هذا المستند؟' : 'Are you sure you want to remove this document?',
      [
        { text: isArabic ? 'إلغاء' : 'Cancel', style: 'cancel' },
        { 
          text: isArabic ? 'حذف' : 'Remove', 
          style: 'destructive',
          onPress: () => onDocumentSelect(null)
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Label */}
      <View style={styles.labelContainer}>
        <Text style={[styles.label, { color: theme.text }]}>
          {getText(label)}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      </View>

      {/* Upload Area */}
      {!value ? (
        <TouchableOpacity
          style={[
            styles.uploadArea,
            {
              backgroundColor: theme.surface,
              borderColor: error ? COLORS.error : theme.border,
            },
          ]}
          onPress={showUploadOptions}
          disabled={isUploading}
        >
          {isUploading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={COLORS.primary} />
              <Text style={[styles.uploadingText, { color: theme.textSecondary }]}>
                {isArabic ? 'جاري الرفع...' : 'Uploading...'}
              </Text>
            </View>
          ) : (
            <>
              <Ionicons 
                name="cloud-upload" 
                size={40} 
                color={theme.textSecondary} 
                style={styles.uploadIcon}
              />
              <Text style={[styles.uploadText, { color: theme.text }]}>
                {isArabic ? 'اضغط لرفع المستند' : 'Tap to upload document'}
              </Text>
              <Text style={[styles.uploadSubtext, { color: theme.textSecondary }]}>
                {isArabic 
                  ? `PDF, صور - حتى ${maxSizeInMB} ميجابايت`
                  : `PDF, Images - Up to ${maxSizeInMB} MB`
                }
              </Text>
            </>
          )}
        </TouchableOpacity>
      ) : (
        <View style={[styles.documentContainer, { backgroundColor: theme.surface, borderColor: COLORS.success }]}>
          <View style={styles.documentInfo}>
            {value.type.startsWith('image/') ? (
              <Image source={{ uri: value.uri }} style={styles.documentThumbnail} />
            ) : (
              <View style={[styles.fileIconContainer, { backgroundColor: COLORS.primary }]}>
                <Ionicons 
                  name={getFileTypeIcon(value.type)} 
                  size={24} 
                  color={COLORS.white} 
                />
              </View>
            )}
            
            <View style={styles.documentDetails}>
              <Text style={[styles.documentName, { color: theme.text }]} numberOfLines={1}>
                {value.name}
              </Text>
              {value.size && (
                <Text style={[styles.documentSize, { color: theme.textSecondary }]}>
                  {formatFileSize(value.size)}
                </Text>
              )}
            </View>
          </View>
          
          <TouchableOpacity onPress={handleRemoveDocument} style={styles.removeButton}>
            <Ionicons name="close-circle" size={24} color={COLORS.error} />
          </TouchableOpacity>
        </View>
      )}

      {/* Error Message */}
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      {/* Help Text */}
      {helpText && !error && (
        <Text style={[styles.helpText, { color: theme.textSecondary }]}>
          {getText(helpText)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  labelContainer: {
    marginBottom: SPACING.xs,
  },
  label: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  required: {
    color: COLORS.error,
    fontSize: TYPOGRAPHY.sizes.body1,
  },
  uploadArea: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  uploadIcon: {
    marginBottom: SPACING.sm,
  },
  uploadText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  uploadSubtext: {
    fontSize: TYPOGRAPHY.sizes.caption,
    textAlign: 'center',
  },
  uploadingText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginTop: SPACING.sm,
  },
  documentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2,
  },
  documentInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentThumbnail: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.sm,
    marginRight: SPACING.md,
  },
  fileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  documentDetails: {
    flex: 1,
  },
  documentName: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.xs,
  },
  documentSize: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  removeButton: {
    padding: SPACING.xs,
  },
  errorText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.error,
    marginTop: SPACING.xs,
    marginLeft: SPACING.xs,
  },
  helpText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    marginTop: SPACING.xs,
    marginLeft: SPACING.xs,
    lineHeight: 16,
  },
});

export default DocumentUpload;