import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';

const PRODUCTION_HOST = 'wandersync-travel-1779355803.surge.sh';
const CUSTOM_SCHEME = 'triptogether:';

function closeTopLayer() {
  const selectors = [
    '.modal-overlay.active .modal-close',
    '.modal-overlay.active [data-modal-close]',
    '#chatView.active #chatBackButton',
    '#chat-view.active [data-chat-back]'
  ];
  for (const selector of selectors) {
    const button = document.querySelector(selector);
    if (button instanceof HTMLElement) {
      button.click();
      return true;
    }
  }
  return false;
}

function showDashboard() {
  const active = document.querySelector('.nav-tab-btn.active[data-target]');
  if (active?.getAttribute('data-target') === 'dashboard') return false;
  const dashboard = document.querySelector('.nav-tab-btn[data-target="dashboard"]');
  if (!(dashboard instanceof HTMLElement)) return false;
  dashboard.click();
  return true;
}

function getEmbeddedDestination(rawUrl) {
  try {
    const url = new URL(rawUrl);
    if ((url.protocol === 'https:' || url.protocol === 'http:') && url.hostname === PRODUCTION_HOST) {
      return `${url.pathname || '/'}${url.search}${url.hash}`;
    }
    if (url.protocol === CUSTOM_SCHEME) {
      const encodedUrl = url.searchParams.get('url');
      if (encodedUrl) return getEmbeddedDestination(decodeURIComponent(encodedUrl));
      return `/${url.search}${url.hash}`;
    }
  } catch (error) {
    console.warn('Ignored invalid native app URL.');
  }
  return '';
}

function openEmbeddedDestination(rawUrl) {
  const destination = getEmbeddedDestination(rawUrl);
  if (!destination) return;
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (current === destination) return;
  window.location.assign(destination);
}

async function initializeNativeShell() {
  if (!Capacitor.isNativePlatform()) return;
  document.documentElement.dataset.nativeApp = Capacitor.getPlatform();

  await Promise.allSettled([
    StatusBar.setOverlaysWebView({ overlay: false }),
    StatusBar.setStyle({ style: Style.Dark }),
    StatusBar.setBackgroundColor({ color: '#FFFFFF' }),
    SplashScreen.hide({ fadeOutDuration: 250 })
  ]);

  await App.addListener('appUrlOpen', event => openEmbeddedDestination(event.url));
  await App.addListener('backButton', event => {
    if (closeTopLayer() || showDashboard()) return;
    if (event.canGoBack) {
      window.history.back();
      return;
    }
    App.exitApp();
  });
  await App.addListener('appStateChange', ({ isActive }) => {
    document.documentElement.classList.toggle('native-app-paused', !isActive);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeNativeShell, { once: true });
} else {
  initializeNativeShell();
}
