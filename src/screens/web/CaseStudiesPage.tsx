import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CaseStudiesPage: React.FC = () => {
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
    { id: 'all', name: 'All Projects', icon: 'grid' },
    { id: 'civil', name: 'Civil Engineering', icon: 'business' },
    { id: 'mep', name: 'MEP Engineering', icon: 'flash' },
    { id: 'surveying', name: 'Surveying', icon: 'location' },
    { id: 'bim', name: 'BIM Services', icon: 'cube' },
    { id: 'hse', name: 'HSE Consulting', icon: 'shield' },
    { id: 'gis', name: 'GIS Services', icon: 'map' },
  ];

  const filters = [
    { id: 'all', name: 'All Projects', icon: 'grid' },
    { id: 'featured', name: 'Featured', icon: 'star' },
    { id: 'recent', name: 'Recent', icon: 'time' },
    { id: 'large', name: 'Large Scale', icon: 'trending-up' },
    { id: 'sustainable', name: 'Sustainable', icon: 'leaf' },
  ];

  const caseStudies = [
    {
      id: '1',
      title: 'Riyadh Metro Line 3 - MEP Systems Design',
      category: 'mep',
      client: 'Riyadh Metro Company',
      location: 'Riyadh, Saudi Arabia',
      duration: '18 months',
      budget: 'SAR 2.5M',
      team: '12 engineers',
      status: 'completed',
      rating: 5,
      description: 'Comprehensive MEP design for Riyadh Metro Line 3, including HVAC, electrical, and plumbing systems for 15 stations.',
      challenges: [
        'Complex underground station requirements',
        'Integration with existing infrastructure',
        'Energy efficiency optimization',
        'Compliance with Saudi building codes',
      ],
      solutions: [
        'Advanced BIM modeling for clash detection',
        'Energy-efficient HVAC system design',
        'Integrated fire safety systems',
        'Sustainable design practices',
      ],
      results: [
        '30% energy savings compared to traditional systems',
        'Zero clashes in final design',
        'Completed 2 weeks ahead of schedule',
        'Exceeded client expectations',
      ],
      technologies: ['BIM', 'Revit', 'AutoCAD', 'EnergyPlus'],
      images: ['metro-station-1.jpg', 'metro-station-2.jpg', 'metro-station-3.jpg'],
      testimonial: {
        text: 'NBCON Pro delivered exceptional MEP design services for our metro project. The team\'s expertise and attention to detail were outstanding.',
        author: 'Ahmed Al-Rashid',
        role: 'Project Manager',
        company: 'Riyadh Metro Company',
      },
    },
    {
      id: '2',
      title: 'NEOM Smart City - Master Planning & Surveying',
      category: 'surveying',
      client: 'NEOM Company',
      location: 'Tabuk, Saudi Arabia',
      duration: '24 months',
      budget: 'SAR 5.8M',
      team: '25 engineers',
      status: 'completed',
      rating: 5,
      description: 'Comprehensive surveying and master planning for NEOM smart city, including topographic mapping, GIS analysis, and urban planning.',
      challenges: [
        'Massive scale of the project',
        'Remote desert location',
        'Integration of smart city technologies',
        'Environmental sustainability requirements',
      ],
      solutions: [
        'Advanced drone surveying technology',
        '3D laser scanning for accurate mapping',
        'GIS-based master planning',
        'Sustainable urban design principles',
      ],
      results: [
        '50% reduction in surveying time',
        '99.9% accuracy in mapping data',
        'Successful integration of smart technologies',
        'Award-winning sustainable design',
      ],
      technologies: ['GIS', 'Drone Surveying', '3D Laser Scanning', 'Urban Planning'],
      images: ['neom-city-1.jpg', 'neom-city-2.jpg', 'neom-city-3.jpg'],
      testimonial: {
        text: 'The surveying and master planning services provided by NBCON Pro were instrumental in the success of our NEOM project.',
        author: 'Sarah Al-Mansouri',
        role: 'Director of Planning',
        company: 'NEOM Company',
      },
    },
    {
      id: '3',
      title: 'King Abdullah Financial District - BIM Integration',
      category: 'bim',
      client: 'KAFD Development Company',
      location: 'Riyadh, Saudi Arabia',
      duration: '36 months',
      budget: 'SAR 8.2M',
      team: '35 engineers',
      status: 'completed',
      rating: 5,
      description: 'Complete BIM integration for King Abdullah Financial District, including 3D modeling, clash detection, and construction coordination.',
      challenges: [
        'Complex multi-building project',
        'Coordination between multiple contractors',
        'Tight construction schedule',
        'High-quality standards required',
      ],
      solutions: [
        'Unified BIM model for all buildings',
        'Real-time clash detection system',
        '4D construction scheduling',
        '5D cost estimation integration',
      ],
      results: [
        '40% reduction in construction time',
        '60% reduction in rework',
        '25% cost savings',
        'Zero major clashes during construction',
      ],
      technologies: ['BIM', 'Revit', 'Navisworks', '4D Scheduling'],
      images: ['kafd-1.jpg', 'kafd-2.jpg', 'kafd-3.jpg'],
      testimonial: {
        text: 'NBCON Pro\'s BIM services transformed our construction process. The level of coordination and efficiency achieved was remarkable.',
        author: 'Omar Al-Zahrani',
        role: 'Construction Manager',
        company: 'KAFD Development Company',
      },
    },
    {
      id: '4',
      title: 'Red Sea Project - Environmental Impact Assessment',
      category: 'hse',
      client: 'Red Sea Global',
      location: 'Red Sea, Saudi Arabia',
      duration: '12 months',
      budget: 'SAR 1.8M',
      team: '15 engineers',
      status: 'completed',
      rating: 5,
      description: 'Comprehensive environmental impact assessment for the Red Sea tourism project, including marine ecology studies and sustainability planning.',
      challenges: [
        'Sensitive marine environment',
        'Tourism development requirements',
        'Environmental protection standards',
        'Stakeholder coordination',
      ],
      solutions: [
        'Marine ecology baseline studies',
        'Environmental monitoring systems',
        'Sustainable development guidelines',
        'Stakeholder engagement programs',
      ],
      results: [
        'Zero negative environmental impact',
        'Successful environmental permits',
        'Award for environmental excellence',
        'Model for sustainable tourism development',
      ],
      technologies: ['Environmental Monitoring', 'GIS', 'Marine Ecology', 'Sustainability'],
      images: ['red-sea-1.jpg', 'red-sea-2.jpg', 'red-sea-3.jpg'],
      testimonial: {
        text: 'NBCON Pro\'s environmental expertise helped us achieve our sustainability goals while developing world-class tourism infrastructure.',
        author: 'Fatima Al-Shehri',
        role: 'Environmental Director',
        company: 'Red Sea Global',
      },
    },
    {
      id: '5',
      title: 'Qiddiya Entertainment City - Civil Infrastructure',
      category: 'civil',
      client: 'Qiddiya Investment Company',
      location: 'Riyadh, Saudi Arabia',
      duration: '30 months',
      budget: 'SAR 12.5M',
      team: '45 engineers',
      status: 'completed',
      rating: 5,
      description: 'Complete civil infrastructure design for Qiddiya entertainment city, including roads, utilities, and site development.',
      challenges: [
        'Complex terrain and topography',
        'Entertainment facility requirements',
        'Integration with existing infrastructure',
        'Safety and accessibility standards',
      ],
      solutions: [
        'Advanced terrain modeling',
        'Entertainment-specific infrastructure design',
        'Integrated utility systems',
        'Universal accessibility compliance',
      ],
      results: [
        '50% reduction in construction time',
        '30% cost savings',
        '100% accessibility compliance',
        'Award-winning infrastructure design',
      ],
      technologies: ['Civil 3D', 'AutoCAD', 'Infrastructure Design', 'Site Development'],
      images: ['qiddiya-1.jpg', 'qiddiya-2.jpg', 'qiddiya-3.jpg'],
      testimonial: {
        text: 'NBCON Pro delivered world-class civil infrastructure that perfectly supports our entertainment city vision.',
        author: 'Khalid Al-Mutairi',
        role: 'Infrastructure Director',
        company: 'Qiddiya Investment Company',
      },
    },
    {
      id: '6',
      title: 'AlUla Heritage Site - GIS Mapping & Documentation',
      category: 'gis',
      client: 'Royal Commission for AlUla',
      location: 'AlUla, Saudi Arabia',
      duration: '15 months',
      budget: 'SAR 3.2M',
      team: '20 engineers',
      status: 'completed',
      rating: 5,
      description: 'Comprehensive GIS mapping and documentation of AlUla heritage site, including archaeological surveys and digital preservation.',
      challenges: [
        'Sensitive archaeological sites',
        'High-resolution mapping requirements',
        'Cultural heritage preservation',
        'Tourism development needs',
      ],
      solutions: [
        'High-resolution drone mapping',
        '3D archaeological documentation',
        'Digital heritage preservation',
        'Tourism-friendly GIS applications',
      ],
      results: [
        'Complete digital heritage database',
        'Interactive tourism applications',
        'UNESCO recognition',
        'Model for heritage site management',
      ],
      technologies: ['GIS', 'Drone Mapping', '3D Documentation', 'Heritage Preservation'],
      images: ['alula-1.jpg', 'alula-2.jpg', 'alula-3.jpg'],
      testimonial: {
        text: 'NBCON Pro\'s GIS expertise helped us preserve and showcase our cultural heritage while supporting sustainable tourism.',
        author: 'Noura Al-Dosari',
        role: 'Heritage Director',
        company: 'Royal Commission for AlUla',
      },
    },
  ];

  const stats = {
    totalProjects: 150,
    completedProjects: 142,
    activeProjects: 8,
    totalValue: 'SAR 125M',
    avgRating: 4.9,
    clientSatisfaction: '98%',
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
    Alert.alert('Learn More', 'Redirecting to project details...');
  };

  const handleContactSales = () => {
    Alert.alert('Contact Sales', 'Redirecting to contact form...');
  };

  const CaseStudyCard = ({ study }: { study: any }) => (
    <TouchableOpacity style={styles.caseStudyCard}>
      <View style={styles.caseStudyHeader}>
        <View style={styles.caseStudyInfo}>
          <Text style={styles.caseStudyTitle}>{study.title}</Text>
          <Text style={styles.caseStudyClient}>{study.client}</Text>
          <Text style={styles.caseStudyLocation}>{study.location}</Text>
        </View>
        <View style={styles.caseStudyStatus}>
          <View style={[styles.statusBadge, study.status === 'completed' ? styles.statusCompleted : styles.statusActive]}>
            <Text style={styles.statusText}>{study.status}</Text>
          </View>
          <View style={styles.caseStudyRating}>
            {[...Array(study.rating)].map((_, i) => (
              <Ionicons key={i} name="star" size={16} color="#ffc107" />
            ))}
          </View>
        </View>
      </View>
      
      <Text style={styles.caseStudyDescription}>{study.description}</Text>
      
      <View style={styles.caseStudyStats}>
        <View style={styles.caseStudyStat}>
          <Text style={styles.caseStudyStatNumber}>{study.duration}</Text>
          <Text style={styles.caseStudyStatLabel}>Duration</Text>
        </View>
        <View style={styles.caseStudyStat}>
          <Text style={styles.caseStudyStatNumber}>{study.budget}</Text>
          <Text style={styles.caseStudyStatLabel}>Budget</Text>
        </View>
        <View style={styles.caseStudyStat}>
          <Text style={styles.caseStudyStatNumber}>{study.team}</Text>
          <Text style={styles.caseStudyStatLabel}>Team</Text>
        </View>
      </View>

      <View style={styles.caseStudyChallenges}>
        <Text style={styles.caseStudyChallengesTitle}>Key Challenges:</Text>
        {study.challenges.map((challenge: string, index: number) => (
          <Text key={index} style={styles.caseStudyChallenge}>• {challenge}</Text>
        ))}
      </View>

      <View style={styles.caseStudySolutions}>
        <Text style={styles.caseStudySolutionsTitle}>Our Solutions:</Text>
        {study.solutions.map((solution: string, index: number) => (
          <Text key={index} style={styles.caseStudySolution}>• {solution}</Text>
        ))}
      </View>

      <View style={styles.caseStudyResults}>
        <Text style={styles.caseStudyResultsTitle}>Results:</Text>
        {study.results.map((result: string, index: number) => (
          <Text key={index} style={styles.caseStudyResult}>• {result}</Text>
        ))}
      </View>

      <View style={styles.caseStudyTechnologies}>
        <Text style={styles.caseStudyTechnologiesTitle}>Technologies Used:</Text>
        <View style={styles.technologiesList}>
          {study.technologies.map((tech: string, index: number) => (
            <View key={index} style={styles.technologyTag}>
              <Text style={styles.technologyText}>{tech}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.caseStudyTestimonial}>
        <Text style={styles.testimonialText}>"{study.testimonial.text}"</Text>
        <Text style={styles.testimonialAuthor}>- {study.testimonial.author}, {study.testimonial.role}, {study.testimonial.company}</Text>
      </View>

      <View style={styles.caseStudyActions}>
        <TouchableOpacity style={styles.caseStudyButton}>
          <Text style={styles.caseStudyButtonText}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.caseStudyButtonSecondary}>
          <Text style={styles.caseStudyButtonSecondaryText}>Download PDF</Text>
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

  const filteredCaseStudies = caseStudies.filter(study => {
    if (selectedCategory !== 'all' && study.category !== selectedCategory) return false;
    if (selectedFilter === 'featured' && study.rating < 5) return false;
    if (selectedFilter === 'recent' && study.duration.includes('36')) return false;
    if (selectedFilter === 'large' && !study.budget.includes('12.5M') && !study.budget.includes('8.2M')) return false;
    if (selectedFilter === 'sustainable' && !study.title.includes('Environmental') && !study.title.includes('Sustainable')) return false;
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
          Project Case Studies
        </Text>
        <Text style={styles.heroSubtitle}>
          Real projects, real results, real success stories
        </Text>
        <View style={styles.heroActions}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleGetStarted}>
            <Text style={styles.primaryButtonText}>Start Your Project</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleLearnMore}>
            <Text style={styles.secondaryButtonText}>Learn More</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Our Project Portfolio</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.totalProjects}</Text>
            <Text style={styles.statLabel}>Total Projects</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.completedProjects}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.activeProjects}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.totalValue}</Text>
            <Text style={styles.statLabel}>Total Value</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.avgRating}</Text>
            <Text style={styles.statLabel}>Avg Rating</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.clientSatisfaction}</Text>
            <Text style={styles.statLabel}>Client Satisfaction</Text>
          </View>
        </View>
      </View>

      <View style={styles.searchSection}>
        <Text style={styles.sectionTitle}>Find Case Studies</Text>
        <View style={styles.searchInput}>
          <Ionicons name="search" size={20} color="#cccccc" />
          <Text style={styles.searchPlaceholder}>
            Search projects, clients, or technologies...
          </Text>
        </View>
      </View>

      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Filter by Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <CategoryButton key={category.id} category={category} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.filtersSection}>
        <Text style={styles.sectionTitle}>Filter by Type</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filtersContainer}>
            {filters.map((filter) => (
              <FilterButton key={filter.id} filter={filter} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.caseStudiesSection}>
        <Text style={styles.sectionTitle}>
          {selectedCategory === 'all' ? 'All Case Studies' : 
           selectedCategory === 'civil' ? 'Civil Engineering Projects' :
           selectedCategory === 'mep' ? 'MEP Engineering Projects' :
           selectedCategory === 'surveying' ? 'Surveying Projects' :
           selectedCategory === 'bim' ? 'BIM Services Projects' :
           selectedCategory === 'hse' ? 'HSE Consulting Projects' :
           'GIS Services Projects'} ({filteredCaseStudies.length})
        </Text>
        <View style={styles.caseStudiesGrid}>
          {filteredCaseStudies.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </View>
      </View>

      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Ready to Start Your Project?</Text>
        <Text style={styles.ctaSubtitle}>
          Join our portfolio of successful projects
        </Text>
        <View style={styles.ctaActions}>
          <TouchableOpacity style={styles.ctaButton} onPress={handleGetStarted}>
            <Text style={styles.ctaButtonText}>Start Your Project</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ctaSecondaryButton} onPress={handleContactSales}>
            <Text style={styles.ctaSecondaryButtonText}>Contact Sales</Text>
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
            <Text style={styles.footerTitle}>Case Studies</Text>
            <Text style={styles.footerLink}>Civil Engineering</Text>
            <Text style={styles.footerLink}>MEP Engineering</Text>
            <Text style={styles.footerLink}>Surveying</Text>
            <Text style={styles.footerLink}>BIM Services</Text>
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
  caseStudiesSection: {
    padding: 40,
  },
  caseStudiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  caseStudyCard: {
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
  caseStudyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  caseStudyInfo: {
    flex: 1,
  },
  caseStudyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  caseStudyClient: {
    fontSize: 14,
    color: '#007bff',
    marginBottom: 2,
  },
  caseStudyLocation: {
    fontSize: 12,
    color: '#666666',
  },
  caseStudyStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 5,
  },
  statusCompleted: {
    backgroundColor: '#28a745',
  },
  statusActive: {
    backgroundColor: '#ffc107',
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  caseStudyRating: {
    flexDirection: 'row',
  },
  caseStudyDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 15,
  },
  caseStudyStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  caseStudyStat: {
    alignItems: 'center',
  },
  caseStudyStatNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007bff',
  },
  caseStudyStatLabel: {
    fontSize: 10,
    color: '#666666',
  },
  caseStudyChallenges: {
    marginBottom: 15,
  },
  caseStudyChallengesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  caseStudyChallenge: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 2,
  },
  caseStudySolutions: {
    marginBottom: 15,
  },
  caseStudySolutionsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  caseStudySolution: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 2,
  },
  caseStudyResults: {
    marginBottom: 15,
  },
  caseStudyResultsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  caseStudyResult: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 2,
  },
  caseStudyTechnologies: {
    marginBottom: 15,
  },
  caseStudyTechnologiesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  technologiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  technologyTag: {
    backgroundColor: '#f8f9fa',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 5,
    marginBottom: 5,
  },
  technologyText: {
    fontSize: 10,
    color: '#666666',
  },
  caseStudyTestimonial: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  testimonialText: {
    fontSize: 14,
    color: '#333333',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  testimonialAuthor: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  caseStudyActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  caseStudyButton: {
    backgroundColor: '#007bff',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  caseStudyButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  caseStudyButtonSecondary: {
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  caseStudyButtonSecondaryText: {
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

export default CaseStudiesPage;
