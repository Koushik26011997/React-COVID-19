import React from 'react';
import {Text} from 'react-native';
import {normalizeSize} from '../../utility/MyUtility';

const Rtext = ({
  style = {},
  normalizeFontSize = 0,
  fontSize = 14.5,
  lgFontSize = 0,
  smFontSize = 0,
  fontStyle = 'normal',
  children = '',
  color = '#353535',
  fontWeight = 'normal',
  numberOfLines = 0,
  onPress = null,
}) => {
  const cusStyle = {
    fontStyle,
    color,
    fontSize:
      normalizeFontSize == 0
        ? normalizeSize(fontSize, lgFontSize, smFontSize)
        : normalizeFontSize,
    fontWeight,
    fontFamily: 'LatoRegular',
  };

  return (
    <Text
      style={[cusStyle, style]}
      numberOfLines={numberOfLines}
      onPress={onPress}>
      {children}
    </Text>
  );
};

export {Rtext};
