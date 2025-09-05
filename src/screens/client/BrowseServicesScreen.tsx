import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SERVICE_CATEGORIES } from '../../constants';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - SPACING.lg * 3) / 2;

interface ServiceCategory {
  id: string;
  name: { en: string; ar: string };
  icon: string;
  color: string;
}

const BrowseServicesScreen: React.FC = () => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const filteredCategories = SERVICE_CATEGORIES.filter(category =>
    getText(category.name).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderServiceCard = ({ item }: { item: ServiceCategory }) => (
    <TouchableOpacity
      style={[
        styles.serviceCard,
        {
          backgroundColor: theme.surface,
          borderColor: selectedCategory === item.id ? item.color : theme.border,
        },
      ]}
      onPress={() => setSelectedCategory(
        selectedCategory === item.id ? null : item.id
      )}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
        <Ionicons name={item.icon as any} size={32} color="white" />
      </View>
      <Text style={[styles.serviceName, { color: theme.text }]}>
        {getText(item.name)}
      </Text>
      {selectedCategory === item.id && (
        <View style={styles.selectedIndicator}>
          <Ionicons name="checkmark-circle" size={20} color={item.color} />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          {isArabic ? 'تصفح الخدمات' : 'Browse Services'}
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          {isArabic 
            ? 'اختر نوع الخدمة الهندسية التي تحتاجها'
            : 'Choose the engineering service you need'
          }
        </Text>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: theme.surface }]}>
        <Ionicons 
          name="search" 
          size={20} 
          color={theme.textSecondary} 
          style={styles.searchIcon}
        />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder={isArabic ? 'البحث عن خدمة...' : 'Search for a service...'}
          placeholderTextColor={theme.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={theme.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Service Categories Grid */}
      <FlatList
        data={filteredCategories}
        renderItem={renderServiceCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
      />

      {/* Continue Button */}
      {selectedCategory && (
        <View style={styles.continueContainer}>
          <TouchableOpacity
            style={[styles.continueButton, { backgroundColor: COLORS.primary }]}
            onPress={() => {
              // Navigate to job request wizard
              console.log('Selected category:', selectedCategory);
            }}
          >
            <Text style={styles.continueButtonText}>
              {isArabic ? 'متابعة' : 'Continue'}
            </Text>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.h2,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.regular,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.light.border,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: TYPOGRAPHY.sizes.body1,
    paddingVertical: SPACING.sm,
  },
  gridContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  row: {
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: CARD_WIDTH,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 2,
    alignItems: 'center',
    marginBottom: SPACING.md,
    position: 'relative',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  serviceName: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    textAlign: 'center',
  },
  selectedIndicator: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
  },
  continueContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  continueButtonText: {
    color: 'white',
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.semiBold,
    marginRight: SPACING.sm,
  },
});

export default BrowseServicesScreen;
