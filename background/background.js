import { initTheme, getStoredTheme, saveTheme, applyTheme } from '../theme.js?v=1';

initTheme();

const cards = Array.from(document.querySelectorAll('[data-theme-card]'));
const preview = document.querySelector('[data-preview]');
const previewTitle = document.querySelector('[data-preview-title]');
const previewDescription = document.querySelector('[data-preview-description]');
const previewChip = document.querySelector('[data-preview-chip]');
const applyButton = document.querySelector('[data-apply-theme]');
const applyStatus = document.querySelector('[data-apply-status]');

let appliedTheme = getStoredTheme();
let pendingTheme = appliedTheme;
let feedbackTimeout;

const getThemeFromCard = (card) => ({
  id: card.dataset.themeId || '',
  name: card.dataset.name || 'Theme personnalise',
  description: card.dataset.description || '',
  tone: card.dataset.tone || 'dark',
  accent: card.dataset.accent || '#ffffff',
  image: card.dataset.image || '',
  buttons: card.dataset.buttons || 'default',
  buttonText: card.dataset.buttonText || '',
  logoColor: card.dataset.logo || '',
  logoRingColor: card.dataset.logoRing || '',
  iconColor: card.dataset.icons || '',
  activeIcon: card.dataset.activeIcon || '',
  activeBg: card.dataset.activeBg || '',
  activeShadow: card.dataset.activeShadow || '',
  actionIcon: card.dataset.actionIcon || ''
});

function setActiveCard(card) {
  cards.forEach((btn) => btn.classList.toggle('theme-card--active', btn === card));
}

function setPreview(theme) {
  if (!theme || !preview) return;
  preview.style.setProperty('--preview-image', `url('${theme.image}')`);
  preview.style.setProperty('--preview-accent', theme.accent);
  preview.dataset.tone = theme.tone;
  if (previewTitle) previewTitle.textContent = theme.name;
  if (previewDescription) previewDescription.textContent = theme.description;
}

function updateApplyUI({ applied = false } = {}) {
  if (!applyButton || !applyStatus) return;

  const sameTheme = Boolean(pendingTheme?.id && appliedTheme?.id === pendingTheme.id);
  applyButton.disabled = sameTheme || !pendingTheme;

  if (sameTheme) {
    applyStatus.textContent = 'Theme actuel';
    if (previewChip) previewChip.textContent = 'Theme actuel';
  } else if (applied) {
    applyStatus.textContent = 'Theme applique !';
    if (previewChip) previewChip.textContent = 'Applique !';
  } else {
    applyStatus.textContent = 'Clique sur appliquer pour valider.';
    if (previewChip) previewChip.textContent = 'Previsualisation';
  }

  clearTimeout(feedbackTimeout);
  if (!sameTheme && !applied) {
    feedbackTimeout = setTimeout(() => {
      if (applyStatus.textContent === 'Clique sur appliquer pour valider.') return;
      applyStatus.textContent = 'Clique sur appliquer pour valider.';
    }, 2800);
  }
}

function previewTheme(theme, card) {
  pendingTheme = theme;
  setPreview(theme);
  applyTheme(theme);
  if (card) {
    setActiveCard(card);
  }
  updateApplyUI();
}

cards.forEach((card) => {
  card.addEventListener('click', () => {
    previewTheme(getThemeFromCard(card), card);
  });
});

applyButton?.addEventListener('click', () => {
  if (!pendingTheme) return;
  appliedTheme = saveTheme(pendingTheme);
  updateApplyUI({ applied: true });
  setTimeout(() => updateApplyUI(), 1600);
});

if (cards.length) {
  const stored = getStoredTheme();
  appliedTheme = stored;
  const matchingCard = cards.find((card) => card.dataset.themeId === stored?.id);
  const initialTheme = matchingCard ? stored : getThemeFromCard(cards[0]);
  previewTheme(initialTheme, matchingCard ?? cards[0]);
}
