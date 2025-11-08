const THEME_STORAGE_KEY = 'hazeAppTheme';

const DEFAULT_THEME = {
  id: 'default',
  name: 'Classique HazeApp',
  description: 'Palette claire par défaut',
  tone: 'light',
  accent: '#111111',
  image: '',
  buttons: 'default',
  buttonText: '#ffffff',
  logoColor: '#f5f0e6',
  logoRingColor: 'rgba(255, 255, 255, 0.5)',
  iconColor: '#ffffff',
  activeIcon: '#ffffff',
  activeBg: 'rgba(255, 255, 255, 0.15)',
  activeShadow: 'rgba(0, 0, 0, 0.25)',
  actionIcon: '#ffffff'
};

function getRoot() {
  return typeof document !== 'undefined' ? document.documentElement : null;
}

function normaliseTheme(theme = {}) {
  if (!theme || typeof theme !== 'object') return { ...DEFAULT_THEME };
  return {
    ...DEFAULT_THEME,
    ...theme
  };
}

export function getStoredTheme() {
  if (typeof window === 'undefined' || !('localStorage' in window)) return { ...DEFAULT_THEME };
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_THEME };
    const parsed = JSON.parse(raw);
    return normaliseTheme(parsed);
  } catch {
    return { ...DEFAULT_THEME };
  }
}

export function applyTheme(themeInput) {
  const theme = normaliseTheme(themeInput);
  const root = getRoot();
  const body = typeof document !== 'undefined' ? document.body : null;
  if (!root) return;

  const hasImage = Boolean(theme.image);
  const isLight = (theme.tone || 'light') === 'light';

  const wantsAccentButtons = theme.buttons === 'accent';
  const accentColor = theme.accent || '#ffffff';
  const fallbackButtonBg = isLight ? '#0f172a' : '#f8fafc';
  const fallbackButtonText = isLight ? '#ffffff' : '#020617';
  const accentButtonTextFallback = isLight ? '#ffffff' : '#020617';
  const buttonBg = wantsAccentButtons ? accentColor : fallbackButtonBg;
  const buttonText = theme.buttonText || (wantsAccentButtons ? accentButtonTextFallback : fallbackButtonText);
  const navIconColor = theme.iconColor || (isLight ? '#0f172a' : '#f8fafc');
  const actionIconColor = theme.actionIcon || accentColor;
  const navButtonBg = theme.navButtonBg || (isLight ? 'rgba(17, 17, 17, 0.9)' : 'rgba(5, 7, 18, 0.7)');
  const navButtonBorder = theme.navButtonBorder || (isLight ? 'transparent' : 'rgba(255, 255, 255, 0.12)');
  const navActiveBg = theme.activeBg || accentColor;
  const navActiveIcon = theme.activeIcon || buttonText;
  const navActiveShadow = theme.activeShadow || 'rgba(0, 0, 0, 0.3)';
  const logoBg = theme.logoColor || (isLight ? '#f5f0e6' : 'rgba(255, 255, 255, 0.05)');
  const logoRing = theme.logoRingColor || accentColor;

  root.style.setProperty('--app-bg-image', hasImage ? `url('${theme.image}')` : 'none');
  root.style.setProperty('--app-bg-color', isLight ? '#f5f0e6' : '#020617');
  root.style.setProperty('--app-overlay-color', isLight ? 'rgba(245, 240, 230, 0.86)' : 'rgba(2, 6, 23, 0.68)');
  root.style.setProperty('--app-text-color', isLight ? '#0f172a' : '#f8fafc');
  root.style.setProperty('--app-secondary-text', isLight ? 'rgba(15, 23, 42, 0.7)' : 'rgba(248, 250, 252, 0.78)');
  root.style.setProperty('--app-icon-color', navIconColor);
  root.style.setProperty('--app-accent-color', accentColor);
  root.style.setProperty('--nav-button-bg', navButtonBg);
  root.style.setProperty('--nav-icon-color', navIconColor);
  root.style.setProperty('--nav-button-border', navButtonBorder);
  root.style.setProperty('--logo-bg-color', logoBg);
  root.style.setProperty('--logo-ring-color', logoRing);
  root.style.setProperty('--button-bg', buttonBg);
  root.style.setProperty('--button-text', buttonText);
  root.style.setProperty('--action-icon-color', actionIconColor);
  root.style.setProperty('--nav-active-bg', navActiveBg);
  root.style.setProperty('--nav-active-icon', navActiveIcon);
  root.style.setProperty('--nav-active-shadow', navActiveShadow);
  root.style.setProperty('--button-glow', theme.buttonGlow || navActiveShadow);
  root.style.setProperty('--panel-bg', isLight ? 'rgba(255, 255, 255, 0.86)' : 'rgba(7, 10, 20, 0.82)');
  root.style.setProperty('--panel-border', isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.12)');
  root.style.setProperty('--panel-contrast', isLight ? '#0f172a' : '#f8fafc');
  root.style.setProperty('--panel-muted', isLight ? 'rgba(15, 23, 42, 0.6)' : 'rgba(248, 250, 252, 0.7)');

  if (body) {
    body.dataset.themeTone = theme.tone || 'light';
  }
}

export function saveTheme(themeInput) {
  const theme = normaliseTheme(themeInput);
  if (typeof window !== 'undefined' && 'localStorage' in window) {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
    } catch (error) {
      console.warn('Unable to persist theme selection.', error);
    }
  }

  applyTheme(theme);
  return theme;
}

export function initTheme() {
  applyTheme(getStoredTheme());

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (event) => {
      if (event.key === THEME_STORAGE_KEY) {
        applyTheme(getStoredTheme());
      }
    });
  }
}

export function getThemeStorageKey() {
  return THEME_STORAGE_KEY;
}
