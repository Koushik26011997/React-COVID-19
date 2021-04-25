import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Linking, Text, Dimensions} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
// https://coronavirus-19-api.herokuapp.com/countries

const Vaccine = ({navigation}) => {
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
    <WebView
      source={{uri: 'https://selfregistration.cowin.gov.in/'}}
      style={{height: deviceHeight, width: deviceWidth}}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
    />
  );
};

export default Vaccine;

const styles = StyleSheet.create({});
