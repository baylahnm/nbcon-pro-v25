import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
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

interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: { en: string; ar: string };
    role: UserRole;
    avatar?: string;
    verified: boolean;
  };
  category: string;
  tags: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
  isLiked: boolean;
  isBookmarked: boolean;
  attachments?: {
    id: string;
    type: 'image' | 'video' | 'document';
    url: string;
    thumbnail?: string;
  }[];
  location?: {
    city: string;
    country: string;
  };
}

interface CommunityForumsScreenProps {
  route?: {
    params: {
      category?: string;
    };
  };
}

const CommunityForumsScreen: React.FC<CommunityForumsScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { language, isDarkMode, user } = useSelector((state: RootState) => state.app);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(route?.params?.category || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'trending'>('recent');
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'general',
    tags: [] as string[],
  });

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockPosts: CommunityPost[] = [
      {
        id: 'post_1',
        title: 'New BIM Software Integration Tips',
        content: 'I recently integrated Revit with our project management system and wanted to share some tips that helped streamline our workflow...',
        author: {
          id: 'eng_1',
          name: { en: 'Sara Al-Mansouri', ar: 'سارة المنصوري' },
          role: UserRole.ENGINEER,
          verified: true,
        },
        category: 'technology',
        tags: ['BIM', 'Revit', 'Integration', 'Workflow'],
        likesCount: 24,
        commentsCount: 8,
        sharesCount: 3,
        viewsCount: 156,
        createdAt: '2024-02-15T10:30:00Z',
        updatedAt: '2024-02-15T10:30:00Z',
        isLiked: false,
        isBookmarked: false,
        location: {
          city: 'Riyadh',
          country: 'Saudi Arabia',
        },
      },
      {
        id: 'post_2',
        title: 'MEP Design Best Practices for High-Rise Buildings',
        content: 'After working on several high-rise projects in Riyadh, I\'ve compiled some best practices for MEP design that I think would be helpful...',
        author: {
          id: 'eng_2',
          name: { en: 'Mohammed Al-Shehri', ar: 'محمد الشهري' },
          role: UserRole.ENGINEER,
          verified: true,
        },
        category: 'design',
        tags: ['MEP', 'High-Rise', 'Best Practices', 'Riyadh'],
        likesCount: 18,
        commentsCount: 12,
        sharesCount: 5,
        viewsCount: 203,
        createdAt: '2024-02-14T16:45:00Z',
        updatedAt: '2024-02-14T16:45:00Z',
        isLiked: true,
        isBookmarked: true,
        attachments: [
          {
            id: 'att_1',
            type: 'image',
            url: '#',
            thumbnail: '#',
          },
        ],
        location: {
          city: 'Jeddah',
          country: 'Saudi Arabia',
        },
      },
      {
        id: 'post_3',
        title: 'Looking for Civil Engineering Collaboration',
        content: 'I\'m working on a large infrastructure project in Dammam and looking for experienced civil engineers to collaborate with...',
        author: {
          id: 'eng_3',
          name: { en: 'Ahmed Al-Rashid', ar: 'أحمد الراشد' },
          role: UserRole.ENGINEER,
          verified: false,
        },
        category: 'collaboration',
        tags: ['Civil Engineering', 'Infrastructure', 'Dammam', 'Collaboration'],
        likesCount: 7,
        commentsCount: 15,
        sharesCount: 2,
        viewsCount: 89,
        createdAt: '2024-02-13T14:20:00Z',
        updatedAt: '2024-02-13T14:20:00Z',
        isLiked: false,
        isBookmarked: false,
        location: {
          city: 'Dammam',
          country: 'Saudi Arabia',
        },
      },
    ];
    setPosts(mockPosts);
  }, []);

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

  const categories = [
    { key: 'all', label: { en: 'All', ar: 'الكل' }, icon: 'grid-outline' },
    { key: 'technology', label: { en: 'Technology', ar: 'التكنولوجيا' }, icon: 'hardware-chip-outline' },
    { key: 'design', label: { en: 'Design', ar: 'التصميم' }, icon: 'create-outline' },
    { key: 'collaboration', label: { en: 'Collaboration', ar: 'التعاون' }, icon: 'people-outline' },
    { key: 'projects', label: { en: 'Projects', ar: 'المشاريع' }, icon: 'folder-outline' },
    { key: 'career', label: { en: 'Career', ar: 'المهنة' }, icon: 'briefcase-outline' },
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'popular':
        return b.likesCount - a.likesCount;
      case 'trending':
        return (b.likesCount + b.commentsCount + b.sharesCount) - (a.likesCount + a.commentsCount + a.sharesCount);
      default:
        return 0;
    }
  });

  const handleLike = (postId: string) => {
    setPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isLiked: !post.isLiked,
              likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1
            }
          : post
      )
    );
  };

  const handleBookmark = (postId: string) => {
    setPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { ...post, isBookmarked: !post.isBookmarked }
          : post
      )
    );
  };

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      Alert.alert(
        isArabic ? 'خطأ' : 'Error',
        isArabic ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields'
      );
      return;
    }

    const post: CommunityPost = {
      id: `post_${Date.now()}`,
      title: newPost.title,
      content: newPost.content,
      author: {
        id: user?.id || 'current_user',
        name: user?.name || { en: 'You', ar: 'أنت' },
        role: user?.role || UserRole.ENGINEER,
        verified: false,
      },
      category: newPost.category,
      tags: newPost.tags,
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      viewsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isLiked: false,
      isBookmarked: false,
    };

    setPosts(prev => [post, ...prev]);
    setNewPost({ title: '', content: '', category: 'general', tags: [] });
    setShowCreatePostModal(false);
    
    Alert.alert(
      isArabic ? 'تم النشر' : 'Published',
      isArabic ? 'تم نشر منشورك بنجاح' : 'Your post has been published successfully'
    );
  };

  const renderPost = ({ item }: { item: CommunityPost }) => (
    <View style={[styles.postCard, { backgroundColor: theme.card }]}>
      <View style={styles.postHeader}>
        <View style={styles.authorInfo}>
          <View style={[styles.authorAvatar, { backgroundColor: COLORS.primary }]}>
            <Text style={styles.authorInitial}>
              {getText(item.author.name).charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.authorDetails}>
            <View style={styles.authorNameRow}>
              <Text style={[styles.authorName, { color: theme.text }]}>
                {getText(item.author.name)}
              </Text>
              {item.author.verified && (
                <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
              )}
            </View>
            <Text style={[styles.authorRole, { color: theme.textSecondary }]}>
              {item.author.role === UserRole.ENGINEER 
                ? (isArabic ? 'مهندس' : 'Engineer')
                : (isArabic ? 'عميل' : 'Client')
              }
            </Text>
            <Text style={[styles.postTime, { color: theme.textSecondary }]}>
              {formatDate(item.createdAt)}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color={theme.textSecondary} />
        </TouchableOpacity>
      </View>

      <Text style={[styles.postTitle, { color: theme.text }]}>
        {item.title}
      </Text>
      
      <Text style={[styles.postContent, { color: theme.textSecondary }]} numberOfLines={3}>
        {item.content}
      </Text>

      {item.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {item.tags.map((tag, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: theme.surface }]}>
              <Text style={[styles.tagText, { color: theme.textSecondary }]}>
                #{tag}
              </Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.postActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleLike(item.id)}
        >
          <Ionicons 
            name={item.isLiked ? 'heart' : 'heart-outline'} 
            size={20} 
            color={item.isLiked ? COLORS.error : theme.textSecondary} 
          />
          <Text style={[styles.actionText, { color: theme.textSecondary }]}>
            {item.likesCount}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={20} color={theme.textSecondary} />
          <Text style={[styles.actionText, { color: theme.textSecondary }]}>
            {item.commentsCount}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={20} color={theme.textSecondary} />
          <Text style={[styles.actionText, { color: theme.textSecondary }]}>
            {item.sharesCount}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleBookmark(item.id)}
        >
          <Ionicons 
            name={item.isBookmarked ? 'bookmark' : 'bookmark-outline'} 
            size={20} 
            color={item.isBookmarked ? COLORS.warning : theme.textSecondary} 
          />
        </TouchableOpacity>
      </View>
    </View>
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
              {isArabic ? 'مجتمع المهندسين' : 'Engineer Community'}
            </Text>
            <Text style={styles.headerSubtitle}>
              {isArabic ? 'شارك المعرفة والتجارب' : 'Share Knowledge & Experiences'}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.createButton}
            onPress={() => setShowCreatePostModal(true)}
          >
            <Ionicons name="add" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Search */}
      <View style={[styles.searchContainer, { backgroundColor: theme.surface }]}>
        <View style={[styles.searchBar, { backgroundColor: theme.background }]}>
          <Ionicons name="search" size={20} color={theme.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={isArabic ? 'البحث في المنشورات...' : 'Search posts...'}
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
          {categories.map((category) => (
            <TouchableOpacity
              key={category.key}
              style={[
                styles.categoryChip,
                selectedCategory === category.key && { backgroundColor: COLORS.primary }
              ]}
              onPress={() => setSelectedCategory(category.key)}
            >
              <Ionicons 
                name={category.icon as any} 
                size={16} 
                color={selectedCategory === category.key ? COLORS.white : theme.textSecondary} 
              />
              <Text style={[
                styles.categoryChipText,
                { color: selectedCategory === category.key ? COLORS.white : theme.textSecondary }
              ]}>
                {getText(category.label)}
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
            { key: 'trending', label: { en: 'Trending', ar: 'الرائج' } },
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

      {/* Posts List */}
      <FlatList
        data={filteredPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.postsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={64} color={theme.textSecondary} />
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              {isArabic ? 'لا توجد منشورات' : 'No posts found'}
            </Text>
            <Text style={[styles.emptyDescription, { color: theme.textSecondary }]}>
              {isArabic 
                ? 'كن أول من يشارك في المجتمع'
                : 'Be the first to share in the community'
              }
            </Text>
            <CustomButton
              title={isArabic ? 'إنشاء منشور' : 'Create Post'}
              onPress={() => setShowCreatePostModal(true)}
              style={styles.emptyButton}
            />
          </View>
        }
      />

      {/* Create Post Modal */}
      <Modal
        visible={showCreatePostModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCreatePostModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>
                {isArabic ? 'إنشاء منشور جديد' : 'Create New Post'}
              </Text>
              <TouchableOpacity onPress={() => setShowCreatePostModal(false)}>
                <Ionicons name="close" size={24} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalBody}>
              <TextInput
                style={[styles.input, { 
                  backgroundColor: theme.surface,
                  color: theme.text,
                  borderColor: theme.border 
                }]}
                value={newPost.title}
                onChangeText={(text) => setNewPost(prev => ({ ...prev, title: text }))}
                placeholder={isArabic ? 'عنوان المنشور' : 'Post title'}
                placeholderTextColor={theme.textSecondary}
              />
              
              <TextInput
                style={[styles.textArea, { 
                  backgroundColor: theme.surface,
                  color: theme.text,
                  borderColor: theme.border 
                }]}
                value={newPost.content}
                onChangeText={(text) => setNewPost(prev => ({ ...prev, content: text }))}
                placeholder={isArabic ? 'محتوى المنشور...' : 'Post content...'}
                placeholderTextColor={theme.textSecondary}
                multiline
                numberOfLines={6}
              />
            </ScrollView>

            <View style={styles.modalActions}>
              <CustomButton
                title={isArabic ? 'إلغاء' : 'Cancel'}
                onPress={() => setShowCreatePostModal(false)}
                variant="outline"
                style={styles.modalButton}
              />
              <CustomButton
                title={isArabic ? 'نشر' : 'Publish'}
                onPress={handleCreatePost}
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
  postsList: {
    padding: 20,
  },
  postCard: {
    borderRadius: BORDER_RADIUS.md,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  authorInitial: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
  },
  authorDetails: {
    flex: 1,
  },
  authorNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  authorName: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginRight: 4,
  },
  authorRole: {
    fontSize: TYPOGRAPHY.sizes.caption,
    marginBottom: 2,
  },
  postTime: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  moreButton: {
    padding: 4,
  },
  postTitle: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: 8,
  },
  postContent: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
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
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  actionText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: 4,
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
    maxWidth: 500,
    maxHeight: '80%',
    borderRadius: BORDER_RADIUS.md,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  modalBody: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: TYPOGRAPHY.sizes.body1,
    marginBottom: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: TYPOGRAPHY.sizes.body1,
    textAlignVertical: 'top',
    minHeight: 120,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    padding: 20,
  },
  modalButton: {
    paddingHorizontal: 24,
  },
});

export default CommunityForumsScreen;
