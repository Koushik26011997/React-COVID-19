import {useTheme} from '@react-navigation/native';
import React, {useContext} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Rtext} from '../common/Rtext';
import {LocalizationContext} from '../common/Translations';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Settings = ({navigation}) => {
  const {colors, custom} = useTheme();
  const {
    translations,
    appLanguage,
    setAppLanguage,
    initializeAppLanguage,
  } = useContext(LocalizationContext);
  initializeAppLanguage();

  const langObj = {
    en: 'English',
    hn: 'हिंदी',
    bn: 'বাংলা',
  };

  const handleChange = currentLang => {
    setAppLanguage(currentLang);
    setTimeout(() => {
      navigation.goBack();
    }, 3000);
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <View
        style={{justifyContent: 'center', alignItems: 'center', padding: 12}}>
        <Rtext fontSize={18} fontWeight={'bold'} color={colors.text}>
          {translations['Choose your language']}
        </Rtext>
      </View>

      {translations.getAvailableLanguages().map((currentLang, i) => (
        <TouchableOpacity
          style={{
            backgroundColor: '#A7A7A7',
            paddingHorizontal: 12,
            margin: 6,
            borderRadius: 6,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            height: 42,
          }}
          onPress={() => {
            handleChange(currentLang);
          }}>
          <Rtext fontWeight={'bold'}>{langObj[currentLang]}</Rtext>
          {appLanguage === currentLang ? (
            <Icon size={20} color={colors.text} name="check-circle" />
          ) : null}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  language: {
    textAlign: 'center',
  },
});
