import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EscrowPaymentSystemScreen: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState('all');

  const escrowProjects = [
    {
      id: '1',
      project: 'Oil Refinery Inspection',
      client: 'Saudi Aramco',
      totalAmount: 150000,
      escrowAmount: 150000,
      milestones: [
        { name: 'Initial Survey', amount: 30000, status: 'Completed', date: '2024-01-15' },
        { name: 'Equipment Setup', amount: 50000, status: 'Completed', date: '2024-01-20' },
        { name: 'Inspection Phase 1', amount: 40000, status: 'In Progress', date: '2024-01-25' },
        { name: 'Final Report', amount: 30000, status: 'Pending', date: '2024-02-05' },
      ],
      status: 'Active',
    },
    {
      id: '2',
      project: 'Smart City Infrastructure',
      client: 'NEOM City',
      totalAmount: 250000,
      escrowAmount: 200000,
      milestones: [
        { name: 'Project Planning', amount: 50000, status: 'Completed', date: '2024-01-10' },
        { name: 'Design Phase', amount: 80000, status: 'In Progress', date: '2024-01-25' },
        { name: 'Implementation', amount: 70000, status: 'Pending', date: '2024-02-15' },
        { name: 'Testing & Delivery', amount: 50000, status: 'Pending', date: '2024-03-01' },
      ],
      status: 'Active',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return '#28a745';
      case 'In Progress': return '#007bff';
      case 'Pending': return '#6c757d';
      default: return '#6c757d';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return 'checkmark-circle';
      case 'In Progress': return 'time';
      case 'Pending': return 'hourglass';
      default: return 'hourglass';
    }
  };

  const ProjectCard = ({ project }: { project: any }) => (
    <View style={styles.projectCard}>
      <View style={styles.projectHeader}>
        <View style={styles.projectInfo}>
          <Text style={styles.projectName}>{project.project}</Text>
          <Text style={styles.clientName}>{project.client}</Text>
        </View>
        <View style={styles.projectStatus}>
          <Text style={styles.statusText}>{project.status}</Text>
        </View>
      </View>

      <View style={styles.amountInfo}>
        <View style={styles.amountItem}>
          <Text style={styles.amountLabel}>Total Amount</Text>
          <Text style={styles.amountValue}>{project.totalAmount.toLocaleString()} SAR</Text>
        </View>
        <View style={styles.amountItem}>
          <Text style={styles.amountLabel}>In Escrow</Text>
          <Text style={styles.amountValue}>{project.escrowAmount.toLocaleString()} SAR</Text>
        </View>
      </View>

      <View style={styles.milestonesContainer}>
        <Text style={styles.milestonesTitle}>Payment Milestones</Text>
        {project.milestones.map((milestone: any, index: number) => (
          <View key={index} style={styles.milestoneItem}>
            <View style={styles.milestoneInfo}>
              <Ionicons 
                name={getStatusIcon(milestone.status) as any} 
                size={16} 
                color={getStatusColor(milestone.status)} 
              />
              <Text style={styles.milestoneName}>{milestone.name}</Text>
            </View>
            <View style={styles.milestoneDetails}>
              <Text style={styles.milestoneAmount}>{milestone.amount.toLocaleString()} SAR</Text>
              <Text style={styles.milestoneDate}>{milestone.date}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.projectActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="eye" size={16} color="#007bff" />
          <Text style={styles.actionText}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="document-text" size={16} color="#28a745" />
          <Text style={styles.actionText}>Release Funds</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Escrow Payment System</Text>
      <Text style={styles.subtitle}>
        Secure payment system where funds are held until project milestones are completed
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>2</Text>
          <Text style={styles.statLabel}>Active Projects</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>350,000</Text>
          <Text style={styles.statLabel}>Total in Escrow (SAR)</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statLabel}>Completed Milestones</Text>
        </View>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>All Projects</Text>
          <Ionicons name="chevron-down" size={16} color="#007bff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>This Month</Text>
          <Ionicons name="chevron-down" size={16} color="#007bff" />
        </TouchableOpacity>
      </View>

      {escrowProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Escrow payments ensure both parties are protected. Funds are released automatically 
          when milestones are completed and verified.
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: '#2a2a2a',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  filterText: {
    color: '#ffffff',
    fontSize: 14,
    marginRight: 5,
  },
  projectCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  clientName: {
    fontSize: 14,
    color: '#cccccc',
  },
  projectStatus: {
    backgroundColor: '#007bff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  amountInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  amountItem: {
    alignItems: 'center',
    flex: 1,
  },
  amountLabel: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 5,
  },
  amountValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  milestonesContainer: {
    marginBottom: 20,
  },
  milestonesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  milestoneItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  milestoneInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  milestoneName: {
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 8,
  },
  milestoneDetails: {
    alignItems: 'flex-end',
  },
  milestoneAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  milestoneDate: {
    fontSize: 12,
    color: '#cccccc',
  },
  projectActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#3a3a3a',
  },
  actionText: {
    color: '#ffffff',
    fontSize: 12,
    marginLeft: 4,
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

export default EscrowPaymentSystemScreen;
