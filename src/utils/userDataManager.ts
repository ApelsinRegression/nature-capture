
interface User {
  id: string;
  username: string;
  city: string;
  avatar: string;
  coins: number;
  totalSessions: number;
  totalHours: number;
  currentStreak: number;
  badges: number;
  level: string;
  nextLevel: string;
  rank: number;
  createdAt: number;
  lastActiveAt: number;
}

interface WalkingSession {
  id: string;
  userId: string;
  date: string;
  distance: number;
  time: number;
  photos: string[];
  comments: string[];
  feeling: number;
  activities: string[];
  startTime: number;
  endTime: number;
}

interface Message {
  id: string;
  fromUserId: string;
  toUserId: string;
  fromUsername: string;
  toUsername: string;
  text: string;
  timestamp: number;
  type: 'regular' | 'invitation';
  place?: string;
  time?: string;
}

interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastSeen: string;
}

export class UserDataManager {
  private static instance: UserDataManager;
  private currentUserId: string | null = null;

  private constructor() {
    // FORCE CLEAR ALL DATA ON STARTUP - no accounts should exist
    this.forceCompleteWipe();
  }

  static getInstance(): UserDataManager {
    if (!UserDataManager.instance) {
      UserDataManager.instance = new UserDataManager();
    }
    return UserDataManager.instance;
  }

  // Complete wipe of everything - no users should exist
  forceCompleteWipe(): void {
    console.log('FORCE WIPING ALL DATA - NO USERS SHOULD EXIST');
    
    // Clear ALL localStorage
    localStorage.clear();
    
    this.currentUserId = null;
    console.log('Complete wipe finished - app is completely fresh');
  }

  // Initialize or get current user
  initializeUser(username: string, city: string, avatar: string): User {
    console.log('Initializing user:', username);
    
    // Create new user with 0 everything
    const user: User = {
      id: this.generateId(),
      username,
      city,
      avatar,
      coins: 0,
      totalSessions: 0,
      totalHours: 0,
      currentStreak: 0,
      badges: 0,
      level: 'Nature Seeker',
      nextLevel: 'Forest Friend',
      rank: 1,
      createdAt: Date.now(),
      lastActiveAt: Date.now()
    };
    
    const users = [user];
    this.saveUsers(users);
    console.log('Created new user:', user);
    
    this.currentUserId = user.id;
    localStorage.setItem('currentUserId', user.id);
    localStorage.setItem('userName', username);
    localStorage.setItem('userCity', city);
    localStorage.setItem('userAvatar', avatar);
    
    return user;
  }

  getCurrentUser(): User | null {
    if (!this.currentUserId) {
      this.currentUserId = localStorage.getItem('currentUserId');
    }
    
    if (!this.currentUserId) return null;
    
    const users = this.getAllUsers();
    return users.find(u => u.id === this.currentUserId) || null;
  }

  // User management
  private getAllUsers(): User[] {
    const users = localStorage.getItem('allUsers');
    return users ? JSON.parse(users) : [];
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem('allUsers', JSON.stringify(users));
  }

  updateUserCoins(amount: number): void {
    const users = this.getAllUsers();
    const userIndex = users.findIndex(u => u.id === this.currentUserId);
    
    if (userIndex !== -1) {
      users[userIndex].coins += amount;
      users[userIndex].lastActiveAt = Date.now();
      this.saveUsers(users);
      console.log(`Added ${amount} coins to user. New balance:`, users[userIndex].coins);
    }
  }

  // Walking sessions management
  saveWalkingSession(session: Omit<WalkingSession, 'id' | 'userId'>): void {
    if (!this.currentUserId) return;
    
    const sessions = this.getWalkingSessions();
    const newSession: WalkingSession = {
      ...session,
      id: this.generateId(),
      userId: this.currentUserId
    };
    
    sessions.push(newSession);
    localStorage.setItem('walkingSessions', JSON.stringify(sessions));
    
    // Update user stats
    const users = this.getAllUsers();
    const userIndex = users.findIndex(u => u.id === this.currentUserId);
    
    if (userIndex !== -1) {
      users[userIndex].totalSessions += 1;
      users[userIndex].totalHours += session.time;
      users[userIndex].coins += Math.floor(session.distance * 10) + Math.floor(session.time * 5);
      this.saveUsers(users);
    }
    
    console.log('Saved walking session:', newSession);
  }

  getWalkingSessions(): WalkingSession[] {
    if (!this.currentUserId) return [];
    
    const sessions = localStorage.getItem('walkingSessions');
    const allSessions: WalkingSession[] = sessions ? JSON.parse(sessions) : [];
    return allSessions.filter(s => s.userId === this.currentUserId);
  }

  // Messages management
  saveMessage(message: Omit<Message, 'id' | 'fromUserId'>): void {
    if (!this.currentUserId) return;
    
    const messages = this.getMessages();
    const newMessage: Message = {
      ...message,
      id: this.generateId(),
      fromUserId: this.currentUserId
    };
    
    messages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(messages));
    console.log('Saved message:', newMessage);
  }

  getMessages(): Message[] {
    const messages = localStorage.getItem('messages');
    return messages ? JSON.parse(messages) : [];
  }

  getUserMessages(): Message[] {
    if (!this.currentUserId) return [];
    
    const allMessages = this.getMessages();
    return allMessages.filter(m => m.fromUserId === this.currentUserId || m.toUserId === this.currentUserId);
  }

  // Clear all data (reset app)
  clearAllData(): void {
    this.forceCompleteWipe();
  }

  // Logout current user
  logout(): void {
    this.currentUserId = null;
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userCity');
    localStorage.removeItem('userAvatar');
    console.log('User logged out');
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Get leaderboard data - should be empty initially
  getLeaderboardData(): User[] {
    const users = this.getAllUsers();
    return users.sort((a, b) => b.coins - a.coins).map((user, index) => ({
      ...user,
      rank: index + 1
    }));
  }

  // No friends initially
  getDefaultFriends(): Friend[] {
    return [];
  }
}

export default UserDataManager;
