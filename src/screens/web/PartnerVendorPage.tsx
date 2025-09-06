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

interface VendorCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirements: string[];
  benefits: string[];
}

interface PartnershipTier {
  id: string;
  name: string;
  description: string;
  features: string[];
  requirements: string;
  commission: string;
  color: string;
}

interface SuccessStory {
  id: string;
  company: string;
  category: string;
  description: string;
  results: string;
  logo: string;
}

const PartnerVendorPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTier, setSelectedTier] = useState('basic');

  const categories = ['All', 'Equipment', 'Materials', 'Software', 'Services', 'Consulting', 'Training'];

  const vendorCategories: VendorCategory[] = [
    {
      id: '1',
      name: 'Equipment Suppliers',
      description: 'Heavy machinery, tools, and specialized equipment for engineering projects',
      icon: '🔧',
      requirements: [
        'Valid business license in Saudi Arabia',
        'Equipment certification and compliance',
        'Insurance coverage for equipment',
        'Maintenance and support capabilities',
      ],
      benefits: [
        'Access to 10,000+ active engineers',
        'Direct integration with project workflows',
        'Automated inventory management',
        'Real-time demand analytics',
      ],
    },
    {
      id: '2',
      name: 'Materials & Supplies',
      description: 'Construction materials, components, and specialized supplies',
      icon: '🏗️',
      requirements: [
        'Quality certifications (ISO, SABIC, etc.)',
        'Reliable supply chain and logistics',
        'Competitive pricing structure',
        'Local warehousing capabilities',
      ],
      benefits: [
        'Bulk order opportunities',
        'Predictive demand forecasting',
        'Direct client relationships',
        'Streamlined procurement process',
      ],
    },
    {
      id: '3',
      name: 'Software & Technology',
      description: 'Engineering software, CAD tools, and digital solutions',
      icon: '💻',
      requirements: [
        'Software licensing compliance',
        'Technical support capabilities',
        'Integration with common platforms',
        'Training and documentation',
      ],
      benefits: [
        'Direct software distribution',
        'Technical support integration',
        'Usage analytics and insights',
        'Co-marketing opportunities',
      ],
    },
    {
      id: '4',
      name: 'Professional Services',
      description: 'Consulting, training, and specialized engineering services',
      icon: '👥',
      requirements: [
        'Professional certifications',
        'Proven track record and references',
        'Insurance and liability coverage',
        'Local market expertise',
      ],
      benefits: [
        'Access to premium projects',
        'Collaborative partnerships',
        'Knowledge sharing opportunities',
        'Revenue sharing models',
      ],
    },
  ];

  const partnershipTiers: PartnershipTier[] = [
    {
      id: 'basic',
      name: 'Basic Partner',
      description: 'Entry-level partnership for small to medium vendors',
      features: [
        'Basic listing on platform',
        'Standard support',
        'Monthly reporting',
        'Email marketing support',
      ],
      requirements: 'Valid business license, 1+ years in business',
      commission: '8-12%',
      color: '#6b7280',
    },
    {
      id: 'premium',
      name: 'Premium Partner',
      description: 'Enhanced partnership with additional benefits',
      features: [
        'Featured listing placement',
        'Priority support',
        'Real-time analytics',
        'Co-marketing opportunities',
        'Custom integration support',
      ],
      requirements: '2+ years in business, 50+ successful projects',
      commission: '5-8%',
      color: '#1e3a8a',
    },
    {
      id: 'enterprise',
      name: 'Enterprise Partner',
      description: 'Strategic partnership for large organizations',
      features: [
        'Dedicated account manager',
        'Custom solutions development',
        'White-label options',
        'API access and integration',
        'Joint business development',
        'Exclusive market access',
      ],
      requirements: '5+ years in business, 200+ successful projects, enterprise capabilities',
      commission: '3-5%',
      color: '#059669',
    },
  ];

  const successStories: SuccessStory[] = [
    {
      id: '1',
      company: 'Saudi Equipment Co.',
      category: 'Equipment',
      description: 'Leading supplier of construction equipment in Saudi Arabia',
      results: '300% increase in equipment rentals through NBCON Pro platform',
      logo: '🏢',
    },
    {
      id: '2',
      company: 'TechSoft Solutions',
      category: 'Software',
      description: 'Provider of engineering software and CAD solutions',
      results: '500+ engineers now using their software through our platform',
      logo: '💻',
    },
    {
      id: '3',
      company: 'Materials Plus',
      category: 'Materials',
      description: 'Specialized supplier of construction materials',
      results: '40% reduction in procurement time for clients',
      logo: '🏗️',
    },
  ];

  const filteredCategories = vendorCategories.filter(category => 
    selectedCategory === 'All' || category.name.toLowerCase().includes(selectedCategory.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Partner with NBCON Pro</Text>
        <Text style={styles.headerSubtitle}>
          Join our ecosystem and grow your business with Saudi Arabia's leading engineering marketplace
        </Text>
      </View>

      {/* Partnership Tiers */}
      <View style={styles.tiersSection}>
        <Text style={styles.sectionTitle}>Partnership Tiers</Text>
        <Text style={styles.sectionSubtitle}>
          Choose the partnership level that fits your business needs
        </Text>
        
        <View style={styles.tiersContainer}>
          {partnershipTiers.map((tier) => (
            <TouchableOpacity
              key={tier.id}
              style={[
                styles.tierCard,
                selectedTier === tier.id && styles.selectedTierCard,
                { borderColor: tier.color }
              ]}
              onPress={() => setSelectedTier(tier.id)}
            >
              <View style={[styles.tierHeader, { backgroundColor: tier.color }]}>
                <Text style={styles.tierName}>{tier.name}</Text>
                <Text style={styles.tierCommission}>{tier.commission} commission</Text>
              </View>
              
              <View style={styles.tierContent}>
                <Text style={styles.tierDescription}>{tier.description}</Text>
                
                <View style={styles.tierFeatures}>
                  {tier.features.map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                      <Text style={styles.featureIcon}>✓</Text>
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
                
                <View style={styles.tierRequirements}>
                  <Text style={styles.requirementsTitle}>Requirements:</Text>
                  <Text style={styles.requirementsText}>{tier.requirements}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Vendor Categories */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Vendor Categories</Text>
        <Text style={styles.sectionSubtitle}>
          We welcome vendors from all engineering-related industries
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
        
        <View style={styles.categoriesGrid}>
          {filteredCategories.map((category) => (
            <View key={category.id} style={styles.categoryCard}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </View>
              
              <Text style={styles.categoryDescription}>{category.description}</Text>
              
              <View style={styles.categoryRequirements}>
                <Text style={styles.requirementsTitle}>Requirements:</Text>
                {category.requirements.map((req, index) => (
                  <Text key={index} style={styles.requirementItem}>• {req}</Text>
                ))}
              </View>
              
              <View style={styles.categoryBenefits}>
                <Text style={styles.benefitsTitle}>Benefits:</Text>
                {category.benefits.map((benefit, index) => (
                  <Text key={index} style={styles.benefitItem}>• {benefit}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Success Stories */}
      <View style={styles.successSection}>
        <Text style={styles.sectionTitle}>Success Stories</Text>
        <Text style={styles.sectionSubtitle}>
          See how our partners have grown their business with NBCON Pro
        </Text>
        
        <FlatList
          data={successStories}
          renderItem={({ item }) => (
            <View style={styles.successCard}>
              <View style={styles.successHeader}>
                <Text style={styles.successLogo}>{item.logo}</Text>
                <View style={styles.successInfo}>
                  <Text style={styles.successCompany}>{item.company}</Text>
                  <Text style={styles.successCategory}>{item.category}</Text>
                </View>
              </View>
              
              <Text style={styles.successDescription}>{item.description}</Text>
              <Text style={styles.successResults}>{item.results}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>

      {/* Application Process */}
      <View style={styles.processSection}>
        <Text style={styles.sectionTitle}>How to Become a Partner</Text>
        
        <View style={styles.processSteps}>
          <View style={styles.processStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepTitle}>Apply Online</Text>
            <Text style={styles.stepDescription}>
              Submit your partnership application with business details and documentation
            </Text>
          </View>
          
          <View style={styles.processStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepTitle}>Review & Verification</Text>
            <Text style={styles.stepDescription}>
              Our team reviews your application and verifies your credentials
            </Text>
          </View>
          
          <View style={styles.processStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepTitle}>Partnership Agreement</Text>
            <Text style={styles.stepDescription}>
              Sign partnership agreement and complete onboarding process
            </Text>
          </View>
          
          <View style={styles.processStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <Text style={styles.stepTitle}>Go Live</Text>
            <Text style={styles.stepDescription}>
              Start listing your products/services and connect with our community
            </Text>
          </View>
        </View>
      </View>

      {/* Benefits Section */}
      <View style={styles.benefitsSection}>
        <Text style={styles.sectionTitle}>Why Partner With Us?</Text>
        
        <View style={styles.benefitsGrid}>
          <View style={styles.benefitCard}>
            <Text style={styles.benefitIcon}>📈</Text>
            <Text style={styles.benefitTitle}>Growth Opportunities</Text>
            <Text style={styles.benefitDescription}>
              Access to thousands of engineers and clients across Saudi Arabia
            </Text>
          </View>
          
          <View style={styles.benefitCard}>
            <Text style={styles.benefitIcon}>🤝</Text>
            <Text style={styles.benefitTitle}>Strategic Partnerships</Text>
            <Text style={styles.benefitDescription}>
              Build long-term relationships with industry leaders
            </Text>
          </View>
          
          <View style={styles.benefitCard}>
            <Text style={styles.benefitIcon}>💡</Text>
            <Text style={styles.benefitTitle}>Innovation Support</Text>
            <Text style={styles.benefitDescription}>
              Leverage our technology platform for business growth
            </Text>
          </View>
          
          <View style={styles.benefitCard}>
            <Text style={styles.benefitIcon}>🇸🇦</Text>
            <Text style={styles.benefitTitle}>Vision 2030 Alignment</Text>
            <Text style={styles.benefitDescription}>
              Contribute to Saudi Arabia's engineering transformation
            </Text>
          </View>
        </View>
      </View>

      {/* CTA Section */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Ready to Partner with Us?</Text>
        <Text style={styles.ctaDescription}>
          Join our ecosystem and start growing your business today
        </Text>
        
        <View style={styles.ctaButtons}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Apply Now</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Contact Sales</Text>
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
  tiersSection: {
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
  tiersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tierCard: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 12,
    borderWidth: 2,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  selectedTierCard: {
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  tierHeader: {
    padding: 15,
    alignItems: 'center',
  },
  tierName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  tierCommission: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  tierContent: {
    padding: 15,
  },
  tierDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 15,
    lineHeight: 20,
  },
  tierFeatures: {
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureIcon: {
    color: '#059669',
    fontSize: 16,
    marginRight: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  tierRequirements: {
    backgroundColor: '#f8fafc',
    padding: 10,
    borderRadius: 8,
  },
  requirementsTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 5,
  },
  requirementsText: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 16,
  },
  categoriesSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
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
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 15,
    lineHeight: 20,
  },
  categoryRequirements: {
    marginBottom: 15,
  },
  requirementsTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 5,
  },
  requirementItem: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  categoryBenefits: {
    marginBottom: 10,
  },
  benefitsTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 5,
  },
  benefitItem: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  successSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  successCard: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  successHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  successLogo: {
    fontSize: 32,
    marginRight: 15,
  },
  successInfo: {
    flex: 1,
  },
  successCompany: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  successCategory: {
    fontSize: 14,
    color: '#6b7280',
  },
  successDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 10,
    lineHeight: 20,
  },
  successResults: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '600',
  },
  processSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  processSteps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  processStep: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e3a8a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepNumberText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  benefitsSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  benefitCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  benefitIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 8,
    textAlign: 'center',
  },
  benefitDescription: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
  ctaSection: {
    backgroundColor: '#1e3a8a',
    padding: 40,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  ctaDescription: {
    fontSize: 16,
    color: '#e0e7ff',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  ctaButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  primaryButton: {
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: '#1e3a8a',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'white',
  },
  secondaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PartnerVendorPage;
