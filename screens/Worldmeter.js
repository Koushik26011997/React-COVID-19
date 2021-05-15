import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Rtext} from '../common/Rtext';
import {ANIM_DURATION, CARD_ELEVATION} from '../Constant';
import {
  formatNumber,
  openUrl,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  showFlashMessage,
} from '../utility/MyUtility';
import {useTheme} from '@react-navigation/native';
import {request} from '../service/common';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../service/context';
import ViewShot from 'react-native-view-shot';

const Worldmeter = ({navigation}) => {
  const {viewContext} = React.useContext(AuthContext);
  const [loader, setLoader] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const {colors, custom} = useTheme();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getCurrentUpdateData();
  }, []);

  const getCurrentUpdateData = async () => {
    try {
      setLoader(true);
      let response = await request(
        'get',
        'https://coronavirus-19-api.herokuapp.com/countries',
        true,
      );
      await setData(response.data);
      await setFilteredDataSource(response.data);
      setLoader(false);
    } catch (e) {
      setLoader(false);
      console.log(e);
      showFlashMessage(e, '', 'danger');
    }
  };

  const searchCountry = text => {
    const formattedQuery = text.toLowerCase();
    if (formattedQuery) {
      const tempData = data.filter(item => {
        return item.country.toString().toLowerCase().includes(formattedQuery);
      });
      setSearchText(text);
      setFilteredDataSource(tempData);
    } else {
      setSearchText('');
      Keyboard.dismiss();
      setFilteredDataSource(data);
    }
  };

  return (
    <View style={styles.container}>
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
          style={{backgroundColor: colors.background}}>
          <FlatList
            ListHeaderComponent={
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  borderColor: colors.primary,
                  borderWidth: 1,
                  borderRadius: 8,
                  margin: 8,
                }}>
                <TextInput
                  value={searchText}
                  style={{
                    height: 40,
                    paddingLeft: 12,
                    width: Dimensions.get('window').width - 42,
                    fontFamily: 'LatoRegular',
                    fontSize: 16,
                    color: colors.text,
                  }}
                  placeholder="Search by country name"
                  placeholderTextColor="gray"
                  onChangeText={text => searchCountry(text)}
                />
                <TouchableOpacity
                  style={{marginRight: 8}}
                  onPress={() => searchCountry('')}>
                  {searchText === '' ? (
                    <Icon name="magnify" color={colors.text} size={24}></Icon>
                  ) : (
                    <Icon
                      name="close-circle"
                      color={colors.text}
                      size={24}></Icon>
                  )}
                </TouchableOpacity>
              </View>
            }
            ListFooterComponent={<View style={{height: 10}}></View>}
            data={filteredDataSource}
            keyExtractor={item => item.country}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 12,
                }}>
                <Rtext style={{color: colors.text}}>
                  Sorry, No Country Found
                </Rtext>
              </View>
            }
            renderItem={({item, index}) => {
              return (
                <Animatable.View
                  animation="bounceIn"
                  duration={ANIM_DURATION}
                  style={{
                    marginHorizontal: 6,
                    width: Dimensions.get('window').width - 12,
                    padding: 6,
                    marginBottom: 6,
                    elevation: CARD_ELEVATION,
                    shadowColor: colors.card,
                    shadowOffset: {
                      width: 0,
                      height: 10,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 20,
                    backgroundColor: colors.card,
                    borderRadius: 3,

                    borderColor: colors.primary,
                    borderWidth: 0.6,
                  }}>
                  <Rtext style={{textAlign: 'center', color: colors.text}}>
                    {item.country + ' [' + formatNumber(item.cases) + ']'}
                  </Rtext>
                  <View
                    style={{
                      backgroundColor: colors.text,
                      height: 0.6,
                      marginVertical: 3,
                    }}></View>
                  <View style={styles.viewStyle}>
                    <Rtext style={{color: colors.text}}>Active</Rtext>
                    <Rtext style={{color: colors.text}}>
                      {formatNumber(item.active)}
                    </Rtext>
                  </View>

                  <View style={styles.viewStyle}>
                    <Rtext style={{color: colors.text}}>Recovered</Rtext>
                    <Rtext style={{color: colors.text}}>
                      {formatNumber(item.recovered)}
                    </Rtext>
                  </View>

                  <View style={styles.viewStyle}>
                    <Rtext style={{color: colors.text}}>Deaths</Rtext>
                    <Rtext style={{color: colors.text}}>
                      {formatNumber(item.deaths)}
                    </Rtext>
                  </View>
                  <View style={styles.viewStyle}>
                    <Rtext style={{color: colors.text}}>Critical Cases</Rtext>
                    <Rtext style={{color: colors.text}}>
                      {formatNumber(item.critical)}
                    </Rtext>
                  </View>
                  <View style={styles.viewStyle}>
                    <Rtext style={{color: colors.text}}>Tested</Rtext>
                    <Rtext style={{color: colors.text}}>
                      {formatNumber(item.totalTests)}
                    </Rtext>
                  </View>

                  <View style={styles.viewStyle}>
                    <Rtext style={{color: colors.text}}>Today's Case(s)</Rtext>
                    <Rtext style={{color: colors.text}}>
                      {formatNumber(item.todayCases)}
                    </Rtext>
                  </View>

                  <View style={styles.viewStyle}>
                    <Rtext style={{color: colors.text}}>Today's Death(s)</Rtext>
                    <Rtext style={{color: colors.text}}>
                      {formatNumber(item.todayDeaths)}
                    </Rtext>
                  </View>
                </Animatable.View>
              );
            }}></FlatList>
        </ViewShot>
      )}
    </View>
  );
};

export default Worldmeter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewStyle: {
    marginHorizontal: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
});
