import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

interface PrivacySection {
  id: string;
  title: string;
  content: string;
  subsections?: PrivacySection[];
}

const PrivacyPolicyPage: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const privacySections: PrivacySection[] = [
    {
      id: '1',
      title: '1. Introduction',
      content: 'NBCON Pro ("we," "our," or "us") is committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.',
    },
    {
      id: '2',
      title: '2. Information We Collect',
      content: 'We collect various types of information to provide and improve our services, including personal information, professional credentials, and usage data.',
      subsections: [
        {
          id: '2.1',
          title: '2.1 Personal Information',
          content: 'Name, email address, phone number, date of birth, gender, National ID/Iqama number, and profile photographs.',
        },
        {
          id: '2.2',
          title: '2.2 Professional Information',
          content: 'SCE license number, professional certifications, work experience, service specializations, and portfolio materials.',
        },
        {
          id: '2.3',
          title: '2.3 Usage Data',
          content: 'Platform interactions, project details, communication records, payment information, and device information.',
        },
        {
          id: '2.4',
          title: '2.4 Location Data',
          content: 'Service area information, project locations, and GPS coordinates for location-based services.',
        },
      ],
    },
    {
      id: '3',
      title: '3. How We Use Your Information',
      content: 'We use your information to provide, maintain, and improve our services, process transactions, and communicate with you.',
      subsections: [
        {
          id: '3.1',
          title: '3.1 Service Provision',
          content: 'To match engineers with clients, process payments, facilitate communication, and manage projects.',
        },
        {
          id: '3.2',
          title: '3.2 Account Management',
          content: 'To create and manage your account, verify your identity, and provide customer support.',
        },
        {
          id: '3.3',
          title: '3.3 Communication',
          content: 'To send notifications, updates, marketing communications, and respond to your inquiries.',
        },
        {
          id: '3.4',
          title: '3.4 Analytics and Improvement',
          content: 'To analyze platform usage, improve our services, and develop new features.',
        },
      ],
    },
    {
      id: '4',
      title: '4. Legal Basis for Processing',
      content: 'We process your personal data based on various legal grounds under Saudi Arabia\'s Personal Data Protection Law (PDPL) and international best practices.',
      subsections: [
        {
          id: '4.1',
          title: '4.1 Consent',
          content: 'We process your data based on your explicit consent for specific purposes such as marketing communications.',
        },
        {
          id: '4.2',
          title: '4.2 Contract Performance',
          content: 'We process data necessary to perform our contract with you, including service delivery and payment processing.',
        },
        {
          id: '4.3',
          title: '4.3 Legitimate Interests',
          content: 'We process data for our legitimate business interests, such as platform security and service improvement.',
        },
        {
          id: '4.4',
          title: '4.4 Legal Compliance',
          content: 'We process data to comply with legal obligations, including regulatory requirements and law enforcement requests.',
        },
      ],
    },
    {
      id: '5',
      title: '5. Information Sharing and Disclosure',
      content: 'We may share your information with third parties in specific circumstances, always ensuring appropriate safeguards are in place.',
      subsections: [
        {
          id: '5.1',
          title: '5.1 Service Providers',
          content: 'We share data with trusted third-party service providers who assist in platform operations, payment processing, and customer support.',
        },
        {
          id: '5.2',
          title: '5.2 Business Partners',
          content: 'We may share data with business partners for joint services, always with your consent and appropriate data protection measures.',
        },
        {
          id: '5.3',
          title: '5.3 Legal Requirements',
          content: 'We may disclose data when required by law, court order, or to protect our rights and the safety of our users.',
        },
        {
          id: '5.4',
          title: '5.4 Business Transfers',
          content: 'In case of merger, acquisition, or sale of assets, user data may be transferred as part of the business transaction.',
        },
      ],
    },
    {
      id: '6',
      title: '6. Data Security',
      content: 'We implement comprehensive security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.',
      subsections: [
        {
          id: '6.1',
          title: '6.1 Technical Safeguards',
          content: 'Encryption, secure servers, access controls, and regular security audits to protect your data.',
        },
        {
          id: '6.2',
          title: '6.2 Administrative Safeguards',
          content: 'Employee training, data handling policies, and regular security assessments.',
        },
        {
          id: '6.3',
          title: '6.3 Physical Safeguards',
          content: 'Secure data centers, restricted access, and environmental controls.',
        },
      ],
    },
    {
      id: '7',
      title: '7. Data Retention',
      content: 'We retain your personal data only as long as necessary to fulfill the purposes outlined in this policy or as required by law.',
      subsections: [
        {
          id: '7.1',
          title: '7.1 Account Data',
          content: 'Account information is retained while your account is active and for a reasonable period after closure for legal and business purposes.',
        },
        {
          id: '7.2',
          title: '7.2 Transaction Data',
          content: 'Payment and transaction records are retained for accounting and legal compliance purposes as required by Saudi Arabian law.',
        },
        {
          id: '7.3',
          title: '7.3 Communication Data',
          content: 'Communication records are retained for customer support and dispute resolution purposes.',
        },
      ],
    },
    {
      id: '8',
      title: '8. Your Rights',
      content: 'Under Saudi Arabia\'s Personal Data Protection Law (PDPL), you have specific rights regarding your personal data.',
      subsections: [
        {
          id: '8.1',
          title: '8.1 Access Rights',
          content: 'You have the right to access your personal data and receive a copy of the data we hold about you.',
        },
        {
          id: '8.2',
          title: '8.2 Correction Rights',
          content: 'You can request correction of inaccurate or incomplete personal data.',
        },
        {
          id: '8.3',
          title: '8.3 Deletion Rights',
          content: 'You can request deletion of your personal data in certain circumstances, subject to legal and business requirements.',
        },
        {
          id: '8.4',
          title: '8.4 Portability Rights',
          content: 'You can request a copy of your data in a structured, machine-readable format.',
        },
        {
          id: '8.5',
          title: '8.5 Objection Rights',
          content: 'You can object to certain processing of your personal data, including marketing communications.',
        },
      ],
    },
    {
      id: '9',
      title: '9. Cookies and Tracking Technologies',
      content: 'We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content.',
      subsections: [
        {
          id: '9.1',
          title: '9.1 Types of Cookies',
          content: 'Essential cookies for platform functionality, analytics cookies for usage insights, and marketing cookies for personalized content.',
        },
        {
          id: '9.2',
          title: '9.2 Cookie Management',
          content: 'You can control cookie settings through your browser preferences or our cookie consent banner.',
        },
      ],
    },
    {
      id: '10',
      title: '10. International Data Transfers',
      content: 'We may transfer your data to countries outside Saudi Arabia, always ensuring appropriate safeguards are in place.',
      subsections: [
        {
          id: '10.1',
          title: '10.1 Adequacy Decisions',
          content: 'We transfer data to countries with adequate data protection laws or appropriate safeguards.',
        },
        {
          id: '10.2',
          title: '10.2 Standard Contractual Clauses',
          content: 'We use standard contractual clauses and other legal mechanisms to ensure data protection.',
        },
      ],
    },
    {
      id: '11',
      title: '11. Children\'s Privacy',
      content: 'Our services are not intended for children under 18. We do not knowingly collect personal information from children.',
    },
    {
      id: '12',
      title: '12. Changes to This Policy',
      content: 'We may update this Privacy Policy from time to time. We will notify you of significant changes and post the updated policy on our platform.',
    },
    {
      id: '13',
      title: '13. Contact Information',
      content: 'If you have questions about this Privacy Policy or our data practices, please contact us using the information provided below.',
    },
  ];

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const renderSection = (section: PrivacySection, level: number = 0) => (
    <View key={section.id} style={[styles.section, { marginLeft: level * 20 }]}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => toggleSection(section.id)}
      >
        <Text style={[styles.sectionTitle, { fontSize: 16 - level * 2 }]}>
          {section.title}
        </Text>
        <Text style={styles.expandIcon}>
          {expandedSection === section.id ? '−' : '+'}
        </Text>
      </TouchableOpacity>
      
      {expandedSection === section.id && (
        <View style={styles.sectionContent}>
          <Text style={styles.sectionText}>{section.content}</Text>
          
          {section.subsections && section.subsections.map((subsection) => 
            renderSection(subsection, level + 1)
          )}
        </View>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <Text style={styles.headerSubtitle}>
          Last updated: December 2024
        </Text>
      </View>

      {/* Introduction */}
      <View style={styles.introSection}>
        <Text style={styles.introTitle}>Your Privacy Matters</Text>
        <Text style={styles.introText}>
          At NBCON Pro, we are committed to protecting your privacy and personal data. 
          This Privacy Policy explains how we collect, use, and safeguard your information 
          when you use our engineering marketplace platform.
        </Text>
        <Text style={styles.introText}>
          We comply with Saudi Arabia's Personal Data Protection Law (PDPL) and international 
          best practices to ensure your data is handled responsibly and securely.
        </Text>
      </View>

      {/* Privacy Sections */}
      <View style={styles.privacySection}>
        <Text style={styles.privacyTitle}>Privacy Policy Details</Text>
        
        {privacySections.map((section) => renderSection(section))}
      </View>

      {/* Data Rights Summary */}
      <View style={styles.rightsSection}>
        <Text style={styles.rightsTitle}>Your Data Rights Summary</Text>
        
        <View style={styles.rightsGrid}>
          <View style={styles.rightCard}>
            <Text style={styles.rightIcon}>👁️</Text>
            <Text style={styles.rightTitle}>Access</Text>
            <Text style={styles.rightDescription}>View your personal data</Text>
          </View>
          
          <View style={styles.rightCard}>
            <Text style={styles.rightIcon}>✏️</Text>
            <Text style={styles.rightTitle}>Correct</Text>
            <Text style={styles.rightDescription}>Update inaccurate information</Text>
          </View>
          
          <View style={styles.rightCard}>
            <Text style={styles.rightIcon}>🗑️</Text>
            <Text style={styles.rightTitle}>Delete</Text>
            <Text style={styles.rightDescription}>Request data deletion</Text>
          </View>
          
          <View style={styles.rightCard}>
            <Text style={styles.rightIcon}>📤</Text>
            <Text style={styles.rightTitle}>Export</Text>
            <Text style={styles.rightDescription}>Download your data</Text>
          </View>
        </View>
      </View>

      {/* Contact Information */}
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Questions About Privacy?</Text>
        <Text style={styles.contactText}>
          If you have any questions about this Privacy Policy or our data practices, 
          please contact our Data Protection Officer:
        </Text>
        
        <View style={styles.contactInfo}>
          <Text style={styles.contactItem}>Email: privacy@nbcon.pro</Text>
          <Text style={styles.contactItem}>Phone: +966 11 123 4567</Text>
          <Text style={styles.contactItem}>Address: Riyadh, Saudi Arabia</Text>
        </View>
        
        <Text style={styles.contactNote}>
          You can also use our in-app privacy settings to manage your data preferences.
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2024 NBCON Pro. All rights reserved.
        </Text>
        <Text style={styles.footerText}>
          This privacy policy is effective as of December 2024.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#1e3a8a',
    padding: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e0e7ff',
  },
  introSection: {
    backgroundColor: 'white',
    padding: 30,
    marginBottom: 20,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
  },
  introText: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
    marginBottom: 15,
  },
  privacySection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  privacyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
  },
  section: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
    marginRight: 10,
  },
  expandIcon: {
    fontSize: 20,
    color: '#6b7280',
    fontWeight: 'bold',
  },
  sectionContent: {
    paddingBottom: 15,
  },
  sectionText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 15,
  },
  rightsSection: {
    backgroundColor: 'white',
    padding: 30,
    marginBottom: 20,
  },
  rightsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  rightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  rightCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  rightIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  rightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 5,
  },
  rightDescription: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  contactSection: {
    backgroundColor: 'white',
    padding: 30,
    marginBottom: 20,
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
  },
  contactText: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
    marginBottom: 20,
  },
  contactInfo: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 15,
  },
  contactItem: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 8,
  },
  contactNote: {
    fontSize: 14,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  footer: {
    backgroundColor: '#1e3a8a',
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#e0e7ff',
    marginBottom: 5,
  },
});

export default PrivacyPolicyPage;
