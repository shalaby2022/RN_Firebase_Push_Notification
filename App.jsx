import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const App = () => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission({
      alert: true,
      announcement: false,
      badge: true,
      carPlay: true,
      provisional: false,
      sound: true,
    });
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const fcmToken = await messaging().getToken();
      console.log('fcmToken', fcmToken);
      console.log('Authorization status:', authStatus);
    }
    console.log('authStatus', authStatus);
  }

  useEffect(() => {
    requestUserPermission();
    PushNotification.createChannel(
      {
        channelId: 'channel-id', // (required)
        channelName: 'My channel', // (required)
        playSound: true, // (optional) default: true
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('messaging', remoteMessage);
      PushNotification.localNotification({
        channelId: 'channel-id',
        title: remoteMessage.notification.title, // (optional)
        message: remoteMessage.notification.body, // (required)
        playSound: true, // (optional) default: true
        soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      });
    });

    return unsubscribe;
  }, []);

  PushNotification.configure({
    onRegister: function (token) {
      console.warn('TOKEN:', token);
    },
    onNotification: async function (notification) {
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    onAction: function (notification) {
      console.log('onAction');
    },
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  return (
    <SafeAreaView style={styles.Container}>
      <Text style={styles.sectionDescription}>
        Edit <Text style={styles.highlight}>App.jsx</Text> to change this screen
        and then come back to see your edits.
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    marginTop: 32,
    padding: 10,
    alignSelf: 'center',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    color: 'red',
    fontWeight: '700',
  },
});

export default App;
