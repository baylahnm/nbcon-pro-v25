import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Switch,
} from 'react-native';

interface CookieCategory {
  id: string;
  name: string;
  description: string;
  required: boolean;
  enabled: boolean;
  cookies: string[];
}

const CookieConsentBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState<CookieCategory[]>([]);

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsented = localStorage?.getItem('cookieConsent');
    if (!hasConsented) {
      setShowBanner(true);
    }
    initializeCookiePreferences();
  }, []);

  const initializeCookiePreferences = () => {
    const categories: CookieCategory[] = [
      {
        id: 'essential',
        name: 'Essential Cookies',
        description: 'These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you which amount to a request for services.',
        required: true,
        enabled: true,
        cookies: ['session_id', 'csrf_token', 'user_preferences'],
      },
      {
        id: 'analytics',
        name: 'Analytics Cookies',
        description: 'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular.',
        required: false,
        enabled: false,
        cookies: ['_ga', '_gid', '_gat', 'analytics_session'],
      },
      {
        id: 'marketing',
        name: 'Marketing Cookies',
        description: 'These cookies may be set through our site by our advertising partners to build a profile of your interests and show you relevant adverts on other sites.',
        required: false,
        enabled: false,
        cookies: ['_fbp', 'fr', 'tr', 'ads_session'],
      },
      {
        id: 'functional',
        name: 'Functional Cookies',
        description: 'These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third party providers whose services we have added to our pages.',
        required: false,
        enabled: false,
        cookies: ['language_preference', 'theme_preference', 'location_data'],
      },
    ];
    setCookiePreferences(categories);
  };

  const handleAcceptAll = () => {
    const updatedPreferences = cookiePreferences.map(category => ({
      ...category,
      enabled: true,
    }));
    setCookiePreferences(updatedPreferences);
    savePreferences(updatedPreferences);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const updatedPreferences = cookiePreferences.map(category => ({
      ...category,
      enabled: category.required, // Only keep essential cookies enabled
    }));
    setCookiePreferences(updatedPreferences);
    savePreferences(updatedPreferences);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    savePreferences(cookiePreferences);
    setShowBanner(false);
    setShowDetails(false);
  };

  const savePreferences = (preferences: CookieCategory[]) => {
    // Save preferences to localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cookieConsent', 'true');
      localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    }
    
    // Apply cookie settings
    preferences.forEach(category => {
      if (category.enabled) {
        enableCookies(category.cookies);
      } else {
        disableCookies(category.cookies);
      }
    });
  };

  const enableCookies = (cookies: string[]) => {
    // Implementation to enable specific cookies
    console.log('Enabling cookies:', cookies);
  };

  const disableCookies = (cookies: string[]) => {
    // Implementation to disable specific cookies
    console.log('Disabling cookies:', cookies);
  };

  const toggleCategory = (categoryId: string) => {
    setCookiePreferences(prev => 
      prev.map(category => 
        category.id === categoryId 
          ? { ...category, enabled: !category.enabled }
          : category
      )
    );
  };

  const renderCookieDetails = () => (
    <Modal
      visible={showDetails}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Cookie Preferences</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowDetails(false)}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <Text style={styles.modalDescription}>
            We use cookies to enhance your experience, analyze site usage, and assist in our marketing efforts. 
            You can customize your cookie preferences below.
          </Text>

          {cookiePreferences.map((category) => (
            <View key={category.id} style={styles.categoryCard}>
              <View style={styles.categoryHeader}>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryDescription}>{category.description}</Text>
                </View>
                <Switch
                  value={category.enabled}
                  onValueChange={() => toggleCategory(category.id)}
                  disabled={category.required}
                  trackColor={{ false: '#e5e7eb', true: '#1e3a8a' }}
                  thumbColor={category.enabled ? '#ffffff' : '#f3f4f6'}
                />
              </View>
              
              {category.required && (
                <Text style={styles.requiredText}>Required</Text>
              )}
              
              <View style={styles.cookiesList}>
                <Text style={styles.cookiesTitle}>Cookies used:</Text>
                {category.cookies.map((cookie, index) => (
                  <Text key={index} style={styles.cookieItem}>• {cookie}</Text>
                ))}
              </View>
            </View>
          ))}

          <View style={styles.legalNote}>
            <Text style={styles.legalNoteTitle}>Legal Information</Text>
            <Text style={styles.legalNoteText}>
              By using our website, you consent to our use of cookies in accordance with this policy. 
              You can withdraw your consent at any time by adjusting your cookie preferences.
            </Text>
          </View>
        </ScrollView>

        <View style={styles.modalFooter}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setShowDetails(false)}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSavePreferences}
          >
            <Text style={styles.saveButtonText}>Save Preferences</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  if (!showBanner) return null;

  return (
    <>
      <View style={styles.banner}>
        <View style={styles.bannerContent}>
          <View style={styles.bannerText}>
            <Text style={styles.bannerTitle}>We use cookies</Text>
            <Text style={styles.bannerDescription}>
              We use cookies to enhance your experience, analyze site usage, and assist in our marketing efforts. 
              By clicking "Accept All", you consent to our use of cookies.
            </Text>
          </View>
          
          <View style={styles.bannerActions}>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => setShowDetails(true)}
            >
              <Text style={styles.detailsButtonText}>Customize</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.rejectButton}
              onPress={handleRejectAll}
            >
              <Text style={styles.rejectButtonText}>Reject All</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={handleAcceptAll}
            >
              <Text style={styles.acceptButtonText}>Accept All</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {renderCookieDetails()}
    </>
  );
};

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  bannerContent: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerText: {
    flex: 1,
    marginRight: 20,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  bannerDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  bannerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  detailsButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  detailsButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  rejectButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#f3f4f6',
  },
  rejectButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  acceptButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#1e3a8a',
  },
  acceptButtonText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalDescription: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
    marginBottom: 20,
  },
  categoryCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  categoryInfo: {
    flex: 1,
    marginRight: 15,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  requiredText: {
    fontSize: 12,
    color: '#dc2626',
    fontWeight: '500',
    marginBottom: 10,
  },
  cookiesList: {
    marginTop: 10,
  },
  cookiesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 5,
  },
  cookieItem: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  legalNote: {
    backgroundColor: '#f0f9ff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bae6fd',
    marginTop: 20,
  },
  legalNoteTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 5,
  },
  legalNoteText: {
    fontSize: 12,
    color: '#1e40af',
    lineHeight: 16,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  saveButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#1e3a8a',
  },
  saveButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});

export default CookieConsentBanner;
