import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Linking, Text, Dimensions} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../service/context';
import ViewShot from 'react-native-view-shot';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../utility/MyUtility';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
// https://coronavirus-19-api.herokuapp.com/countries

const Vaccine = ({navigation}) => {
  const {viewContext} = React.useContext(AuthContext);
  const [loader, setLoader] = React.useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  });
  const {colors, custom} = useTheme();

  return loader ? (
    <Spinner visible={loader} />
  ) : (
    <ViewShot
      ref={viewContext}
      options={{
        format: 'jpg',
        quality: 1,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
      }}
      style={{backgroundColor: colors.background}}>
      <WebView
        source={{uri: 'https://selfregistration.cowin.gov.in/'}}
        style={{height: deviceHeight, width: deviceWidth}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    </ViewShot>
  );
};

export default Vaccine;

const styles = StyleSheet.create({});
