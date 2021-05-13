import React from 'react';
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
import {openUrl, showFlashMessage} from '../utility/MyUtility';
import qs from 'qs';
import {useTheme} from '@react-navigation/native';

// https://coronavirus-19-api.herokuapp.com/countries

const About = ({navigation}) => {
  const {colors, custom} = useTheme();

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
      <ImageBackground
        source={require('../icons/back.png')}
        style={{
          height: Dimensions.get('window').height - 6,
          width: Dimensions.get('window').width,
        }}
        resizeMode="contain">
        <View
          style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
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
            Mr. Koushik Paul.
          </Text>
          <Rtext
            style={{
              marginTop: 20,
              marginHorizontal: 8,
              lineHeight: 30,
              color: colors.text,
            }}>
            Hi, My name is Mr. Koushik Paul and I am a professional Android &
            React Native App Developer holding MCA degree. I work to build
            dynamic apps at Idiosys Technology PVT LTD, Kolkata. I have my work
            experience for 1.6 years. My Email ID:{' '}
            {
              <Rtext
                style={{color: '#007BFF', textDecorationLine: 'underline'}}
                onPress={() => sendMail('itskoushikpaul@gmail.com')}>
                itskoushikpaul@gmail.com
              </Rtext>
            }{' '}
            and my GitHub page link is:{' '}
            {
              <Rtext
                style={{color: '#007BFF', textDecorationLine: 'underline'}}
                onPress={() => openUrl('https://github.com/Koushik26011997/')}>
                https://github.com/Koushik26011997/
              </Rtext>
            }
            . Please always stay connected with me.
          </Rtext>

          <Rtext
            style={{
              color: colors.text,
              fontSize: 16,
              marginTop: 6,
            }}>
            Powered By &#169;KPTECH, 2021
          </Rtext>
        </View>
      </ImageBackground>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({});
