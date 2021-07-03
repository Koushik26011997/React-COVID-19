import 'react-native-gesture-handler';
import React, { useEffect, useState, useRef } from 'react';
import { LogBox, StatusBar } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import NoInternet from './screens/NoInternet';
import RootDrawerNav from './navigations/RootDrawerNav';
import SplashScreen from 'react-native-splash-screen';
import { AuthContext } from './service/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalizationProvider } from './common/Translations';
import TipProvider from 'react-native-tip';

const App = () => {
  const viewShot = useRef();
  const [darkTheme, setDarkTheme] = useState('');
  const authContext = React.useMemo(() => ({
    toggleTheme: () => {
      darkTheme === '' ? setDarkTheme('darkTheme') : setDarkTheme('');
      darkTheme === '' ? storeData('darkTheme') : storeData('');
    },
    viewContext: viewShot,
  }));

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('IsDarkTheme', value);
    } catch (e) {
      console.log('Error to save data');
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('IsDarkTheme');
      if (value !== null) {
        setDarkTheme(value);
      }
    } catch (e) {
      console.log('Error to get data');
    }
  };

  useEffect(() => {
    SplashScreen.hide();
    getData();
    LogBox.ignoreAllLogs();
  });

  const netInfo = useNetInfo();

  const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#6e7175',
      // background: '#161625',
      background: '#22303C',
      text: '#FFFFFF',
      // card: '#5a5c5a',
      card: '#15202B',
    },
    custom: {
      confirm: '#f55656',
      // death: '#0d0d0d',
      death: 'gray',
      answer: '#28a745',
      header: '#5a5c5a',
    },
  };

  const CustomDefaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#6e7175',
      background: '#F1F1F1',
      text: '#000000',
      card: '#FFFFFF',
    },
    custom: {
      confirm: '#dc3545',
      death: '#6c757d',
      answer: '#007BFF',
      header: '#FFFFFF',
    },
  };

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer
        theme={darkTheme !== '' ? CustomDarkTheme : CustomDefaultTheme}>
        <LocalizationProvider>
          <StatusBar translucent={true} backgroundColor="#0C1C46" />
          {netInfo.isConnected ? <RootDrawerNav /> : <NoInternet />}
        </LocalizationProvider>
      </NavigationContainer>
      <TipProvider darkMode={darkTheme === 'darkTheme'} />
    </AuthContext.Provider>
  );
};
// https://api.covid19india.org/locales/locale_bengali.json
export default App;
