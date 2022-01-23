import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FlashMessage from 'react-native-flash-message';
import MainStackNav from './MainStackNav';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

const RootDrawerNav = () => {
  return (
    <>
      <Drawer.Navigator
        initialRouteName="Root"
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Root" component={MainStackNav} />
      </Drawer.Navigator>
      <FlashMessage position="top"></FlashMessage>
    </>
  );
};

export default RootDrawerNav;

const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor: '#F1F1F1',
  },
});
