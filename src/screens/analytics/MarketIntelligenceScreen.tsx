import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MarketIntelligenceScreen: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('riyadh');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const regions = [
    { id: 'riyadh', name: 'Riyadh', growth: '+25%' },
    { id: 'jeddah', name: 'Jeddah', growth: '+18%' },
    { id: 'dammam', name: 'Dammam', growth: '+12%' },
    { id: 'mecca', name: 'Mecca', growth: '+15%' },
    { id: 'medina', name: 'Medina', growth: '+8%' },
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'civil', name: 'Civil Engineering' },
    { id: 'mep', name: 'MEP Systems' },
    { id: 'surveying', name: 'Surveying' },
    { id: 'bim', name: 'BIM Services' },
  ];

  const marketTrends = [
    {
      title: 'Smart City Development',
      description: 'Riyadh leading smart city initiatives with 40% increase in tech projects',
      impact: 'High',
      growth: '+40%',
      icon: 'business',
    },
    {
      title: 'Green Building Boom',
      description: 'Sustainable construction projects up 35% across major cities',
      impact: 'High',
      growth: '+35%',
      icon: 'leaf',
    },
    {
      title: 'Infrastructure Expansion',
      description: 'Vision 2030 projects driving 28% growth in infrastructure',
      impact: 'Medium',
      growth: '+28%',
      icon: 'construct',
    },
    {
      title: 'Digital Transformation',
      description: 'BIM and digital twin adoption increasing 45%',
      impact: 'High',
      growth: '+45%',
      icon: 'laptop',
    },
  ];

  const competitorAnalysis = [
    {
      name: 'Engineering Solutions Co.',
      marketShare: 25,
      strengths: ['Large team', 'Government contracts'],
      weaknesses: ['High prices', 'Slow delivery'],
      rating: 4.2,
    },
    {
      name: 'TechBuild Saudi',
      marketShare: 18,
      strengths: ['Innovation', 'BIM expertise'],
      weaknesses: ['Limited coverage', 'New company'],
      rating: 4.5,
    },
    {
      name: 'Saudi Engineering Group',
      marketShare: 22,
      strengths: ['Local expertise', 'Established'],
      weaknesses: ['Traditional methods', 'Limited tech'],
      rating: 4.0,
    },
  ];

  const pricingInsights = [
    {
      category: 'Civil Engineering',
      avgRate: 450,
      yourRate: 480,
      marketPosition: 'Premium',
      recommendation: 'Maintain current rates',
    },
    {
      category: 'MEP Systems',
      avgRate: 520,
      yourRate: 500,
      marketPosition: 'Competitive',
      recommendation: 'Consider 5% increase',
    },
    {
      category: 'Surveying',
      avgRate: 380,
      yourRate: 420,
      marketPosition: 'Premium',
      recommendation: 'Maintain current rates',
    },
    {
      category: 'BIM Services',
      avgRate: 600,
      yourRate: 580,
      marketPosition: 'Competitive',
      recommendation: 'Consider 10% increase',
    },
  ];

  const RegionButton = ({ region }: { region: any }) => (
    <TouchableOpacity
      style={[
        styles.regionButton,
        selectedRegion === region.id && styles.regionButtonSelected
      ]}
      onPress={() => setSelectedRegion(region.id)}
    >
      <Text style={[
        styles.regionButtonText,
        selectedRegion === region.id && styles.regionButtonTextSelected
      ]}>
        {region.name}
      </Text>
      <Text style={styles.regionGrowth}>{region.growth}</Text>
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

  const TrendCard = ({ trend }: { trend: any }) => (
    <View style={styles.trendCard}>
      <View style={styles.trendHeader}>
        <Ionicons name={trend.icon as any} size={24} color="#007bff" />
        <Text style={styles.trendTitle}>{trend.title}</Text>
        <View style={[
          styles.impactBadge,
          { backgroundColor: trend.impact === 'High' ? '#28a745' : '#ffc107' }
        ]}>
          <Text style={styles.impactText}>{trend.impact}</Text>
        </View>
      </View>
      <Text style={styles.trendDescription}>{trend.description}</Text>
      <View style={styles.trendFooter}>
        <Text style={styles.growthText}>Growth: {trend.growth}</Text>
        <TouchableOpacity style={styles.exploreButton}>
          <Text style={styles.exploreText}>Explore</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const CompetitorCard = ({ competitor }: { competitor: any }) => (
    <View style={styles.competitorCard}>
      <View style={styles.competitorHeader}>
        <Text style={styles.competitorName}>{competitor.name}</Text>
        <View style={styles.competitorStats}>
          <Text style={styles.marketShare}>{competitor.marketShare}%</Text>
          <Text style={styles.rating}>★ {competitor.rating}</Text>
        </View>
      </View>
      <View style={styles.competitorAnalysis}>
        <View style={styles.strengths}>
          <Text style={styles.analysisTitle}>Strengths</Text>
          {competitor.strengths.map((strength: string, index: number) => (
            <Text key={index} style={styles.analysisItem}>• {strength}</Text>
          ))}
        </View>
        <View style={styles.weaknesses}>
          <Text style={styles.analysisTitle}>Weaknesses</Text>
          {competitor.weaknesses.map((weakness: string, index: number) => (
            <Text key={index} style={styles.analysisItem}>• {weakness}</Text>
          ))}
        </View>
      </View>
    </View>
  );

  const PricingCard = ({ pricing }: { pricing: any }) => (
    <View style={styles.pricingCard}>
      <View style={styles.pricingHeader}>
        <Text style={styles.pricingCategory}>{pricing.category}</Text>
        <View style={[
          styles.positionBadge,
          { backgroundColor: pricing.marketPosition === 'Premium' ? '#28a745' : '#ffc107' }
        ]}>
          <Text style={styles.positionText}>{pricing.marketPosition}</Text>
        </View>
      </View>
      <View style={styles.pricingComparison}>
        <View style={styles.rateItem}>
          <Text style={styles.rateLabel}>Market Avg</Text>
          <Text style={styles.rateValue}>{pricing.avgRate} SAR/hr</Text>
        </View>
        <View style={styles.rateItem}>
          <Text style={styles.rateLabel}>Your Rate</Text>
          <Text style={styles.rateValue}>{pricing.yourRate} SAR/hr</Text>
        </View>
      </View>
      <Text style={styles.recommendation}>{pricing.recommendation}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Market Intelligence</Text>
      <Text style={styles.subtitle}>
        Industry trends and competitor insights
      </Text>

      <View style={styles.regionSelector}>
        <Text style={styles.selectorTitle}>Market Regions</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.regionButtons}>
            {regions.map((region) => (
              <RegionButton key={region.id} region={region} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.categorySelector}>
        <Text style={styles.selectorTitle}>Service Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoryButtons}>
            {categories.map((category) => (
              <CategoryButton key={category.id} category={category} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.trendsCard}>
        <Text style={styles.cardTitle}>Market Trends</Text>
        <Text style={styles.cardDescription}>
          Key industry developments and growth opportunities
        </Text>
        {marketTrends.map((trend, index) => (
          <TrendCard key={index} trend={trend} />
        ))}
      </View>

      <View style={styles.competitorsCard}>
        <Text style={styles.cardTitle}>Competitor Analysis</Text>
        <Text style={styles.cardDescription}>
          Market share and competitive positioning
        </Text>
        {competitorAnalysis.map((competitor, index) => (
          <CompetitorCard key={index} competitor={competitor} />
        ))}
      </View>

      <View style={styles.pricingCard}>
        <Text style={styles.cardTitle}>Pricing Intelligence</Text>
        <Text style={styles.cardDescription}>
          Market rates and pricing recommendations
        </Text>
        {pricingInsights.map((pricing, index) => (
          <PricingCard key={index} pricing={pricing} />
        ))}
      </View>

      <View style={styles.insightsCard}>
        <Text style={styles.cardTitle}>Strategic Insights</Text>
        <View style={styles.insight}>
          <Ionicons name="trending-up" size={20} color="#28a745" />
          <Text style={styles.insightText}>
            Smart city projects offer 40% growth opportunity in Riyadh
          </Text>
        </View>
        <View style={styles.insight}>
          <Ionicons name="construct" size={20} color="#007bff" />
          <Text style={styles.insightText}>
            BIM services demand increasing 45% - consider specialization
          </Text>
        </View>
        <View style={styles.insight}>
          <Ionicons name="cash" size={20} color="#ffc107" />
          <Text style={styles.insightText}>
            Premium pricing sustainable in Civil and Surveying categories
          </Text>
        </View>
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download" size={24} color="#007bff" />
            <Text style={styles.actionText}>Export Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="refresh" size={24} color="#28a745" />
            <Text style={styles.actionText}>Refresh Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="help-circle" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Help</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Market intelligence is updated weekly with data from industry sources, 
          competitor analysis, and market research. Use insights to inform strategic decisions.
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
  regionSelector: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  selectorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  regionButtons: {
    flexDirection: 'row',
  },
  regionButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  regionButtonSelected: {
    backgroundColor: '#007bff',
  },
  regionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  regionButtonTextSelected: {
    color: '#ffffff',
  },
  regionGrowth: {
    fontSize: 10,
    color: '#28a745',
  },
  categorySelector: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  categoryButtons: {
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
    backgroundColor: '#28a745',
  },
  categoryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  categoryButtonTextSelected: {
    color: '#ffffff',
  },
  trendsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 15,
  },
  trendCard: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  trendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  trendTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
    flex: 1,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  impactText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  trendDescription: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 10,
    lineHeight: 16,
  },
  trendFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  growthText: {
    fontSize: 12,
    color: '#28a745',
    fontWeight: 'bold',
  },
  exploreButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  exploreText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  competitorsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  competitorCard: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  competitorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  competitorName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  competitorStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marketShare: {
    fontSize: 12,
    color: '#007bff',
    fontWeight: 'bold',
    marginRight: 10,
  },
  rating: {
    fontSize: 12,
    color: '#ffc107',
  },
  competitorAnalysis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  strengths: {
    flex: 1,
    marginRight: 10,
  },
  weaknesses: {
    flex: 1,
    marginLeft: 10,
  },
  analysisTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  analysisItem: {
    fontSize: 10,
    color: '#cccccc',
    marginBottom: 2,
  },
  pricingCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  pricingCard: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  pricingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  pricingCategory: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  positionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  positionText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  pricingComparison: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  rateItem: {
    alignItems: 'center',
  },
  rateLabel: {
    fontSize: 10,
    color: '#cccccc',
    marginBottom: 2,
  },
  rateValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  recommendation: {
    fontSize: 12,
    color: '#28a745',
    fontStyle: 'italic',
  },
  insightsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  insight: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  insightText: {
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
  quickActionsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
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

export default MarketIntelligenceScreen;
