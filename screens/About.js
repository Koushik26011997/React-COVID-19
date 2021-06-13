import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Linking,
  Text,
  ImageBackground,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Rtext} from '../common/Rtext';
import {ANIM_DURATION} from '../Constant';
import {
  openUrl,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  showFlashMessage,
} from '../utility/MyUtility';
import qs from 'qs';
import {useTheme} from '@react-navigation/native';
import {AuthContext} from '../service/context';
import ViewShot from 'react-native-view-shot';
import {LocalizationContext} from '../common/Translations';

// https://coronavirus-19-api.herokuapp.com/countries

const About = ({navigation}) => {
  const {colors, custom} = useTheme();
  const {viewContext} = React.useContext(AuthContext);

  //
  const {
    translations,
    appLanguage,
    setAppLanguage,
    initializeAppLanguage,
  } = useContext(LocalizationContext); // 1
  initializeAppLanguage(); // 2

  const sendMail = async mail => {
    let url = `mailto:${mail}`;

    // Create email link query
    const query = qs.stringify({
      subject: 'About COVID-19 app',
      body: '',
      cc: '',
      bcc: '',
    });

    if (query.length) {
      url += `?${query}`;
    }

    // check if we can use this link
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
      //throw new Error('Provided URL can not be handled');
      showFlashMessage('Provided URL can not be handled', 'danger');
    } else {
      Linking.openURL(url);
    }
  };

  return (
    <View>
      <ViewShot
        ref={viewContext}
        options={{
          format: 'jpg',
          quality: 1,
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
        }}
        style={{backgroundColor: colors.background}}>
        <ImageBackground
          source={require('../icons/back.png')}
          style={{
            height: Dimensions.get('window').height - 6,
            width: Dimensions.get('window').width,
          }}
          resizeMode="contain">
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Animatable.View
              style={{marginTop: 24}}
              animation="bounceIn"
              duration={ANIM_DURATION}>
              <Image
                source={require('../icons/kp.jpg')}
                style={{
                  height: 140,
                  width: 140,
                  borderRadius: 70,
                  borderColor: 'white',
                  borderWidth: 2,
                }}></Image>
            </Animatable.View>
            <Text
              style={{
                fontFamily: 'DancingScriptBold',
                color: colors.text,
                marginVertical: 16,
                fontSize: 38,
              }}>
              {translations['Koushik Paul']}
            </Text>
            <Rtext
              style={{
                marginTop: 20,
                marginHorizontal: 8,
                lineHeight: 30,
                color: colors.text,
              }}>
              {translations['AboutMe']}:{' '}
              {
                <Rtext
                  style={{color: '#007BFF', textDecorationLine: 'underline'}}
                  onPress={() => sendMail('itskoushikpaul@gmail.com')}>
                  itskoushikpaul@gmail.com
                </Rtext>
              }{' '}
              {translations['and my GitHub page link is']}:{' '}
              {
                <Rtext
                  style={{color: '#007BFF', textDecorationLine: 'underline'}}
                  onPress={() =>
                    openUrl('https://github.com/Koushik26011997/')
                  }>
                  https://github.com/Koushik26011997/
                </Rtext>
              }
              . {translations['Please always stay connected with me']}
            </Rtext>

            <Rtext
              style={{
                marginTop: 32,
                color: colors.text,
                fontSize: 18,
              }}>
              {/* Powered By &#169;KPTECH, 2021 */}
              {translations['Powered By']}
            </Rtext>
          </View>
        </ImageBackground>
      </ViewShot>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({});
