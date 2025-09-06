import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AccessibilitySettingsScreen: React.FC = () => {
  const [fontScaling, setFontScaling] = useState(1.0);
  const [highContrast, setHighContrast] = useState(false);
  const [voiceCommands, setVoiceCommands] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [colorBlindSupport, setColorBlindSupport] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [buttonSizing, setButtonSizing] = useState('normal');

  const fontSizes = [
    { label: 'Small', value: 0.8 },
    { label: 'Normal', value: 1.0 },
    { label: 'Large', value: 1.2 },
    { label: 'Extra Large', value: 1.4 },
    { label: 'Huge', value: 1.6 },
  ];

  const buttonSizes = [
    { label: 'Small', value: 'small' },
    { label: 'Normal', value: 'normal' },
    { label: 'Large', value: 'large' },
    { label: 'Extra Large', value: 'xlarge' },
  ];

  const FontSizeOption = ({ size }: { size: any }) => (
    <TouchableOpacity
      style={[
        styles.fontSizeOption,
        fontScaling === size.value && styles.fontSizeOptionSelected
      ]}
      onPress={() => setFontScaling(size.value)}
    >
      <Text style={[
        styles.fontSizeText,
        { fontSize: 14 * size.value },
        fontScaling === size.value && styles.fontSizeTextSelected
      ]}>
        {size.label}
      </Text>
    </TouchableOpacity>
  );

  const ButtonSizeOption = ({ size }: { size: any }) => (
    <TouchableOpacity
      style={[
        styles.buttonSizeOption,
        buttonSizing === size.value && styles.buttonSizeOptionSelected
      ]}
      onPress={() => setButtonSizing(size.value)}
    >
      <View style={[
        styles.buttonPreview,
        size.value === 'small' && styles.buttonSmall,
        size.value === 'normal' && styles.buttonNormal,
        size.value === 'large' && styles.buttonLarge,
        size.value === 'xlarge' && styles.buttonXLarge,
      ]}>
        <Text style={[
          styles.buttonPreviewText,
          size.value === 'small' && styles.buttonTextSmall,
          size.value === 'normal' && styles.buttonTextNormal,
          size.value === 'large' && styles.buttonTextLarge,
          size.value === 'xlarge' && styles.buttonTextXLarge,
        ]}>
          Sample Button
        </Text>
      </View>
      <Text style={styles.buttonSizeLabel}>{size.label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Accessibility Settings</Text>
      <Text style={styles.subtitle}>
        Customize the app for better accessibility and usability
      </Text>

      <View style={styles.fontSizeCard}>
        <Text style={styles.cardTitle}>Font Scaling</Text>
        <Text style={styles.cardDescription}>
          Adjust text size for better readability
        </Text>
        <View style={styles.fontSizeOptions}>
          {fontSizes.map((size, index) => (
            <FontSizeOption key={index} size={size} />
          ))}
        </View>
        <View style={styles.previewText}>
          <Text style={[styles.previewTextContent, { fontSize: 16 * fontScaling }]}>
            This is how text will appear with your current font scaling setting.
          </Text>
        </View>
      </View>

      <View style={styles.visualCard}>
        <Text style={styles.cardTitle}>Visual Accessibility</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>High Contrast</Text>
            <Text style={styles.settingDescription}>
              Increase contrast for better visibility
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={highContrast ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setHighContrast}
            value={highContrast}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Color Blind Support</Text>
            <Text style={styles.settingDescription}>
              Use color-blind friendly color schemes
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={colorBlindSupport ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setColorBlindSupport}
            value={colorBlindSupport}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Large Text</Text>
            <Text style={styles.settingDescription}>
              Use larger text throughout the app
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={largeText ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setLargeText}
            value={largeText}
          />
        </View>
      </View>

      <View style={styles.interactionCard}>
        <Text style={styles.cardTitle}>Interaction & Motion</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Screen Reader</Text>
            <Text style={styles.settingDescription}>
              Optimize for screen reader compatibility
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={screenReader ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setScreenReader}
            value={screenReader}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Voice Commands</Text>
            <Text style={styles.settingDescription}>
              Enable voice control for app navigation
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={voiceCommands ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setVoiceCommands}
            value={voiceCommands}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Reduce Motion</Text>
            <Text style={styles.settingDescription}>
              Minimize animations and transitions
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={reducedMotion ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setReducedMotion}
            value={reducedMotion}
          />
        </View>
      </View>

      <View style={styles.buttonSizeCard}>
        <Text style={styles.cardTitle}>Button Sizing</Text>
        <Text style={styles.cardDescription}>
          Choose button size for easier interaction
        </Text>
        <View style={styles.buttonSizeOptions}>
          {buttonSizes.map((size, index) => (
            <ButtonSizeOption key={index} size={size} />
          ))}
        </View>
      </View>

      <View style={styles.previewCard}>
        <Text style={styles.cardTitle}>Accessibility Preview</Text>
        <View style={styles.previewContainer}>
          <View style={[
            styles.previewCard,
            highContrast && styles.highContrastCard,
            colorBlindSupport && styles.colorBlindCard
          ]}>
            <Text style={[
              styles.previewTitle,
              { fontSize: 18 * fontScaling }
            ]}>
              Sample Card
            </Text>
            <Text style={[
              styles.previewDescription,
              { fontSize: 14 * fontScaling }
            ]}>
              This shows how content will appear with your accessibility settings.
            </Text>
            <TouchableOpacity style={[
              styles.previewButton,
              buttonSizing === 'small' && styles.buttonSmall,
              buttonSizing === 'normal' && styles.buttonNormal,
              buttonSizing === 'large' && styles.buttonLarge,
              buttonSizing === 'xlarge' && styles.buttonXLarge,
            ]}>
              <Text style={[
                styles.previewButtonText,
                buttonSizing === 'small' && styles.buttonTextSmall,
                buttonSizing === 'normal' && styles.buttonTextNormal,
                buttonSizing === 'large' && styles.buttonTextLarge,
                buttonSizing === 'xlarge' && styles.buttonTextXLarge,
              ]}>
                Sample Button
              </Text>
            </TouchableOpacity>
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
            <Ionicons name="test-tube" size={24} color="#28a745" />
            <Text style={styles.actionText}>Test Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="save" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Save Changes</Text>
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
          Accessibility settings make the app usable for everyone. Changes are applied 
          immediately and can be customized based on your specific needs.
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
  fontSizeCard: {
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
  fontSizeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  fontSizeOption: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    width: '30%',
    alignItems: 'center',
  },
  fontSizeOptionSelected: {
    backgroundColor: '#007bff',
  },
  fontSizeText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  fontSizeTextSelected: {
    color: '#ffffff',
  },
  previewText: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
  },
  previewTextContent: {
    color: '#ffffff',
    lineHeight: 24,
  },
  visualCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  settingDescription: {
    fontSize: 14,
    color: '#cccccc',
  },
  interactionCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  buttonSizeCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  buttonSizeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  buttonSizeOption: {
    alignItems: 'center',
    marginBottom: 15,
    width: '48%',
  },
  buttonSizeOptionSelected: {
    backgroundColor: '#1a1a2e',
    borderRadius: 8,
    padding: 10,
  },
  buttonPreview: {
    backgroundColor: '#007bff',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  buttonSmall: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  buttonNormal: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonLarge: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonXLarge: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  buttonPreviewText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonTextSmall: {
    fontSize: 12,
  },
  buttonTextNormal: {
    fontSize: 14,
  },
  buttonTextLarge: {
    fontSize: 16,
  },
  buttonTextXLarge: {
    fontSize: 18,
  },
  buttonSizeLabel: {
    fontSize: 12,
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
  highContrastCard: {
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  colorBlindCard: {
    backgroundColor: '#2a2a2a',
  },
  previewTitle: {
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  previewDescription: {
    color: '#cccccc',
    marginBottom: 15,
    lineHeight: 20,
  },
  previewButton: {
    backgroundColor: '#007bff',
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  previewButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
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

export default AccessibilitySettingsScreen;
