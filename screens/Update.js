import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList, Dimensions} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {CustomHeader} from '../common/Header';
import {Rtext} from '../common/Rtext';
import {ANIM_DURATION, TAB_BAR_ICON_SIZE} from '../Constant';
import {request} from '../service/common';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  showFlashMessage,
} from '../utility/MyUtility';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import {useTheme} from '@react-navigation/native';
import {CARD_ELEVATION} from '../Constant';
import {AuthContext} from '../service/context';
import ViewShot from 'react-native-view-shot';

const Update = ({navigation}) => {
  const {viewContext} = React.useContext(AuthContext);
  const [loader, setLoader] = React.useState(false);
  const [data, setData] = React.useState([]);
  const {colors, custom} = useTheme();

  useEffect(() => {
    getCurrentUpdateData();
  }, []);

  const getCurrentUpdateData = async () => {
    try {
      setLoader(true);
      let response = await request('get', 'updatelog/log.json');
      await setData(response.data.reverse());
      setLoader(false);
    } catch (e) {
      setLoader(false);
      console.log(e);
      showFlashMessage(e, '', 'danger');
    }
  };

  const Separator = () => {
    <View style={{backgroundColor: colors.text, height: 0.6}}></View>;
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
            data={data}
            keyExtractor={item => item.timestamp}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View
                style={{
                  margin: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Rtext style={{fontSize: 16, color: colors.text}}>
                  Total {data?.length} updates found
                </Rtext>
              </View>
            }
            renderItem={({item, index}) => {
              return (
                <Animatable.View
                  animation="bounceIn"
                  duration={ANIM_DURATION}
                  style={{
                    elevation: CARD_ELEVATION,
                    marginBottom: 6,
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
                  <View
                    style={{
                      padding: 6,
                      flexDirection: 'row',
                      width: Dimensions.get('window').width - 8,
                    }}>
                    <View>
                      <Rtext
                        style={{
                          marginRight: 16,
                          color: colors.text,
                        }}>
                        {'#' + (index + 1)}. {item.update}
                      </Rtext>

                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon
                          name="update"
                          size={18}
                          style={{color: colors.text}}></Icon>

                        <Rtext
                          style={{
                            marginLeft: 3,
                            color: colors.text,
                          }}>
                          Last updated on:{' '}
                          {moment(item.timestamp * 1000).format(
                            'Do MMMM, YYYY hh:mm A',
                          )}
                        </Rtext>
                      </View>
                    </View>
                  </View>
                </Animatable.View>
              );
            }}></FlatList>
        </ViewShot>
      )}
    </View>
  );
};

export default Update;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
