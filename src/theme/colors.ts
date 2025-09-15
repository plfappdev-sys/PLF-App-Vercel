// PLF Brand Colors
export const PLFColors = {
  // Primary Colors
  primaryGreen: '#228B22', // Forest Green
  primaryGold: '#B8860B',  // Dark Goldenrod
  primaryBeige: '#F5F5DC', // Beige
  
  // Secondary Colors
  secondaryDarkGreen: '#006400', // Dark Green
  secondaryLightGold: '#DAA520', // Goldenrod
  secondaryCream: '#FFF8DC',     // Cornsilk
  
  // Neutral Colors
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  mediumGray: '#E0E0E0',
  darkGray: '#666666',
  black: '#000000',
  
  // Status Colors
  success: '#28A745',
  warning: '#FFC107',
  error: '#DC3545',
  info: '#17A2B8'
};

// Theme configuration
export const PLFTheme = {
  colors: PLFColors,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold' as const,
      color: PLFColors.primaryGold
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold' as const,
      color: PLFColors.primaryGold
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as const,
      color: PLFColors.primaryGold
    },
    body: {
      fontSize: 16,
      color: PLFColors.darkGray
    },
    caption: {
      fontSize: 14,
      color: PLFColors.darkGray
    },
    button: {
      fontSize: 16,
      fontWeight: '600' as const,
      color: PLFColors.white
    }
  }
};
