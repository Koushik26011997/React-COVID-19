import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Linking, Text, FlatList} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Rtext} from '../common/Rtext';
import {ANIM_DURATION} from '../Constant';
import {formatNumber, openUrl, showFlashMessage} from '../utility/MyUtility';
import {useTheme} from '@react-navigation/native';
import {request} from '../service/common';
import {CustomHeader} from '../common/Header';
import Spinner from 'react-native-loading-spinner-overlay';

// https://coronavirus-19-api.herokuapp.com/countries

const Worldmeter = ({navigation}) => {
  const [loader, setLoader] = React.useState(false);
  const [data, setData] = React.useState([]);
  const {colors, custom} = useTheme();

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
      // console.log(response.data);
      setLoader(false);
    } catch (e) {
      setLoader(false);
      console.log(e);
      showFlashMessage(e, '', 'danger');
    }
  };

  return (
    <View style={styles.container}>
      {loader ? (
        <Spinner visible={loader} />
      ) : (
        <FlatList
          ListHeaderComponent={
            <CustomHeader
              style={{margin: 12}}
              text="World Meter!"></CustomHeader>
          }
          ListFooterComponent={<View style={{height: 10}}></View>}
          data={data}
          keyExtractor={item => item.country}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <Animatable.View
                animation="bounceIn"
                duration={ANIM_DURATION}
                style={{marginBottom: 6, padding: 8}}>
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
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
});
