import {Dimensions, Platform, PixelRatio, Linking} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import moment from 'moment';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export const normalizeSize = (size, lgSize = 0, smSize = 0) => {
  if (SCREEN_WIDTH >= 600) size = (lgSize != 0 ? lgSize : size) - 2;
  else if (SCREEN_WIDTH <= 330) size = (smSize != 0 ? smSize : size) - 1;

  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

export const openUrl = url => {
  if (url && url.trim() != '') {
    url = url.trim();
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  }
};

export const capitalize = s => {
  if (s == '') return '';
  return s[0].toUpperCase() + s.slice(1).toLowerCase();
};

export const fieldToLebel = field => {
  field = field.replace(/_/g, ' ');
  field = field.toUpperCase();
  return field;
};

export const showServerValidationError = response => {
  let errorMessage = '';
  for (const [key, value] of Object.entries(response)) {
    errorMessage += '* ' + fieldToLebel(key) + ' ' + value + '\n';
  }
  errorMessage = errorMessage.replace(/\n+$/, '');

  showFlashMessage(errorMessage, '', 'danger');
};

export const showYupFormValidationError = errors => {
  let errorMessage = '';
  for (const [key, value] of Object.entries(errors)) {
    errorMessage += '* ' + value.message + '\n';
  }
  errorMessage = errorMessage.replace(/\n+$/, '');
  if (errorMessage != '') showFlashMessage(errorMessage, '', 'danger');
};

export const showFlashMessage = (
  message = '',
  description = '',
  type = 'success',
  onPress = () => {},
  duration = 2000,
) => {
  showMessage({
    message: message,
    description: description,
    type: type,
    onPress,
    duration,
  });
};

export const formatNumber = number => {
  if (number !== '') {
    return parseInt(number).toLocaleString('en-IN');
  } else {
    return '';
  }
};

export const timeDiff = startDateTime => {
  if (startDateTime !== '') {
    var startTime = moment(startDateTime, 'DD/MM/YYYY HH:mm');
    var endTime = moment();
    var totalHours = endTime.diff(startTime, 'hours');
    var totalMinutes = endTime.diff(startTime, 'minutes');
    var clearMinutes = totalMinutes % 60;

    // console.log(totalHours + " hours and " + clearMinutes + " minutes");

    if (totalHours === 0) {
      if (clearMinutes === 1) return '(' + clearMinutes + ' Min ago)';
      else return '(' + clearMinutes + ' Mins ago)';
    } else if (totalHours === 1) {
      if (clearMinutes === 0) return '(' + totalHours + ' Hr ago)';
      else if (clearMinutes === 1)
        return '(' + totalHours + ' Hr & ' + clearMinutes + ' Min ago)';
      else return '(' + totalHours + ' Hr & ' + clearMinutes + ' Mins ago)';
    } else if (totalHours > 1) {
      if (clearMinutes === 0) return '(' + totalHours + ' Hrs ago)';
      else if (clearMinutes === 1)
        return '(' + totalHours + ' Hrs & ' + clearMinutes + ' Min ago)';
      else return '(' + totalHours + ' Hrs & ' + clearMinutes + ' Mins ago)';
    } else {
      return '(' + totalHours + ' Hrs & ' + clearMinutes + ' Mins ago)';
    }
  } else {
    return '';
  }
};
