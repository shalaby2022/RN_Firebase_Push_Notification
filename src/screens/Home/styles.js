import {StyleSheet} from 'react-native';
import colors from '../../../colors';

export default () =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10,
      paddingTop: 15,
      backgroundColor: '#fff',
    },
    chatButton: {
      position: 'absolute',
      bottom: 5,
      right: 15,
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
    chatIcon: {
      width: 24,
      height: 24,
      tintColor: colors.mediumGray,
    },
    catImg: {
      width: 40,
      height: 40,
      marginRight: 15,
    },
    userChat: {
      width: '100%',
      height: 60,
      marginBottom: 10,
      padding: 10,
      backgroundColor: '#eee',
      flexDirection: 'row',
      alignItems: 'center',
    },
    imgWrapper: {
      width: 40,
      height: 40,
      borderRadius: 15,
      marginRight: 20,
    },
    userImg: {
      width: '100%',
      height: '100%',
    },
    username: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
