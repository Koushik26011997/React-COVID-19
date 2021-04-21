import React, { useEffect } from 'react'
import { View, StyleSheet, FlatList, Dimensions, RefreshControl, ToastAndroid, Platform, Alert, LogBox, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable';
import moment from 'moment';
import { Rtext } from '../common/Rtext'
import { request } from '../service/common'
import { formatNumber, openUrl, showFlashMessage, timeDiff } from '../utility/MyUtility';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import { ANIM_DURATION } from '../Constant';

const flatListRowWidth = Dimensions.get("window").width / 5;

const StateDetails = ({ navigation, route }) => {

    // console.log('statecode', route.params.statecode);
    let statecode = route.params.statecode;

    const [refreshing, setRefreshing] = React.useState(false);
    const [loader, setLoader] = React.useState(false);
    const [data, setData] = React.useState({});
    const [stateData, setStateData] = React.useState([]);

    const onRefresh = React.useCallback(async () => {
        try {
            setRefreshing(true);
            let response = await request('get', 'https://api.covid19india.org/v4/min/timeseries-' + statecode + '.min.json', true);
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
            let response = await request('get', 'https://api.covid19india.org/v4/min/timeseries-' + statecode + '.min.json', true);
            await setData(response.data);
            console.log(data[statecode.toString()] && data[statecode.toString()].dates);
            setLoader(false);
        } catch (e) {
            setLoader(false);
            console.log(e);
            showFlashMessage(e, '', 'danger');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: '#F1F1F1' }}>



            <FlatList
                ListFooterComponent={<View style={{ height: 6 }}></View>}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                data={data[statecode.toString()] && data[statecode.toString()].districts}
                ///keyExtractor={(item) => item.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity>
                            {/* <Animatable.View style={styles.boxContainerRow} animation="bounceIn" duration={ANIM_DURATION}>
                                        <Rtext style={styles.flatListRow} numberOfLines={1}>{item.state}</Rtext>

                                        <View>
                                            <Rtext style={[styles.flatListRow, { textAlign: 'center' }]}>{formatNumber(item.confirmed)}</Rtext>
                                            {
                                                item.deltaconfirmed !== "0" && <Rtext style={[styles.flatListRow, { color: '#dc3545', textAlign: 'center' }]}>[+{formatNumber(item.deltaconfirmed)}]</Rtext>
                                            }
                                        </View>

                                        <Rtext style={[styles.flatListRow, { textAlign: 'center' }]}>{formatNumber(item.active)}</Rtext>

                                        <View>
                                            <Rtext style={[styles.flatListRow, { textAlign: 'center' }]}>{formatNumber(item.recovered)}</Rtext>
                                            {
                                                item.deltarecovered !== "0" && <Rtext style={[styles.flatListRow, { color: '#28a745', textAlign: 'center' }]}>[+{formatNumber(item.deltarecovered)}]</Rtext>
                                            }
                                        </View>

                                        <View>
                                            <Rtext style={[styles.flatListRow, { textAlign: 'center' }]}>{formatNumber(item.deaths)}</Rtext>
                                            {
                                                item.deltadeaths !== "0" && <Rtext style={[styles.flatListRow, { color: '#6c757d', textAlign: 'center' }]}>[+{formatNumber(item.deltadeaths)}]</Rtext>
                                            }
                                        </View>

                                    </Animatable.View>   */}

                        </TouchableOpacity>
                    )
                }}
            >

            </FlatList>



        </View>

    )
}

export default StateDetails;

const styles = StyleSheet.create({
    boxStyle: { backgroundColor: 'white', padding: 10, borderRadius: 8, alignItems: 'center', margin: 3 },
    boxContainer: { justifyContent: 'space-around', flexDirection: "row", backgroundColor: 'white', padding: 8, borderRadius: 8, margin: 3, elevation: 1 },
    boxContainerRow: { justifyContent: 'space-around', flexDirection: "row", padding: 8, margin: 3, borderRadius: 5, alignItems: 'center', backgroundColor: 'white' },
    flatListRow: { width: flatListRowWidth - 10, fontSize: 14 },
    // boxStyleFour: { backgroundColor: 'white', padding: 8, borderRadius: 8, alignItems: 'center', marginVertical: 3 },
    boxStyleFour: { alignItems: 'center' },
})