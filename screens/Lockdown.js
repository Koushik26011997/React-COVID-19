import React from 'react';
import {View, StyleSheet, FlatList, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CARD_ELEVATION} from '../Constant';
import {Rtext} from '../common/Rtext';
import {FAQ_DATA} from '../Constant';
import * as Animatable from 'react-native-animatable';
import {ANIM_DURATION} from '../Constant';
import {useTheme} from '@react-navigation/native';

const Lockdown = ({navigation}) => {
  const {colors, custom} = useTheme();
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={<View style={{marginTop: 6}}></View>}
        data={FAQ_DATA.factoids}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <Animatable.View
              animation="bounceIn"
              duration={ANIM_DURATION}
              style={{
                width: Dimensions.get('window').width - 12,
                flexDirection: 'row',
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
              <Icon
                size={14}
                color={colors.text}
                name="checkbox-multiple-blank-circle"
                style={{marginRight: 3}}
              />
              <Rtext
                style={{
                  marginRight: 6,
                  paddingRight: 8,
                  color: colors.text,
                }}>
                {item.banner}
              </Rtext>
            </Animatable.View>
          );
        }}></FlatList>
    </View>
  );
};

export default Lockdown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
