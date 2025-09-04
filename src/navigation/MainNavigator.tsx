import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { RootState } from '../store';
import { UserRole } from '../types';
import { COLORS } from '../constants';

// Client Screens
import ClientDashboardScreen from '../screens/client/ClientDashboardScreen';
import BrowseServicesScreen from '../screens/client/BrowseServicesScreen';
import JobRequestWizardScreen from '../screens/client/JobRequestWizardScreen';
import JobTimelineScreen from '../screens/client/JobTimelineScreen';
import PaymentsScreen from '../screens/client/PaymentsScreen';

// Engineer Screens
import EngineerDashboardScreen from '../screens/engineer/EngineerDashboardScreen';
import JobListScreen from '../screens/engineer/JobListScreen';
import EarningsScreen from '../screens/engineer/EarningsScreen';
import ProfileScreen from '../screens/engineer/ProfileScreen';

// Shared Screens
import MessagesScreen from '../screens/shared/MessagesScreen';
import NotificationsScreen from '../screens/shared/NotificationsScreen';
import SettingsScreen from '../screens/shared/SettingsScreen';
import JobDetailsScreen from '../screens/shared/JobDetailsScreen';

export type MainStackParamList = {
  Dashboard: undefined;
  Messages: undefined;
  Profile: undefined;
  Settings: undefined;
  JobDetails: { jobId: string };
  Notifications: undefined;
  
  // Client specific
  BrowseServices: undefined;
  JobRequestWizard: undefined;
  JobTimeline: { jobId: string };
  Payments: undefined;
  
  // Engineer specific
  JobList: undefined;
  Earnings: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<MainStackParamList>();

const ClientTabs: React.FC = () => {
  const { isDarkMode } = useSelector((state: RootState) => state.app);
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Dashboard':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Browse':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case 'Messages':
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'home-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: isDarkMode ? COLORS.dark.textSecondary : COLORS.light.textSecondary,
        tabBarStyle: {
          backgroundColor: isDarkMode ? COLORS.dark.surface : COLORS.light.surface,
          borderTopColor: isDarkMode ? COLORS.dark.border : COLORS.light.border,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={ClientDashboardScreen} />
      <Tab.Screen name="Browse" component={BrowseServicesScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const EngineerTabs: React.FC = () => {
  const { isDarkMode } = useSelector((state: RootState) => state.app);
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Dashboard':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Jobs':
              iconName = focused ? 'briefcase' : 'briefcase-outline';
              break;
            case 'Messages':
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              break;
            case 'Earnings':
              iconName = focused ? 'wallet' : 'wallet-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'home-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: isDarkMode ? COLORS.dark.textSecondary : COLORS.light.textSecondary,
        tabBarStyle: {
          backgroundColor: isDarkMode ? COLORS.dark.surface : COLORS.light.surface,
          borderTopColor: isDarkMode ? COLORS.dark.border : COLORS.light.border,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={EngineerDashboardScreen} />
      <Tab.Screen name="Jobs" component={JobListScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Earnings" component={EarningsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const MainNavigator: React.FC = () => {
  const { userRole } = useSelector((state: RootState) => state.auth);
  
  const TabComponent = userRole === UserRole.CLIENT ? ClientTabs : EngineerTabs;
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabComponent} />
      <Stack.Screen 
        name="JobDetails" 
        component={JobDetailsScreen}
        options={{
          headerShown: true,
          title: 'Job Details',
        }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          headerShown: true,
          title: 'Settings',
        }}
      />
      <Stack.Screen 
        name="Notifications" 
        component={NotificationsScreen}
        options={{
          headerShown: true,
          title: 'Notifications',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;