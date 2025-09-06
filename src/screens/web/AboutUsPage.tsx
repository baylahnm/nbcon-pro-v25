import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AboutUsPage: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedRegion, setSelectedRegion] = useState('sa');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('story');

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
    { id: 'story', name: 'Our Story', icon: 'book' },
    { id: 'mission', name: 'Mission', icon: 'target' },
    { id: 'vision', name: 'Vision 2030', icon: 'eye' },
    { id: 'team', name: 'Team', icon: 'people' },
    { id: 'values', name: 'Values', icon: 'heart' },
  ];

  const teamMembers = [
    {
      id: '1',
      name: 'Ahmed Al-Rashid',
      role: 'CEO & Founder',
      department: 'Leadership',
      experience: '15+ years',
      education: 'MSc Civil Engineering, KFUPM',
      location: 'Riyadh, Saudi Arabia',
      avatar: '👨‍💼',
      bio: 'Visionary leader with extensive experience in engineering and technology. Passionate about transforming the construction industry through innovation.',
      linkedin: 'https://linkedin.com/in/ahmed-alrashid',
      email: 'ahmed@nbcon.pro',
    },
    {
      id: '2',
      name: 'Sarah Al-Mansouri',
      role: 'CTO',
      department: 'Technology',
      experience: '12+ years',
      education: 'PhD Computer Science, MIT',
      location: 'Jeddah, Saudi Arabia',
      avatar: '👩‍💼',
      bio: 'Technology expert specializing in AI and machine learning. Leading the development of our intelligent matching algorithms.',
      linkedin: 'https://linkedin.com/in/sarah-almansouri',
      email: 'sarah@nbcon.pro',
    },
    {
      id: '3',
      name: 'Omar Al-Zahrani',
      role: 'Head of Engineering',
      department: 'Engineering',
      experience: '18+ years',
      education: 'MSc Mechanical Engineering, Stanford',
      location: 'Dammam, Saudi Arabia',
      avatar: '👨‍💼',
      bio: 'Senior engineer with expertise in MEP systems and project management. Ensuring quality and compliance across all projects.',
      linkedin: 'https://linkedin.com/in/omar-alzahrani',
      email: 'omar@nbcon.pro',
    },
    {
      id: '4',
      name: 'Fatima Al-Shehri',
      role: 'Head of Operations',
      department: 'Operations',
      experience: '10+ years',
      education: 'MBA, INSEAD',
      location: 'Riyadh, Saudi Arabia',
      avatar: '👩‍💼',
      bio: 'Operations specialist focused on process optimization and customer success. Driving operational excellence across the platform.',
      linkedin: 'https://linkedin.com/in/fatima-alshehri',
      email: 'fatima@nbcon.pro',
    },
    {
      id: '5',
      name: 'Khalid Al-Mutairi',
      role: 'Head of Business Development',
      department: 'Business',
      experience: '14+ years',
      education: 'MSc Business Administration, LBS',
      location: 'Jeddah, Saudi Arabia',
      avatar: '👨‍💼',
      bio: 'Business development expert with deep knowledge of the Saudi market. Building strategic partnerships and driving growth.',
      linkedin: 'https://linkedin.com/in/khalid-almutairi',
      email: 'khalid@nbcon.pro',
    },
    {
      id: '6',
      name: 'Noura Al-Dosari',
      role: 'Head of Marketing',
      department: 'Marketing',
      experience: '8+ years',
      education: 'MSc Digital Marketing, NYU',
      location: 'Riyadh, Saudi Arabia',
      avatar: '👩‍💼',
      bio: 'Marketing strategist specializing in digital transformation and brand building. Creating awareness and driving user acquisition.',
      linkedin: 'https://linkedin.com/in/noura-aldosari',
      email: 'noura@nbcon.pro',
    },
  ];

  const values = [
    {
      id: 'innovation',
      title: 'Innovation',
      icon: 'bulb',
      description: 'We continuously push the boundaries of technology to solve complex engineering challenges and improve industry standards.',
      examples: [
        'AI-powered project matching',
        'Blockchain-based verification',
        'AR/VR visualization tools',
        'IoT integration capabilities',
      ],
    },
    {
      id: 'excellence',
      title: 'Excellence',
      icon: 'star',
      description: 'We maintain the highest standards of quality in everything we do, from platform development to customer service.',
      examples: [
        'Rigorous quality assurance',
        'Continuous platform optimization',
        '24/7 customer support',
        'Regular security audits',
      ],
    },
    {
      id: 'collaboration',
      title: 'Collaboration',
      icon: 'people',
      description: 'We believe in the power of teamwork and foster a collaborative environment both internally and with our partners.',
      examples: [
        'Cross-functional teams',
        'Open communication channels',
        'Partner ecosystem',
        'Community engagement',
      ],
    },
    {
      id: 'integrity',
      title: 'Integrity',
      icon: 'shield',
      description: 'We operate with complete transparency and ethical standards, building trust with all our stakeholders.',
      examples: [
        'Transparent pricing',
        'Ethical business practices',
        'Data privacy protection',
        'Fair dispute resolution',
      ],
    },
    {
      id: 'sustainability',
      title: 'Sustainability',
      icon: 'leaf',
      description: 'We are committed to sustainable practices and supporting projects that contribute to environmental conservation.',
      examples: [
        'Carbon footprint tracking',
        'Green building initiatives',
        'Sustainable project promotion',
        'Environmental compliance',
      ],
    },
    {
      id: 'empowerment',
      title: 'Empowerment',
      icon: 'rocket',
      description: 'We empower engineers and clients to achieve their goals through our platform and support services.',
      examples: [
        'Skill development programs',
        'Business growth tools',
        'Educational resources',
        'Mentorship opportunities',
      ],
    },
  ];

  const vision2030Alignment = [
    {
      id: 'economic-diversification',
      title: 'Economic Diversification',
      description: 'Supporting the transition from oil-dependent to knowledge-based economy through engineering innovation.',
      initiatives: [
        'Promoting engineering entrepreneurship',
        'Supporting local engineering talent',
        'Facilitating technology transfer',
        'Creating high-value jobs',
      ],
    },
    {
      id: 'digital-transformation',
      title: 'Digital Transformation',
      description: 'Leading the digital transformation of the construction and engineering sectors in Saudi Arabia.',
      initiatives: [
        'BIM integration and adoption',
        'IoT and smart city solutions',
        'AI-powered project management',
        'Digital collaboration tools',
      ],
    },
    {
      id: 'sustainable-development',
      title: 'Sustainable Development',
      description: 'Contributing to sustainable development goals through green engineering and environmental initiatives.',
      initiatives: [
        'Green building certification',
        'Renewable energy projects',
        'Water conservation systems',
        'Waste reduction programs',
      ],
    },
    {
      id: 'human-capital',
      title: 'Human Capital Development',
      description: 'Investing in human capital through education, training, and professional development programs.',
      initiatives: [
        'Engineering education partnerships',
        'Professional certification programs',
        'Mentorship and coaching',
        'Career development pathways',
      ],
    },
    {
      id: 'innovation-ecosystem',
      title: 'Innovation Ecosystem',
      description: 'Building a thriving innovation ecosystem that supports research, development, and commercialization.',
      initiatives: [
        'R&D partnerships with universities',
        'Startup incubation programs',
        'Technology transfer initiatives',
        'Innovation competitions',
      ],
    },
    {
      id: 'global-competitiveness',
      title: 'Global Competitiveness',
      description: 'Enhancing Saudi Arabia\'s global competitiveness in engineering and technology sectors.',
      initiatives: [
        'International partnerships',
        'Global best practices adoption',
        'Export promotion',
        'Quality standards alignment',
      ],
    },
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'NBCON Pro was established with a vision to transform the engineering industry in Saudi Arabia.',
      achievements: [
        'Initial team of 5 people',
        'First office in Riyadh',
        'Seed funding secured',
        'Platform concept developed',
      ],
    },
    {
      year: '2021',
      title: 'Platform Launch',
      description: 'Launched the first version of our platform with basic project management features.',
      achievements: [
        'Beta platform released',
        'First 100 users onboarded',
        '50+ projects completed',
        'Mobile app development started',
      ],
    },
    {
      year: '2022',
      title: 'Rapid Growth',
      description: 'Experienced significant growth in users, projects, and platform capabilities.',
      achievements: [
        '1,000+ active users',
        '500+ projects completed',
        'AI matching system launched',
        'Enterprise features added',
      ],
    },
    {
      year: '2023',
      title: 'Market Leadership',
      description: 'Established ourselves as the leading engineering marketplace in Saudi Arabia.',
      achievements: [
        '5,000+ active users',
        '2,000+ projects completed',
        'International expansion started',
        'Advanced features launched',
      ],
    },
    {
      year: '2024',
      title: 'Innovation Focus',
      description: 'Focus on advanced technologies and Vision 2030 alignment.',
      achievements: [
        '10,000+ active users',
        '5,000+ projects completed',
        'AR/VR features launched',
        'Blockchain integration',
      ],
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

  const handleContact = () => {
    Alert.alert('Contact Us', 'Redirecting to contact form...');
  };

  const handleJoinTeam = () => {
    Alert.alert('Join Our Team', 'Redirecting to careers page...');
  };

  const TeamMemberCard = ({ member }: { member: any }) => (
    <View style={styles.teamMemberCard}>
      <View style={styles.teamMemberHeader}>
        <Text style={styles.teamMemberAvatar}>{member.avatar}</Text>
        <View style={styles.teamMemberInfo}>
          <Text style={styles.teamMemberName}>{member.name}</Text>
          <Text style={styles.teamMemberRole}>{member.role}</Text>
          <Text style={styles.teamMemberDepartment}>{member.department}</Text>
          <Text style={styles.teamMemberLocation}>{member.location}</Text>
        </View>
      </View>
      <Text style={styles.teamMemberBio}>{member.bio}</Text>
      <View style={styles.teamMemberDetails}>
        <View style={styles.teamMemberDetail}>
          <Text style={styles.teamMemberDetailLabel}>Experience:</Text>
          <Text style={styles.teamMemberDetailValue}>{member.experience}</Text>
        </View>
        <View style={styles.teamMemberDetail}>
          <Text style={styles.teamMemberDetailLabel}>Education:</Text>
          <Text style={styles.teamMemberDetailValue}>{member.education}</Text>
        </View>
      </View>
      <View style={styles.teamMemberActions}>
        <TouchableOpacity style={styles.teamMemberAction}>
          <Ionicons name="logo-linkedin" size={16} color="#0077b5" />
          <Text style={styles.teamMemberActionText}>LinkedIn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.teamMemberAction}>
          <Ionicons name="mail" size={16} color="#007bff" />
          <Text style={styles.teamMemberActionText}>Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const ValueCard = ({ value }: { value: any }) => (
    <View style={styles.valueCard}>
      <View style={styles.valueIcon}>
        <Ionicons name={value.icon as any} size={32} color="#007bff" />
      </View>
      <Text style={styles.valueTitle}>{value.title}</Text>
      <Text style={styles.valueDescription}>{value.description}</Text>
      <View style={styles.valueExamples}>
        {value.examples.map((example: string, index: number) => (
          <View key={index} style={styles.valueExample}>
            <Ionicons name="checkmark" size={14} color="#28a745" />
            <Text style={styles.valueExampleText}>{example}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const Vision2030Card = ({ item }: { item: any }) => (
    <View style={styles.visionCard}>
      <Text style={styles.visionTitle}>{item.title}</Text>
      <Text style={styles.visionDescription}>{item.description}</Text>
      <View style={styles.visionInitiatives}>
        {item.initiatives.map((initiative: string, index: number) => (
          <View key={index} style={styles.visionInitiative}>
            <Ionicons name="arrow-forward" size={14} color="#007bff" />
            <Text style={styles.visionInitiativeText}>{initiative}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const MilestoneCard = ({ milestone }: { milestone: any }) => (
    <View style={styles.milestoneCard}>
      <View style={styles.milestoneYear}>
        <Text style={styles.milestoneYearText}>{milestone.year}</Text>
      </View>
      <View style={styles.milestoneContent}>
        <Text style={styles.milestoneTitle}>{milestone.title}</Text>
        <Text style={styles.milestoneDescription}>{milestone.description}</Text>
        <View style={styles.milestoneAchievements}>
          {milestone.achievements.map((achievement: string, index: number) => (
            <View key={index} style={styles.milestoneAchievement}>
              <Ionicons name="checkmark-circle" size={16} color="#28a745" />
              <Text style={styles.milestoneAchievementText}>{achievement}</Text>
            </View>
          ))}
        </View>
      </View>
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
              onPress={() => handleTabChange(item.id)}
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

      {selectedTab === 'story' && (
        <View style={styles.content}>
          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>Our Story</Text>
            <Text style={styles.heroSubtitle}>
              Building the future of engineering in Saudi Arabia
            </Text>
          </View>

          <View style={styles.storySection}>
            <Text style={styles.sectionTitle}>How It All Began</Text>
            <Text style={styles.storyText}>
              NBCON Pro was born from a simple yet powerful vision: to connect the best engineering talent 
              in Saudi Arabia with the projects that need them most. Founded in 2020 by a team of passionate 
              engineers and technology experts, we recognized the need for a modern, efficient platform that 
              could bridge the gap between clients and engineers.
            </Text>
            <Text style={styles.storyText}>
              Our journey began in Riyadh, where we saw firsthand the challenges faced by both engineers 
              seeking meaningful work and clients looking for reliable, skilled professionals. The traditional 
              methods of project procurement were inefficient, time-consuming, and often resulted in mismatched 
              partnerships.
            </Text>
            <Text style={styles.storyText}>
              Today, we're proud to be Saudi Arabia's leading engineering marketplace, with thousands of 
              successful projects and a growing community of engineers and clients who trust our platform 
              to deliver exceptional results.
            </Text>
          </View>

          <View style={styles.milestonesSection}>
            <Text style={styles.sectionTitle}>Our Journey</Text>
            {milestones.map((milestone) => (
              <MilestoneCard key={milestone.year} milestone={milestone} />
            ))}
          </View>
        </View>
      )}

      {selectedTab === 'mission' && (
        <View style={styles.content}>
          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>Our Mission</Text>
            <Text style={styles.heroSubtitle}>
              Empowering engineers and clients to achieve their goals
            </Text>
          </View>

          <View style={styles.missionSection}>
            <Text style={styles.sectionTitle}>What We Do</Text>
            <Text style={styles.missionText}>
              Our mission is to revolutionize the engineering industry in Saudi Arabia by providing a 
              comprehensive platform that connects clients with the best engineering talent, streamlines 
              project management, and ensures successful project delivery.
            </Text>
            <Text style={styles.missionText}>
              We believe that every engineering project deserves the right team, the right tools, and 
              the right support to succeed. That's why we've built a platform that not only matches 
              clients with engineers but also provides the tools and resources needed for project success.
            </Text>
            <Text style={styles.missionText}>
              Our commitment to excellence, innovation, and customer satisfaction drives everything we do, 
              from platform development to customer support.
            </Text>
          </View>

          <View style={styles.valuesSection}>
            <Text style={styles.sectionTitle}>Our Values</Text>
            <View style={styles.valuesGrid}>
              {values.map((value) => (
                <ValueCard key={value.id} value={value} />
              ))}
            </View>
          </View>
        </View>
      )}

      {selectedTab === 'vision' && (
        <View style={styles.content}>
          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>Vision 2030 Alignment</Text>
            <Text style={styles.heroSubtitle}>
              Supporting Saudi Arabia's transformation goals
            </Text>
          </View>

          <View style={styles.visionSection}>
            <Text style={styles.sectionTitle}>Our Commitment to Vision 2030</Text>
            <Text style={styles.visionText}>
              NBCON Pro is proud to align with Saudi Arabia's Vision 2030, supporting the kingdom's 
              transformation into a diversified, knowledge-based economy. We believe that engineering 
              and technology are key drivers of this transformation, and we're committed to playing 
              our part in achieving these ambitious goals.
            </Text>
            <Text style={styles.visionText}>
              Through our platform and initiatives, we're contributing to economic diversification, 
              digital transformation, sustainable development, and human capital development - all 
              key pillars of Vision 2030.
            </Text>
          </View>

          <View style={styles.vision2030Section}>
            {vision2030Alignment.map((item) => (
              <Vision2030Card key={item.id} item={item} />
            ))}
          </View>
        </View>
      )}

      {selectedTab === 'team' && (
        <View style={styles.content}>
          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>Meet Our Team</Text>
            <Text style={styles.heroSubtitle}>
              The passionate people behind NBCON Pro
            </Text>
          </View>

          <View style={styles.teamSection}>
            <Text style={styles.sectionTitle}>Leadership Team</Text>
            <View style={styles.teamGrid}>
              {teamMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </View>
          </View>

          <View style={styles.ctaSection}>
            <Text style={styles.ctaTitle}>Join Our Team</Text>
            <Text style={styles.ctaSubtitle}>
              We're always looking for talented individuals to join our mission
            </Text>
            <TouchableOpacity style={styles.ctaButton} onPress={handleJoinTeam}>
              <Text style={styles.ctaButtonText}>View Open Positions</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {selectedTab === 'values' && (
        <View style={styles.content}>
          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>Our Values</Text>
            <Text style={styles.heroSubtitle}>
              The principles that guide everything we do
            </Text>
          </View>

          <View style={styles.valuesSection}>
            <Text style={styles.sectionTitle}>What We Stand For</Text>
            <View style={styles.valuesGrid}>
              {values.map((value) => (
                <ValueCard key={value.id} value={value} />
              ))}
            </View>
          </View>
        </View>
      )}

      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View style={styles.footerSection}>
            <Text style={styles.footerTitle}>NBCON Pro</Text>
            <Text style={styles.footerDescription}>
              Saudi Arabia's premier engineering marketplace connecting clients with top engineers.
            </Text>
          </View>
          <View style={styles.footerSection}>
            <Text style={styles.footerTitle}>Company</Text>
            <Text style={styles.footerLink}>Our Story</Text>
            <Text style={styles.footerLink}>Mission & Vision</Text>
            <Text style={styles.footerLink}>Team</Text>
            <Text style={styles.footerLink}>Careers</Text>
          </View>
          <View style={styles.footerSection}>
            <Text style={styles.footerTitle}>Support</Text>
            <Text style={styles.footerLink}>Help Center</Text>
            <Text style={styles.footerLink}>Contact Us</Text>
            <Text style={styles.footerLink}>Documentation</Text>
            <Text style={styles.footerLink}>Status</Text>
          </View>
          <View style={styles.footerSection}>
            <Text style={styles.footerTitle}>Legal</Text>
            <Text style={styles.footerLink}>Privacy Policy</Text>
            <Text style={styles.footerLink}>Terms of Service</Text>
            <Text style={styles.footerLink}>Cookie Policy</Text>
            <Text style={styles.footerLink}>Compliance</Text>
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
  content: {
    flex: 1,
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
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#e3f2fd',
    textAlign: 'center',
    lineHeight: 26,
  },
  storySection: {
    padding: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  storyText: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    marginBottom: 20,
  },
  milestonesSection: {
    backgroundColor: '#f8f9fa',
    padding: 40,
  },
  milestoneCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  milestoneYear: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 15,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  milestoneYearText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  milestoneContent: {
    flex: 1,
  },
  milestoneTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  milestoneDescription: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 15,
    lineHeight: 22,
  },
  milestoneAchievements: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  milestoneAchievement: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 8,
  },
  milestoneAchievementText: {
    fontSize: 14,
    color: '#333333',
    marginLeft: 8,
  },
  missionSection: {
    padding: 40,
  },
  missionText: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    marginBottom: 20,
  },
  valuesSection: {
    backgroundColor: '#f8f9fa',
    padding: 40,
  },
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  valueCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  valueIcon: {
    alignItems: 'center',
    marginBottom: 15,
  },
  valueTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 10,
  },
  valueDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 20,
  },
  valueExamples: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  valueExample: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 5,
  },
  valueExampleText: {
    fontSize: 12,
    color: '#333333',
    marginLeft: 5,
  },
  visionSection: {
    padding: 40,
  },
  visionText: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    marginBottom: 20,
  },
  vision2030Section: {
    backgroundColor: '#f8f9fa',
    padding: 40,
  },
  visionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  visionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  visionDescription: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 15,
    lineHeight: 22,
  },
  visionInitiatives: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  visionInitiative: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 8,
  },
  visionInitiativeText: {
    fontSize: 14,
    color: '#333333',
    marginLeft: 8,
  },
  teamSection: {
    padding: 40,
  },
  teamGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  teamMemberCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  teamMemberHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  teamMemberAvatar: {
    fontSize: 32,
    marginRight: 15,
  },
  teamMemberInfo: {
    flex: 1,
  },
  teamMemberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 2,
  },
  teamMemberRole: {
    fontSize: 14,
    color: '#007bff',
    marginBottom: 2,
  },
  teamMemberDepartment: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 2,
  },
  teamMemberLocation: {
    fontSize: 12,
    color: '#999999',
  },
  teamMemberBio: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 15,
  },
  teamMemberDetails: {
    marginBottom: 15,
  },
  teamMemberDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  teamMemberDetailLabel: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  teamMemberDetailValue: {
    fontSize: 12,
    color: '#333333',
  },
  teamMemberActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  teamMemberAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  teamMemberActionText: {
    fontSize: 12,
    color: '#333333',
    marginLeft: 5,
  },
  ctaSection: {
    backgroundColor: '#007bff',
    padding: 40,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: '#e3f2fd',
    textAlign: 'center',
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
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

export default AboutUsPage;
