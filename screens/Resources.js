import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Text,
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
import {CARD_ELEVATION} from '../Constant';

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
        justifyContent: 'center',
      }}>
      {loader ? (
        <Spinner visible={loader} />
      ) : (
        <>
          <FlatList
            ListHeaderComponent={
              <Animatable.View
                animation="bounceIn"
                duration={ANIM_DURATION}
                style={{
                  padding: 6,
                  margin: 6,
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
                <Text
                  style={{
                    fontFamily: 'LatoBold',
                    fontSize: 16,
                    lineHeight: 24,
                    color: colors.text,
                  }}>
                  ***The objective of this page is to help people gain access to
                  vital resources by sharing information only. We strongly
                  encourage to AVOID black market.
                </Text>
              </Animatable.View>
            }
            data={data}
            keyExtractor={item => item.link}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <Animatable.View
                  animation="bounceIn"
                  duration={ANIM_DURATION}
                  style={{
                    padding: 6,
                    marginBottom: 6,
                    marginHorizontal: 6,
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
                  <TouchableOpacity onPress={() => openUrl(item.link)}>
                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        size={16}
                        color={custom.confirm}
                        name="cards-heart"
                        style={{marginRight: 3}}
                      />
                      <Rtext
                        style={{
                          marginRight: 6,
                          paddingRight: 8,
                          color: colors.text,
                        }}>
                        {item.description}
                      </Rtext>
                    </View>
                    <Rtext
                      style={{
                        marginRight: 6,
                        marginTop: 3,
                        paddingRight: 8,
                        color: custom.answer,
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
