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
    // Force clear everything on startup
    this.forceResetApp();
  }

  static getInstance(): UserDataManager {
    if (!UserDataManager.instance) {
      UserDataManager.instance = new UserDataManager();
    }
    return UserDataManager.instance;
  }

  // Coin-based level system
  private getLevelInfo(coins: number) {
    const levels = [
      { name: 'Nature Seeker', minCoins: 0, nextLevel: 'Forest Friend', nextCoins: 100 },
      { name: 'Forest Friend', minCoins: 100, nextLevel: 'Tree Hugger', nextCoins: 250 },
      { name: 'Tree Hugger', minCoins: 250, nextLevel: 'Nature Guardian', nextCoins: 500 },
      { name: 'Nature Guardian', minCoins: 500, nextLevel: 'Eco Master', nextCoins: 1000 },
      { name: 'Eco Master', minCoins: 1000, nextLevel: 'Planet Protector', nextCoins: 2000 },
      { name: 'Planet Protector', minCoins: 2000, nextLevel: 'Max Level', nextCoins: 2000 },
    ];
    
    for (let i = levels.length - 1; i >= 0; i--) {
      if (coins >= levels[i].minCoins) {
        return levels[i];
      }
    }
    return levels[0];
  }

  // Badge system based on coins
  private getBadgeCount(coins: number): number {
    if (coins >= 2000) return 8;
    if (coins >= 1000) return 7;
    if (coins >= 500) return 6;
    if (coins >= 250) return 5;
    if (coins >= 100) return 4;
    if (coins >= 50) return 3;
    if (coins >= 25) return 2;
    if (coins >= 10) return 1;
    return 0;
  }

  // Initialize or get current user
  initializeUser(username: string, city: string, avatar: string): User {
    console.log('Initializing user - clearing all existing data first');
    
    // FORCE clear all data first
    this.forceResetApp();
    
    const levelInfo = this.getLevelInfo(0);
    
    // Create completely new user with 0 everything
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
      level: levelInfo.name,
      nextLevel: levelInfo.nextLevel,
      rank: 1,
      createdAt: Date.now(),
      lastActiveAt: Date.now()
    };
    
    // Save as the only user
    this.saveUsers([user]);
    console.log('Created fresh new user:', user);
    
    this.currentUserId = user.id;
    localStorage.setItem('currentUserId', user.id);
    localStorage.setItem('userName', username);
    localStorage.setItem('userCity', city);
    localStorage.setItem('userAvatar', avatar);
    
    return user;
  }

  // Force reset everything - complete wipe
  forceResetApp(): void {
    console.log('FORCE RESETTING ALL APP DATA');
    
    // Clear all localStorage keys
    const keysToRemove = [
      'allUsers',
      'walkingSessions', 
      'messages',
      'currentUserId',
      'userName',
      'userCity', 
      'userAvatar',
      'friends',
      'joinedActivities',
      'sessionActive',
      'sessionTime',
      'locationGranted',
      'sessionCompletedActivities',
      'sessionRoute',
      'currentPosition',
      'sessionPhotos',
      'sessionComments',
      'sessionFeeling',
      'suggestedActivities',
      'addedActivities'
    ];
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
      console.log(`Removed localStorage key: ${key}`);
    });
    
    this.currentUserId = null;
    console.log('Complete app reset finished');
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
      const newCoins = users[userIndex].coins + amount;
      const levelInfo = this.getLevelInfo(newCoins);
      
      users[userIndex].coins = newCoins;
      users[userIndex].badges = this.getBadgeCount(newCoins);
      users[userIndex].level = levelInfo.name;
      users[userIndex].nextLevel = levelInfo.nextLevel;
      users[userIndex].lastActiveAt = Date.now();
      
      this.saveUsers(users);
      console.log(`Added ${amount} coins to user. New balance:`, newCoins);
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
      
      // Add coins and update level
      const coinsEarned = Math.floor(session.distance * 10) + Math.floor(session.time * 5);
      const newCoins = users[userIndex].coins + coinsEarned;
      const levelInfo = this.getLevelInfo(newCoins);
      
      users[userIndex].coins = newCoins;
      users[userIndex].badges = this.getBadgeCount(newCoins);
      users[userIndex].level = levelInfo.name;
      users[userIndex].nextLevel = levelInfo.nextLevel;
      
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
    this.forceResetApp();
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

  // No default friends - start completely empty
  getDefaultFriends(): Friend[] {
    return [];
  }
}

export default UserDataManager;
