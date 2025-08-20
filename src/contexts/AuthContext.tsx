import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  employmentStatus: string;
  employer?: string;
  jobTitle?: string;
  annualIncome: string;
  creditScore: string;
  bankingRelationship?: string;
  profileComplete: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  requires2FA: boolean;
  pendingUser: { email: string; password: string } | null;
  login: (email: string, password: string) => Promise<{ success: boolean; requires2FA?: boolean }>;
  verify2FA: (code: string) => Promise<boolean>;
  signup: (userData: any) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profileData: Partial<User>) => void;
  toggle2FA: (enabled: boolean) => void;
  clearPendingAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [requires2FA, setRequires2FA] = useState(false);
  const [pendingUser, setPendingUser] = useState<{ email: string; password: string } | null>(null);

  // Initialize demo users
  useEffect(() => {
    const initializeDemoUsers = () => {
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if demo users already exist
      const demoUserExists = existingUsers.find((u: any) => u.email === 'demo@example.com');
      const demo2FAUserExists = existingUsers.find((u: any) => u.email === 'user2fa@example.com');
      
      if (!demoUserExists || !demo2FAUserExists) {
        const demoUsers = [];
        
        if (!demoUserExists) {
          demoUsers.push({
            id: "demo1",
            email: "demo@example.com",
            password: "demo123",
            firstName: "Demo",
            lastName: "User",
            phone: "(555) 123-4567",
            dateOfBirth: "1990-01-01",
            address: "123 Demo Street",
            city: "Demo City",
            state: "CA",
            zipCode: "90210",
            employmentStatus: "employed",
            employer: "Demo Company",
            jobTitle: "Software Engineer",
            annualIncome: "75k-100k",
            creditScore: "very-good",
            bankingRelationship: "chase",
            profileComplete: true,
            twoFactorEnabled: false,
            createdAt: "2024-01-01T00:00:00.000Z"
          });
        }
        
        if (!demo2FAUserExists) {
          demoUsers.push({
            id: "demo2",
            email: "user2fa@example.com",
            password: "password123",
            firstName: "Sarah",
            lastName: "Johnson",
            phone: "(555) 987-6543",
            dateOfBirth: "1985-05-15",
            address: "456 Security Avenue",
            city: "Secure City",
            state: "NY",
            zipCode: "10001",
            employmentStatus: "employed",
            employer: "Tech Security Corp",
            jobTitle: "Security Analyst",
            annualIncome: "100k-150k",
            creditScore: "excellent",
            bankingRelationship: "bofa",
            profileComplete: true,
            twoFactorEnabled: true,
            createdAt: "2024-02-01T00:00:00.000Z"
          });
        }
        
        const updatedUsers = [...existingUsers, ...demoUsers];
        localStorage.setItem('users', JSON.stringify(updatedUsers));
      }
    };

    initializeDemoUsers();
  }, []);

  // Check for existing session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<{ success: boolean; requires2FA?: boolean }> => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists in localStorage (simulate backend check)
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find((u: any) => u.email === email);
      
      if (existingUser && existingUser.password === password) {
        // Check if user has 2FA enabled
        if (existingUser.twoFactorEnabled) {
          setPendingUser({ email, password });
          setRequires2FA(true);
          return { success: true, requires2FA: true };
        } else {
          // Direct login for users without 2FA
          const { password: _, ...userWithoutPassword } = existingUser;
          setUser(userWithoutPassword);
          return { success: true, requires2FA: false };
        }
      }
      
      return { success: false };
    } catch (error) {
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const verify2FA = async (code: string): Promise<boolean> => {
    if (!pendingUser) return false;
    
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any 6-digit code or "123456"
      if (code === "123456" || /^\d{6}$/.test(code)) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const existingUser = users.find((u: any) => u.email === pendingUser.email);
        
        if (existingUser) {
          const { password: _, ...userWithoutPassword } = existingUser;
          setUser(userWithoutPassword);
          setPendingUser(null);
          setRequires2FA(false);
          return true;
        }
      }
      
      return false;
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: any): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find((u: any) => u.email === userData.email);
      
      if (existingUser) {
        return false; // User already exists
      }
      
      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        dateOfBirth: userData.dateOfBirth,
        address: userData.address,
        city: userData.city,
        state: userData.state,
        zipCode: userData.zipCode,
        employmentStatus: userData.employmentStatus,
        employer: userData.employer,
        jobTitle: userData.jobTitle,
        annualIncome: userData.annualIncome,
        creditScore: userData.creditScore,
        bankingRelationship: userData.bankingRelationship,
        profileComplete: true, // Since they filled out the full form
        twoFactorEnabled: false, // Default to disabled for new users
        createdAt: new Date().toISOString()
      };
      
      // Save to users array (simulate database)
      const updatedUsers = [...users, { ...newUser, password: userData.password }];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      // Set as current user
      setUser(newUser);
      
      return true;
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setPendingUser(null);
    setRequires2FA(false);
  };

  const clearPendingAuth = () => {
    setPendingUser(null);
    setRequires2FA(false);
  };

  const updateProfile = (profileData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      
      // Update in users array
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map((u: any) => 
        u.email === user.email ? { ...u, ...profileData } : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
  };

  const toggle2FA = (enabled: boolean) => {
    if (user) {
      const updatedUser = { ...user, twoFactorEnabled: enabled };
      setUser(updatedUser);
      
      // Update in users array
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map((u: any) => 
        u.email === user.email ? { ...u, twoFactorEnabled: enabled } : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    requires2FA,
    pendingUser,
    login,
    verify2FA,
    signup,
    logout,
    updateProfile,
    toggle2FA,
    clearPendingAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}