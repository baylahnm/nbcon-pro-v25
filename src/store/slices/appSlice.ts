import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Language } from '../../types';

interface AppState {
  language: Language;
  isDarkMode: boolean;
  isOnboardingCompleted: boolean;
  currentLocation: {
    latitude: number;
    longitude: number;
  } | null;
  networkStatus: 'online' | 'offline';
}

const initialState: AppState = {
  language: Language.ENGLISH,
  isDarkMode: false,
  isOnboardingCompleted: false,
  currentLocation: null,
  networkStatus: 'online',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    completeOnboarding: (state) => {
      state.isOnboardingCompleted = true;
    },
    updateLocation: (state, action: PayloadAction<{
      latitude: number;
      longitude: number;
    }>) => {
      state.currentLocation = action.payload;
    },
    setNetworkStatus: (state, action: PayloadAction<'online' | 'offline'>) => {
      state.networkStatus = action.payload;
    },
  },
});

export const {
  setLanguage,
  toggleDarkMode,
  setDarkMode,
  completeOnboarding,
  updateLocation,
  setNetworkStatus,
} = appSlice.actions;

export default appSlice.reducer;