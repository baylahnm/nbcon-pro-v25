import { EventEmitter } from 'events';

export interface RealtimeUpdate {
  id: string;
  type: 'job_status' | 'payment_status' | 'location_update' | 'availability_change' | 'system_alert';
  userId: string;
  data: any;
  timestamp: Date;
  priority: 'low' | 'normal' | 'high' | 'urgent';
}

export interface JobStatusUpdate {
  jobId: string;
  status: 'posted' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  engineerId?: string;
  engineerName?: string;
  clientId: string;
  clientName: string;
  message?: string;
}

export interface PaymentStatusUpdate {
  paymentId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  amount: number;
  currency: string;
  userId: string;
  description: string;
}

export interface LocationUpdate {
  userId: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: Date;
}

export interface AvailabilityUpdate {
  engineerId: string;
  isAvailable: boolean;
  serviceAreas: string[];
  nextAvailableTime?: Date;
}

export interface SystemAlert {
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  actionRequired: boolean;
  actionUrl?: string;
}

class RealtimeService extends EventEmitter {
  private static instance: RealtimeService;
  private isConnected: boolean = false;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectInterval: number = 5000;
  private heartbeatInterval: number = 30000;
  private heartbeatTimer: NodeJS.Timeout | null = null;
  private updateQueue: RealtimeUpdate[] = [];
  private isProcessingQueue: boolean = false;

  private constructor() {
    super();
    this.setupEventListeners();
  }

  public static getInstance(): RealtimeService {
    if (!RealtimeService.instance) {
      RealtimeService.instance = new RealtimeService();
    }
    return RealtimeService.instance;
  }

  /**
   * Connect to real-time service
   */
  public async connect(): Promise<boolean> {
    try {
      // Simulate WebSocket connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.startHeartbeat();
      this.processUpdateQueue();
      
      this.emit('connected');
      console.log('Realtime service connected');
      return true;
    } catch (error) {
      console.error('Error connecting to realtime service:', error);
      this.handleConnectionError();
      return false;
    }
  }

  /**
   * Disconnect from real-time service
   */
  public disconnect(): void {
    this.isConnected = false;
    this.stopHeartbeat();
    this.emit('disconnected');
    console.log('Realtime service disconnected');
  }

  /**
   * Subscribe to updates for a specific user
   */
  public subscribeToUser(userId: string): void {
    this.emit('subscribe', { userId, timestamp: new Date() });
  }

  /**
   * Unsubscribe from updates for a specific user
   */
  public unsubscribeFromUser(userId: string): void {
    this.emit('unsubscribe', { userId, timestamp: new Date() });
  }

  /**
   * Subscribe to job updates
   */
  public subscribeToJob(jobId: string): void {
    this.emit('subscribeToJob', { jobId, timestamp: new Date() });
  }

  /**
   * Unsubscribe from job updates
   */
  public unsubscribeFromJob(jobId: string): void {
    this.emit('unsubscribeFromJob', { jobId, timestamp: new Date() });
  }

  /**
   * Send job status update
   */
  public async sendJobStatusUpdate(update: JobStatusUpdate): Promise<void> {
    const realtimeUpdate: RealtimeUpdate = {
      id: `job_status_${Date.now()}`,
      type: 'job_status',
      userId: update.clientId,
      data: update,
      timestamp: new Date(),
      priority: 'high',
    };

    await this.sendUpdate(realtimeUpdate);
  }

  /**
   * Send payment status update
   */
  public async sendPaymentStatusUpdate(update: PaymentStatusUpdate): Promise<void> {
    const realtimeUpdate: RealtimeUpdate = {
      id: `payment_status_${Date.now()}`,
      type: 'payment_status',
      userId: update.userId,
      data: update,
      timestamp: new Date(),
      priority: 'high',
    };

    await this.sendUpdate(realtimeUpdate);
  }

  /**
   * Send location update
   */
  public async sendLocationUpdate(update: LocationUpdate): Promise<void> {
    const realtimeUpdate: RealtimeUpdate = {
      id: `location_${Date.now()}`,
      type: 'location_update',
      userId: update.userId,
      data: update,
      timestamp: new Date(),
      priority: 'normal',
    };

    await this.sendUpdate(realtimeUpdate);
  }

  /**
   * Send availability update
   */
  public async sendAvailabilityUpdate(update: AvailabilityUpdate): Promise<void> {
    const realtimeUpdate: RealtimeUpdate = {
      id: `availability_${Date.now()}`,
      type: 'availability_change',
      userId: update.engineerId,
      data: update,
      timestamp: new Date(),
      priority: 'normal',
    };

    await this.sendUpdate(realtimeUpdate);
  }

  /**
   * Send system alert
   */
  public async sendSystemAlert(alert: SystemAlert): Promise<void> {
    const realtimeUpdate: RealtimeUpdate = {
      id: `system_alert_${Date.now()}`,
      type: 'system_alert',
      userId: 'system',
      data: alert,
      timestamp: new Date(),
      priority: alert.type === 'error' ? 'urgent' : 'normal',
    };

    await this.sendUpdate(realtimeUpdate);
  }

  /**
   * Send custom update
   */
  public async sendCustomUpdate(
    type: string,
    userId: string,
    data: any,
    priority: 'low' | 'normal' | 'high' | 'urgent' = 'normal'
  ): Promise<void> {
    const realtimeUpdate: RealtimeUpdate = {
      id: `${type}_${Date.now()}`,
      type: type as any,
      userId,
      data,
      timestamp: new Date(),
      priority,
    };

    await this.sendUpdate(realtimeUpdate);
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
    isConnected: boolean;
    queueLength: number;
    reconnectAttempts: number;
  } {
    return {
      isConnected: this.isConnected,
      queueLength: this.updateQueue.length,
      reconnectAttempts: this.reconnectAttempts,
    };
  }

  /**
   * Setup event listeners
   */
  private setupEventListeners(): void {
    this.on('connected', () => {
      console.log('Realtime service connected');
    });

    this.on('disconnected', () => {
      console.log('Realtime service disconnected');
    });

    this.on('updateReceived', (update: RealtimeUpdate) => {
      this.handleUpdateReceived(update);
    });

    this.on('connectionFailed', () => {
      console.log('Realtime service connection failed');
    });
  }

  /**
   * Send update to server
   */
  private async sendUpdate(update: RealtimeUpdate): Promise<void> {
    if (!this.isConnected) {
      // Queue update for later
      this.updateQueue.push(update);
      return;
    }

    try {
      // Simulate sending to server
      await this.simulateUpdateSend(update);
      this.emit('updateSent', update);
    } catch (error) {
      console.error('Error sending update:', error);
      // Queue for retry
      this.updateQueue.push(update);
    }
  }

  /**
   * Process queued updates
   */
  private async processUpdateQueue(): Promise<void> {
    if (this.isProcessingQueue || this.updateQueue.length === 0) {
      return;
    }

    this.isProcessingQueue = true;

    while (this.updateQueue.length > 0 && this.isConnected) {
      const update = this.updateQueue.shift();
      if (update) {
        try {
          await this.simulateUpdateSend(update);
          this.emit('updateSent', update);
        } catch (error) {
          console.error('Error processing queued update:', error);
          // Re-queue for retry
          this.updateQueue.unshift(update);
          break;
        }
      }
    }

    this.isProcessingQueue = false;

    // Schedule next processing
    if (this.updateQueue.length > 0) {
      setTimeout(() => this.processUpdateQueue(), 1000);
    }
  }

  /**
   * Simulate sending update to server
   */
  private async simulateUpdateSend(update: RealtimeUpdate): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Simulate server response
    this.emit('updateReceived', update);
  }

  /**
   * Handle received update
   */
  private handleUpdateReceived(update: RealtimeUpdate): void {
    switch (update.type) {
      case 'job_status':
        this.emit('jobStatusUpdate', update.data);
        break;
      case 'payment_status':
        this.emit('paymentStatusUpdate', update.data);
        break;
      case 'location_update':
        this.emit('locationUpdate', update.data);
        break;
      case 'availability_change':
        this.emit('availabilityUpdate', update.data);
        break;
      case 'system_alert':
        this.emit('systemAlert', update.data);
        break;
      default:
        this.emit('customUpdate', update);
    }
  }

  /**
   * Start heartbeat
   */
  private startHeartbeat(): void {
    this.heartbeatTimer = setInterval(() => {
      if (this.isConnected) {
        this.emit('heartbeat');
      }
    }, this.heartbeatInterval);
  }

  /**
   * Stop heartbeat
   */
  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
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
   * Clear update queue
   */
  public clearUpdateQueue(): void {
    this.updateQueue = [];
  }

  /**
   * Get queued updates count
   */
  public getQueuedUpdatesCount(): number {
    return this.updateQueue.length;
  }

  /**
   * Set reconnection settings
   */
  public setReconnectionSettings(
    maxAttempts: number,
    interval: number
  ): void {
    this.maxReconnectAttempts = maxAttempts;
    this.reconnectInterval = interval;
  }

  /**
   * Set heartbeat interval
   */
  public setHeartbeatInterval(interval: number): void {
    this.heartbeatInterval = interval;
    if (this.heartbeatTimer) {
      this.stopHeartbeat();
      this.startHeartbeat();
    }
  }
}

export default RealtimeService.getInstance();
