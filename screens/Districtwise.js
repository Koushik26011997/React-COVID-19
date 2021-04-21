import React, { useEffect } from 'react'
import { View, StyleSheet, LogBox, ToastAndroid, Alert, FlatList, TouchableOpacity, Platform, Dimensions, RefreshControl } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import { Rtext } from '../common/Rtext';
import { request } from '../service/common';
import { formatNumber, showFlashMessage } from '../utility/MyUtility';
import * as Animatable from 'react-native-animatable';
import { ANIM_DURATION } from '../Constant';
import { useTheme } from '@react-navigation/native';

const devWidth = Dimensions.get("window").width;

const Districtwise = ({ navigation }) => {

    const { colors, custom } = useTheme();
    const [refreshing, setRefreshing] = React.useState(false);
    const [loader, setLoader] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [showDistricts, setshowDistricts] = React.useState(-1);


    const onRefresh = React.useCallback(async () => {
        try {
            setRefreshing(true);
            let response = await request('get', 'v2/state_district_wise.json');
            await setData(response.data);
            setRefreshing(false);
            if (Platform.OS === 'android') {
                ToastAndroid.showWithGravity("Data refreshed successfully", ToastAndroid.SHORT, ToastAndroid.CENTER);
            } else {
                Alert.alert("Data refreshed successfully");
            }
        } catch (e) {
            setRefreshing(false);
            console.log(e);
            showFlashMessage(e, '', 'danger');
        }
    }, [refreshing]);

    useEffect(() => {
        LogBox.ignoreAllLogs();
        getCurrentData();

    }, [navigation]);

    const getCurrentData = async () => {
        try {
            setLoader(true);
            let response = await request('get', 'v2/state_district_wise.json');
            await setData(response.data);
            setLoader(false);
        } catch (e) {
            setLoader(false);
            console.log(e);
            showFlashMessage(e, '', 'danger');
        }
    };

    const show = (index) => {
        setshowDistricts(prevState => prevState === -1 ? index : -1)
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {
                loader ? <Spinner visible={loader} /> :

                    <FlatList
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        showsVerticalScrollIndicator={false}
                        data={data}
                        keyExtractor={(item) => item.state.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ width: devWidth - 8, padding: 8, borderColor: colors.primary, borderRadius: 6, borderWidth: 0.6, margin: 3 }}>
                                    <TouchableOpacity onPress={() => show(index)}>
                                        <Rtext style={showDistricts === index ? { textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: colors.text } : { color: colors.text }}>{item.state}</Rtext>
                                    </TouchableOpacity>
                                    {showDistricts === index && <FlatList
                                        ListHeaderComponent={
                                            <Animatable.View style={[styles.boxContainerRow, { marginTop: 6, backgroundColor: colors.card }]} animation="bounceIn" duration={ANIM_DURATION}>
                                                <Rtext style={[styles.flatListRow, { fontWeight: 'bold', color: colors.text }]}>DISTRICT</Rtext>
                                                <Rtext style={[styles.flatListRow, { textAlign: 'center', fontWeight: 'bold', color: colors.text }]}>CNF</Rtext>
                                                <Rtext style={[styles.flatListRow, { textAlign: 'center', fontWeight: 'bold', color: colors.text }]}>ACT</Rtext>
                                                <Rtext style={[styles.flatListRow, { textAlign: 'center', fontWeight: 'bold', color: colors.text }]}>RCV</Rtext>
                                                <Rtext style={[styles.flatListRow, { textAlign: 'center', fontWeight: 'bold', color: colors.text }]}>DEC</Rtext>
                                            </Animatable.View>
                                        }
                                        showsVerticalScrollIndicator={false}
                                        data={item.districtData}
                                        keyExtractor={(item) => item.district.toString()}
                                        renderItem={({ item, index }) => {
                                            return (


                                                <Animatable.View style={[styles.boxContainerRow, { backgroundColor: colors.card }]} animation="bounceIn" duration={ANIM_DURATION}>
                                                    <Rtext style={[styles.flatListRow, { color: colors.text }]} numberOfLines={1}>{item.district}</Rtext>

                                                    <View>
                                                        <Rtext style={[styles.flatListRow, { textAlign: 'center', color: colors.text }]}>{formatNumber(item.confirmed)}</Rtext>
                                                        {
                                                            item.delta.confirmed !== "0" && <Rtext style={[styles.flatListRow, { color: custom.confirm, textAlign: 'center' }]}>[+{formatNumber(item.delta.confirmed)}]</Rtext>
                                                        }
                                                    </View>

                                                    <Rtext style={[styles.flatListRow, { textAlign: 'center', color: colors.text }]}>{formatNumber(item.active)}</Rtext>

                                                    <View>
                                                        <Rtext style={[styles.flatListRow, { textAlign: 'center', color: colors.text }]}>{formatNumber(item.recovered)}</Rtext>
                                                        {
                                                            item.delta.recovered !== "0" && <Rtext style={[styles.flatListRow, { color: '#28a745', textAlign: 'center' }]}>[+{formatNumber(item.delta.recovered)}]</Rtext>
                                                        }
                                                    </View>

                                                    <View>
                                                        <Rtext style={[styles.flatListRow, { textAlign: 'center', color: colors.text }]}>{formatNumber(item.deceased)}</Rtext>
                                                        {
                                                            item.delta.deceased !== "0" && <Rtext style={[styles.flatListRow, { color: custom.death, textAlign: 'center' }]}>[+{formatNumber(item.delta.deceased)}]</Rtext>
                                                        }
                                                    </View>

                                                </Animatable.View>



                                            )
                                        }}
                                    />
                                    }

                                </View>
                            )
                        }}
                    >

                    </FlatList>
            }
        </View>
    )
}

export default Districtwise;

const styles = StyleSheet.create({
    flatListRow: { fontSize: 14, width: devWidth / 5 - 10 },
    boxContainerRow: { justifyContent: 'space-around', flexDirection: "row", padding: 8, marginVertical: 3, borderRadius: 5, alignItems: 'center', backgroundColor: 'white' },
})