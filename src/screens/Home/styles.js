import {StyleSheet} from 'react-native';
import colors from '../../../colors';

export default () =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      backgroundColor: '#fff',
    },
    chatButton: {
      backgroundColor: colors.primary,
      height: 50,
      width: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: colors.primary,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.9,
      shadowRadius: 8,
      marginRight: 20,
      marginBottom: 50,
    },
    icon: {
      width: 24,
      height: 24,
    },
    catImg: {
      width: 40,
      height: 40,
      marginRight: 15,
    },
  });
