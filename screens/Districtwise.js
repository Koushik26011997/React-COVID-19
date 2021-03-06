import React, { useContext, useEffect } from 'react';
import {
  View,
  StyleSheet,
  LogBox,
  ToastAndroid,
  Alert,
  FlatList,
  TouchableOpacity,
  Platform,
  Dimensions,
  RefreshControl,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Rtext } from '../common/Rtext';
import { request } from '../service/common';
import {
  formatNumber,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  showFlashMessage,
} from '../utility/MyUtility';
import * as Animatable from 'react-native-animatable';
import { ANIM_DURATION } from '../Constant';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../service/context';
import ViewShot from 'react-native-view-shot';
import { LocalizationContext } from '../common/Translations';

const devWidth = Dimensions.get('window').width;

const Districtwise = ({ navigation }) => {
  const { viewContext } = React.useContext(AuthContext);
  const { colors, custom } = useTheme();
  const [refreshing, setRefreshing] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [showDistricts, setshowDistricts] = React.useState(-1);
  const [sort, setSort] = React.useState('confirmed');
  const [desc, setDesc] = React.useState(true);
  //
  const {
    translations,
    appLanguage,
    setAppLanguage,
    initializeAppLanguage,
  } = useContext(LocalizationContext); // 1
  initializeAppLanguage(); // 2
  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);
      let response = await request('get', 'v2/state_district_wise.json');
      await setData(response.data);
      setRefreshing(false);
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(
          translations['Data refreshed successfully'],
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else {
        Alert.alert(translations['Data refreshed successfully']);
      }
    } catch (e) {
      setRefreshing(false);
      console.log(e);
      showFlashMessage(e, '', 'danger');
    }
  }, [refreshing]);

  useEffect(() => {
    setshowDistricts(-1);

    getCurrentData();

    const unsubscribe = navigation.addListener('focus', () => {
      setshowDistricts(-1);
    });
    return unsubscribe;
  }, [navigation]);

  const getCurrentData = async () => {
    try {
      setLoader(true);
      let response = await request('get', 'v2/state_district_wise.json');
      await setData(response.data);
      setLoader(false);
    } catch (e) {
      setLoader(false);
      // console.log(e);
      showFlashMessage(e, '', 'danger');
    }
  };

  const show = index => {
    if (index === showDistricts) {
      setshowDistricts(-1);
    } else if (index != -1) {
      setshowDistricts(index);
    } else {
      setshowDistricts(-1);
    }
  };

  const setOrdering = type => {
    setSort(type);
    if (type === sort) setDesc(!desc);
    else setDesc(true);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {loader ? (
        <Spinner visible={loader} />
      ) : (
        <ViewShot
          ref={viewContext}
          options={{
            format: 'jpg',
            quality: 1,
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
          }}
          style={{ backgroundColor: colors.background }}>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={item => item.state.toString()}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    width: devWidth - 8,
                    padding: 8,
                    borderColor: colors.primary,
                    borderRadius: 6,
                    borderWidth: 0.6,
                    margin: 3,
                  }}>
                  <TouchableOpacity
                    onPress={() => show(index)}
                    style={{
                      flexDirection: 'row',
                      justifyContent:
                        showDistricts !== index ? 'space-between' : 'center',
                      alignItems: 'center',
                    }}>
                    <Rtext
                      fontWeight={'bold'}
                      style={
                        showDistricts === index
                          ? {
                            textAlign: 'center',
                            fontSize: 16,

                            color: colors.text,
                          }
                          : { color: colors.text }
                      }>
                      {translations[item.state]}
                    </Rtext>
                    {showDistricts !== index && (
                      <Icon
                        size={20}
                        color={colors.text}
                        name="arrow-right-circle"
                      />
                    )}
                  </TouchableOpacity>

                  {showDistricts === index && (
                    <FlatList
                      ListHeaderComponent={
                        <Animatable.View
                          style={[
                            styles.boxContainerRow,
                            { marginTop: 10, backgroundColor: colors.card },
                          ]}
                          animation="fadeInRightBig"
                          duration={ANIM_DURATION}>
                          <Rtext
                            fontWeight={'bold'}
                            style={[
                              {
                                color: colors.text,
                                width: devWidth / 5 + 20,
                                fontSize: 14,
                              },
                            ]}>
                            {translations['DISTRICT']}
                          </Rtext>
                          <TouchableOpacity
                            onPress={() => setOrdering('confirmed')}
                            style={
                              sort === 'confirmed'
                                ? [
                                  styles.selectedBlock,
                                  { backgroundColor: '#A7A7A7' },
                                ]
                                : styles.selectedBlock
                            }>
                            <Icon
                              size={20}
                              color={colors.text}
                              name="swap-vertical-circle"
                            />
                            <Rtext
                              fontWeight={'bold'}
                              style={[
                                {
                                  fontSize: 14,
                                  marginLeft: 3,
                                  textAlign: 'center',

                                  color: colors.text,
                                },
                              ]}>
                              {translations['CNF']}
                            </Rtext>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => setOrdering('active')}
                            style={
                              sort === 'active'
                                ? [
                                  styles.selectedBlock,
                                  { backgroundColor: '#A7A7A7' },
                                ]
                                : styles.selectedBlock
                            }>
                            <Icon
                              size={20}
                              color={colors.text}
                              name="swap-vertical-circle"
                            />
                            <Rtext
                              fontWeight={'bold'}
                              style={[
                                {
                                  fontSize: 14,
                                  marginLeft: 3,
                                  textAlign: 'center',

                                  color: colors.text,
                                },
                              ]}>
                              {translations['ACT']}
                            </Rtext>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => setOrdering('recovered')}
                            style={
                              sort === 'recovered'
                                ? [
                                  styles.selectedBlock,
                                  { backgroundColor: '#A7A7A7' },
                                ]
                                : styles.selectedBlock
                            }>
                            <Icon
                              size={20}
                              color={colors.text}
                              name="swap-vertical-circle"
                            />
                            <Rtext
                              fontWeight={'bold'}
                              style={[
                                {
                                  fontSize: 14,
                                  marginLeft: 3,
                                  textAlign: 'center',

                                  color: colors.text,
                                },
                              ]}>
                              {translations['RCV']}
                            </Rtext>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => setOrdering('deceased')}
                            style={
                              sort === 'deceased'
                                ? [
                                  styles.selectedBlock,
                                  { backgroundColor: '#A7A7A7' },
                                ]
                                : styles.selectedBlock
                            }>
                            <Icon
                              size={20}
                              color={colors.text}
                              name="swap-vertical-circle"
                            />
                            <Rtext
                              style={[
                                {
                                  fontSize: 14,
                                  marginLeft: 3,
                                  textAlign: 'center',
                                  fontWeight: 'bold',
                                  color: colors.text,
                                },
                              ]}>
                              {translations['DEC']}
                            </Rtext>
                          </TouchableOpacity>
                        </Animatable.View>
                      }
                      showsVerticalScrollIndicator={false}
                      // data={item.districtData}
                      data={item.districtData.sort((a, b) => {
                        if (desc) return parseInt(a[sort]) < parseInt(b[sort]);
                        else return parseInt(a[sort]) > parseInt(b[sort]);
                      })}
                      keyExtractor={item => item.district.toString()}
                      renderItem={({ item, index }) => {
                        return (
                          <Animatable.View
                            style={[
                              styles.boxContainerRow,
                              { backgroundColor: colors.card },
                            ]}
                            animation="fadeInRightBig"
                            duration={ANIM_DURATION}>
                            <Rtext
                              fontWeight={'bold'}
                              style={[
                                {
                                  color: colors.text,
                                  width: devWidth / 5 + 20,
                                },
                              ]}>
                              {translations[item.district] +
                                '\n' +
                                '(' +
                                translations['Rank'] +
                                ': #' +
                                (index + 1) +
                                ')'}
                            </Rtext>

                            <View>
                              <Rtext
                                style={[
                                  styles.flatListRow,
                                  { textAlign: 'center', color: colors.text },
                                ]}>
                                {formatNumber(item.confirmed)}
                              </Rtext>
                              {item.delta.confirmed !== '0' && (
                                <Rtext
                                  style={[
                                    styles.flatListRow,
                                    {
                                      color: custom.confirm,
                                      textAlign: 'center',
                                    },
                                  ]}>
                                  [+{formatNumber(item.delta.confirmed)}]
                                </Rtext>
                              )}
                            </View>

                            <Rtext
                              style={[
                                styles.flatListRow,
                                { textAlign: 'center', color: colors.text },
                              ]}>
                              {formatNumber(item.active)}
                            </Rtext>

                            <View>
                              <Rtext
                                style={[
                                  styles.flatListRow,
                                  { textAlign: 'center', color: colors.text },
                                ]}>
                                {formatNumber(item.recovered)}
                              </Rtext>
                              {item.delta.recovered !== '0' && (
                                <Rtext
                                  style={[
                                    styles.flatListRow,
                                    { color: '#28a745', textAlign: 'center' },
                                  ]}>
                                  [+{formatNumber(item.delta.recovered)}]
                                </Rtext>
                              )}
                            </View>

                            <View>
                              <Rtext
                                style={[
                                  styles.flatListRow,
                                  { textAlign: 'center', color: colors.text },
                                ]}>
                                {formatNumber(item.deceased)}
                              </Rtext>
                              {item.delta.deceased !== '0' && (
                                <Rtext
                                  style={[
                                    styles.flatListRow,
                                    { color: custom.death, textAlign: 'center' },
                                  ]}>
                                  [+{formatNumber(item.delta.deceased)}]
                                </Rtext>
                              )}
                            </View>
                          </Animatable.View>
                        );
                      }}
                    />
                  )}
                </View>
              );
            }}></FlatList>
        </ViewShot>
      )}
    </View>
  );
};

export default Districtwise;

const styles = StyleSheet.create({
  flatListRow: { width: devWidth / 5 - 10 },
  boxContainerRow: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    padding: 8,
    marginVertical: 3,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  selectedBlock: {
    paddingVertical: 3,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: devWidth / 5 - 10,
    borderRadius: 6,
  },
});
