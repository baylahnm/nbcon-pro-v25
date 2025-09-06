import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Slider } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AIMatchingSettingsScreen: React.FC = () => {
  const [aiEnabled, setAiEnabled] = useState(true);
  const [locationWeight, setLocationWeight] = useState(0.7);
  const [skillWeight, setSkillWeight] = useState(0.9);
  const [ratingWeight, setRatingWeight] = useState(0.8);
  const [priceWeight, setPriceWeight] = useState(0.6);
  const [availabilityWeight, setAvailabilityWeight] = useState(0.5);
  const [preferLocal, setPreferLocal] = useState(true);
  const [preferVerified, setPreferVerified] = useState(true);
  const [preferTopRated, setPreferTopRated] = useState(false);

  const matchingFactors = [
    {
      id: 'location',
      name: 'Location Proximity',
      description: 'How close the engineer is to the job site',
      weight: locationWeight,
      onWeightChange: setLocationWeight,
      icon: 'location',
    },
    {
      id: 'skill',
      name: 'Skill Match',
      description: 'How well skills match the job requirements',
      weight: skillWeight,
      onWeightChange: setSkillWeight,
      icon: 'construct',
    },
    {
      id: 'rating',
      name: 'Rating & Reviews',
      description: 'Engineer rating and client feedback',
      weight: ratingWeight,
      onWeightChange: setRatingWeight,
      icon: 'star',
    },
    {
      id: 'price',
      name: 'Price Competitiveness',
      description: 'How competitive the engineer\'s rates are',
      weight: priceWeight,
      onWeightChange: setPriceWeight,
      icon: 'cash',
    },
    {
      id: 'availability',
      name: 'Availability',
      description: 'How quickly the engineer can start',
      weight: availabilityWeight,
      onWeightChange: setAvailabilityWeight,
      icon: 'time',
    },
  ];

  const preferences = [
    {
      id: 'local',
      name: 'Prefer Local Engineers',
      description: 'Prioritize engineers from the same city/region',
      enabled: preferLocal,
      onToggle: setPreferLocal,
    },
    {
      id: 'verified',
      name: 'Prefer Verified Engineers',
      description: 'Prioritize engineers with verified credentials',
      enabled: preferVerified,
      onToggle: setPreferVerified,
    },
    {
      id: 'top-rated',
      name: 'Prefer Top-Rated Engineers',
      description: 'Prioritize engineers with highest ratings',
      enabled: preferTopRated,
      onToggle: setPreferTopRated,
    },
  ];

  const MatchingFactor = ({ factor }: { factor: any }) => (
    <View style={styles.factorCard}>
      <View style={styles.factorHeader}>
        <Ionicons name={factor.icon as any} size={24} color="#007bff" />
        <View style={styles.factorInfo}>
          <Text style={styles.factorName}>{factor.name}</Text>
          <Text style={styles.factorDescription}>{factor.description}</Text>
        </View>
        <Text style={styles.factorWeight}>{Math.round(factor.weight * 100)}%</Text>
      </View>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={factor.weight}
          onValueChange={factor.onWeightChange}
          minimumTrackTintColor="#007bff"
          maximumTrackTintColor="#3a3a3a"
          thumbStyle={styles.sliderThumb}
        />
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabel}>Low</Text>
          <Text style={styles.sliderLabel}>High</Text>
        </View>
      </View>
    </View>
  );

  const Preference = ({ preference }: { preference: any }) => (
    <View style={styles.preferenceCard}>
      <View style={styles.preferenceHeader}>
        <View style={styles.preferenceInfo}>
          <Text style={styles.preferenceName}>{preference.name}</Text>
          <Text style={styles.preferenceDescription}>{preference.description}</Text>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={preference.enabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={preference.onToggle}
          value={preference.enabled}
        />
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>AI Matching Settings</Text>
      <Text style={styles.subtitle}>
        Customize how AI matches jobs with engineers
      </Text>

      <View style={styles.aiToggleCard}>
        <View style={styles.toggleHeader}>
          <View style={styles.toggleInfo}>
            <Ionicons name="brain" size={32} color="#007bff" />
            <View style={styles.toggleDetails}>
              <Text style={styles.toggleTitle}>AI Matching Engine</Text>
              <Text style={styles.toggleDescription}>
                Enable intelligent job-engineer matching
              </Text>
            </View>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={aiEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setAiEnabled}
            value={aiEnabled}
          />
        </View>
      </View>

      {aiEnabled && (
        <>
          <View style={styles.factorsCard}>
            <Text style={styles.cardTitle}>Matching Factors</Text>
            <Text style={styles.cardDescription}>
              Adjust the importance of different factors in AI matching
            </Text>
            {matchingFactors.map((factor) => (
              <MatchingFactor key={factor.id} factor={factor} />
            ))}
          </View>

          <View style={styles.preferencesCard}>
            <Text style={styles.cardTitle}>Matching Preferences</Text>
            <Text style={styles.cardDescription}>
              Set additional preferences for job matching
            </Text>
            {preferences.map((preference) => (
              <Preference key={preference.id} preference={preference} />
            ))}
          </View>

          <View style={styles.algorithmCard}>
            <Text style={styles.cardTitle}>How AI Matching Works</Text>
            <View style={styles.algorithmSteps}>
              <View style={styles.step}>
                <View style={styles.stepNumber}>1</View>
                <Text style={styles.stepText}>
                  Analyzes job requirements and engineer profiles
                </Text>
              </View>
              <View style={styles.step}>
                <View style={styles.stepNumber}>2</View>
                <Text style={styles.stepText}>
                  Calculates compatibility scores based on weighted factors
                </Text>
              </View>
              <View style={styles.step}>
                <View style={styles.stepNumber}>3</View>
                <Text style={styles.stepText}>
                  Applies preferences and filters to refine results
                </Text>
              </View>
              <View style={styles.step}>
                <View style={styles.stepNumber}>4</View>
                <Text style={styles.stepText}>
                  Ranks engineers by compatibility and presents top matches
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.performanceCard}>
            <Text style={styles.cardTitle}>AI Performance</Text>
            <View style={styles.performanceMetrics}>
              <View style={styles.metric}>
                <Text style={styles.metricValue}>94%</Text>
                <Text style={styles.metricLabel}>Match Accuracy</Text>
              </View>
              <View style={styles.metric}>
                <Text style={styles.metricValue}>2.3s</Text>
                <Text style={styles.metricLabel}>Avg. Response Time</Text>
              </View>
              <View style={styles.metric}>
                <Text style={styles.metricValue}>87%</Text>
                <Text style={styles.metricLabel}>Client Satisfaction</Text>
              </View>
            </View>
          </View>

          <View style={styles.testCard}>
            <Text style={styles.cardTitle}>Test AI Matching</Text>
            <Text style={styles.cardDescription}>
              Test how the AI would match a sample job
            </Text>
            <TouchableOpacity style={styles.testButton}>
              <Ionicons name="play" size={24} color="#ffffff" />
              <Text style={styles.testButtonText}>Run Test Match</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="refresh" size={24} color="#007bff" />
            <Text style={styles.actionText}>Reset to Default</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="save" size={24} color="#28a745" />
            <Text style={styles.actionText}>Save Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="help-circle" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Advanced</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          AI matching uses machine learning to find the best engineer for each job. 
          Adjust these settings to fine-tune the matching algorithm to your preferences.
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
  aiToggleCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  toggleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  toggleDetails: {
    marginLeft: 15,
  },
  toggleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  toggleDescription: {
    fontSize: 14,
    color: '#cccccc',
  },
  factorsCard: {
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
    marginBottom: 20,
  },
  factorCard: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  factorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  factorInfo: {
    flex: 1,
    marginLeft: 15,
  },
  factorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  factorDescription: {
    fontSize: 14,
    color: '#cccccc',
  },
  factorWeight: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  sliderContainer: {
    marginTop: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderThumb: {
    backgroundColor: '#007bff',
    width: 20,
    height: 20,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  sliderLabel: {
    fontSize: 12,
    color: '#cccccc',
  },
  preferencesCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  preferenceCard: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  preferenceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  preferenceInfo: {
    flex: 1,
  },
  preferenceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  preferenceDescription: {
    fontSize: 14,
    color: '#cccccc',
  },
  algorithmCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  algorithmSteps: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#ffffff',
    lineHeight: 20,
  },
  performanceCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  performanceMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  metric: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 5,
  },
  metricLabel: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'center',
  },
  testCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  testButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  testButtonText: {
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

export default AIMatchingSettingsScreen;
