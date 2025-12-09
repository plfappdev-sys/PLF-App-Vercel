import { supabase } from '../config/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';

export interface User {
  id: string;
  uid: string;
  email: string;
  role: string;
  memberNumber?: string;
  created_at: string;
}

export interface AuthSession {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at?: number;
  refresh_token: string;
  user: SupabaseUser;
}

export class SupabaseAuthService {
  // Helper function to add timeout to any promise
  private static async withTimeout<T>(promise: Promise<T>, timeoutMs: number = 8000): Promise<T> {
    const timeoutPromise = new Promise<T>((_, reject) => {
      setTimeout(() => reject(new Error(`Operation timed out after ${timeoutMs}ms`)), timeoutMs);
    });
    return Promise.race([promise, timeoutPromise]);
  }

  // Sign in with email and password
  static async signIn(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    try {
      const { data, error } = await this.withTimeout(
        supabase.auth.signInWithPassword({
          email,
          password,
        }),
        10000 // 10 second timeout for login
      );

      if (error) {
        return { user: null, error: error.message };
      }

      if (data.user) {
        // Ensure user profile exists in our users table (with timeout)
        await this.ensureUserProfile(data.user).catch(err => {
          console.warn('Warning: ensureUserProfile failed:', err.message);
          // Continue even if profile creation fails
        });
        
        // Get the full user profile with correct role from database (with timeout)
        const currentUser = await this.getCurrentUser().catch(err => {
          console.warn('Warning: getCurrentUser failed after login:', err.message);
          // Return basic user info if we can't get full profile
          return {
            id: data.user.id,
            uid: data.user.id,
            email: data.user.email!,
            role: 'member',
            created_at: new Date().toISOString(),
          } as User;
        });
        
        return { user: currentUser, error: null };
      }

      return { user: null, error: 'No user data returned' };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Sign in error:', errorMessage);
      return { user: null, error: errorMessage };
    }
  }

  // Sign up new user
  static async signUp(email: string, password: string, memberNumber?: string): Promise<{ user: User | null; error: string | null }> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return { user: null, error: error.message };
      }

      if (data.user) {
        // Create user profile in our users table
        await this.createUserProfile(data.user, memberNumber);
        // Get the full user profile with correct role from database
        const currentUser = await this.getCurrentUser();
        return { user: currentUser, error: null };
      }

      return { user: null, error: 'No user data returned' };
    } catch (error) {
      return { user: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Sign out
  static async signOut(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      return { error: error ? error.message : null };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Get current session
  static async getCurrentSession(): Promise<AuthSession | null> {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        return null;
      }

      return session;
    } catch (error) {
      return null;
    }
  }

  // Get current user
  static async getCurrentUser(): Promise<User | null> {
    try {
      // First check if we have a valid session (with timeout)
      const session = await this.withTimeout(this.getCurrentSession(), 5000);
      if (!session) {
        return null;
      }

      const { data: { user }, error } = await this.withTimeout(
        supabase.auth.getUser(),
        5000
      );
      
      if (error) {
        // Try to get user directly from users table using session user ID (with timeout)
        if (session.user?.id) {
          try {
            const queryPromise = Promise.resolve(supabase
              .from('users')
              .select('*')
              .eq('uid', session.user.id)
              .single()
              .then(({ data: userProfile, error: profileError }) => ({ userProfile, profileError })));
            
            const { userProfile, profileError } = await this.withTimeout(queryPromise, 5000);

            if (!profileError && userProfile) {
              return {
                id: userProfile.uid,
                uid: userProfile.uid,
                email: userProfile.email,
                role: userProfile.role || 'member',
                memberNumber: userProfile.membernumber,
                created_at: userProfile.created_at || new Date().toISOString(),
              };
            }
          } catch (profileError) {
            console.warn('Profile fetch failed:', profileError);
          }
        }
        return null;
      }

      if (!user) return null;

      // Get user profile from our users table to get the correct role and member number (with timeout)
      try {
        const queryPromise = Promise.resolve(supabase
          .from('users')
          .select('role, membernumber, created_at')
          .eq('uid', user.id)
          .single()
          .then(({ data: userProfile, error: profileError }) => ({ userProfile, profileError })));
        
        const { userProfile, profileError } = await this.withTimeout(queryPromise, 5000);

        if (profileError) {
          // Return basic user info if profile doesn't exist
          return this.mapAuthUserToUser(user);
        }

        return {
          id: user.id,
          uid: user.id,
          email: user.email!,
          role: userProfile?.role || 'member',
          memberNumber: userProfile?.membernumber,
          created_at: userProfile?.created_at || new Date().toISOString(),
        };
      } catch (profileError) {
        console.warn('User profile fetch timed out, returning basic user info');
        return this.mapAuthUserToUser(user);
      }
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  }

  // Verify member number availability
  static async verifyMemberNumber(memberNumber: string): Promise<boolean> {
    try {
      // Check if member number exists in members table
      const { data, error } = await supabase
        .from('members')
        .select('member_number')
        .eq('member_number', memberNumber)
        .single();

      if (error) {
        // If no member found, it's available
        if (error.code === 'PGRST116') {
          return true;
        }
        console.error('Member verification error:', error);
        return false;
      }

      // Member number exists
      return false;
    } catch (error) {
      console.error('Member verification error:', error);
      return false;
    }
  }

  // Ensure user profile exists
  private static async ensureUserProfile(authUser: any): Promise<void> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('uid', authUser.id)
        .single();

      if (error && error.code === 'PGRST116') {
        // User doesn't exist, create profile
        await this.createUserProfile(authUser);
      }
    } catch (error) {
      console.error('Ensure user profile error:', error);
    }
  }

  // Create user profile
  private static async createUserProfile(authUser: any, memberNumber?: string): Promise<void> {
    try {
      const userProfile: any = {
        uid: authUser.id,
        email: authUser.email,
        role: 'member', // Default role
      };

      // Only include membernumber if the column exists and value is provided
      if (memberNumber) {
        userProfile.membernumber = memberNumber;
      }

      const { error } = await supabase
        .from('users')
        .insert(userProfile);

      if (error) {
        console.error('Create user profile error:', error);
        // If membernumber column doesn't exist, try without it
        if (error.code === 'PGRST204' && error.message?.includes('membernumber')) {
          delete userProfile.membernumber;
          const { error: retryError } = await supabase
            .from('users')
            .insert(userProfile);
          
          if (retryError) {
            console.error('Retry create user profile error:', retryError);
          }
        }
      }
    } catch (error) {
      console.error('Create user profile error:', error);
    }
  }

  // Map Supabase auth user to our User interface
  private static mapAuthUserToUser(authUser: any): User {
    return {
      id: authUser.id,
      uid: authUser.id,
      email: authUser.email!,
      role: 'member', // Default role, will be updated when fetching from users table
      created_at: new Date().toISOString(),
    };
  }

  // Listen for auth state changes
  static onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      
      try {
        if (event === 'SIGNED_IN' && session?.user) {
          // Get user with correct role from database
          const user = await this.getCurrentUser();
          callback(user);
        } else if (event === 'SIGNED_OUT') {
          // Immediately set user to null on sign out
          console.log('User signed out, setting user to null');
          callback(null);
        } else if (event === 'INITIAL_SESSION' && session?.user) {
          // Handle initial session when app starts with existing auth
          const user = await this.getCurrentUser();
          callback(user);
        } else if (event === 'TOKEN_REFRESHED' && session?.user) {
          // Handle token refresh
          const user = await this.getCurrentUser();
          callback(user);
        } else if (event === 'USER_UPDATED' && session?.user) {
          // Handle user updates
          const user = await this.getCurrentUser();
          callback(user);
        }
      } catch (error) {
        console.error('Error in auth state change handler:', error);
        // If there's an error, still try to update the callback
        if (event === 'SIGNED_OUT') {
          callback(null);
        }
      }
    });
  }
}
