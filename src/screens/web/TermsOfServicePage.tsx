import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

interface TermsSection {
  id: string;
  title: string;
  content: string;
  subsections?: TermsSection[];
}

const TermsOfServicePage: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const termsSections: TermsSection[] = [
    {
      id: '1',
      title: '1. Acceptance of Terms',
      content: 'By accessing and using NBCON Pro ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.',
    },
    {
      id: '2',
      title: '2. Description of Service',
      content: 'NBCON Pro is a digital marketplace platform that connects engineering service providers with clients in Saudi Arabia. The platform facilitates project matching, communication, payment processing, and project management for engineering services.',
    },
    {
      id: '3',
      title: '3. User Accounts and Registration',
      content: 'To use our services, you must create an account and provide accurate, complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.',
      subsections: [
        {
          id: '3.1',
          title: '3.1 Account Requirements',
          content: 'Users must be at least 18 years old and legally capable of entering into contracts. Engineers must provide valid professional credentials including SCE (Saudi Council of Engineers) license verification.',
        },
        {
          id: '3.2',
          title: '3.2 Account Security',
          content: 'You are responsible for maintaining the security of your account and password. NBCON Pro cannot and will not be liable for any loss or damage arising from your failure to comply with this security obligation.',
        },
      ],
    },
    {
      id: '4',
      title: '4. User Responsibilities',
      content: 'All users agree to use the platform in accordance with applicable laws and regulations. Users must not engage in fraudulent, illegal, or harmful activities.',
      subsections: [
        {
          id: '4.1',
          title: '4.1 Engineer Responsibilities',
          content: 'Engineers must provide accurate professional information, maintain valid credentials, deliver services as agreed, and comply with all applicable engineering standards and regulations in Saudi Arabia.',
        },
        {
          id: '4.2',
          title: '4.2 Client Responsibilities',
          content: 'Clients must provide accurate project requirements, make timely payments, and provide necessary access and information for project completion.',
        },
      ],
    },
    {
      id: '5',
      title: '5. Service Fees and Payments',
      content: 'NBCON Pro charges service fees for successful project completions. Payment terms, fees, and billing cycles are clearly disclosed before project initiation.',
      subsections: [
        {
          id: '5.1',
          title: '5.1 Fee Structure',
          content: 'Service fees typically range from 5-8% of project value, depending on project size and complexity. Fees are clearly displayed before project acceptance.',
        },
        {
          id: '5.2',
          title: '5.2 Payment Processing',
          content: 'All payments are processed through secure, PCI-compliant payment gateways. We support mada, STC Pay, Apple Pay, and bank transfers.',
        },
      ],
    },
    {
      id: '6',
      title: '6. Intellectual Property Rights',
      content: 'Users retain ownership of their intellectual property. By using the platform, you grant NBCON Pro a limited license to use your content for platform operations.',
      subsections: [
        {
          id: '6.1',
          title: '6.1 User Content',
          content: 'You retain ownership of all content you upload to the platform. You grant us a non-exclusive, royalty-free license to use, display, and distribute your content in connection with the platform.',
        },
        {
          id: '6.2',
          title: '6.2 Platform Content',
          content: 'All platform content, including software, designs, and documentation, is owned by NBCON Pro and protected by intellectual property laws.',
        },
      ],
    },
    {
      id: '7',
      title: '7. Privacy and Data Protection',
      content: 'We are committed to protecting your privacy and personal data in accordance with Saudi Arabia\'s Personal Data Protection Law (PDPL) and international best practices.',
      subsections: [
        {
          id: '7.1',
          title: '7.1 Data Collection',
          content: 'We collect only necessary data for platform operation, including profile information, project details, and communication records.',
        },
        {
          id: '7.2',
          title: '7.2 Data Security',
          content: 'We implement industry-standard security measures to protect your data against unauthorized access, alteration, disclosure, or destruction.',
        },
      ],
    },
    {
      id: '8',
      title: '8. Dispute Resolution',
      content: 'We provide a structured dispute resolution process for conflicts between users. All disputes are subject to Saudi Arabian law and jurisdiction.',
      subsections: [
        {
          id: '8.1',
          title: '8.1 Mediation Process',
          content: 'Disputes are first addressed through our internal mediation process, with trained mediators facilitating resolution.',
        },
        {
          id: '8.2',
          title: '8.2 Arbitration',
          content: 'If mediation fails, disputes may be resolved through binding arbitration in accordance with Saudi Arabian arbitration laws.',
        },
      ],
    },
    {
      id: '9',
      title: '9. Limitation of Liability',
      content: 'NBCON Pro\'s liability is limited to the maximum extent permitted by law. We are not liable for indirect, incidental, or consequential damages.',
      subsections: [
        {
          id: '9.1',
          title: '9.1 Service Availability',
          content: 'We strive for 99.9% uptime but do not guarantee uninterrupted service availability.',
        },
        {
          id: '9.2',
          title: '9.2 Third-Party Services',
          content: 'We are not responsible for third-party services, including payment processors, communication tools, or external integrations.',
        },
      ],
    },
    {
      id: '10',
      title: '10. Termination',
      content: 'Either party may terminate this agreement at any time. We reserve the right to suspend or terminate accounts that violate these terms.',
      subsections: [
        {
          id: '10.1',
          title: '10.1 Account Termination',
          content: 'Users may delete their accounts at any time. We may suspend accounts for violations of these terms or applicable laws.',
        },
        {
          id: '10.2',
          title: '10.2 Effect of Termination',
          content: 'Upon termination, access to the platform ceases, but certain provisions of this agreement survive termination.',
        },
      ],
    },
    {
      id: '11',
      title: '11. Governing Law',
      content: 'This agreement is governed by the laws of the Kingdom of Saudi Arabia. Any legal proceedings must be conducted in Saudi Arabian courts.',
    },
    {
      id: '12',
      title: '12. Changes to Terms',
      content: 'We reserve the right to modify these terms at any time. Users will be notified of significant changes, and continued use constitutes acceptance of new terms.',
    },
  ];

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const renderSection = (section: TermsSection, level: number = 0) => (
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
        <Text style={styles.headerTitle}>Terms of Service</Text>
        <Text style={styles.headerSubtitle}>
          Last updated: December 2024
        </Text>
      </View>

      {/* Introduction */}
      <View style={styles.introSection}>
        <Text style={styles.introTitle}>Welcome to NBCON Pro</Text>
        <Text style={styles.introText}>
          These Terms of Service ("Terms") govern your use of NBCON Pro, a digital marketplace 
          platform connecting engineering service providers with clients in Saudi Arabia. 
          Please read these terms carefully before using our services.
        </Text>
        <Text style={styles.introText}>
          By accessing or using NBCON Pro, you agree to be bound by these Terms. If you do not 
          agree to these Terms, please do not use our services.
        </Text>
      </View>

      {/* Terms Sections */}
      <View style={styles.termsSection}>
        <Text style={styles.termsTitle}>Terms and Conditions</Text>
        
        {termsSections.map((section) => renderSection(section))}
      </View>

      {/* Contact Information */}
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Questions About These Terms?</Text>
        <Text style={styles.contactText}>
          If you have any questions about these Terms of Service, please contact us:
        </Text>
        
        <View style={styles.contactInfo}>
          <Text style={styles.contactItem}>Email: legal@nbcon.pro</Text>
          <Text style={styles.contactItem}>Phone: +966 11 123 4567</Text>
          <Text style={styles.contactItem}>Address: Riyadh, Saudi Arabia</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2024 NBCON Pro. All rights reserved.
        </Text>
        <Text style={styles.footerText}>
          These terms are effective as of December 2024.
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
  termsSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  termsTitle: {
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
  },
  contactItem: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 8,
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

export default TermsOfServicePage;
