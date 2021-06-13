import React, {useContext, useEffect} from 'react';
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
import {
  openUrl,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  showFlashMessage,
} from '../utility/MyUtility';
import {useTheme} from '@react-navigation/native';
import {CustomHeader} from '../common/Header';
import {request} from '../service/common';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CARD_ELEVATION} from '../Constant';
import {AuthContext} from '../service/context';
import ViewShot from 'react-native-view-shot';
import {LocalizationContext} from '../common/Translations';

// https://api.covid19india.org/crowdsourced_resources_links.json

const Resources = ({navigation}) => {
  const {viewContext} = React.useContext(AuthContext);
  const {colors, custom} = useTheme();
  const [loader, setLoader] = React.useState(false);
  const [data, setData] = React.useState([]);

  const {
    translations,
    appLanguage,
    setAppLanguage,
    initializeAppLanguage,
  } = useContext(LocalizationContext); // 1
  initializeAppLanguage(); // 2

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
        // justifyContent: 'center',
      }}>
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
                  {translations['About Resources']}
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
                        fontWeight={'bold'}
                        style={{
                          marginRight: 6,
                          paddingRight: 8,
                          color: colors.text,
                        }}>
                        {item.description || 'Independent Aggregator'}
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
        </ViewShot>
      )}
    </View>
  );
};

export default Resources;

const styles = StyleSheet.create({});
