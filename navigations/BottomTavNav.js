import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import About from '../screens/About';
import Home from '../screens/Home';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Datewise from '../screens/Datewise';
import Districtwise from '../screens/Districtwise';
import Chart from '../screens/Chart';
import { BASE_URL, TAB_BAR_ICON_SIZE } from '../Constant';
import Vaccine from '../screens/Vaccine';
import Update from '../screens/Update';
import { LocalizationContext } from '../common/Translations';

const BottomTab = createMaterialBottomTabNavigator();

const BottomTabNav = ({ navigation }) => {
  //
  const {
    translations,
    appLanguage,
    setAppLanguage,
    initializeAppLanguage,
  } = useContext(LocalizationContext); // 1
  initializeAppLanguage(); // 2

  return (
    <BottomTab.Navigator
      screenOptions={{ tabBarColor: '#0C1C46' }}
      initialRouteName={Home}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: translations['Home'],
          tabBarColor: '#0C1C46',
          tabBarIcon: ({ color }) => (
            <TouchableOpacity>
              <Icon size={TAB_BAR_ICON_SIZE} color="white" name="home" />
            </TouchableOpacity>
          ),
        }}
      />

      <BottomTab.Screen
        name="Datewise"
        component={Datewise}
        options={{
          tabBarLabel: translations['Dates'],
          tabBarColor: '#007bff',
          tabBarIcon: ({ color }) => (
            <TouchableOpacity>
              <Icon
                size={TAB_BAR_ICON_SIZE}
                color="white"
                name="calendar-range"
              />
            </TouchableOpacity>
          ),
        }}
      />

      <BottomTab.Screen
        name="Districtwise"
        component={Districtwise}
        options={{
          tabBarLabel: translations['Districts'],
          tabBarColor: '#bf80ff',
          tabBarIcon: ({ color }) => (
            <TouchableOpacity>
              <Icon
                size={TAB_BAR_ICON_SIZE}
                color="white"
                name="gesture-spread"
              />
            </TouchableOpacity>
          ),
        }}
      />
      {/* 
      <BottomTab.Screen
        name="Chart"
        component={Chart}
        options={{
          tabBarLabel: 'Chart',
          tabBarColor: '#6c757d',
          tabBarIcon: ({color}) => (
            <TouchableOpacity>
              <Icon size={TAB_BAR_ICON_SIZE} color="white" name="finance" />
            </TouchableOpacity>
          ),
        }}
      /> */}

      <BottomTab.Screen
        name="Update"
        component={Update}
        options={{
          tabBarLabel: translations['Updates'],
          tabBarColor: '#6c757d',
          tabBarIcon: ({ color }) => (
            <TouchableOpacity>
              <Icon size={TAB_BAR_ICON_SIZE} color="white" name="update" />
            </TouchableOpacity>
          ),
        }}
      />

      <BottomTab.Screen
        name="About"
        component={About}
        options={{
          tabBarLabel: translations['About'],
          tabBarColor: '#dc3545',
          tabBarIcon: ({ color }) => (
            <TouchableOpacity>
              <Icon size={TAB_BAR_ICON_SIZE} color="white" name="information" />
            </TouchableOpacity>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNav;

const styles = StyleSheet.create({});
