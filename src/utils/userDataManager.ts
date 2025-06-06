
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

  private constructor() {}

  static getInstance(): UserDataManager {
    if (!UserDataManager.instance) {
      UserDataManager.instance = new UserDataManager();
    }
    return UserDataManager.instance;
  }

  // Initialize or get current user
  initializeUser(username: string, city: string, avatar: string): User {
    console.log('Initializing user:', username);
    
    // Check if user already exists
    const users = this.getAllUsers();
    let user = users.find(u => u.username === username);
    
    if (!user) {
      // Create new user with 0 everything
      user = {
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
        rank: users.length + 1,
        createdAt: Date.now(),
        lastActiveAt: Date.now()
      };
      
      users.push(user);
      this.saveUsers(users);
      console.log('Created new user:', user);
    } else {
      // Update last active time
      user.lastActiveAt = Date.now();
      this.saveUsers(users);
      console.log('User already exists:', user);
    }
    
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
      users[userIndex].coins += Math.floor(session.distance * 10) + Math.floor(session.time * 5); // 10 coins per km + 5 coins per hour
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
    localStorage.removeItem('allUsers');
    localStorage.removeItem('walkingSessions');
    localStorage.removeItem('messages');
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userCity');
    localStorage.removeItem('userAvatar');
    localStorage.removeItem('friends');
    localStorage.removeItem('joinedActivities');
    this.currentUserId = null;
    console.log('Cleared all user data');
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

  // Get leaderboard data
  getLeaderboardData(): User[] {
    const users = this.getAllUsers();
    return users.sort((a, b) => b.coins - a.coins).map((user, index) => ({
      ...user,
      rank: index + 1
    }));
  }

  // Default friends for new users
  getDefaultFriends(): Friend[] {
    return [
      { id: '1', name: 'Alex Green', avatar: '🌿', status: 'online', lastSeen: 'Active now' },
      { id: '2', name: 'Maya Forest', avatar: '🌳', status: 'offline', lastSeen: '2 hours ago' },
      { id: '3', name: 'Leo Sunshine', avatar: '☀️', status: 'online', lastSeen: 'Active now' },
      { id: '4', name: 'Luna Star', avatar: '⭐', status: 'offline', lastSeen: '1 day ago' },
      { id: '5', name: 'River Blue', avatar: '🌊', status: 'online', lastSeen: 'Active now' },
    ];
  }
}

export default UserDataManager;
