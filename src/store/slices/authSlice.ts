import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserRole } from '../../types';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
  userRole: UserRole | null;
  userId: string | null;
  isLoading: boolean;
  hasCompletedOnboarding: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  refreshToken: null,
  userRole: null,
  userId: null,
  isLoading: false,
  hasCompletedOnboarding: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action: PayloadAction<{
      token: string;
      refreshToken: string;
      userRole: UserRole;
      userId: string;
    }>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.userRole = action.payload.userRole;
      state.userId = action.payload.userId;
    },
    loginFailure: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.token = null;
      state.refreshToken = null;
      state.userRole = null;
      state.userId = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.refreshToken = null;
      state.userRole = null;
      state.userId = null;
      state.hasCompletedOnboarding = false;
    },
    completeOnboarding: (state) => {
      state.hasCompletedOnboarding = true;
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  completeOnboarding,
  updateToken,
} = authSlice.actions;

export default authSlice.reducer;