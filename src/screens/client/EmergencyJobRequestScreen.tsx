import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  Animated,
} from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface EmergencyService {
  id: string;
  title: string;
  icon: string;
  description: string;
  responseTime: string;
  multiplier: number;
}

const EmergencyJobRequestScreen = () => {
  const [selectedService, setSelectedService] = useState<string>('');
  const [urgencyLevel, setUrgencyLevel] = useState<'urgent' | 'critical' | 'emergency'>('urgent');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pulseAnim] = useState(new Animated.Value(1));

  const emergencyServices: EmergencyService[] = [
    {
      id: 'structural',
      title: 'Structural Emergency',
      icon: '🏗️',
      description: 'Building collapse, structural damage, safety hazards',
      responseTime: '15-30 min',
      multiplier: 3.0
    },
    {
      id: 'electrical',
      title: 'Electrical Emergency',
      icon: '⚡',
      description: 'Power outages, electrical fires, short circuits',
      responseTime: '10-20 min',
      multiplier: 2.5
    },
    {
      id: 'mep',
      title: 'MEP Emergency',
      icon: '🔧',
      description: 'HVAC failures, plumbing emergencies, gas leaks',
      responseTime: '20-40 min',
      multiplier: 2.0
    },
    {
      id: 'safety',
      title: 'Safety Emergency',
      icon: '⚠️',
      description: 'Safety violations, hazardous conditions, accidents',
      responseTime: '10-15 min',
      multiplier: 4.0
    },
    {
      id: 'fire',
      title: 'Fire Safety',
      icon: '🔥',
      description: 'Fire system failures, evacuation issues, smoke detection',
      responseTime: '5-15 min',
      multiplier: 5.0
    },
    {
      id: 'environmental',
      title: 'Environmental',
      icon: '🌡️',
      description: 'Chemical spills, air quality issues, contamination',
      responseTime: '15-25 min',
      multiplier: 3.5
    }
  ];

  const urgencyLevels = [
    { id: 'urgent', label: 'Urgent', color: '#FF9800', description: 'Within 1 hour' },
    { id: 'critical', label: 'Critical', color: '#F44336', description: 'Within 30 minutes' },
    { id: 'emergency', label: 'EMERGENCY', color: '#D32F2F', description: 'Immediate response' }
  ];

  useEffect(() => {
    // Create pulsing animation for emergency mode
    if (urgencyLevel === 'emergency') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [urgencyLevel]);

  const handleSubmit = async () => {
    if (!selectedService || !location || !description || !contactPerson || !contactPhone) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Emergency Request Submitted',
        `Your ${urgencyLevel} request has been submitted. Our nearest available engineer will contact you within ${getResponseTime()}.`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate back or to tracking screen
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit emergency request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getResponseTime = () => {
    const service = emergencyServices.find(s => s.id === selectedService);
    return service?.responseTime || '15-30 min';
  };

  const getEstimatedCost = () => {
    const basePrice = 500; // SAR
    const service = emergencyServices.find(s => s.id === selectedService);
    const multiplier = service?.multiplier || 1;
    const urgencyMultiplier = urgencyLevel === 'emergency' ? 2 : urgencyLevel === 'critical' ? 1.5 : 1;
    return Math.round(basePrice * multiplier * urgencyMultiplier);
  };

  const renderServiceCard = (service: EmergencyService) => (
    <TouchableOpacity
      key={service.id}
      style={[
        styles.serviceCard,
        selectedService === service.id && styles.selectedServiceCard
      ]}
      onPress={() => setSelectedService(service.id)}
    >
      <View style={styles.serviceHeader}>
        <Text style={styles.serviceIcon}>{service.icon}</Text>
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceTitle}>{service.title}</Text>
          <Text style={styles.serviceResponse}>Response: {service.responseTime}</Text>
        </View>
        <View style={styles.multiplierBadge}>
          <Text style={styles.multiplierText}>{service.multiplier}x</Text>
        </View>
      </View>
      <Text style={styles.serviceDescription}>{service.description}</Text>
    </TouchableOpacity>
  );

  const renderUrgencyLevel = (level: any) => (
    <TouchableOpacity
      key={level.id}
      style={[
        styles.urgencyCard,
        { borderColor: level.color },
        urgencyLevel === level.id && { backgroundColor: level.color + '20' }
      ]}
      onPress={() => setUrgencyLevel(level.id)}
    >
      <View style={styles.urgencyHeader}>
        <Text style={[styles.urgencyLabel, { color: level.color }]}>{level.label}</Text>
        {urgencyLevel === level.id && level.id === 'emergency' && (
          <Animated.View style={[styles.emergencyBadge, { transform: [{ scale: pulseAnim }] }]}>
            <MaterialIcons name="warning" size={16} color="#fff" />
          </Animated.View>
        )}
      </View>
      <Text style={styles.urgencyDescription}>{level.description}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={urgencyLevel === 'emergency' ? ['#D32F2F', '#F44336'] : ['#1a1a2e', '#16213e']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <Text style={styles.headerTitleText}>Emergency Request</Text>
            {urgencyLevel === 'emergency' && (
              <Text style={styles.headerSubtitle}>🚨 IMMEDIATE RESPONSE</Text>
            )}
          </View>
          <TouchableOpacity style={styles.helpButton}>
            <MaterialIcons name="help-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Warning Banner */}
        <View style={[styles.warningBanner, { backgroundColor: urgencyLevel === 'emergency' ? '#D32F2F' : '#FF9800' }]}>
          <MaterialIcons name="warning" size={24} color="#fff" />
          <Text style={styles.warningText}>
            Emergency services incur additional charges. Estimated cost: {getEstimatedCost()} SAR
          </Text>
        </View>

        {/* Urgency Level Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Urgency Level</Text>
          <View style={styles.urgencyGrid}>
            {urgencyLevels.map(renderUrgencyLevel)}
          </View>
        </View>

        {/* Emergency Service Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Service Type</Text>
          {emergencyServices.map(renderServiceCard)}
        </View>

        {/* Location Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location Details *</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons name="location-on" size={20} color="#888" />
            <TextInput
              style={styles.textInput}
              placeholder="Exact location address..."
              placeholderTextColor="#666"
              value={location}
              onChangeText={setLocation}
              multiline
            />
          </View>
          <TouchableOpacity style={styles.useCurrentLocation}>
            <MaterialIcons name="my-location" size={16} color="#4CAF50" />
            <Text style={styles.useCurrentLocationText}>Use Current Location</Text>
          </TouchableOpacity>
        </View>

        {/* Emergency Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Description *</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons name="description" size={20} color="#888" />
            <TextInput
              style={[styles.textInput, styles.descriptionInput]}
              placeholder="Describe the emergency situation in detail..."
              placeholderTextColor="#666"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Contact</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons name="person" size={20} color="#888" />
            <TextInput
              style={styles.textInput}
              placeholder="Contact person name *"
              placeholderTextColor="#666"
              value={contactPerson}
              onChangeText={setContactPerson}
            />
          </View>
          <View style={styles.inputContainer}>
            <MaterialIcons name="phone" size={20} color="#888" />
            <TextInput
              style={styles.textInput}
              placeholder="+966 5XX XXX XXX *"
              placeholderTextColor="#666"
              value={contactPhone}
              onChangeText={setContactPhone}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Cost Estimation */}
        <View style={styles.estimationCard}>
          <View style={styles.estimationHeader}>
            <MaterialIcons name="attach-money" size={24} color="#4CAF50" />
            <Text style={styles.estimationTitle}>Cost Estimation</Text>
          </View>
          <View style={styles.estimationDetails}>
            <View style={styles.estimationRow}>
              <Text style={styles.estimationLabel}>Base Emergency Fee:</Text>
              <Text style={styles.estimationValue}>500 SAR</Text>
            </View>
            <View style={styles.estimationRow}>
              <Text style={styles.estimationLabel}>Service Multiplier:</Text>
              <Text style={styles.estimationValue}>{emergencyServices.find(s => s.id === selectedService)?.multiplier || 1}x</Text>
            </View>
            <View style={styles.estimationRow}>
              <Text style={styles.estimationLabel}>Urgency Multiplier:</Text>
              <Text style={styles.estimationValue}>{urgencyLevel === 'emergency' ? '2x' : urgencyLevel === 'critical' ? '1.5x' : '1x'}</Text>
            </View>
            <View style={[styles.estimationRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Estimated Total:</Text>
              <Text style={styles.totalValue}>{getEstimatedCost()} SAR</Text>
            </View>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            { backgroundColor: urgencyLevel === 'emergency' ? '#D32F2F' : '#F44336' },
            (!selectedService || !location || !description || !contactPerson || !contactPhone) && styles.disabledButton
          ]}
          onPress={handleSubmit}
          disabled={isSubmitting || !selectedService || !location || !description || !contactPerson || !contactPhone}
        >
          {isSubmitting ? (
            <Text style={styles.submitButtonText}>Submitting Emergency Request...</Text>
          ) : (
            <>
              <MaterialIcons name="emergency" size={24} color="#fff" />
              <Text style={styles.submitButtonText}>SUBMIT EMERGENCY REQUEST</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            ⚠️ By submitting this emergency request, you confirm that this is a genuine emergency requiring immediate professional assistance.
            False emergency requests may result in account suspension.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  header: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    alignItems: 'center',
  },
  headerTitleText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
    marginTop: 2,
  },
  helpButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF9800',
    borderRadius: 8,
    padding: 12,
    marginTop: 20,
    marginBottom: 20,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
    fontWeight: '500',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  urgencyGrid: {
    gap: 10,
  },
  urgencyCard: {
    backgroundColor: '#1e1e3f',
    borderRadius: 8,
    padding: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  urgencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  urgencyLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  emergencyBadge: {
    backgroundColor: '#D32F2F',
    borderRadius: 12,
    padding: 4,
  },
  urgencyDescription: {
    fontSize: 12,
    color: '#aaa',
  },
  serviceCard: {
    backgroundColor: '#1e1e3f',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedServiceCard: {
    borderColor: '#4CAF50',
    backgroundColor: '#1e2a1e',
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  serviceResponse: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  multiplierBadge: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  multiplierText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#aaa',
    lineHeight: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#2a2a4a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
  descriptionInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  useCurrentLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  useCurrentLocationText: {
    fontSize: 14,
    color: '#4CAF50',
    marginLeft: 4,
    fontWeight: '500',
  },
  estimationCard: {
    backgroundColor: '#1e1e3f',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  estimationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  estimationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
  estimationDetails: {
    gap: 8,
  },
  estimationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  estimationLabel: {
    fontSize: 14,
    color: '#aaa',
  },
  estimationValue: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F44336',
    borderRadius: 8,
    paddingVertical: 16,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#333',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
  disclaimer: {
    backgroundColor: '#2a2a4a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 30,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#aaa',
    lineHeight: 16,
    textAlign: 'center',
  },
});

export default EmergencyJobRequestScreen;