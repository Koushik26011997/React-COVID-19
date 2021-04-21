import React, { useEffect } from 'react'
import { View, ToastAndroid, Alert, StyleSheet, FlatList, RefreshControl, Dimensions, Platform } from 'react-native'
import * as Animatable from 'react-native-animatable';
import Spinner from 'react-native-loading-spinner-overlay';
import { Rtext } from '../common/Rtext';
import { ANIM_DURATION } from '../Constant';
import { request } from '../service/common';
import { formatNumber, showFlashMessage } from '../utility/MyUtility';
import moment from 'moment';
import { useTheme } from '@react-navigation/native';

const flatListRowWidth = Dimensions.get("window").width / 4;

//https://api.covid19india.org/v4/min/data.min.json
//https://api.covid19india.org/v4/min/data-2020-05-06.min.json

const Datewise = ({ navigation }) => {

    const { colors, custom } = useTheme();
    const [refreshing, setRefreshing] = React.useState(false);
    const [loader, setLoader] = React.useState(false);
    const [data, setData] = React.useState({});
    const [stateData, setStateData] = React.useState([]);

    const onRefresh = React.useCallback(async () => {
        try {
            setRefreshing(true);
            let response = await request('get', 'data.json');
            await setData(response.data);
            await setStateData(response.data.cases_time_series.reverse());
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
        getCurrentData();
    }, [navigation]);

    const getCurrentData = async () => {
        try {
            setLoader(true);
            let response = await request('get', 'data.json');
            await setData(response.data);
            await setStateData(response.data.cases_time_series.reverse());
            setLoader(false);
        } catch (e) {
            setLoader(false);
            console.log(e);
            showFlashMessage(e, '', 'danger');
        }
    };


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {loader ? <Spinner visible={loader} />
                :
                <>
                    <Animatable.View style={[styles.boxContainerRow, { backgroundColor: colors.card }]} animation="bounceIn" duration={ANIM_DURATION}>
                        <Rtext style={[styles.flatListRow, { fontWeight: 'bold', color: colors.text }]}>DATE</Rtext>
                        <Rtext style={[styles.flatListRow, { textAlign: 'center', fontWeight: 'bold', color: colors.text }]}>CNF</Rtext>
                        <Rtext style={[styles.flatListRow, { textAlign: 'center', fontWeight: 'bold', color: colors.text }]}>RCV</Rtext>
                        <Rtext style={[styles.flatListRow, { textAlign: 'center', fontWeight: 'bold', color: colors.text }]}>DEC</Rtext>
                    </Animatable.View>


                    <Animatable.View style={[styles.boxContainerRow, { backgroundColor: colors.card }]} animation="bounceIn" duration={ANIM_DURATION}>
                        <View>
                            <Rtext style={[styles.flatListRow, { color: colors.text }]}>{moment().format('Do MMM, YYYY')}</Rtext>
                            <Rtext style={[styles.flatListRow, { color: colors.text }]}>({moment().format('dddd')})</Rtext>
                        </View>

                        <View>
                            <Rtext style={[styles.flatListRow, { textAlign: 'center', color: colors.text }]}>{data.statewise && formatNumber(data.statewise[0].confirmed)}</Rtext>
                            <Rtext style={[styles.flatListRow, { color: custom.confirm, textAlign: 'center' }]}>[+{data.statewise && formatNumber(data.statewise[0].deltaconfirmed)}]</Rtext>

                        </View>

                        <View>
                            <Rtext style={[styles.flatListRow, { textAlign: 'center', color: colors.text }]}>{data.statewise && formatNumber(data.statewise[0].recovered)}</Rtext>
                            <Rtext style={[styles.flatListRow, { color: '#28a745', textAlign: 'center' }]}>[+{data.statewise && formatNumber(data.statewise[0].deltarecovered)}]</Rtext>

                        </View>

                        <View>
                            <Rtext style={[styles.flatListRow, { textAlign: 'center', color: colors.text }]}>{data.statewise && formatNumber(data.statewise[0].deaths)}</Rtext>
                            <Rtext style={[styles.flatListRow, { color: custom.death, textAlign: 'center' }]}>[+{data.statewise && formatNumber(data.statewise[0].deltadeaths)}]</Rtext>

                        </View>

                    </Animatable.View>

                    <FlatList
                        data={stateData}
                        keyExtractor={(item) => item.dateymd}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                        renderItem={({ item, index }) => {
                            return (
                                <Animatable.View style={[styles.boxContainerRow, { backgroundColor: colors.card }]} animation="bounceIn" duration={ANIM_DURATION}>
                                    <View>
                                        <Rtext style={[styles.flatListRow, { color: colors.text }]}>{moment(moment(item.dateymd, "YYYY-MM-DD")).format('Do MMM, YYYY')}</Rtext>
                                        <Rtext style={[styles.flatListRow, { color: colors.text }]}>({moment(moment(item.dateymd, "YYYY-MM-DD")).format('dddd')})</Rtext>
                                    </View>
                                    <View>
                                        <Rtext style={[styles.flatListRow, { textAlign: 'center', color: colors.text }]}>{formatNumber(item.totalconfirmed)}</Rtext>
                                        {
                                            item.dailyconfirmed !== "0" && <Rtext style={[styles.flatListRow, { color: custom.confirm, textAlign: 'center' }]}>[+{formatNumber(item.dailyconfirmed)}]</Rtext>
                                        }
                                    </View>

                                    <View>
                                        <Rtext style={[styles.flatListRow, { textAlign: 'center', color: colors.text }]}>{formatNumber(item.totalrecovered)}</Rtext>
                                        {
                                            item.dailyrecovered !== "0" && <Rtext style={[styles.flatListRow, { color: '#28a745', textAlign: 'center' }]}>[+{formatNumber(item.dailyrecovered)}]</Rtext>
                                        }
                                    </View>

                                    <View>
                                        <Rtext style={[styles.flatListRow, { textAlign: 'center', color: colors.text }]}>{formatNumber(item.totaldeceased)}</Rtext>
                                        {
                                            item.dailydeceased !== "0" && <Rtext style={[styles.flatListRow, { color: custom.death, textAlign: 'center' }]}>[+{formatNumber(item.dailydeceased)}]</Rtext>
                                        }
                                    </View>

                                </Animatable.View>
                            )
                        }}>

                    </FlatList>
                </>
            }

        </View>
    )
}

export default Datewise;

const styles = StyleSheet.create({
    flatListRow: { width: flatListRowWidth, fontSize: 14 },
    boxContainerRow: { justifyContent: 'space-around', flexDirection: "row", padding: 8, borderRadius: 5, alignItems: 'center', margin: 3 },
})