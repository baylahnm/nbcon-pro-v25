import { EventEmitter } from 'events';

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'client' | 'engineer';
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file' | 'system';
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
  jobId: string;
  metadata?: {
    fileUrl?: string;
    fileName?: string;
    fileSize?: number;
    imageUrl?: string;
    imageWidth?: number;
    imageHeight?: number;
  };
}

export interface ChatRoom {
  id: string;
  jobId: string;
  jobTitle: string;
  participants: {
    clientId: string;
    clientName: string;
    engineerId: string;
    engineerName: string;
  };
  lastMessage?: Message;
  unreadCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TypingIndicator {
  userId: string;
  userName: string;
  isTyping: boolean;
  timestamp: Date;
}

class ChatService extends EventEmitter {
  private static instance: ChatService;
  private chatRooms: Map<string, ChatRoom> = new Map();
  private messages: Map<string, Message[]> = new Map();
  private typingUsers: Map<string, TypingIndicator> = new Map();
  private isConnected: boolean = false;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectInterval: number = 5000;

  private constructor() {
    super();
    this.setupEventListeners();
  }

  public static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  /**
   * Connect to chat service
   */
  public async connect(): Promise<boolean> {
    try {
      // Simulate WebSocket connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.emit('connected');
      
      console.log('Chat service connected');
      return true;
    } catch (error) {
      console.error('Error connecting to chat service:', error);
      this.handleConnectionError();
      return false;
    }
  }

  /**
   * Disconnect from chat service
   */
  public disconnect(): void {
    this.isConnected = false;
    this.emit('disconnected');
    console.log('Chat service disconnected');
  }

  /**
   * Create a new chat room
   */
  public async createChatRoom(
    jobId: string,
    jobTitle: string,
    clientId: string,
    clientName: string,
    engineerId: string,
    engineerName: string
  ): Promise<ChatRoom> {
    const chatRoom: ChatRoom = {
      id: `chat_${jobId}`,
      jobId,
      jobTitle,
      participants: {
        clientId,
        clientName,
        engineerId,
        engineerName,
      },
      unreadCount: 0,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.chatRooms.set(chatRoom.id, chatRoom);
    this.messages.set(chatRoom.id, []);
    
    this.emit('chatRoomCreated', chatRoom);
    return chatRoom;
  }

  /**
   * Get chat room by ID
   */
  public getChatRoom(chatRoomId: string): ChatRoom | undefined {
    return this.chatRooms.get(chatRoomId);
  }

  /**
   * Get all chat rooms for a user
   */
  public getChatRoomsForUser(userId: string): ChatRoom[] {
    return Array.from(this.chatRooms.values()).filter(room => 
      room.participants.clientId === userId || room.participants.engineerId === userId
    );
  }

  /**
   * Send a message
   */
  public async sendMessage(
    chatRoomId: string,
    senderId: string,
    senderName: string,
    senderType: 'client' | 'engineer',
    content: string,
    type: 'text' | 'image' | 'file' = 'text',
    metadata?: any
  ): Promise<Message> {
    const message: Message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      senderId,
      senderName,
      senderType,
      content,
      timestamp: new Date(),
      type,
      status: 'sending',
      jobId: this.chatRooms.get(chatRoomId)?.jobId || '',
      metadata,
    };

    // Add message to local storage
    const messages = this.messages.get(chatRoomId) || [];
    messages.push(message);
    this.messages.set(chatRoomId, messages);

    // Update chat room
    const chatRoom = this.chatRooms.get(chatRoomId);
    if (chatRoom) {
      chatRoom.lastMessage = message;
      chatRoom.updatedAt = new Date();
      chatRoom.unreadCount += 1;
    }

    this.emit('messageSent', message, chatRoomId);

    // Simulate sending to server
    try {
      await this.simulateMessageSend(message, chatRoomId);
    } catch (error) {
      message.status = 'failed';
      this.emit('messageFailed', message, chatRoomId);
    }

    return message;
  }

  /**
   * Get messages for a chat room
   */
  public getMessages(chatRoomId: string): Message[] {
    return this.messages.get(chatRoomId) || [];
  }

  /**
   * Mark messages as read
   */
  public markMessagesAsRead(chatRoomId: string, userId: string): void {
    const messages = this.messages.get(chatRoomId) || [];
    const unreadMessages = messages.filter(msg => 
      msg.senderId !== userId && msg.status !== 'read'
    );

    unreadMessages.forEach(msg => {
      msg.status = 'read';
    });

    const chatRoom = this.chatRooms.get(chatRoomId);
    if (chatRoom) {
      chatRoom.unreadCount = 0;
    }

    this.emit('messagesRead', chatRoomId, userId);
  }

  /**
   * Send typing indicator
   */
  public sendTypingIndicator(
    chatRoomId: string,
    userId: string,
    userName: string,
    isTyping: boolean
  ): void {
    const typingIndicator: TypingIndicator = {
      userId,
      userName,
      isTyping,
      timestamp: new Date(),
    };

    this.typingUsers.set(`${chatRoomId}_${userId}`, typingIndicator);
    this.emit('typingIndicator', chatRoomId, typingIndicator);

    // Auto-clear typing indicator after 3 seconds
    if (isTyping) {
      setTimeout(() => {
        this.sendTypingIndicator(chatRoomId, userId, userName, false);
      }, 3000);
    }
  }

  /**
   * Get typing indicators for a chat room
   */
  public getTypingIndicators(chatRoomId: string): TypingIndicator[] {
    const indicators: TypingIndicator[] = [];
    
    this.typingUsers.forEach((indicator, key) => {
      if (key.startsWith(chatRoomId) && indicator.isTyping) {
        indicators.push(indicator);
      }
    });

    return indicators;
  }

  /**
   * Upload file and send as message
   */
  public async sendFileMessage(
    chatRoomId: string,
    senderId: string,
    senderName: string,
    senderType: 'client' | 'engineer',
    file: File | Blob,
    fileName: string
  ): Promise<Message> {
    try {
      // Simulate file upload
      const fileUrl = await this.simulateFileUpload(file, fileName);
      const fileSize = file.size;

      const metadata = {
        fileUrl,
        fileName,
        fileSize,
      };

      return this.sendMessage(
        chatRoomId,
        senderId,
        senderName,
        senderType,
        `📎 ${fileName}`,
        'file',
        metadata
      );
    } catch (error) {
      console.error('Error sending file message:', error);
      throw error;
    }
  }

  /**
   * Upload image and send as message
   */
  public async sendImageMessage(
    chatRoomId: string,
    senderId: string,
    senderName: string,
    senderType: 'client' | 'engineer',
    image: File | Blob,
    fileName: string
  ): Promise<Message> {
    try {
      // Simulate image upload
      const imageUrl = await this.simulateImageUpload(image, fileName);
      
      // Get image dimensions (simulated)
      const imageWidth = 800;
      const imageHeight = 600;

      const metadata = {
        imageUrl,
        fileName,
        imageWidth,
        imageHeight,
      };

      return this.sendMessage(
        chatRoomId,
        senderId,
        senderName,
        senderType,
        '📷 Image',
        'image',
        metadata
      );
    } catch (error) {
      console.error('Error sending image message:', error);
      throw error;
    }
  }

  /**
   * Delete a message
   */
  public deleteMessage(chatRoomId: string, messageId: string): boolean {
    const messages = this.messages.get(chatRoomId) || [];
    const messageIndex = messages.findIndex(msg => msg.id === messageId);
    
    if (messageIndex !== -1) {
      messages.splice(messageIndex, 1);
      this.messages.set(chatRoomId, messages);
      this.emit('messageDeleted', messageId, chatRoomId);
      return true;
    }
    
    return false;
  }

  /**
   * Get unread message count for a user
   */
  public getUnreadCount(userId: string): number {
    let totalUnread = 0;
    
    this.chatRooms.forEach(room => {
      if (room.participants.clientId === userId || room.participants.engineerId === userId) {
        totalUnread += room.unreadCount;
      }
    });
    
    return totalUnread;
  }

  /**
   * Search messages
   */
  public searchMessages(query: string, chatRoomId?: string): Message[] {
    const results: Message[] = [];
    const searchQuery = query.toLowerCase();
    
    const roomsToSearch = chatRoomId ? [chatRoomId] : Array.from(this.chatRooms.keys());
    
    roomsToSearch.forEach(roomId => {
      const messages = this.messages.get(roomId) || [];
      const matchingMessages = messages.filter(msg => 
        msg.content.toLowerCase().includes(searchQuery)
      );
      results.push(...matchingMessages);
    });
    
    return results.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  /**
   * Setup event listeners
   */
  private setupEventListeners(): void {
    // Handle connection events
    this.on('connected', () => {
      console.log('Chat service connected');
    });

    this.on('disconnected', () => {
      console.log('Chat service disconnected');
    });
  }

  /**
   * Simulate message sending to server
   */
  private async simulateMessageSend(message: Message, chatRoomId: string): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simulate success
    message.status = 'sent';
    this.emit('messageDelivered', message, chatRoomId);
    
    // Simulate delivery after a short delay
    setTimeout(() => {
      message.status = 'delivered';
      this.emit('messageDelivered', message, chatRoomId);
    }, 1000);
  }

  /**
   * Simulate file upload
   */
  private async simulateFileUpload(file: File | Blob, fileName: string): Promise<string> {
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Return simulated file URL
    return `https://api.nbconpro.com/files/${Date.now()}_${fileName}`;
  }

  /**
   * Simulate image upload
   */
  private async simulateImageUpload(image: File | Blob, fileName: string): Promise<string> {
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return simulated image URL
    return `https://api.nbconpro.com/images/${Date.now()}_${fileName}`;
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
    totalChatRooms: number;
    totalMessages: number;
    activeUsers: number;
    isConnected: boolean;
  } {
    let totalMessages = 0;
    this.messages.forEach(msgs => {
      totalMessages += msgs.length;
    });

    return {
      totalChatRooms: this.chatRooms.size,
      totalMessages,
      activeUsers: this.typingUsers.size,
      isConnected: this.isConnected,
    };
  }
}

export default ChatService.getInstance();
