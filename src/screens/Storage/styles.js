import {StyleSheet} from 'react-native';

export default () =>
  StyleSheet.create({
    btnsWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
    },
    btnStyle: {
      width: 150,
      height: 40,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#f00',
      borderRadius: 10,
      marginVertical: 15,
      alignSelf: 'center',
      justifyContent: 'center',
    },
    btnText: {
      color: '#f00',
      fontSize: 15,
      fontWeight: 'bold',
    },
    imgStyles: {
      width: 100,
      height: 100,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#f00',
      alignSelf: 'center',
      marginVertical: 10,
    },
    sendBtnStyle: {
      width: 200,
      height: 40,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#0cf',
      borderRadius: 10,
      marginVertical: 15,
      alignSelf: 'center',
      justifyContent: 'center',
    },
    sendBtnText: {
      color: '#0cf',
      fontSize: 15,
      fontWeight: 'bold',
    },
    uploadedText: {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#00f',
    },
    uploadWrapper: {
      alignItems: 'center',
    },
  });
