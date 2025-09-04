import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/auth/SplashScreen';
import RoleSelectionScreen from '../screens/auth/RoleSelectionScreen';
import PhoneVerificationScreen from '../screens/auth/PhoneVerificationScreen';
import SMSCodeScreen from '../screens/auth/SMSCodeScreen';
import PersonalInfoScreen from '../screens/auth/PersonalInfoScreen';
import ProfessionalCredentialsScreen from '../screens/auth/ProfessionalCredentialsScreen';
import ServiceSpecializationScreen from '../screens/auth/ServiceSpecializationScreen';
import ServiceAreaScreen from '../screens/auth/ServiceAreaScreen';
import RateSettingScreen from '../screens/auth/RateSettingScreen';
import WelcomeTutorialScreen from '../screens/auth/WelcomeTutorialScreen';
import PermissionRequestsScreen from '../screens/auth/PermissionRequestsScreen';
import AccountTypeConfirmationScreen from '../screens/auth/AccountTypeConfirmationScreen';

export type AuthStackParamList = {
  Splash: undefined;
  RoleSelection: undefined;
  PhoneVerification: { role: string };
  SMSCode: { phone: string; role: string };
  PersonalInfo: { phone: string; role: string };
  ProfessionalCredentials: { userInfo: any };
  ServiceSpecialization: { userInfo: any };
  ServiceArea: { userInfo: any };
  RateSetting: { userInfo: any };
  WelcomeTutorial: undefined;
  PermissionRequests: undefined;
  AccountTypeConfirmation: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Splash"
      screenOptions={{ 
        headerShown: false,
        gestureEnabled: true,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
      <Stack.Screen name="PhoneVerification" component={PhoneVerificationScreen} />
      <Stack.Screen name="SMSCode" component={SMSCodeScreen} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
      <Stack.Screen name="ProfessionalCredentials" component={ProfessionalCredentialsScreen} />
      <Stack.Screen name="ServiceSpecialization" component={ServiceSpecializationScreen} />
      <Stack.Screen name="ServiceArea" component={ServiceAreaScreen} />
      <Stack.Screen name="RateSetting" component={RateSettingScreen} />
      <Stack.Screen name="WelcomeTutorial" component={WelcomeTutorialScreen} />
      <Stack.Screen name="PermissionRequests" component={PermissionRequestsScreen} />
      <Stack.Screen name="AccountTypeConfirmation" component={AccountTypeConfirmationScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;