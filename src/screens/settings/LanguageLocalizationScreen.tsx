import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LanguageLocalizationScreen: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedCalendar, setSelectedCalendar] = useState('gregorian');
  const [selectedCurrency, setSelectedCurrency] = useState('SAR');
  const [selectedDateFormat, setSelectedDateFormat] = useState('dd/mm/yyyy');
  const [selectedTimeFormat, setSelectedTimeFormat] = useState('24h');

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  ];

  const calendars = [
    { code: 'gregorian', name: 'Gregorian', description: 'Standard international calendar' },
    { code: 'hijri', name: 'Hijri', description: 'Islamic calendar' },
    { code: 'persian', name: 'Persian', description: 'Persian calendar' },
  ];

  const currencies = [
    { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س' },
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
  ];

  const dateFormats = [
    { code: 'dd/mm/yyyy', name: 'DD/MM/YYYY', example: '25/01/2024' },
    { code: 'mm/dd/yyyy', name: 'MM/DD/YYYY', example: '01/25/2024' },
    { code: 'yyyy-mm-dd', name: 'YYYY-MM-DD', example: '2024-01-25' },
    { code: 'dd-mmm-yyyy', name: 'DD MMM YYYY', example: '25 Jan 2024' },
  ];

  const timeFormats = [
    { code: '12h', name: '12 Hour', example: '2:30 PM' },
    { code: '24h', name: '24 Hour', example: '14:30' },
  ];

  const LanguageOption = ({ language }: { language: any }) => (
    <TouchableOpacity
      style={[
        styles.languageOption,
        selectedLanguage === language.code && styles.languageOptionSelected
      ]}
      onPress={() => setSelectedLanguage(language.code)}
    >
      <View style={styles.languageContent}>
        <Text style={styles.flag}>{language.flag}</Text>
        <View style={styles.languageInfo}>
          <Text style={[
            styles.languageName,
            selectedLanguage === language.code && styles.languageNameSelected
          ]}>
            {language.name}
          </Text>
          <Text style={styles.languageNative}>{language.nativeName}</Text>
        </View>
        {selectedLanguage === language.code && (
          <Ionicons name="checkmark-circle" size={24} color="#007bff" />
        )}
      </View>
    </TouchableOpacity>
  );

  const CalendarOption = ({ calendar }: { calendar: any }) => (
    <TouchableOpacity
      style={[
        styles.option,
        selectedCalendar === calendar.code && styles.optionSelected
      ]}
      onPress={() => setSelectedCalendar(calendar.code)}
    >
      <View style={styles.optionContent}>
        <Text style={[
          styles.optionName,
          selectedCalendar === calendar.code && styles.optionNameSelected
        ]}>
          {calendar.name}
        </Text>
        <Text style={styles.optionDescription}>{calendar.description}</Text>
      </View>
      {selectedCalendar === calendar.code && (
        <Ionicons name="checkmark-circle" size={24} color="#007bff" />
      )}
    </TouchableOpacity>
  );

  const CurrencyOption = ({ currency }: { currency: any }) => (
    <TouchableOpacity
      style={[
        styles.option,
        selectedCurrency === currency.code && styles.optionSelected
      ]}
      onPress={() => setSelectedCurrency(currency.code)}
    >
      <View style={styles.optionContent}>
        <Text style={[
          styles.optionName,
          selectedCurrency === currency.code && styles.optionNameSelected
        ]}>
          {currency.name}
        </Text>
        <Text style={styles.optionSymbol}>{currency.symbol}</Text>
      </View>
      {selectedCurrency === currency.code && (
        <Ionicons name="checkmark-circle" size={24} color="#007bff" />
      )}
    </TouchableOpacity>
  );

  const DateFormatOption = ({ format }: { format: any }) => (
    <TouchableOpacity
      style={[
        styles.option,
        selectedDateFormat === format.code && styles.optionSelected
      ]}
      onPress={() => setSelectedDateFormat(format.code)}
    >
      <View style={styles.optionContent}>
        <Text style={[
          styles.optionName,
          selectedDateFormat === format.code && styles.optionNameSelected
        ]}>
          {format.name}
        </Text>
        <Text style={styles.optionExample}>{format.example}</Text>
      </View>
      {selectedDateFormat === format.code && (
        <Ionicons name="checkmark-circle" size={24} color="#007bff" />
      )}
    </TouchableOpacity>
  );

  const TimeFormatOption = ({ format }: { format: any }) => (
    <TouchableOpacity
      style={[
        styles.option,
        selectedTimeFormat === format.code && styles.optionSelected
      ]}
      onPress={() => setSelectedTimeFormat(format.code)}
    >
      <View style={styles.optionContent}>
        <Text style={[
          styles.optionName,
          selectedTimeFormat === format.code && styles.optionNameSelected
        ]}>
          {format.name}
        </Text>
        <Text style={styles.optionExample}>{format.example}</Text>
      </View>
      {selectedTimeFormat === format.code && (
        <Ionicons name="checkmark-circle" size={24} color="#007bff" />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Language & Localization</Text>
      <Text style={styles.subtitle}>
        Customize language, calendar, currency, and date/time formats
      </Text>

      <View style={styles.languageCard}>
        <Text style={styles.cardTitle}>Language</Text>
        <Text style={styles.cardDescription}>
          Choose your preferred language for the app interface
        </Text>
        {languages.map((language) => (
          <LanguageOption key={language.code} language={language} />
        ))}
      </View>

      <View style={styles.calendarCard}>
        <Text style={styles.cardTitle}>Calendar Type</Text>
        <Text style={styles.cardDescription}>
          Select the calendar system for date display
        </Text>
        {calendars.map((calendar) => (
          <CalendarOption key={calendar.code} calendar={calendar} />
        ))}
      </View>

      <View style={styles.currencyCard}>
        <Text style={styles.cardTitle}>Currency</Text>
        <Text style={styles.cardDescription}>
          Set the default currency for financial displays
        </Text>
        {currencies.map((currency) => (
          <CurrencyOption key={currency.code} currency={currency} />
        ))}
      </View>

      <View style={styles.dateFormatCard}>
        <Text style={styles.cardTitle}>Date Format</Text>
        <Text style={styles.cardDescription}>
          Choose how dates are displayed throughout the app
        </Text>
        {dateFormats.map((format) => (
          <DateFormatOption key={format.code} format={format} />
        ))}
      </View>

      <View style={styles.timeFormatCard}>
        <Text style={styles.cardTitle}>Time Format</Text>
        <Text style={styles.cardDescription}>
          Select 12-hour or 24-hour time display
        </Text>
        {timeFormats.map((format) => (
          <TimeFormatOption key={format.code} format={format} />
        ))}
      </View>

      <View style={styles.previewCard}>
        <Text style={styles.cardTitle}>Localization Preview</Text>
        <View style={styles.previewContainer}>
          <View style={styles.previewItem}>
            <Text style={styles.previewLabel}>Language:</Text>
            <Text style={styles.previewValue}>
              {languages.find(l => l.code === selectedLanguage)?.name}
            </Text>
          </View>
          <View style={styles.previewItem}>
            <Text style={styles.previewLabel}>Calendar:</Text>
            <Text style={styles.previewValue}>
              {calendars.find(c => c.code === selectedCalendar)?.name}
            </Text>
          </View>
          <View style={styles.previewItem}>
            <Text style={styles.previewLabel}>Currency:</Text>
            <Text style={styles.previewValue}>
              {currencies.find(c => c.code === selectedCurrency)?.name} ({currencies.find(c => c.code === selectedCurrency)?.symbol})
            </Text>
          </View>
          <View style={styles.previewItem}>
            <Text style={styles.previewLabel}>Date Format:</Text>
            <Text style={styles.previewValue}>
              {dateFormats.find(f => f.code === selectedDateFormat)?.example}
            </Text>
          </View>
          <View style={styles.previewItem}>
            <Text style={styles.previewLabel}>Time Format:</Text>
            <Text style={styles.previewValue}>
              {timeFormats.find(f => f.code === selectedTimeFormat)?.example}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="refresh" size={24} color="#007bff" />
            <Text style={styles.actionText}>Reset to Default</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="save" size={24} color="#28a745" />
            <Text style={styles.actionText}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="test-tube" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Test Settings</Text>
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
          Localization settings affect how dates, times, currencies, and text are displayed 
          throughout the app. Changes are applied immediately.
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
  languageCard: {
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
  languageOption: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  languageOptionSelected: {
    borderColor: '#007bff',
    backgroundColor: '#1a1a2e',
  },
  languageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  flag: {
    fontSize: 24,
    marginRight: 15,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  languageNameSelected: {
    color: '#007bff',
  },
  languageNative: {
    fontSize: 14,
    color: '#cccccc',
  },
  calendarCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  currencyCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  dateFormatCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  timeFormatCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  option: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  optionSelected: {
    borderColor: '#007bff',
    backgroundColor: '#1a1a2e',
  },
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  optionName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  optionNameSelected: {
    color: '#007bff',
  },
  optionDescription: {
    fontSize: 14,
    color: '#cccccc',
  },
  optionSymbol: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: 'bold',
  },
  optionExample: {
    fontSize: 14,
    color: '#cccccc',
  },
  previewCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  previewContainer: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
  },
  previewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  previewLabel: {
    fontSize: 14,
    color: '#cccccc',
  },
  previewValue: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',
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

export default LanguageLocalizationScreen;
