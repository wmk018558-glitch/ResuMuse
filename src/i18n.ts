import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonZh from './locales/zh-CN/common.json';
import landingZh from './locales/zh-CN/landing.json';
import headerZh from './locales/zh-CN/header.json';
import footerZh from './locales/zh-CN/footer.json';
import sidebarZh from './locales/zh-CN/sidebar.json';
import uploadZh from './locales/zh-CN/upload.json';
import chatZh from './locales/zh-CN/chat.json';

import commonEn from './locales/en-US/common.json';
import landingEn from './locales/en-US/landing.json';
import headerEn from './locales/en-US/header.json';
import footerEn from './locales/en-US/footer.json';
import sidebarEn from './locales/en-US/sidebar.json';
import uploadEn from './locales/en-US/upload.json';
import chatEn from './locales/en-US/chat.json';

const savedLang = typeof window !== 'undefined'
  ? localStorage.getItem('i18nextLng')
  : null;

void i18n.use(initReactI18next).init({
  resources: {
    'zh-CN': {
      common: commonZh,
      landing: landingZh,
      header: headerZh,
      footer: footerZh,
      sidebar: sidebarZh,
      upload: uploadZh,
      chat: chatZh,
    },
    'en-US': {
      common: commonEn,
      landing: landingEn,
      header: headerEn,
      footer: footerEn,
      sidebar: sidebarEn,
      upload: uploadEn,
      chat: chatEn,
    },
  },
  ns: ['common', 'landing', 'header', 'footer', 'sidebar', 'upload', 'chat'],
  defaultNS: 'common',
  lng: savedLang || 'zh-CN',
  fallbackLng: 'zh-CN',
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;
