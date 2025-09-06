import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
  notHelpful: number;
}

interface HelpArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  content: string;
  tags: string[];
  lastUpdated: string;
}

const PublicHelpCenterPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const categories = ['All', 'Getting Started', 'Account', 'Payments', 'Jobs', 'Technical', 'Safety', 'Legal'];

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'How do I create an account on NBCON Pro?',
      answer: 'To create an account, download the NBCON Pro app from the App Store or Google Play Store, then tap "Sign Up" and follow the registration process. You\'ll need to verify your phone number and complete your profile with professional credentials.',
      category: 'Getting Started',
      helpful: 45,
      notHelpful: 2,
    },
    {
      id: '2',
      question: 'What types of engineering services are available?',
      answer: 'NBCON Pro offers a wide range of engineering services including Civil Engineering, MEP (Mechanical, Electrical, Plumbing), Surveying, BIM (Building Information Modeling), HSE (Health, Safety, Environment), and GIS (Geographic Information Systems).',
      category: 'Getting Started',
      helpful: 38,
      notHelpful: 1,
    },
    {
      id: '3',
      question: 'How does the payment system work?',
      answer: 'We use a secure escrow payment system. Clients pay upfront, and funds are held securely until project milestones are completed. Engineers receive payment after successful project delivery. We support mada, STC Pay, Apple Pay, and bank transfers.',
      category: 'Payments',
      helpful: 52,
      notHelpful: 3,
    },
    {
      id: '4',
      question: 'How do I verify my engineering credentials?',
      answer: 'Upload your SCE (Saudi Council of Engineers) license, degree certificates, and professional certifications. Our verification team will review your documents within 24-48 hours. You can track verification status in your profile.',
      category: 'Account',
      helpful: 41,
      notHelpful: 2,
    },
    {
      id: '5',
      question: 'What safety measures are in place for on-site work?',
      answer: 'All engineers must have valid HSE certifications and insurance. We conduct background checks and verify credentials. Clients can review engineer safety records and ratings before hiring. Emergency protocols are in place for all projects.',
      category: 'Safety',
      helpful: 29,
      notHelpful: 1,
    },
    {
      id: '6',
      question: 'Can I cancel a job after it\'s been accepted?',
      answer: 'Yes, you can cancel a job, but cancellation policies vary by project stage. Early cancellations may incur minimal fees, while cancellations after work has begun may require negotiation with the engineer. Check the specific terms for your project.',
      category: 'Jobs',
      helpful: 33,
      notHelpful: 4,
    },
    {
      id: '7',
      question: 'How do I contact customer support?',
      answer: 'You can contact our support team through the in-app chat, email at support@nbcon.pro, or call our hotline at +966 11 123 4567. We also have a live chat feature available 24/7 for urgent issues.',
      category: 'Technical',
      helpful: 47,
      notHelpful: 2,
    },
    {
      id: '8',
      question: 'What are the platform fees?',
      answer: 'NBCON Pro charges a small service fee (typically 5-8%) on successful project completions. This fee covers platform maintenance, payment processing, customer support, and insurance. No fees are charged for unsuccessful projects.',
      category: 'Payments',
      helpful: 36,
      notHelpful: 3,
    },
  ];

  const helpArticles: HelpArticle[] = [
    {
      id: '1',
      title: 'Complete Guide to Getting Started',
      category: 'Getting Started',
      readTime: '5 min read',
      content: 'Everything you need to know to start using NBCON Pro effectively...',
      tags: ['beginner', 'setup', 'tutorial'],
      lastUpdated: '2 days ago',
    },
    {
      id: '2',
      title: 'Understanding Payment Methods in Saudi Arabia',
      category: 'Payments',
      readTime: '3 min read',
      content: 'Learn about supported payment methods including mada, STC Pay, and bank transfers...',
      tags: ['payments', 'saudi', 'methods'],
      lastUpdated: '1 week ago',
    },
    {
      id: '3',
      title: 'Safety Guidelines for Engineering Projects',
      category: 'Safety',
      readTime: '7 min read',
      content: 'Comprehensive safety protocols and guidelines for all engineering work...',
      tags: ['safety', 'guidelines', 'compliance'],
      lastUpdated: '3 days ago',
    },
    {
      id: '4',
      title: 'How to Create Professional Job Posts',
      category: 'Jobs',
      readTime: '4 min read',
      content: 'Tips and best practices for writing effective job descriptions...',
      tags: ['jobs', 'posting', 'tips'],
      lastUpdated: '5 days ago',
    },
    {
      id: '5',
      title: 'Account Security and Privacy Settings',
      category: 'Account',
      readTime: '3 min read',
      content: 'Protect your account with these security recommendations...',
      tags: ['security', 'privacy', 'account'],
      lastUpdated: '1 week ago',
    },
  ];

  const filteredFAQs = faqItems.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredArticles = helpArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const renderFAQItem = ({ item }: { item: FAQItem }) => (
    <View style={styles.faqItem}>
      <TouchableOpacity
        style={styles.faqQuestion}
        onPress={() => toggleFAQ(item.id)}
      >
        <Text style={styles.faqQuestionText}>{item.question}</Text>
        <Text style={styles.expandIcon}>
          {expandedFAQ === item.id ? '−' : '+'}
        </Text>
      </TouchableOpacity>
      
      {expandedFAQ === item.id && (
        <View style={styles.faqAnswer}>
          <Text style={styles.faqAnswerText}>{item.answer}</Text>
          <View style={styles.faqFeedback}>
            <Text style={styles.feedbackText}>Was this helpful?</Text>
            <View style={styles.feedbackButtons}>
              <TouchableOpacity style={styles.feedbackButton}>
                <Text style={styles.feedbackButtonText}>👍 Yes ({item.helpful})</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.feedbackButton}>
                <Text style={styles.feedbackButtonText}>👎 No ({item.notHelpful})</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );

  const renderArticleItem = ({ item }: { item: HelpArticle }) => (
    <TouchableOpacity style={styles.articleCard}>
      <View style={styles.articleHeader}>
        <Text style={styles.articleTitle}>{item.title}</Text>
        <Text style={styles.articleReadTime}>{item.readTime}</Text>
      </View>
      <Text style={styles.articleContent} numberOfLines={2}>
        {item.content}
      </Text>
      <View style={styles.articleFooter}>
        <View style={styles.articleTags}>
          {item.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.articleUpdated}>Updated {item.lastUpdated}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Help Center</Text>
        <Text style={styles.headerSubtitle}>
          Find answers to your questions and learn how to use NBCON Pro
        </Text>
      </View>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for help articles, FAQs, or topics..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#666"
          />
        </View>
        
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.filterChip,
                  selectedCategory === category && styles.activeFilterChip
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.filterChipText,
                  selectedCategory === category && styles.activeFilterChipText
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Quick Help Section */}
      <View style={styles.quickHelpSection}>
        <Text style={styles.sectionTitle}>Quick Help</Text>
        <View style={styles.quickHelpGrid}>
          <TouchableOpacity style={styles.quickHelpCard}>
            <Text style={styles.quickHelpIcon}>📱</Text>
            <Text style={styles.quickHelpTitle}>Getting Started</Text>
            <Text style={styles.quickHelpDescription}>Learn the basics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickHelpCard}>
            <Text style={styles.quickHelpIcon}>💳</Text>
            <Text style={styles.quickHelpTitle}>Payments</Text>
            <Text style={styles.quickHelpDescription}>Payment help</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickHelpCard}>
            <Text style={styles.quickHelpIcon}>🔧</Text>
            <Text style={styles.quickHelpTitle}>Technical Issues</Text>
            <Text style={styles.quickHelpDescription}>Fix problems</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickHelpCard}>
            <Text style={styles.quickHelpIcon}>🛡️</Text>
            <Text style={styles.quickHelpTitle}>Safety & Security</Text>
            <Text style={styles.quickHelpDescription}>Stay safe</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* FAQ Section */}
      <View style={styles.faqSection}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        <Text style={styles.sectionSubtitle}>
          Find quick answers to the most common questions
        </Text>
        
        <FlatList
          data={filteredFAQs}
          renderItem={renderFAQItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>

      {/* Help Articles Section */}
      <View style={styles.articlesSection}>
        <Text style={styles.sectionTitle}>Help Articles</Text>
        <Text style={styles.sectionSubtitle}>
          Detailed guides and tutorials
        </Text>
        
        <FlatList
          data={filteredArticles}
          renderItem={renderArticleItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>

      {/* Contact Support Section */}
      <View style={styles.contactSection}>
        <Text style={styles.sectionTitle}>Still Need Help?</Text>
        <Text style={styles.contactDescription}>
          Can't find what you're looking for? Our support team is here to help you 24/7.
        </Text>
        
        <View style={styles.contactOptions}>
          <TouchableOpacity style={styles.contactOption}>
            <Text style={styles.contactIcon}>💬</Text>
            <Text style={styles.contactTitle}>Live Chat</Text>
            <Text style={styles.contactSubtitle}>Available 24/7</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.contactOption}>
            <Text style={styles.contactIcon}>📧</Text>
            <Text style={styles.contactTitle}>Email Support</Text>
            <Text style={styles.contactSubtitle}>support@nbcon.pro</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.contactOption}>
            <Text style={styles.contactIcon}>📞</Text>
            <Text style={styles.contactTitle}>Phone Support</Text>
            <Text style={styles.contactSubtitle}>+966 11 123 4567</Text>
          </TouchableOpacity>
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
  searchSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filtersContainer: {
    marginBottom: 10,
  },
  filterChip: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  activeFilterChip: {
    backgroundColor: '#1e3a8a',
    borderColor: '#1e3a8a',
  },
  filterChipText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterChipText: {
    color: 'white',
  },
  quickHelpSection: {
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
  },
  quickHelpGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickHelpCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  quickHelpIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  quickHelpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 5,
  },
  quickHelpDescription: {
    fontSize: 14,
    color: '#64748b',
  },
  faqSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginBottom: 10,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  faqQuestionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
    marginRight: 10,
  },
  expandIcon: {
    fontSize: 20,
    color: '#6b7280',
    fontWeight: 'bold',
  },
  faqAnswer: {
    paddingBottom: 15,
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 15,
  },
  faqFeedback: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  feedbackText: {
    fontSize: 14,
    color: '#6b7280',
  },
  feedbackButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  feedbackButton: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  feedbackButtonText: {
    fontSize: 12,
    color: '#374151',
  },
  articlesSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  articleCard: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
    marginRight: 10,
  },
  articleReadTime: {
    fontSize: 12,
    color: '#6b7280',
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  articleContent: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 15,
  },
  articleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  articleTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#1e3a8a',
  },
  articleUpdated: {
    fontSize: 12,
    color: '#9ca3af',
  },
  contactSection: {
    backgroundColor: '#1e3a8a',
    padding: 30,
    alignItems: 'center',
  },
  contactDescription: {
    fontSize: 16,
    color: '#e0e7ff',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  contactOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  contactOption: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactIcon: {
    fontSize: 24,
    marginBottom: 10,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 5,
  },
  contactSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export default PublicHelpCenterPage;
