import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GeospatialAnalyticsScreen: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState('demand');
  const [selectedRegion, setSelectedRegion] = useState('riyadh');

  const layers = [
    { id: 'demand', name: 'Demand Heatmap', icon: 'flame' },
    { id: 'pricing', name: 'Pricing Zones', icon: 'cash' },
    { id: 'engineers', name: 'Engineer Density', icon: 'people' },
    { id: 'projects', name: 'Active Projects', icon: 'construct' },
  ];

  const regions = [
    { id: 'riyadh', name: 'Riyadh', coordinates: '24.7136°N, 46.6753°E' },
    { id: 'jeddah', name: 'Jeddah', coordinates: '21.4858°N, 39.1925°E' },
    { id: 'dammam', name: 'Dammam', coordinates: '26.4207°N, 50.0888°E' },
    { id: 'mecca', name: 'Mecca', coordinates: '21.3891°N, 39.8579°E' },
    { id: 'medina', name: 'Medina', coordinates: '24.5247°N, 39.5692°E' },
  ];

  const heatmapData = [
    { area: 'King Fahd Road', demand: 95, engineers: 45, avgPrice: 520 },
    { area: 'Olaya District', demand: 88, engineers: 38, avgPrice: 480 },
    { area: 'Al-Malaz', demand: 72, engineers: 28, avgPrice: 420 },
    { area: 'Al-Nakheel', demand: 65, engineers: 22, avgPrice: 380 },
    { area: 'Al-Rabwah', demand: 58, engineers: 18, avgPrice: 350 },
    { area: 'Al-Wurud', demand: 45, engineers: 15, avgPrice: 320 },
  ];

  const LayerButton = ({ layer }: { layer: any }) => (
    <TouchableOpacity
      style={[
        styles.layerButton,
        selectedLayer === layer.id && styles.layerButtonSelected
      ]}
      onPress={() => setSelectedLayer(layer.id)}
    >
      <Ionicons 
        name={layer.icon as any} 
        size={20} 
        color={selectedLayer === layer.id ? '#ffffff' : '#007bff'} 
      />
      <Text style={[
        styles.layerButtonText,
        selectedLayer === layer.id && styles.layerButtonTextSelected
      ]}>
        {layer.name}
      </Text>
    </TouchableOpacity>
  );

  const RegionButton = ({ region }: { region: any }) => (
    <TouchableOpacity
      style={[
        styles.regionButton,
        selectedRegion === region.id && styles.regionButtonSelected
      ]}
      onPress={() => setSelectedRegion(region.id)}
    >
      <Text style={[
        styles.regionButtonText,
        selectedRegion === region.id && styles.regionButtonTextSelected
      ]}>
        {region.name}
      </Text>
      <Text style={styles.regionCoordinates}>{region.coordinates}</Text>
    </TouchableOpacity>
  );

  const HeatmapItem = ({ item }: { item: any }) => (
    <View style={styles.heatmapItem}>
      <View style={styles.heatmapHeader}>
        <Text style={styles.areaName}>{item.area}</Text>
        <View style={[
          styles.demandIndicator,
          { backgroundColor: getDemandColor(item.demand) }
        ]}>
          <Text style={styles.demandText}>{item.demand}%</Text>
        </View>
      </View>
      <View style={styles.heatmapStats}>
        <View style={styles.stat}>
          <Ionicons name="people" size={16} color="#007bff" />
          <Text style={styles.statText}>{item.engineers} engineers</Text>
        </View>
        <View style={styles.stat}>
          <Ionicons name="cash" size={16} color="#28a745" />
          <Text style={styles.statText}>{item.avgPrice} SAR/hr</Text>
        </View>
      </View>
    </View>
  );

  const getDemandColor = (demand: number) => {
    if (demand >= 80) return '#dc3545';
    if (demand >= 60) return '#ffc107';
    if (demand >= 40) return '#28a745';
    return '#6c757d';
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Geospatial Analytics</Text>
      <Text style={styles.subtitle}>
        Map view with service demand heatmaps and regional insights
      </Text>

      <View style={styles.mapContainer}>
        <View style={styles.mapHeader}>
          <Text style={styles.mapTitle}>Saudi Arabia - Service Demand Map</Text>
          <TouchableOpacity style={styles.mapControls}>
            <Ionicons name="layers" size={20} color="#007bff" />
            <Text style={styles.mapControlsText}>Layers</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mapPlaceholder}>
          <Ionicons name="map" size={60} color="#007bff" />
          <Text style={styles.mapPlaceholderText}>Interactive Map View</Text>
          <Text style={styles.mapPlaceholderSubtext}>
            Tap to explore different regions and layers
          </Text>
        </View>
      </View>

      <View style={styles.layerSelector}>
        <Text style={styles.selectorTitle}>Map Layers</Text>
        <View style={styles.layerButtons}>
          {layers.map((layer) => (
            <LayerButton key={layer.id} layer={layer} />
          ))}
        </View>
      </View>

      <View style={styles.regionSelector}>
        <Text style={styles.selectorTitle}>Major Cities</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.regionButtons}>
            {regions.map((region) => (
              <RegionButton key={region.id} region={region} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.heatmapCard}>
        <Text style={styles.cardTitle}>Demand Heatmap - {regions.find(r => r.id === selectedRegion)?.name}</Text>
        <Text style={styles.cardDescription}>
          Service demand intensity by area
        </Text>
        {heatmapData.map((item, index) => (
          <HeatmapItem key={index} item={item} />
        ))}
      </View>

      <View style={styles.insightsCard}>
        <Text style={styles.cardTitle}>Regional Insights</Text>
        <View style={styles.insight}>
          <Ionicons name="trending-up" size={20} color="#28a745" />
          <Text style={styles.insightText}>
            King Fahd Road shows highest demand (95%) with premium pricing
          </Text>
        </View>
        <View style={styles.insight}>
          <Ionicons name="location" size={20} color="#007bff" />
          <Text style={styles.insightText}>
            Al-Wurud area has growth potential with lower competition
          </Text>
        </View>
        <View style={styles.insight}>
          <Ionicons name="people" size={20} color="#ffc107" />
          <Text style={styles.insightText}>
            Engineer density varies significantly across districts
          </Text>
        </View>
      </View>

      <View style={styles.metricsCard}>
        <Text style={styles.cardTitle}>Regional Metrics</Text>
        <View style={styles.metricsGrid}>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>156</Text>
            <Text style={styles.metricLabel}>Active Jobs</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>89</Text>
            <Text style={styles.metricLabel}>Available Engineers</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>450</Text>
            <Text style={styles.metricLabel}>Avg. Rate (SAR/hr)</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>2.3</Text>
            <Text style={styles.metricLabel}>Match Ratio</Text>
          </View>
        </View>
      </View>

      <View style={styles.trendsCard}>
        <Text style={styles.cardTitle}>Geographic Trends</Text>
        <View style={styles.trendItem}>
          <View style={styles.trendHeader}>
            <Text style={styles.trendTitle}>Riyadh Growth</Text>
            <Text style={styles.trendValue}>+25%</Text>
          </View>
          <Text style={styles.trendDescription}>
            Highest growth in engineering services demand
          </Text>
        </View>
        <View style={styles.trendItem}>
          <View style={styles.trendHeader}>
            <Text style={styles.trendTitle}>Jeddah Expansion</Text>
            <Text style={styles.trendValue}>+18%</Text>
          </View>
          <Text style={styles.trendDescription}>
            Strong growth in commercial projects
          </Text>
        </View>
        <View style={styles.trendItem}>
          <View style={styles.trendHeader}>
            <Text style={styles.trendTitle}>Eastern Province</Text>
            <Text style={styles.trendValue}>+12%</Text>
          </View>
          <Text style={styles.trendDescription}>
            Steady growth in industrial projects
          </Text>
        </View>
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download" size={24} color="#007bff" />
            <Text style={styles.actionText}>Export Map</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share" size={24} color="#28a745" />
            <Text style={styles.actionText}>Share View</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="refresh" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Refresh Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Geospatial analytics help identify high-demand areas and optimize 
          service coverage. Use this data to plan expansion and pricing strategies.
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
  mapContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  mapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  mapTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  mapControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  mapControlsText: {
    color: '#ffffff',
    fontSize: 12,
    marginLeft: 5,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
  },
  mapPlaceholderSubtext: {
    fontSize: 12,
    color: '#cccccc',
    marginTop: 5,
  },
  layerSelector: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  selectorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  layerButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  layerButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  layerButtonSelected: {
    backgroundColor: '#007bff',
  },
  layerButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  layerButtonTextSelected: {
    color: '#ffffff',
  },
  regionSelector: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  regionButtons: {
    flexDirection: 'row',
  },
  regionButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  regionButtonSelected: {
    backgroundColor: '#28a745',
  },
  regionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  regionButtonTextSelected: {
    color: '#ffffff',
  },
  regionCoordinates: {
    fontSize: 10,
    color: '#cccccc',
  },
  heatmapCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 15,
  },
  heatmapItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  heatmapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  areaName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  demandIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  demandText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  heatmapStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    color: '#cccccc',
    fontSize: 12,
    marginLeft: 5,
  },
  insightsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  insight: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  insightText: {
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
  metricsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metric: {
    width: '48%',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  metricLabel: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'center',
  },
  trendsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  trendItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  trendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  trendTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  trendValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
  },
  trendDescription: {
    fontSize: 12,
    color: '#cccccc',
    lineHeight: 16,
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

export default GeospatialAnalyticsScreen;
