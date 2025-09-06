import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EngineerSubscriptionPackagesScreen: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [selectedBilling, setSelectedBilling] = useState('monthly');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const billingOptions = [
    { id: 'monthly', name: 'Monthly', discount: 0 },
    { id: 'quarterly', name: 'Quarterly', discount: 10 },
    { id: 'yearly', name: 'Yearly', discount: 20 },
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'civil', name: 'Civil Engineering' },
    { id: 'mep', name: 'MEP Engineering' },
    { id: 'structural', name: 'Structural Engineering' },
    { id: 'safety', name: 'Safety Engineering' },
    { id: 'environmental', name: 'Environmental Engineering' },
    { id: 'bim', name: 'BIM Engineering' },
    { id: 'surveying', name: 'Surveying' },
  ];

  const subscriptionPlans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 99,
      currency: 'SAR',
      period: 'month',
      description: 'Perfect for new engineers starting their journey',
      features: [
        'Up to 5 active job applications',
        'Basic profile visibility',
        'Standard customer support',
        'Basic analytics dashboard',
        'Mobile app access',
        'Email notifications',
      ],
      limitations: [
        'Limited job applications per month',
        'Basic profile features only',
        'Standard response time',
      ],
      popular: false,
      color: '#6c757d',
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 199,
      currency: 'SAR',
      period: 'month',
      description: 'Ideal for established engineers looking to grow',
      features: [
        'Unlimited job applications',
        'Enhanced profile visibility',
        'Priority customer support',
        'Advanced analytics dashboard',
        'Mobile app access',
        'Push notifications',
        'Profile verification badge',
        'Advanced search filters',
        'Job recommendations',
        'Client messaging',
      ],
      limitations: [
        'Standard response time',
        'Basic reporting features',
      ],
      popular: true,
      color: '#007bff',
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 399,
      currency: 'SAR',
      period: 'month',
      description: 'For top-tier engineers seeking maximum exposure',
      features: [
        'Unlimited job applications',
        'Maximum profile visibility',
        '24/7 priority support',
        'Premium analytics dashboard',
        'Mobile app access',
        'All notifications',
        'Premium verification badge',
        'Advanced search filters',
        'AI-powered job matching',
        'Unlimited client messaging',
        'Custom profile sections',
        'Portfolio showcase',
        'Client testimonials',
        'Advanced reporting',
        'API access',
      ],
      limitations: [],
      popular: false,
      color: '#ffc107',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 799,
      currency: 'SAR',
      period: 'month',
      description: 'For engineering firms and large teams',
      features: [
        'Everything in Premium',
        'Team management tools',
        'Bulk job applications',
        'Custom branding',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced reporting suite',
        'White-label options',
        'Priority job matching',
        'Custom analytics',
        'Team collaboration tools',
        'Advanced security features',
        'Custom training sessions',
        'SLA guarantees',
      ],
      limitations: [],
      popular: false,
      color: '#28a745',
    },
  ];

  const currentSubscription = {
    plan: 'basic',
    status: 'active',
    nextBilling: '2024-02-25',
    amount: 99,
    currency: 'SAR',
    features: [
      'Up to 5 active job applications',
      'Basic profile visibility',
      'Standard customer support',
      'Basic analytics dashboard',
    ],
  };

  const BillingButton = ({ billing }: { billing: any }) => (
    <TouchableOpacity
      style={[
        styles.billingButton,
        selectedBilling === billing.id && styles.billingButtonSelected
      ]}
      onPress={() => setSelectedBilling(billing.id)}
    >
      <Text style={[
        styles.billingButtonText,
        selectedBilling === billing.id && styles.billingButtonTextSelected
      ]}>
        {billing.name}
      </Text>
      {billing.discount > 0 && (
        <Text style={styles.discountText}>Save {billing.discount}%</Text>
      )}
    </TouchableOpacity>
  );

  const CategoryButton = ({ category }: { category: any }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === category.id && styles.categoryButtonSelected
      ]}
      onPress={() => setSelectedCategory(category.id)}
    >
      <Text style={[
        styles.categoryButtonText,
        selectedCategory === category.id && styles.categoryButtonTextSelected
      ]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  const PlanCard = ({ plan }: { plan: any }) => {
    const isSelected = selectedPlan === plan.id;
    const isCurrent = currentSubscription.plan === plan.id;
    
    return (
      <TouchableOpacity
        style={[
          styles.planCard,
          isSelected && styles.planCardSelected,
          plan.popular && styles.planCardPopular
        ]}
        onPress={() => setSelectedPlan(plan.id)}
      >
        {plan.popular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>MOST POPULAR</Text>
          </View>
        )}
        
        <View style={styles.planHeader}>
          <Text style={styles.planName}>{plan.name}</Text>
          {isCurrent && (
            <View style={styles.currentBadge}>
              <Text style={styles.currentText}>CURRENT</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.planDescription}>{plan.description}</Text>
        
        <View style={styles.planPricing}>
          <Text style={styles.planPrice}>
            {plan.price} {plan.currency}
          </Text>
          <Text style={styles.planPeriod}>/{plan.period}</Text>
        </View>
        
        <View style={styles.planFeatures}>
          {plan.features.map((feature: string, index: number) => (
            <View key={index} style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={16} color="#28a745" />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
        
        {plan.limitations.length > 0 && (
          <View style={styles.planLimitations}>
            <Text style={styles.limitationsTitle}>Limitations:</Text>
            {plan.limitations.map((limitation: string, index: number) => (
              <View key={index} style={styles.limitationItem}>
                <Ionicons name="close-circle" size={16} color="#dc3545" />
                <Text style={styles.limitationText}>{limitation}</Text>
              </View>
            ))}
          </View>
        )}
        
        <TouchableOpacity style={[
          styles.selectButton,
          isSelected && styles.selectButtonSelected,
          isCurrent && styles.selectButtonCurrent
        ]}>
          <Text style={[
            styles.selectButtonText,
            isSelected && styles.selectButtonTextSelected,
            isCurrent && styles.selectButtonTextCurrent
          ]}>
            {isCurrent ? 'Current Plan' : isSelected ? 'Selected' : 'Select Plan'}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const getPrice = (plan: any) => {
    const basePrice = plan.price;
    const discount = billingOptions.find(b => b.id === selectedBilling)?.discount || 0;
    return Math.round(basePrice * (1 - discount / 100));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Engineer Subscription Packages</Text>
      <Text style={styles.subtitle}>
        Paid tier packages for engineers
      </Text>

      <View style={styles.currentSubscriptionCard}>
        <Text style={styles.cardTitle}>Current Subscription</Text>
        <View style={styles.currentSubscriptionInfo}>
          <View style={styles.currentSubscriptionDetails}>
            <Text style={styles.currentPlanName}>
              {currentSubscription.plan.charAt(0).toUpperCase() + currentSubscription.plan.slice(1)} Plan
            </Text>
            <Text style={styles.currentPlanStatus}>
              Status: <Text style={styles.statusActive}>{currentSubscription.status}</Text>
            </Text>
            <Text style={styles.currentPlanBilling}>
              Next billing: {currentSubscription.nextBilling}
            </Text>
            <Text style={styles.currentPlanAmount}>
              {currentSubscription.amount} {currentSubscription.currency}/month
            </Text>
          </View>
          <TouchableOpacity style={styles.manageButton}>
            <Text style={styles.manageButtonText}>Manage</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.billingCard}>
        <Text style={styles.cardTitle}>Billing Cycle</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.billingContainer}>
            {billingOptions.map((billing) => (
              <BillingButton key={billing.id} billing={billing} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.categoriesCard}>
        <Text style={styles.cardTitle}>Filter by Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <CategoryButton key={category.id} category={category} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.plansCard}>
        <Text style={styles.cardTitle}>Available Plans</Text>
        {subscriptionPlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </View>

      <View style={styles.pricingSummaryCard}>
        <Text style={styles.cardTitle}>Pricing Summary</Text>
        <View style={styles.pricingSummary}>
          <View style={styles.pricingItem}>
            <Text style={styles.pricingLabel}>Selected Plan:</Text>
            <Text style={styles.pricingValue}>
              {subscriptionPlans.find(p => p.id === selectedPlan)?.name}
            </Text>
          </View>
          <View style={styles.pricingItem}>
            <Text style={styles.pricingLabel}>Billing Cycle:</Text>
            <Text style={styles.pricingValue}>
              {billingOptions.find(b => b.id === selectedBilling)?.name}
            </Text>
          </View>
          <View style={styles.pricingItem}>
            <Text style={styles.pricingLabel}>Price:</Text>
            <Text style={styles.pricingValue}>
              {getPrice(subscriptionPlans.find(p => p.id === selectedPlan)!)} SAR
              /{billingOptions.find(b => b.id === selectedBilling)?.name.toLowerCase()}
            </Text>
          </View>
          {billingOptions.find(b => b.id === selectedBilling)?.discount! > 0 && (
            <View style={styles.pricingItem}>
              <Text style={styles.pricingLabel}>Discount:</Text>
              <Text style={styles.pricingValue}>
                {billingOptions.find(b => b.id === selectedBilling)?.discount}% OFF
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.subscribeButton}>
          <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.featuresComparisonCard}>
        <Text style={styles.cardTitle}>Feature Comparison</Text>
        <View style={styles.comparisonTable}>
          <View style={styles.comparisonHeader}>
            <Text style={styles.comparisonHeaderText}>Feature</Text>
            <Text style={styles.comparisonHeaderText}>Basic</Text>
            <Text style={styles.comparisonHeaderText}>Professional</Text>
            <Text style={styles.comparisonHeaderText}>Premium</Text>
            <Text style={styles.comparisonHeaderText}>Enterprise</Text>
          </View>
          <View style={styles.comparisonRow}>
            <Text style={styles.comparisonLabel}>Job Applications</Text>
            <Text style={styles.comparisonValue}>5/month</Text>
            <Text style={styles.comparisonValue}>Unlimited</Text>
            <Text style={styles.comparisonValue}>Unlimited</Text>
            <Text style={styles.comparisonValue}>Unlimited</Text>
          </View>
          <View style={styles.comparisonRow}>
            <Text style={styles.comparisonLabel}>Profile Visibility</Text>
            <Text style={styles.comparisonValue}>Basic</Text>
            <Text style={styles.comparisonValue}>Enhanced</Text>
            <Text style={styles.comparisonValue}>Maximum</Text>
            <Text style={styles.comparisonValue}>Maximum</Text>
          </View>
          <View style={styles.comparisonRow}>
            <Text style={styles.comparisonLabel}>Support</Text>
            <Text style={styles.comparisonValue}>Standard</Text>
            <Text style={styles.comparisonValue}>Priority</Text>
            <Text style={styles.comparisonValue}>24/7 Priority</Text>
            <Text style={styles.comparisonValue}>Dedicated</Text>
          </View>
          <View style={styles.comparisonRow}>
            <Text style={styles.comparisonLabel}>Analytics</Text>
            <Text style={styles.comparisonValue}>Basic</Text>
            <Text style={styles.comparisonValue}>Advanced</Text>
            <Text style={styles.comparisonValue}>Premium</Text>
            <Text style={styles.comparisonValue}>Custom</Text>
          </View>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Choose the subscription plan that best fits your engineering career goals. 
          Upgrade or downgrade at any time with no long-term commitments.
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
  currentSubscriptionCard: {
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
  currentSubscriptionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentSubscriptionDetails: {
    flex: 1,
  },
  currentPlanName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  currentPlanStatus: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 5,
  },
  statusActive: {
    color: '#28a745',
    fontWeight: 'bold',
  },
  currentPlanBilling: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 5,
  },
  currentPlanAmount: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: 'bold',
  },
  manageButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 10,
  },
  manageButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  billingCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  billingContainer: {
    flexDirection: 'row',
  },
  billingButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  billingButtonSelected: {
    backgroundColor: '#007bff',
  },
  billingButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  billingButtonTextSelected: {
    color: '#ffffff',
  },
  discountText: {
    color: '#28a745',
    fontSize: 10,
    fontWeight: 'bold',
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
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  categoryButtonSelected: {
    backgroundColor: '#007bff',
  },
  categoryButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoryButtonTextSelected: {
    color: '#ffffff',
  },
  plansCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  planCard: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  planCardSelected: {
    borderColor: '#007bff',
  },
  planCardPopular: {
    borderColor: '#ffc107',
  },
  popularBadge: {
    backgroundColor: '#ffc107',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  popularText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: 'bold',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  currentBadge: {
    backgroundColor: '#28a745',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  currentText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  planDescription: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 15,
    lineHeight: 20,
  },
  planPricing: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  planPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007bff',
  },
  planPeriod: {
    fontSize: 16,
    color: '#cccccc',
    marginLeft: 5,
  },
  planFeatures: {
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    color: '#ffffff',
    fontSize: 14,
    marginLeft: 8,
  },
  planLimitations: {
    marginBottom: 15,
  },
  limitationsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#dc3545',
    marginBottom: 8,
  },
  limitationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  limitationText: {
    color: '#dc3545',
    fontSize: 12,
    marginLeft: 8,
  },
  selectButton: {
    backgroundColor: '#4a4a4a',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  selectButtonSelected: {
    backgroundColor: '#007bff',
  },
  selectButtonCurrent: {
    backgroundColor: '#28a745',
  },
  selectButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  selectButtonTextSelected: {
    color: '#ffffff',
  },
  selectButtonTextCurrent: {
    color: '#ffffff',
  },
  pricingSummaryCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  pricingSummary: {
    marginBottom: 20,
  },
  pricingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  pricingLabel: {
    fontSize: 14,
    color: '#cccccc',
  },
  pricingValue: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  subscribeButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  subscribeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  featuresComparisonCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  comparisonTable: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    overflow: 'hidden',
  },
  comparisonHeader: {
    flexDirection: 'row',
    backgroundColor: '#4a4a4a',
    padding: 12,
  },
  comparisonHeaderText: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  comparisonRow: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#555555',
  },
  comparisonLabel: {
    flex: 1,
    fontSize: 12,
    color: '#cccccc',
  },
  comparisonValue: {
    flex: 1,
    fontSize: 12,
    color: '#ffffff',
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

export default EngineerSubscriptionPackagesScreen;
