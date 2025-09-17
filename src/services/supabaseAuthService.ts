import { supabase } from '../../supabase.config';
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
  // Sign in with email and password
  static async signIn(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { user: null, error: error.message };
      }

      if (data.user) {
        // Ensure user profile exists in our users table
        await this.ensureUserProfile(data.user);
        // Return the user from the signIn response, not by calling getCurrentUser again
        // This avoids session issues that occur when calling getCurrentUser immediately after signIn
        return { user: this.mapAuthUserToUser(data.user), error: null };
      }

      return { user: null, error: 'No user data returned' };
    } catch (error) {
      return { user: null, error: error instanceof Error ? error.message : 'Unknown error' };
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
        return { user: this.mapAuthUserToUser(data.user), error: null };
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
        console.error('Session error:', error);
        return null;
      }

      return session;
    } catch (error) {
      console.error('Get session error:', error);
      return null;
    }
  }

  // Get current user
  static async getCurrentUser(): Promise<User | null> {
    try {
      // First check if we have a valid session
      const session = await this.getCurrentSession();
      if (!session) {
        console.log('No active session available');
        return null;
      }

      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error('Get user error:', error);
        // Try to get user directly from users table using session user ID
        if (session.user?.id) {
          const { data: userProfile, error: profileError } = await supabase
            .from('users')
            .select('*')
            .eq('uid', session.user.id)
            .single();

          if (!profileError && userProfile) {
            return {
              id: userProfile.uid,
              uid: userProfile.uid,
              email: userProfile.email,
              role: userProfile.role || 'member',
              memberNumber: userProfile.member_number,
              created_at: userProfile.created_at || new Date().toISOString(),
            };
          }
        }
        return null;
      }

      if (!user) return null;

      // Get user profile from our users table to get the correct role and member number
      const { data: userProfile, error: profileError } = await supabase
        .from('users')
        .select('role, member_number, created_at')
        .eq('uid', user.id)
        .single();

      if (profileError) {
        console.error('Get user profile error:', profileError);
        // Return basic user info if profile doesn't exist
        return this.mapAuthUserToUser(user);
      }

      return {
        id: user.id,
        uid: user.id,
        email: user.email!,
        role: userProfile?.role || 'member',
        memberNumber: userProfile?.member_number,
        created_at: userProfile?.created_at || new Date().toISOString(),
      };
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

      // Only include member_number if the column exists and value is provided
      if (memberNumber) {
        userProfile.member_number = memberNumber;
      }

      const { error } = await supabase
        .from('users')
        .insert(userProfile);

      if (error) {
        console.error('Create user profile error:', error);
        // If member_number column doesn't exist, try without it
        if (error.code === 'PGRST204' && error.message?.includes('member_number')) {
          delete userProfile.member_number;
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
      
      if (event === 'SIGNED_IN' && session?.user) {
        // Get user with correct role from database
        const user = await this.getCurrentUser();
        callback(user);
      } else if (event === 'SIGNED_OUT') {
        callback(null);
      } else if (event === 'INITIAL_SESSION' && session?.user) {
        // Handle initial session when app starts with existing auth
        const user = await this.getCurrentUser();
        callback(user);
      } else if (event === 'TOKEN_REFRESHED' && session?.user) {
        // Handle token refresh
        const user = await this.getCurrentUser();
        callback(user);
      }
    });
  }
}
