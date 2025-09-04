import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Job, JobStatus } from '../../types';

interface JobState {
  jobs: Job[];
  currentJob: Job | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    status?: JobStatus[];
    category?: string[];
    location?: string;
    budget?: { min: number; max: number };
  };
}

const initialState: JobState = {
  jobs: [],
  currentJob: null,
  isLoading: false,
  error: null,
  filters: {},
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    fetchJobsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchJobsSuccess: (state, action: PayloadAction<Job[]>) => {
      state.isLoading = false;
      state.jobs = action.payload;
      state.error = null;
    },
    fetchJobsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setCurrentJob: (state, action: PayloadAction<Job>) => {
      state.currentJob = action.payload;
    },
    updateJob: (state, action: PayloadAction<Partial<Job> & { id: string }>) => {
      const index = state.jobs.findIndex(job => job.id === action.payload.id);
      if (index !== -1) {
        state.jobs[index] = { ...state.jobs[index], ...action.payload };
      }
      if (state.currentJob && state.currentJob.id === action.payload.id) {
        state.currentJob = { ...state.currentJob, ...action.payload };
      }
    },
    addJob: (state, action: PayloadAction<Job>) => {
      state.jobs.unshift(action.payload);
    },
    removeJob: (state, action: PayloadAction<string>) => {
      state.jobs = state.jobs.filter(job => job.id !== action.payload);
      if (state.currentJob && state.currentJob.id === action.payload) {
        state.currentJob = null;
      }
    },
    setFilters: (state, action: PayloadAction<typeof initialState.filters>) => {
      state.filters = action.payload;
    },
    clearJobs: (state) => {
      state.jobs = [];
      state.currentJob = null;
      state.error = null;
    },
  },
});

export const {
  fetchJobsStart,
  fetchJobsSuccess,
  fetchJobsFailure,
  setCurrentJob,
  updateJob,
  addJob,
  removeJob,
  setFilters,
  clearJobs,
} = jobSlice.actions;

export default jobSlice.reducer;