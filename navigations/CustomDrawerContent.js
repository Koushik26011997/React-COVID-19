import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  ImageBackground,
  Switch,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import {Rtext} from '../common/Rtext';
import {ANIM_DURATION} from '../Constant';
import * as Animatable from 'react-native-animatable';
import {useTheme} from '@react-navigation/native';
import {AuthContext} from '../service/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const arr = [
  {
    label: 'Home',
    page: 'Home',
  },

  {
    label: 'FAQ',
    page: 'FAQ',
  },
  {
    label: 'Current Updates',
    page: 'Update',
  },
  {
    label: 'Lockdown Protocols',
    page: 'Lockdown',
  },
  {
    label: 'COVID-19 News',
    page: 'News',
  },
  {
    label: 'World Meter',
    page: 'Worldmeter',
  },
  {
    label: 'COWIN Vaccine',
    page: 'Vaccine',
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
      console.log('Error to get data');
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
    setPage(page);
    props.navigation.navigate(page);
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.card}}>
      <ScrollView {...props}>
        <ImageBackground
          source={require('../icons/head.png')}
          style={{
            height: Dimensions.get('window').height / 5,
            width: Dimensions.get('window').width,
          }}>
          <View style={{flexDirection: 'row'}}>
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
          </View>
        </ImageBackground>

        <FlatList
          style={{marginTop: 36}}
          data={arr}
          keyExtractor={item => item.page.toString()}
          renderItem={({item, index}) => {
            return (
              <Animatable.View animation="bounceIn" duration={ANIM_DURATION}>
                {item.page === page ? (
                  <TouchableOpacity
                    onPress={() => clickOnProduct(item.page)}
                    style={{backgroundColor: colors.card}}>
                    <Rtext style={[styles.rowStyle, {color: colors.text}]}>
                      {item.label}
                    </Rtext>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => clickOnProduct(item.page)}>
                    <Rtext style={[styles.rowStyle, {color: colors.text}]}>
                      {item.label}
                    </Rtext>
                  </TouchableOpacity>
                )}
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
  rowStyle: {padding: 16, fontSize: 15},
});
