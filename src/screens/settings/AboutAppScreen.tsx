import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AboutAppScreen: React.FC = () => {
  const [showDevCredits, setShowDevCredits] = useState(false);

  const appInfo = {
    name: 'NBCON Pro',
    version: '1.0.0',
    build: '2024.01.25',
    releaseDate: 'January 25, 2024',
    developer: 'NBCON Technologies',
    website: 'https://nbcon.pro',
    supportEmail: 'support@nbcon.pro',
  };

  const legalLinks = [
    {
      title: 'Terms of Service',
      url: 'https://nbcon.pro/terms',
      icon: 'document-text',
    },
    {
      title: 'Privacy Policy',
      url: 'https://nbcon.pro/privacy',
      icon: 'shield-checkmark',
    },
    {
      title: 'Cookie Policy',
      url: 'https://nbcon.pro/cookies',
      icon: 'cookie',
    },
    {
      title: 'Data Processing Agreement',
      url: 'https://nbcon.pro/dpa',
      icon: 'lock-closed',
    },
  ];

  const supportLinks = [
    {
      title: 'Help Center',
      url: 'https://help.nbcon.pro',
      icon: 'help-circle',
    },
    {
      title: 'Contact Support',
      url: 'mailto:support@nbcon.pro',
      icon: 'mail',
    },
    {
      title: 'Report Bug',
      url: 'mailto:bugs@nbcon.pro',
      icon: 'bug',
    },
    {
      title: 'Feature Request',
      url: 'mailto:features@nbcon.pro',
      icon: 'bulb',
    },
  ];

  const devCredits = [
    { role: 'Lead Developer', name: 'Ahmed Al-Rashid' },
    { role: 'UI/UX Designer', name: 'Sarah Al-Mansouri' },
    { role: 'Backend Engineer', name: 'Mohammed Al-Zahrani' },
    { role: 'Mobile Developer', name: 'Fatima Al-Shehri' },
    { role: 'QA Engineer', name: 'Khalid Al-Shehri' },
    { role: 'Project Manager', name: 'Noura Al-Rashid' },
  ];

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Failed to open link:', err));
  };

  const LegalLink = ({ link }: { link: any }) => (
    <TouchableOpacity 
      style={styles.linkItem}
      onPress={() => openLink(link.url)}
    >
      <View style={styles.linkContent}>
        <Ionicons name={link.icon as any} size={20} color="#007bff" />
        <Text style={styles.linkText}>{link.title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#cccccc" />
    </TouchableOpacity>
  );

  const SupportLink = ({ link }: { link: any }) => (
    <TouchableOpacity 
      style={styles.linkItem}
      onPress={() => openLink(link.url)}
    >
      <View style={styles.linkContent}>
        <Ionicons name={link.icon as any} size={20} color="#28a745" />
        <Text style={styles.linkText}>{link.title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#cccccc" />
    </TouchableOpacity>
  );

  const DevCredit = ({ credit }: { credit: any }) => (
    <View style={styles.creditItem}>
      <Text style={styles.creditRole}>{credit.role}</Text>
      <Text style={styles.creditName}>{credit.name}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>About NBCON Pro</Text>
      <Text style={styles.subtitle}>
        Engineering excellence for Saudi Arabia
      </Text>

      <View style={styles.appInfoCard}>
        <View style={styles.appLogo}>
          <Text style={styles.logoText}>NBCON</Text>
        </View>
        <Text style={styles.appName}>{appInfo.name}</Text>
        <Text style={styles.appVersion}>Version {appInfo.version}</Text>
        <Text style={styles.appBuild}>Build {appInfo.build}</Text>
        <Text style={styles.appRelease}>Released {appInfo.releaseDate}</Text>
      </View>

      <View style={styles.companyInfoCard}>
        <Text style={styles.cardTitle}>Company Information</Text>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Developer</Text>
          <Text style={styles.infoValue}>{appInfo.developer}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Website</Text>
          <TouchableOpacity onPress={() => openLink(appInfo.website)}>
            <Text style={styles.infoLink}>{appInfo.website}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Support Email</Text>
          <TouchableOpacity onPress={() => openLink(`mailto:${appInfo.supportEmail}`)}>
            <Text style={styles.infoLink}>{appInfo.supportEmail}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.legalCard}>
        <Text style={styles.cardTitle}>Legal & Privacy</Text>
        {legalLinks.map((link, index) => (
          <LegalLink key={index} link={link} />
        ))}
      </View>

      <View style={styles.supportCard}>
        <Text style={styles.cardTitle}>Support & Feedback</Text>
        {supportLinks.map((link, index) => (
          <SupportLink key={index} link={link} />
        ))}
      </View>

      <View style={styles.visionCard}>
        <Text style={styles.cardTitle}>Vision 2030 Alignment</Text>
        <Text style={styles.visionText}>
          NBCON Pro is designed to support Saudi Arabia's Vision 2030 by connecting 
          engineering talent with projects that drive economic diversification and 
          technological advancement.
        </Text>
        <View style={styles.visionFeatures}>
          <View style={styles.visionFeature}>
            <Ionicons name="checkmark-circle" size={16} color="#28a745" />
            <Text style={styles.visionFeatureText}>Local talent development</Text>
          </View>
          <View style={styles.visionFeature}>
            <Ionicons name="checkmark-circle" size={16} color="#28a745" />
            <Text style={styles.visionFeatureText}>Digital transformation</Text>
          </View>
          <View style={styles.visionFeature}>
            <Ionicons name="checkmark-circle" size={16} color="#28a745" />
            <Text style={styles.visionFeatureText}>Economic diversification</Text>
          </View>
        </View>
      </View>

      <View style={styles.creditsCard}>
        <TouchableOpacity 
          style={styles.creditsHeader}
          onPress={() => setShowDevCredits(!showDevCredits)}
        >
          <Text style={styles.cardTitle}>Development Team</Text>
          <Ionicons 
            name={showDevCredits ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#007bff" 
          />
        </TouchableOpacity>
        {showDevCredits && (
          <View style={styles.creditsList}>
            {devCredits.map((credit, index) => (
              <DevCredit key={index} credit={credit} />
            ))}
          </View>
        )}
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="star" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Rate App</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share" size={24} color="#007bff" />
            <Text style={styles.actionText}>Share App</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="refresh" size={24} color="#28a745" />
            <Text style={styles.actionText}>Check Updates</Text>
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
          NBCON Pro is built with modern technologies and follows industry best practices 
          for security, performance, and user experience. Thank you for using our app!
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
  appInfoCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 30,
    marginBottom: 20,
    alignItems: 'center',
  },
  appLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  appVersion: {
    fontSize: 16,
    color: '#007bff',
    marginBottom: 5,
  },
  appBuild: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 5,
  },
  appRelease: {
    fontSize: 14,
    color: '#cccccc',
  },
  companyInfoCard: {
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
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 14,
    color: '#cccccc',
  },
  infoValue: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  infoLink: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: 'bold',
  },
  legalCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  supportCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  linkItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  linkContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  linkText: {
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 15,
  },
  visionCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  visionText: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
    marginBottom: 15,
  },
  visionFeatures: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
  },
  visionFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  visionFeatureText: {
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 10,
  },
  creditsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  creditsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  creditsList: {
    marginTop: 15,
  },
  creditItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  creditRole: {
    fontSize: 14,
    color: '#cccccc',
  },
  creditName: {
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

export default AboutAppScreen;
