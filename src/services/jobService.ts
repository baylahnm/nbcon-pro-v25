import { EventEmitter } from 'events';

export interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  clientId: string;
  clientName: string;
  engineerId?: string;
  engineerName?: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
    city: string;
    region: string;
  };
  budget: {
    min: number;
    max: number;
    currency: string;
    type: 'fixed' | 'hourly' | 'milestone';
  };
  timeline: {
    startDate: Date;
    endDate: Date;
    estimatedDuration: number; // in days
    urgency: 'standard' | 'priority' | 'emergency';
  };
  requirements: {
    experience: string;
    skills: string[];
    certifications: string[];
    specialRequirements: string;
  };
  status: 'draft' | 'posted' | 'active' | 'pending' | 'completed' | 'cancelled' | 'expired';
  visibility: 'public' | 'private' | 'invite_only';
  tags: string[];
  attachments: {
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
  }[];
  milestones: {
    id: string;
    title: string;
    description: string;
    amount: number;
    dueDate: Date;
    status: 'pending' | 'in_progress' | 'completed' | 'approved';
  }[];
  proposals: {
    id: string;
    engineerId: string;
    engineerName: string;
    engineerRating: number;
    proposedAmount: number;
    proposedTimeline: number;
    coverLetter: string;
    attachments: string[];
    status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
    submittedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  completedAt?: Date;
}

export interface JobFilter {
  category?: string;
  location?: string;
  budgetMin?: number;
  budgetMax?: number;
  urgency?: string;
  status?: string;
  experience?: string;
  skills?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface JobSearchParams {
  query?: string;
  filters?: JobFilter;
  sortBy?: 'relevance' | 'date' | 'budget' | 'urgency';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface JobStats {
  totalJobs: number;
  activeJobs: number;
  completedJobs: number;
  totalEarnings: number;
  averageRating: number;
  responseRate: number;
}

class JobService extends EventEmitter {
  private static instance: JobService;
  private jobs: Map<string, Job> = new Map();
  private isConnected: boolean = false;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectInterval: number = 5000;

  private constructor() {
    super();
    this.initializeMockData();
    this.setupEventListeners();
  }

  public static getInstance(): JobService {
    if (!JobService.instance) {
      JobService.instance = new JobService();
    }
    return JobService.instance;
  }

  /**
   * Connect to job service
   */
  public async connect(): Promise<boolean> {
    try {
      // Simulate API connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.emit('connected');
      
      console.log('Job service connected');
      return true;
    } catch (error) {
      console.error('Error connecting to job service:', error);
      this.handleConnectionError();
      return false;
    }
  }

  /**
   * Disconnect from job service
   */
  public disconnect(): void {
    this.isConnected = false;
    this.emit('disconnected');
    console.log('Job service disconnected');
  }

  /**
   * Create a new job
   */
  public async createJob(jobData: Partial<Job>): Promise<Job> {
    try {
      const job: Job = {
        id: `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: jobData.title || '',
        description: jobData.description || '',
        category: jobData.category || '',
        subcategory: jobData.subcategory,
        clientId: jobData.clientId || '',
        clientName: jobData.clientName || '',
        engineerId: jobData.engineerId,
        engineerName: jobData.engineerName,
        location: jobData.location || {
          address: '',
          latitude: 0,
          longitude: 0,
          city: '',
          region: '',
        },
        budget: jobData.budget || {
          min: 0,
          max: 0,
          currency: 'SAR',
          type: 'fixed',
        },
        timeline: jobData.timeline || {
          startDate: new Date(),
          endDate: new Date(),
          estimatedDuration: 0,
          urgency: 'standard',
        },
        requirements: jobData.requirements || {
          experience: '',
          skills: [],
          certifications: [],
          specialRequirements: '',
        },
        status: 'draft',
        visibility: 'public',
        tags: jobData.tags || [],
        attachments: jobData.attachments || [],
        milestones: jobData.milestones || [],
        proposals: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        publishedAt: jobData.status === 'posted' ? new Date() : undefined,
        completedAt: jobData.status === 'completed' ? new Date() : undefined,
      };

      this.jobs.set(job.id, job);
      this.emit('jobCreated', job);
      
      return job;
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  }

  /**
   * Update an existing job
   */
  public async updateJob(jobId: string, updates: Partial<Job>): Promise<Job | null> {
    try {
      const job = this.jobs.get(jobId);
      if (!job) {
        throw new Error('Job not found');
      }

      const updatedJob = {
        ...job,
        ...updates,
        updatedAt: new Date(),
      };

      this.jobs.set(jobId, updatedJob);
      this.emit('jobUpdated', updatedJob);
      
      return updatedJob;
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  }

  /**
   * Get job by ID
   */
  public getJob(jobId: string): Job | null {
    return this.jobs.get(jobId) || null;
  }

  /**
   * Get jobs with filters and pagination
   */
  public async getJobs(params: JobSearchParams = {}): Promise<{
    jobs: Job[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  }> {
    try {
      let filteredJobs = Array.from(this.jobs.values());

      // Apply filters
      if (params.filters) {
        filteredJobs = this.applyFilters(filteredJobs, params.filters);
      }

      // Apply search query
      if (params.query) {
        const query = params.query.toLowerCase();
        filteredJobs = filteredJobs.filter(job =>
          job.title.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }

      // Apply sorting
      if (params.sortBy) {
        filteredJobs = this.applySorting(filteredJobs, params.sortBy, params.sortOrder || 'desc');
      }

      // Apply pagination
      const page = params.page || 1;
      const limit = params.limit || 20;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

      return {
        jobs: paginatedJobs,
        total: filteredJobs.length,
        page,
        limit,
        hasMore: endIndex < filteredJobs.length,
      };
    } catch (error) {
      console.error('Error getting jobs:', error);
      throw error;
    }
  }

  /**
   * Get jobs for a specific client
   */
  public getJobsForClient(clientId: string): Job[] {
    return Array.from(this.jobs.values()).filter(job => job.clientId === clientId);
  }

  /**
   * Get jobs for a specific engineer
   */
  public getJobsForEngineer(engineerId: string): Job[] {
    return Array.from(this.jobs.values()).filter(job => job.engineerId === engineerId);
  }

  /**
   * Post a job (change status from draft to posted)
   */
  public async postJob(jobId: string): Promise<Job | null> {
    try {
      const job = this.jobs.get(jobId);
      if (!job) {
        throw new Error('Job not found');
      }

      if (job.status !== 'draft') {
        throw new Error('Only draft jobs can be posted');
      }

      const updatedJob = {
        ...job,
        status: 'posted' as const,
        publishedAt: new Date(),
        updatedAt: new Date(),
      };

      this.jobs.set(jobId, updatedJob);
      this.emit('jobPosted', updatedJob);
      
      return updatedJob;
    } catch (error) {
      console.error('Error posting job:', error);
      throw error;
    }
  }

  /**
   * Apply for a job (submit proposal)
   */
  public async applyForJob(
    jobId: string,
    engineerId: string,
    engineerName: string,
    proposal: {
      proposedAmount: number;
      proposedTimeline: number;
      coverLetter: string;
      attachments?: string[];
    }
  ): Promise<boolean> {
    try {
      const job = this.jobs.get(jobId);
      if (!job) {
        throw new Error('Job not found');
      }

      if (job.status !== 'posted') {
        throw new Error('Job is not available for applications');
      }

      const newProposal = {
        id: `proposal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        engineerId,
        engineerName,
        engineerRating: 0, // Would be fetched from user profile
        proposedAmount: proposal.proposedAmount,
        proposedTimeline: proposal.proposedTimeline,
        coverLetter: proposal.coverLetter,
        attachments: proposal.attachments || [],
        status: 'pending' as const,
        submittedAt: new Date(),
      };

      const updatedJob = {
        ...job,
        proposals: [...job.proposals, newProposal],
        updatedAt: new Date(),
      };

      this.jobs.set(jobId, updatedJob);
      this.emit('jobApplied', updatedJob, newProposal);
      
      return true;
    } catch (error) {
      console.error('Error applying for job:', error);
      throw error;
    }
  }

  /**
   * Accept a proposal
   */
  public async acceptProposal(jobId: string, proposalId: string): Promise<Job | null> {
    try {
      const job = this.jobs.get(jobId);
      if (!job) {
        throw new Error('Job not found');
      }

      const proposal = job.proposals.find(p => p.id === proposalId);
      if (!proposal) {
        throw new Error('Proposal not found');
      }

      const updatedJob = {
        ...job,
        engineerId: proposal.engineerId,
        engineerName: proposal.engineerName,
        status: 'active' as const,
        proposals: job.proposals.map(p => 
          p.id === proposalId 
            ? { ...p, status: 'accepted' as const }
            : { ...p, status: 'rejected' as const }
        ),
        updatedAt: new Date(),
      };

      this.jobs.set(jobId, updatedJob);
      this.emit('proposalAccepted', updatedJob, proposal);
      
      return updatedJob;
    } catch (error) {
      console.error('Error accepting proposal:', error);
      throw error;
    }
  }

  /**
   * Complete a job
   */
  public async completeJob(jobId: string): Promise<Job | null> {
    try {
      const job = this.jobs.get(jobId);
      if (!job) {
        throw new Error('Job not found');
      }

      if (job.status !== 'active') {
        throw new Error('Only active jobs can be completed');
      }

      const updatedJob = {
        ...job,
        status: 'completed' as const,
        completedAt: new Date(),
        updatedAt: new Date(),
      };

      this.jobs.set(jobId, updatedJob);
      this.emit('jobCompleted', updatedJob);
      
      return updatedJob;
    } catch (error) {
      console.error('Error completing job:', error);
      throw error;
    }
  }

  /**
   * Cancel a job
   */
  public async cancelJob(jobId: string, reason?: string): Promise<Job | null> {
    try {
      const job = this.jobs.get(jobId);
      if (!job) {
        throw new Error('Job not found');
      }

      const updatedJob = {
        ...job,
        status: 'cancelled' as const,
        updatedAt: new Date(),
      };

      this.jobs.set(jobId, updatedJob);
      this.emit('jobCancelled', updatedJob, reason);
      
      return updatedJob;
    } catch (error) {
      console.error('Error cancelling job:', error);
      throw error;
    }
  }

  /**
   * Get job statistics
   */
  public getJobStats(userId: string, userType: 'client' | 'engineer'): JobStats {
    const userJobs = userType === 'client' 
      ? this.getJobsForClient(userId)
      : this.getJobsForEngineer(userId);

    const totalJobs = userJobs.length;
    const activeJobs = userJobs.filter(job => job.status === 'active').length;
    const completedJobs = userJobs.filter(job => job.status === 'completed').length;
    
    const totalEarnings = userJobs
      .filter(job => job.status === 'completed')
      .reduce((sum, job) => sum + job.budget.max, 0);

    const averageRating = 4.5; // Would be calculated from actual ratings
    const responseRate = 0.85; // Would be calculated from actual data

    return {
      totalJobs,
      activeJobs,
      completedJobs,
      totalEarnings,
      averageRating,
      responseRate,
    };
  }

  /**
   * Search jobs
   */
  public async searchJobs(query: string, filters?: JobFilter): Promise<Job[]> {
    const results = await this.getJobs({
      query,
      filters,
      sortBy: 'relevance',
    });
    
    return results.jobs;
  }

  /**
   * Get featured jobs
   */
  public getFeaturedJobs(limit: number = 10): Job[] {
    return Array.from(this.jobs.values())
      .filter(job => job.status === 'posted' && job.visibility === 'public')
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  /**
   * Get similar jobs
   */
  public getSimilarJobs(jobId: string, limit: number = 5): Job[] {
    const job = this.jobs.get(jobId);
    if (!job) return [];

    return Array.from(this.jobs.values())
      .filter(j => 
        j.id !== jobId && 
        j.status === 'posted' && 
        (j.category === job.category || j.tags.some(tag => job.tags.includes(tag)))
      )
      .slice(0, limit);
  }

  /**
   * Apply filters to jobs
   */
  private applyFilters(jobs: Job[], filters: JobFilter): Job[] {
    return jobs.filter(job => {
      if (filters.category && job.category !== filters.category) return false;
      if (filters.location && !job.location.city.toLowerCase().includes(filters.location.toLowerCase())) return false;
      if (filters.budgetMin && job.budget.max < filters.budgetMin) return false;
      if (filters.budgetMax && job.budget.min > filters.budgetMax) return false;
      if (filters.urgency && job.timeline.urgency !== filters.urgency) return false;
      if (filters.status && job.status !== filters.status) return false;
      if (filters.experience && !job.requirements.experience.toLowerCase().includes(filters.experience.toLowerCase())) return false;
      if (filters.skills && filters.skills.length > 0) {
        const hasRequiredSkills = filters.skills.some(skill => 
          job.requirements.skills.some(jobSkill => 
            jobSkill.toLowerCase().includes(skill.toLowerCase())
          )
        );
        if (!hasRequiredSkills) return false;
      }
      if (filters.dateRange) {
        const jobDate = job.createdAt;
        if (jobDate < filters.dateRange.start || jobDate > filters.dateRange.end) return false;
      }
      return true;
    });
  }

  /**
   * Apply sorting to jobs
   */
  private applySorting(jobs: Job[], sortBy: string, sortOrder: 'asc' | 'desc'): Job[] {
    return jobs.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
          break;
        case 'budget':
          comparison = a.budget.max - b.budget.max;
          break;
        case 'urgency':
          const urgencyOrder = { emergency: 3, priority: 2, standard: 1 };
          comparison = urgencyOrder[a.timeline.urgency] - urgencyOrder[b.timeline.urgency];
          break;
        case 'relevance':
        default:
          // For relevance, we could implement a scoring algorithm
          comparison = b.createdAt.getTime() - a.createdAt.getTime();
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }

  /**
   * Initialize mock data
   */
  private initializeMockData(): void {
    const mockJobs: Job[] = [
      {
        id: 'job_1',
        title: 'Site Survey for NEOM Project',
        description: 'Comprehensive site survey for new construction project in NEOM. Includes topographical survey, utility mapping, and environmental assessment.',
        category: 'Surveying',
        clientId: 'client_1',
        clientName: 'Ahmed Al-Rashid',
        location: {
          address: 'NEOM, Tabuk Province, Saudi Arabia',
          latitude: 28.3998,
          longitude: 36.5660,
          city: 'Tabuk',
          region: 'Tabuk Province',
        },
        budget: {
          min: 12000,
          max: 15000,
          currency: 'SAR',
          type: 'fixed',
        },
        timeline: {
          startDate: new Date('2024-01-15'),
          endDate: new Date('2024-02-15'),
          estimatedDuration: 30,
          urgency: 'priority',
        },
        requirements: {
          experience: '5+ years in civil engineering',
          skills: ['Surveying', 'CAD', 'GIS', 'Project Management'],
          certifications: ['PMP', 'PE License'],
          specialRequirements: 'Must have experience with large-scale construction projects',
        },
        status: 'active',
        visibility: 'public',
        tags: ['surveying', 'construction', 'neom', 'civil-engineering'],
        attachments: [],
        milestones: [
          {
            id: 'milestone_1',
            title: 'Initial Survey',
            description: 'Complete initial site assessment',
            amount: 5000,
            dueDate: new Date('2024-01-25'),
            status: 'completed',
          },
          {
            id: 'milestone_2',
            title: 'Data Analysis',
            description: 'Analyze survey data and create reports',
            amount: 5000,
            dueDate: new Date('2024-02-05'),
            status: 'in_progress',
          },
          {
            id: 'milestone_3',
            title: 'Final Report',
            description: 'Deliver final survey report',
            amount: 5000,
            dueDate: new Date('2024-02-15'),
            status: 'pending',
          },
        ],
        proposals: [],
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-20'),
        publishedAt: new Date('2024-01-10'),
        engineerId: 'engineer_1',
        engineerName: 'Sarah Al-Mansouri',
      },
      // Add more mock jobs...
    ];

    mockJobs.forEach(job => {
      this.jobs.set(job.id, job);
    });
  }

  /**
   * Setup event listeners
   */
  private setupEventListeners(): void {
    this.on('connected', () => {
      console.log('Job service connected');
    });

    this.on('disconnected', () => {
      console.log('Job service disconnected');
    });
  }

  /**
   * Handle connection errors
   */
  private handleConnectionError(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      
      setTimeout(() => {
        this.connect();
      }, this.reconnectInterval);
    } else {
      this.emit('connectionFailed');
    }
  }

  /**
   * Get connection status
   */
  public isServiceConnected(): boolean {
    return this.isConnected;
  }

  /**
   * Get service statistics
   */
  public getServiceStats(): {
    totalJobs: number;
    activeJobs: number;
    isConnected: boolean;
  } {
    const allJobs = Array.from(this.jobs.values());
    
    return {
      totalJobs: allJobs.length,
      activeJobs: allJobs.filter(job => job.status === 'active').length,
      isConnected: this.isConnected,
    };
  }
}

export default JobService.getInstance();
