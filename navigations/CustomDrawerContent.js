import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import {Rtext} from '../common/Rtext';
import {ANIM_DURATION} from '../Constant';
import * as Animatable from 'react-native-animatable';
import {useTheme} from '@react-navigation/native';
import {AuthContext} from '../service/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DrawerContent, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const arr = [
  {
    label: 'Home',
    page: 'Home',
    icon: 'home',
  },
  {
    label: 'Resources',
    page: 'Resources',
    icon: 'cards-heart',
  },
  {
    label: 'FAQ',
    page: 'FAQ',
    icon: 'help-circle',
  },
  // {
  //   label: 'Current Updates',
  //   page: 'Update',
  //   icon: 'update',
  // },
  {
    label: 'Lockdown Protocols',
    page: 'Lockdown',
    icon: 'protocol',
  },
  {
    label: 'COVID-19 News',
    page: 'News',
    icon: 'newspaper',
  },
  {
    label: 'World Meter',
    page: 'Worldmeter',
    icon: 'earth',
  },
  {
    label: 'COWIN Vaccination',
    page: 'Vaccine',
    icon: 'needle',
  },
  {
    label: 'Exit',
    page: 'Exit',
    icon: 'logout',
  },
];

const CustomDrawerContent = props => {
  const {toggleTheme} = React.useContext(AuthContext);
  const {colors, custom} = useTheme();
  const [page, setPage] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    getData();
  });

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
        'Please wait sometime to change the theme',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      Alert.alert('Please wait sometime to change the theme');
    }
  };

  const clickOnProduct = page => {
    if (page === 'Exit') {
      Alert.alert(
        'COVID-19 Tracker',
        'Do you want to exit?',
        [
          {
            text: 'No',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'Yes', onPress: () => closeApp()},
        ],
        {cancelable: false},
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
    }, 300);
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.card}}>
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
              style={{
                marginTop: 6,
                color: 'white',
              }}
              numberOfLines={1}>
              #STAY HOME | #STAY SAFE | #WEAR MASK
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
          style={{marginTop: 6}}
          data={arr}
          keyExtractor={item => item.page.toString()}
          renderItem={({item, index}) => {
            return (
              <Animatable.View animation="bounceIn" duration={ANIM_DURATION}>
                <DrawerItem
                  icon={({color, size}) => (
                    <Icon
                      name={item.icon}
                      size={24}
                      style={{color: colors.text}}></Icon>
                  )}
                  label={item.label}
                  labelStyle={[styles.rowStyle, {color: colors.text}]}
                  onPress={() => clickOnProduct(item.page)}></DrawerItem>
              </Animatable.View>
            );
          }}></FlatList>

        <Animatable.View
          animation="bounceIn"
          duration={ANIM_DURATION}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginStart: 18,
            marginTop: 12,
          }}>
          <Rtext style={[styles.rowStyle, {color: colors.text}]}>
            Dark Theme
          </Rtext>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#ffffff'}
            ios_backgroundColor="#3e3e3e"
            value={isEnabled}
            onValueChange={toggleSwitch}
            style={[styles.rowStyle, {marginRight: 12}]}
          />
        </Animatable.View>
      </ScrollView>
    </View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  rowStyle: {fontSize: 16},
});
