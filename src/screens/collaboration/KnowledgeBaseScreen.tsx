import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const KnowledgeBaseScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list');

  const categories = [
    { id: 'all', name: 'All Articles', icon: 'library', color: '#6c757d' },
    { id: 'getting-started', name: 'Getting Started', icon: 'play-circle', color: '#007bff' },
    { id: 'project-management', name: 'Project Management', icon: 'folder', color: '#28a745' },
    { id: 'technical-guides', name: 'Technical Guides', icon: 'construct', color: '#ffc107' },
    { id: 'billing-payments', name: 'Billing & Payments', icon: 'card', color: '#dc3545' },
    { id: 'safety-compliance', name: 'Safety & Compliance', icon: 'shield', color: '#6f42c1' },
    { id: 'troubleshooting', name: 'Troubleshooting', icon: 'bug', color: '#17a2b8' },
    { id: 'faq', name: 'FAQ', icon: 'help-circle', color: '#fd7e14' },
  ];

  const viewModes = [
    { id: 'list', name: 'List', icon: 'list' },
    { id: 'grid', name: 'Grid', icon: 'grid' },
    { id: 'bookmark', name: 'Bookmarks', icon: 'bookmark' },
  ];

  const articles = [
    {
      id: '1',
      title: 'Getting Started with NBCON Pro',
      category: 'getting-started',
      author: 'NBCON Team',
      lastUpdated: '2024-01-20',
      readTime: '5 min',
      views: 1250,
      likes: 89,
      isBookmarked: true,
      isFeatured: true,
      tags: ['beginner', 'setup', 'tutorial'],
      content: 'Learn how to set up your NBCON Pro account and start your first project...',
      sections: [
        'Account Setup',
        'Profile Configuration',
        'First Project Creation',
        'Team Collaboration',
      ],
    },
    {
      id: '2',
      title: 'Project Management Best Practices',
      category: 'project-management',
      author: 'Ahmed Al-Rashid',
      lastUpdated: '2024-01-18',
      readTime: '8 min',
      views: 890,
      likes: 67,
      isBookmarked: false,
      isFeatured: true,
      tags: ['project', 'management', 'workflow'],
      content: 'Essential tips for managing engineering projects effectively on NBCON Pro...',
      sections: [
        'Project Planning',
        'Team Coordination',
        'Timeline Management',
        'Quality Control',
      ],
    },
    {
      id: '3',
      title: 'BIM Integration Guide',
      category: 'technical-guides',
      author: 'Sarah Al-Mansouri',
      lastUpdated: '2024-01-15',
      readTime: '12 min',
      views: 650,
      likes: 45,
      isBookmarked: true,
      isFeatured: false,
      tags: ['bim', 'integration', 'technical'],
      content: 'Complete guide to integrating BIM workflows with NBCON Pro platform...',
      sections: [
        'BIM Setup',
        'File Import/Export',
        'Collaboration Tools',
        'Version Control',
      ],
    },
    {
      id: '4',
      title: 'Payment Methods and Billing',
      category: 'billing-payments',
      author: 'NBCON Support',
      lastUpdated: '2024-01-12',
      readTime: '6 min',
      views: 420,
      likes: 23,
      isBookmarked: false,
      isFeatured: false,
      tags: ['billing', 'payments', 'finance'],
      content: 'Understanding payment methods, billing cycles, and financial management...',
      sections: [
        'Payment Setup',
        'Billing Cycles',
        'Invoice Management',
        'Tax Compliance',
      ],
    },
    {
      id: '5',
      title: 'Safety Protocols and Compliance',
      category: 'safety-compliance',
      author: 'Omar Al-Zahrani',
      lastUpdated: '2024-01-10',
      readTime: '10 min',
      views: 780,
      likes: 56,
      isBookmarked: true,
      isFeatured: false,
      tags: ['safety', 'compliance', 'regulations'],
      content: 'Essential safety protocols and regulatory compliance for engineering projects...',
      sections: [
        'Safety Standards',
        'Regulatory Requirements',
        'Documentation',
        'Audit Preparation',
      ],
    },
    {
      id: '6',
      title: 'Troubleshooting Common Issues',
      category: 'troubleshooting',
      author: 'NBCON Support',
      lastUpdated: '2024-01-08',
      readTime: '7 min',
      views: 950,
      likes: 34,
      isBookmarked: false,
      isFeatured: false,
      tags: ['troubleshooting', 'support', 'issues'],
      content: 'Solutions to common technical issues and platform problems...',
      sections: [
        'Login Issues',
        'File Upload Problems',
        'Performance Issues',
        'Contact Support',
      ],
    },
    {
      id: '7',
      title: 'Frequently Asked Questions',
      category: 'faq',
      author: 'NBCON Team',
      lastUpdated: '2024-01-05',
      readTime: '15 min',
      views: 2100,
      likes: 128,
      isBookmarked: true,
      isFeatured: true,
      tags: ['faq', 'questions', 'help'],
      content: 'Comprehensive answers to the most frequently asked questions...',
      sections: [
        'Account Questions',
        'Project Questions',
        'Technical Questions',
        'Billing Questions',
      ],
    },
  ];

  const CategoryButton = ({ category }: { category: any }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === category.id && styles.categoryButtonSelected
      ]}
      onPress={() => setSelectedCategory(category.id)}
    >
      <Ionicons 
        name={category.icon as any} 
        size={20} 
        color={selectedCategory === category.id ? '#ffffff' : category.color} 
      />
      <Text style={[
        styles.categoryText,
        selectedCategory === category.id && styles.categoryTextSelected
      ]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  const ViewModeButton = ({ mode }: { mode: any }) => (
    <TouchableOpacity
      style={[
        styles.viewModeButton,
        viewMode === mode.id && styles.viewModeButtonSelected
      ]}
      onPress={() => setViewMode(mode.id)}
    >
      <Ionicons 
        name={mode.icon as any} 
        size={20} 
        color={viewMode === mode.id ? '#ffffff' : '#007bff'} 
      />
      <Text style={[
        styles.viewModeText,
        viewMode === mode.id && styles.viewModeTextSelected
      ]}>
        {mode.name}
      </Text>
    </TouchableOpacity>
  );

  const ArticleCard = ({ article }: { article: any }) => (
    <TouchableOpacity
      style={[
        styles.articleCard,
        selectedArticle === article.id && styles.articleCardSelected
      ]}
      onPress={() => setSelectedArticle(article.id)}
    >
      <View style={styles.articleHeader}>
        <View style={styles.articleInfo}>
          <Text style={styles.articleTitle}>{article.title}</Text>
          <Text style={styles.articleAuthor}>By {article.author}</Text>
        </View>
        <View style={styles.articleStatus}>
          {article.isFeatured && (
            <View style={styles.featuredBadge}>
              <Ionicons name="star" size={12} color="#ffc107" />
              <Text style={styles.featuredText}>Featured</Text>
            </View>
          )}
          {article.isBookmarked && (
            <View style={styles.bookmarkBadge}>
              <Ionicons name="bookmark" size={12} color="#007bff" />
            </View>
          )}
        </View>
      </View>
      
      <Text style={styles.articleContent}>{article.content}</Text>
      
      <View style={styles.articleMeta}>
        <View style={styles.metaItem}>
          <Ionicons name="time" size={14} color="#cccccc" />
          <Text style={styles.metaText}>{article.readTime}</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="eye" size={14} color="#cccccc" />
          <Text style={styles.metaText}>{article.views}</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="heart" size={14} color="#cccccc" />
          <Text style={styles.metaText}>{article.likes}</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="calendar" size={14} color="#cccccc" />
          <Text style={styles.metaText}>{article.lastUpdated}</Text>
        </View>
      </View>

      <View style={styles.articleTags}>
        {article.tags.map((tag: string, index: number) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>#{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.articleSections}>
        <Text style={styles.sectionsTitle}>Sections:</Text>
        {article.sections.map((section: string, index: number) => (
          <Text key={index} style={styles.sectionItem}>• {section}</Text>
        ))}
      </View>

      <View style={styles.articleActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="bookmark" size={16} color="#007bff" />
          <Text style={styles.actionButtonText}>Bookmark</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share" size={16} color="#28a745" />
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="download" size={16} color="#ffc107" />
          <Text style={styles.actionButtonText}>Download</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const filteredArticles = articles.filter(article => {
    if (selectedCategory !== 'all' && article.category !== selectedCategory) return false;
    if (searchQuery && !article.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !article.content.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (viewMode === 'bookmark' && !article.isBookmarked) return false;
    return true;
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleBookmark = (articleId: string) => {
    Alert.alert('Success', 'Article bookmarked successfully');
  };

  const handleShare = (articleId: string) => {
    Alert.alert('Success', 'Article shared successfully');
  };

  const stats = {
    total: articles.length,
    bookmarked: articles.filter(a => a.isBookmarked).length,
    featured: articles.filter(a => a.isFeatured).length,
    totalViews: articles.reduce((sum, a) => sum + a.views, 0),
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Knowledge Base</Text>
      <Text style={styles.subtitle}>
        Wiki-like shared docs
      </Text>

      <View style={styles.statsCard}>
        <Text style={styles.cardTitle}>Knowledge Base Statistics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total Articles</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#007bff' }]}>{stats.bookmarked}</Text>
            <Text style={styles.statLabel}>Bookmarked</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#ffc107' }]}>{stats.featured}</Text>
            <Text style={styles.statLabel}>Featured</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#28a745' }]}>{stats.totalViews}</Text>
            <Text style={styles.statLabel}>Total Views</Text>
          </View>
        </View>
      </View>

      <View style={styles.searchCard}>
        <Text style={styles.cardTitle}>Search Articles</Text>
        <View style={styles.searchInput}>
          <Ionicons name="search" size={20} color="#cccccc" />
          <Text style={styles.searchPlaceholder}>
            Search articles, guides, and FAQs...
          </Text>
        </View>
      </View>

      <View style={styles.categoriesCard}>
        <Text style={styles.cardTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <CategoryButton key={category.id} category={category} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.viewModesCard}>
        <Text style={styles.cardTitle}>View Mode</Text>
        <View style={styles.viewModesContainer}>
          {viewModes.map((mode) => (
            <ViewModeButton key={mode.id} mode={mode} />
          ))}
        </View>
      </View>

      <View style={styles.articlesCard}>
        <Text style={styles.cardTitle}>
          Articles ({filteredArticles.length})
        </Text>
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </View>

      {selectedArticle && (
        <View style={styles.articleDetailsCard}>
          <Text style={styles.cardTitle}>Article Details</Text>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Title:</Text>
            <Text style={styles.detailValue}>
              {articles.find(a => a.id === selectedArticle)?.title}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Author:</Text>
            <Text style={styles.detailValue}>
              {articles.find(a => a.id === selectedArticle)?.author}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Category:</Text>
            <Text style={styles.detailValue}>
              {categories.find(c => c.id === articles.find(a => a.id === selectedArticle)?.category)?.name}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Last Updated:</Text>
            <Text style={styles.detailValue}>
              {articles.find(a => a.id === selectedArticle)?.lastUpdated}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Read Time:</Text>
            <Text style={styles.detailValue}>
              {articles.find(a => a.id === selectedArticle)?.readTime}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Views:</Text>
            <Text style={styles.detailValue}>
              {articles.find(a => a.id === selectedArticle)?.views}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Likes:</Text>
            <Text style={styles.detailValue}>
              {articles.find(a => a.id === selectedArticle)?.likes}
            </Text>
          </View>
          
          <View style={styles.articleActions}>
            <TouchableOpacity style={styles.readArticleButton}>
              <Ionicons name="book" size={20} color="#ffffff" />
              <Text style={styles.readArticleButtonText}>Read Article</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bookmarkArticleButton}>
              <Ionicons name="bookmark" size={20} color="#007bff" />
              <Text style={styles.bookmarkArticleButtonText}>Bookmark</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add" size={24} color="#007bff" />
            <Text style={styles.actionText}>New Article</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="bookmark" size={24} color="#ffc107" />
            <Text style={styles.actionText}>My Bookmarks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download" size={24} color="#28a745" />
            <Text style={styles.actionText}>Export</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Access comprehensive documentation, guides, and FAQs. Search, bookmark, 
          and share knowledge articles to improve team collaboration and efficiency.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 24,
  },
  statsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#cccccc',
  },
  searchCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
  },
  searchPlaceholder: {
    color: '#cccccc',
    fontSize: 16,
    marginLeft: 10,
  },
  categoriesCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  categoriesContainer: {
    flexDirection: 'row',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
  },
  categoryButtonSelected: {
    backgroundColor: '#007bff',
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  categoryTextSelected: {
    color: '#ffffff',
  },
  viewModesCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  viewModesContainer: {
    flexDirection: 'row',
  },
  viewModeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
  },
  viewModeButtonSelected: {
    backgroundColor: '#007bff',
  },
  viewModeText: {
    color: '#007bff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  viewModeTextSelected: {
    color: '#ffffff',
  },
  articlesCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  articleCard: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  articleCardSelected: {
    borderColor: '#007bff',
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  articleInfo: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  articleAuthor: {
    fontSize: 14,
    color: '#28a745',
  },
  articleStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffc107',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 5,
  },
  featuredText: {
    color: '#000000',
    fontSize: 8,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  bookmarkBadge: {
    backgroundColor: '#007bff',
    borderRadius: 12,
    padding: 4,
  },
  articleContent: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 10,
    lineHeight: 20,
  },
  articleMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 5,
  },
  metaText: {
    fontSize: 12,
    color: '#cccccc',
    marginLeft: 4,
  },
  articleTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tag: {
    backgroundColor: '#4a4a4a',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 5,
    marginBottom: 5,
  },
  tagText: {
    color: '#007bff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  articleSections: {
    marginBottom: 10,
  },
  sectionsTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  sectionItem: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 2,
  },
  articleActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4a4a4a',
    borderRadius: 6,
    padding: 8,
    flex: 1,
    marginHorizontal: 2,
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  articleDetailsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: '#cccccc',
    fontWeight: 'bold',
    width: '30%',
  },
  detailValue: {
    fontSize: 14,
    color: '#ffffff',
    flex: 1,
    textAlign: 'right',
  },
  articleActions: {
    flexDirection: 'row',
    marginTop: 15,
  },
  readArticleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
  },
  readArticleButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  bookmarkArticleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffc107',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    justifyContent: 'center',
  },
  bookmarkArticleButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  quickActionsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  infoText: {
    color: '#cccccc',
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 10,
    flex: 1,
  },
});

export default KnowledgeBaseScreen;
