import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { ENVIRONMENT } from './config';

export const i18nInit = i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		backend: {
			loadPath: '/translations/{{lng}}/{{ns}}.json',
			queryStringParams: { v: ENVIRONMENT.APP_VERSION },
		},
		fallbackLng: 'en',
		defaultNS: 'global',
		ns: ['global'],
		load: 'languageOnly',
		cache: {
			enabled: true,
		},
		debug: true,
		interpolation: { escapeValue: false },
		react: { useSuspense: true },
		partialBundledLanguages: true,
	});

export default i18n;
