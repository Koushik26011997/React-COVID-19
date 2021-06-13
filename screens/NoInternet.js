import React, {useContext} from 'react';
import {View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LocalizationContext} from '../common/Translations';

const NoInternet = ({navigation}) => {
  const {
    translations,
    appLanguage,
    setAppLanguage,
    initializeAppLanguage,
  } = useContext(LocalizationContext); // 1
  initializeAppLanguage(); // 2
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Animatable.Text
        animation="zoomInUp"
        style={{fontSize: 18, color: '#424242', marginTop: 12}}>
        {translations['Sorry, No Internet Connection!']}
      </Animatable.Text>
    </View>
  );
};

export default NoInternet;
