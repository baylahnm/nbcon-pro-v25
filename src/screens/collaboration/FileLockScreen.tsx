import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FileLockScreen: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [lockType, setLockType] = useState('edit');
  const [lockDuration, setLockDuration] = useState('1hour');

  const lockTypes = [
    { id: 'edit', name: 'Edit Lock', icon: 'create', color: '#dc3545', description: 'Prevent editing by others' },
    { id: 'view', name: 'View Lock', icon: 'eye', color: '#ffc107', description: 'Prevent viewing by others' },
    { id: 'download', name: 'Download Lock', icon: 'download', color: '#6f42c1', description: 'Prevent downloading' },
    { id: 'share', name: 'Share Lock', icon: 'share', color: '#17a2b8', description: 'Prevent sharing' },
  ];

  const lockDurations = [
    { id: '15min', name: '15 Minutes', value: 15 },
    { id: '1hour', name: '1 Hour', value: 60 },
    { id: '4hours', name: '4 Hours', value: 240 },
    { id: '1day', name: '1 Day', value: 1440 },
    { id: '1week', name: '1 Week', value: 10080 },
    { id: 'permanent', name: 'Permanent', value: -1 },
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
          lockedBy: 'Ahmed Al-Rashid',
          lockType: 'edit',
          lockExpiry: '2024-01-22 16:30',
          isLocked: true,
          permissions: ['view', 'comment'],
        },
        {
          id: 'f2',
          name: 'Structural_Analysis.pdf',
          type: 'PDF',
          size: '1.8 MB',
          lastModified: '2024-01-22 12:15',
          lockedBy: null,
          lockType: null,
          lockExpiry: null,
          isLocked: false,
          permissions: ['view', 'edit', 'download'],
        },
        {
          id: 'f3',
          name: 'MEP_Plans.rvt',
          type: 'BIM',
          size: '15.2 MB',
          lastModified: '2024-01-22 10:45',
          lockedBy: 'Sarah Al-Mansouri',
          lockType: 'view',
          lockExpiry: '2024-01-22 18:45',
          isLocked: true,
          permissions: ['comment'],
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
          lockedBy: 'Omar Al-Zahrani',
          lockType: 'edit',
          lockExpiry: '2024-01-22 17:20',
          isLocked: true,
          permissions: ['view'],
        },
        {
          id: 'f5',
          name: 'Electrical_Schematics.dwg',
          type: 'CAD',
          size: '3.1 MB',
          lastModified: '2024-01-21 16:30',
          lockedBy: null,
          lockType: null,
          lockExpiry: null,
          isLocked: false,
          permissions: ['view', 'edit', 'download'],
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
          lockedBy: 'Khalid Al-Mutairi',
          lockType: 'download',
          lockExpiry: '2024-01-23 11:00',
          isLocked: true,
          permissions: ['view', 'edit'],
        },
        {
          id: 'f7',
          name: 'AR_Visualization.fbx',
          type: '3D Model',
          size: '28.3 MB',
          lastModified: '2024-01-22 08:15',
          lockedBy: null,
          lockType: null,
          lockExpiry: null,
          isLocked: false,
          permissions: ['view', 'edit', 'download'],
        },
      ],
    },
  ];

  const LockTypeButton = ({ lockType: type }: { lockType: any }) => (
    <TouchableOpacity
      style={[
        styles.lockTypeButton,
        lockType === type.id && styles.lockTypeButtonSelected
      ]}
      onPress={() => setLockType(type.id)}
    >
      <Ionicons 
        name={type.icon as any} 
        size={20} 
        color={lockType === type.id ? '#ffffff' : type.color} 
      />
      <Text style={[
        styles.lockTypeText,
        lockType === type.id && styles.lockTypeTextSelected
      ]}>
        {type.name}
      </Text>
    </TouchableOpacity>
  );

  const DurationButton = ({ duration }: { duration: any }) => (
    <TouchableOpacity
      style={[
        styles.durationButton,
        lockDuration === duration.id && styles.durationButtonSelected
      ]}
      onPress={() => setLockDuration(duration.id)}
    >
      <Text style={[
        styles.durationText,
        lockDuration === duration.id && styles.durationTextSelected
      ]}>
        {duration.name}
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
          {project.files.length} files ({project.files.filter((f: any) => f.isLocked).length} locked)
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
            color={file.isLocked ? '#dc3545' : '#007bff'} 
          />
          <View style={styles.fileDetails}>
            <Text style={styles.fileName}>{file.name}</Text>
            <Text style={styles.fileSize}>{file.size} • {file.lastModified}</Text>
          </View>
        </View>
        <View style={styles.fileStatus}>
          {file.isLocked ? (
            <View style={styles.lockedBadge}>
              <Ionicons name="lock-closed" size={16} color="#dc3545" />
              <Text style={styles.lockedText}>Locked</Text>
            </View>
          ) : (
            <View style={styles.unlockedBadge}>
              <Ionicons name="lock-open" size={16} color="#28a745" />
              <Text style={styles.unlockedText}>Available</Text>
            </View>
          )}
        </View>
      </View>
      
      {file.isLocked && (
        <View style={styles.lockInfo}>
          <View style={styles.lockDetail}>
            <Ionicons name="person" size={14} color="#cccccc" />
            <Text style={styles.lockDetailText}>Locked by: {file.lockedBy}</Text>
          </View>
          <View style={styles.lockDetail}>
            <Ionicons name="shield" size={14} color="#cccccc" />
            <Text style={styles.lockDetailText}>Type: {file.lockType}</Text>
          </View>
          <View style={styles.lockDetail}>
            <Ionicons name="time" size={14} color="#cccccc" />
            <Text style={styles.lockDetailText}>Expires: {file.lockExpiry}</Text>
          </View>
        </View>
      )}

      <View style={styles.filePermissions}>
        <Text style={styles.permissionsTitle}>Permissions:</Text>
        <View style={styles.permissionsList}>
          {file.permissions.map((permission: string, index: number) => (
            <View key={index} style={styles.permissionTag}>
              <Text style={styles.permissionText}>{permission}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.fileActions}>
        {file.isLocked ? (
          <TouchableOpacity style={styles.unlockButton}>
            <Ionicons name="lock-open" size={16} color="#ffffff" />
            <Text style={styles.unlockButtonText}>Unlock</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.lockButton}>
            <Ionicons name="lock-closed" size={16} color="#ffffff" />
            <Text style={styles.lockButtonText}>Lock</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.viewButton}>
          <Ionicons name="eye" size={16} color="#007bff" />
          <Text style={styles.viewButtonText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings" size={16} color="#6c757d" />
          <Text style={styles.settingsButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const selectedProjectData = projects.find(p => p.id === selectedProject);
  const selectedFileData = selectedProjectData?.files.find(f => f.id === selectedFile);

  const handleLockFile = () => {
    if (!selectedFile) {
      Alert.alert('Error', 'Please select a file first');
      return;
    }

    const lockTypeData = lockTypes.find(t => t.id === lockType);
    const durationData = lockDurations.find(d => d.id === lockDuration);
    
    Alert.alert(
      'Lock File',
      `Apply ${lockTypeData?.name} for ${durationData?.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Lock', 
          style: 'default',
          onPress: () => Alert.alert('Success', 'File locked successfully')
        }
      ]
    );
  };

  const handleUnlockFile = () => {
    if (!selectedFile) {
      Alert.alert('Error', 'Please select a file first');
      return;
    }

    Alert.alert(
      'Unlock File',
      'Are you sure you want to unlock this file?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Unlock', 
          style: 'destructive',
          onPress: () => Alert.alert('Success', 'File unlocked successfully')
        }
      ]
    );
  };

  const lockedFiles = projects.reduce((total, project) => 
    total + project.files.filter((file: any) => file.isLocked).length, 0
  );
  const totalFiles = projects.reduce((total, project) => total + project.files.length, 0);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>File Lock</Text>
      <Text style={styles.subtitle}>
        Prevent simultaneous edits
      </Text>

      <View style={styles.statsCard}>
        <Text style={styles.cardTitle}>File Lock Statistics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{totalFiles}</Text>
            <Text style={styles.statLabel}>Total Files</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#dc3545' }]}>{lockedFiles}</Text>
            <Text style={styles.statLabel}>Locked Files</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#28a745' }]}>{totalFiles - lockedFiles}</Text>
            <Text style={styles.statLabel}>Available</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#ffc107' }]}>
              {Math.round((lockedFiles / totalFiles) * 100)}%
            </Text>
            <Text style={styles.statLabel}>Lock Rate</Text>
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
          <View style={styles.lockSettingsCard}>
            <Text style={styles.cardTitle}>Lock Settings</Text>
            
            <View style={styles.lockTypesSection}>
              <Text style={styles.sectionTitle}>Lock Type</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.lockTypesContainer}>
                  {lockTypes.map((type) => (
                    <LockTypeButton key={type.id} lockType={type} />
                  ))}
                </View>
              </ScrollView>
            </View>

            <View style={styles.durationSection}>
              <Text style={styles.sectionTitle}>Lock Duration</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.durationContainer}>
                  {lockDurations.map((duration) => (
                    <DurationButton key={duration.id} duration={duration} />
                  ))}
                </View>
              </ScrollView>
            </View>

            <TouchableOpacity style={styles.applyLockButton} onPress={handleLockFile}>
              <Ionicons name="lock-closed" size={20} color="#ffffff" />
              <Text style={styles.applyLockButtonText}>Apply Lock</Text>
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
                <Text style={styles.detailLabel}>Status:</Text>
                <Text style={styles.detailValue}>
                  {selectedFileData?.isLocked ? 'Locked' : 'Available'}
                </Text>
              </View>
              {selectedFileData?.isLocked && (
                <>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Locked By:</Text>
                    <Text style={styles.detailValue}>{selectedFileData?.lockedBy}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Lock Type:</Text>
                    <Text style={styles.detailValue}>{selectedFileData?.lockType}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Expires:</Text>
                    <Text style={styles.detailValue}>{selectedFileData?.lockExpiry}</Text>
                  </View>
                </>
              )}
              
              <View style={styles.fileActions}>
                {selectedFileData?.isLocked ? (
                  <TouchableOpacity style={styles.unlockFileButton} onPress={handleUnlockFile}>
                    <Ionicons name="lock-open" size={20} color="#ffffff" />
                    <Text style={styles.unlockFileButtonText}>Unlock File</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.lockFileButton} onPress={handleLockFile}>
                    <Ionicons name="lock-closed" size={20} color="#ffffff" />
                    <Text style={styles.lockFileButtonText}>Lock File</Text>
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
            <Ionicons name="lock-closed" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Lock All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="lock-open" size={24} color="#28a745" />
            <Text style={styles.actionText}>Unlock All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="refresh" size={24} color="#007bff" />
            <Text style={styles.actionText}>Refresh</Text>
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
          Prevent simultaneous edits by locking files. Choose lock type and duration 
          to control access and maintain file integrity during collaboration.
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
  lockSettingsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  lockTypesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  lockTypesContainer: {
    flexDirection: 'row',
  },
  lockTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
  },
  lockTypeButtonSelected: {
    backgroundColor: '#007bff',
  },
  lockTypeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  lockTypeTextSelected: {
    color: '#ffffff',
  },
  durationSection: {
    marginBottom: 20,
  },
  durationContainer: {
    flexDirection: 'row',
  },
  durationButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
  },
  durationButtonSelected: {
    backgroundColor: '#007bff',
  },
  durationText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  durationTextSelected: {
    color: '#ffffff',
  },
  applyLockButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc3545',
    borderRadius: 8,
    padding: 15,
    justifyContent: 'center',
  },
  applyLockButtonText: {
    color: '#ffffff',
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
  lockedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc3545',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  lockedText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  unlockedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  unlockedText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  lockInfo: {
    backgroundColor: '#4a4a4a',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  lockDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  lockDetailText: {
    fontSize: 12,
    color: '#cccccc',
    marginLeft: 5,
  },
  filePermissions: {
    marginBottom: 10,
  },
  permissionsTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  permissionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  permissionTag: {
    backgroundColor: '#4a4a4a',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 5,
    marginBottom: 5,
  },
  permissionText: {
    color: '#007bff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  fileActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lockButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc3545',
    borderRadius: 6,
    padding: 8,
    flex: 1,
    marginRight: 5,
    justifyContent: 'center',
  },
  lockButtonText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  unlockButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    borderRadius: 6,
    padding: 8,
    flex: 1,
    marginRight: 5,
    justifyContent: 'center',
  },
  unlockButtonText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 6,
    padding: 8,
    flex: 1,
    marginHorizontal: 2,
    justifyContent: 'center',
  },
  viewButtonText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6c757d',
    borderRadius: 6,
    padding: 8,
    flex: 1,
    marginLeft: 5,
    justifyContent: 'center',
  },
  settingsButtonText: {
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
  lockFileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc3545',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
  },
  lockFileButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  unlockFileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    justifyContent: 'center',
  },
  unlockFileButtonText: {
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

export default FileLockScreen;
