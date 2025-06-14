
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  city: string;
  coins: number;
  totalSessions: number;
  totalHours: number;
  currentStreak: number;
  badges: number;
  level: string;
  nextLevel: string;
  joinDate: string;
  walkingSessions: WalkingSession[];
  friends: string[]; // Array of user IDs
}

interface WalkingSession {
  id: string;
  date: string;
  distance: number;
  time: number;
  coinsEarned: number;
  route: any[];
  photos: any[];
  comments: any[];
  feeling: number;
  activities: string[];
}

export class UserManager {
  private static instance: UserManager;
  private users: Map<string, User> = new Map();
  private currentUserId: string | null = null;

  static getInstance(): UserManager {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager();
    }
    return UserManager.instance;
  }

  constructor() {
    this.loadUsers();
  }

  private loadUsers(): void {
    const savedUsers = localStorage.getItem('app_users');
    const savedCurrentUser = localStorage.getItem('app_current_user');
    
    if (savedUsers) {
      const usersArray: User[] = JSON.parse(savedUsers);
      usersArray.forEach(user => {
        this.users.set(user.id, user);
      });
    }
    
    this.currentUserId = savedCurrentUser;
  }

  private saveUsers(): void {
    const usersArray = Array.from(this.users.values());
    localStorage.setItem('app_users', JSON.stringify(usersArray));
    if (this.currentUserId) {
      localStorage.setItem('app_current_user', this.currentUserId);
    }
  }

  registerUser(email: string, password: string): User {
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const username = email.split('@')[0];
    
    const newUser: User = {
      id: userId,
      name: username,
      email: email,
      avatar: '🌱',
      city: 'New York',
      coins: 0,
      totalSessions: 0,
      totalHours: 0,
      currentStreak: 0,
      badges: 0,
      level: 'Beginner',
      nextLevel: 'Nature Seeker',
      joinDate: new Date().toISOString(),
      walkingSessions: [],
      friends: []
    };

    this.users.set(userId, newUser);
    this.currentUserId = userId;
    this.saveUsers();
    
    // Update localStorage for compatibility
    localStorage.setItem('userToken', `token_${userId}`);
    localStorage.setItem('userName', username);
    localStorage.setItem('userCity', newUser.city);
    
    return newUser;
  }

  loginUser(email: string, password: string): User | null {
    const user = Array.from(this.users.values()).find(u => u.email === email);
    if (user) {
      this.currentUserId = user.id;
      this.saveUsers();
      
      // Update localStorage for compatibility
      localStorage.setItem('userToken', `token_${user.id}`);
      localStorage.setItem('userName', user.name);
      localStorage.setItem('userCity', user.city);
      
      return user;
    }
    return null;
  }

  getCurrentUser(): User | null {
    if (!this.currentUserId) return null;
    return this.users.get(this.currentUserId) || null;
  }

  updateUser(updates: Partial<User>): void {
    if (!this.currentUserId) return;
    
    const user = this.users.get(this.currentUserId);
    if (user) {
      const updatedUser = { ...user, ...updates };
      this.users.set(this.currentUserId, updatedUser);
      this.saveUsers();
      
      // Update localStorage for compatibility
      if (updates.name) localStorage.setItem('userName', updates.name);
      if (updates.city) localStorage.setItem('userCity', updates.city);
    }
  }

  addWalkingSession(session: Omit<WalkingSession, 'id'>): void {
    if (!this.currentUserId) return;
    
    const user = this.users.get(this.currentUserId);
    if (user) {
      const newSession: WalkingSession = {
        ...session,
        id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };
      
      user.walkingSessions.push(newSession);
      user.totalSessions++;
      user.totalHours += session.time / 60;
      user.coins += session.coinsEarned;
      
      // Update level based on coins
      this.updateUserLevel(user);
      
      this.users.set(this.currentUserId, user);
      this.saveUsers();
    }
  }

  private updateUserLevel(user: User): void {
    if (user.coins >= 2000) {
      user.level = 'Forest Guardian';
      user.nextLevel = 'Nature Master';
    } else if (user.coins >= 1000) {
      user.level = 'Forest Friend';
      user.nextLevel = 'Forest Guardian';
    } else if (user.coins >= 500) {
      user.level = 'Nature Seeker';
      user.nextLevel = 'Forest Friend';
    } else {
      user.level = 'Beginner';
      user.nextLevel = 'Nature Seeker';
    }
  }

  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  getUsersByCity(city: string): User[] {
    return Array.from(this.users.values()).filter(user => user.city === city);
  }

  getFriends(): User[] {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return [];
    
    return currentUser.friends
      .map(friendId => this.users.get(friendId))
      .filter((friend): friend is User => friend !== undefined);
  }

  addFriend(friendId: string): void {
    if (!this.currentUserId) return;
    
    const user = this.users.get(this.currentUserId);
    if (user && !user.friends.includes(friendId)) {
      user.friends.push(friendId);
      this.users.set(this.currentUserId, user);
      this.saveUsers();
    }
  }

  logoutUser(): void {
    this.currentUserId = null;
    localStorage.removeItem('app_current_user');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userCity');
  }

  clearAllData(): void {
    this.users.clear();
    this.currentUserId = null;
    localStorage.removeItem('app_users');
    localStorage.removeItem('app_current_user');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userCity');
    localStorage.removeItem('walkingSessions');
    localStorage.removeItem('joinedActivities');
    localStorage.removeItem('messages');
  }
}

export const userManager = UserManager.getInstance();
