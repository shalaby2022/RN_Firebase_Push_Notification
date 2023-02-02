import {StyleSheet} from 'react-native';
import colors from '../../../colors';

export default () =>
  StyleSheet.create({
    headerRight: {
      marginRight: 10,
    },
    logOutIcon: {
      width: 26,
      height: 26,
      marginRight: 10,
      tintColor: colors.gray,
    },
    textInputStyle: {
      backgroundColor: '#fff',
      borderRadius: 20,
    },
    messagesContainerStyle: {
      width: '95%',
      backgroundColor: colors.mediumGray,
    },
  });
