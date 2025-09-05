import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import CustomButton from '../../../components/CustomButton';

interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  completionDate: string;
  duration: string;
  clientName: string;
  projectValue: string;
  status: 'completed' | 'in-progress' | 'draft';
  images: string[];
  tags: string[];
  highlights: string[];
  testimonial?: {
    text: string;
    author: string;
    rating: number;
  };
}

interface PortfolioStats {
  title: string;
  value: string;
  icon: string;
  color: string;
}

const PortfolioScreen = ({ navigation }: any) => {
  const { isDarkMode } = useTheme();
  const { language, getText } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'completed' | 'in-progress'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const portfolioProjects: PortfolioProject[] = [
    {
      id: '1',
      title: 'Riyadh Tower Complex',
      description: 'A 45-story mixed-use tower featuring residential, commercial, and office spaces with advanced seismic design.',
      category: 'High-Rise Buildings',
      location: 'Riyadh, Saudi Arabia',
      completionDate: '2023-12-15',
      duration: '18 months',
      clientName: 'Al-Rajhi Development',
      projectValue: '450M SAR',
      status: 'completed',
      images: ['🏢', '🌆', '🏗️'],
      tags: ['Structural Design', 'Seismic Analysis', 'High-Rise', 'Mixed-Use'],
      highlights: [
        'Advanced seismic resistant design',
        'LEED Platinum certification',
        '45 floors with unique architectural features',
        'Integrated smart building systems'
      ],
      testimonial: {
        text: 'Ahmed delivered exceptional structural engineering expertise. The project was completed on time and exceeded all safety standards.',
        author: 'Sarah Al-Mansouri, Project Director',
        rating: 5
      }
    },
    {
      id: '2',
      title: 'King Fahd Bridge Extension',
      description: 'Structural analysis and design for the extension of the King Fahd Causeway connecting Saudi Arabia and Bahrain.',
      category: 'Bridge Design',
      location: 'Eastern Province, Saudi Arabia',
      completionDate: '2023-08-30',
      duration: '24 months',
      clientName: 'Ministry of Transportation',
      projectValue: '800M SAR',
      status: 'completed',
      images: ['🌉', '🚧', '⚡'],
      tags: ['Bridge Engineering', 'Marine Structures', 'Government Project'],
      highlights: [
        'Complex marine environment challenges',
        'Advanced corrosion protection systems',
        '2.5km extension with innovative design',
        'Environmental impact minimization'
      ]
    },
    {
      id: '3',
      title: 'NEOM Smart City Infrastructure',
      description: 'Comprehensive structural engineering for the foundational infrastructure of NEOM smart city development.',
      category: 'Infrastructure',
      location: 'NEOM, Saudi Arabia',
      completionDate: '2024-06-30',
      duration: '36 months',
      clientName: 'NEOM Company',
      projectValue: '1.2B SAR',
      status: 'in-progress',
      images: ['🏙️', '🤖', '⚡'],
      tags: ['Smart City', 'Infrastructure', 'Innovation', 'Sustainability'],
      highlights: [
        'Cutting-edge smart city technologies',
        'Sustainable construction methods',
        'Integration with renewable energy systems',
        'Advanced IoT infrastructure planning'
      ]
    },
    {
      id: '4',
      title: 'Jeddah Convention Center',
      description: 'Large-span structural design for a modern convention center with unique architectural requirements.',
      category: 'Commercial Buildings',
      location: 'Jeddah, Saudi Arabia',
      completionDate: '2023-05-20',
      duration: '14 months',
      clientName: 'Jeddah Development Authority',
      projectValue: '280M SAR',
      status: 'completed',
      images: ['🏛️', '🎭', '🏗️'],
      tags: ['Large Span', 'Commercial', 'Convention Center', 'Modern Design'],
      highlights: [
        '80m clear span without columns',
        'Advanced steel truss system',
        'Acoustic engineering integration',
        'Flexible space configuration'
      ]
    }
  ];

  const portfolioStats: PortfolioStats[] = [
    {
      title: getText('totalProjects', 'Total Projects'),
      value: portfolioProjects.length.toString(),
      icon: 'briefcase',
      color: '#10B981',
    },
    {
      title: getText('completedProjects', 'Completed'),
      value: portfolioProjects.filter(p => p.status === 'completed').length.toString(),
      icon: 'checkmark-circle',
      color: '#6366F1',
    },
    {
      title: getText('inProgressProjects', 'In Progress'),
      value: portfolioProjects.filter(p => p.status === 'in-progress').length.toString(),
      icon: 'time',
      color: '#F59E0B',
    },
    {
      title: getText('totalValue', 'Total Value'),
      value: '2.73B SAR',
      icon: 'cash',
      color: '#EF4444',
    },
  ];

  const getFilteredProjects = () => {
    if (activeFilter === 'all') return portfolioProjects;
    return portfolioProjects.filter(project => project.status === activeFilter);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'in-progress': return '#F59E0B';
      case 'draft': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return getText('completed', 'Completed');
      case 'in-progress': return getText('inProgress', 'In Progress');
      case 'draft': return getText('draft', 'Draft');
      default: return status;
    }
  };

  const handleSharePortfolio = () => {
    Alert.alert(
      getText('sharePortfolio', 'Share Portfolio'),
      getText('sharePortfolioDesc', 'Share your portfolio with potential clients'),
      [
        { text: getText('cancel', 'Cancel'), style: 'cancel' },
        { text: getText('share', 'Share'), onPress: () => console.log('Share portfolio') },
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#111827' : '#F9FAFB',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      paddingTop: 10,
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      marginRight: language === 'ar' ? 0 : 12,
      marginLeft: language === 'ar' ? 12 : 0,
      padding: 8,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
    },
    headerActions: {
      flexDirection: 'row',
      gap: 12,
    },
    headerButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      flex: 1,
    },
    statsGrid: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 16,
      gap: 12,
    },
    statCard: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    statIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
    },
    statValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 4,
    },
    statTitle: {
      fontSize: 10,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: 'center',
    },
    controlsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    filtersContainer: {
      flexDirection: 'row',
      gap: 8,
    },
    filterButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      backgroundColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    activeFilter: {
      backgroundColor: '#6366F1',
    },
    filterText: {
      fontSize: 12,
      fontWeight: '600',
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    activeFilterText: {
      color: '#FFFFFF',
    },
    viewModeContainer: {
      flexDirection: 'row',
      gap: 4,
    },
    viewModeButton: {
      width: 32,
      height: 32,
      borderRadius: 8,
      backgroundColor: isDarkMode ? '#374151' : '#E5E7EB',
      justifyContent: 'center',
      alignItems: 'center',
    },
    activeViewMode: {
      backgroundColor: '#6366F1',
    },
    projectsList: {
      paddingHorizontal: 20,
    },
    projectCard: {
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderRadius: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      overflow: 'hidden',
    },
    projectImageContainer: {
      height: 200,
      backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 20,
    },
    projectImage: {
      fontSize: 40,
    },
    statusBadge: {
      position: 'absolute',
      top: 12,
      right: 12,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    statusText: {
      fontSize: 10,
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    projectContent: {
      padding: 20,
    },
    projectHeader: {
      marginBottom: 12,
    },
    projectTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 4,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    projectCategory: {
      fontSize: 14,
      color: '#6366F1',
      fontWeight: '600',
      marginBottom: 8,
    },
    projectDescription: {
      fontSize: 14,
      color: isDarkMode ? '#D1D5DB' : '#4B5563',
      lineHeight: 20,
      marginBottom: 12,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    projectMeta: {
      marginBottom: 12,
    },
    metaRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    metaLabel: {
      fontSize: 12,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    metaValue: {
      fontSize: 12,
      fontWeight: '600',
      color: isDarkMode ? '#FFFFFF' : '#111827',
    },
    projectValue: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#10B981',
    },
    tagsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
      marginBottom: 12,
    },
    tag: {
      backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    tagText: {
      fontSize: 10,
      color: isDarkMode ? '#D1D5DB' : '#4B5563',
      fontWeight: '500',
    },
    highlightsSection: {
      marginBottom: 16,
    },
    highlightsTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 8,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    highlight: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    highlightText: {
      fontSize: 12,
      color: isDarkMode ? '#D1D5DB' : '#4B5563',
      marginLeft: language === 'ar' ? 0 : 8,
      marginRight: language === 'ar' ? 8 : 0,
      flex: 1,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    testimonialSection: {
      backgroundColor: isDarkMode ? '#374151' : '#F9FAFB',
      borderRadius: 12,
      padding: 16,
      marginTop: 12,
    },
    testimonialText: {
      fontSize: 13,
      color: isDarkMode ? '#D1D5DB' : '#4B5563',
      fontStyle: 'italic',
      lineHeight: 18,
      marginBottom: 8,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    testimonialAuthor: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    authorName: {
      fontSize: 12,
      fontWeight: '600',
      color: isDarkMode ? '#FFFFFF' : '#111827',
    },
    rating: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    projectActions: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 16,
    },
    actionButton: {
      flex: 1,
    },
    gridView: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 16,
    },
    gridCard: {
      width: '47%',
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
      overflow: 'hidden',
    },
    gridImageContainer: {
      height: 120,
      backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
      justifyContent: 'center',
      alignItems: 'center',
    },
    gridContent: {
      padding: 12,
    },
    gridTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 4,
    },
    gridCategory: {
      fontSize: 12,
      color: '#6366F1',
      fontWeight: '600',
      marginBottom: 8,
    },
    gridValue: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#10B981',
    },
    addProjectButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: '#6366F1',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 60,
    },
    emptyStateIcon: {
      marginBottom: 16,
    },
    emptyStateTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 8,
      textAlign: 'center',
    },
    emptyStateDescription: {
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: 'center',
      lineHeight: 20,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons
              name={language === 'ar' ? 'chevron-forward' : 'chevron-back'}
              size={24}
              color={isDarkMode ? '#FFFFFF' : '#111827'}
            />
          </Pressable>
          <Text style={styles.headerTitle}>
            {getText('portfolio', 'Portfolio')}
          </Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable style={styles.headerButton} onPress={handleSharePortfolio}>
            <Ionicons
              name="share-outline"
              size={20}
              color={isDarkMode ? '#9CA3AF' : '#6B7280'}
            />
          </Pressable>
          <Pressable style={styles.headerButton}>
            <Ionicons
              name="download-outline"
              size={20}
              color={isDarkMode ? '#9CA3AF' : '#6B7280'}
            />
          </Pressable>
        </View>
      </Animated.View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={SlideInUp.delay(100)} style={styles.statsGrid}>
          {portfolioStats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                <Ionicons
                  name={stat.icon as any}
                  size={16}
                  color={stat.color}
                />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
            </View>
          ))}
        </Animated.View>

        <View style={styles.controlsContainer}>
          <View style={styles.filtersContainer}>
            <Pressable
              style={[styles.filterButton, activeFilter === 'all' && styles.activeFilter]}
              onPress={() => setActiveFilter('all')}
            >
              <Text style={[styles.filterText, activeFilter === 'all' && styles.activeFilterText]}>
                {getText('all', 'All')}
              </Text>
            </Pressable>
            <Pressable
              style={[styles.filterButton, activeFilter === 'completed' && styles.activeFilter]}
              onPress={() => setActiveFilter('completed')}
            >
              <Text style={[styles.filterText, activeFilter === 'completed' && styles.activeFilterText]}>
                {getText('completed', 'Completed')}
              </Text>
            </Pressable>
            <Pressable
              style={[styles.filterButton, activeFilter === 'in-progress' && styles.activeFilter]}
              onPress={() => setActiveFilter('in-progress')}
            >
              <Text style={[styles.filterText, activeFilter === 'in-progress' && styles.activeFilterText]}>
                {getText('inProgress', 'In Progress')}
              </Text>
            </Pressable>
          </View>

          <View style={styles.viewModeContainer}>
            <Pressable
              style={[styles.viewModeButton, viewMode === 'grid' && styles.activeViewMode]}
              onPress={() => setViewMode('grid')}
            >
              <Ionicons
                name="grid"
                size={16}
                color={viewMode === 'grid' ? '#FFFFFF' : (isDarkMode ? '#9CA3AF' : '#6B7280')}
              />
            </Pressable>
            <Pressable
              style={[styles.viewModeButton, viewMode === 'list' && styles.activeViewMode]}
              onPress={() => setViewMode('list')}
            >
              <Ionicons
                name="list"
                size={16}
                color={viewMode === 'list' ? '#FFFFFF' : (isDarkMode ? '#9CA3AF' : '#6B7280')}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.projectsList}>
          {viewMode === 'list' ? (
            getFilteredProjects().map((project, index) => (
              <Animated.View
                key={project.id}
                entering={SlideInUp.delay(200 + index * 100)}
                style={styles.projectCard}
              >
                <View style={styles.projectImageContainer}>
                  {project.images.map((image, imgIndex) => (
                    <Text key={imgIndex} style={styles.projectImage}>{image}</Text>
                  ))}
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(project.status) }]}>
                    <Text style={styles.statusText}>{getStatusText(project.status)}</Text>
                  </View>
                </View>

                <View style={styles.projectContent}>
                  <View style={styles.projectHeader}>
                    <Text style={styles.projectTitle}>{project.title}</Text>
                    <Text style={styles.projectCategory}>{project.category}</Text>
                    <Text style={styles.projectDescription}>{project.description}</Text>
                  </View>

                  <View style={styles.projectMeta}>
                    <View style={styles.metaRow}>
                      <Text style={styles.metaLabel}>{getText('client', 'Client')}</Text>
                      <Text style={styles.metaValue}>{project.clientName}</Text>
                    </View>
                    <View style={styles.metaRow}>
                      <Text style={styles.metaLabel}>{getText('location', 'Location')}</Text>
                      <Text style={styles.metaValue}>{project.location}</Text>
                    </View>
                    <View style={styles.metaRow}>
                      <Text style={styles.metaLabel}>{getText('duration', 'Duration')}</Text>
                      <Text style={styles.metaValue}>{project.duration}</Text>
                    </View>
                    <View style={styles.metaRow}>
                      <Text style={styles.metaLabel}>{getText('value', 'Value')}</Text>
                      <Text style={styles.projectValue}>{project.projectValue}</Text>
                    </View>
                  </View>

                  <View style={styles.tagsContainer}>
                    {project.tags.map((tag, tagIndex) => (
                      <View key={tagIndex} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.highlightsSection}>
                    <Text style={styles.highlightsTitle}>{getText('keyHighlights', 'Key Highlights')}</Text>
                    {project.highlights.map((highlight, hlIndex) => (
                      <View key={hlIndex} style={styles.highlight}>
                        <Ionicons name="checkmark-circle" size={12} color="#10B981" />
                        <Text style={styles.highlightText}>{highlight}</Text>
                      </View>
                    ))}
                  </View>

                  {project.testimonial && (
                    <View style={styles.testimonialSection}>
                      <Text style={styles.testimonialText}>"{project.testimonial.text}"</Text>
                      <View style={styles.testimonialAuthor}>
                        <Text style={styles.authorName}>- {project.testimonial.author}</Text>
                        <View style={styles.rating}>
                          {[...Array(project.testimonial.rating)].map((_, i) => (
                            <Ionicons key={i} name="star" size={12} color="#F59E0B" />
                          ))}
                        </View>
                      </View>
                    </View>
                  )}

                  <View style={styles.projectActions}>
                    <View style={styles.actionButton}>
                      <CustomButton
                        title={getText('viewDetails', 'View Details')}
                        onPress={() => navigation.navigate('ProjectDetails', { projectId: project.id })}
                        variant="secondary"
                        fullWidth
                      />
                    </View>
                    <View style={styles.actionButton}>
                      <CustomButton
                        title={getText('share', 'Share')}
                        onPress={() => console.log('Share project')}
                        variant="primary"
                        fullWidth
                      />
                    </View>
                  </View>
                </View>
              </Animated.View>
            ))
          ) : (
            <View style={styles.gridView}>
              {getFilteredProjects().map((project, index) => (
                <Animated.View
                  key={project.id}
                  entering={SlideInUp.delay(200 + index * 50)}
                  style={styles.gridCard}
                >
                  <Pressable onPress={() => navigation.navigate('ProjectDetails', { projectId: project.id })}>
                    <View style={styles.gridImageContainer}>
                      <Text style={styles.projectImage}>{project.images[0]}</Text>
                      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(project.status) }]}>
                        <Text style={styles.statusText}>{getStatusText(project.status)}</Text>
                      </View>
                    </View>
                    <View style={styles.gridContent}>
                      <Text style={styles.gridTitle} numberOfLines={1}>{project.title}</Text>
                      <Text style={styles.gridCategory}>{project.category}</Text>
                      <Text style={styles.gridValue}>{project.projectValue}</Text>
                    </View>
                  </Pressable>
                </Animated.View>
              ))}
            </View>
          )}

          {getFilteredProjects().length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons
                name="briefcase-outline"
                size={64}
                color={isDarkMode ? '#4B5563' : '#D1D5DB'}
                style={styles.emptyStateIcon}
              />
              <Text style={styles.emptyStateTitle}>
                {getText('noProjectsFound', 'No Projects Found')}
              </Text>
              <Text style={styles.emptyStateDescription}>
                {getText('noProjectsDesc', 'Add your first project to showcase your work and expertise')}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <Pressable
        style={styles.addProjectButton}
        onPress={() => navigation.navigate('AddProject')}
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </Pressable>
    </SafeAreaView>
  );
};

export default PortfolioScreen;