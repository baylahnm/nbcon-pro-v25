import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PublicLandingPage: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedRegion, setSelectedRegion] = useState('sa');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('home');

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
      projects: 1250,
      engineers: 340,
    },
    {
      id: 'mep',
      name: 'MEP Engineering',
      icon: 'flash',
      description: 'Mechanical, Electrical, and Plumbing systems',
      projects: 890,
      engineers: 280,
    },
    {
      id: 'surveying',
      name: 'Surveying',
      icon: 'location',
      description: 'Land surveying, mapping, and geospatial services',
      projects: 650,
      engineers: 150,
    },
    {
      id: 'bim',
      name: 'BIM Services',
      icon: 'cube',
      description: 'Building Information Modeling and 3D visualization',
      projects: 420,
      engineers: 120,
    },
    {
      id: 'hse',
      name: 'HSE Consulting',
      icon: 'shield',
      description: 'Health, Safety, and Environment compliance',
      projects: 380,
      engineers: 95,
    },
    {
      id: 'gis',
      name: 'GIS Services',
      icon: 'map',
      description: 'Geographic Information Systems and mapping',
      projects: 290,
      engineers: 80,
    },
  ];

  const pricingPlans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 'Free',
      period: 'forever',
      description: 'Perfect for individual engineers',
      features: [
        'Up to 5 active projects',
        'Basic project management',
        'Standard support',
        'Mobile app access',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 'SAR 99',
      period: 'per month',
      description: 'Best for growing engineering firms',
      features: [
        'Unlimited projects',
        'Advanced analytics',
        'Priority support',
        'Team collaboration',
        'API access',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For large organizations',
      features: [
        'Everything in Pro',
        'Custom integrations',
        'Dedicated support',
        'White-label options',
        'Advanced security',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  const testimonials = [
    {
      id: '1',
      name: 'Ahmed Al-Rashid',
      role: 'Civil Engineer',
      company: 'Al-Rashid Engineering',
      location: 'Riyadh, Saudi Arabia',
      rating: 5,
      text: 'NBCON Pro has revolutionized how we manage projects. The platform is intuitive and the support is excellent.',
      avatar: '👨‍💼',
    },
    {
      id: '2',
      name: 'Sarah Al-Mansouri',
      role: 'MEP Engineer',
      company: 'GreenTech Solutions',
      location: 'Jeddah, Saudi Arabia',
      rating: 5,
      text: 'The AI matching system helps us find the right engineers quickly. Highly recommended!',
      avatar: '👩‍💼',
    },
    {
      id: '3',
      name: 'Omar Al-Zahrani',
      role: 'Project Manager',
      company: 'Vision 2030 Projects',
      location: 'Dammam, Saudi Arabia',
      rating: 5,
      text: 'Outstanding platform for large-scale projects. The collaboration features are top-notch.',
      avatar: '👨‍💼',
    },
  ];

  const stats = {
    totalProjects: 15420,
    activeEngineers: 2850,
    satisfiedClients: 1200,
    countries: 4,
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    Alert.alert('Search', `Searching for: ${query}`);
  };

  const handleGetStarted = () => {
    Alert.alert('Get Started', 'Redirecting to registration...');
  };

  const handleLearnMore = () => {
    Alert.alert('Learn More', 'Redirecting to about page...');
  };

  const handleContactSales = () => {
    Alert.alert('Contact Sales', 'Redirecting to contact form...');
  };

  const ServiceCategoryCard = ({ category }: { category: any }) => (
    <TouchableOpacity style={styles.serviceCard}>
      <View style={styles.serviceIcon}>
        <Ionicons name={category.icon as any} size={32} color="#007bff" />
      </View>
      <Text style={styles.serviceName}>{category.name}</Text>
      <Text style={styles.serviceDescription}>{category.description}</Text>
      <View style={styles.serviceStats}>
        <View style={styles.serviceStat}>
          <Text style={styles.serviceStatNumber}>{category.projects}</Text>
          <Text style={styles.serviceStatLabel}>Projects</Text>
        </View>
        <View style={styles.serviceStat}>
          <Text style={styles.serviceStatNumber}>{category.engineers}</Text>
          <Text style={styles.serviceStatLabel}>Engineers</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const PricingCard = ({ plan }: { plan: any }) => (
    <TouchableOpacity style={[
      styles.pricingCard,
      plan.popular && styles.pricingCardPopular
    ]}>
      {plan.popular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>Most Popular</Text>
        </View>
      )}
      <Text style={styles.pricingName}>{plan.name}</Text>
      <Text style={styles.pricingPrice}>{plan.price}</Text>
      <Text style={styles.pricingPeriod}>{plan.period}</Text>
      <Text style={styles.pricingDescription}>{plan.description}</Text>
      <View style={styles.pricingFeatures}>
        {plan.features.map((feature: string, index: number) => (
          <View key={index} style={styles.pricingFeature}>
            <Ionicons name="checkmark" size={16} color="#28a745" />
            <Text style={styles.pricingFeatureText}>{feature}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={[
        styles.pricingButton,
        plan.popular && styles.pricingButtonPopular
      ]}>
        <Text style={[
          styles.pricingButtonText,
          plan.popular && styles.pricingButtonTextPopular
        ]}>
          {plan.cta}
        </Text>
      </TouchableOpacity>
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
    </View>
  );

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
                selectedTab === item.id && styles.navItemSelected
              ]}
              onPress={() => setSelectedTab(item.id)}
            >
              <Ionicons name={item.icon as any} size={20} color={selectedTab === item.id ? '#007bff' : '#cccccc'} />
              <Text style={[
                styles.navText,
                selectedTab === item.id && styles.navTextSelected
              ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>
          Saudi Arabia's Premier Engineering Marketplace
        </Text>
        <Text style={styles.heroSubtitle}>
          Connect with top engineers, manage projects, and grow your business with NBCON Pro
        </Text>
        <View style={styles.heroActions}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleGetStarted}>
            <Text style={styles.primaryButtonText}>Get Started Free</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleLearnMore}>
            <Text style={styles.secondaryButtonText}>Learn More</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Trusted by Engineers Across Saudi Arabia</Text>
        <View style={styles.statsGrid}>
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
            <Text style={styles.statNumber}>{stats.countries}</Text>
            <Text style={styles.statLabel}>Countries</Text>
          </View>
        </View>
      </View>

      <View style={styles.servicesSection}>
        <Text style={styles.sectionTitle}>Engineering Services</Text>
        <Text style={styles.sectionSubtitle}>
          Find engineers for every type of project
        </Text>
        <View style={styles.servicesGrid}>
          {serviceCategories.map((category) => (
            <ServiceCategoryCard key={category.id} category={category} />
          ))}
        </View>
      </View>

      <View style={styles.pricingSection}>
        <Text style={styles.sectionTitle}>Simple, Transparent Pricing</Text>
        <Text style={styles.sectionSubtitle}>
          Choose the plan that fits your needs
        </Text>
        <View style={styles.pricingGrid}>
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </View>
      </View>

      <View style={styles.testimonialsSection}>
        <Text style={styles.sectionTitle}>What Our Users Say</Text>
        <Text style={styles.sectionSubtitle}>
          Real feedback from engineers and clients
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
        <Text style={styles.ctaTitle}>Ready to Get Started?</Text>
        <Text style={styles.ctaSubtitle}>
          Join thousands of engineers already using NBCON Pro
        </Text>
        <View style={styles.ctaActions}>
          <TouchableOpacity style={styles.ctaButton} onPress={handleGetStarted}>
            <Text style={styles.ctaButtonText}>Start Free Trial</Text>
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
    marginBottom: 10,
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
    width: '48%',
    marginBottom: 20,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
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
  serviceIcon: {
    alignItems: 'center',
    marginBottom: 15,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 20,
  },
  serviceStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  serviceStat: {
    alignItems: 'center',
  },
  serviceStatNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
  },
  serviceStatLabel: {
    fontSize: 12,
    color: '#666666',
  },
  pricingSection: {
    backgroundColor: '#f8f9fa',
    padding: 40,
  },
  pricingGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pricingCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pricingCardPopular: {
    borderColor: '#007bff',
    borderWidth: 2,
  },
  popularBadge: {
    backgroundColor: '#007bff',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'center',
    marginBottom: 15,
  },
  popularText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  pricingName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 10,
  },
  pricingPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'center',
    marginBottom: 5,
  },
  pricingPeriod: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 15,
  },
  pricingDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },
  pricingFeatures: {
    marginBottom: 20,
  },
  pricingFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  pricingFeatureText: {
    fontSize: 14,
    color: '#333333',
    marginLeft: 8,
  },
  pricingButton: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  pricingButtonPopular: {
    backgroundColor: '#007bff',
  },
  pricingButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  pricingButtonTextPopular: {
    color: '#ffffff',
  },
  testimonialsSection: {
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

export default PublicLandingPage;
