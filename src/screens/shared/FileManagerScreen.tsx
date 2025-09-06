import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  RefreshControl,
  Dimensions,
  Alert,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { RootState } from '../../store';
import { Language, FileType, UserRole } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

const { width } = Dimensions.get('window');

interface FileItem {
  id: string;
  name: string;
  type: FileType;
  size: number;
  uploadDate: string;
  uploadedBy: {
    id: string;
    name: { en: string; ar: string };
    role: UserRole;
  };
  version: string;
  isLocked: boolean;
  lockedBy?: {
    id: string;
    name: { en: string; ar: string };
  };
  downloadCount: number;
  lastAccessed: string;
  tags: string[];
  isShared: boolean;
  sharedWith: {
    id: string;
    name: { en: string; ar: string };
    role: UserRole;
  }[];
}

interface FolderItem {
  id: string;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  fileCount: number;
  totalSize: number;
  lastModified: string;
  createdBy: {
    id: string;
    name: { en: string; ar: string };
    role: UserRole;
  };
  isShared: boolean;
  sharedWith: {
    id: string;
    name: { en: string; ar: string };
    role: UserRole;
  }[];
  color: string;
  icon: string;
}

interface FileManagerScreenProps {
  route?: {
    params: {
      projectId: string;
      currentFolderId?: string;
    };
  };
}

const FileManagerScreen: React.FC<FileManagerScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { language, isDarkMode, user } = useSelector((state: RootState) => state.app);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FileType | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size' | 'type'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState<FolderItem[]>([]);

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  // Mock data - replace with actual API calls
  const folders: FolderItem[] = [
    {
      id: 'folder_1',
      name: { en: 'Project Documents', ar: 'مستندات المشروع' },
      description: { en: 'Main project documentation', ar: 'الوثائق الرئيسية للمشروع' },
      fileCount: 15,
      totalSize: 24500000, // 24.5 MB
      lastModified: '2024-02-15T10:30:00Z',
      createdBy: {
        id: 'eng_1',
        name: { en: 'Sara Al-Mansouri', ar: 'سارة المنصوري' },
        role: UserRole.ENGINEER,
      },
      isShared: true,
      sharedWith: [
        {
          id: 'client_1',
          name: { en: 'Ahmed Al-Rajhi', ar: 'أحمد الراجحي' },
          role: UserRole.CLIENT,
        },
      ],
      color: COLORS.primary,
      icon: 'folder',
    },
    {
      id: 'folder_2',
      name: { en: 'CAD Drawings', ar: 'رسومات CAD' },
      description: { en: 'Technical drawings and blueprints', ar: 'الرسومات التقنية والمخططات' },
      fileCount: 8,
      totalSize: 156000000, // 156 MB
      lastModified: '2024-02-14T16:45:00Z',
      createdBy: {
        id: 'eng_1',
        name: { en: 'Sara Al-Mansouri', ar: 'سارة المنصوري' },
        role: UserRole.ENGINEER,
      },
      isShared: true,
      sharedWith: [
        {
          id: 'client_1',
          name: { en: 'Ahmed Al-Rajhi', ar: 'أحمد الراجحي' },
          role: UserRole.CLIENT,
        },
      ],
      color: COLORS.accent,
      icon: 'construct',
    },
    {
      id: 'folder_3',
      name: { en: 'Reports', ar: 'التقارير' },
      description: { en: 'Project reports and analysis', ar: 'تقارير المشروع والتحليل' },
      fileCount: 12,
      totalSize: 8900000, // 8.9 MB
      lastModified: '2024-02-13T14:20:00Z',
      createdBy: {
        id: 'client_1',
        name: { en: 'Ahmed Al-Rajhi', ar: 'أحمد الراجحي' },
        role: UserRole.CLIENT,
      },
      isShared: true,
      sharedWith: [
        {
          id: 'eng_1',
          name: { en: 'Sara Al-Mansouri', ar: 'سارة المنصوري' },
          role: UserRole.ENGINEER,
        },
      ],
      color: COLORS.success,
      icon: 'document-text',
    },
  ];

  const files: FileItem[] = [
    {
      id: 'file_1',
      name: 'MEP_Design_v2.dwg',
      type: FileType.CAD,
      size: 12500000, // 12.5 MB
      uploadDate: '2024-02-15T10:30:00Z',
      uploadedBy: {
        id: 'eng_1',
        name: { en: 'Sara Al-Mansouri', ar: 'سارة المنصوري' },
        role: UserRole.ENGINEER,
      },
      version: '2.0',
      isLocked: false,
      downloadCount: 5,
      lastAccessed: '2024-02-15T14:20:00Z',
      tags: ['MEP', 'Design', 'DWG'],
      isShared: true,
      sharedWith: [
        {
          id: 'client_1',
          name: { en: 'Ahmed Al-Rajhi', ar: 'أحمد الراجحي' },
          role: UserRole.CLIENT,
        },
      ],
    },
    {
      id: 'file_2',
      name: 'Project_Report_Final.pdf',
      type: FileType.PDF,
      size: 3200000, // 3.2 MB
      uploadDate: '2024-02-14T16:45:00Z',
      uploadedBy: {
        id: 'eng_1',
        name: { en: 'Sara Al-Mansouri', ar: 'سارة المنصوري' },
        role: UserRole.ENGINEER,
      },
      version: '1.0',
      isLocked: true,
      lockedBy: {
        id: 'client_1',
        name: { en: 'Ahmed Al-Rajhi', ar: 'أحمد الراجحي' },
      },
      downloadCount: 12,
      lastAccessed: '2024-02-15T09:15:00Z',
      tags: ['Report', 'Final', 'PDF'],
      isShared: true,
      sharedWith: [
        {
          id: 'client_1',
          name: { en: 'Ahmed Al-Rajhi', ar: 'أحمد الراجحي' },
          role: UserRole.CLIENT,
        },
      ],
    },
    {
      id: 'file_3',
      name: 'Site_Photos.zip',
      type: FileType.ARCHIVE,
      size: 45000000, // 45 MB
      uploadDate: '2024-02-13T14:20:00Z',
      uploadedBy: {
        id: 'client_1',
        name: { en: 'Ahmed Al-Rajhi', ar: 'أحمد الراجحي' },
        role: UserRole.CLIENT,
      },
      version: '1.0',
      isLocked: false,
      downloadCount: 3,
      lastAccessed: '2024-02-14T11:30:00Z',
      tags: ['Photos', 'Site', 'ZIP'],
      isShared: true,
      sharedWith: [
        {
          id: 'eng_1',
          name: { en: 'Sara Al-Mansouri', ar: 'سارة المنصوري' },
          role: UserRole.ENGINEER,
        },
      ],
    },
  ];

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US');
  };

  const getFileIcon = (type: FileType) => {
    switch (type) {
      case FileType.PDF:
        return 'document-text';
      case FileType.CAD:
        return 'construct';
      case FileType.IMAGE:
        return 'image';
      case FileType.VIDEO:
        return 'videocam';
      case FileType.AUDIO:
        return 'musical-notes';
      case FileType.ARCHIVE:
        return 'archive';
      case FileType.SPREADSHEET:
        return 'grid';
      case FileType.PRESENTATION:
        return 'easel';
      default:
        return 'document';
    }
  };

  const getFileTypeColor = (type: FileType) => {
    switch (type) {
      case FileType.PDF:
        return COLORS.error;
      case FileType.CAD:
        return COLORS.primary;
      case FileType.IMAGE:
        return COLORS.accent;
      case FileType.VIDEO:
        return COLORS.warning;
      case FileType.AUDIO:
        return COLORS.success;
      case FileType.ARCHIVE:
        return COLORS.textSecondary;
      case FileType.SPREADSHEET:
        return COLORS.info;
      case FileType.PRESENTATION:
        return COLORS.primary;
      default:
        return COLORS.textSecondary;
    }
  };

  const filteredItems = [...folders, ...files].filter(item => {
    const matchesSearch = searchQuery === '' || 
      (item as any).name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item as any).name?.en?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item as any).name?.ar?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
      (item as any).type === selectedFilter;
    
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        const nameA = (a as any).name?.en || (a as any).name || '';
        const nameB = (b as any).name?.en || (b as any).name || '';
        comparison = nameA.localeCompare(nameB);
        break;
      case 'date':
        const dateA = new Date((a as any).lastModified || (a as any).uploadDate).getTime();
        const dateB = new Date((b as any).lastModified || (b as any).uploadDate).getTime();
        comparison = dateA - dateB;
        break;
      case 'size':
        const sizeA = (a as any).totalSize || (a as any).size || 0;
        const sizeB = (b as any).totalSize || (b as any).size || 0;
        comparison = sizeA - sizeB;
        break;
      case 'type':
        const typeA = (a as any).type || 'folder';
        const typeB = (b as any).type || 'folder';
        comparison = typeA.localeCompare(typeB);
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleItemPress = (item: FolderItem | FileItem) => {
    if ('type' in item) {
      // It's a file
      Alert.alert(
        item.name,
        isArabic ? 'سيتم فتح الملف قريباً' : 'File will open soon'
      );
    } else {
      // It's a folder
      setCurrentPath([...currentPath, item]);
      Alert.alert(
        getText(item.name),
        isArabic ? 'سيتم فتح المجلد قريباً' : 'Folder will open soon'
      );
    }
  };

  const handleItemLongPress = (item: FolderItem | FileItem) => {
    const itemId = item.id;
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleUpload = () => {
    setShowUploadModal(true);
  };

  const handleCreateFolder = () => {
    setShowCreateFolderModal(true);
  };

  const handleDeleteSelected = () => {
    Alert.alert(
      isArabic ? 'حذف العناصر المحددة' : 'Delete Selected Items',
      isArabic 
        ? `هل أنت متأكد من حذف ${selectedItems.length} عنصر؟`
        : `Are you sure you want to delete ${selectedItems.length} items?`,
      [
        {
          text: isArabic ? 'إلغاء' : 'Cancel',
          style: 'cancel',
        },
        {
          text: isArabic ? 'حذف' : 'Delete',
          style: 'destructive',
          onPress: () => {
            setSelectedItems([]);
            Alert.alert(
              isArabic ? 'تم الحذف' : 'Deleted',
              isArabic ? 'تم حذف العناصر المحددة' : 'Selected items deleted'
            );
          },
        },
      ]
    );
  };

  const renderFolderItem = ({ item }: { item: FolderItem }) => (
    <TouchableOpacity
      style={[
        styles.itemCard,
        { backgroundColor: theme.card },
        selectedItems.includes(item.id) && { borderColor: COLORS.primary, borderWidth: 2 }
      ]}
      onPress={() => handleItemPress(item)}
      onLongPress={() => handleItemLongPress(item)}
    >
      <View style={styles.itemHeader}>
        <View style={[styles.itemIcon, { backgroundColor: item.color }]}>
          <Ionicons name={item.icon as any} size={24} color={COLORS.white} />
        </View>
        <View style={styles.itemInfo}>
          <Text style={[styles.itemName, { color: theme.text }]}>
            {getText(item.name)}
          </Text>
          <Text style={[styles.itemDescription, { color: theme.textSecondary }]}>
            {getText(item.description)}
          </Text>
        </View>
        {item.isShared && (
          <Ionicons name="share" size={16} color={COLORS.primary} />
        )}
      </View>
      
      <View style={styles.itemDetails}>
        <View style={styles.itemDetailItem}>
          <Ionicons name="document-outline" size={14} color={theme.textSecondary} />
          <Text style={[styles.itemDetailText, { color: theme.textSecondary }]}>
            {item.fileCount} {isArabic ? 'ملف' : 'files'}
          </Text>
        </View>
        <View style={styles.itemDetailItem}>
          <Ionicons name="folder-outline" size={14} color={theme.textSecondary} />
          <Text style={[styles.itemDetailText, { color: theme.textSecondary }]}>
            {formatFileSize(item.totalSize)}
          </Text>
        </View>
        <View style={styles.itemDetailItem}>
          <Ionicons name="time-outline" size={14} color={theme.textSecondary} />
          <Text style={[styles.itemDetailText, { color: theme.textSecondary }]}>
            {formatDate(item.lastModified)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFileItem = ({ item }: { item: FileItem }) => (
    <TouchableOpacity
      style={[
        styles.itemCard,
        { backgroundColor: theme.card },
        selectedItems.includes(item.id) && { borderColor: COLORS.primary, borderWidth: 2 }
      ]}
      onPress={() => handleItemPress(item)}
      onLongPress={() => handleItemLongPress(item)}
    >
      <View style={styles.itemHeader}>
        <View style={[styles.itemIcon, { backgroundColor: getFileTypeColor(item.type) }]}>
          <Ionicons name={getFileIcon(item.type) as any} size={24} color={COLORS.white} />
        </View>
        <View style={styles.itemInfo}>
          <Text style={[styles.itemName, { color: theme.text }]}>
            {item.name}
          </Text>
          <Text style={[styles.itemDescription, { color: theme.textSecondary }]}>
            {getText(item.uploadedBy.name)} • v{item.version}
          </Text>
        </View>
        <View style={styles.itemActions}>
          {item.isLocked && (
            <Ionicons name="lock-closed" size={16} color={COLORS.warning} />
          )}
          {item.isShared && (
            <Ionicons name="share" size={16} color={COLORS.primary} />
          )}
        </View>
      </View>
      
      <View style={styles.itemDetails}>
        <View style={styles.itemDetailItem}>
          <Ionicons name="download-outline" size={14} color={theme.textSecondary} />
          <Text style={[styles.itemDetailText, { color: theme.textSecondary }]}>
            {item.downloadCount} {isArabic ? 'تحميل' : 'downloads'}
          </Text>
        </View>
        <View style={styles.itemDetailItem}>
          <Ionicons name="folder-outline" size={14} color={theme.textSecondary} />
          <Text style={[styles.itemDetailText, { color: theme.textSecondary }]}>
            {formatFileSize(item.size)}
          </Text>
        </View>
        <View style={styles.itemDetailItem}>
          <Ionicons name="time-outline" size={14} color={theme.textSecondary} />
          <Text style={[styles.itemDetailText, { color: theme.textSecondary }]}>
            {formatDate(item.uploadDate)}
          </Text>
        </View>
      </View>

      {item.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {item.tags.slice(0, 3).map((tag, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: theme.surface }]}>
              <Text style={[styles.tagText, { color: theme.textSecondary }]}>
                {tag}
              </Text>
            </View>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryDark]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>
              {isArabic ? 'إدارة الملفات' : 'File Manager'}
            </Text>
            <Text style={styles.headerSubtitle}>
              {isArabic 
                ? `${filteredItems.length} عنصر`
                : `${filteredItems.length} items`
              }
            </Text>
          </View>
          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Ionicons name="cloud-upload-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Search and Filters */}
      <View style={[styles.searchContainer, { backgroundColor: theme.surface }]}>
        <View style={[styles.searchBar, { backgroundColor: theme.background }]}>
          <Ionicons name="search" size={20} color={theme.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={isArabic ? 'البحث في الملفات...' : 'Search files...'}
            placeholderTextColor={theme.textSecondary}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={theme.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filters and View Options */}
      <View style={[styles.filtersContainer, { backgroundColor: theme.surface }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filtersContent}>
            {/* File Type Filters */}
            {[
              { key: 'all', label: { en: 'All', ar: 'الكل' }, icon: 'grid-outline' },
              { key: FileType.PDF, label: { en: 'PDF', ar: 'PDF' }, icon: 'document-text-outline' },
              { key: FileType.CAD, label: { en: 'CAD', ar: 'CAD' }, icon: 'construct-outline' },
              { key: FileType.IMAGE, label: { en: 'Images', ar: 'الصور' }, icon: 'image-outline' },
              { key: FileType.VIDEO, label: { en: 'Videos', ar: 'الفيديوهات' }, icon: 'videocam-outline' },
            ].map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterChip,
                  selectedFilter === filter.key && { backgroundColor: COLORS.primary }
                ]}
                onPress={() => setSelectedFilter(filter.key as any)}
              >
                <Ionicons 
                  name={filter.icon as any} 
                  size={16} 
                  color={selectedFilter === filter.key ? COLORS.white : theme.textSecondary} 
                />
                <Text style={[
                  styles.filterChipText,
                  { color: selectedFilter === filter.key ? COLORS.white : theme.textSecondary }
                ]}>
                  {getText(filter.label)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View style={styles.viewOptions}>
          <TouchableOpacity
            style={[styles.viewButton, viewMode === 'list' && { backgroundColor: COLORS.primary }]}
            onPress={() => setViewMode('list')}
          >
            <Ionicons 
              name="list" 
              size={20} 
              color={viewMode === 'list' ? COLORS.white : theme.textSecondary} 
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewButton, viewMode === 'grid' && { backgroundColor: COLORS.primary }]}
            onPress={() => setViewMode('grid')}
          >
            <Ionicons 
              name="grid" 
              size={20} 
              color={viewMode === 'grid' ? COLORS.white : theme.textSecondary} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Action Bar */}
      {selectedItems.length > 0 && (
        <View style={[styles.actionBar, { backgroundColor: theme.surface }]}>
          <Text style={[styles.selectedCount, { color: theme.text }]}>
            {selectedItems.length} {isArabic ? 'محدد' : 'selected'}
          </Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={handleDeleteSelected}>
              <Ionicons name="trash-outline" size={20} color={COLORS.error} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="share-outline" size={20} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="download-outline" size={20} color={COLORS.accent} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Files and Folders List */}
      <FlatList
        data={filteredItems}
        renderItem={({ item }) => {
          if ('type' in item) {
            return renderFileItem({ item: item as FileItem });
          } else {
            return renderFolderItem({ item: item as FolderItem });
          }
        }}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.itemsList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="folder-open-outline" size={64} color={theme.textSecondary} />
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              {isArabic ? 'لا توجد ملفات' : 'No files found'}
            </Text>
            <Text style={[styles.emptyDescription, { color: theme.textSecondary }]}>
              {isArabic 
                ? 'ابدأ بتحميل ملفاتك أو إنشاء مجلد جديد'
                : 'Start by uploading your files or creating a new folder'
              }
            </Text>
            <View style={styles.emptyActions}>
              <CustomButton
                title={isArabic ? 'تحميل ملفات' : 'Upload Files'}
                onPress={handleUpload}
                style={styles.emptyButton}
              />
              <CustomButton
                title={isArabic ? 'إنشاء مجلد' : 'Create Folder'}
                onPress={handleCreateFolder}
                variant="outline"
                style={styles.emptyButton}
              />
            </View>
          </View>
        }
      />

      {/* Upload Modal */}
      <Modal
        visible={showUploadModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowUploadModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              {isArabic ? 'تحميل ملفات' : 'Upload Files'}
            </Text>
            <Text style={[styles.modalDescription, { color: theme.textSecondary }]}>
              {isArabic 
                ? 'اختر الملفات التي تريد تحميلها'
                : 'Select files to upload'
              }
            </Text>
            <View style={styles.modalActions}>
              <CustomButton
                title={isArabic ? 'إلغاء' : 'Cancel'}
                onPress={() => setShowUploadModal(false)}
                variant="outline"
                style={styles.modalButton}
              />
              <CustomButton
                title={isArabic ? 'تحميل' : 'Upload'}
                onPress={() => {
                  setShowUploadModal(false);
                  Alert.alert(
                    isArabic ? 'تم التحميل' : 'Uploaded',
                    isArabic ? 'تم تحميل الملفات بنجاح' : 'Files uploaded successfully'
                  );
                }}
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Create Folder Modal */}
      <Modal
        visible={showCreateFolderModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCreateFolderModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              {isArabic ? 'إنشاء مجلد جديد' : 'Create New Folder'}
            </Text>
            <TextInput
              style={[styles.folderNameInput, { 
                backgroundColor: theme.surface,
                color: theme.text,
                borderColor: theme.border 
              }]}
              placeholder={isArabic ? 'اسم المجلد' : 'Folder name'}
              placeholderTextColor={theme.textSecondary}
            />
            <View style={styles.modalActions}>
              <CustomButton
                title={isArabic ? 'إلغاء' : 'Cancel'}
                onPress={() => setShowCreateFolderModal(false)}
                variant="outline"
                style={styles.modalButton}
              />
              <CustomButton
                title={isArabic ? 'إنشاء' : 'Create'}
                onPress={() => {
                  setShowCreateFolderModal(false);
                  Alert.alert(
                    isArabic ? 'تم الإنشاء' : 'Created',
                    isArabic ? 'تم إنشاء المجلد بنجاح' : 'Folder created successfully'
                  );
                }}
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: TYPOGRAPHY.sizes.body2,
    color: COLORS.white,
    opacity: 0.9,
  },
  uploadButton: {
    padding: 4,
  },
  searchContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: BORDER_RADIUS.sm,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: TYPOGRAPHY.sizes.body1,
  },
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filtersContent: {
    flex: 1,
    flexDirection: 'row',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
  },
  filterChipText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginLeft: 4,
  },
  viewOptions: {
    flexDirection: 'row',
    marginLeft: 12,
  },
  viewButton: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  selectedCount: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  itemsList: {
    padding: 20,
  },
  itemCard: {
    borderRadius: BORDER_RADIUS.md,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  itemDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  itemDetailText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  emptyActions: {
    flexDirection: 'row',
    gap: 12,
  },
  emptyButton: {
    paddingHorizontal: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: BORDER_RADIUS.md,
    padding: 24,
  },
  modalTitle: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginBottom: 20,
  },
  folderNameInput: {
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: TYPOGRAPHY.sizes.body1,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  modalButton: {
    paddingHorizontal: 24,
  },
});

export default FileManagerScreen;
