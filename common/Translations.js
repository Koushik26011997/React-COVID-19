import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState } from 'react';
import LocalizedStrings from 'react-native-localization'; // 2
import * as RNLocalize from 'react-native-localize'; // 3
import en from '../localization/en.json';
import bn from '../localization/bn.json';
import hn from '../localization/hn.json';

const DEFAULT_LANGUAGE = 'en';
const APP_LANGUAGE = 'appLanguage';

const languages = { bn, en, hn };

const translations = new LocalizedStrings(languages); // 4

export const LocalizationContext = createContext({
  // 5
  translations,
  setAppLanguage: () => { }, // 6
  appLanguage: DEFAULT_LANGUAGE, // 7
  initializeAppLanguage: () => { }, // 8
});

export const LocalizationProvider = ({ children }) => {
  // 9
  const [appLanguage, setAppLanguage] = useState(DEFAULT_LANGUAGE);

  // 11
  const setLanguage = async language => {
    try {
      translations.setLanguage(language);
      setAppLanguage(language);
      // console.log('setAppLanguage', language);
      await AsyncStorage.setItem(APP_LANGUAGE, language);
    } catch (e) {
      // console.log('Error: ', e);
    }
  };

  // 12
  const initializeAppLanguage = async () => {
    const currentLanguage = await AsyncStorage.getItem(APP_LANGUAGE);
    // console.log('currentLanguage', currentLanguage);
    if (currentLanguage) {
      setLanguage(currentLanguage);
    } else {
      let localeCode = DEFAULT_LANGUAGE;
      const supportedLocaleCodes = translations.getAvailableLanguages();
      const phoneLocaleCodes = RNLocalize.getLocales().map(
        locale => locale.languageCode,
      );
      phoneLocaleCodes.some(code => {
        if (supportedLocaleCodes.includes(code)) {
          localeCode = code;
          return true;
        }
      });
      setLanguage(localeCode);
    }
  };

  return (
    <LocalizationContext.Provider
      value={{
        translations,
        setAppLanguage: setLanguage, // 10
        appLanguage,
        initializeAppLanguage,
      }}>
      {children}
    </LocalizationContext.Provider>
  );
};
