import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WatermarkingScreen: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [watermarkType, setWatermarkType] = useState('text');
  const [watermarkPosition, setWatermarkPosition] = useState('bottom-right');
  const [watermarkOpacity, setWatermarkOpacity] = useState(50);

  const watermarkTypes = [
    { id: 'text', name: 'Text Watermark', icon: 'text', color: '#007bff', description: 'Add text-based watermark' },
    { id: 'logo', name: 'Logo Watermark', icon: 'image', color: '#28a745', description: 'Add company logo watermark' },
    { id: 'stamp', name: 'Digital Stamp', icon: 'checkmark-circle', color: '#ffc107', description: 'Add approval stamp' },
    { id: 'confidential', name: 'Confidential', icon: 'shield', color: '#dc3545', description: 'Add confidentiality notice' },
    { id: 'draft', name: 'Draft', icon: 'create', color: '#6f42c1', description: 'Add draft watermark' },
    { id: 'custom', name: 'Custom', icon: 'settings', color: '#17a2b8', description: 'Create custom watermark' },
  ];

  const positions = [
    { id: 'top-left', name: 'Top Left', icon: 'arrow-up-left' },
    { id: 'top-center', name: 'Top Center', icon: 'arrow-up' },
    { id: 'top-right', name: 'Top Right', icon: 'arrow-up-right' },
    { id: 'center-left', name: 'Center Left', icon: 'arrow-back' },
    { id: 'center', name: 'Center', icon: 'radio-button-off' },
    { id: 'center-right', name: 'Center Right', icon: 'arrow-forward' },
    { id: 'bottom-left', name: 'Bottom Left', icon: 'arrow-down-left' },
    { id: 'bottom-center', name: 'Bottom Center', icon: 'arrow-down' },
    { id: 'bottom-right', name: 'Bottom Right', icon: 'arrow-down-right' },
  ];

  const projects = [
    {
      id: '1',
      title: 'Riyadh Tower Construction',
      client: 'Saudi Construction Co.',
      status: 'In Progress',
      color: '#007bff',
      files: [
        {
          id: 'f1',
          name: 'Foundation_Design.dwg',
          type: 'CAD',
          size: '2.4 MB',
          lastModified: '2024-01-22 14:30',
          hasWatermark: true,
          watermarkType: 'confidential',
          watermarkText: 'CONFIDENTIAL - Saudi Construction Co.',
          watermarkPosition: 'bottom-right',
          watermarkOpacity: 75,
        },
        {
          id: 'f2',
          name: 'Structural_Analysis.pdf',
          type: 'PDF',
          size: '1.8 MB',
          lastModified: '2024-01-22 12:15',
          hasWatermark: false,
          watermarkType: null,
          watermarkText: null,
          watermarkPosition: null,
          watermarkOpacity: null,
        },
        {
          id: 'f3',
          name: 'MEP_Plans.rvt',
          type: 'BIM',
          size: '15.2 MB',
          lastModified: '2024-01-22 10:45',
          hasWatermark: true,
          watermarkType: 'draft',
          watermarkText: 'DRAFT - NOT FOR CONSTRUCTION',
          watermarkPosition: 'center',
          watermarkOpacity: 50,
        },
      ],
    },
    {
      id: '2',
      title: 'Jeddah Office MEP Design',
      client: 'Office Solutions Ltd.',
      status: 'Planning',
      color: '#28a745',
      files: [
        {
          id: 'f4',
          name: 'HVAC_Design.xlsx',
          type: 'Excel',
          size: '856 KB',
          lastModified: '2024-01-22 09:20',
          hasWatermark: true,
          watermarkType: 'logo',
          watermarkText: 'Office Solutions Ltd.',
          watermarkPosition: 'top-right',
          watermarkOpacity: 60,
        },
        {
          id: 'f5',
          name: 'Electrical_Schematics.dwg',
          type: 'CAD',
          size: '3.1 MB',
          lastModified: '2024-01-21 16:30',
          hasWatermark: false,
          watermarkType: null,
          watermarkText: null,
          watermarkPosition: null,
          watermarkOpacity: null,
        },
      ],
    },
    {
      id: '3',
      title: 'NEOM BIM Integration',
      client: 'NEOM Development',
      status: 'In Progress',
      color: '#ffc107',
      files: [
        {
          id: 'f6',
          name: 'BIM_Model.rvt',
          type: 'BIM',
          size: '45.8 MB',
          lastModified: '2024-01-22 11:00',
          hasWatermark: true,
          watermarkType: 'stamp',
          watermarkText: 'APPROVED - NEOM Development',
          watermarkPosition: 'bottom-center',
          watermarkOpacity: 80,
        },
        {
          id: 'f7',
          name: 'AR_Visualization.fbx',
          type: '3D Model',
          size: '28.3 MB',
          lastModified: '2024-01-22 08:15',
          hasWatermark: false,
          watermarkType: null,
          watermarkText: null,
          watermarkPosition: null,
          watermarkOpacity: null,
        },
      ],
    },
  ];

  const WatermarkTypeButton = ({ type }: { type: any }) => (
    <TouchableOpacity
      style={[
        styles.watermarkTypeButton,
        watermarkType === type.id && styles.watermarkTypeButtonSelected
      ]}
      onPress={() => setWatermarkType(type.id)}
    >
      <Ionicons 
        name={type.icon as any} 
        size={20} 
        color={watermarkType === type.id ? '#ffffff' : type.color} 
      />
      <Text style={[
        styles.watermarkTypeText,
        watermarkType === type.id && styles.watermarkTypeTextSelected
      ]}>
        {type.name}
      </Text>
    </TouchableOpacity>
  );

  const PositionButton = ({ position }: { position: any }) => (
    <TouchableOpacity
      style={[
        styles.positionButton,
        watermarkPosition === position.id && styles.positionButtonSelected
      ]}
      onPress={() => setWatermarkPosition(position.id)}
    >
      <Ionicons 
        name={position.icon as any} 
        size={20} 
        color={watermarkPosition === position.id ? '#ffffff' : '#007bff'} 
      />
      <Text style={[
        styles.positionText,
        watermarkPosition === position.id && styles.positionTextSelected
      ]}>
        {position.name}
      </Text>
    </TouchableOpacity>
  );

  const ProjectCard = ({ project }: { project: any }) => (
    <TouchableOpacity
      style={[
        styles.projectCard,
        selectedProject === project.id && styles.projectCardSelected
      ]}
      onPress={() => setSelectedProject(project.id)}
    >
      <View style={styles.projectHeader}>
        <View style={styles.projectInfo}>
          <Text style={styles.projectTitle}>{project.title}</Text>
          <Text style={styles.projectClient}>{project.client}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: project.color }]}>
          <Text style={styles.statusText}>{project.status}</Text>
        </View>
      </View>
      
      <View style={styles.filesCount}>
        <Ionicons name="document" size={16} color="#007bff" />
        <Text style={styles.filesCountText}>
          {project.files.length} files ({project.files.filter((f: any) => f.hasWatermark).length} watermarked)
        </Text>
      </View>
    </TouchableOpacity>
  );

  const FileItem = ({ file }: { file: any }) => (
    <TouchableOpacity
      style={[
        styles.fileItem,
        selectedFile === file.id && styles.fileItemSelected
      ]}
      onPress={() => setSelectedFile(file.id)}
    >
      <View style={styles.fileHeader}>
        <View style={styles.fileInfo}>
          <Ionicons 
            name={file.type === 'CAD' ? 'construct' : 
                  file.type === 'PDF' ? 'document-text' :
                  file.type === 'BIM' ? 'cube' :
                  file.type === 'Excel' ? 'grid' :
                  file.type === '3D Model' ? 'layers' : 'document'} 
            size={24} 
            color={file.hasWatermark ? '#ffc107' : '#007bff'} 
          />
          <View style={styles.fileDetails}>
            <Text style={styles.fileName}>{file.name}</Text>
            <Text style={styles.fileSize}>{file.size} • {file.lastModified}</Text>
          </View>
        </View>
        <View style={styles.fileStatus}>
          {file.hasWatermark ? (
            <View style={styles.watermarkedBadge}>
              <Ionicons name="water" size={16} color="#ffc107" />
              <Text style={styles.watermarkedText}>Watermarked</Text>
            </View>
          ) : (
            <View style={styles.unwatermarkedBadge}>
              <Ionicons name="water-outline" size={16} color="#6c757d" />
              <Text style={styles.unwatermarkedText}>No Watermark</Text>
            </View>
          )}
        </View>
      </View>
      
      {file.hasWatermark && (
        <View style={styles.watermarkInfo}>
          <View style={styles.watermarkDetail}>
            <Ionicons name="text" size={14} color="#cccccc" />
            <Text style={styles.watermarkDetailText}>Type: {file.watermarkType}</Text>
          </View>
          <View style={styles.watermarkDetail}>
            <Ionicons name="location" size={14} color="#cccccc" />
            <Text style={styles.watermarkDetailText}>Position: {file.watermarkPosition}</Text>
          </View>
          <View style={styles.watermarkDetail}>
            <Ionicons name="contrast" size={14} color="#cccccc" />
            <Text style={styles.watermarkDetailText}>Opacity: {file.watermarkOpacity}%</Text>
          </View>
          <View style={styles.watermarkPreview}>
            <Text style={styles.watermarkPreviewText}>"{file.watermarkText}"</Text>
          </View>
        </View>
      )}

      <View style={styles.fileActions}>
        {file.hasWatermark ? (
          <TouchableOpacity style={styles.removeWatermarkButton}>
            <Ionicons name="water-outline" size={16} color="#ffffff" />
            <Text style={styles.removeWatermarkButtonText}>Remove</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.addWatermarkButton}>
            <Ionicons name="water" size={16} color="#ffffff" />
            <Text style={styles.addWatermarkButtonText}>Add</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.editWatermarkButton}>
          <Ionicons name="create" size={16} color="#007bff" />
          <Text style={styles.editWatermarkButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.previewButton}>
          <Ionicons name="eye" size={16} color="#28a745" />
          <Text style={styles.previewButtonText}>Preview</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const selectedProjectData = projects.find(p => p.id === selectedProject);
  const selectedFileData = selectedProjectData?.files.find(f => f.id === selectedFile);

  const handleApplyWatermark = () => {
    if (!selectedFile) {
      Alert.alert('Error', 'Please select a file first');
      return;
    }

    const watermarkTypeData = watermarkTypes.find(t => t.id === watermarkType);
    const positionData = positions.find(p => p.id === watermarkPosition);
    
    Alert.alert(
      'Apply Watermark',
      `Apply ${watermarkTypeData?.name} at ${positionData?.name} with ${watermarkOpacity}% opacity?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Apply', 
          style: 'default',
          onPress: () => Alert.alert('Success', 'Watermark applied successfully')
        }
      ]
    );
  };

  const handleRemoveWatermark = () => {
    if (!selectedFile) {
      Alert.alert('Error', 'Please select a file first');
      return;
    }

    Alert.alert(
      'Remove Watermark',
      'Are you sure you want to remove the watermark from this file?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => Alert.alert('Success', 'Watermark removed successfully')
        }
      ]
    );
  };

  const watermarkedFiles = projects.reduce((total, project) => 
    total + project.files.filter((file: any) => file.hasWatermark).length, 0
  );
  const totalFiles = projects.reduce((total, project) => total + project.files.length, 0);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Watermarking</Text>
      <Text style={styles.subtitle}>
        Auto watermarks on shared files
      </Text>

      <View style={styles.statsCard}>
        <Text style={styles.cardTitle}>Watermark Statistics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{totalFiles}</Text>
            <Text style={styles.statLabel}>Total Files</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#ffc107' }]}>{watermarkedFiles}</Text>
            <Text style={styles.statLabel}>Watermarked</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#6c757d' }]}>{totalFiles - watermarkedFiles}</Text>
            <Text style={styles.statLabel}>Unwatermarked</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#007bff' }]}>
              {Math.round((watermarkedFiles / totalFiles) * 100)}%
            </Text>
            <Text style={styles.statLabel}>Coverage</Text>
          </View>
        </View>
      </View>

      <View style={styles.projectsCard}>
        <Text style={styles.cardTitle}>Select Project</Text>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </View>

      {selectedProject && (
        <>
          <View style={styles.watermarkSettingsCard}>
            <Text style={styles.cardTitle}>Watermark Settings</Text>
            
            <View style={styles.watermarkTypesSection}>
              <Text style={styles.sectionTitle}>Watermark Type</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.watermarkTypesContainer}>
                  {watermarkTypes.map((type) => (
                    <WatermarkTypeButton key={type.id} type={type} />
                  ))}
                </View>
              </ScrollView>
            </View>

            <View style={styles.positionSection}>
              <Text style={styles.sectionTitle}>Position</Text>
              <View style={styles.positionGrid}>
                {positions.map((position) => (
                  <PositionButton key={position.id} position={position} />
                ))}
              </View>
            </View>

            <View style={styles.opacitySection}>
              <Text style={styles.sectionTitle}>Opacity: {watermarkOpacity}%</Text>
              <View style={styles.opacitySlider}>
                <View style={styles.opacityTrack}>
                  <View style={[styles.opacityFill, { width: `${watermarkOpacity}%` }]} />
                </View>
                <View style={styles.opacityLabels}>
                  <Text style={styles.opacityLabel}>0%</Text>
                  <Text style={styles.opacityLabel}>50%</Text>
                  <Text style={styles.opacityLabel}>100%</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.applyWatermarkButton} onPress={handleApplyWatermark}>
              <Ionicons name="water" size={20} color="#ffffff" />
              <Text style={styles.applyWatermarkButtonText}>Apply Watermark</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.filesCard}>
            <Text style={styles.cardTitle}>
              Project Files ({selectedProjectData?.files.length})
            </Text>
            {selectedProjectData?.files.map((file) => (
              <FileItem key={file.id} file={file} />
            ))}
          </View>

          {selectedFile && (
            <View style={styles.fileDetailsCard}>
              <Text style={styles.cardTitle}>File Details</Text>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Name:</Text>
                <Text style={styles.detailValue}>{selectedFileData?.name}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Type:</Text>
                <Text style={styles.detailValue}>{selectedFileData?.type}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Size:</Text>
                <Text style={styles.detailValue}>{selectedFileData?.size}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Last Modified:</Text>
                <Text style={styles.detailValue}>{selectedFileData?.lastModified}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Watermark Status:</Text>
                <Text style={styles.detailValue}>
                  {selectedFileData?.hasWatermark ? 'Watermarked' : 'No Watermark'}
                </Text>
              </View>
              {selectedFileData?.hasWatermark && (
                <>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Watermark Type:</Text>
                    <Text style={styles.detailValue}>{selectedFileData?.watermarkType}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Position:</Text>
                    <Text style={styles.detailValue}>{selectedFileData?.watermarkPosition}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Opacity:</Text>
                    <Text style={styles.detailValue}>{selectedFileData?.watermarkOpacity}%</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Text:</Text>
                    <Text style={styles.detailValue}>"{selectedFileData?.watermarkText}"</Text>
                  </View>
                </>
              )}
              
              <View style={styles.fileActions}>
                {selectedFileData?.hasWatermark ? (
                  <TouchableOpacity style={styles.removeFileWatermarkButton} onPress={handleRemoveWatermark}>
                    <Ionicons name="water-outline" size={20} color="#ffffff" />
                    <Text style={styles.removeFileWatermarkButtonText}>Remove Watermark</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.addFileWatermarkButton} onPress={handleApplyWatermark}>
                    <Ionicons name="water" size={20} color="#ffffff" />
                    <Text style={styles.addFileWatermarkButtonText}>Add Watermark</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </>
      )}

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="water" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Watermark All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="water-outline" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Remove All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download" size={24} color="#007bff" />
            <Text style={styles.actionText}>Export</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings" size={24} color="#6c757d" />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Automatically add watermarks to shared files for security and branding. 
          Choose from text, logo, or custom watermarks with flexible positioning.
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
  statsCard: {
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
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#cccccc',
  },
  projectsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  projectCard: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  projectCardSelected: {
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
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  projectClient: {
    fontSize: 14,
    color: '#28a745',
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
  filesCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filesCountText: {
    color: '#007bff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  watermarkSettingsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  watermarkTypesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  watermarkTypesContainer: {
    flexDirection: 'row',
  },
  watermarkTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
  },
  watermarkTypeButtonSelected: {
    backgroundColor: '#007bff',
  },
  watermarkTypeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  watermarkTypeTextSelected: {
    color: '#ffffff',
  },
  positionSection: {
    marginBottom: 20,
  },
  positionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  positionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 10,
    width: '30%',
    marginBottom: 10,
    justifyContent: 'center',
  },
  positionButtonSelected: {
    backgroundColor: '#007bff',
  },
  positionText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  positionTextSelected: {
    color: '#ffffff',
  },
  opacitySection: {
    marginBottom: 20,
  },
  opacitySlider: {
    marginTop: 10,
  },
  opacityTrack: {
    height: 6,
    backgroundColor: '#4a4a4a',
    borderRadius: 3,
    position: 'relative',
  },
  opacityFill: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: 3,
  },
  opacityLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  opacityLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  applyWatermarkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffc107',
    borderRadius: 8,
    padding: 15,
    justifyContent: 'center',
  },
  applyWatermarkButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  filesCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  fileItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  fileItemSelected: {
    borderColor: '#007bff',
  },
  fileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fileDetails: {
    marginLeft: 10,
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  fileSize: {
    fontSize: 12,
    color: '#cccccc',
  },
  fileStatus: {
    alignItems: 'flex-end',
  },
  watermarkedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffc107',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  watermarkedText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  unwatermarkedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6c757d',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  unwatermarkedText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  watermarkInfo: {
    backgroundColor: '#4a4a4a',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  watermarkDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  watermarkDetailText: {
    fontSize: 12,
    color: '#cccccc',
    marginLeft: 5,
  },
  watermarkPreview: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#555555',
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#ffc107',
  },
  watermarkPreviewText: {
    fontSize: 12,
    color: '#ffc107',
    fontStyle: 'italic',
  },
  fileActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addWatermarkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffc107',
    borderRadius: 6,
    padding: 8,
    flex: 1,
    marginRight: 5,
    justifyContent: 'center',
  },
  addWatermarkButtonText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  removeWatermarkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc3545',
    borderRadius: 6,
    padding: 8,
    flex: 1,
    marginRight: 5,
    justifyContent: 'center',
  },
  removeWatermarkButtonText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  editWatermarkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 6,
    padding: 8,
    flex: 1,
    marginHorizontal: 2,
    justifyContent: 'center',
  },
  editWatermarkButtonText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  previewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    borderRadius: 6,
    padding: 8,
    flex: 1,
    marginLeft: 5,
    justifyContent: 'center',
  },
  previewButtonText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  fileDetailsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: '#cccccc',
    fontWeight: 'bold',
    width: '30%',
  },
  detailValue: {
    fontSize: 14,
    color: '#ffffff',
    flex: 1,
    textAlign: 'right',
  },
  fileActions: {
    flexDirection: 'row',
    marginTop: 15,
  },
  addFileWatermarkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffc107',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
  },
  addFileWatermarkButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  removeFileWatermarkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc3545',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    justifyContent: 'center',
  },
  removeFileWatermarkButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
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

export default WatermarkingScreen;
