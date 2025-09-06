import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

interface PressRelease {
  id: string;
  title: string;
  date: string;
  summary: string;
  category: string;
  downloadUrl: string;
}

interface MediaAsset {
  id: string;
  name: string;
  type: 'logo' | 'image' | 'video' | 'document';
  description: string;
  size: string;
  format: string;
  downloadUrl: string;
  thumbnail?: string;
}

interface PressContact {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  bio: string;
  photo: string;
}

const MediaPressPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Company News', 'Product Updates', 'Partnerships', 'Awards', 'Industry Insights'];

  const pressReleases: PressRelease[] = [
    {
      id: '1',
      title: 'NBCON Pro Launches Revolutionary Engineering Marketplace in Saudi Arabia',
      date: '2024-12-01',
      summary: 'NBCON Pro officially launches its AI-powered engineering marketplace, connecting clients with verified engineers across Saudi Arabia.',
      category: 'Company News',
      downloadUrl: '/press/nbcon-pro-launch.pdf',
    },
    {
      id: '2',
      title: 'NBCON Pro Partners with Saudi Council of Engineers for Enhanced Verification',
      date: '2024-11-15',
      summary: 'Strategic partnership enables real-time SCE license verification and enhanced engineer credentialing.',
      category: 'Partnerships',
      downloadUrl: '/press/sce-partnership.pdf',
    },
    {
      id: '3',
      title: 'NBCON Pro Wins "Best Innovation in Construction Technology" Award',
      date: '2024-11-01',
      summary: 'Recognition for groundbreaking AI-powered job matching and project management capabilities.',
      category: 'Awards',
      downloadUrl: '/press/innovation-award.pdf',
    },
    {
      id: '4',
      title: 'New Mobile App Features Enhance User Experience',
      date: '2024-10-20',
      summary: 'Latest app update includes AR visualization, real-time collaboration tools, and improved payment processing.',
      category: 'Product Updates',
      downloadUrl: '/press/mobile-update.pdf',
    },
    {
      id: '5',
      title: 'NBCON Pro Contributes to Vision 2030 Digital Transformation',
      date: '2024-10-05',
      summary: 'Platform aligns with Saudi Arabia\'s Vision 2030 goals for digital transformation in construction and engineering.',
      category: 'Industry Insights',
      downloadUrl: '/press/vision-2030.pdf',
    },
  ];

  const mediaAssets: MediaAsset[] = [
    {
      id: '1',
      name: 'NBCON Pro Logo - Primary',
      type: 'logo',
      description: 'Main NBCON Pro logo in blue and white',
      size: '2.1 MB',
      format: 'PNG',
      downloadUrl: '/assets/logos/nbcon-pro-primary.png',
      thumbnail: '/assets/thumbnails/logo-primary.png',
    },
    {
      id: '2',
      name: 'NBCON Pro Logo - White',
      type: 'logo',
      description: 'White version for dark backgrounds',
      size: '1.8 MB',
      format: 'PNG',
      downloadUrl: '/assets/logos/nbcon-pro-white.png',
      thumbnail: '/assets/thumbnails/logo-white.png',
    },
    {
      id: '3',
      name: 'App Screenshots - iOS',
      type: 'image',
      description: 'High-resolution iOS app screenshots',
      size: '15.2 MB',
      format: 'ZIP',
      downloadUrl: '/assets/screenshots/ios-screenshots.zip',
      thumbnail: '/assets/thumbnails/ios-screenshots.png',
    },
    {
      id: '4',
      name: 'App Screenshots - Android',
      type: 'image',
      description: 'High-resolution Android app screenshots',
      size: '14.8 MB',
      format: 'ZIP',
      downloadUrl: '/assets/screenshots/android-screenshots.zip',
      thumbnail: '/assets/thumbnails/android-screenshots.png',
    },
    {
      id: '5',
      name: 'Product Demo Video',
      type: 'video',
      description: '3-minute product demonstration video',
      size: '125.5 MB',
      format: 'MP4',
      downloadUrl: '/assets/videos/product-demo.mp4',
      thumbnail: '/assets/thumbnails/demo-video.png',
    },
    {
      id: '6',
      name: 'Company Fact Sheet',
      type: 'document',
      description: 'Comprehensive company information and statistics',
      size: '3.2 MB',
      format: 'PDF',
      downloadUrl: '/assets/documents/company-fact-sheet.pdf',
    },
    {
      id: '7',
      name: 'Brand Guidelines',
      type: 'document',
      description: 'Complete brand guidelines and usage instructions',
      size: '8.7 MB',
      format: 'PDF',
      downloadUrl: '/assets/documents/brand-guidelines.pdf',
    },
    {
      id: '8',
      name: 'Team Photos',
      type: 'image',
      description: 'High-resolution team and office photos',
      size: '22.3 MB',
      format: 'ZIP',
      downloadUrl: '/assets/images/team-photos.zip',
      thumbnail: '/assets/thumbnails/team-photos.png',
    },
  ];

  const pressContacts: PressContact[] = [
    {
      id: '1',
      name: 'Sarah Al-Rashid',
      title: 'Head of Communications',
      email: 'press@nbcon.pro',
      phone: '+966 11 123 4567',
      bio: 'Sarah leads all external communications and media relations for NBCON Pro. She has over 10 years of experience in tech communications.',
      photo: '/assets/photos/sarah-al-rashid.jpg',
    },
    {
      id: '2',
      name: 'Ahmed Al-Mansouri',
      title: 'CEO & Founder',
      email: 'ahmed@nbcon.pro',
      phone: '+966 11 123 4568',
      bio: 'Ahmed founded NBCON Pro with a vision to revolutionize engineering services in Saudi Arabia. He is available for interviews about the company\'s mission and future plans.',
      photo: '/assets/photos/ahmed-al-mansouri.jpg',
    },
    {
      id: '3',
      name: 'Fatima Al-Zahra',
      title: 'Head of Marketing',
      email: 'marketing@nbcon.pro',
      phone: '+966 11 123 4569',
      bio: 'Fatima oversees all marketing initiatives and can speak about user growth, platform features, and market expansion strategies.',
      photo: '/assets/photos/fatima-al-zahra.jpg',
    },
  ];

  const filteredPressReleases = pressReleases.filter(release => 
    selectedCategory === 'All' || release.category === selectedCategory
  );

  const renderPressRelease = ({ item }: { item: PressRelease }) => (
    <View style={styles.pressReleaseCard}>
      <View style={styles.pressReleaseHeader}>
        <Text style={styles.pressReleaseTitle}>{item.title}</Text>
        <View style={styles.pressReleaseMeta}>
          <Text style={styles.pressReleaseDate}>{item.date}</Text>
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) }]}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>
      </View>
      
      <Text style={styles.pressReleaseSummary}>{item.summary}</Text>
      
      <TouchableOpacity style={styles.downloadButton}>
        <Text style={styles.downloadButtonText}>Download PDF</Text>
      </TouchableOpacity>
    </View>
  );

  const renderMediaAsset = ({ item }: { item: MediaAsset }) => (
    <View style={styles.assetCard}>
      <View style={styles.assetHeader}>
        <Text style={styles.assetName}>{item.name}</Text>
        <View style={[styles.typeBadge, { backgroundColor: getTypeColor(item.type) }]}>
          <Text style={styles.typeText}>{item.type.toUpperCase()}</Text>
        </View>
      </View>
      
      <Text style={styles.assetDescription}>{item.description}</Text>
      
      <View style={styles.assetDetails}>
        <Text style={styles.assetSize}>{item.size}</Text>
        <Text style={styles.assetFormat}>{item.format}</Text>
      </View>
      
      <TouchableOpacity style={styles.downloadButton}>
        <Text style={styles.downloadButtonText}>Download</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPressContact = ({ item }: { item: PressContact }) => (
    <View style={styles.contactCard}>
      <View style={styles.contactHeader}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactTitle}>{item.title}</Text>
      </View>
      
      <Text style={styles.contactBio}>{item.bio}</Text>
      
      <View style={styles.contactInfo}>
        <Text style={styles.contactEmail}>{item.email}</Text>
        <Text style={styles.contactPhone}>{item.phone}</Text>
      </View>
    </View>
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Company News': return '#1e3a8a';
      case 'Product Updates': return '#059669';
      case 'Partnerships': return '#7c3aed';
      case 'Awards': return '#d97706';
      case 'Industry Insights': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'logo': return '#1e3a8a';
      case 'image': return '#059669';
      case 'video': return '#dc2626';
      case 'document': return '#7c3aed';
      default: return '#6b7280';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Media & Press</Text>
        <Text style={styles.headerSubtitle}>
          Resources for journalists, bloggers, and media professionals
        </Text>
      </View>

      {/* Press Releases Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Press Releases</Text>
        <Text style={styles.sectionSubtitle}>
          Latest news and announcements from NBCON Pro
        </Text>
        
        <View style={styles.categoryFilters}>
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
        
        <FlatList
          data={filteredPressReleases}
          renderItem={renderPressRelease}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>

      {/* Media Assets Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Media Assets</Text>
        <Text style={styles.sectionSubtitle}>
          Logos, images, videos, and documents for media use
        </Text>
        
        <FlatList
          data={mediaAssets}
          renderItem={renderMediaAsset}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>

      {/* Press Contacts Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Press Contacts</Text>
        <Text style={styles.sectionSubtitle}>
          Get in touch with our media team
        </Text>
        
        <FlatList
          data={pressContacts}
          renderItem={renderPressContact}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>

      {/* Media Kit Download */}
      <View style={styles.mediaKitSection}>
        <Text style={styles.mediaKitTitle}>Complete Media Kit</Text>
        <Text style={styles.mediaKitDescription}>
          Download our complete media kit containing all assets, press releases, 
          and company information in one convenient package.
        </Text>
        
        <TouchableOpacity style={styles.mediaKitButton}>
          <Text style={styles.mediaKitButtonText}>Download Complete Media Kit</Text>
        </TouchableOpacity>
      </View>

      {/* Contact Information */}
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Media Inquiries</Text>
        <Text style={styles.contactText}>
          For media inquiries, interview requests, or additional information, 
          please contact our press team.
        </Text>
        
        <View style={styles.contactInfo}>
          <Text style={styles.contactItem}>Email: press@nbcon.pro</Text>
          <Text style={styles.contactItem}>Phone: +966 11 123 4567</Text>
          <Text style={styles.contactItem}>Address: Riyadh, Saudi Arabia</Text>
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
  section: {
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
  categoryFilters: {
    marginBottom: 20,
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
  pressReleaseCard: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  pressReleaseHeader: {
    marginBottom: 10,
  },
  pressReleaseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  pressReleaseMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pressReleaseDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  pressReleaseSummary: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 15,
  },
  downloadButton: {
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  downloadButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  assetCard: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  assetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  assetName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
    marginRight: 10,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  typeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  assetDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 10,
  },
  assetDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  assetSize: {
    fontSize: 12,
    color: '#6b7280',
  },
  assetFormat: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  contactCard: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  contactHeader: {
    marginBottom: 10,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  contactTitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  contactBio: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 15,
  },
  contactInfo: {
    gap: 5,
  },
  contactEmail: {
    fontSize: 14,
    color: '#1e3a8a',
    fontWeight: '500',
  },
  contactPhone: {
    fontSize: 14,
    color: '#374151',
  },
  mediaKitSection: {
    backgroundColor: '#1e3a8a',
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  mediaKitTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  mediaKitDescription: {
    fontSize: 16,
    color: '#e0e7ff',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  mediaKitButton: {
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  mediaKitButtonText: {
    color: '#1e3a8a',
    fontSize: 16,
    fontWeight: '600',
  },
  contactSection: {
    backgroundColor: 'white',
    padding: 30,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  contactInfo: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  contactItem: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 8,
  },
});

export default MediaPressPage;
