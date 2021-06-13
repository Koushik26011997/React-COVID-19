import React, {useRef, useEffect, useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNav from './BottomTavNav';
import {TouchableOpacity, View} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {normalizeSize} from '../utility/MyUtility';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAQ from '../screens/FAQ';
import Lockdown from '../screens/Lockdown';
import Update from '../screens/Update';
import News from '../screens/News';
import Worldmeter from '../screens/Worldmeter';
import Vaccine from '../screens/Vaccine';
import Resources from '../screens/Resources';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import {AuthContext} from '../service/context';
import {LocalizationContext} from '../common/Translations';
import {Settings} from '../screens/Settings';

const MainStack = createStackNavigator();

const MainStackNav = ({navigation}) => {
  const {viewContext} = React.useContext(AuthContext);

  //
  const {
    translations,
    appLanguage,
    setAppLanguage,
    initializeAppLanguage,
  } = useContext(LocalizationContext); // 1
  initializeAppLanguage(); // 2

  const options = {
    headerStyle: {
      backgroundColor: '#0C1C46',
      shadowColor: '#000',
      height: normalizeSize(58, 42, 54),
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.75,
      elevation: 3,
    },
    headerForceInset: {top: 'never', bottom: 'never'},
    stackAnimation: 'fade',
    headerTopInsetEnabled: false,
    headerTitle: translations['COVID-19 Tracker'],
    headerTintColor: 'white',
    headerTitleStyle: {
      color: 'white',
      fontSize: 17,
      fontFamily: 'LatoBold',
    },
    headerTitleContainerStyle: {
      left: 52,
    },
    headerRight: () => {
      return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => captureAndShareScreenshot()}>
            <Icon
              color="white"
              name="share-circle"
              size={24}
              style={{marginRight: 12}}
            />
          </TouchableOpacity>
        </View>
      );
    },
  };

  const captureAndShareScreenshot = () => {
    try {
      viewContext.current.capture().then(uri => {
        RNFS.readFile(uri, 'base64').then(res => {
          let urlString = 'data:image/jpeg;base64,' + res;
          let options = {
            message: 'COVID-19 Tracker',
            url: urlString,
            type: 'image/jpeg',
          };
          Share.open(options)
            .then(res => {
              // console.log(res);
            })
            .catch(err => {
              // err && console.log(err);
            });
        });
      });
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <>
      <MainStack.Navigator>
        <MainStack.Screen
          name="BottomTabNav"
          component={BottomTabNav}
          options={({route}) => ({
            ...options,
            headerLeft: () => {
              return (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Icon
                      size={28}
                      color="white"
                      name="menu"
                      style={{marginStart: 12}}
                    />
                  </TouchableOpacity>
                </View>
              );
            },
          })}
        />

        <MainStack.Screen
          name="FAQ"
          component={FAQ}
          options={{
            ...options,
            headerTitle: translations['FAQ'],
          }}
        />

        <MainStack.Screen
          name="Lockdown"
          component={Lockdown}
          options={{
            ...options,
            headerTitle: translations['Lockdown Protocols'],
          }}
        />

        <MainStack.Screen
          name="Update"
          component={Update}
          options={{
            ...options,
            headerTitle: 'Current Updates',
          }}
        />

        <MainStack.Screen
          name="News"
          component={News}
          options={{
            ...options,
            headerTitle: translations['COVID-19 News'],
          }}
        />

        <MainStack.Screen
          name="Worldmeter"
          component={Worldmeter}
          options={{
            ...options,
            headerTitle: translations['World Meter'],
          }}
        />

        <MainStack.Screen
          name="Resources"
          component={Resources}
          options={{
            ...options,
            headerTitle: translations['Resources'],
          }}
        />

        {/* <MainStack.Screen
          name="Vaccine"
          component={Vaccine}
          options={{
            ...options,
            headerTitle: translations['COWIN Vaccination'],
          }}
        /> */}

        <MainStack.Screen
          name="Settings"
          component={Settings}
          options={{
            ...options,
            headerTitle: translations['Settings'],
          }}
        />
      </MainStack.Navigator>

      <FlashMessage position="top"></FlashMessage>
    </>
  );
};

export default MainStackNav;
