import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ThemeToggleScreen: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [autoSwitch, setAutoSwitch] = useState(true);
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [lightModeTime, setLightModeTime] = useState('07:00');
  const [darkModeTime, setDarkModeTime] = useState('19:00');

  const themes = [
    {
      id: 'light',
      name: 'Light Mode',
      description: 'Clean and bright interface',
      icon: 'sunny',
      colors: {
        background: '#ffffff',
        surface: '#f8f9fa',
        text: '#212529',
        accent: '#007bff',
      },
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      description: 'Easy on the eyes in low light',
      icon: 'moon',
      colors: {
        background: '#1a1a1a',
        surface: '#2a2a2a',
        text: '#ffffff',
        accent: '#007bff',
      },
    },
    {
      id: 'auto',
      name: 'Auto',
      description: 'Follows system settings',
      icon: 'phone-portrait',
      colors: {
        background: '#1a1a1a',
        surface: '#2a2a2a',
        text: '#ffffff',
        accent: '#007bff',
      },
    },
  ];

  const ThemePreview = ({ theme }: { theme: any }) => (
    <View style={[styles.themePreview, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.previewHeader, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.previewLogo}>
          <Text style={[styles.logoText, { color: theme.colors.accent }]}>NBCON</Text>
        </View>
        <Text style={[styles.previewTitle, { color: theme.colors.text }]}>Sample Title</Text>
      </View>
      <View style={styles.previewContent}>
        <View style={[styles.previewCard, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.previewCardTitle, { color: theme.colors.text }]}>Sample Card</Text>
          <Text style={[styles.previewCardText, { color: theme.colors.text }]}>
            This is how text appears in {theme.name}
          </Text>
          <View style={[styles.previewButton, { backgroundColor: theme.colors.accent }]}>
            <Text style={styles.previewButtonText}>Sample Button</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const ThemeOption = ({ theme }: { theme: any }) => (
    <TouchableOpacity
      style={[
        styles.themeOption,
        currentTheme === theme.id && styles.themeOptionSelected
      ]}
      onPress={() => setCurrentTheme(theme.id)}
    >
      <View style={styles.themeOptionContent}>
        <View style={styles.themeIcon}>
          <Ionicons 
            name={theme.icon as any} 
            size={24} 
            color={currentTheme === theme.id ? '#007bff' : '#cccccc'} 
          />
        </View>
        <View style={styles.themeInfo}>
          <Text style={[
            styles.themeName,
            currentTheme === theme.id && styles.themeNameSelected
          ]}>
            {theme.name}
          </Text>
          <Text style={styles.themeDescription}>{theme.description}</Text>
        </View>
        {currentTheme === theme.id && (
          <Ionicons name="checkmark-circle" size={24} color="#007bff" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Theme Settings</Text>
      <Text style={styles.subtitle}>
        Customize the app appearance with dark, light, or automatic themes
      </Text>

      <View style={styles.currentThemeCard}>
        <Text style={styles.cardTitle}>Current Theme</Text>
        <ThemePreview theme={themes.find(t => t.id === currentTheme) || themes[1]} />
      </View>

      <View style={styles.themeOptionsCard}>
        <Text style={styles.cardTitle}>Select Theme</Text>
        {themes.map((theme) => (
          <ThemeOption key={theme.id} theme={theme} />
        ))}
      </View>

      <View style={styles.autoSwitchCard}>
        <Text style={styles.cardTitle}>Automatic Theme Switching</Text>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Follow System Theme</Text>
            <Text style={styles.settingDescription}>
              Automatically switch based on device settings
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={autoSwitch ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setAutoSwitch}
            value={autoSwitch}
          />
        </View>
      </View>

      <View style={styles.scheduleCard}>
        <Text style={styles.cardTitle}>Scheduled Theme Switching</Text>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Enable Schedule</Text>
            <Text style={styles.settingDescription}>
              Automatically switch themes at specific times
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={scheduleEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setScheduleEnabled}
            value={scheduleEnabled}
          />
        </View>

        {scheduleEnabled && (
          <View style={styles.scheduleSettings}>
            <View style={styles.timeSetting}>
              <Text style={styles.timeLabel}>Switch to Light Mode</Text>
              <TouchableOpacity style={styles.timeButton}>
                <Text style={styles.timeText}>{lightModeTime}</Text>
                <Ionicons name="time" size={16} color="#007bff" />
              </TouchableOpacity>
            </View>
            <View style={styles.timeSetting}>
              <Text style={styles.timeLabel}>Switch to Dark Mode</Text>
              <TouchableOpacity style={styles.timeButton}>
                <Text style={styles.timeText}>{darkModeTime}</Text>
                <Ionicons name="time" size={16} color="#007bff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <View style={styles.previewCard}>
        <Text style={styles.cardTitle}>Theme Previews</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {themes.map((theme) => (
            <View key={theme.id} style={styles.previewContainer}>
              <Text style={styles.previewLabel}>{theme.name}</Text>
              <ThemePreview theme={theme} />
            </View>
          ))}
        </ScrollView>
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
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Theme changes are applied immediately. The auto-switch feature follows your device's 
          system theme settings, while scheduled switching allows custom timing.
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
  currentThemeCard: {
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
  themePreview: {
    borderRadius: 8,
    overflow: 'hidden',
    height: 200,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  previewLogo: {
    marginRight: 15,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  previewContent: {
    padding: 15,
  },
  previewCard: {
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
  },
  previewCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  previewCardText: {
    fontSize: 12,
    marginBottom: 10,
  },
  previewButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  previewButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  themeOptionsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  themeOption: {
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  themeOptionSelected: {
    borderColor: '#007bff',
    backgroundColor: '#1a1a2e',
  },
  themeOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  themeIcon: {
    marginRight: 15,
  },
  themeInfo: {
    flex: 1,
  },
  themeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  themeNameSelected: {
    color: '#007bff',
  },
  themeDescription: {
    fontSize: 14,
    color: '#cccccc',
  },
  autoSwitchCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  scheduleCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  scheduleSettings: {
    marginTop: 20,
  },
  timeSetting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  timeLabel: {
    fontSize: 14,
    color: '#ffffff',
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  timeText: {
    color: '#ffffff',
    fontSize: 14,
    marginRight: 8,
  },
  previewCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  previewContainer: {
    marginRight: 15,
    width: 150,
  },
  previewLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
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
    justifyContent: 'space-around',
  },
  actionButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
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

export default ThemeToggleScreen;
