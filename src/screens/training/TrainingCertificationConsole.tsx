import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';

interface TrainingCourse {
  id: string;
  title: string;
  description: string;
  category: 'safety' | 'technical' | 'compliance' | 'soft_skills' | 'certification' | 'other';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  duration: number; // in hours
  status: 'draft' | 'published' | 'archived' | 'suspended';
  createdDate: string;
  lastUpdated: string;
  instructor: string;
  price: number;
  maxStudents: number;
  enrolledStudents: number;
  completionRate: number;
  rating: number;
  prerequisites: string[];
  learningObjectives: string[];
  modules: TrainingModule[];
}

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  type: 'video' | 'reading' | 'quiz' | 'assignment' | 'live_session';
  content: string;
  order: number;
}

interface Certification {
  id: string;
  name: string;
  description: string;
  issuingBody: string;
  validityPeriod: number; // in months
  requirements: string[];
  examRequired: boolean;
  examDuration?: number; // in minutes
  passingScore: number;
  status: 'active' | 'inactive' | 'expired';
}

const TrainingCertificationConsole: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [newModuleDescription, setNewModuleDescription] = useState('');

  const [trainingCourses, setTrainingCourses] = useState<TrainingCourse[]>([
    {
      id: '1',
      title: 'Saudi Building Code Fundamentals',
      description: 'Comprehensive course covering Saudi Building Code requirements and applications',
      category: 'compliance',
      level: 'intermediate',
      duration: 40,
      status: 'published',
      createdDate: '2024-11-15T10:00:00Z',
      lastUpdated: '2024-12-10T14:30:00Z',
      instructor: 'Dr. Ahmed Al-Rashid',
      price: 500,
      maxStudents: 50,
      enrolledStudents: 32,
      completionRate: 85,
      rating: 4.7,
      prerequisites: ['Basic engineering knowledge', 'English proficiency'],
      learningObjectives: [
        'Understand Saudi Building Code structure',
        'Apply code requirements to design projects',
        'Navigate code compliance procedures',
        'Identify common code violations'
      ],
      modules: [
        {
          id: '1',
          title: 'Introduction to SBC',
          description: 'Overview of Saudi Building Code structure and organization',
          duration: 60,
          type: 'video',
          content: 'Introduction to SBC video content',
          order: 1
        },
        {
          id: '2',
          title: 'Structural Requirements',
          description: 'Structural design requirements and calculations',
          duration: 90,
          type: 'video',
          content: 'Structural requirements video content',
          order: 2
        },
        {
          id: '3',
          title: 'Fire Safety Codes',
          description: 'Fire safety requirements and emergency systems',
          duration: 75,
          type: 'video',
          content: 'Fire safety codes video content',
          order: 3
        },
        {
          id: '4',
          title: 'SBC Quiz',
          description: 'Assessment of SBC knowledge',
          duration: 30,
          type: 'quiz',
          content: 'SBC knowledge assessment quiz',
          order: 4
        }
      ]
    },
    {
      id: '2',
      title: 'Construction Safety Management',
      description: 'Advanced safety management for construction projects in Saudi Arabia',
      category: 'safety',
      level: 'advanced',
      duration: 60,
      status: 'published',
      createdDate: '2024-10-20T09:00:00Z',
      lastUpdated: '2024-12-05T11:15:00Z',
      instructor: 'Sarah Johnson, CSP',
      price: 750,
      maxStudents: 30,
      enrolledStudents: 28,
      completionRate: 92,
      rating: 4.9,
      prerequisites: ['Basic safety knowledge', 'Construction experience'],
      learningObjectives: [
        'Develop comprehensive safety programs',
        'Implement safety management systems',
        'Conduct safety audits and inspections',
        'Manage safety compliance requirements'
      ],
      modules: [
        {
          id: '1',
          title: 'Safety Program Development',
          description: 'Creating effective safety programs',
          duration: 120,
          type: 'video',
          content: 'Safety program development video',
          order: 1
        },
        {
          id: '2',
          title: 'Risk Assessment',
          description: 'Identifying and assessing construction risks',
          duration: 90,
          type: 'video',
          content: 'Risk assessment video content',
          order: 2
        },
        {
          id: '3',
          title: 'Safety Audit Workshop',
          description: 'Hands-on safety audit training',
          duration: 180,
          type: 'live_session',
          content: 'Live safety audit workshop',
          order: 3
        }
      ]
    },
    {
      id: '3',
      title: 'BIM for Engineers',
      description: 'Building Information Modeling fundamentals and applications',
      category: 'technical',
      level: 'beginner',
      duration: 35,
      status: 'published',
      createdDate: '2024-12-01T14:00:00Z',
      lastUpdated: '2024-12-12T16:45:00Z',
      instructor: 'Mike Wilson, BIM Manager',
      price: 300,
      maxStudents: 40,
      enrolledStudents: 15,
      completionRate: 78,
      rating: 4.5,
      prerequisites: ['Basic CAD knowledge'],
      learningObjectives: [
        'Understand BIM concepts and benefits',
        'Use BIM software effectively',
        'Create 3D models and drawings',
        'Collaborate in BIM environments'
      ],
      modules: [
        {
          id: '1',
          title: 'BIM Fundamentals',
          description: 'Introduction to BIM concepts and workflows',
          duration: 45,
          type: 'video',
          content: 'BIM fundamentals video',
          order: 1
        },
        {
          id: '2',
          title: 'BIM Software Overview',
          description: 'Overview of popular BIM software tools',
          duration: 60,
          type: 'video',
          content: 'BIM software overview video',
          order: 2
        },
        {
          id: '3',
          title: 'BIM Project Assignment',
          description: 'Hands-on BIM project assignment',
          duration: 120,
          type: 'assignment',
          content: 'BIM project assignment details',
          order: 3
        }
      ]
    }
  ]);

  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: '1',
      name: 'Professional Engineer (PE) License',
      description: 'Saudi Council of Engineers professional engineering license',
      issuingBody: 'Saudi Council of Engineers (SCE)',
      validityPeriod: 60,
      requirements: [
        'Bachelor degree in engineering',
        '4 years of professional experience',
        'Pass SCE examination',
        'Complete continuing education requirements'
      ],
      examRequired: true,
      examDuration: 240,
      passingScore: 70,
      status: 'active'
    },
    {
      id: '2',
      name: 'Project Management Professional (PMP)',
      description: 'Project Management Institute certification',
      issuingBody: 'Project Management Institute (PMI)',
      validityPeriod: 36,
      requirements: [
        'Bachelor degree or equivalent',
        '4500 hours of project management experience',
        '35 hours of project management education',
        'Pass PMP examination'
      ],
      examRequired: true,
      examDuration: 230,
      passingScore: 61,
      status: 'active'
    },
    {
      id: '3',
      name: 'Safety Professional Certification',
      description: 'Occupational safety and health certification',
      issuingBody: 'Saudi Safety Society',
      validityPeriod: 24,
      requirements: [
        'Safety-related degree or experience',
        'Complete safety training courses',
        'Pass safety examination',
        'Maintain continuing education'
      ],
      examRequired: true,
      examDuration: 180,
      passingScore: 75,
      status: 'active'
    }
  ]);

  const categories = [
    { id: 'all', name: 'All Categories', icon: '📚' },
    { id: 'safety', name: 'Safety', icon: '🦺' },
    { id: 'technical', name: 'Technical', icon: '🔧' },
    { id: 'compliance', name: 'Compliance', icon: '📋' },
    { id: 'soft_skills', name: 'Soft Skills', icon: '💬' },
    { id: 'certification', name: 'Certification', icon: '🏆' },
    { id: 'other', name: 'Other', icon: '📖' },
  ];

  const levels = [
    { id: 'all', name: 'All Levels', color: '#6b7280' },
    { id: 'beginner', name: 'Beginner', color: '#059669' },
    { id: 'intermediate', name: 'Intermediate', color: '#d97706' },
    { id: 'advanced', name: 'Advanced', color: '#dc2626' },
    { id: 'expert', name: 'Expert', color: '#991b1b' },
  ];

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourse(courseId);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleLevelSelect = (levelId: string) => {
    setSelectedLevel(levelId);
  };

  const handleAddModule = () => {
    if (!newModuleTitle.trim() || !newModuleDescription.trim()) {
      Alert.alert('Error', 'Please enter both module title and description.');
      return;
    }

    if (!selectedCourse) {
      Alert.alert('Error', 'Please select a course first.');
      return;
    }

    Alert.alert('Module Added', 'New module has been added successfully.');
    setNewModuleTitle('');
    setNewModuleDescription('');
  };

  const handleUpdateCourseStatus = (courseId: string, newStatus: string) => {
    setTrainingCourses(prev =>
      prev.map(course =>
        course.id === courseId
          ? { ...course, status: newStatus as any, lastUpdated: new Date().toISOString() }
          : course
      )
    );
    Alert.alert('Status Updated', `Course status updated to ${newStatus}.`);
  };

  const getCategoryIcon = (category: string) => {
    const categoryObj = categories.find(c => c.id === category);
    return categoryObj?.icon || '📚';
  };

  const getLevelColor = (level: string) => {
    const levelObj = levels.find(l => l.id === level);
    return levelObj?.color || '#6b7280';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return '#6b7280';
      case 'published': return '#059669';
      case 'archived': return '#6b7280';
      case 'suspended': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-SA', {
      style: 'currency',
      currency: 'SAR',
    }).format(amount);
  };

  const filteredCourses = trainingCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = !selectedLevel || selectedLevel === 'all' || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const selectedCourseData = trainingCourses.find(c => c.id === selectedCourse);

  const renderCourse = (course: TrainingCourse) => (
    <TouchableOpacity
      key={course.id}
      style={[
        styles.courseCard,
        selectedCourse === course.id && styles.selectedCourseCard
      ]}
      onPress={() => handleCourseSelect(course.id)}
    >
      <View style={styles.courseHeader}>
        <Text style={styles.courseIcon}>{getCategoryIcon(course.category)}</Text>
        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle}>{course.title}</Text>
          <Text style={styles.courseDescription}>{course.description}</Text>
        </View>
        <View style={styles.courseBadges}>
          <View style={[styles.levelBadge, { backgroundColor: getLevelColor(course.level) }]}>
            <Text style={styles.levelText}>{course.level.toUpperCase()}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(course.status) }]}>
            <Text style={styles.statusText}>{course.status.toUpperCase()}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.courseDetails}>
        <Text style={styles.courseDetail}>Instructor: {course.instructor}</Text>
        <Text style={styles.courseDetail}>Duration: {course.duration} hours</Text>
        <Text style={styles.courseDetail}>Price: {formatCurrency(course.price)}</Text>
        <Text style={styles.courseDetail}>
          Students: {course.enrolledStudents}/{course.maxStudents}
        </Text>
      </View>
      
      <View style={styles.courseMetrics}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Completion Rate</Text>
          <Text style={styles.metricValue}>{course.completionRate}%</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Rating</Text>
          <Text style={styles.metricValue}>⭐ {course.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategory = (category: any) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryCard,
        selectedCategory === category.id && styles.selectedCategoryCard
      ]}
      onPress={() => handleCategorySelect(category.id)}
    >
      <Text style={styles.categoryIcon}>{category.icon}</Text>
      <Text style={styles.categoryName}>{category.name}</Text>
    </TouchableOpacity>
  );

  const renderLevel = (level: any) => (
    <TouchableOpacity
      key={level.id}
      style={[
        styles.levelCard,
        selectedLevel === level.id && styles.selectedLevelCard
      ]}
      onPress={() => handleLevelSelect(level.id)}
    >
      <View style={[styles.levelIndicator, { backgroundColor: level.color }]} />
      <Text style={styles.levelName}>{level.name}</Text>
    </TouchableOpacity>
  );

  const renderModule = (module: TrainingModule) => (
    <View key={module.id} style={styles.moduleCard}>
      <View style={styles.moduleHeader}>
        <Text style={styles.moduleTitle}>{module.title}</Text>
        <View style={styles.moduleTypeBadge}>
          <Text style={styles.moduleTypeText}>{module.type.toUpperCase()}</Text>
        </View>
      </View>
      
      <Text style={styles.moduleDescription}>{module.description}</Text>
      
      <View style={styles.moduleDetails}>
        <Text style={styles.moduleDetail}>Duration: {module.duration} minutes</Text>
        <Text style={styles.moduleDetail}>Order: {module.order}</Text>
      </View>
    </View>
  );

  const renderCertification = (cert: Certification) => (
    <View key={cert.id} style={styles.certificationCard}>
      <View style={styles.certificationHeader}>
        <Text style={styles.certificationName}>{cert.name}</Text>
        <View style={[styles.certificationStatusBadge, { 
          backgroundColor: cert.status === 'active' ? '#059669' : '#6b7280' 
        }]}>
          <Text style={styles.certificationStatusText}>{cert.status.toUpperCase()}</Text>
        </View>
      </View>
      
      <Text style={styles.certificationDescription}>{cert.description}</Text>
      
      <View style={styles.certificationDetails}>
        <Text style={styles.certificationDetail}>Issuing Body: {cert.issuingBody}</Text>
        <Text style={styles.certificationDetail}>Validity: {cert.validityPeriod} months</Text>
        {cert.examRequired && (
          <Text style={styles.certificationDetail}>
            Exam: {cert.examDuration} minutes, {cert.passingScore}% passing score
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Training & Certification Console</Text>
        <Text style={styles.headerSubtitle}>
          Manage training courses and professional certifications
        </Text>
      </View>

      {/* Filters */}
      <View style={styles.filtersSection}>
        <Text style={styles.sectionTitle}>Filters</Text>
        
        <View style={styles.searchSection}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search courses..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
        </View>
        
        <View style={styles.categoriesSection}>
          <Text style={styles.filterTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map(renderCategory)}
          </ScrollView>
        </View>
        
        <View style={styles.levelsSection}>
          <Text style={styles.filterTitle}>Levels</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {levels.map(renderLevel)}
          </ScrollView>
        </View>
      </View>

      {/* Courses List */}
      <View style={styles.coursesSection}>
        <Text style={styles.sectionTitle}>Training Courses ({filteredCourses.length})</Text>
        
        {filteredCourses.map(renderCourse)}
      </View>

      {/* Course Details */}
      {selectedCourseData && (
        <View style={styles.courseDetailsSection}>
          <Text style={styles.sectionTitle}>Course Details</Text>
          
          <View style={styles.courseDetailsCard}>
            <View style={styles.courseDetailsHeader}>
              <Text style={styles.courseDetailsTitle}>{selectedCourseData.title}</Text>
              <View style={styles.courseDetailsBadges}>
                <View style={[styles.levelBadge, { backgroundColor: getLevelColor(selectedCourseData.level) }]}>
                  <Text style={styles.levelText}>{selectedCourseData.level.toUpperCase()}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(selectedCourseData.status) }]}>
                  <Text style={styles.statusText}>{selectedCourseData.status.toUpperCase()}</Text>
                </View>
              </View>
            </View>
            
            <Text style={styles.courseDetailsDescription}>{selectedCourseData.description}</Text>
            
            <View style={styles.courseDetailsInfo}>
              <Text style={styles.courseDetailsInfoItem}>Instructor: {selectedCourseData.instructor}</Text>
              <Text style={styles.courseDetailsInfoItem}>Duration: {selectedCourseData.duration} hours</Text>
              <Text style={styles.courseDetailsInfoItem}>Price: {formatCurrency(selectedCourseData.price)}</Text>
              <Text style={styles.courseDetailsInfoItem}>
                Students: {selectedCourseData.enrolledStudents}/{selectedCourseData.maxStudents}
              </Text>
              <Text style={styles.courseDetailsInfoItem}>Completion Rate: {selectedCourseData.completionRate}%</Text>
              <Text style={styles.courseDetailsInfoItem}>Rating: ⭐ {selectedCourseData.rating}</Text>
            </View>
            
            <View style={styles.courseActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleUpdateCourseStatus(selectedCourseData.id, 'published')}
              >
                <Text style={styles.actionButtonText}>Publish</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleUpdateCourseStatus(selectedCourseData.id, 'archived')}
              >
                <Text style={styles.actionButtonText}>Archive</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleUpdateCourseStatus(selectedCourseData.id, 'suspended')}
              >
                <Text style={styles.actionButtonText}>Suspend</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Course Modules */}
      {selectedCourseData && (
        <View style={styles.modulesSection}>
          <Text style={styles.sectionTitle}>Course Modules</Text>
          
          {selectedCourseData.modules.map(renderModule)}
          
          <View style={styles.addModuleSection}>
            <Text style={styles.addModuleTitle}>Add New Module</Text>
            
            <TextInput
              style={styles.moduleInput}
              placeholder="Module title..."
              value={newModuleTitle}
              onChangeText={setNewModuleTitle}
              placeholderTextColor="#9ca3af"
            />
            
            <TextInput
              style={styles.moduleInput}
              placeholder="Module description..."
              value={newModuleDescription}
              onChangeText={setNewModuleDescription}
              placeholderTextColor="#9ca3af"
            />
            
            <TouchableOpacity
              style={styles.addModuleButton}
              onPress={handleAddModule}
            >
              <Text style={styles.addModuleButtonText}>Add Module</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Learning Objectives */}
      {selectedCourseData && (
        <View style={styles.objectivesSection}>
          <Text style={styles.sectionTitle}>Learning Objectives</Text>
          
          <View style={styles.objectivesCard}>
            {selectedCourseData.learningObjectives.map((objective, index) => (
              <Text key={index} style={styles.objectiveItem}>• {objective}</Text>
            ))}
          </View>
        </View>
      )}

      {/* Prerequisites */}
      {selectedCourseData && (
        <View style={styles.prerequisitesSection}>
          <Text style={styles.sectionTitle}>Prerequisites</Text>
          
          <View style={styles.prerequisitesCard}>
            {selectedCourseData.prerequisites.map((prerequisite, index) => (
              <Text key={index} style={styles.prerequisiteItem}>• {prerequisite}</Text>
            ))}
          </View>
        </View>
      )}

      {/* Certifications */}
      <View style={styles.certificationsSection}>
        <Text style={styles.sectionTitle}>Available Certifications</Text>
        
        {certifications.map(renderCertification)}
      </View>

      {/* Statistics */}
      <View style={styles.statisticsSection}>
        <Text style={styles.sectionTitle}>Training Statistics</Text>
        
        <View style={styles.statisticsGrid}>
          <View style={styles.statisticCard}>
            <Text style={styles.statisticValue}>{trainingCourses.length}</Text>
            <Text style={styles.statisticLabel}>Total Courses</Text>
          </View>
          
          <View style={styles.statisticCard}>
            <Text style={styles.statisticValue}>
              {trainingCourses.filter(c => c.status === 'published').length}
            </Text>
            <Text style={styles.statisticLabel}>Published</Text>
          </View>
          
          <View style={styles.statisticCard}>
            <Text style={styles.statisticValue}>
              {trainingCourses.reduce((sum, c) => sum + c.enrolledStudents, 0)}
            </Text>
            <Text style={styles.statisticLabel}>Total Enrollments</Text>
          </View>
          
          <View style={styles.statisticCard}>
            <Text style={styles.statisticValue}>
              {Math.round(trainingCourses.reduce((sum, c) => sum + c.completionRate, 0) / trainingCourses.length)}
            </Text>
            <Text style={styles.statisticLabel}>Avg Completion</Text>
          </View>
        </View>
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
  filtersSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
  },
  searchSection: {
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#374151',
  },
  categoriesSection: {
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  categoryCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minWidth: 80,
  },
  selectedCategoryCard: {
    borderColor: '#1e3a8a',
    borderWidth: 2,
    backgroundColor: '#f0f9ff',
  },
  categoryIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
  },
  levelsSection: {
    marginBottom: 10,
  },
  levelCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minWidth: 80,
  },
  selectedLevelCard: {
    borderColor: '#1e3a8a',
    borderWidth: 2,
    backgroundColor: '#f0f9ff',
  },
  levelIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 5,
  },
  levelName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
  },
  coursesSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  courseCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  selectedCourseCard: {
    borderColor: '#1e3a8a',
    borderWidth: 2,
    backgroundColor: '#f0f9ff',
  },
  courseHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  courseIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  courseInfo: {
    flex: 1,
    marginRight: 10,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  courseDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  courseBadges: {
    alignItems: 'flex-end',
  },
  levelBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  levelText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  courseDetails: {
    marginBottom: 10,
  },
  courseDetail: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  courseMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metric: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  courseDetailsSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  courseDetailsCard: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  courseDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  courseDetailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
    marginRight: 10,
  },
  courseDetailsBadges: {
    alignItems: 'flex-end',
  },
  courseDetailsDescription: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 15,
    lineHeight: 24,
  },
  courseDetailsInfo: {
    marginBottom: 20,
  },
  courseDetailsInfoItem: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 5,
  },
  courseActions: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  actionButton: {
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  modulesSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  moduleCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  moduleTypeBadge: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  moduleTypeText: {
    color: '#374151',
    fontSize: 10,
    fontWeight: '600',
  },
  moduleDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  moduleDetails: {
    gap: 4,
  },
  moduleDetail: {
    fontSize: 12,
    color: '#6b7280',
  },
  addModuleSection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  addModuleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
  },
  moduleInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#374151',
    marginBottom: 10,
  },
  addModuleButton: {
    backgroundColor: '#059669',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addModuleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  objectivesSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  objectivesCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  objectiveItem: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
    lineHeight: 20,
  },
  prerequisitesSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  prerequisitesCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  prerequisiteItem: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
    lineHeight: 20,
  },
  certificationsSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  certificationCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  certificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  certificationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  certificationStatusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  certificationStatusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  certificationDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  certificationDetails: {
    gap: 4,
  },
  certificationDetail: {
    fontSize: 12,
    color: '#6b7280',
  },
  statisticsSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  statisticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statisticCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  statisticValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 4,
  },
  statisticLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default TrainingCertificationConsole;
