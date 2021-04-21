import React from 'react'
import { View, StyleSheet, FlatList, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomHeader } from '../common/Header';
import { Rtext } from '../common/Rtext';
import { FAQ_DATA } from '../Constant';
import { useTheme } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { ANIM_DURATION } from '../Constant';

const FAQ = ({ navigation }) => {

    const { colors, custom } = useTheme();

    return (
        <View style={styles.container}>

            <FlatList
                ListHeaderComponent={<CustomHeader style={{ margin: 12 }} text="FAQ List"></CustomHeader>}
                ListFooterComponent={<View style={{ height: 20 }}></View>}
                data={FAQ_DATA.faq}
                keyExtractor={(item) => item.qno}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <Animatable.View animation="bounceIn" duration={ANIM_DURATION}>
                            <View style={{ paddingVertical: 6, flexDirection: 'row', width: Dimensions.get("window").width - 20 }}>
                                <Icon size={16} color={custom.answer} name="help-circle" style={{ marginRight: 3 }} />
                                <Rtext style={{ marginRight: 16, fontSize: 14, color: colors.text }}>{item.question}</Rtext>
                            </View>

                            <View style={{ paddingVertical: 6, flexDirection: 'row', width: Dimensions.get("window").width - 38 }}>
                                <Icon size={18} color={custom.answer} name="hand-pointing-right" style={{ marginRight: 3 }} />
                                {/* <HTML source={{ html: item.answer }} /> */}
                                <Rtext style={{ marginRight: 6, color: custom.answer, fontSize: 14 }}>{item.answer}</Rtext>
                            </View>
                        </Animatable.View>
                    )
                }}>

            </FlatList>

        </View>
    )
}

export default FAQ;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})