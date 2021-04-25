import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {normalizeSize} from '../../utility/MyUtility';

const Input = ({
  value = '',
  onChangeText = () => {},
  autoFocus = false,
  onFocus = () => {},
  placeholder = '',
  secureTextEntry = false,
  border = '#1B95E0',
  style = {},
  search = false,
}) => {
  return (
    <View style={[styles.containerStyle, style]}>
      <TextInput
        defaultValue={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        autoFocus={autoFocus}
        style={[
          styles.inputStyle,
          {borderColor: border, paddingRight: search ? 20 : 15},
        ]}
        autoCorrect={false}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
      {search ? (
        <TouchableOpacity style={styles.searchIcon}>
          <Icon name="magnify" color="black" size={26}></Icon>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    marginBottom: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    backgroundColor: 'red',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  inputStyle: {
    padding: 12,
    fontSize: 16,
    borderRadius: 10,
    lineHeight: 20,
    color: 'black',
    width: Dimensions.get('window').width,
  },
  searchIcon: {
    // position: 'absolute',
    // right: normalizeSize(13),
    // top: normalizeSize(9, 12, 10),
  },
});

export {Input};
