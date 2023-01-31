import {StyleSheet} from 'react-native';

export default () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: 'orange',
      alignSelf: 'center',
      paddingBottom: 24,
    },
    input: {
      backgroundColor: '#F6F7FB',
      height: 58,
      marginBottom: 20,
      fontSize: 16,
      borderRadius: 10,
      padding: 12,
    },
    backImage: {
      width: '100%',
      height: 340,
      position: 'absolute',
      top: 0,
      resizeMode: 'cover',
    },
    whiteSheet: {
      width: '100%',
      height: '75%',
      position: 'absolute',
      bottom: 0,
      backgroundColor: '#fff',
      borderTopLeftRadius: 60,
    },
    form: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 30,
    },
    button: {
      backgroundColor: '#f57c00',
      height: 58,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    SignUpBtn: {
      fontWeight: 'bold',
      color: '#fff',
      fontSize: 18,
    },
    SignInBtn: {
      color: '#f57c00',
      fontWeight: '600',
      fontSize: 14,
    },
    haveNoAccView: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
    },
    havNoAcc: {
      color: 'gray',
      fontWeight: '600',
      fontSize: 14,
    },
  });
