import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import * as Animatable from 'react-native-animatable';

const NoInternet = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {/* <Image source={require("../icons/nocon.png")}></Image> */}
            <Animatable.Text animation="zoomInUp" style={{ fontSize: 18, color: '#424242', marginTop: 12 }}>Sorry, No Internet Connection!</Animatable.Text>
        </View>
    )
}

export default NoInternet;

const styles = StyleSheet.create({

})