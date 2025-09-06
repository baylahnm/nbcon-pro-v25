import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PerformanceStorageScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('storage');

  const storageData = {
    total: 1024, // MB
    used: 245,
    available: 779,
    breakdown: [
      { name: 'App Data', size: 120, color: '#007bff' },
      { name: 'Cache', size: 85, color: '#28a745' },
      { name: 'Downloads', size: 25, color: '#ffc107' },
      { name: 'Media', size: 15, color: '#dc3545' },
    ],
  };

  const performanceMetrics = [
    { name: 'App Launch Time', value: '1.2s', status: 'Good' },
    { name: 'Memory Usage', value: '156 MB', status: 'Good' },
    { name: 'CPU Usage', value: '12%', status: 'Good' },
    { name: 'Battery Impact', value: 'Low', status: 'Good' },
    { name: 'Network Requests', value: '45/min', status: 'Good' },
  ];

  const cacheData = [
    { name: 'Image Cache', size: 45, lastCleared: '2 days ago' },
    { name: 'API Cache', size: 25, lastCleared: '1 day ago' },
    { name: 'User Data', size: 15, lastCleared: 'Never' },
  ];

  const TabButton = ({ tab, label }: { tab: string; label: string }) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        selectedTab === tab && styles.tabButtonActive
      ]}
      onPress={() => setSelectedTab(tab)}
    >
      <Text style={[
        styles.tabButtonText,
        selectedTab === tab && styles.tabButtonTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const StorageItem = ({ item }: { item: any }) => (
    <View style={styles.storageItem}>
      <View style={styles.storageHeader}>
        <View style={[styles.storageColor, { backgroundColor: item.color }]} />
        <Text style={styles.storageName}>{item.name}</Text>
        <Text style={styles.storageSize}>{item.size} MB</Text>
      </View>
      <View style={styles.storageBar}>
        <View 
          style={[
            styles.storageFill, 
            { 
              width: `${(item.size / storageData.used) * 100}%`,
              backgroundColor: item.color
            }
          ]} 
        />
      </View>
    </View>
  );

  const PerformanceMetric = ({ metric }: { metric: any }) => (
    <View style={styles.metricItem}>
      <View style={styles.metricInfo}>
        <Text style={styles.metricName}>{metric.name}</Text>
        <Text style={styles.metricValue}>{metric.value}</Text>
      </View>
      <View style={[
        styles.statusBadge,
        { backgroundColor: metric.status === 'Good' ? '#28a745' : '#ffc107' }
      ]}>
        <Text style={styles.statusText}>{metric.status}</Text>
      </View>
    </View>
  );

  const CacheItem = ({ item }: { item: any }) => (
    <View style={styles.cacheItem}>
      <View style={styles.cacheInfo}>
        <Text style={styles.cacheName}>{item.name}</Text>
        <Text style={styles.cacheSize}>{item.size} MB</Text>
      </View>
      <View style={styles.cacheActions}>
        <Text style={styles.cacheLastCleared}>Last cleared: {item.lastCleared}</Text>
        <TouchableOpacity style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Performance & Storage</Text>
      <Text style={styles.subtitle}>
        Monitor app performance and manage storage usage
      </Text>

      <View style={styles.tabContainer}>
        <TabButton tab="storage" label="Storage" />
        <TabButton tab="performance" label="Performance" />
        <TabButton tab="cache" label="Cache" />
      </View>

      {selectedTab === 'storage' && (
        <View>
          <View style={styles.storageOverviewCard}>
            <Text style={styles.cardTitle}>Storage Overview</Text>
            <View style={styles.storageStats}>
              <View style={styles.storageStat}>
                <Text style={styles.statValue}>{storageData.used} MB</Text>
                <Text style={styles.statLabel}>Used</Text>
              </View>
              <View style={styles.storageStat}>
                <Text style={styles.statValue}>{storageData.available} MB</Text>
                <Text style={styles.statLabel}>Available</Text>
              </View>
              <View style={styles.storageStat}>
                <Text style={styles.statValue}>{storageData.total} MB</Text>
                <Text style={styles.statLabel}>Total</Text>
              </View>
            </View>
            <View style={styles.storageBar}>
              <View 
                style={[
                  styles.storageFill, 
                  { 
                    width: `${(storageData.used / storageData.total) * 100}%`,
                    backgroundColor: '#007bff'
                  }
                ]} 
              />
            </View>
            <Text style={styles.storageText}>
              {Math.round((storageData.used / storageData.total) * 100)}% of storage used
            </Text>
          </View>

          <View style={styles.storageBreakdownCard}>
            <Text style={styles.cardTitle}>Storage Breakdown</Text>
            {storageData.breakdown.map((item, index) => (
              <StorageItem key={index} item={item} />
            ))}
          </View>
        </View>
      )}

      {selectedTab === 'performance' && (
        <View>
          <View style={styles.performanceCard}>
            <Text style={styles.cardTitle}>Performance Metrics</Text>
            {performanceMetrics.map((metric, index) => (
              <PerformanceMetric key={index} metric={metric} />
            ))}
          </View>

          <View style={styles.optimizationCard}>
            <Text style={styles.cardTitle}>Optimization Tips</Text>
            <View style={styles.tipItem}>
              <Ionicons name="bulb" size={20} color="#ffc107" />
              <Text style={styles.tipText}>
                Clear cache regularly to improve app performance
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="bulb" size={20} color="#ffc107" />
              <Text style={styles.tipText}>
                Close unused apps to free up memory
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="bulb" size={20} color="#ffc107" />
              <Text style={styles.tipText}>
                Update to the latest app version for best performance
              </Text>
            </View>
          </View>
        </View>
      )}

      {selectedTab === 'cache' && (
        <View>
          <View style={styles.cacheCard}>
            <Text style={styles.cardTitle}>Cache Management</Text>
            {cacheData.map((item, index) => (
              <CacheItem key={index} item={item} />
            ))}
          </View>

          <View style={styles.cacheActionsCard}>
            <Text style={styles.cardTitle}>Cache Actions</Text>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="trash" size={24} color="#dc3545" />
              <Text style={styles.actionText}>Clear All Cache</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="refresh" size={24} color="#007bff" />
              <Text style={styles.actionText}>Refresh Cache</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="trash" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Clear All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="refresh" size={24} color="#007bff" />
            <Text style={styles.actionText}>Optimize</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="analytics" size={24} color="#28a745" />
            <Text style={styles.actionText}>Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Regular maintenance of storage and cache helps keep the app running smoothly. 
          Clear cache when you notice performance issues or storage is running low.
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  tabButtonActive: {
    backgroundColor: '#007bff',
  },
  tabButtonText: {
    color: '#cccccc',
    fontSize: 14,
    fontWeight: '500',
  },
  tabButtonTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  storageOverviewCard: {
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
  storageStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  storageStat: {
    alignItems: 'center',
    flex: 1,
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
  storageBar: {
    height: 8,
    backgroundColor: '#3a3a3a',
    borderRadius: 4,
    marginBottom: 10,
  },
  storageFill: {
    height: '100%',
    borderRadius: 4,
  },
  storageText: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'center',
  },
  storageBreakdownCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  storageItem: {
    marginBottom: 15,
  },
  storageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  storageColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  storageName: {
    fontSize: 14,
    color: '#ffffff',
    flex: 1,
  },
  storageSize: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: 'bold',
  },
  performanceCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  metricItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  metricInfo: {
    flex: 1,
  },
  metricName: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 5,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  optimizationCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  tipText: {
    fontSize: 14,
    color: '#cccccc',
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
  cacheCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cacheItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  cacheInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cacheName: {
    fontSize: 14,
    color: '#ffffff',
  },
  cacheSize: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: 'bold',
  },
  cacheActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cacheLastCleared: {
    fontSize: 12,
    color: '#cccccc',
  },
  clearButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  clearButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cacheActionsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  actionText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
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

export default PerformanceStorageScreen;
