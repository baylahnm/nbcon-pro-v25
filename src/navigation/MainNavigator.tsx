import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { RootState } from '../store';
import { UserRole } from '../types';
import { COLORS } from '../constants';

// Import existing screens
import ClientDashboardScreen from '../screens/client/ClientDashboardScreen';
import EngineerDashboardScreen from '../screens/engineer/EngineerDashboardScreen';
import BrowseServicesScreen from '../screens/client/BrowseServicesScreen';
import ServiceDiscoveryScreen from '../screens/services/ServiceDiscoveryScreen';

// Jobs Screens
import JobPostingScreen from '../screens/jobs/JobPostingScreen';
import JobBrowsingScreen from '../screens/jobs/JobBrowsingScreen';
import JobDetailsScreen from '../screens/jobs/JobDetailsScreen';
import JobApplicationScreen from '../screens/jobs/JobApplicationScreen';

// Payments Screens
import PaymentMethodsScreen from '../screens/payments/PaymentMethodsScreen';
import PaymentProcessingScreen from '../screens/payments/PaymentProcessingScreen';
import PaymentHistoryScreen from '../screens/payments/PaymentHistoryScreen';
import BillingDashboardScreen from '../screens/payments/BillingDashboardScreen';
import SubscriptionManagementScreen from '../screens/payments/SubscriptionManagementScreen';
import InvoiceScreen from '../screens/payments/InvoiceScreen';

// Messaging Screens
import MessagingDashboardScreen from '../screens/messaging/MessagingDashboardScreen';
import ChatScreen from '../screens/messaging/ChatScreen';
import NotificationsScreen from '../screens/messaging/NotificationsScreen';

// Profile Screens
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import PortfolioScreen from '../screens/profile/PortfolioScreen';

// Support Screens
import HelpCenterScreen from '../screens/support/HelpCenterScreen';
import ContactSupportScreen from '../screens/support/ContactSupportScreen';
import FeedbackScreen from '../screens/support/FeedbackScreen';

// Error & State Screens
import Error404Screen from '../screens/states/Error404Screen';
import Error500Screen from '../screens/states/Error500Screen';
import OfflineModeScreen from '../screens/states/OfflineModeScreen';
import MaintenanceModeScreen from '../screens/states/MaintenanceModeScreen';

export type MainStackParamList = {
  // Main Tabs
  MainTabs: undefined;
  
  // Dashboard
  Dashboard: undefined;
  ClientDashboard: undefined;
  EngineerDashboard: undefined;
  ServiceDiscovery: undefined;
  
  // Jobs
  JobPosting: undefined;
  JobBrowsing: undefined;
  JobDetails: { jobId: string };
  JobApplication: { jobId: string };
  
  // Payments
  PaymentMethods: undefined;
  PaymentProcessing: { amount?: number; jobId?: string; plan?: any };
  PaymentHistory: undefined;
  BillingDashboard: undefined;
  SubscriptionPlans: undefined;
  SubscriptionManagement: undefined;
  Invoice: { invoiceId: string };
  
  // Messaging
  Messages: undefined;
  MessagingDashboard: undefined;
  ChatScreen: { conversationId?: string; userId?: string };
  Notifications: undefined;
  
  // Profile
  Profile: undefined;
  EditProfile: undefined;
  Settings: undefined;
  Portfolio: undefined;
  
  // Support
  HelpCenter: undefined;
  ContactSupport: undefined;
  Feedback: undefined;
  
  // Error & States
  Error: { error?: string; retry?: () => void };
  NoInternet: undefined;
  ServerError: undefined;
  NotFound: undefined;
  Maintenance: undefined;
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
            case 'Payments':
              iconName = focused ? 'card' : 'card-outline';
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
      <Tab.Screen name="Browse" component={JobBrowsingScreen} />
      <Tab.Screen name="Messages" component={MessagingDashboardScreen} />
      <Tab.Screen name="Payments" component={BillingDashboardScreen} />
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
      <Tab.Screen name="Jobs" component={JobBrowsingScreen} />
      <Tab.Screen name="Messages" component={MessagingDashboardScreen} />
      <Tab.Screen name="Earnings" component={BillingDashboardScreen} />
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
      
      {/* Dashboard Screens */}
      <Stack.Screen name="ServiceDiscovery" component={ServiceDiscoveryScreen} />
      
      {/* Job Screens */}
      <Stack.Screen name="JobPosting" component={JobPostingScreen} />
      <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
      <Stack.Screen name="JobApplication" component={JobApplicationScreen} />
      
      {/* Payment Screens */}
      <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
      <Stack.Screen name="PaymentProcessing" component={PaymentProcessingScreen} />
      <Stack.Screen name="PaymentHistory" component={PaymentHistoryScreen} />
      <Stack.Screen name="SubscriptionManagement" component={SubscriptionManagementScreen} />
      <Stack.Screen name="Invoice" component={InvoiceScreen} />
      
      {/* Messaging Screens */}
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      
      {/* Profile Screens */}
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Portfolio" component={PortfolioScreen} />
      
      {/* Support Screens */}
      <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
      <Stack.Screen name="ContactSupport" component={ContactSupportScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
      
      {/* Error & State Screens */}
      <Stack.Screen name="Error" component={Error500Screen} />
      <Stack.Screen name="NoInternet" component={OfflineModeScreen} />
      <Stack.Screen name="ServerError" component={Error500Screen} />
      <Stack.Screen name="NotFound" component={Error404Screen} />
      <Stack.Screen name="Maintenance" component={MaintenanceModeScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;