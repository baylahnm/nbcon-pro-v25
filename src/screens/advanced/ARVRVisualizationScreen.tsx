import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const ARVRVisualizationScreen: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState('ar');
  const [selectedProject, setSelectedProject] = useState('1');
  const [isViewing, setIsViewing] = useState(false);

  const modes = [
    { id: 'ar', name: 'AR Mode', icon: 'phone-portrait', description: 'Augmented Reality on mobile' },
    { id: 'vr', name: 'VR Mode', icon: 'glasses', description: 'Virtual Reality with headset' },
    { id: 'mixed', name: 'Mixed Reality', icon: 'cube', description: 'Combined AR/VR experience' },
  ];

  const projects = [
    {
      id: '1',
      name: 'Riyadh Metro Station Design',
      type: 'Civil Engineering',
      status: 'In Progress',
      progress: 75,
      lastUpdated: '2024-01-25',
      arEnabled: true,
      vrEnabled: true,
      mixedEnabled: false,
      views: 234,
      collaborators: 8,
    },
    {
      id: '2',
      name: 'NEOM Smart City Infrastructure',
      type: 'Urban Planning',
      status: 'Completed',
      progress: 100,
      lastUpdated: '2024-01-20',
      arEnabled: true,
      vrEnabled: true,
      mixedEnabled: true,
      views: 567,
      collaborators: 12,
    },
    {
      id: '3',
      name: 'Jeddah Port Expansion',
      type: 'Marine Engineering',
      status: 'Planning',
      progress: 25,
      lastUpdated: '2024-01-24',
      arEnabled: false,
      vrEnabled: true,
      mixedEnabled: false,
      views: 89,
      collaborators: 5,
    },
    {
      id: '4',
      name: 'Solar Farm Layout Design',
      type: 'Renewable Energy',
      status: 'In Progress',
      progress: 60,
      lastUpdated: '2024-01-23',
      arEnabled: true,
      vrEnabled: false,
      mixedEnabled: true,
      views: 156,
      collaborators: 6,
    },
  ];

  const arFeatures = [
    {
      name: '3D Model Overlay',
      description: 'Overlay 3D models on real-world environment',
      icon: 'cube-outline',
      enabled: true,
    },
    {
      name: 'Measurements',
      description: 'Real-time distance and area measurements',
      icon: 'resize-outline',
      enabled: true,
    },
    {
      name: 'Annotations',
      description: 'Add notes and markups in AR space',
      icon: 'create-outline',
      enabled: true,
    },
    {
      name: 'Collaboration',
      description: 'Share AR view with team members',
      icon: 'people-outline',
      enabled: false,
    },
  ];

  const vrFeatures = [
    {
      name: 'Immersive Walkthrough',
      description: 'Walk through the project in VR',
      icon: 'walk-outline',
      enabled: true,
    },
    {
      name: 'Scale Visualization',
      description: 'Experience true project scale',
      icon: 'resize-outline',
      enabled: true,
    },
    {
      name: 'Interactive Elements',
      description: 'Interact with project components',
      icon: 'hand-left-outline',
      enabled: true,
    },
    {
      name: 'Multi-user VR',
      description: 'Collaborate in shared VR space',
      icon: 'people-outline',
      enabled: false,
    },
  ];

  const ModeButton = ({ mode }: { mode: any }) => (
    <TouchableOpacity
      style={[
        styles.modeButton,
        selectedMode === mode.id && styles.modeButtonSelected
      ]}
      onPress={() => setSelectedMode(mode.id)}
    >
      <Ionicons 
        name={mode.icon as any} 
        size={24} 
        color={selectedMode === mode.id ? '#ffffff' : '#007bff'} 
      />
      <Text style={[
        styles.modeButtonText,
        selectedMode === mode.id && styles.modeButtonTextSelected
      ]}>
        {mode.name}
      </Text>
      <Text style={styles.modeDescription}>{mode.description}</Text>
    </TouchableOpacity>
  );

  const ProjectItem = ({ project }: { project: any }) => (
    <TouchableOpacity
      style={[
        styles.projectItem,
        selectedProject === project.id && styles.projectItemSelected
      ]}
      onPress={() => setSelectedProject(project.id)}
    >
      <View style={styles.projectHeader}>
        <View style={styles.projectInfo}>
          <Text style={styles.projectName}>{project.name}</Text>
          <Text style={styles.projectType}>{project.type}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: project.status === 'Completed' ? '#28a745' : 
                           project.status === 'In Progress' ? '#007bff' : '#ffc107'
          }
        ]}>
          <Text style={styles.statusText}>{project.status}</Text>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${project.progress}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>{project.progress}% Complete</Text>
      </View>

      <View style={styles.projectStats}>
        <View style={styles.projectStat}>
          <Ionicons name="eye-outline" size={16} color="#007bff" />
          <Text style={styles.projectStatText}>{project.views} views</Text>
        </View>
        <View style={styles.projectStat}>
          <Ionicons name="people-outline" size={16} color="#28a745" />
          <Text style={styles.projectStatText}>{project.collaborators} collaborators</Text>
        </View>
        <View style={styles.projectStat}>
          <Ionicons name="time-outline" size={16} color="#ffc107" />
          <Text style={styles.projectStatText}>{project.lastUpdated}</Text>
        </View>
      </View>

      <View style={styles.visualizationModes}>
        <Text style={styles.modesTitle}>Available Modes:</Text>
        <View style={styles.modesList}>
          {project.arEnabled && (
            <View style={styles.modeTag}>
              <Ionicons name="phone-portrait" size={14} color="#007bff" />
              <Text style={styles.modeTagText}>AR</Text>
            </View>
          )}
          {project.vrEnabled && (
            <View style={styles.modeTag}>
              <Ionicons name="glasses" size={14} color="#28a745" />
              <Text style={styles.modeTagText}>VR</Text>
            </View>
          )}
          {project.mixedEnabled && (
            <View style={styles.modeTag}>
              <Ionicons name="cube" size={14} color="#ffc107" />
              <Text style={styles.modeTagText}>Mixed</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const FeatureItem = ({ feature }: { feature: any }) => (
    <View style={styles.featureItem}>
      <View style={styles.featureIcon}>
        <Ionicons 
          name={feature.icon as any} 
          size={20} 
          color={feature.enabled ? '#28a745' : '#dc3545'} 
        />
      </View>
      <View style={styles.featureInfo}>
        <Text style={styles.featureName}>{feature.name}</Text>
        <Text style={styles.featureDescription}>{feature.description}</Text>
      </View>
      <View style={[
        styles.featureStatus,
        { backgroundColor: feature.enabled ? '#28a745' : '#dc3545' }
      ]}>
        <Ionicons 
          name={feature.enabled ? 'checkmark' : 'close'} 
          size={16} 
          color="#ffffff" 
        />
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>AR/VR Visualization</Text>
      <Text style={styles.subtitle}>
        Preview engineering projects in Augmented and Virtual Reality
      </Text>

      <View style={styles.modesCard}>
        <Text style={styles.cardTitle}>Visualization Modes</Text>
        <View style={styles.modesContainer}>
          {modes.map((mode) => (
            <ModeButton key={mode.id} mode={mode} />
          ))}
        </View>
      </View>

      <View style={styles.projectsCard}>
        <Text style={styles.cardTitle}>Available Projects</Text>
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </View>

      {selectedMode === 'ar' && (
        <View style={styles.featuresCard}>
          <Text style={styles.cardTitle}>AR Features</Text>
          {arFeatures.map((feature, index) => (
            <FeatureItem key={index} feature={feature} />
          ))}
        </View>
      )}

      {selectedMode === 'vr' && (
        <View style={styles.featuresCard}>
          <Text style={styles.cardTitle}>VR Features</Text>
          {vrFeatures.map((feature, index) => (
            <FeatureItem key={index} feature={feature} />
          ))}
        </View>
      )}

      {selectedMode === 'mixed' && (
        <View style={styles.featuresCard}>
          <Text style={styles.cardTitle}>Mixed Reality Features</Text>
          <View style={styles.mixedFeatures}>
            <Text style={styles.mixedDescription}>
              Mixed Reality combines the best of AR and VR, allowing seamless 
              transitions between augmented and virtual environments for 
              comprehensive project visualization.
            </Text>
            <View style={styles.mixedStats}>
              <View style={styles.mixedStat}>
                <Text style={styles.mixedStatValue}>12</Text>
                <Text style={styles.mixedStatLabel}>Projects</Text>
              </View>
              <View style={styles.mixedStat}>
                <Text style={styles.mixedStatValue}>45</Text>
                <Text style={styles.mixedStatLabel}>Users</Text>
              </View>
              <View style={styles.mixedStat}>
                <Text style={styles.mixedStatValue}>98%</Text>
                <Text style={styles.mixedStatLabel}>Satisfaction</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      <View style={styles.controlsCard}>
        <Text style={styles.cardTitle}>Visualization Controls</Text>
        <View style={styles.controlsGrid}>
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="play" size={24} color="#28a745" />
            <Text style={styles.controlText}>Start Viewing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="pause" size={24} color="#ffc107" />
            <Text style={styles.controlText}>Pause</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="stop" size={24} color="#dc3545" />
            <Text style={styles.controlText}>Stop</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="refresh" size={24} color="#007bff" />
            <Text style={styles.controlText}>Reset View</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.requirementsCard}>
        <Text style={styles.cardTitle}>System Requirements</Text>
        <View style={styles.requirementsList}>
          <View style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={20} color="#28a745" />
            <Text style={styles.requirementText}>iOS 12.0+ or Android 8.0+</Text>
          </View>
          <View style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={20} color="#28a745" />
            <Text style={styles.requirementText}>ARCore/ARKit compatible device</Text>
          </View>
          <View style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={20} color="#28a745" />
            <Text style={styles.requirementText}>4GB RAM minimum</Text>
          </View>
          <View style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={20} color="#28a745" />
            <Text style={styles.requirementText}>Stable internet connection</Text>
          </View>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          AR/VR visualization allows engineers and clients to experience projects 
          in immersive 3D environments, improving understanding and collaboration.
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
  modesCard: {
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
  modesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modeButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  modeButtonSelected: {
    backgroundColor: '#007bff',
  },
  modeButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  modeButtonTextSelected: {
    color: '#ffffff',
  },
  modeDescription: {
    color: '#cccccc',
    fontSize: 10,
    textAlign: 'center',
  },
  projectsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  projectItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  projectItemSelected: {
    backgroundColor: '#007bff20',
    borderWidth: 1,
    borderColor: '#007bff',
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  projectType: {
    fontSize: 14,
    color: '#cccccc',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  progressContainer: {
    marginBottom: 10,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#555555',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: 3,
  },
  progressText: {
    color: '#ffffff',
    fontSize: 12,
    marginTop: 4,
  },
  projectStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  projectStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  projectStatText: {
    color: '#cccccc',
    fontSize: 12,
    marginLeft: 4,
  },
  visualizationModes: {
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  modesTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modesList: {
    flexDirection: 'row',
  },
  modeTag: {
    backgroundColor: '#007bff',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modeTagText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  featuresCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#555555',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  featureInfo: {
    flex: 1,
  },
  featureName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 14,
    color: '#cccccc',
  },
  featureStatus: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mixedFeatures: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
  },
  mixedDescription: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
  },
  mixedStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  mixedStat: {
    alignItems: 'center',
  },
  mixedStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
  },
  mixedStatLabel: {
    fontSize: 12,
    color: '#cccccc',
  },
  controlsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  controlsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  controlButton: {
    width: '48%',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  controlText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  requirementsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  requirementsList: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  requirementText: {
    color: '#ffffff',
    fontSize: 14,
    marginLeft: 10,
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

export default ARVRVisualizationScreen;
