import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ContactUsPage: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedRegion, setSelectedRegion] = useState('sa');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('contact');

  const languages = [
    { id: 'en', name: 'English', flag: '🇺🇸' },
    { id: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const regions = [
    { id: 'sa', name: 'Saudi Arabia', flag: '🇸🇦' },
    { id: 'ae', name: 'UAE', flag: '🇦🇪' },
    { id: 'kw', name: 'Kuwait', flag: '🇰🇼' },
    { id: 'qa', name: 'Qatar', flag: '🇶🇦' },
  ];

  const navigationItems = [
    { id: 'home', name: 'Home', icon: 'home' },
    { id: 'services', name: 'Services', icon: 'construct' },
    { id: 'pricing', name: 'Pricing', icon: 'card' },
    { id: 'about', name: 'About', icon: 'information-circle' },
    { id: 'contact', name: 'Contact', icon: 'mail' },
  ];

  const tabs = [
    { id: 'contact', name: 'Contact Form', icon: 'mail' },
    { id: 'support', name: 'Support', icon: 'help-circle' },
    { id: 'sales', name: 'Sales', icon: 'briefcase' },
    { id: 'partnership', name: 'Partnership', icon: 'people' },
  ];

  const contactInfo = {
    phone: '+966 11 123 4567',
    email: 'info@nbcon.pro',
    address: 'King Fahd Road, Riyadh 12345, Saudi Arabia',
    hours: 'Sunday - Thursday: 8:00 AM - 6:00 PM',
    emergency: '+966 11 123 4567',
  };

  const offices = [
    {
      id: 'riyadh',
      name: 'Riyadh Headquarters',
      address: 'King Fahd Road, Riyadh 12345, Saudi Arabia',
      phone: '+966 11 123 4567',
      email: 'riyadh@nbcon.pro',
      hours: 'Sunday - Thursday: 8:00 AM - 6:00 PM',
      services: ['General Inquiries', 'Sales', 'Support', 'Partnerships'],
    },
    {
      id: 'jeddah',
      name: 'Jeddah Office',
      address: 'Prince Mohammed bin Abdulaziz Street, Jeddah 21432, Saudi Arabia',
      phone: '+966 12 345 6789',
      email: 'jeddah@nbcon.pro',
      hours: 'Sunday - Thursday: 8:00 AM - 6:00 PM',
      services: ['Sales', 'Support', 'Regional Operations'],
    },
    {
      id: 'dammam',
      name: 'Dammam Office',
      address: 'King Abdulaziz Street, Dammam 31421, Saudi Arabia',
      phone: '+966 13 456 7890',
      email: 'dammam@nbcon.pro',
      hours: 'Sunday - Thursday: 8:00 AM - 6:00 PM',
      services: ['Sales', 'Support', 'Eastern Region'],
    },
  ];

  const departments = [
    {
      id: 'general',
      name: 'General Inquiries',
      email: 'info@nbcon.pro',
      phone: '+966 11 123 4567',
      description: 'For general questions about our services and platform',
      responseTime: 'Within 24 hours',
    },
    {
      id: 'sales',
      name: 'Sales & Business Development',
      email: 'sales@nbcon.pro',
      phone: '+966 11 123 4568',
      description: 'For sales inquiries, pricing, and business partnerships',
      responseTime: 'Within 4 hours',
    },
    {
      id: 'support',
      name: 'Technical Support',
      email: 'support@nbcon.pro',
      phone: '+966 11 123 4569',
      description: 'For technical issues, platform support, and troubleshooting',
      responseTime: 'Within 2 hours',
    },
    {
      id: 'partnerships',
      name: 'Partnerships & Alliances',
      email: 'partnerships@nbcon.pro',
      phone: '+966 11 123 4570',
      description: 'For partnership opportunities and strategic alliances',
      responseTime: 'Within 24 hours',
    },
    {
      id: 'media',
      name: 'Media & Press',
      email: 'media@nbcon.pro',
      phone: '+966 11 123 4571',
      description: 'For media inquiries, press releases, and interviews',
      responseTime: 'Within 24 hours',
    },
  ];

  const faqs = [
    {
      id: '1',
      question: 'How do I get started with NBCON Pro?',
      answer: 'Getting started is easy! Simply sign up for a free account, complete your profile, and start browsing or posting projects. Our onboarding process will guide you through each step.',
    },
    {
      id: '2',
      question: 'What types of engineering services do you offer?',
      answer: 'We offer a wide range of engineering services including Civil Engineering, MEP Engineering, Surveying, BIM Services, HSE Consulting, and GIS Services.',
    },
    {
      id: '3',
      question: 'How does the payment system work?',
      answer: 'We use a secure escrow payment system. Clients pay upfront, and funds are released to engineers upon project completion. We support various payment methods including mada, STC Pay, and bank transfers.',
    },
    {
      id: '4',
      question: 'Is my data secure on the platform?',
      answer: 'Yes, we take data security seriously. All data is encrypted, and we comply with Saudi data protection regulations. We also offer two-factor authentication and other security features.',
    },
    {
      id: '5',
      question: 'Do you offer customer support?',
      answer: 'Yes, we provide 24/7 customer support through multiple channels including live chat, email, and phone. Our support team is available to help with any questions or issues.',
    },
  ];

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
  };

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleSubmitForm = () => {
    Alert.alert('Success', 'Your message has been sent successfully. We will get back to you soon!');
  };

  const handleCall = (phone: string) => {
    Alert.alert('Call', `Calling ${phone}`);
  };

  const handleEmail = (email: string) => {
    Alert.alert('Email', `Opening email to ${email}`);
  };

  const ContactForm = () => (
    <View style={styles.contactForm}>
      <Text style={styles.formTitle}>Send us a Message</Text>
      <View style={styles.formRow}>
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>First Name *</Text>
          <View style={styles.formInput}>
            <Text style={styles.formInputText}>Enter your first name</Text>
          </View>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Last Name *</Text>
          <View style={styles.formInput}>
            <Text style={styles.formInputText}>Enter your last name</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Email *</Text>
        <View style={styles.formInput}>
          <Text style={styles.formInputText}>Enter your email address</Text>
        </View>
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Phone Number</Text>
        <View style={styles.formInput}>
          <Text style={styles.formInputText}>Enter your phone number</Text>
        </View>
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Company</Text>
        <View style={styles.formInput}>
          <Text style={styles.formInputText}>Enter your company name</Text>
        </View>
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Subject *</Text>
        <View style={styles.formInput}>
          <Text style={styles.formInputText}>Enter message subject</Text>
        </View>
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Message *</Text>
        <View style={[styles.formInput, styles.formTextArea]}>
          <Text style={styles.formInputText}>Enter your message here...</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitForm}>
        <Text style={styles.submitButtonText}>Send Message</Text>
      </TouchableOpacity>
    </View>
  );

  const SupportInfo = () => (
    <View style={styles.supportInfo}>
      <Text style={styles.sectionTitle}>Support Information</Text>
      <View style={styles.supportGrid}>
        {departments.map((dept) => (
          <View key={dept.id} style={styles.supportCard}>
            <Text style={styles.supportName}>{dept.name}</Text>
            <Text style={styles.supportDescription}>{dept.description}</Text>
            <View style={styles.supportContact}>
              <TouchableOpacity style={styles.contactButton} onPress={() => handleEmail(dept.email)}>
                <Ionicons name="mail" size={16} color="#007bff" />
                <Text style={styles.contactButtonText}>{dept.email}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactButton} onPress={() => handleCall(dept.phone)}>
                <Ionicons name="call" size={16} color="#28a745" />
                <Text style={styles.contactButtonText}>{dept.phone}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.supportResponseTime}>Response Time: {dept.responseTime}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const SalesInfo = () => (
    <View style={styles.salesInfo}>
      <Text style={styles.sectionTitle}>Sales Information</Text>
      <View style={styles.salesGrid}>
        <View style={styles.salesCard}>
          <Text style={styles.salesTitle}>Enterprise Sales</Text>
          <Text style={styles.salesDescription}>
            For large organizations looking for comprehensive engineering solutions
          </Text>
          <TouchableOpacity style={styles.salesButton} onPress={() => handleEmail('enterprise@nbcon.pro')}>
            <Text style={styles.salesButtonText}>Contact Enterprise Sales</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.salesCard}>
          <Text style={styles.salesTitle}>Partnership Opportunities</Text>
          <Text style={styles.salesDescription}>
            Join our partner network and grow your business with us
          </Text>
          <TouchableOpacity style={styles.salesButton} onPress={() => handleEmail('partnerships@nbcon.pro')}>
            <Text style={styles.salesButtonText}>Become a Partner</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.salesCard}>
          <Text style={styles.salesTitle}>Custom Solutions</Text>
          <Text style={styles.salesDescription}>
            Need a tailored solution? Let's discuss your specific requirements
          </Text>
          <TouchableOpacity style={styles.salesButton} onPress={() => handleEmail('custom@nbcon.pro')}>
            <Text style={styles.salesButtonText}>Request Custom Solution</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const PartnershipInfo = () => (
    <View style={styles.partnershipInfo}>
      <Text style={styles.sectionTitle}>Partnership Opportunities</Text>
      <View style={styles.partnershipGrid}>
        <View style={styles.partnershipCard}>
          <Text style={styles.partnershipTitle}>Technology Partners</Text>
          <Text style={styles.partnershipDescription}>
            Integrate your technology solutions with our platform
          </Text>
          <TouchableOpacity style={styles.partnershipButton} onPress={() => handleEmail('tech-partners@nbcon.pro')}>
            <Text style={styles.partnershipButtonText}>Join as Tech Partner</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.partnershipCard}>
          <Text style={styles.partnershipTitle}>Channel Partners</Text>
          <Text style={styles.partnershipDescription}>
            Resell our services and earn commissions
          </Text>
          <TouchableOpacity style={styles.partnershipButton} onPress={() => handleEmail('channel-partners@nbcon.pro')}>
            <Text style={styles.partnershipButtonText}>Become Channel Partner</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.partnershipCard}>
          <Text style={styles.partnershipTitle}>Strategic Alliances</Text>
          <Text style={styles.partnershipDescription}>
            Form strategic partnerships for mutual growth
          </Text>
          <TouchableOpacity style={styles.partnershipButton} onPress={() => handleEmail('alliances@nbcon.pro')}>
            <Text style={styles.partnershipButtonText}>Explore Alliances</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const FAQItem = ({ faq }: { faq: any }) => (
    <View style={styles.faqItem}>
      <Text style={styles.faqQuestion}>{faq.question}</Text>
      <Text style={styles.faqAnswer}>{faq.answer}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>NBCON</Text>
            <Text style={styles.logoSubtext}>PRO</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.languageButton}>
              <Text style={styles.languageText}>
                {languages.find(l => l.id === selectedLanguage)?.flag} {languages.find(l => l.id === selectedLanguage)?.name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.regionButton}>
              <Text style={styles.regionText}>
                {regions.find(r => r.id === selectedRegion)?.flag} {regions.find(r => r.id === selectedRegion)?.name}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.navigation}>
          {navigationItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.navItem,
                selectedTab === item.id && styles.navItemSelected
              ]}
              onPress={() => setSelectedTab(item.id)}
            >
              <Ionicons name={item.icon as any} size={20} color={selectedTab === item.id ? '#007bff' : '#cccccc'} />
              <Text style={[
                styles.navText,
                selectedTab === item.id && styles.navTextSelected
              ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>
          Contact Us
        </Text>
        <Text style={styles.heroSubtitle}>
          Get in touch with our team for any questions or support
        </Text>
        <View style={styles.heroActions}>
          <TouchableOpacity style={styles.primaryButton} onPress={() => handleCall(contactInfo.phone)}>
            <Text style={styles.primaryButtonText}>Call Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => handleEmail(contactInfo.email)}>
            <Text style={styles.secondaryButtonText}>Send Email</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contactInfoSection}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.contactInfoGrid}>
          <View style={styles.contactInfoCard}>
            <Ionicons name="call" size={24} color="#007bff" />
            <Text style={styles.contactInfoTitle}>Phone</Text>
            <Text style={styles.contactInfoValue}>{contactInfo.phone}</Text>
            <TouchableOpacity style={styles.contactInfoButton} onPress={() => handleCall(contactInfo.phone)}>
              <Text style={styles.contactInfoButtonText}>Call Now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contactInfoCard}>
            <Ionicons name="mail" size={24} color="#007bff" />
            <Text style={styles.contactInfoTitle}>Email</Text>
            <Text style={styles.contactInfoValue}>{contactInfo.email}</Text>
            <TouchableOpacity style={styles.contactInfoButton} onPress={() => handleEmail(contactInfo.email)}>
              <Text style={styles.contactInfoButtonText}>Send Email</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contactInfoCard}>
            <Ionicons name="location" size={24} color="#007bff" />
            <Text style={styles.contactInfoTitle}>Address</Text>
            <Text style={styles.contactInfoValue}>{contactInfo.address}</Text>
            <TouchableOpacity style={styles.contactInfoButton}>
              <Text style={styles.contactInfoButtonText}>Get Directions</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contactInfoCard}>
            <Ionicons name="time" size={24} color="#007bff" />
            <Text style={styles.contactInfoTitle}>Business Hours</Text>
            <Text style={styles.contactInfoValue}>{contactInfo.hours}</Text>
            <TouchableOpacity style={styles.contactInfoButton}>
              <Text style={styles.contactInfoButtonText}>View Hours</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.tabsSection}>
        <Text style={styles.sectionTitle}>How Can We Help You?</Text>
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabButton,
                selectedTab === tab.id && styles.tabButtonSelected
              ]}
              onPress={() => handleTabChange(tab.id)}
            >
              <Ionicons name={tab.icon as any} size={20} color={selectedTab === tab.id ? '#ffffff' : '#007bff'} />
              <Text style={[
                styles.tabText,
                selectedTab === tab.id && styles.tabTextSelected
              ]}>
                {tab.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {selectedTab === 'contact' && <ContactForm />}
      {selectedTab === 'support' && <SupportInfo />}
      {selectedTab === 'sales' && <SalesInfo />}
      {selectedTab === 'partnership' && <PartnershipInfo />}

      <View style={styles.officesSection}>
        <Text style={styles.sectionTitle}>Our Offices</Text>
        <View style={styles.officesGrid}>
          {offices.map((office) => (
            <View key={office.id} style={styles.officeCard}>
              <Text style={styles.officeName}>{office.name}</Text>
              <Text style={styles.officeAddress}>{office.address}</Text>
              <View style={styles.officeContact}>
                <TouchableOpacity style={styles.officeContactButton} onPress={() => handleCall(office.phone)}>
                  <Ionicons name="call" size={16} color="#007bff" />
                  <Text style={styles.officeContactText}>{office.phone}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.officeContactButton} onPress={() => handleEmail(office.email)}>
                  <Ionicons name="mail" size={16} color="#007bff" />
                  <Text style={styles.officeContactText}>{office.email}</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.officeHours}>{office.hours}</Text>
              <View style={styles.officeServices}>
                {office.services.map((service, index) => (
                  <View key={index} style={styles.officeService}>
                    <Text style={styles.officeServiceText}>{service}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.faqSection}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        <Text style={styles.sectionSubtitle}>
          Find answers to common questions about our services
        </Text>
        <View style={styles.faqContainer}>
          {faqs.map((faq) => (
            <FAQItem key={faq.id} faq={faq} />
          ))}
        </View>
      </View>

      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Still Have Questions?</Text>
        <Text style={styles.ctaSubtitle}>
          Our team is here to help you succeed
        </Text>
        <View style={styles.ctaActions}>
          <TouchableOpacity style={styles.ctaButton} onPress={() => handleCall(contactInfo.phone)}>
            <Text style={styles.ctaButtonText}>Call Us Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ctaSecondaryButton} onPress={() => handleEmail(contactInfo.email)}>
            <Text style={styles.ctaSecondaryButtonText}>Send Email</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View style={styles.footerSection}>
            <Text style={styles.footerTitle}>NBCON Pro</Text>
            <Text style={styles.footerDescription}>
              Saudi Arabia's premier engineering marketplace connecting clients with top engineers.
            </Text>
          </View>
          <View style={styles.footerSection}>
            <Text style={styles.footerTitle}>Contact</Text>
            <Text style={styles.footerLink}>General Inquiries</Text>
            <Text style={styles.footerLink}>Sales</Text>
            <Text style={styles.footerLink}>Support</Text>
            <Text style={styles.footerLink}>Partnerships</Text>
          </View>
          <View style={styles.footerSection}>
            <Text style={styles.footerTitle}>Company</Text>
            <Text style={styles.footerLink}>About Us</Text>
            <Text style={styles.footerLink}>Careers</Text>
            <Text style={styles.footerLink}>Contact</Text>
            <Text style={styles.footerLink}>Blog</Text>
          </View>
          <View style={styles.footerSection}>
            <Text style={styles.footerTitle}>Support</Text>
            <Text style={styles.footerLink}>Help Center</Text>
            <Text style={styles.footerLink}>Documentation</Text>
            <Text style={styles.footerLink}>API</Text>
            <Text style={styles.footerLink}>Status</Text>
          </View>
        </View>
        <View style={styles.footerBottom}>
          <Text style={styles.footerCopyright}>
            © 2024 NBCON Pro. All rights reserved.
          </Text>
          <View style={styles.footerLinks}>
            <Text style={styles.footerLink}>Privacy Policy</Text>
            <Text style={styles.footerLink}>Terms of Service</Text>
            <Text style={styles.footerLink}>Cookie Policy</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007bff',
  },
  logoSubtext: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
    marginLeft: 5,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
  },
  languageText: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: '500',
  },
  regionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  regionText: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: '500',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  navItemSelected: {
    backgroundColor: '#f8f9fa',
  },
  navText: {
    fontSize: 14,
    color: '#cccccc',
    marginLeft: 5,
  },
  navTextSelected: {
    color: '#007bff',
    fontWeight: '500',
  },
  heroSection: {
    backgroundColor: '#007bff',
    padding: 40,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 40,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#e3f2fd',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 26,
  },
  heroActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginRight: 15,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  contactInfoSection: {
    padding: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
  },
  contactInfoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  contactInfoCard: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  contactInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 10,
    marginBottom: 5,
  },
  contactInfoValue: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 15,
  },
  contactInfoButton: {
    backgroundColor: '#007bff',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  contactInfoButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tabsSection: {
    backgroundColor: '#f8f9fa',
    padding: 40,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  tabButtonSelected: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  tabText: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  tabTextSelected: {
    color: '#ffffff',
  },
  contactForm: {
    padding: 40,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  formInputText: {
    color: '#cccccc',
    fontSize: 16,
  },
  formTextArea: {
    height: 120,
  },
  submitButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  supportInfo: {
    padding: 40,
  },
  supportGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  supportCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  supportName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  supportDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 15,
  },
  supportContact: {
    marginBottom: 10,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactButtonText: {
    fontSize: 12,
    color: '#007bff',
    marginLeft: 8,
  },
  supportResponseTime: {
    fontSize: 12,
    color: '#666666',
    fontStyle: 'italic',
  },
  salesInfo: {
    padding: 40,
  },
  salesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  salesCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  salesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  salesDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 15,
  },
  salesButton: {
    backgroundColor: '#007bff',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  salesButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  partnershipInfo: {
    padding: 40,
  },
  partnershipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  partnershipCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  partnershipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  partnershipDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 15,
  },
  partnershipButton: {
    backgroundColor: '#28a745',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  partnershipButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  officesSection: {
    backgroundColor: '#f8f9fa',
    padding: 40,
  },
  officesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  officeCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  officeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  officeAddress: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 15,
  },
  officeContact: {
    marginBottom: 10,
  },
  officeContactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  officeContactText: {
    fontSize: 12,
    color: '#007bff',
    marginLeft: 8,
  },
  officeHours: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 15,
  },
  officeServices: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  officeService: {
    backgroundColor: '#f8f9fa',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 5,
    marginBottom: 5,
  },
  officeServiceText: {
    fontSize: 10,
    color: '#666666',
  },
  faqSection: {
    padding: 40,
  },
  faqContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  faqItem: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  ctaSection: {
    backgroundColor: '#007bff',
    padding: 40,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: '#e3f2fd',
    textAlign: 'center',
    marginBottom: 30,
  },
  ctaActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ctaButton: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginRight: 15,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  ctaSecondaryButton: {
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  ctaSecondaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  footer: {
    backgroundColor: '#333333',
    padding: 40,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  footerSection: {
    flex: 1,
    marginRight: 20,
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  footerDescription: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
  },
  footerLink: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 8,
  },
  footerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#555555',
  },
  footerCopyright: {
    fontSize: 14,
    color: '#cccccc',
  },
  footerLinks: {
    flexDirection: 'row',
  },
});

export default ContactUsPage;
