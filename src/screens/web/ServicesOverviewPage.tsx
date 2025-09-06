import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ServicesOverviewPage: React.FC = () => {
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

  const serviceCategories = [
    {
      id: 'civil',
      name: 'Civil Engineering',
      icon: 'business',
      description: 'Infrastructure, roads, bridges, and construction projects',
      color: '#007bff',
      projects: 1250,
      engineers: 340,
      avgRating: 4.8,
      avgPrice: 'SAR 150/hour',
      features: [
        'Structural Design',
        'Road Construction',
        'Bridge Engineering',
        'Infrastructure Planning',
        'Site Development',
        'Water Systems',
      ],
      subcategories: [
        'Structural Engineering',
        'Transportation Engineering',
        'Geotechnical Engineering',
        'Water Resources',
        'Environmental Engineering',
        'Construction Management',
      ],
    },
    {
      id: 'mep',
      name: 'MEP Engineering',
      icon: 'flash',
      description: 'Mechanical, Electrical, and Plumbing systems',
      color: '#28a745',
      projects: 890,
      engineers: 280,
      avgRating: 4.7,
      avgPrice: 'SAR 120/hour',
      features: [
        'HVAC Design',
        'Electrical Systems',
        'Plumbing Design',
        'Fire Protection',
        'Energy Efficiency',
        'Building Automation',
      ],
      subcategories: [
        'Mechanical Engineering',
        'Electrical Engineering',
        'Plumbing Engineering',
        'Fire Safety',
        'Energy Management',
        'Building Services',
      ],
    },
    {
      id: 'surveying',
      name: 'Surveying',
      icon: 'location',
      description: 'Land surveying, mapping, and geospatial services',
      color: '#ffc107',
      projects: 650,
      engineers: 150,
      avgRating: 4.9,
      avgPrice: 'SAR 100/hour',
      features: [
        'Land Surveying',
        'Topographic Mapping',
        'GPS/GNSS',
        '3D Laser Scanning',
        'Cadastral Surveys',
        'Construction Layout',
      ],
      subcategories: [
        'Land Surveying',
        'Geodetic Surveying',
        'Construction Surveying',
        'Hydrographic Surveying',
        'Aerial Surveying',
        'GIS Mapping',
      ],
    },
    {
      id: 'bim',
      name: 'BIM Services',
      icon: 'cube',
      description: 'Building Information Modeling and 3D visualization',
      color: '#dc3545',
      projects: 420,
      engineers: 120,
      avgRating: 4.6,
      avgPrice: 'SAR 200/hour',
      features: [
        '3D Modeling',
        'Clash Detection',
        '4D Scheduling',
        '5D Cost Estimation',
        'Facility Management',
        'Virtual Reality',
      ],
      subcategories: [
        'BIM Modeling',
        'Clash Detection',
        '4D/5D BIM',
        'BIM Coordination',
        'Facility Management',
        'VR/AR Visualization',
      ],
    },
    {
      id: 'hse',
      name: 'HSE Consulting',
      icon: 'shield',
      description: 'Health, Safety, and Environment compliance',
      color: '#6f42c1',
      projects: 380,
      engineers: 95,
      avgRating: 4.8,
      avgPrice: 'SAR 180/hour',
      features: [
        'Safety Audits',
        'Risk Assessment',
        'Environmental Compliance',
        'Training Programs',
        'Incident Investigation',
        'Regulatory Compliance',
      ],
      subcategories: [
        'Safety Engineering',
        'Environmental Engineering',
        'Risk Management',
        'Compliance Auditing',
        'Training & Development',
        'Incident Investigation',
      ],
    },
    {
      id: 'gis',
      name: 'GIS Services',
      icon: 'map',
      description: 'Geographic Information Systems and mapping',
      color: '#17a2b8',
      projects: 290,
      engineers: 80,
      avgRating: 4.7,
      avgPrice: 'SAR 140/hour',
      features: [
        'Spatial Analysis',
        'Data Visualization',
        'Web Mapping',
        'Mobile GIS',
        'Remote Sensing',
        'Database Management',
      ],
      subcategories: [
        'Spatial Analysis',
        'Web Mapping',
        'Mobile GIS',
        'Remote Sensing',
        'Database Design',
        'Application Development',
      ],
    },
  ];

  const filters = [
    { id: 'all', name: 'All Services', icon: 'grid' },
    { id: 'popular', name: 'Most Popular', icon: 'trending-up' },
    { id: 'new', name: 'New Services', icon: 'sparkles' },
    { id: 'affordable', name: 'Most Affordable', icon: 'cash' },
    { id: 'premium', name: 'Premium Services', icon: 'diamond' },
  ];

  const testimonials = [
    {
      id: '1',
      name: 'Ahmed Al-Rashid',
      role: 'Project Manager',
      company: 'Al-Rashid Engineering',
      location: 'Riyadh, Saudi Arabia',
      rating: 5,
      text: 'The civil engineering services on NBCON Pro are exceptional. We found the perfect engineer for our bridge project.',
      service: 'Civil Engineering',
      avatar: '👨‍💼',
    },
    {
      id: '2',
      name: 'Sarah Al-Mansouri',
      role: 'MEP Engineer',
      company: 'GreenTech Solutions',
      location: 'Jeddah, Saudi Arabia',
      rating: 5,
      text: 'The MEP services helped us design an energy-efficient building that exceeded our expectations.',
      service: 'MEP Engineering',
      avatar: '👩‍💼',
    },
    {
      id: '3',
      name: 'Omar Al-Zahrani',
      role: 'Construction Manager',
      company: 'Vision 2030 Projects',
      location: 'Dammam, Saudi Arabia',
      rating: 5,
      text: 'The BIM services transformed our project delivery. The 3D models were incredibly detailed and accurate.',
      service: 'BIM Services',
      avatar: '👨‍💼',
    },
  ];

  const stats = {
    totalServices: 6,
    totalProjects: 15420,
    activeEngineers: 2850,
    satisfiedClients: 1200,
    avgProjectValue: 'SAR 25,000',
    completionRate: '98.5%',
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
    Alert.alert('Learn More', 'Redirecting to service details...');
  };

  const handleContactSales = () => {
    Alert.alert('Contact Sales', 'Redirecting to contact form...');
  };

  const ServiceCategoryCard = ({ category }: { category: any }) => (
    <TouchableOpacity style={styles.serviceCard}>
      <View style={styles.serviceHeader}>
        <View style={[styles.serviceIcon, { backgroundColor: category.color + '20' }]}>
          <Ionicons name={category.icon as any} size={32} color={category.color} />
        </View>
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>{category.name}</Text>
          <Text style={styles.serviceDescription}>{category.description}</Text>
        </View>
        <View style={styles.serviceRating}>
          <Ionicons name="star" size={16} color="#ffc107" />
          <Text style={styles.serviceRatingText}>{category.avgRating}</Text>
        </View>
      </View>
      
      <View style={styles.serviceStats}>
        <View style={styles.serviceStat}>
          <Text style={styles.serviceStatNumber}>{category.projects}</Text>
          <Text style={styles.serviceStatLabel}>Projects</Text>
        </View>
        <View style={styles.serviceStat}>
          <Text style={styles.serviceStatNumber}>{category.engineers}</Text>
          <Text style={styles.serviceStatLabel}>Engineers</Text>
        </View>
        <View style={styles.serviceStat}>
          <Text style={styles.serviceStatNumber}>{category.avgPrice}</Text>
          <Text style={styles.serviceStatLabel}>Avg Price</Text>
        </View>
      </View>

      <View style={styles.serviceFeatures}>
        <Text style={styles.serviceFeaturesTitle}>Key Features:</Text>
        <View style={styles.serviceFeaturesList}>
          {category.features.map((feature: string, index: number) => (
            <View key={index} style={styles.serviceFeature}>
              <Ionicons name="checkmark" size={14} color="#28a745" />
              <Text style={styles.serviceFeatureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.serviceSubcategories}>
        <Text style={styles.serviceSubcategoriesTitle}>Subcategories:</Text>
        <View style={styles.serviceSubcategoriesList}>
          {category.subcategories.map((subcategory: string, index: number) => (
            <View key={index} style={styles.serviceSubcategory}>
              <Text style={styles.serviceSubcategoryText}>{subcategory}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.serviceActions}>
        <TouchableOpacity style={styles.serviceButton}>
          <Text style={styles.serviceButtonText}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.serviceButtonSecondary}>
          <Text style={styles.serviceButtonSecondaryText}>Get Quote</Text>
        </TouchableOpacity>
      </View>
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
      <Ionicons 
        name={filter.icon as any} 
        size={16} 
        color={selectedFilter === filter.id ? '#ffffff' : '#007bff'} 
      />
      <Text style={[
        styles.filterText,
        selectedFilter === filter.id && styles.filterTextSelected
      ]}>
        {filter.name}
      </Text>
    </TouchableOpacity>
  );

  const TestimonialCard = ({ testimonial }: { testimonial: any }) => (
    <View style={styles.testimonialCard}>
      <View style={styles.testimonialHeader}>
        <Text style={styles.testimonialAvatar}>{testimonial.avatar}</Text>
        <View style={styles.testimonialInfo}>
          <Text style={styles.testimonialName}>{testimonial.name}</Text>
          <Text style={styles.testimonialRole}>{testimonial.role}</Text>
          <Text style={styles.testimonialCompany}>{testimonial.company}</Text>
          <Text style={styles.testimonialLocation}>{testimonial.location}</Text>
        </View>
        <View style={styles.testimonialRating}>
          {[...Array(testimonial.rating)].map((_, i) => (
            <Ionicons key={i} name="star" size={16} color="#ffc107" />
          ))}
        </View>
      </View>
      <Text style={styles.testimonialText}>"{testimonial.text}"</Text>
      <View style={styles.testimonialService}>
        <Text style={styles.testimonialServiceLabel}>Service:</Text>
        <Text style={styles.testimonialServiceValue}>{testimonial.service}</Text>
      </View>
    </View>
  );

  const filteredServices = serviceCategories.filter(service => {
    if (selectedCategory !== 'all' && service.id !== selectedCategory) return false;
    if (selectedFilter === 'popular' && service.projects < 500) return false;
    if (selectedFilter === 'new' && service.projects > 300) return false;
    if (selectedFilter === 'affordable' && service.avgPrice.includes('200')) return false;
    if (selectedFilter === 'premium' && !service.avgPrice.includes('200')) return false;
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
          Engineering Services
        </Text>
        <Text style={styles.heroSubtitle}>
          Comprehensive engineering solutions for every project
        </Text>
        <View style={styles.heroActions}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleGetStarted}>
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleLearnMore}>
            <Text style={styles.secondaryButtonText}>Learn More</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Service Statistics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.totalServices}</Text>
            <Text style={styles.statLabel}>Service Categories</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.totalProjects.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Projects Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.activeEngineers.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Active Engineers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.satisfiedClients.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Satisfied Clients</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.avgProjectValue}</Text>
            <Text style={styles.statLabel}>Avg Project Value</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.completionRate}</Text>
            <Text style={styles.statLabel}>Completion Rate</Text>
          </View>
        </View>
      </View>

      <View style={styles.searchSection}>
        <Text style={styles.sectionTitle}>Find Your Service</Text>
        <View style={styles.searchInput}>
          <Ionicons name="search" size={20} color="#cccccc" />
          <Text style={styles.searchPlaceholder}>
            Search services, engineers, or projects...
          </Text>
        </View>
      </View>

      <View style={styles.filtersSection}>
        <Text style={styles.sectionTitle}>Filter Services</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filtersContainer}>
            {filters.map((filter) => (
              <FilterButton key={filter.id} filter={filter} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.servicesSection}>
        <Text style={styles.sectionTitle}>
          {selectedFilter === 'all' ? 'All Services' : 
           selectedFilter === 'popular' ? 'Most Popular Services' :
           selectedFilter === 'new' ? 'New Services' :
           selectedFilter === 'affordable' ? 'Most Affordable Services' :
           'Premium Services'} ({filteredServices.length})
        </Text>
        <View style={styles.servicesGrid}>
          {filteredServices.map((service) => (
            <ServiceCategoryCard key={service.id} category={service} />
          ))}
        </View>
      </View>

      <View style={styles.testimonialsSection}>
        <Text style={styles.sectionTitle}>What Our Clients Say</Text>
        <Text style={styles.sectionSubtitle}>
          Real feedback from satisfied clients
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.testimonialsContainer}>
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Ready to Start Your Project?</Text>
        <Text style={styles.ctaSubtitle}>
          Connect with top engineers and get your project done right
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
            <Text style={styles.footerTitle}>Services</Text>
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
  sectionSubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
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
  filtersSection: {
    backgroundColor: '#f8f9fa',
    padding: 40,
  },
  filtersContainer: {
    flexDirection: 'row',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
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
  servicesSection: {
    padding: 40,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
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
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  serviceIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  serviceRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceRatingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginLeft: 5,
  },
  serviceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  serviceStat: {
    alignItems: 'center',
  },
  serviceStatNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  serviceStatLabel: {
    fontSize: 10,
    color: '#666666',
  },
  serviceFeatures: {
    marginBottom: 15,
  },
  serviceFeaturesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  serviceFeaturesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  serviceFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 5,
  },
  serviceFeatureText: {
    fontSize: 12,
    color: '#333333',
    marginLeft: 5,
  },
  serviceSubcategories: {
    marginBottom: 15,
  },
  serviceSubcategoriesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  serviceSubcategoriesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  serviceSubcategory: {
    backgroundColor: '#f8f9fa',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 5,
    marginBottom: 5,
  },
  serviceSubcategoryText: {
    fontSize: 10,
    color: '#666666',
  },
  serviceActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceButton: {
    backgroundColor: '#007bff',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  serviceButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  serviceButtonSecondary: {
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  serviceButtonSecondaryText: {
    color: '#007bff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  testimonialsSection: {
    backgroundColor: '#f8f9fa',
    padding: 40,
  },
  testimonialsContainer: {
    flexDirection: 'row',
  },
  testimonialCard: {
    width: 300,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  testimonialAvatar: {
    fontSize: 32,
    marginRight: 15,
  },
  testimonialInfo: {
    flex: 1,
  },
  testimonialName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 2,
  },
  testimonialRole: {
    fontSize: 14,
    color: '#007bff',
    marginBottom: 2,
  },
  testimonialCompany: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 2,
  },
  testimonialLocation: {
    fontSize: 12,
    color: '#999999',
  },
  testimonialRating: {
    flexDirection: 'row',
  },
  testimonialText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
    fontStyle: 'italic',
    marginBottom: 15,
  },
  testimonialService: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  testimonialServiceLabel: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  testimonialServiceValue: {
    fontSize: 12,
    color: '#007bff',
    fontWeight: 'bold',
    marginLeft: 5,
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

export default ServicesOverviewPage;
