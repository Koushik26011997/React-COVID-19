import {useTheme} from '@react-navigation/native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import {ANIM_DURATION} from '../../Constant';
import {Rtext} from '../Rtext';

const CustomHeader = ({style, text, onPress = null}) => {
  const {colors, custom} = useTheme();
  return (
    <Animatable.View
      animation="fadeInRightBig"
      duration={ANIM_DURATION}
      style={[style, {backgroundColor: custom.header, padding: 6}]}>
      <Rtext
        style={{
          textAlign: 'center',
          paddingVertical: 3,
          fontWeight: 'bold',
          color: colors.text,
        }}
        onPress={onPress}>
        {text}
      </Rtext>
    </Animatable.View>
  );
};

export {CustomHeader};
