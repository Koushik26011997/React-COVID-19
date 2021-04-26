import React from 'react';
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
import StateDetails from '../screens/StateDetails';
import Worldmeter from '../screens/Worldmeter';
import Vaccine from '../screens/Vaccine';
import Resources from '../screens/Resources';

const MainStack = createStackNavigator();

const MainStackNav = ({navigation}) => {
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
    headerTitle: 'COVID-19 Tracker',
    headerTintColor: 'white',
    headerTitleStyle: {
      color: 'white',
      fontSize: 16,
      fontFamily: 'LatoRegular',
    },
    headerTitleContainerStyle: {
      left: 52,
    },
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
            headerTitle: 'FAQ',
          }}
        />

        <MainStack.Screen
          name="Lockdown"
          component={Lockdown}
          options={{
            ...options,
            headerTitle: 'Lockdown Protocols',
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
            headerTitle: 'COVID-19 News',
          }}
        />

        <MainStack.Screen
          name="Worldmeter"
          component={Worldmeter}
          options={{
            ...options,
            headerTitle: 'World Meter',
          }}
        />

        <MainStack.Screen
          name="Resources"
          component={Resources}
          options={{
            ...options,
            headerTitle: 'Resources',
          }}
        />

        <MainStack.Screen
          name="Vaccine"
          component={Vaccine}
          options={{
            ...options,
            headerTitle: 'COWIN Vaccine',
          }}
        />
      </MainStack.Navigator>

      <FlashMessage position="top"></FlashMessage>
    </>
  );
};

export default MainStackNav;
