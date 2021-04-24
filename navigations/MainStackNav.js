import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNav from './BottomTavNav';
import { TouchableOpacity, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { normalizeSize } from '../utility/MyUtility';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAQ from '../screens/FAQ';
import Lockdown from '../screens/Lockdown';
import Update from '../screens/Update';
import News from '../screens/News';
import StateDetails from '../screens/StateDetails';

const MainStack = createStackNavigator();

const MainStackNav = ({ navigation }) => {

    const options = {
        headerStyle: {
            backgroundColor: '#0C1C46',
            shadowColor: "#000",
            height: normalizeSize(58, 42, 54),
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.75,
            elevation: 3,
        },
        headerForceInset: { top: 'never', bottom: 'never' },
        stackAnimation: 'fade',
        headerTopInsetEnabled: false,
        headerTitle: 'COVID-19 Tracker',
        headerTitleStyle: {
            color: 'white',
            fontSize: 16, fontFamily: 'LatoRegular'
        },
        headerTitleContainerStyle: {
            left: 52
        },
        // headerLeft: () => {
        //     return (
        //         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        //             <TouchableOpacity onPress={() => navigation.openDrawer()}>
        //                 <Icon size={28} color="white" name="menu" style={{ marginStart: 12 }} />
        //             </TouchableOpacity>
        //         </View>
        //     )
        // },
    };

    return (
        <>
            <MainStack.Navigator>

                <MainStack.Screen name="BottomTabNav" component={BottomTabNav} options={[options, {
                    headerLeft: () => {
                        return (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                                    <Icon size={28} color="white" name="menu" style={{ marginStart: 12 }} />
                                </TouchableOpacity>
                            </View>
                        )
                    }
                }]} />

                <MainStack.Screen name="FAQ" component={FAQ} options={options} />

                <MainStack.Screen name="Lockdown" component={Lockdown} options={options} />

                <MainStack.Screen name="Update" component={Update} options={options} />

                <MainStack.Screen name="News" component={News} options={options} />

                <MainStack.Screen name="StateDetails" component={StateDetails} options={options} />

            </MainStack.Navigator>

            <FlashMessage position="top"></FlashMessage>
        </>

    )

}

export default MainStackNav;