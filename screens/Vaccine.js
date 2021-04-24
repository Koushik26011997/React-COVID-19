import React from 'react'
import { View, StyleSheet, Image, Linking, Text, Dimensions } from 'react-native'
import { useTheme } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
// https://coronavirus-19-api.herokuapp.com/countries

const Vaccine = ({ navigation }) => {

    const { colors, custom } = useTheme();


    return (

        <WebView
            source={{ uri: 'https://www.google.com/' }}
            style={{ marginTop: 20, height: deviceHeight, width: deviceWidth }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
        />

    )
}

export default Vaccine;

const styles = StyleSheet.create({


})