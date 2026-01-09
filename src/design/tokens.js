// Design System Colors & Typography
export const colors = {
  // Light mode
  light: {
    // Primary
    primary: '#667eea',
    primaryLight: '#f0f4ff',
    primaryDark: '#5568d3',

    // Semantic
    success: '#10b981',
    successLight: '#ecfdf5',
    warning: '#f59e0b',
    warningLight: '#fffbeb',
    danger: '#ef4444',
    dangerLight: '#fef2f2',

    // Neutral
    bg: '#ffffff',
    bgSecondary: '#f9fafb',
    surface: '#f3f4f6',
    border: '#e5e7eb',
    text: '#1f2937',
    textSecondary: '#6b7280',
    textTertiary: '#9ca3af',
    
    // Overlay
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(0, 0, 0, 0.05)',
  },

  // Dark mode
  dark: {
    // Primary
    primary: '#818cf8',
    primaryLight: '#4c1d95',
    primaryDark: '#c4b5fd',

    // Semantic
    success: '#34d399',
    successLight: '#064e3b',
    warning: '#fbbf24',
    warningLight: '#5a3a1a',
    danger: '#f87171',
    dangerLight: '#7c2d12',

    // Neutral
    bg: '#0f172a',
    bgSecondary: '#1e293b',
    surface: '#334155',
    border: '#475569',
    text: '#f1f5f9',
    textSecondary: '#cbd5e1',
    textTertiary: '#94a3b8',
    
    // Overlay
    overlay: 'rgba(0, 0, 0, 0.7)',
    overlayLight: 'rgba(255, 255, 255, 0.05)',
  },
};

export const typography = {
  // Headlines
  h1: {
    fontSize: '32px',
    fontWeight: 700,
    lineHeight: '40px',
    letterSpacing: '-0.5px',
  },
  h2: {
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: '32px',
    letterSpacing: '-0.3px',
  },
  h3: {
    fontSize: '20px',
    fontWeight: 600,
    lineHeight: '28px',
  },

  // Body
  body: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
  },
  bodySmall: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
  },
  bodySemibold: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '24px',
  },

  // Labels
  label: {
    fontSize: '13px',
    fontWeight: 600,
    lineHeight: '18px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
};

export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
};

export const radius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
};

export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
};
