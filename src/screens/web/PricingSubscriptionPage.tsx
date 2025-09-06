import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PricingSubscriptionPage: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedRegion, setSelectedRegion] = useState('sa');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('clients');
  const [selectedBilling, setSelectedBilling] = useState('monthly');

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

  const tabs = [
    { id: 'clients', name: 'For Clients', icon: 'business' },
    { id: 'engineers', name: 'For Engineers', icon: 'construct' },
    { id: 'enterprise', name: 'Enterprise', icon: 'people' },
  ];

  const billingOptions = [
    { id: 'monthly', name: 'Monthly', discount: 0 },
    { id: 'yearly', name: 'Yearly', discount: 20 },
    { id: 'lifetime', name: 'Lifetime', discount: 50 },
  ];

  const clientPlans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 'Free',
      period: 'forever',
      description: 'Perfect for individual clients and small projects',
      features: [
        'Up to 3 active projects',
        'Basic project management',
        'Standard support',
        'Mobile app access',
        'Basic reporting',
        'Email notifications',
      ],
      limitations: [
        'Limited to 3 projects',
        'Basic support only',
        'No advanced analytics',
        'No priority matching',
      ],
      cta: 'Get Started',
      popular: false,
      color: '#6c757d',
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 'SAR 99',
      period: 'per month',
      description: 'Best for growing businesses and regular projects',
      features: [
        'Unlimited projects',
        'Advanced project management',
        'Priority support',
        'Mobile app access',
        'Advanced analytics',
        'Priority matching',
        'Team collaboration',
        'API access',
        'Custom reporting',
        'SMS notifications',
      ],
      limitations: [
        'No white-label options',
        'Limited integrations',
        'Standard SLA',
      ],
      cta: 'Start Free Trial',
      popular: true,
      color: '#007bff',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For large organizations with complex needs',
      features: [
        'Everything in Pro',
        'White-label options',
        'Custom integrations',
        'Dedicated support',
        'Advanced security',
        'Custom SLA',
        'On-premise deployment',
        'Custom training',
        '24/7 phone support',
        'Account manager',
      ],
      limitations: [
        'Minimum contract required',
        'Custom pricing',
      ],
      cta: 'Contact Sales',
      popular: false,
      color: '#28a745',
    },
  ];

  const engineerPlans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 'Free',
      period: 'forever',
      description: 'Perfect for individual engineers starting out',
      features: [
        'Up to 5 active projects',
        'Basic profile',
        'Standard support',
        'Mobile app access',
        'Basic analytics',
        'Email notifications',
      ],
      limitations: [
        'Limited to 5 projects',
        'Basic profile only',
        'No priority matching',
        'Basic support',
      ],
      cta: 'Get Started',
      popular: false,
      color: '#6c757d',
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 'SAR 49',
      period: 'per month',
      description: 'Best for active engineers and growing practices',
      features: [
        'Unlimited projects',
        'Enhanced profile',
        'Priority support',
        'Mobile app access',
        'Advanced analytics',
        'Priority matching',
        'Portfolio showcase',
        'API access',
        'Custom reporting',
        'SMS notifications',
      ],
      limitations: [
        'No white-label options',
        'Limited integrations',
        'Standard SLA',
      ],
      cta: 'Start Free Trial',
      popular: true,
      color: '#007bff',
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 'SAR 99',
      period: 'per month',
      description: 'For established engineers and firms',
      features: [
        'Everything in Pro',
        'Premium profile',
        'Priority support',
        'Mobile app access',
        'Advanced analytics',
        'Priority matching',
        'Portfolio showcase',
        'API access',
        'Custom reporting',
        'SMS notifications',
        'White-label options',
        'Custom integrations',
        'Dedicated support',
        'Advanced security',
        'Custom SLA',
        'On-premise deployment',
        'Custom training',
        '24/7 phone support',
        'Account manager',
      ],
      limitations: [
        'Minimum contract required',
        'Custom pricing',
      ],
      cta: 'Contact Sales',
      popular: false,
      color: '#28a745',
    },
  ];

  const enterprisePlans = [
    {
      id: 'starter',
      name: 'Enterprise Starter',
      price: 'SAR 999',
      period: 'per month',
      description: 'For small to medium enterprises',
      features: [
        'Up to 50 users',
        'Unlimited projects',
        'Advanced project management',
        'Priority support',
        'Mobile app access',
        'Advanced analytics',
        'Priority matching',
        'Team collaboration',
        'API access',
        'Custom reporting',
        'SMS notifications',
        'White-label options',
        'Custom integrations',
        'Dedicated support',
        'Advanced security',
        'Custom SLA',
        'On-premise deployment',
        'Custom training',
        '24/7 phone support',
        'Account manager',
      ],
      limitations: [
        'Limited to 50 users',
        'Basic white-label',
        'Standard integrations',
      ],
      cta: 'Start Free Trial',
      popular: false,
      color: '#6c757d',
    },
    {
      id: 'professional',
      name: 'Enterprise Professional',
      price: 'SAR 1,999',
      period: 'per month',
      description: 'For medium to large enterprises',
      features: [
        'Up to 200 users',
        'Unlimited projects',
        'Advanced project management',
        'Priority support',
        'Mobile app access',
        'Advanced analytics',
        'Priority matching',
        'Team collaboration',
        'API access',
        'Custom reporting',
        'SMS notifications',
        'White-label options',
        'Custom integrations',
        'Dedicated support',
        'Advanced security',
        'Custom SLA',
        'On-premise deployment',
        'Custom training',
        '24/7 phone support',
        'Account manager',
        'Advanced white-label',
        'Custom integrations',
        'Dedicated infrastructure',
        'Custom SLA',
        'On-premise deployment',
        'Custom training',
        '24/7 phone support',
        'Account manager',
      ],
      limitations: [
        'Limited to 200 users',
        'Standard white-label',
        'Limited custom integrations',
      ],
      cta: 'Start Free Trial',
      popular: true,
      color: '#007bff',
    },
    {
      id: 'enterprise',
      name: 'Enterprise Custom',
      price: 'Custom',
      period: 'contact us',
      description: 'For large organizations with complex needs',
      features: [
        'Unlimited users',
        'Unlimited projects',
        'Advanced project management',
        'Priority support',
        'Mobile app access',
        'Advanced analytics',
        'Priority matching',
        'Team collaboration',
        'API access',
        'Custom reporting',
        'SMS notifications',
        'White-label options',
        'Custom integrations',
        'Dedicated support',
        'Advanced security',
        'Custom SLA',
        'On-premise deployment',
        'Custom training',
        '24/7 phone support',
        'Account manager',
        'Full white-label',
        'Unlimited custom integrations',
        'Dedicated infrastructure',
        'Custom SLA',
        'On-premise deployment',
        'Custom training',
        '24/7 phone support',
        'Account manager',
        'Custom development',
        'Dedicated support team',
        'Custom training programs',
        'Custom integrations',
        'Custom reporting',
        'Custom analytics',
        'Custom security',
        'Custom compliance',
        'Custom deployment',
        'Custom maintenance',
        'Custom support',
        'Custom training',
        'Custom documentation',
        'Custom API',
        'Custom webhooks',
        'Custom notifications',
        'Custom branding',
        'Custom themes',
        'Custom workflows',
        'Custom automation',
        'Custom integrations',
        'Custom reporting',
        'Custom analytics',
        'Custom security',
        'Custom compliance',
        'Custom deployment',
        'Custom maintenance',
        'Custom support',
        'Custom training',
        'Custom documentation',
        'Custom API',
        'Custom webhooks',
        'Custom notifications',
        'Custom branding',
        'Custom themes',
        'Custom workflows',
        'Custom automation',
      ],
      limitations: [
        'Minimum contract required',
        'Custom pricing',
        'Custom terms',
      ],
      cta: 'Contact Sales',
      popular: false,
      color: '#28a745',
    },
  ];

  const faqs = [
    {
      id: '1',
      question: 'What is included in the free plan?',
      answer: 'The free plan includes basic project management, up to 3 active projects, standard support, mobile app access, and basic reporting. It\'s perfect for individual clients and small projects.',
    },
    {
      id: '2',
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any billing differences.',
    },
    {
      id: '3',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, bank transfers, and local payment methods including mada, STC Pay, and Apple Pay.',
    },
    {
      id: '4',
      question: 'Is there a free trial?',
      answer: 'Yes, we offer a 14-day free trial for all paid plans. No credit card required to start your trial.',
    },
    {
      id: '5',
      question: 'What is your refund policy?',
      answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied, we\'ll refund your payment in full.',
    },
    {
      id: '6',
      question: 'Do you offer discounts for annual billing?',
      answer: 'Yes, we offer a 20% discount for annual billing and a 50% discount for lifetime plans.',
    },
  ];

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
  };

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleBillingChange = (billing: string) => {
    setSelectedBilling(billing);
  };

  const handleGetStarted = () => {
    Alert.alert('Get Started', 'Redirecting to registration...');
  };

  const handleStartTrial = () => {
    Alert.alert('Start Trial', 'Redirecting to trial signup...');
  };

  const handleContactSales = () => {
    Alert.alert('Contact Sales', 'Redirecting to contact form...');
  };

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
      <View style={styles.pricingHeader}>
        <Text style={styles.pricingName}>{plan.name}</Text>
        <Text style={styles.pricingPrice}>{plan.price}</Text>
        <Text style={styles.pricingPeriod}>{plan.period}</Text>
        <Text style={styles.pricingDescription}>{plan.description}</Text>
      </View>
      
      <View style={styles.pricingFeatures}>
        <Text style={styles.pricingFeaturesTitle}>Features:</Text>
        {plan.features.map((feature: string, index: number) => (
          <View key={index} style={styles.pricingFeature}>
            <Ionicons name="checkmark" size={16} color="#28a745" />
            <Text style={styles.pricingFeatureText}>{feature}</Text>
          </View>
        ))}
      </View>

      {plan.limitations && plan.limitations.length > 0 && (
        <View style={styles.pricingLimitations}>
          <Text style={styles.pricingLimitationsTitle}>Limitations:</Text>
          {plan.limitations.map((limitation: string, index: number) => (
            <View key={index} style={styles.pricingLimitation}>
              <Ionicons name="close" size={16} color="#dc3545" />
              <Text style={styles.pricingLimitationText}>{limitation}</Text>
            </View>
          ))}
        </View>
      )}

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

  const TabButton = ({ tab }: { tab: any }) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        selectedTab === tab.id && styles.tabButtonSelected
      ]}
      onPress={() => handleTabChange(tab.id)}
    >
      <Ionicons name={tab.icon as any} size={20} color={selectedTab === tab.id ? '#ffffff' : '#007bff'} />
      <Text style={[
        styles.tabText,
        selectedTab === tab.id && styles.tabTextSelected
      ]}>
        {tab.name}
      </Text>
    </TouchableOpacity>
  );

  const BillingButton = ({ billing }: { billing: any }) => (
    <TouchableOpacity
      style={[
        styles.billingButton,
        selectedBilling === billing.id && styles.billingButtonSelected
      ]}
      onPress={() => handleBillingChange(billing.id)}
    >
      <Text style={[
        styles.billingText,
        selectedBilling === billing.id && styles.billingTextSelected
      ]}>
        {billing.name}
      </Text>
      {billing.discount > 0 && (
        <View style={styles.billingDiscount}>
          <Text style={styles.billingDiscountText}>{billing.discount}% OFF</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const FAQItem = ({ faq }: { faq: any }) => (
    <View style={styles.faqItem}>
      <Text style={styles.faqQuestion}>{faq.question}</Text>
      <Text style={styles.faqAnswer}>{faq.answer}</Text>
    </View>
  );

  const getCurrentPlans = () => {
    switch (selectedTab) {
      case 'clients':
        return clientPlans;
      case 'engineers':
        return engineerPlans;
      case 'enterprise':
        return enterprisePlans;
      default:
        return clientPlans;
    }
  };

  const currentPlans = getCurrentPlans();

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
          Simple, Transparent Pricing
        </Text>
        <Text style={styles.heroSubtitle}>
          Choose the plan that fits your needs
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

      <View style={styles.tabsSection}>
        <Text style={styles.sectionTitle}>Choose Your Plan</Text>
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TabButton key={tab.id} tab={tab} />
          ))}
        </View>
      </View>

      <View style={styles.billingSection}>
        <Text style={styles.sectionTitle}>Billing Options</Text>
        <View style={styles.billingContainer}>
          {billingOptions.map((billing) => (
            <BillingButton key={billing.id} billing={billing} />
          ))}
        </View>
      </View>

      <View style={styles.pricingSection}>
        <Text style={styles.sectionTitle}>
          {selectedTab === 'clients' ? 'Client Plans' :
           selectedTab === 'engineers' ? 'Engineer Plans' :
           'Enterprise Plans'} ({currentPlans.length})
        </Text>
        <View style={styles.pricingGrid}>
          {currentPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </View>
      </View>

      <View style={styles.faqSection}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        <Text style={styles.sectionSubtitle}>
          Everything you need to know about our pricing
        </Text>
        <View style={styles.faqContainer}>
          {faqs.map((faq) => (
            <FAQItem key={faq.id} faq={faq} />
          ))}
        </View>
      </View>

      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Ready to Get Started?</Text>
        <Text style={styles.ctaSubtitle}>
          Join thousands of users already using NBCON Pro
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
            <Text style={styles.footerTitle}>Pricing</Text>
            <Text style={styles.footerLink}>Client Plans</Text>
            <Text style={styles.footerLink}>Engineer Plans</Text>
            <Text style={styles.footerLink}>Enterprise Plans</Text>
            <Text style={styles.footerLink}>Free Trial</Text>
          </View>
          <View style={styles.footerSection}>
            <Text style={styles.footerTitle}>Support</Text>
            <Text style={styles.footerLink}>Help Center</Text>
            <Text style={styles.footerLink}>Contact Us</Text>
            <Text style={styles.footerLink}>Documentation</Text>
            <Text style={styles.footerLink}>Status</Text>
          </View>
          <View style={styles.footerSection}>
            <Text style={styles.footerTitle}>Legal</Text>
            <Text style={styles.footerLink}>Privacy Policy</Text>
            <Text style={styles.footerLink}>Terms of Service</Text>
            <Text style={styles.footerLink}>Cookie Policy</Text>
            <Text style={styles.footerLink}>Refund Policy</Text>
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
  tabsSection: {
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
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  tabButtonSelected: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  tabText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  tabTextSelected: {
    color: '#ffffff',
  },
  billingSection: {
    padding: 40,
    alignItems: 'center',
  },
  billingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  billingButton: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  billingButtonSelected: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  billingText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '500',
  },
  billingTextSelected: {
    color: '#ffffff',
  },
  billingDiscount: {
    backgroundColor: '#28a745',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 5,
  },
  billingDiscountText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  pricingSection: {
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
  pricingHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  pricingName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  pricingPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  pricingPeriod: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 15,
  },
  pricingDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
  pricingFeatures: {
    marginBottom: 20,
  },
  pricingFeaturesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
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
  pricingLimitations: {
    marginBottom: 20,
  },
  pricingLimitationsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  pricingLimitation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  pricingLimitationText: {
    fontSize: 14,
    color: '#666666',
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
  faqSection: {
    backgroundColor: '#f8f9fa',
    padding: 40,
  },
  faqContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  faqItem: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
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

export default PricingSubscriptionPage;
