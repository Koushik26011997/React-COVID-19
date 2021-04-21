import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import NoInternet from './screens/NoInternet';
import RootDrawerNav from './navigations/RootDrawerNav';
import SplashScreen from 'react-native-splash-screen';
import { AuthContext } from './service/context';
import AsyncStorage from '@react-native-async-storage/async-storage';


const App = () => {
  const [darkTheme, setDarkTheme] = useState('');
  const authContext = React.useMemo(() => ({
    toggleTheme: () => {
      darkTheme === '' ? setDarkTheme('darkTheme') : setDarkTheme('');
      darkTheme === '' ? storeData('darkTheme') : storeData('');
    }
  }))

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('IsDarkTheme', value)
    } catch (e) {
      console.log("Error to save data");
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('IsDarkTheme')
      if (value !== null) {
        setDarkTheme(value);
      }
    } catch (e) {
      console.log("Error to get data");
    }
  }

  useEffect(() => {
    SplashScreen.hide();
    getData();
  })


  const netInfo = useNetInfo();

  const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#6e7175',
      background: '#161625',
      text: '#FFFFFF',
      card: '#5a5c5a',
    },
    custom: {
      confirm: '#f55656',
      death: '#0d0d0d',
      answer: '#28a745',
      header: '#5a5c5a',
    }
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
    }
  };

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={darkTheme !== '' ? CustomDarkTheme : CustomDefaultTheme}>
        <StatusBar translucent={true} backgroundColor="#0C1C46" />
        {
          netInfo.isConnected ? <RootDrawerNav /> : <NoInternet />
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
  }
});

export default App;
