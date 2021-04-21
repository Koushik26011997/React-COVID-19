import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View } from "react-native-animatable";
import { ActivityIndicator } from 'react-native-paper';

export interface RloaderProps {
        color?: string,
        style?: object
}
 
const Rloader = (props:RloaderProps) => {
    const { color='#0095ff',style={} } = props;
    return (  
        <View style={[styles.container,style]}>
            <ActivityIndicator animating={true} color={color} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E3EBF1'
    }
});

 
export { Rloader };