import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BlogNewsPage: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedRegion, setSelectedRegion] = useState('sa');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const languages = [
    { id: 'en', name: 'English', flag: '🇺🇸' },
    { id: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const regions = [
    { id: 'sa', name: 'Saudi Arabia', flag: '🇸🇦' },
    { id: 'ae', name: 'UAE', flag: '🇦🇪' },
    { id: 'kw', name: 'Kuwait', flag: '🇰🇼' },
    { id: 'qa', name: 'Qatar', flag: '🇶🇦' },
  ];

  const navigationItems = [
    { id: 'home', name: 'Home', icon: 'home' },
    { id: 'services', name: 'Services', icon: 'construct' },
    { id: 'pricing', name: 'Pricing', icon: 'card' },
    { id: 'about', name: 'About', icon: 'information-circle' },
    { id: 'contact', name: 'Contact', icon: 'mail' },
  ];

  const categories = [
    { id: 'all', name: 'All Articles', icon: 'grid' },
    { id: 'industry', name: 'Industry News', icon: 'newspaper' },
    { id: 'technology', name: 'Technology', icon: 'laptop' },
    { id: 'sustainability', name: 'Sustainability', icon: 'leaf' },
    { id: 'projects', name: 'Projects', icon: 'folder' },
    { id: 'careers', name: 'Careers', icon: 'briefcase' },
    { id: 'events', name: 'Events', icon: 'calendar' },
  ];

  const filters = [
    { id: 'all', name: 'All Articles', icon: 'grid' },
    { id: 'featured', name: 'Featured', icon: 'star' },
    { id: 'recent', name: 'Recent', icon: 'time' },
    { id: 'popular', name: 'Popular', icon: 'trending-up' },
    { id: 'trending', name: 'Trending', icon: 'flame' },
  ];

  const articles = [
    {
      id: '1',
      title: 'The Future of Engineering in Saudi Arabia: Vision 2030 Impact',
      category: 'industry',
      author: 'Ahmed Al-Rashid',
      authorRole: 'CEO, NBCON Pro',
      publishDate: '2024-01-20',
      readTime: '8 min',
      views: 1250,
      likes: 89,
      comments: 23,
      isFeatured: true,
      isTrending: true,
      tags: ['Vision 2030', 'Engineering', 'Saudi Arabia', 'Future'],
      excerpt: 'Exploring how Vision 2030 is transforming the engineering landscape in Saudi Arabia and creating new opportunities for engineers and clients.',
      content: 'Saudi Arabia\'s Vision 2030 is revolutionizing the engineering sector...',
      image: 'vision2030-engineering.jpg',
    },
    {
      id: '2',
      title: 'BIM Integration: Transforming Construction Projects',
      category: 'technology',
      author: 'Sarah Al-Mansouri',
      authorRole: 'CTO, NBCON Pro',
      publishDate: '2024-01-18',
      readTime: '6 min',
      views: 890,
      likes: 67,
      comments: 15,
      isFeatured: true,
      isTrending: false,
      tags: ['BIM', 'Construction', 'Technology', 'Innovation'],
      excerpt: 'How Building Information Modeling is revolutionizing construction projects and improving collaboration between engineers and clients.',
      content: 'Building Information Modeling (BIM) has become a game-changer...',
      image: 'bim-integration.jpg',
    },
    {
      id: '3',
      title: 'Sustainable Engineering Practices for Green Buildings',
      category: 'sustainability',
      author: 'Omar Al-Zahrani',
      authorRole: 'Head of Engineering, NBCON Pro',
      publishDate: '2024-01-15',
      readTime: '10 min',
      views: 650,
      likes: 45,
      comments: 12,
      isFeatured: false,
      isTrending: true,
      tags: ['Sustainability', 'Green Buildings', 'Environment', 'Engineering'],
      excerpt: 'Implementing sustainable engineering practices to create environmentally friendly buildings and infrastructure.',
      content: 'Sustainable engineering is no longer a luxury but a necessity...',
      image: 'sustainable-engineering.jpg',
    },
    {
      id: '4',
      title: 'NEOM Project: Engineering Marvels of the Future',
      category: 'projects',
      author: 'Fatima Al-Shehri',
      authorRole: 'Project Director, NBCON Pro',
      publishDate: '2024-01-12',
      readTime: '12 min',
      views: 2100,
      likes: 128,
      comments: 34,
      isFeatured: true,
      isTrending: true,
      tags: ['NEOM', 'Projects', 'Innovation', 'Future'],
      excerpt: 'A deep dive into the engineering challenges and innovations behind the NEOM smart city project.',
      content: 'NEOM represents the future of urban development...',
      image: 'neom-project.jpg',
    },
    {
      id: '5',
      title: 'Career Opportunities in Engineering: Saudi Market Trends',
      category: 'careers',
      author: 'Khalid Al-Mutairi',
      authorRole: 'Head of Business Development, NBCON Pro',
      publishDate: '2024-01-10',
      readTime: '7 min',
      views: 780,
      likes: 56,
      comments: 18,
      isFeatured: false,
      isTrending: false,
      tags: ['Careers', 'Engineering', 'Saudi Arabia', 'Jobs'],
      excerpt: 'Exploring the growing demand for engineering professionals in Saudi Arabia and the skills needed to succeed.',
      content: 'The engineering job market in Saudi Arabia is booming...',
      image: 'engineering-careers.jpg',
    },
    {
      id: '6',
      title: 'AI and Machine Learning in Engineering: Current Applications',
      category: 'technology',
      author: 'Noura Al-Dosari',
      authorRole: 'Head of Marketing, NBCON Pro',
      publishDate: '2024-01-08',
      readTime: '9 min',
      views: 950,
      likes: 34,
      comments: 21,
      isFeatured: false,
      isTrending: true,
      tags: ['AI', 'Machine Learning', 'Engineering', 'Technology'],
      excerpt: 'How artificial intelligence and machine learning are being applied in modern engineering practices.',
      content: 'Artificial intelligence is transforming every aspect of engineering...',
      image: 'ai-engineering.jpg',
    },
    {
      id: '7',
      title: 'Engineering Safety Standards: Best Practices and Compliance',
      category: 'industry',
      author: 'Ahmed Al-Rashid',
      authorRole: 'CEO, NBCON Pro',
      publishDate: '2024-01-05',
      readTime: '11 min',
      views: 420,
      likes: 23,
      comments: 8,
      isFeatured: false,
      isTrending: false,
      tags: ['Safety', 'Standards', 'Compliance', 'Engineering'],
      excerpt: 'Understanding the latest safety standards and compliance requirements for engineering projects in Saudi Arabia.',
      content: 'Safety is paramount in all engineering projects...',
      image: 'safety-standards.jpg',
    },
    {
      id: '8',
      title: 'Upcoming Engineering Events and Conferences 2024',
      category: 'events',
      author: 'Sarah Al-Mansouri',
      authorRole: 'CTO, NBCON Pro',
      publishDate: '2024-01-03',
      readTime: '5 min',
      views: 320,
      likes: 19,
      comments: 5,
      isFeatured: false,
      isTrending: false,
      tags: ['Events', 'Conferences', 'Engineering', '2024'],
      excerpt: 'A comprehensive guide to engineering events and conferences happening in Saudi Arabia and the region in 2024.',
      content: '2024 promises to be an exciting year for engineering events...',
      image: 'engineering-events.jpg',
    },
  ];

  const stats = {
    totalArticles: 150,
    totalViews: 125000,
    totalLikes: 8500,
    totalComments: 2100,
    avgReadTime: '7 min',
    weeklyPublishing: 3,
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    Alert.alert('Search', `Searching for: ${query}`);
  };

  const handleGetStarted = () => {
    Alert.alert('Get Started', 'Redirecting to registration...');
  };

  const handleLearnMore = () => {
    Alert.alert('Learn More', 'Redirecting to article details...');
  };

  const handleContactSales = () => {
    Alert.alert('Contact Sales', 'Redirecting to contact form...');
  };

  const ArticleCard = ({ article }: { article: any }) => (
    <TouchableOpacity style={styles.articleCard}>
      <View style={styles.articleHeader}>
        <View style={styles.articleInfo}>
          <Text style={styles.articleTitle}>{article.title}</Text>
          <Text style={styles.articleAuthor}>By {article.author}, {article.authorRole}</Text>
          <Text style={styles.articleDate}>{article.publishDate} • {article.readTime}</Text>
        </View>
        <View style={styles.articleStatus}>
          {article.isFeatured && (
            <View style={styles.featuredBadge}>
              <Ionicons name="star" size={12} color="#ffc107" />
              <Text style={styles.featuredText}>Featured</Text>
            </View>
          )}
          {article.isTrending && (
            <View style={styles.trendingBadge}>
              <Ionicons name="flame" size={12} color="#ff6b35" />
              <Text style={styles.trendingText}>Trending</Text>
            </View>
          )}
        </View>
      </View>
      
      <Text style={styles.articleExcerpt}>{article.excerpt}</Text>
      
      <View style={styles.articleStats}>
        <View style={styles.articleStat}>
          <Ionicons name="eye" size={14} color="#cccccc" />
          <Text style={styles.articleStatText}>{article.views}</Text>
        </View>
        <View style={styles.articleStat}>
          <Ionicons name="heart" size={14} color="#cccccc" />
          <Text style={styles.articleStatText}>{article.likes}</Text>
        </View>
        <View style={styles.articleStat}>
          <Ionicons name="chatbubble" size={14} color="#cccccc" />
          <Text style={styles.articleStatText}>{article.comments}</Text>
        </View>
      </View>

      <View style={styles.articleTags}>
        {article.tags.map((tag: string, index: number) => (
          <View key={index} style={styles.articleTag}>
            <Text style={styles.articleTagText}>#{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.articleActions}>
        <TouchableOpacity style={styles.articleButton}>
          <Text style={styles.articleButtonText}>Read More</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.articleButtonSecondary}>
          <Text style={styles.articleButtonSecondaryText}>Share</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const CategoryButton = ({ category }: { category: any }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === category.id && styles.categoryButtonSelected
      ]}
      onPress={() => handleCategoryChange(category.id)}
    >
      <Ionicons name={category.icon as any} size={20} color={selectedCategory === category.id ? '#ffffff' : '#007bff'} />
      <Text style={[
        styles.categoryText,
        selectedCategory === category.id && styles.categoryTextSelected
      ]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  const FilterButton = ({ filter }: { filter: any }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        selectedFilter === filter.id && styles.filterButtonSelected
      ]}
      onPress={() => handleFilterChange(filter.id)}
    >
      <Ionicons name={filter.icon as any} size={16} color={selectedFilter === filter.id ? '#ffffff' : '#007bff'} />
      <Text style={[
        styles.filterText,
        selectedFilter === filter.id && styles.filterTextSelected
      ]}>
        {filter.name}
      </Text>
    </TouchableOpacity>
  );

  const filteredArticles = articles.filter(article => {
    if (selectedCategory !== 'all' && article.category !== selectedCategory) return false;
    if (selectedFilter === 'featured' && !article.isFeatured) return false;
    if (selectedFilter === 'recent' && article.publishDate < '2024-01-15') return false;
    if (selectedFilter === 'popular' && article.views < 800) return false;
    if (selectedFilter === 'trending' && !article.isTrending) return false;
    return true;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>NBCON</Text>
            <Text style={styles.logoSubtext}>PRO</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.languageButton}>
              <Text style={styles.languageText}>
                {languages.find(l => l.id === selectedLanguage)?.flag} {languages.find(l => l.id === selectedLanguage)?.name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.regionButton}>
              <Text style={styles.regionText}>
                {regions.find(r => r.id === selectedRegion)?.flag} {regions.find(r => r.id === selectedRegion)?.name}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.navigation}>
          {navigationItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.navItem,
                selectedCategory === item.id && styles.navItemSelected
              ]}
              onPress={() => setSelectedCategory(item.id)}
            >
              <Ionicons name={item.icon as any} size={20} color={selectedCategory === item.id ? '#007bff' : '#cccccc'} />
              <Text style={[
                styles.navText,
                selectedCategory === item.id && styles.navTextSelected
              ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>
          Engineering Blog & News
        </Text>
        <Text style={styles.heroSubtitle}>
          Stay updated with the latest industry insights, technology trends, and project updates
        </Text>
        <View style={styles.heroActions}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleGetStarted}>
            <Text style={styles.primaryButtonText}>Subscribe to Newsletter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleLearnMore}>
            <Text style={styles.secondaryButtonText}>Browse Articles</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Blog Statistics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.totalArticles}</Text>
            <Text style={styles.statLabel}>Total Articles</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.totalViews.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Views</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.totalLikes.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Likes</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.totalComments.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Comments</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.avgReadTime}</Text>
            <Text style={styles.statLabel}>Avg Read Time</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.weeklyPublishing}</Text>
            <Text style={styles.statLabel}>Weekly Publishing</Text>
          </View>
        </View>
      </View>

      <View style={styles.searchSection}>
        <Text style={styles.sectionTitle}>Search Articles</Text>
        <View style={styles.searchInput}>
          <Ionicons name="search" size={20} color="#cccccc" />
          <Text style={styles.searchPlaceholder}>
            Search articles, topics, or authors...
          </Text>
        </View>
      </View>

      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Browse by Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <CategoryButton key={category.id} category={category} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.filtersSection}>
        <Text style={styles.sectionTitle}>Filter Articles</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filtersContainer}>
            {filters.map((filter) => (
              <FilterButton key={filter.id} filter={filter} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.articlesSection}>
        <Text style={styles.sectionTitle}>
          {selectedCategory === 'all' ? 'All Articles' : 
           selectedCategory === 'industry' ? 'Industry News' :
           selectedCategory === 'technology' ? 'Technology Articles' :
           selectedCategory === 'sustainability' ? 'Sustainability Articles' :
           selectedCategory === 'projects' ? 'Project Articles' :
           selectedCategory === 'careers' ? 'Career Articles' :
           'Event Articles'} ({filteredArticles.length})
        </Text>
        <View style={styles.articlesGrid}>
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </View>
      </View>

      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Stay Updated with Our Newsletter</Text>
        <Text style={styles.ctaSubtitle}>
          Get the latest engineering insights delivered to your inbox
        </Text>
        <View style={styles.ctaActions}>
          <TouchableOpacity style={styles.ctaButton} onPress={handleGetStarted}>
            <Text style={styles.ctaButtonText}>Subscribe Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ctaSecondaryButton} onPress={handleContactSales}>
            <Text style={styles.ctaSecondaryButtonText}>Contact Us</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View style={styles.footerSection}>
            <Text style={styles.footerTitle}>NBCON Pro</Text>
            <Text style={styles.footerDescription}>
              Saudi Arabia's premier engineering marketplace connecting clients with top engineers.
            </Text>
          </View>
          <View style={styles.footerSection}>
            <Text style={styles.footerTitle}>Blog & News</Text>
            <Text style={styles.footerLink}>Industry News</Text>
            <Text style={styles.footerLink}>Technology</Text>
            <Text style={styles.footerLink}>Sustainability</Text>
            <Text style={styles.footerLink}>Projects</Text>
          </View>
          <View style={styles.footerSection}>
            <Text style={styles.footerTitle}>Company</Text>
            <Text style={styles.footerLink}>About Us</Text>
            <Text style={styles.footerLink}>Careers</Text>
            <Text style={styles.footerLink}>Contact</Text>
            <Text style={styles.footerLink}>Blog</Text>
          </View>
          <View style={styles.footerSection}>
            <Text style={styles.footerTitle}>Support</Text>
            <Text style={styles.footerLink}>Help Center</Text>
            <Text style={styles.footerLink}>Documentation</Text>
            <Text style={styles.footerLink}>API</Text>
            <Text style={styles.footerLink}>Status</Text>
          </View>
        </View>
        <View style={styles.footerBottom}>
          <Text style={styles.footerCopyright}>
            © 2024 NBCON Pro. All rights reserved.
          </Text>
          <View style={styles.footerLinks}>
            <Text style={styles.footerLink}>Privacy Policy</Text>
            <Text style={styles.footerLink}>Terms of Service</Text>
            <Text style={styles.footerLink}>Cookie Policy</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007bff',
  },
  logoSubtext: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
    marginLeft: 5,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
  },
  languageText: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: '500',
  },
  regionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  regionText: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: '500',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  navItemSelected: {
    backgroundColor: '#f8f9fa',
  },
  navText: {
    fontSize: 14,
    color: '#cccccc',
    marginLeft: 5,
  },
  navTextSelected: {
    color: '#007bff',
    fontWeight: '500',
  },
  heroSection: {
    backgroundColor: '#007bff',
    padding: 40,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 40,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#e3f2fd',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 26,
  },
  heroActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginRight: 15,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statsSection: {
    backgroundColor: '#f8f9fa',
    padding: 40,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    width: '30%',
    marginBottom: 20,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  searchSection: {
    padding: 40,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchPlaceholder: {
    color: '#cccccc',
    fontSize: 16,
    marginLeft: 10,
  },
  categoriesSection: {
    backgroundColor: '#f8f9fa',
    padding: 40,
  },
  categoriesContainer: {
    flexDirection: 'row',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryButtonSelected: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  categoryText: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 5,
  },
  categoryTextSelected: {
    color: '#ffffff',
  },
  filtersSection: {
    padding: 40,
  },
  filtersContainer: {
    flexDirection: 'row',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterButtonSelected: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  filterText: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 5,
  },
  filterTextSelected: {
    color: '#ffffff',
  },
  articlesSection: {
    padding: 40,
  },
  articlesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  articleCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  articleInfo: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
    lineHeight: 22,
  },
  articleAuthor: {
    fontSize: 12,
    color: '#007bff',
    marginBottom: 2,
  },
  articleDate: {
    fontSize: 11,
    color: '#666666',
  },
  articleStatus: {
    alignItems: 'flex-end',
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffc107',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginBottom: 5,
  },
  featuredText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 2,
  },
  trendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6b35',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  trendingText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 2,
  },
  articleExcerpt: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 15,
  },
  articleStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  articleStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  articleStatText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
  },
  articleTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  articleTag: {
    backgroundColor: '#f8f9fa',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 5,
    marginBottom: 5,
  },
  articleTagText: {
    fontSize: 10,
    color: '#666666',
  },
  articleActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  articleButton: {
    backgroundColor: '#007bff',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  articleButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  articleButtonSecondary: {
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  articleButtonSecondaryText: {
    color: '#007bff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  ctaSection: {
    backgroundColor: '#007bff',
    padding: 40,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: '#e3f2fd',
    textAlign: 'center',
    marginBottom: 30,
  },
  ctaActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ctaButton: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginRight: 15,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  ctaSecondaryButton: {
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  ctaSecondaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  footer: {
    backgroundColor: '#333333',
    padding: 40,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  footerSection: {
    flex: 1,
    marginRight: 20,
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  footerDescription: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
  },
  footerLink: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 8,
  },
  footerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#555555',
  },
  footerCopyright: {
    fontSize: 14,
    color: '#cccccc',
  },
  footerLinks: {
    flexDirection: 'row',
  },
});

export default BlogNewsPage;
