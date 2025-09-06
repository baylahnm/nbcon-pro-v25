import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GlobalExpansionScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('countries');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const tabs = [
    { id: 'countries', name: 'Countries', icon: 'globe' },
    { id: 'compliance', name: 'Compliance', icon: 'shield-checkmark' },
    { id: 'currencies', name: 'Currencies', icon: 'cash' },
    { id: 'localization', name: 'Localization', icon: 'language' },
  ];

  const regions = [
    { id: 'all', name: 'All' },
    { id: 'gcc', name: 'GCC' },
    { id: 'mena', name: 'MENA' },
    { id: 'europe', name: 'Europe' },
    { id: 'asia', name: 'Asia' },
  ];

  const countries = [
    {
      id: '1',
      name: 'United Arab Emirates',
      code: 'AE',
      region: 'GCC',
      status: 'Active',
      users: 1247,
      projects: 89,
      revenue: 234500,
      currency: 'AED',
      language: 'Arabic',
      compliance: 95,
      launchDate: '2024-01-15',
      lastUpdate: '2024-01-25',
    },
    {
      id: '2',
      name: 'Qatar',
      code: 'QA',
      region: 'GCC',
      status: 'Active',
      users: 892,
      projects: 56,
      revenue: 189300,
      currency: 'QAR',
      language: 'Arabic',
      compliance: 92,
      launchDate: '2024-01-20',
      lastUpdate: '2024-01-25',
    },
    {
      id: '3',
      name: 'Kuwait',
      code: 'KW',
      region: 'GCC',
      status: 'Beta',
      users: 456,
      projects: 23,
      revenue: 67800,
      currency: 'KWD',
      language: 'Arabic',
      compliance: 88,
      launchDate: '2024-01-25',
      lastUpdate: '2024-01-25',
    },
    {
      id: '4',
      name: 'Egypt',
      code: 'EG',
      region: 'MENA',
      status: 'Planning',
      users: 0,
      projects: 0,
      revenue: 0,
      currency: 'EGP',
      language: 'Arabic',
      compliance: 0,
      launchDate: '2024-03-01',
      lastUpdate: '2024-01-25',
    },
    {
      id: '5',
      name: 'United Kingdom',
      code: 'GB',
      region: 'Europe',
      status: 'Planning',
      users: 0,
      projects: 0,
      revenue: 0,
      currency: 'GBP',
      language: 'English',
      compliance: 0,
      launchDate: '2024-06-01',
      lastUpdate: '2024-01-25',
    },
  ];

  const complianceRequirements = [
    {
      id: '1',
      country: 'United Arab Emirates',
      requirement: 'Data Protection Law',
      status: 'Compliant',
      lastAudit: '2024-01-20',
      nextAudit: '2024-07-20',
      documents: 12,
      score: 95,
    },
    {
      id: '2',
      country: 'Qatar',
      requirement: 'Personal Data Protection Law',
      status: 'Compliant',
      lastAudit: '2024-01-18',
      nextAudit: '2024-07-18',
      documents: 10,
      score: 92,
    },
    {
      id: '3',
      country: 'Kuwait',
      requirement: 'Privacy Protection Law',
      status: 'In Progress',
      lastAudit: '2024-01-15',
      nextAudit: '2024-04-15',
      documents: 8,
      score: 88,
    },
    {
      id: '4',
      country: 'Egypt',
      requirement: 'Data Protection Law',
      status: 'Pending',
      lastAudit: null,
      nextAudit: '2024-03-01',
      documents: 0,
      score: 0,
    },
  ];

  const currencies = [
    {
      id: '1',
      code: 'SAR',
      name: 'Saudi Riyal',
      symbol: 'ر.س',
      rate: 1.0000,
      status: 'Active',
      lastUpdate: '2024-01-25 14:30:00',
      change: 0.0000,
    },
    {
      id: '2',
      code: 'AED',
      name: 'UAE Dirham',
      symbol: 'د.إ',
      rate: 0.9800,
      status: 'Active',
      lastUpdate: '2024-01-25 14:30:00',
      change: +0.0012,
    },
    {
      id: '3',
      code: 'QAR',
      name: 'Qatari Riyal',
      symbol: 'ر.ق',
      rate: 0.9200,
      status: 'Active',
      lastUpdate: '2024-01-25 14:30:00',
      change: -0.0008,
    },
    {
      id: '4',
      code: 'KWD',
      name: 'Kuwaiti Dinar',
      symbol: 'د.ك',
      rate: 12.1500,
      status: 'Active',
      lastUpdate: '2024-01-25 14:30:00',
      change: +0.0025,
    },
    {
      id: '5',
      code: 'EGP',
      name: 'Egyptian Pound',
      symbol: 'ج.م',
      rate: 0.0833,
      status: 'Pending',
      lastUpdate: null,
      change: 0.0000,
    },
    {
      id: '6',
      code: 'GBP',
      name: 'British Pound',
      symbol: '£',
      rate: 0.2100,
      status: 'Pending',
      lastUpdate: null,
      change: 0.0000,
    },
  ];

  const localizationData = [
    {
      id: '1',
      language: 'Arabic',
      code: 'ar',
      status: 'Complete',
      translated: 95,
      total: 100,
      lastUpdate: '2024-01-25',
      translator: 'Ahmed Al-Rashid',
    },
    {
      id: '2',
      language: 'English',
      code: 'en',
      status: 'Complete',
      translated: 100,
      total: 100,
      lastUpdate: '2024-01-20',
      translator: 'Sarah Al-Mansouri',
    },
    {
      id: '3',
      language: 'French',
      code: 'fr',
      status: 'In Progress',
      translated: 67,
      total: 100,
      lastUpdate: '2024-01-24',
      translator: 'Omar Al-Zahrani',
    },
    {
      id: '4',
      language: 'German',
      code: 'de',
      status: 'Pending',
      translated: 0,
      total: 100,
      lastUpdate: null,
      translator: 'Not Assigned',
    },
  ];

  const TabButton = ({ tab }: { tab: any }) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        selectedTab === tab.id && styles.tabButtonSelected
      ]}
      onPress={() => setSelectedTab(tab.id)}
    >
      <Ionicons 
        name={tab.icon as any} 
        size={20} 
        color={selectedTab === tab.id ? '#ffffff' : '#007bff'} 
      />
      <Text style={[
        styles.tabButtonText,
        selectedTab === tab.id && styles.tabButtonTextSelected
      ]}>
        {tab.name}
      </Text>
    </TouchableOpacity>
  );

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
    </TouchableOpacity>
  );

  const CountryItem = ({ country }: { country: any }) => (
    <View style={styles.countryItem}>
      <View style={styles.countryHeader}>
        <View style={styles.countryInfo}>
          <Text style={styles.countryName}>{country.name}</Text>
          <Text style={styles.countryCode}>{country.code}</Text>
          <Text style={styles.countryRegion}>{country.region}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: country.status === 'Active' ? '#28a745' : 
                           country.status === 'Beta' ? '#ffc107' : '#dc3545'
          }
        ]}>
          <Text style={styles.statusText}>{country.status}</Text>
        </View>
      </View>
      
      <View style={styles.countryStats}>
        <View style={styles.countryStat}>
          <Text style={styles.countryStatValue}>{country.users.toLocaleString()}</Text>
          <Text style={styles.countryStatLabel}>Users</Text>
        </View>
        <View style={styles.countryStat}>
          <Text style={styles.countryStatValue}>{country.projects}</Text>
          <Text style={styles.countryStatLabel}>Projects</Text>
        </View>
        <View style={styles.countryStat}>
          <Text style={styles.countryStatValue}>
            {country.currency} {country.revenue.toLocaleString()}
          </Text>
          <Text style={styles.countryStatLabel}>Revenue</Text>
        </View>
        <View style={styles.countryStat}>
          <Text style={styles.countryStatValue}>{country.compliance}%</Text>
          <Text style={styles.countryStatLabel}>Compliance</Text>
        </View>
      </View>

      <View style={styles.countryMeta}>
        <Text style={styles.countryMetaText}>
          Language: {country.language}
        </Text>
        <Text style={styles.countryMetaText}>
          Launch: {country.launchDate}
        </Text>
        <Text style={styles.countryMetaText}>
          Updated: {country.lastUpdate}
        </Text>
      </View>
    </View>
  );

  const ComplianceItem = ({ compliance }: { compliance: any }) => (
    <View style={styles.complianceItem}>
      <View style={styles.complianceHeader}>
        <Text style={styles.complianceCountry}>{compliance.country}</Text>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: compliance.status === 'Compliant' ? '#28a745' : 
                           compliance.status === 'In Progress' ? '#ffc107' : '#dc3545'
          }
        ]}>
          <Text style={styles.statusText}>{compliance.status}</Text>
        </View>
      </View>
      
      <Text style={styles.complianceRequirement}>{compliance.requirement}</Text>
      
      <View style={styles.complianceStats}>
        <View style={styles.complianceStat}>
          <Text style={styles.complianceStatValue}>{compliance.score}%</Text>
          <Text style={styles.complianceStatLabel}>Score</Text>
        </View>
        <View style={styles.complianceStat}>
          <Text style={styles.complianceStatValue}>{compliance.documents}</Text>
          <Text style={styles.complianceStatLabel}>Documents</Text>
        </View>
        <View style={styles.complianceStat}>
          <Text style={styles.complianceStatValue}>
            {compliance.lastAudit || 'N/A'}
          </Text>
          <Text style={styles.complianceStatLabel}>Last Audit</Text>
        </View>
        <View style={styles.complianceStat}>
          <Text style={styles.complianceStatValue}>{compliance.nextAudit}</Text>
          <Text style={styles.complianceStatLabel}>Next Audit</Text>
        </View>
      </View>
    </View>
  );

  const CurrencyItem = ({ currency }: { currency: any }) => (
    <View style={styles.currencyItem}>
      <View style={styles.currencyHeader}>
        <View style={styles.currencyInfo}>
          <Text style={styles.currencyCode}>{currency.code}</Text>
          <Text style={styles.currencyName}>{currency.name}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: currency.status === 'Active' ? '#28a745' : '#ffc107'
          }
        ]}>
          <Text style={styles.statusText}>{currency.status}</Text>
        </View>
      </View>
      
      <View style={styles.currencyStats}>
        <View style={styles.currencyStat}>
          <Text style={styles.currencyStatValue}>{currency.symbol}</Text>
          <Text style={styles.currencyStatLabel}>Symbol</Text>
        </View>
        <View style={styles.currencyStat}>
          <Text style={styles.currencyStatValue}>{currency.rate.toFixed(4)}</Text>
          <Text style={styles.currencyStatLabel}>Rate</Text>
        </View>
        <View style={styles.currencyStat}>
          <Text style={[
            styles.currencyChangeText,
            { color: currency.change > 0 ? '#28a745' : currency.change < 0 ? '#dc3545' : '#cccccc' }
          ]}>
            {currency.change > 0 ? '+' : ''}{currency.change.toFixed(4)}
          </Text>
          <Text style={styles.currencyStatLabel}>Change</Text>
        </View>
      </View>

      <Text style={styles.currencyLastUpdate}>
        Last Update: {currency.lastUpdate || 'Not Available'}
      </Text>
    </View>
  );

  const LocalizationItem = ({ localization }: { localization: any }) => (
    <View style={styles.localizationItem}>
      <View style={styles.localizationHeader}>
        <View style={styles.localizationInfo}>
          <Text style={styles.localizationLanguage}>{localization.language}</Text>
          <Text style={styles.localizationCode}>({localization.code})</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: localization.status === 'Complete' ? '#28a745' : 
                           localization.status === 'In Progress' ? '#ffc107' : '#dc3545'
          }
        ]}>
          <Text style={styles.statusText}>{localization.status}</Text>
        </View>
      </View>
      
      <View style={styles.localizationProgress}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${localization.translated}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {localization.translated}/{localization.total} ({localization.translated}%)
        </Text>
      </View>

      <View style={styles.localizationMeta}>
        <Text style={styles.localizationMetaText}>
          Translator: {localization.translator}
        </Text>
        <Text style={styles.localizationMetaText}>
          Last Update: {localization.lastUpdate || 'Not Available'}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Global Expansion</Text>
      <Text style={styles.subtitle}>
        Manage multi-country expansion (currencies, compliance)
      </Text>

      <View style={styles.tabsCard}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tabsContainer}>
            {tabs.map((tab) => (
              <TabButton key={tab.id} tab={tab} />
            ))}
          </View>
        </ScrollView>
      </View>

      {selectedTab === 'countries' && (
        <View style={styles.countriesCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Country Markets</Text>
            <View style={styles.regionFilter}>
              {regions.map((region) => (
                <RegionButton key={region.id} region={region} />
              ))}
            </View>
          </View>
          {countries.map((country) => (
            <CountryItem key={country.id} country={country} />
          ))}
        </View>
      )}

      {selectedTab === 'compliance' && (
        <View style={styles.complianceCard}>
          <Text style={styles.cardTitle}>Compliance Requirements</Text>
          {complianceRequirements.map((compliance) => (
            <ComplianceItem key={compliance.id} compliance={compliance} />
          ))}
        </View>
      )}

      {selectedTab === 'currencies' && (
        <View style={styles.currenciesCard}>
          <Text style={styles.cardTitle}>Currency Management</Text>
          {currencies.map((currency) => (
            <CurrencyItem key={currency.id} currency={currency} />
          ))}
        </View>
      )}

      {selectedTab === 'localization' && (
        <View style={styles.localizationCard}>
          <Text style={styles.cardTitle}>Language Localization</Text>
          {localizationData.map((localization) => (
            <LocalizationItem key={localization.id} localization={localization} />
          ))}
        </View>
      )}

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add" size={24} color="#007bff" />
            <Text style={styles.actionText}>Add Country</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="shield-checkmark" size={24} color="#28a745" />
            <Text style={styles.actionText}>Compliance Check</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="refresh" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Update Rates</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="language" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Translate</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Global expansion management handles multi-country operations including 
          compliance requirements, currency management, and localization for international markets.
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
  tabsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
  },
  tabButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    minWidth: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonSelected: {
    backgroundColor: '#007bff',
  },
  tabButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  tabButtonTextSelected: {
    color: '#ffffff',
  },
  countriesCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  regionFilter: {
    flexDirection: 'row',
  },
  regionButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 6,
    padding: 6,
    marginLeft: 5,
  },
  regionButtonSelected: {
    backgroundColor: '#007bff',
  },
  regionButtonText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  regionButtonTextSelected: {
    color: '#ffffff',
  },
  countryItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  countryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  countryInfo: {
    flex: 1,
  },
  countryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  countryCode: {
    fontSize: 14,
    color: '#007bff',
    marginBottom: 2,
  },
  countryRegion: {
    fontSize: 12,
    color: '#cccccc',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  countryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  countryStat: {
    alignItems: 'center',
  },
  countryStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
  },
  countryStatLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  countryMeta: {
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  countryMetaText: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 2,
  },
  complianceCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  complianceItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  complianceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  complianceCountry: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  complianceRequirement: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 10,
  },
  complianceStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  complianceStat: {
    alignItems: 'center',
  },
  complianceStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
  },
  complianceStatLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  currenciesCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  currencyItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  currencyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  currencyInfo: {
    flex: 1,
  },
  currencyCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  currencyName: {
    fontSize: 14,
    color: '#cccccc',
  },
  currencyStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  currencyStat: {
    alignItems: 'center',
  },
  currencyStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
  },
  currencyStatLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  currencyChangeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  currencyLastUpdate: {
    fontSize: 12,
    color: '#cccccc',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  localizationCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  localizationItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  localizationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  localizationInfo: {
    flex: 1,
  },
  localizationLanguage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  localizationCode: {
    fontSize: 14,
    color: '#007bff',
  },
  localizationProgress: {
    marginBottom: 10,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#555555',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: 3,
  },
  progressText: {
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'center',
  },
  localizationMeta: {
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  localizationMetaText: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 2,
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

export default GlobalExpansionScreen;
