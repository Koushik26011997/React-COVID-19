import React from 'react';
import {View, StyleSheet, FlatList, Dimensions, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CustomHeader} from '../common/Header';
import {Rtext} from '../common/Rtext';
import {CARD_ELEVATION, FAQ_DATA} from '../Constant';
import {useTheme} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import {ANIM_DURATION} from '../Constant';

const FAQ = ({navigation}) => {
  const {colors, custom} = useTheme();

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={<View style={{marginTop: 6}}></View>}
        data={FAQ_DATA.faq}
        keyExtractor={item => item.qno}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <Animatable.View
              animation="bounceIn"
              duration={ANIM_DURATION}
              style={{
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
              }}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  size={16}
                  color={colors.text}
                  name="help-circle"
                  style={{marginRight: 3}}
                />
                <Rtext style={{marginRight: 16, color: colors.text}}>
                  {item.question}
                </Rtext>
              </View>

              <View
                style={{
                  paddingVertical: 6,
                  flexDirection: 'row',
                  width: Dimensions.get('window').width - 38,
                }}>
                <Icon
                  size={18}
                  color={custom.answer}
                  name="hand-pointing-right"
                  style={{marginRight: 3}}
                />

                <Rtext style={{marginRight: 6, color: custom.answer}}>
                  {item.answer}
                </Rtext>
              </View>
            </Animatable.View>
          );
        }}></FlatList>
    </View>
  );
};

export default FAQ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
