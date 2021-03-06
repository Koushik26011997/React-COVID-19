import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  ImageBackground,
  Switch,
  Platform,
  ToastAndroid,
  Alert,
  BackHandler,
  Vibration,
} from 'react-native';
import { Rtext } from '../common/Rtext';
import { ANIM_DURATION } from '../Constant';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '@react-navigation/native';
import { AuthContext } from '../service/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContent, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LocalizationContext } from '../common/Translations';

const CustomDrawerContent = props => {
  const { toggleTheme } = React.useContext(AuthContext);
  const { colors, custom } = useTheme();
  const [page, setPage] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);

  //
  const {
    translations,
    appLanguage,
    setAppLanguage,
    initializeAppLanguage,
  } = useContext(LocalizationContext); // 1
  initializeAppLanguage(); // 2
  useEffect(() => {
    getData();
  });

  const arr = [
    {
      label: translations['Home'],
      page: 'Home',
      icon: 'home',
    },
    {
      label: translations['Resources'],
      page: 'Resources',
      icon: 'cards-heart',
    },
    {
      label: translations['FAQ'],
      page: 'FAQ',
      icon: 'help-circle',
    },
    {
      label: translations['Lockdown Protocols'],
      page: 'Lockdown',
      icon: 'protocol',
    },
    {
      label: translations['COVID-19 News'],
      page: 'News',
      icon: 'newspaper',
    },
    {
      label: translations['World Meter'],
      page: 'Worldmeter',
      icon: 'earth',
    },
    {
      label: translations['Settings'],
      page: 'Settings',
      icon: 'cog-outline',
    },
    {
      label: translations['Exit'],
      page: 'Exit',
      icon: 'logout',
    },
  ];

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('IsDarkTheme');
      value !== null ? setIsEnabled(true) : setIsEnabled(false);
    } catch (e) {
      setIsEnabled(false);
      // console.log('Error to get data');
    }
  };

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    toggleTheme();
    props.navigation.closeDrawer();
    if (Platform.OS === 'android') {
      ToastAndroid.showWithGravity(
        translations['Please wait sometime to change the mode'],
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      Alert.alert(translations['Please wait sometime to change the mode']);
    }
  };

  const clickOnProduct = page => {
    if (page === 'Exit') {
      Vibration.vibrate([100, 200, 300, 400, 500], true);
      Alert.alert(
        translations['COVID-19 Tracker'],
        translations['Do you want to exit?'],
        [
          {
            text: translations['No'],
            onPress: () => Vibration.cancel(),
            style: 'cancel',
          },
          { text: translations['Yes'], onPress: () => (Vibration.cancel(), closeApp()) },
        ],
        { cancelable: false },
      );
      return true;
    } else {
      setPage(page);
      props.navigation.navigate(page);
    }
  };

  const closeApp = () => {
    props.navigation.closeDrawer();
    setTimeout(() => {
      BackHandler.exitApp();
    }, 500);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.card }}>
      <ScrollView {...props}>
        <ImageBackground
          source={require('../icons/head.png')}
          style={{
            height: Dimensions.get('window').height / 4,
            width: '100%',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../icons/icon.png')}
              style={{
                width: 120,
                height: 120,
                alignSelf: 'center',
              }}></Image>
            <Rtext
              fontWeight={'bold'}
              style={{
                marginTop: 6,
                color: 'white',
              }}
              numberOfLines={1}>
              {translations['#STAY HOME | #STAY SAFE | #WEAR MASK']}
            </Rtext>
          </View>
          {/* <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../icons/user.png')}
              style={{
                marginTop: Dimensions.get('window').height / 7,
                margin: 8,
                width: 70,
                height: 70,
              }}></Image>
            <Rtext
              style={{
                marginTop: Dimensions.get('window').height / 7 + 16,
                color: 'white',
              }}
              numberOfLines={1}>
              Welcome User!!!
            </Rtext>
          </View> */}
        </ImageBackground>

        <FlatList
          style={{ marginTop: 6 }}
          data={arr}
          keyExtractor={item => item.page.toString()}
          renderItem={({ item, index }) => {
            return (
              <Animatable.View animation="fadeInRightBig" duration={ANIM_DURATION}>
                <DrawerItem
                  icon={({ color, size }) => (
                    <Icon
                      name={item.icon}
                      size={24}
                      style={{ color: colors.text }}></Icon>
                  )}
                  label={item.label}
                  labelStyle={[styles.rowStyle, { color: colors.text }]}
                  onPress={() => clickOnProduct(item.page)}></DrawerItem>
              </Animatable.View>
            );
          }}></FlatList>

        <Animatable.View
          animation="fadeInRightBig"
          duration={ANIM_DURATION}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginStart: 18,
            marginTop: 12,
          }}>
          <Rtext style={[styles.rowStyle, { color: colors.text }]}>
            {translations['Dark Mode']}
          </Rtext>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#ffffff'}
            ios_backgroundColor="#3e3e3e"
            value={isEnabled}
            onValueChange={toggleSwitch}
            style={[styles.rowStyle, { marginRight: 12 }]}
          />
        </Animatable.View>
      </ScrollView>
    </View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  rowStyle: { fontSize: 16, fontFamily: 'LatoBold' },
});
