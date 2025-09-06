import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  experience: string;
  postedDate: string;
  description: string;
  requirements: string[];
  benefits: string[];
  salary?: string;
  urgent?: boolean;
}

const CareersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const departments = ['All', 'Engineering', 'Product', 'Marketing', 'Sales', 'Operations', 'HR', 'Finance'];
  const jobTypes = ['All', 'Full-time', 'Part-time', 'Contract', 'Remote'];

  const jobPositions: JobPosition[] = [
    {
      id: '1',
      title: 'Senior React Native Developer',
      department: 'Engineering',
      location: 'Riyadh, Saudi Arabia',
      type: 'Full-time',
      experience: '3-5 years',
      postedDate: '2 days ago',
      description: 'We are looking for a talented React Native developer to join our mobile development team and help build the next generation of engineering marketplace applications.',
      requirements: [
        '3+ years of React Native experience',
        'Strong TypeScript skills',
        'Experience with Redux/Redux Toolkit',
        'Knowledge of mobile UI/UX best practices',
        'Experience with native iOS/Android development',
      ],
      benefits: [
        'Competitive salary package',
        'Health insurance',
        'Flexible working hours',
        'Professional development opportunities',
        'Stock options',
      ],
      salary: '15,000 - 25,000 SAR',
      urgent: true,
    },
    {
      id: '2',
      title: 'Product Manager',
      department: 'Product',
      location: 'Riyadh, Saudi Arabia',
      type: 'Full-time',
      experience: '4-6 years',
      postedDate: '1 week ago',
      description: 'Lead product strategy and development for our engineering marketplace platform, working closely with engineering and design teams.',
      requirements: [
        '4+ years of product management experience',
        'Experience with B2B marketplace platforms',
        'Strong analytical and problem-solving skills',
        'Experience with agile development methodologies',
        'Excellent communication skills',
      ],
      benefits: [
        'Competitive salary package',
        'Health insurance',
        'Remote work options',
        'Professional development budget',
        'Performance bonuses',
      ],
      salary: '18,000 - 30,000 SAR',
    },
    {
      id: '3',
      title: 'UX/UI Designer',
      department: 'Product',
      location: 'Riyadh, Saudi Arabia',
      type: 'Full-time',
      experience: '2-4 years',
      postedDate: '3 days ago',
      description: 'Create intuitive and engaging user experiences for our mobile and web applications, focusing on the engineering marketplace domain.',
      requirements: [
        '2+ years of UX/UI design experience',
        'Proficiency in Figma, Sketch, or Adobe XD',
        'Experience with mobile app design',
        'Understanding of user research methodologies',
        'Portfolio demonstrating design skills',
      ],
      benefits: [
        'Competitive salary package',
        'Health insurance',
        'Design tools and software licenses',
        'Creative freedom and autonomy',
        'Team collaboration opportunities',
      ],
      salary: '12,000 - 20,000 SAR',
    },
    {
      id: '4',
      title: 'Backend Developer (Node.js)',
      department: 'Engineering',
      location: 'Riyadh, Saudi Arabia',
      type: 'Full-time',
      experience: '3-5 years',
      postedDate: '5 days ago',
      description: 'Build scalable backend services and APIs for our engineering marketplace platform using Node.js and modern cloud technologies.',
      requirements: [
        '3+ years of Node.js experience',
        'Experience with Express.js or similar frameworks',
        'Database design and optimization skills',
        'Experience with cloud platforms (AWS, Azure, GCP)',
        'Knowledge of microservices architecture',
      ],
      benefits: [
        'Competitive salary package',
        'Health insurance',
        'Flexible working hours',
        'Learning and development opportunities',
        'Modern tech stack',
      ],
      salary: '14,000 - 22,000 SAR',
    },
    {
      id: '5',
      title: 'Marketing Specialist',
      department: 'Marketing',
      location: 'Riyadh, Saudi Arabia',
      type: 'Full-time',
      experience: '2-3 years',
      postedDate: '1 week ago',
      description: 'Develop and execute marketing strategies to promote our engineering marketplace platform and attract both clients and engineers.',
      requirements: [
        '2+ years of digital marketing experience',
        'Experience with social media marketing',
        'Content creation and copywriting skills',
        'Analytics and reporting experience',
        'Understanding of B2B marketing',
      ],
      benefits: [
        'Competitive salary package',
        'Health insurance',
        'Marketing tools and resources',
        'Creative campaign opportunities',
        'Growth potential',
      ],
      salary: '8,000 - 15,000 SAR',
    },
  ];

  const filteredJobs = jobPositions.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || job.department === selectedDepartment;
    const matchesType = selectedType === 'All' || job.type === selectedType;
    
    return matchesSearch && matchesDepartment && matchesType;
  });

  const renderJobCard = ({ item }: { item: JobPosition }) => (
    <TouchableOpacity style={[styles.jobCard, item.urgent && styles.urgentJobCard]}>
      <View style={styles.jobHeader}>
        <View style={styles.jobTitleContainer}>
          <Text style={[styles.jobTitle, item.urgent && styles.urgentText]}>{item.title}</Text>
          {item.urgent && <View style={styles.urgentBadge}><Text style={styles.urgentBadgeText}>URGENT</Text></View>}
        </View>
        <Text style={styles.jobDepartment}>{item.department}</Text>
      </View>
      
      <View style={styles.jobDetails}>
        <View style={styles.jobDetailRow}>
          <Text style={styles.jobDetailLabel}>Location:</Text>
          <Text style={styles.jobDetailValue}>{item.location}</Text>
        </View>
        <View style={styles.jobDetailRow}>
          <Text style={styles.jobDetailLabel}>Type:</Text>
          <Text style={styles.jobDetailValue}>{item.type}</Text>
        </View>
        <View style={styles.jobDetailRow}>
          <Text style={styles.jobDetailLabel}>Experience:</Text>
          <Text style={styles.jobDetailValue}>{item.experience}</Text>
        </View>
        {item.salary && (
          <View style={styles.jobDetailRow}>
            <Text style={styles.jobDetailLabel}>Salary:</Text>
            <Text style={[styles.jobDetailValue, styles.salaryText]}>{item.salary}</Text>
          </View>
        )}
      </View>
      
      <Text style={styles.jobDescription} numberOfLines={3}>
        {item.description}
      </Text>
      
      <View style={styles.jobFooter}>
        <Text style={styles.postedDate}>Posted {item.postedDate}</Text>
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Join Our Team</Text>
        <Text style={styles.headerSubtitle}>
          Build the future of engineering in Saudi Arabia with NBCON Pro
        </Text>
      </View>

      {/* Search and Filters */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search job positions..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#666"
          />
        </View>
        
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.departmentFilter}>
            {departments.map((dept) => (
              <TouchableOpacity
                key={dept}
                style={[
                  styles.filterChip,
                  selectedDepartment === dept && styles.activeFilterChip
                ]}
                onPress={() => setSelectedDepartment(dept)}
              >
                <Text style={[
                  styles.filterChipText,
                  selectedDepartment === dept && styles.activeFilterChipText
                ]}>
                  {dept}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeFilter}>
            {jobTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.filterChip,
                  selectedType === type && styles.activeFilterChip
                ]}
                onPress={() => setSelectedType(type)}
              >
                <Text style={[
                  styles.filterChipText,
                  selectedType === type && styles.activeFilterChipText
                ]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Job Listings */}
      <View style={styles.jobsSection}>
        <View style={styles.jobsHeader}>
          <Text style={styles.jobsTitle}>Open Positions ({filteredJobs.length})</Text>
          <Text style={styles.jobsSubtitle}>
            Find your perfect role and help us revolutionize engineering services
          </Text>
        </View>
        
        <FlatList
          data={filteredJobs}
          renderItem={renderJobCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>

      {/* Why Work With Us Section */}
      <View style={styles.whyWorkSection}>
        <Text style={styles.sectionTitle}>Why Work With Us?</Text>
        <View style={styles.benefitsGrid}>
          <View style={styles.benefitCard}>
            <Text style={styles.benefitTitle}>Innovation</Text>
            <Text style={styles.benefitDescription}>
              Work on cutting-edge technology and help shape the future of engineering services
            </Text>
          </View>
          <View style={styles.benefitCard}>
            <Text style={styles.benefitTitle}>Growth</Text>
            <Text style={styles.benefitDescription}>
              Continuous learning opportunities and career advancement in a fast-growing company
            </Text>
          </View>
          <View style={styles.benefitCard}>
            <Text style={styles.benefitTitle}>Impact</Text>
            <Text style={styles.benefitDescription}>
              Make a real difference in Saudi Arabia's engineering sector and Vision 2030
            </Text>
          </View>
          <View style={styles.benefitCard}>
            <Text style={styles.benefitTitle}>Culture</Text>
            <Text style={styles.benefitDescription}>
              Collaborative, inclusive environment that values diversity and creativity
            </Text>
          </View>
        </View>
      </View>

      {/* Application Process */}
      <View style={styles.processSection}>
        <Text style={styles.sectionTitle}>Application Process</Text>
        <View style={styles.processSteps}>
          <View style={styles.processStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepTitle}>Apply Online</Text>
            <Text style={styles.stepDescription}>Submit your application with resume and cover letter</Text>
          </View>
          <View style={styles.processStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepTitle}>Initial Review</Text>
            <Text style={styles.stepDescription}>Our team reviews your application and qualifications</Text>
          </View>
          <View style={styles.processStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepTitle}>Interview</Text>
            <Text style={styles.stepDescription}>Technical and cultural fit interviews with the team</Text>
          </View>
          <View style={styles.processStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <Text style={styles.stepTitle}>Decision</Text>
            <Text style={styles.stepDescription}>Final decision and offer extended to successful candidates</Text>
          </View>
        </View>
      </View>

      {/* Contact Section */}
      <View style={styles.contactSection}>
        <Text style={styles.sectionTitle}>Questions About Careers?</Text>
        <Text style={styles.contactDescription}>
          Have questions about our open positions or application process? 
          We're here to help!
        </Text>
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contact HR Team</Text>
        </TouchableOpacity>
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
    textAlign: 'center',
    lineHeight: 24,
  },
  searchSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filtersContainer: {
    gap: 15,
  },
  departmentFilter: {
    marginBottom: 10,
  },
  typeFilter: {
    marginBottom: 10,
  },
  filterChip: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  activeFilterChip: {
    backgroundColor: '#1e3a8a',
    borderColor: '#1e3a8a',
  },
  filterChipText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterChipText: {
    color: 'white',
  },
  jobsSection: {
    padding: 20,
  },
  jobsHeader: {
    marginBottom: 20,
  },
  jobsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  jobsSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
  },
  jobCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  urgentJobCard: {
    borderColor: '#dc2626',
    borderWidth: 2,
  },
  jobHeader: {
    marginBottom: 15,
  },
  jobTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  urgentText: {
    color: '#dc2626',
  },
  urgentBadge: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 10,
  },
  urgentBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  jobDepartment: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  jobDetails: {
    marginBottom: 15,
  },
  jobDetailRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  jobDetailLabel: {
    fontSize: 14,
    color: '#6b7280',
    width: 80,
    fontWeight: '500',
  },
  jobDetailValue: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  salaryText: {
    color: '#059669',
    fontWeight: '600',
  },
  jobDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 15,
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postedDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  applyButton: {
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  applyButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  whyWorkSection: {
    backgroundColor: 'white',
    padding: 30,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  benefitCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 8,
  },
  benefitDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  processSection: {
    backgroundColor: 'white',
    padding: 30,
    marginBottom: 20,
  },
  processSteps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  processStep: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e3a8a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepNumberText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  contactSection: {
    backgroundColor: '#1e3a8a',
    padding: 30,
    alignItems: 'center',
  },
  contactDescription: {
    fontSize: 16,
    color: '#e0e7ff',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  contactButton: {
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  contactButtonText: {
    color: '#1e3a8a',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CareersPage;
