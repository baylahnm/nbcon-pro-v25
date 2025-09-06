import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY } from '../../constants';

interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate: number;
  isActive: boolean;
}

interface MultiCurrencySupportScreenProps {
  onCurrencyChange: (currency: Currency) => void;
  onClose: () => void;
}

const MultiCurrencySupportScreen: React.FC<MultiCurrencySupportScreenProps> = ({
  onCurrencyChange,
  onClose,
}) => {
  const [currencies, setCurrencies] = useState<Currency[]>([
    { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س', rate: 1, isActive: true },
    { code: 'USD', name: 'US Dollar', symbol: '$', rate: 0.27, isActive: false },
    { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.24, isActive: false },
    { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.21, isActive: false },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', rate: 0.98, isActive: false },
    { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك', rate: 0.08, isActive: false },
    { code: 'QAR', name: 'Qatari Riyal', symbol: 'ر.ق', rate: 0.98, isActive: false },
    { code: 'BHD', name: 'Bahraini Dinar', symbol: 'د.ب', rate: 0.10, isActive: false },
  ]);

  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null);
  const [amount, setAmount] = useState('1000');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  useEffect(() => {
    if (selectedCurrency && amount) {
      const converted = parseFloat(amount) * selectedCurrency.rate;
      setConvertedAmount(converted);
    }
  }, [selectedCurrency, amount]);

  const fetchExchangeRates = async () => {
    try {
      // In a real app, this would fetch from an API
      // For now, we'll use mock data
      const mockRates = {
        USD: 0.27,
        EUR: 0.24,
        GBP: 0.21,
        AED: 0.98,
        KWD: 0.08,
        QAR: 0.98,
        BHD: 0.10,
      };

      setCurrencies(prev => prev.map(currency => ({
        ...currency,
        rate: mockRates[currency.code as keyof typeof mockRates] || currency.rate,
      })));

      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      Alert.alert('Error', 'Failed to fetch exchange rates');
    }
  };

  const selectCurrency = (currency: Currency) => {
    setSelectedCurrency(currency);
    setCurrencies(prev => prev.map(c => ({
      ...c,
      isActive: c.code === currency.code,
    })));
  };

  const handleCurrencyChange = () => {
    if (selectedCurrency) {
      onCurrencyChange(selectedCurrency);
      Alert.alert('Success', `Currency changed to ${selectedCurrency.name}`);
    }
  };

  const formatCurrency = (amount: number, currency: Currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.code,
    }).format(amount);
  };

  const renderCurrency = ({ item }: { item: Currency }) => (
    <TouchableOpacity
      style={[styles.currencyCard, item.isActive && styles.activeCurrencyCard]}
      onPress={() => selectCurrency(item)}
    >
      <View style={styles.currencyInfo}>
        <View style={styles.currencyHeader}>
          <Text style={[styles.currencyCode, item.isActive && styles.activeText]}>
            {item.code}
          </Text>
          <Text style={[styles.currencySymbol, item.isActive && styles.activeText]}>
            {item.symbol}
          </Text>
        </View>
        <Text style={[styles.currencyName, item.isActive && styles.activeText]}>
          {item.name}
        </Text>
        <Text style={[styles.exchangeRate, item.isActive && styles.activeText]}>
          1 SAR = {item.symbol}{item.rate.toFixed(4)}
        </Text>
      </View>
      
      {item.isActive && (
        <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Multi-Currency Support</Text>
        <TouchableOpacity onPress={handleCurrencyChange} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Currency Converter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Currency Converter</Text>
          
          <View style={styles.converterCard}>
            <View style={styles.converterInput}>
              <Text style={styles.converterLabel}>Amount in SAR</Text>
              <TextInput
                style={styles.converterTextInput}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholder="1000"
              />
            </View>
            
            <View style={styles.converterArrow}>
              <Ionicons name="arrow-down" size={24} color={COLORS.primary} />
            </View>
            
            <View style={styles.converterOutput}>
              <Text style={styles.converterLabel}>
                {selectedCurrency ? `Amount in ${selectedCurrency.code}` : 'Select Currency'}
              </Text>
              <Text style={styles.converterAmount}>
                {selectedCurrency ? formatCurrency(convertedAmount, selectedCurrency) : '--'}
              </Text>
            </View>
          </View>
        </View>

        {/* Available Currencies */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available Currencies</Text>
            <TouchableOpacity onPress={fetchExchangeRates} style={styles.refreshButton}>
              <Ionicons name="refresh" size={16} color={COLORS.primary} />
              <Text style={styles.refreshText}>Refresh</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={currencies}
            renderItem={renderCurrency}
            keyExtractor={(item) => item.code}
            scrollEnabled={false}
          />
        </View>

        {/* Exchange Rate Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exchange Rate Information</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="time" size={20} color={COLORS.primary} />
              <Text style={styles.infoText}>
                Last updated: {lastUpdated.toLocaleString()}
              </Text>
            </View>
            
            <View style={styles.infoRow}>
              <Ionicons name="information-circle" size={20} color={COLORS.primary} />
              <Text style={styles.infoText}>
                Rates are updated every 4 hours
              </Text>
            </View>
            
            <View style={styles.infoRow}>
              <Ionicons name="warning" size={20} color={COLORS.warning} />
              <Text style={styles.infoText}>
                Final conversion may include bank fees
              </Text>
            </View>
          </View>
        </View>

        {/* Currency Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Currency Features</Text>
          
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              <Text style={styles.featureText}>Real-time exchange rates</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              <Text style={styles.featureText}>Automatic currency conversion</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              <Text style={styles.featureText}>Multi-currency invoicing</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              <Text style={styles.featureText}>Payment in local currency</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              <Text style={styles.featureText}>Exchange rate history</Text>
            </View>
          </View>
        </View>

        {/* Supported Countries */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Supported Countries</Text>
          
          <View style={styles.countriesGrid}>
            {['Saudi Arabia', 'UAE', 'Kuwait', 'Qatar', 'Bahrain', 'Oman', 'USA', 'UK', 'Germany', 'France'].map((country) => (
              <View key={country} style={styles.countryItem}>
                <Ionicons name="globe" size={16} color={COLORS.primary} />
                <Text style={styles.countryText}>{country}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  closeButton: {
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  saveButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
  saveButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  converterCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  converterInput: {
    marginBottom: 15,
  },
  converterLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 8,
  },
  converterTextInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 15,
    fontSize: 18,
    color: COLORS.text,
    backgroundColor: COLORS.background,
    textAlign: 'center',
  },
  converterArrow: {
    alignItems: 'center',
    marginVertical: 10,
  },
  converterOutput: {
    marginTop: 15,
  },
  converterAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 8,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 6,
    gap: 5,
  },
  refreshText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '500',
  },
  currencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeCurrencyCard: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
  },
  currencyInfo: {
    flex: 1,
  },
  currencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  currencyCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginRight: 10,
  },
  currencySymbol: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  currencyName: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 5,
  },
  exchangeRate: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  activeText: {
    color: COLORS.primary,
  },
  infoCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    flex: 1,
  },
  featuresList: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  featureText: {
    fontSize: 14,
    color: COLORS.text,
    flex: 1,
  },
  countriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 5,
  },
  countryText: {
    fontSize: 12,
    color: COLORS.text,
  },
});

export default MultiCurrencySupportScreen;
