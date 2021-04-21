import React, { useEffect } from 'react'
import { View, StyleSheet, FlatList, Dimensions } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { CustomHeader } from '../common/Header';
import { Rtext } from '../common/Rtext';
import { ANIM_DURATION } from '../Constant';
import { request } from '../service/common';
import { showFlashMessage } from '../utility/MyUtility';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import { useTheme } from '@react-navigation/native';

const Update = ({ navigation }) => {

    const [loader, setLoader] = React.useState(false);
    const [data, setData] = React.useState([]);
    const { colors, custom } = useTheme();

    useEffect(() => {
        getCurrentUpdateData();
    }, []);

    const getCurrentUpdateData = async () => {
        try {
            setLoader(true);
            let response = await request('get', 'updatelog/log.json');
            await setData(response.data.reverse());
            setLoader(false);
        } catch (e) {
            setLoader(false);
            console.log(e);
            showFlashMessage(e, '', 'danger');
        }
    };


    return (
        <View style={styles.container}>

            {loader ? <Spinner visible={loader} />
                :
                <FlatList
                    ListHeaderComponent={<CustomHeader style={{ margin: 12 }} text="Current Updates!"></CustomHeader>}
                    ListFooterComponent={<View style={{ height: 10 }}></View>}
                    data={data}
                    keyExtractor={(item) => item.timestamp}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <Animatable.View animation="bounceIn" duration={ANIM_DURATION} style={{ marginBottom:6 }}>
                                <View style={{ paddingVertical: 6, flexDirection: 'row', width: Dimensions.get("window").width - 20 }}>
                                    <Icon size={16} color={colors.text} name="update" style={{ marginRight: 3 }} />
                                    <View>
                                        <Rtext style={{ marginRight: 16, fontSize: 14, color: colors.text }}>{item.update}</Rtext>
                                        <Rtext style={{ marginRight: 16, fontSize: 14 , color: colors.text}}>Last Updated on: {moment(item.timestamp * 1000).format("Do MMMM, YYYY hh:mm A")}</Rtext>
                                    </View>
                                </View>
                                <View style={{backgroundColor: colors.text, height: 0.6}}></View>
                            </Animatable.View>
                        )
                    }}>

                </FlatList>
            }

        </View>
    )
}

export default Update;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

})