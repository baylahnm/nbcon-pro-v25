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
import { Language, UserRole } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

const { width } = Dimensions.get('window');

interface DiscussionThread {
  id: string;
  title: { en: string; ar: string };
  content: { en: string; ar: string };
  author: {
    id: string;
    name: { en: string; ar: string };
    role: UserRole;
    avatar?: string;
  };
  createdAt: string;
  lastActivity: string;
  repliesCount: number;
  viewsCount: number;
  likesCount: number;
  isPinned: boolean;
  isLocked: boolean;
  tags: string[];
  category: {
    id: string;
    name: { en: string; ar: string };
    color: string;
  };
  participants: {
    id: string;
    name: { en: string; ar: string };
    role: UserRole;
    lastSeen: string;
  }[];
  attachments: {
    id: string;
    name: string;
    type: string;
    size: number;
    url: string;
  }[];
}

interface DiscussionReply {
  id: string;
  content: { en: string; ar: string };
  author: {
    id: string;
    name: { en: string; ar: string };
    role: UserRole;
    avatar?: string;
  };
  createdAt: string;
  likesCount: number;
  isSolution: boolean;
  parentReplyId?: string;
  replies: DiscussionReply[];
}

interface ProjectDiscussionForumScreenProps {
  route?: {
    params: {
      projectId: string;
      categoryId?: string;
    };
  };
}

const ProjectDiscussionForumScreen: React.FC<ProjectDiscussionForumScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { language, isDarkMode, user } = useSelector((state: RootState) => state.app);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'unanswered'>('recent');
  const [showCreateThreadModal, setShowCreateThreadModal] = useState(false);
  const [selectedThread, setSelectedThread] = useState<DiscussionThread | null>(null);
  const [showThreadModal, setShowThreadModal] = useState(false);
  const [newReply, setNewReply] = useState('');

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  // Mock data - replace with actual API calls
  const categories = [
    {
      id: 'general',
      name: { en: 'General Discussion', ar: 'نقاش عام' },
      color: COLORS.primary,
      icon: 'chatbubbles-outline',
    },
    {
      id: 'technical',
      name: { en: 'Technical Issues', ar: 'المشاكل التقنية' },
      color: COLORS.accent,
      icon: 'construct-outline',
    },
    {
      id: 'design',
      name: { en: 'Design & Planning', ar: 'التصميم والتخطيط' },
      color: COLORS.success,
      icon: 'create-outline',
    },
    {
      id: 'safety',
      name: { en: 'Safety & Compliance', ar: 'السلامة والامتثال' },
      color: COLORS.warning,
      icon: 'shield-checkmark-outline',
    },
    {
      id: 'updates',
      name: { en: 'Project Updates', ar: 'تحديثات المشروع' },
      color: COLORS.info,
      icon: 'trending-up-outline',
    },
  ];

  const threads: DiscussionThread[] = [
    {
      id: 'thread_1',
      title: { 
        en: 'MEP Design Review - Need Feedback on HVAC Layout', 
        ar: 'مراجعة تصميم MEP - نحتاج ملاحظات على تخطيط HVAC' 
      },
      content: { 
        en: 'I\'ve completed the initial HVAC layout for the office building. Please review the attached drawings and provide feedback on the ductwork routing and equipment placement.',
        ar: 'لقد أكملت التخطيط الأولي لـ HVAC للمبنى المكتبي. يرجى مراجعة الرسومات المرفقة وتقديم ملاحظات حول توجيه مجاري الهواء ووضع المعدات.'
      },
      author: {
        id: 'eng_1',
        name: { en: 'Sara Al-Mansouri', ar: 'سارة المنصوري' },
        role: UserRole.ENGINEER,
      },
      createdAt: '2024-02-15T10:30:00Z',
      lastActivity: '2024-02-15T14:20:00Z',
      repliesCount: 8,
      viewsCount: 24,
      likesCount: 5,
      isPinned: true,
      isLocked: false,
      tags: ['MEP', 'HVAC', 'Design Review'],
      category: categories[1],
      participants: [
        {
          id: 'client_1',
          name: { en: 'Ahmed Al-Rajhi', ar: 'أحمد الراجحي' },
          role: UserRole.CLIENT,
          lastSeen: '2024-02-15T14:20:00Z',
        },
        {
          id: 'eng_2',
          name: { en: 'Mohammed Al-Shehri', ar: 'محمد الشهري' },
          role: UserRole.ENGINEER,
          lastSeen: '2024-02-15T13:45:00Z',
        },
      ],
      attachments: [
        {
          id: 'att_1',
          name: 'HVAC_Layout_v2.dwg',
          type: 'CAD',
          size: 12500000,
          url: '#',
        },
      ],
    },
    {
      id: 'thread_2',
      title: { 
        en: 'Safety Protocol for Site Visit Tomorrow', 
        ar: 'بروتوكول السلامة لزيارة الموقع غداً' 
      },
      content: { 
        en: 'Reminder: All team members must wear proper PPE and follow safety protocols during tomorrow\'s site visit. Weather conditions look good.',
        ar: 'تذكير: يجب على جميع أعضاء الفريق ارتداء معدات الحماية الشخصية المناسبة واتباع بروتوكولات السلامة أثناء زيارة الموقع غداً. ظروف الطقس تبدو جيدة.'
      },
      author: {
        id: 'client_1',
        name: { en: 'Ahmed Al-Rajhi', ar: 'أحمد الراجحي' },
        role: UserRole.CLIENT,
      },
      createdAt: '2024-02-14T16:45:00Z',
      lastActivity: '2024-02-14T18:30:00Z',
      repliesCount: 3,
      viewsCount: 12,
      likesCount: 2,
      isPinned: false,
      isLocked: false,
      tags: ['Safety', 'Site Visit', 'PPE'],
      category: categories[3],
      participants: [
        {
          id: 'eng_1',
          name: { en: 'Sara Al-Mansouri', ar: 'سارة المنصوري' },
          role: UserRole.ENGINEER,
          lastSeen: '2024-02-14T18:30:00Z',
        },
      ],
      attachments: [],
    },
    {
      id: 'thread_3',
      title: { 
        en: 'Budget Update - Additional Costs for Foundation Work', 
        ar: 'تحديث الميزانية - تكاليف إضافية لأعمال الأساس' 
      },
      content: { 
        en: 'The soil analysis revealed additional foundation requirements. We need to discuss the budget implications and get approval for the extra costs.',
        ar: 'كشف تحليل التربة عن متطلبات إضافية للأساس. نحتاج لمناقشة الآثار المالية والحصول على موافقة للتكاليف الإضافية.'
      },
      author: {
        id: 'eng_1',
        name: { en: 'Sara Al-Mansouri', ar: 'سارة المنصوري' },
        role: UserRole.ENGINEER,
      },
      createdAt: '2024-02-13T14:20:00Z',
      lastActivity: '2024-02-14T09:15:00Z',
      repliesCount: 12,
      viewsCount: 18,
      likesCount: 1,
      isPinned: false,
      isLocked: false,
      tags: ['Budget', 'Foundation', 'Costs'],
      category: categories[4],
      participants: [
        {
          id: 'client_1',
          name: { en: 'Ahmed Al-Rajhi', ar: 'أحمد الراجحي' },
          role: UserRole.CLIENT,
          lastSeen: '2024-02-14T09:15:00Z',
        },
      ],
      attachments: [
        {
          id: 'att_2',
          name: 'Soil_Analysis_Report.pdf',
          type: 'PDF',
          size: 3200000,
          url: '#',
        },
      ],
    },
  ];

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return isArabic ? 'الآن' : 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ${isArabic ? 'مضت' : 'ago'}`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ${isArabic ? 'مضت' : 'ago'}`;
    }
  };

  const filteredThreads = threads.filter(thread => {
    const matchesSearch = searchQuery === '' || 
      getText(thread.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
      getText(thread.content).toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
      thread.category.id === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
      case 'popular':
        return b.viewsCount - a.viewsCount;
      case 'unanswered':
        return a.repliesCount - b.repliesCount;
      default:
        return 0;
    }
  });

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleThreadPress = (thread: DiscussionThread) => {
    setSelectedThread(thread);
    setShowThreadModal(true);
  };

  const handleCreateThread = () => {
    setShowCreateThreadModal(true);
  };

  const handleReplySubmit = () => {
    if (newReply.trim()) {
      Alert.alert(
        isArabic ? 'تم إرسال الرد' : 'Reply Sent',
        isArabic ? 'تم إرسال ردك بنجاح' : 'Your reply has been sent successfully'
      );
      setNewReply('');
    }
  };

  const renderThreadItem = ({ item }: { item: DiscussionThread }) => (
    <TouchableOpacity
      style={[styles.threadCard, { backgroundColor: theme.card }]}
      onPress={() => handleThreadPress(item)}
    >
      <View style={styles.threadHeader}>
        <View style={styles.threadMeta}>
          <View style={[styles.categoryBadge, { backgroundColor: item.category.color }]}>
            <Ionicons name={item.category.icon as any} size={12} color={COLORS.white} />
            <Text style={styles.categoryText}>
              {getText(item.category.name)}
            </Text>
          </View>
          {item.isPinned && (
            <Ionicons name="pin" size={16} color={COLORS.warning} />
          )}
          {item.isLocked && (
            <Ionicons name="lock-closed" size={16} color={COLORS.textSecondary} />
          )}
        </View>
        <Text style={[styles.threadTitle, { color: theme.text }]}>
          {getText(item.title)}
        </Text>
      </View>

      <Text style={[styles.threadContent, { color: theme.textSecondary }]} numberOfLines={2}>
        {getText(item.content)}
      </Text>

      <View style={styles.threadFooter}>
        <View style={styles.threadAuthor}>
          <View style={[styles.authorAvatar, { backgroundColor: item.category.color }]}>
            <Text style={styles.authorInitial}>
              {getText(item.author.name).charAt(0).toUpperCase()}
            </Text>
          </View>
          <View>
            <Text style={[styles.authorName, { color: theme.text }]}>
              {getText(item.author.name)}
            </Text>
            <Text style={[styles.authorRole, { color: theme.textSecondary }]}>
              {item.author.role === UserRole.ENGINEER 
                ? (isArabic ? 'مهندس' : 'Engineer')
                : (isArabic ? 'عميل' : 'Client')
              }
            </Text>
          </View>
        </View>

        <View style={styles.threadStats}>
          <View style={styles.statItem}>
            <Ionicons name="chatbubbles-outline" size={14} color={theme.textSecondary} />
            <Text style={[styles.statText, { color: theme.textSecondary }]}>
              {item.repliesCount}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="eye-outline" size={14} color={theme.textSecondary} />
            <Text style={[styles.statText, { color: theme.textSecondary }]}>
              {item.viewsCount}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="heart-outline" size={14} color={theme.textSecondary} />
            <Text style={[styles.statText, { color: theme.textSecondary }]}>
              {item.likesCount}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.threadTags}>
        {item.tags.map((tag, index) => (
          <View key={index} style={[styles.tag, { backgroundColor: theme.surface }]}>
            <Text style={[styles.tagText, { color: theme.textSecondary }]}>
              {tag}
            </Text>
          </View>
        ))}
      </View>

      <Text style={[styles.threadTime, { color: theme.textSecondary }]}>
        {formatDate(item.lastActivity)}
      </Text>
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
              {isArabic ? 'منتدى النقاش' : 'Discussion Forum'}
            </Text>
            <Text style={styles.headerSubtitle}>
              {isArabic 
                ? `${filteredThreads.length} موضوع`
                : `${filteredThreads.length} threads`
              }
            </Text>
          </View>
          <TouchableOpacity style={styles.createButton} onPress={handleCreateThread}>
            <Ionicons name="add" size={24} color={COLORS.white} />
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
            placeholder={isArabic ? 'البحث في المناقشات...' : 'Search discussions...'}
            placeholderTextColor={theme.textSecondary}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={theme.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={[styles.categoriesContainer, { backgroundColor: theme.surface }]}
      >
        <View style={styles.categoriesContent}>
          <TouchableOpacity
            style={[
              styles.categoryChip,
              selectedCategory === 'all' && { backgroundColor: COLORS.primary }
            ]}
            onPress={() => setSelectedCategory('all')}
          >
            <Text style={[
              styles.categoryChipText,
              { color: selectedCategory === 'all' ? COLORS.white : theme.textSecondary }
            ]}>
              {isArabic ? 'الكل' : 'All'}
            </Text>
          </TouchableOpacity>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                selectedCategory === category.id && { backgroundColor: category.color }
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Ionicons 
                name={category.icon as any} 
                size={16} 
                color={selectedCategory === category.id ? COLORS.white : theme.textSecondary} 
              />
              <Text style={[
                styles.categoryChipText,
                { color: selectedCategory === category.id ? COLORS.white : theme.textSecondary }
              ]}>
                {getText(category.name)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Sort Options */}
      <View style={[styles.sortContainer, { backgroundColor: theme.surface }]}>
        <Text style={[styles.sortLabel, { color: theme.text }]}>
          {isArabic ? 'ترتيب حسب:' : 'Sort by:'}
        </Text>
        <View style={styles.sortOptions}>
          {[
            { key: 'recent', label: { en: 'Recent', ar: 'الأحدث' } },
            { key: 'popular', label: { en: 'Popular', ar: 'الأكثر شعبية' } },
            { key: 'unanswered', label: { en: 'Unanswered', ar: 'بدون رد' } },
          ].map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.sortOption,
                sortBy === option.key && { backgroundColor: COLORS.primary }
              ]}
              onPress={() => setSortBy(option.key as any)}
            >
              <Text style={[
                styles.sortOptionText,
                { color: sortBy === option.key ? COLORS.white : theme.textSecondary }
              ]}>
                {getText(option.label)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Threads List */}
      <FlatList
        data={filteredThreads}
        renderItem={renderThreadItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.threadsList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="chatbubbles-outline" size={64} color={theme.textSecondary} />
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              {isArabic ? 'لا توجد مناقشات' : 'No discussions found'}
            </Text>
            <Text style={[styles.emptyDescription, { color: theme.textSecondary }]}>
              {isArabic 
                ? 'ابدأ مناقشة جديدة أو جرب بحث مختلف'
                : 'Start a new discussion or try a different search'
              }
            </Text>
            <CustomButton
              title={isArabic ? 'بدء مناقشة جديدة' : 'Start New Discussion'}
              onPress={handleCreateThread}
              style={styles.emptyButton}
            />
          </View>
        }
      />

      {/* Create Thread Modal */}
      <Modal
        visible={showCreateThreadModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCreateThreadModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              {isArabic ? 'بدء مناقشة جديدة' : 'Start New Discussion'}
            </Text>
            <Text style={[styles.modalDescription, { color: theme.textSecondary }]}>
              {isArabic 
                ? 'اختر فئة واكتب عنوان ووصف للمناقشة'
                : 'Choose a category and write a title and description for the discussion'
              }
            </Text>
            <View style={styles.modalActions}>
              <CustomButton
                title={isArabic ? 'إلغاء' : 'Cancel'}
                onPress={() => setShowCreateThreadModal(false)}
                variant="outline"
                style={styles.modalButton}
              />
              <CustomButton
                title={isArabic ? 'إنشاء' : 'Create'}
                onPress={() => {
                  setShowCreateThreadModal(false);
                  Alert.alert(
                    isArabic ? 'تم الإنشاء' : 'Created',
                    isArabic ? 'تم إنشاء المناقشة بنجاح' : 'Discussion created successfully'
                  );
                }}
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Thread Detail Modal */}
      <Modal
        visible={showThreadModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowThreadModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.threadModalContent, { backgroundColor: theme.card }]}>
            <View style={styles.threadModalHeader}>
              <Text style={[styles.threadModalTitle, { color: theme.text }]}>
                {selectedThread ? getText(selectedThread.title) : ''}
              </Text>
              <TouchableOpacity onPress={() => setShowThreadModal(false)}>
                <Ionicons name="close" size={24} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.threadModalBody}>
              <Text style={[styles.threadModalContent, { color: theme.textSecondary }]}>
                {selectedThread ? getText(selectedThread.content) : ''}
              </Text>
              
              <View style={styles.replyInputContainer}>
                <TextInput
                  style={[styles.replyInput, { 
                    backgroundColor: theme.surface,
                    color: theme.text,
                    borderColor: theme.border 
                  }]}
                  value={newReply}
                  onChangeText={setNewReply}
                  placeholder={isArabic ? 'اكتب ردك هنا...' : 'Write your reply here...'}
                  placeholderTextColor={theme.textSecondary}
                  multiline
                />
                <CustomButton
                  title={isArabic ? 'إرسال' : 'Send'}
                  onPress={handleReplySubmit}
                  style={styles.replyButton}
                />
              </View>
            </ScrollView>
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
  createButton: {
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
  categoriesContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  categoriesContent: {
    flexDirection: 'row',
    padding: 20,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
  },
  categoryChipText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginLeft: 4,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sortLabel: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginRight: 12,
  },
  sortOptions: {
    flexDirection: 'row',
  },
  sortOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.sm,
    marginRight: 8,
  },
  sortOptionText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  threadsList: {
    padding: 20,
  },
  threadCard: {
    borderRadius: BORDER_RADIUS.md,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  threadHeader: {
    marginBottom: 8,
  },
  threadMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
    marginRight: 8,
  },
  categoryText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.white,
    marginLeft: 4,
  },
  threadTitle: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
    lineHeight: 22,
  },
  threadContent: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 20,
    marginBottom: 12,
  },
  threadFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  threadAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  authorInitial: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
  },
  authorName: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  authorRole: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  threadStats: {
    flexDirection: 'row',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  statText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: 4,
  },
  threadTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
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
  threadTime: {
    fontSize: TYPOGRAPHY.sizes.caption,
    textAlign: 'right',
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
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  modalButton: {
    paddingHorizontal: 24,
  },
  threadModalContent: {
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
    borderRadius: BORDER_RADIUS.md,
  },
  threadModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  threadModalTitle: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
    flex: 1,
    marginRight: 12,
  },
  threadModalBody: {
    padding: 20,
  },
  threadModalContent: {
    fontSize: TYPOGRAPHY.sizes.body1,
    lineHeight: 24,
    marginBottom: 20,
  },
  replyInputContainer: {
    marginTop: 20,
  },
  replyInput: {
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: TYPOGRAPHY.sizes.body1,
    marginBottom: 12,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  replyButton: {
    alignSelf: 'flex-end',
  },
});

export default ProjectDiscussionForumScreen;
