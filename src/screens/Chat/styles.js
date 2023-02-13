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
      width: '50%',
    },
    messagesContainerStyle: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.mediumGray,
    },
    btnStyle: {
      width: 150,
      height: 40,
      backgroundColor: '#f0f',
      borderRadius: 15,
      marginVertical: 50,
      alignSelf: 'center',
    },
    btnText: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      lineHeight: 35,
      color: '#fff',
    },
    image: {
      alignSelf: 'center',
      borderWidth: 2,
      borderColor: '#f9f',
      borderRadius: 10,
      width: 200,
      height: 200,
    },
  });
