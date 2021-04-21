import React from 'react'
import { View, StyleSheet, FlatList, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomHeader } from '../common/Header';
import { Rtext } from '../common/Rtext';
import { FAQ_DATA } from '../Constant';
import * as Animatable from 'react-native-animatable';
import { ANIM_DURATION } from '../Constant';
import { useTheme } from '@react-navigation/native';

const Lockdown = ({ navigation }) => {
    const { colors, custom } = useTheme();
    return (
        <View style={styles.container}>

            <FlatList
                ListHeaderComponent={<CustomHeader style={{ margin: 12 }} text="What should we do now?"></CustomHeader>}
                ListFooterComponent={<View style={{ height: 10 }}></View>}
                data={FAQ_DATA.factoids}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <Animatable.View animation="bounceIn" duration={ANIM_DURATION} style={{ paddingHorizontal: 12, paddingVertical: 8, flexDirection: 'row', width: Dimensions.get("window").width }}>
                            <Icon size={14} color={colors.text} name="checkbox-multiple-blank-circle" style={{ marginRight: 3 }} />
                            <Rtext style={{ marginRight: 6, fontSize: 14, paddingRight: 8, color: colors.text }}>{item.banner}</Rtext>
                        </Animatable.View>
                    )
                }}>

            </FlatList>

        </View>
    )
}

export default Lockdown;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

})