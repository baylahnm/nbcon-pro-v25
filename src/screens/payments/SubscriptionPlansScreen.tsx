import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SubscriptionPlansScreen: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState('pro');

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 99,
      period: 'month',
      description: 'Perfect for individual engineers',
      features: [
        'Up to 5 active projects',
        'Basic job matching',
        'Standard support',
        'Mobile app access',
        'Basic analytics',
      ],
      limitations: [
        'Limited project templates',
        'No priority support',
        'Basic reporting only',
      ],
      popular: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 299,
      period: 'month',
      description: 'Best for growing professionals',
      features: [
        'Unlimited projects',
        'Advanced AI matching',
        'Priority support',
        'Advanced analytics',
        'Custom templates',
        'Video consultations',
        'File sharing',
        'Team collaboration',
      ],
      limitations: [],
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 999,
      period: 'month',
      description: 'For large organizations',
      features: [
        'Everything in Pro',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced security',
        'White-label options',
        'API access',
        'Custom reporting',
        '24/7 phone support',
        'On-site training',
      ],
      limitations: [],
      popular: false,
    },
  ];

  const currentPlan = {
    name: 'Pro',
    price: 299,
    nextBilling: '2024-02-15',
    status: 'Active',
  };

  const PlanCard = ({ plan }: { plan: any }) => (
    <TouchableOpacity
      style={[
        styles.planCard,
        plan.popular && styles.popularPlanCard,
        selectedPlan === plan.id && styles.selectedPlanCard
      ]}
      onPress={() => setSelectedPlan(plan.id)}
    >
      {plan.popular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>Most Popular</Text>
        </View>
      )}
      
      <View style={styles.planHeader}>
        <Text style={styles.planName}>{plan.name}</Text>
        <View style={styles.planPrice}>
          <Text style={styles.priceAmount}>{plan.price}</Text>
          <Text style={styles.pricePeriod}>/{plan.period}</Text>
        </View>
      </View>

      <Text style={styles.planDescription}>{plan.description}</Text>

      <View style={styles.featuresContainer}>
        <Text style={styles.featuresTitle}>Features:</Text>
        {plan.features.map((feature: string, index: number) => (
          <View key={index} style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={16} color="#28a745" />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      {plan.limitations.length > 0 && (
        <View style={styles.limitationsContainer}>
          <Text style={styles.limitationsTitle}>Limitations:</Text>
          {plan.limitations.map((limitation: string, index: number) => (
            <View key={index} style={styles.limitationItem}>
              <Ionicons name="close-circle" size={16} color="#dc3545" />
              <Text style={styles.limitationText}>{limitation}</Text>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity 
        style={[
          styles.selectButton,
          selectedPlan === plan.id && styles.selectedButton
        ]}
      >
        <Text style={[
          styles.selectButtonText,
          selectedPlan === plan.id && styles.selectedButtonText
        ]}>
          {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Subscription Plans</Text>
      <Text style={styles.subtitle}>
        Choose the perfect plan for your engineering business
      </Text>

      <View style={styles.currentPlanCard}>
        <Text style={styles.currentPlanTitle}>Current Plan</Text>
        <View style={styles.currentPlanInfo}>
          <View style={styles.currentPlanDetails}>
            <Text style={styles.currentPlanName}>{currentPlan.name}</Text>
            <Text style={styles.currentPlanPrice}>{currentPlan.price} SAR/month</Text>
            <Text style={styles.currentPlanStatus}>Status: {currentPlan.status}</Text>
          </View>
          <View style={styles.currentPlanActions}>
            <Text style={styles.nextBilling}>Next billing: {currentPlan.nextBilling}</Text>
            <TouchableOpacity style={styles.manageButton}>
              <Text style={styles.manageButtonText}>Manage</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.plansContainer}>
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </View>

      <View style={styles.billingInfoCard}>
        <Text style={styles.billingTitle}>Billing Information</Text>
        <View style={styles.billingFeatures}>
          <View style={styles.billingFeature}>
            <Ionicons name="card" size={20} color="#28a745" />
            <Text style={styles.billingFeatureText}>Secure payment processing</Text>
          </View>
          <View style={styles.billingFeature}>
            <Ionicons name="refresh" size={20} color="#28a745" />
            <Text style={styles.billingFeatureText}>Cancel anytime</Text>
          </View>
          <View style={styles.billingFeature}>
            <Ionicons name="shield-checkmark" size={20} color="#28a745" />
            <Text style={styles.billingFeatureText}>30-day money-back guarantee</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.upgradeButton}>
        <Text style={styles.upgradeButtonText}>Upgrade Plan</Text>
      </TouchableOpacity>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          All plans include VAT. Enterprise plans can be customized based on your organization's needs. 
          Contact sales for custom pricing.
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
  currentPlanCard: {
    backgroundColor: '#2a2a2a',
      borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  currentPlanTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  currentPlanInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
      alignItems: 'center',
    },
  currentPlanDetails: {
    flex: 1,
  },
  currentPlanName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  currentPlanPrice: {
    fontSize: 16,
    color: '#28a745',
    marginBottom: 5,
  },
  currentPlanStatus: {
      fontSize: 14,
    color: '#cccccc',
  },
  currentPlanActions: {
    alignItems: 'flex-end',
  },
  nextBilling: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 10,
  },
  manageButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  manageButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  plansContainer: {
    marginBottom: 30,
    },
    planCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
      padding: 20,
    marginBottom: 20,
    position: 'relative',
      borderWidth: 2,
      borderColor: 'transparent',
    },
  popularPlanCard: {
    borderColor: '#007bff',
    },
  selectedPlanCard: {
    borderColor: '#28a745',
    },
    popularBadge: {
      position: 'absolute',
    top: -10,
    left: 20,
      right: 20,
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignItems: 'center',
    },
    popularText: {
    color: '#ffffff',
      fontSize: 12,
      fontWeight: 'bold',
    },
    planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    },
    planName: {
    fontSize: 24,
      fontWeight: 'bold',
    color: '#ffffff',
    },
  planPrice: {
      flexDirection: 'row',
      alignItems: 'baseline',
    },
  priceAmount: {
      fontSize: 32,
      fontWeight: 'bold',
    color: '#ffffff',
    },
  pricePeriod: {
      fontSize: 16,
    color: '#cccccc',
    marginLeft: 5,
  },
  planDescription: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 20,
    lineHeight: 24,
  },
  featuresContainer: {
    marginBottom: 15,
  },
  featuresTitle: {
    fontSize: 16,
      fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 10,
  },
  limitationsContainer: {
      marginBottom: 20,
    },
  limitationsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dc3545',
    marginBottom: 10,
  },
  limitationItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
  limitationText: {
    fontSize: 14,
    color: '#dc3545',
    marginLeft: 10,
  },
  selectButton: {
    backgroundColor: '#3a3a3a',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#28a745',
  },
  selectButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedButtonText: {
    color: '#ffffff',
  },
  billingInfoCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  billingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  billingFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  billingFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 10,
  },
  billingFeatureText: {
    color: '#ffffff',
      fontSize: 14,
    marginLeft: 10,
  },
  upgradeButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  upgradeButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
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

export default SubscriptionPlansScreen;