import { SupabaseAuthService } from './src/services/supabaseAuthService.js';

async function checkUserRole() {
  try {
    const user = await SupabaseAuthService.getCurrentUser();
    console.log('Current user role:', user?.role || 'No user');
    console.log('Full user object:', JSON.stringify(user, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

checkUserRole();
