import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  Share,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Spinner from 'react-native-loading-spinner-overlay';
import { Rtext } from '../common/Rtext';
import { ANIM_DURATION, CARD_ELEVATION } from '../Constant';
import { request } from '../service/common';
import {
  openUrl,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  showFlashMessage,
} from '../utility/MyUtility';
import { CustomHeader } from '../common/Header';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@react-navigation/native';
import { AuthContext } from '../service/context';
import ViewShot from 'react-native-view-shot';

const pageWidth = Dimensions.get('window').width - 12;

const News = ({ navigation }) => {
  const { viewContext } = React.useContext(AuthContext);
  const { colors, custom } = useTheme();
  const [loader, setLoader] = React.useState(false);
  const [data, setData] = React.useState({});

  useEffect(() => {
    getCurrentData();
  }, []);

  const getCurrentData = async () => {
    try {
      setLoader(true);
      let response = await request(
        'get',
        'http://newsapi.org/v2/top-headlines?country=in&apiKey=6bdb68bcc65e4d34a8cf334beaee8a1a&q=covid',
        true,
      );
      await setData(response.data.articles);
      // console.log(response.data);
      setLoader(false);
    } catch (e) {
      setLoader(false);
      console.log(e);
      showFlashMessage(e, '', 'danger');
    }
  };

  const shareItem = async item => {
    try {
      const result = await Share.share({
        message: item.description,
        title: item.title,
        url: item.url,
      });

      if (result.action === Share.sharedAction) {
        console.log('Post Shared');
      } else if (result.action === Share.dismissedAction) {
        console.log('Post cancelled');
      }
    } catch (error) {
      console.log(error.message);
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
          style={{ backgroundColor: colors.background }}>
          <FlatList
            ListHeaderComponent={<View style={{ marginTop: 6 }}></View>}
            showsVerticalScrollIndicator={false}
            data={data}
            extraData={data}
            keyExtractor={item => item.title}
            renderItem={({ item, index }) => {
              return (
                <Animatable.View
                  animation="fadeInRightBig"
                  duration={ANIM_DURATION}
                  style={{
                    marginHorizontal: 6,
                    width: pageWidth,
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
                    borderWidth: 0.6,
                    borderColor: colors.primary,
                  }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={{
                        uri: item.urlToImage,
                      }}
                      style={{
                        width: pageWidth / 3,
                        height: pageWidth / 4,
                        borderRadius: 3,
                      }}></Image>
                    <View style={{ width: pageWidth / 2, marginHorizontal: 10 }}>
                      <Rtext style={{ color: colors.text }} fontWeight={'bold'}>
                        {item.title}
                      </Rtext>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: pageWidth / 2,
                          flexWrap: 'wrap',
                        }}>
                        <Rtext
                          style={{
                            paddingTop: 8,

                            color: '#007BFF',
                            color: colors.text,
                          }}>
                          {item.source.name}
                        </Rtext>
                        <Rtext
                          style={{
                            paddingTop: 8,

                            color: '#007BFF',
                            color: colors.text,
                          }}>
                          {' | ' +
                            moment(item.publishedAt).format('Do MMM, hh:mm A')}
                        </Rtext>
                      </View>
                    </View>
                    <TouchableOpacity onPress={() => shareItem(item)}>
                      <Icon
                        name="share-circle"
                        size={24}
                        style={{ color: colors.text }}></Icon>
                    </TouchableOpacity>
                  </View>

                  <Rtext
                    style={{ paddingTop: 8, color: colors.text }}>
                    {item.description}
                    <Rtext
                      onPress={() => openUrl(item.url)}
                      style={{
                        paddingTop: 8,

                        color: custom.answer,
                      }}>
                      {' '}
                      Read More...
                    </Rtext>
                  </Rtext>
                </Animatable.View>
              );
            }}></FlatList>
        </ViewShot>
      )}
    </View>
  );
};

export default News;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
