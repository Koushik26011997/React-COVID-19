import React, { useEffect } from 'react'
import { View, StyleSheet, FlatList, Dimensions, RefreshControl, ToastAndroid, Platform, Alert } from 'react-native'
import * as Animatable from 'react-native-animatable';
import moment from 'moment';
import { Rtext } from '../common/Rtext'
import { request } from '../service/common'
import { formatNumber, openUrl, showFlashMessage, timeDiff } from '../utility/MyUtility';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import { ANIM_DURATION } from '../Constant';

const flatListRowWidth = Dimensions.get("window").width / 5;

//https://api.covid19india.org/v4/min/data.min.json
//https://api.covid19india.org/v4/min/data-2020-05-06.min.json

const Home = ({ navigation }) => {

    const [refreshing, setRefreshing] = React.useState(false);
    const [loader, setLoader] = React.useState(false);
    const [data, setData] = React.useState({});
    const [stateData, setStateData] = React.useState([]);

    const onRefresh = React.useCallback(async () => {
        try {
            setRefreshing(true);
            let response = await request('get', 'v4/min/data.min.json');
            await setData(response.data);
            await setStateData(response.data.statewise.splice(1));
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

        // LogBox.ignoreAllLogs();

        const unsubscribe = navigation.addListener('focus', (e) => {
            getCurrentData();
        });

        return unsubscribe;

    }, [navigation]);

    const getCurrentData = async () => {
        try {
            setLoader(true);
            let response = await request('get', 'v4/min/data.min.json');
            await setData(response.data);
            await setStateData(response.data.statewise.splice(1));
            setLoader(false);
        } catch (e) {
            setLoader(false);
            console.log(e);
            showFlashMessage(e, '', 'danger');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: '#F1F1F1' }}>

            {loader ? <Spinner visible={loader} />
                :
                <>
                    <Animatable.View style={styles.boxContainer} animation="bounceIn" duration={ANIM_DURATION}>

                        <Animatable.View style={styles.boxStyleFour} animation="bounceIn" duration={ANIM_DURATION}>
                            <Rtext style={{ color: '#dc3545', fontSize: 15 }}>CONFIRMED</Rtext>
                            <Rtext style={{ color: '#dc3545', marginTop: 6, fontSize: 15 }}>{data.TT && formatNumber(data.TT.total.confirmed)}</Rtext>
                            <Rtext style={{ color: '#dc3545', fontSize: 15 }}>[+{data.TT && formatNumber(data.statewise[0].deltaconfirmed)}]</Rtext>
                        </Animatable.View>

                        <Animatable.View style={styles.boxStyleFour} animation="bounceIn" duration={ANIM_DURATION}>
                            <Rtext style={{ color: '#007bff', fontSize: 15 }}>ACTIVE</Rtext>
                            <Rtext style={{ color: '#007bff', marginTop: 6, fontSize: 14.5 }}>{data.statewise && formatNumber(data.statewise[0].active)}</Rtext>
                        </Animatable.View>

                        <Animatable.View style={styles.boxStyleFour} animation="bounceIn" duration={ANIM_DURATION}>
                            <Rtext style={{ color: '#28a745', fontSize: 15 }}>RECOVERED</Rtext>
                            <Rtext style={{ color: '#28a745', marginTop: 6, fontSize: 14.5 }}>{data.statewise && formatNumber(data.statewise[0].recovered)}</Rtext>
                            <Rtext style={{ color: '#28a745', fontSize: 15 }}>[+{data.statewise && formatNumber(data.statewise[0].deltarecovered)}]</Rtext>
                        </Animatable.View>

                        <Animatable.View style={styles.boxStyleFour} animation="bounceIn" duration={ANIM_DURATION}>
                            <Rtext style={{ color: '#6c757d', fontSize: 15 }}>DECEASED</Rtext>
                            <Rtext style={{ color: '#6c757d', marginTop: 6, fontSize: 14.5 }}>{data.statewise && formatNumber(data.statewise[0].deaths)}</Rtext>
                            <Rtext style={{ color: '#6c757d', fontSize: 15 }}>[+{data.statewise && formatNumber(data.statewise[0].deltadeaths)}]</Rtext>
                        </Animatable.View>

                    </Animatable.View>




                    <FlatList
                    extraData={data}
                        ListFooterComponent={
                            <View style={{ height: 6 }}></View>
                        }
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        ListHeaderComponent={
                            <>
                                <Animatable.View style={[styles.boxStyle, { justifyContent: 'center' }]} animation="bounceIn" duration={ANIM_DURATION}>

                                    <Rtext style={{ color: '#28a745', textAlign: 'center' }}>
                                        Last Updated On:
{data.statewise && moment(moment(data.statewise[0].lastupdatedtime, "DD/MM/YYYY HH:mm:ss")).format(' Do MMMM, YYYY hh:mm A')}
                                        {data.statewise && "\n" + timeDiff(data.statewise[0].lastupdatedtime)}
                                    </Rtext>

                                </Animatable.View>


                                <Animatable.View style={[styles.boxStyle, { justifyContent: 'center' }]} animation="bounceIn" duration={ANIM_DURATION}>

                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon size={18} color="#28a745" name="shield-check" />
                                        <Rtext style={{ color: '#28a745', marginLeft: 3 }}>
                                            {data.tested && formatNumber(data.tested[data.tested.length - 1].totalsamplestested) + " "}
ICMR TESTED ON
{data.tested && moment(moment(data.tested[data.tested.length - 1].testedasof, "DD/MM/YYYY")).format(' Do MMMM, YYYY')}
                                        </Rtext>
                                    </View>
                                    <Rtext style={{ fontSize: 15, color: "#28a745", textDecorationLine: "underline", marginTop: 3 }}
                                        onPress={() => openUrl(data.tested[data.tested.length - 1].source)}>Click here to view the source</Rtext>

                                </Animatable.View>

                                {
                                    data.tested && (data.tested[data.tested.length - 1].totaldosesadministered) !== "" ?
                                        (
                                            <Animatable.View style={[styles.boxStyle, { flexDirection: 'row', justifyContent: 'center' }]} animation="bounceIn" duration={ANIM_DURATION}>
                                                <Icon size={18} color="#28a745" name="shield-check" />
                                                <Rtext style={{ color: '#28a745', marginLeft: 3 }}>{data.tested && formatNumber(data.tested[data.tested.length - 1].totaldosesadministered)} vaccine doses administered</Rtext>
                                            </Animatable.View>
                                        )
                                        :
                                        (
                                            <Animatable.View style={[styles.boxStyle, { flexDirection: 'row', justifyContent: 'center' }]} animation="bounceIn" duration={ANIM_DURATION}>
                                                <Icon size={18} color="#28a745" name="shield-check" />
                                                <Rtext style={{ color: '#28a745', marginLeft: 3 }}>{data.tested && formatNumber(data.tested[data.tested.length - 2].totaldosesadministered)} vaccine doses administered</Rtext>
                                            </Animatable.View>
                                        )
                                }

                                <Animatable.View style={styles.boxContainerRow} animation="bounceIn" duration={ANIM_DURATION}>
                                    <Rtext style={[styles.flatListRow, { fontWeight: 'bold' }]}>STATE</Rtext>
                                    <Rtext style={[styles.flatListRow, { textAlign: 'center', fontWeight: 'bold' }]}>CNF</Rtext>
                                    <Rtext style={[styles.flatListRow, { textAlign: 'center', fontWeight: 'bold' }]}>ACT</Rtext>
                                    <Rtext style={[styles.flatListRow, { textAlign: 'center', fontWeight: 'bold' }]}>RCV</Rtext>
                                    <Rtext style={[styles.flatListRow, { textAlign: 'center', fontWeight: 'bold' }]}>DEC</Rtext>
                                </Animatable.View>


                            </>
                        }
                        data={stateData}
                        keyExtractor={(item) => item.statecode}
                        showsVerticalScrollIndicator={false}

                        renderItem={({ item, index }) => {
                            return (
                                <Animatable.View style={styles.boxContainerRow} animation="bounceIn" duration={ANIM_DURATION}>
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

                                </Animatable.View>
                            )
                        }}
                    >

                    </FlatList>



                </>
            }

        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    boxStyle: { backgroundColor: 'white', padding: 10, borderRadius: 8, alignItems: 'center', margin: 3 },
    boxContainer: { justifyContent: 'space-around', flexDirection: "row", backgroundColor: 'white', padding: 8, borderRadius: 8, margin: 3, elevation: 1 },
    boxContainerRow: { justifyContent: 'space-around', flexDirection: "row", padding: 8, margin: 3, borderRadius: 5, alignItems: 'center', backgroundColor: 'white' },
    flatListRow: { width: flatListRowWidth - 10, fontSize: 14 },
    // boxStyleFour: { backgroundColor: 'white', padding: 8, borderRadius: 8, alignItems: 'center', marginVertical: 3 },
    boxStyleFour: { alignItems: 'center' },
})