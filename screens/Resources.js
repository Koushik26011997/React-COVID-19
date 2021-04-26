import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Rtext} from '../common/Rtext';
import {ANIM_DURATION} from '../Constant';
import {openUrl, showFlashMessage} from '../utility/MyUtility';
import {useTheme} from '@react-navigation/native';
import {CustomHeader} from '../common/Header';
import {request} from '../service/common';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// https://api.covid19india.org/crowdsourced_resources_links.json

const Resources = ({navigation}) => {
  const {colors, custom} = useTheme();
  const [loader, setLoader] = React.useState(false);
  const [data, setData] = React.useState([]);

  useEffect(() => {
    getCurrentData();
  }, [navigation]);

  const getCurrentData = async () => {
    try {
      setLoader(true);
      let response = await request(
        'get',
        'https://api.covid19india.org/crowdsourced_resources_links.json',
        true,
      );
      await setData(response.data.crowdsourcd_resources_links);
      console.log(response.data.crowdsourcd_resources_links);
      setLoader(false);
    } catch (e) {
      setLoader(false);
      console.log(e);
      showFlashMessage(e, '', 'danger');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: colors.background,
      }}>
      {loader ? (
        <Spinner visible={loader} />
      ) : (
        <>
          <FlatList
            ListHeaderComponent={
              <CustomHeader
                style={{margin: 12}}
                text="The objective of this page is to help people gain access to vital resources by sharing information only. However, we request the beneficiaries to use their discretion and verify the leads on their own before taking any action. If you find inaccurate information or any lead engaging in illegal practices, kindly inform us at hello@covid19india.org. We will take it down as soon as possible. We will not be responsible for the actions you take using the information on this page. We are just mediating information and are no way responsible for what is being shared. Please avoid sharing and contacting black market resources. We strongly encourage to AVOID black market."></CustomHeader>
            }
            ListFooterComponent={<View style={{height: 10}}></View>}
            data={data}
            keyExtractor={item => item.link}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <Animatable.View
                  animation="bounceIn"
                  duration={ANIM_DURATION}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    width: Dimensions.get('window').width,
                  }}>
                  <TouchableOpacity onPress={() => openUrl(item.link)}>
                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        size={14}
                        color={custom.confirm}
                        name="cards-heart"
                        style={{marginRight: 3}}
                      />
                      <Rtext
                        style={{
                          marginRight: 6,
                          fontSize: 14,
                          paddingRight: 8,
                          color: colors.text,
                        }}>
                        {item.description}
                      </Rtext>
                    </View>
                    <Rtext
                      style={{
                        marginRight: 6,
                        fontSize: 14,
                        paddingRight: 8,
                        color: colors.text,
                      }}>
                      {'=> ' + item.link}
                    </Rtext>
                  </TouchableOpacity>
                </Animatable.View>
              );
            }}></FlatList>
        </>
      )}
    </View>
  );
};

export default Resources;

const styles = StyleSheet.create({});
