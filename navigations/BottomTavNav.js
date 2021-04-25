import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import About from '../screens/About';
import Home from '../screens/Home';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Datewise from '../screens/Datewise';
import Districtwise from '../screens/Districtwise';
import Chart from '../screens/Chart';
import {BASE_URL, TAB_BAR_ICON_SIZE} from '../Constant';
import Vaccine from '../screens/Vaccine';

const BottomTab = createMaterialBottomTabNavigator();

const BottomTabNav = ({navigation}) => {
  return (
    <BottomTab.Navigator
      screenOptions={{tabBarColor: '#0C1C46'}}
      initialRouteName={Home}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#0C1C46',
          tabBarIcon: ({color}) => (
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
          tabBarLabel: 'Dates',
          tabBarColor: '#007bff',
          tabBarIcon: ({color}) => (
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
          tabBarLabel: 'Districts',
          tabBarColor: '#28a745',
          tabBarIcon: ({color}) => (
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
      />

      <BottomTab.Screen
        name="About"
        component={About}
        options={{
          tabBarLabel: 'About',
          tabBarColor: '#dc3545',
          tabBarIcon: ({color}) => (
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
