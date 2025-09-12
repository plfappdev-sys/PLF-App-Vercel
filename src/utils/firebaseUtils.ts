// Utility functions for Firebase initialization and error handling

/**
 * Checks if Firebase auth is properly initialized and available
 */
export const isFirebaseAuthAvailable = (auth: any): boolean => {
  return auth && 
         typeof auth.signInWithEmailAndPassword === 'function' &&
         typeof auth.createUserWithEmailAndPassword === 'function' &&
         typeof auth.signOut === 'function' &&
         typeof auth.onAuthStateChanged === 'function';
};

/**
 * Safe wrapper for Firebase auth operations
 */
export const withFirebaseAuthCheck = async <T>(
  auth: any, 
  operation: () => Promise<T>,
  fallbackMessage = 'Firebase authentication is not available. Please check your internet connection.'
): Promise<T> => {
  if (!isFirebaseAuthAvailable(auth)) {
    throw new Error(fallbackMessage);
  }
  
  return operation();
};

/**
 * Safe wrapper for Firebase operations with fallback
 */
export const safeFirebaseOperation = async <T>(
  operation: () => Promise<T>,
  fallback: () => T,
  errorMessage = 'Firebase operation failed'
): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    console.warn(`${errorMessage}:`, error);
    return fallback();
  }
};
