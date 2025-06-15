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
    this.initializeTestUser();
  }

  private loadUsers(): void {
    try {
      const savedUsers = localStorage.getItem('app_users');
      const savedCurrentUser = localStorage.getItem('app_current_user');
      
      if (savedUsers) {
        const usersArray: User[] = JSON.parse(savedUsers);
        usersArray.forEach(user => {
          this.users.set(user.id, user);
        });
        console.log('Loaded users from localStorage:', usersArray.length);
      }
      
      this.currentUserId = savedCurrentUser;
      console.log('Current user ID loaded:', this.currentUserId);
    } catch (error) {
      console.error('Error loading users from localStorage:', error);
    }
  }

  private saveUsers(): void {
    try {
      const usersArray = Array.from(this.users.values());
      localStorage.setItem('app_users', JSON.stringify(usersArray));
      if (this.currentUserId) {
        localStorage.setItem('app_current_user', this.currentUserId);
      }
      console.log('Saved users to localStorage:', usersArray.length);
    } catch (error) {
      console.error('Error saving users to localStorage:', error);
    }
  }

  private initializeTestUser(): void {
    // Create test user if it doesn't exist
    const testEmail = 'test@test.com';
    const existingTestUser = Array.from(this.users.values()).find(u => u.email === testEmail);
    
    if (!existingTestUser) {
      const testUserId = `user_test_${Date.now()}`;
      const testUser: User = {
        id: testUserId,
        name: 'Test User',
        email: testEmail,
        avatar: '🌱',
        city: 'New York',
        coins: 150,
        totalSessions: 5,
        totalHours: 2.5,
        currentStreak: 3,
        badges: 2,
        level: 'Nature Seeker',
        nextLevel: 'Forest Friend',
        joinDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
        walkingSessions: [
          {
            id: 'session_1',
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // Yesterday
            distance: 1.2,
            time: 25,
            coinsEarned: 35,
            route: [],
            photos: [],
            comments: [],
            feeling: 5,
            activities: ['walking', 'bird_watching']
          },
          {
            id: 'session_2',
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
            distance: 2.1,
            time: 45,
            coinsEarned: 55,
            route: [],
            photos: [],
            comments: [],
            feeling: 4,
            activities: ['walking', 'photography']
          }
        ],
        friends: []
      };
      
      this.users.set(testUserId, testUser);
      this.saveUsers();
      console.log('Initialized test user with sample data');
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
    
    console.log('User registered and saved:', newUser);
    return newUser;
  }

  loginUser(email: string, password: string): User | null {
    const user = Array.from(this.users.values()).find(u => u.email === email);
    if (user && (password === 'test123' || email !== 'test@test.com')) {
      this.currentUserId = user.id;
      this.saveUsers();
      console.log('User logged in:', user);
      return user;
    }
    console.log('Login failed for email:', email);
    return null;
  }

  getCurrentUser(): User | null {
    if (!this.currentUserId) return null;
    const user = this.users.get(this.currentUserId);
    console.log('Getting current user:', user);
    return user || null;
  }

  updateUser(updates: Partial<User>): void {
    if (!this.currentUserId) return;
    
    const user = this.users.get(this.currentUserId);
    if (user) {
      const updatedUser = { ...user, ...updates };
      this.users.set(this.currentUserId, updatedUser);
      this.saveUsers();
      console.log('User updated and saved:', updatedUser);
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
      
      // Update streak logic - count consecutive days, not sessions
      this.updateUserStreak(user);
      
      // Update level based on coins
      this.updateUserLevel(user);
      
      this.users.set(this.currentUserId, user);
      this.saveUsers();
      console.log('Walking session added and user updated:', user);
    }
  }

  private updateUserStreak(user: User): void {
    if (user.walkingSessions.length === 0) {
      user.currentStreak = 0;
      return;
    }

    // Get unique days with sessions (sorted by date, most recent first)
    const sessionDays = user.walkingSessions
      .map(session => new Date(session.date).toDateString())
      .filter((date, index, array) => array.indexOf(date) === index) // Remove duplicates
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime()); // Sort newest first

    if (sessionDays.length === 0) {
      user.currentStreak = 0;
      return;
    }

    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
    
    let streak = 0;
    let expectedDate = new Date();
    
    // Start counting from today or yesterday
    if (sessionDays[0] === today) {
      expectedDate = new Date();
    } else if (sessionDays[0] === yesterday) {
      expectedDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
    } else {
      // No recent sessions, streak is 0
      user.currentStreak = 0;
      return;
    }

    // Count consecutive days
    for (const sessionDay of sessionDays) {
      const sessionDate = new Date(sessionDay);
      const expectedDateString = expectedDate.toDateString();
      
      if (sessionDay === expectedDateString) {
        streak++;
        // Move to previous day
        expectedDate = new Date(expectedDate.getTime() - 24 * 60 * 60 * 1000);
      } else {
        // Gap found, stop counting
        break;
      }
    }
    
    user.currentStreak = streak;
    console.log('Updated user streak:', streak, 'for user:', user.name);
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
    console.log('Logging out user:', this.currentUserId);
    this.currentUserId = null;
    localStorage.removeItem('app_current_user');
    // Don't remove other localStorage items as they contain user data
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
    console.log('All user data cleared');
  }
}

export const userManager = UserManager.getInstance();
