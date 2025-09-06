import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WhiteLabelCustomizationScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('branding');

  const brandingSettings = {
    logo: 'https://example.com/logo.png',
    primaryColor: '#007bff',
    secondaryColor: '#28a745',
    accentColor: '#ffc107',
    fontFamily: 'Inter',
    companyName: 'NBCON Pro',
    tagline: 'Engineering Excellence',
  };

  const customizationOptions = [
    {
      id: '1',
      name: 'Logo Upload',
      description: 'Upload your company logo',
      type: 'image',
      value: 'logo.png',
    },
    {
      id: '2',
      name: 'Primary Color',
      description: 'Main brand color',
      type: 'color',
      value: '#007bff',
    },
    {
      id: '3',
      name: 'Secondary Color',
      description: 'Secondary brand color',
      type: 'color',
      value: '#28a745',
    },
    {
      id: '4',
      name: 'Font Family',
      description: 'Typography style',
      type: 'select',
      value: 'Inter',
    },
    {
      id: '5',
      name: 'Company Name',
      description: 'Display name',
      type: 'text',
      value: 'NBCON Pro',
    },
    {
      id: '6',
      name: 'Tagline',
      description: 'Company tagline',
      type: 'text',
      value: 'Engineering Excellence',
    },
  ];

  const TabButton = ({ tab, label }: { tab: string; label: string }) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        selectedTab === tab && styles.tabButtonActive
      ]}
      onPress={() => setSelectedTab(tab)}
    >
      <Text style={[
        styles.tabButtonText,
        selectedTab === tab && styles.tabButtonTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const CustomizationOption = ({ option }: { option: any }) => (
    <View style={styles.optionCard}>
      <View style={styles.optionHeader}>
        <View style={styles.optionInfo}>
          <Text style={styles.optionName}>{option.name}</Text>
          <Text style={styles.optionDescription}>{option.description}</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create" size={16} color="#007bff" />
        </TouchableOpacity>
      </View>

      <View style={styles.optionValue}>
        {option.type === 'color' && (
          <View style={styles.colorPreview}>
            <View style={[styles.colorSwatch, { backgroundColor: option.value }]} />
            <Text style={styles.colorValue}>{option.value}</Text>
          </View>
        )}
        {option.type === 'image' && (
          <View style={styles.imagePreview}>
            <Ionicons name="image" size={24} color="#6c757d" />
            <Text style={styles.imageText}>{option.value}</Text>
          </View>
        )}
        {option.type === 'text' && (
          <Text style={styles.textValue}>{option.value}</Text>
        )}
        {option.type === 'select' && (
          <View style={styles.selectValue}>
            <Text style={styles.selectText}>{option.value}</Text>
            <Ionicons name="chevron-down" size={16} color="#cccccc" />
          </View>
        )}
      </View>
    </View>
  );

  const PreviewCard = () => (
    <View style={styles.previewCard}>
      <Text style={styles.previewTitle}>Live Preview</Text>
      <View style={styles.previewContent}>
        <View style={styles.previewHeader}>
          <View style={styles.previewLogo}>
            <Text style={styles.logoText}>LOGO</Text>
          </View>
          <Text style={styles.previewCompanyName}>{brandingSettings.companyName}</Text>
        </View>
        <Text style={styles.previewTagline}>{brandingSettings.tagline}</Text>
        <View style={styles.previewButtons}>
          <View style={[styles.previewButton, { backgroundColor: brandingSettings.primaryColor }]}>
            <Text style={styles.previewButtonText}>Primary Button</Text>
          </View>
          <View style={[styles.previewButton, { backgroundColor: brandingSettings.secondaryColor }]}>
            <Text style={styles.previewButtonText}>Secondary Button</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>White Label Customization</Text>
      <Text style={styles.subtitle}>
        Customize the app with your company branding and colors
      </Text>

      <View style={styles.tabContainer}>
        <TabButton tab="branding" label="Branding" />
        <TabButton tab="colors" label="Colors" />
        <TabButton tab="preview" label="Preview" />
      </View>

      {selectedTab === 'branding' && (
        <View style={styles.brandingContainer}>
          <Text style={styles.sectionTitle}>Branding Settings</Text>
          {customizationOptions.slice(0, 3).map((option) => (
            <CustomizationOption key={option.id} option={option} />
          ))}
        </View>
      )}

      {selectedTab === 'colors' && (
        <View style={styles.colorsContainer}>
          <Text style={styles.sectionTitle}>Color Scheme</Text>
          {customizationOptions.slice(1, 4).map((option) => (
            <CustomizationOption key={option.id} option={option} />
          ))}
        </View>
      )}

      {selectedTab === 'preview' && (
        <View style={styles.previewContainer}>
          <PreviewCard />
        </View>
      )}

      <View style={styles.customizationOptions}>
        <Text style={styles.sectionTitle}>All Customization Options</Text>
        {customizationOptions.map((option) => (
          <CustomizationOption key={option.id} option={option} />
        ))}
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download" size={24} color="#007bff" />
            <Text style={styles.actionText}>Export Theme</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="cloud-upload" size={24} color="#28a745" />
            <Text style={styles.actionText}>Import Theme</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="refresh" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Reset to Default</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="save" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          White label customization allows enterprises to brand the app with their own identity. 
          Changes are applied across all user interfaces and can be previewed in real-time.
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  tabButtonActive: {
    backgroundColor: '#007bff',
  },
  tabButtonText: {
    color: '#cccccc',
    fontSize: 14,
    fontWeight: '500',
  },
  tabButtonTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  brandingContainer: {
    marginBottom: 20,
  },
  colorsContainer: {
    marginBottom: 20,
  },
  previewContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  optionCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  optionInfo: {
    flex: 1,
  },
  optionName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  optionDescription: {
    fontSize: 14,
    color: '#cccccc',
  },
  editButton: {
    padding: 8,
  },
  optionValue: {
    marginTop: 10,
  },
  colorPreview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorSwatch: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#3a3a3a',
  },
  colorValue: {
    fontSize: 14,
    color: '#ffffff',
    fontFamily: 'monospace',
  },
  imagePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    padding: 15,
    borderRadius: 8,
  },
  imageText: {
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 10,
  },
  textValue: {
    fontSize: 14,
    color: '#ffffff',
    backgroundColor: '#3a3a3a',
    padding: 10,
    borderRadius: 6,
  },
  selectValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    padding: 10,
    borderRadius: 6,
  },
  selectText: {
    fontSize: 14,
    color: '#ffffff',
  },
  previewCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  previewContent: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 20,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  previewLogo: {
    width: 40,
    height: 40,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  logoText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  previewCompanyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  previewTagline: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 20,
  },
  previewButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  previewButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  previewButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  customizationOptions: {
    marginBottom: 20,
  },
  quickActionsCard: {
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

export default WhiteLabelCustomizationScreen;
