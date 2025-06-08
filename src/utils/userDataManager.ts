
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
    // COMPLETE WIPE - absolutely no data should exist
    this.completeWipe();
  }

  static getInstance(): UserDataManager {
    if (!UserDataManager.instance) {
      UserDataManager.instance = new UserDataManager();
    }
    return UserDataManager.instance;
  }

  // Complete wipe - no users, no data, nothing
  completeWipe(): void {
    console.log('COMPLETE WIPE - removing ALL data from the app');
    
    // Clear everything from localStorage and sessionStorage
    localStorage.clear();
    sessionStorage.clear();
    
    // Reset internal state
    this.currentUserId = null;
    
    console.log('App is now completely empty - no users, no data exists');
  }

  // Initialize first user (signup)
  initializeUser(username: string, city: string, avatar: string): User {
    console.log('Creating first user account:', username);
    
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
    
    // Save as the only user
    const users = [user];
    this.saveUsers(users);
    
    this.currentUserId = user.id;
    localStorage.setItem('currentUserId', user.id);
    localStorage.setItem('userName', username);
    localStorage.setItem('userCity', city);
    localStorage.setItem('userAvatar', avatar);
    
    console.log('First user created successfully:', user);
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
      
      // Update level based on coins
      const newLevel = this.calculateLevel(users[userIndex].coins);
      users[userIndex].level = newLevel.current;
      users[userIndex].nextLevel = newLevel.next;
      
      this.saveUsers(users);
      console.log(`Added ${amount} coins. New balance:`, users[userIndex].coins, 'Level:', newLevel.current);
    }
  }

  private calculateLevel(coins: number): { current: string; next: string } {
    const levels = [
      { name: 'Nature Seeker', minCoins: 0, nextLevel: 'Forest Friend' },
      { name: 'Forest Friend', minCoins: 100, nextLevel: 'Tree Hugger' },
      { name: 'Tree Hugger', minCoins: 250, nextLevel: 'Nature Guardian' },
      { name: 'Nature Guardian', minCoins: 500, nextLevel: 'Eco Master' },
      { name: 'Eco Master', minCoins: 1000, nextLevel: 'Planet Protector' },
      { name: 'Planet Protector', minCoins: 2000, nextLevel: 'Max Level' },
    ];
    
    for (let i = levels.length - 1; i >= 0; i--) {
      if (coins >= levels[i].minCoins) {
        return {
          current: levels[i].name,
          next: levels[i].nextLevel
        };
      }
    }
    
    return { current: 'Nature Seeker', next: 'Forest Friend' };
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

  // Empty leaderboard - only return real users
  getLeaderboardData(): User[] {
    const users = this.getAllUsers();
    return users.sort((a, b) => b.coins - a.coins).map((user, index) => ({
      ...user,
      rank: index + 1
    }));
  }

  // No default friends
  getDefaultFriends(): Friend[] {
    return [];
  }
}

export default UserDataManager;
