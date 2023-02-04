import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {useEffect} from 'react';

export default () => {
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
      // console.log('Authorization status:', authStatus);
    }
    // console.log('authStatus', authStatus);
  }

  useEffect(() => {
    requestUserPermission();
    messaging()
      .getInitialNotification()
      .then(remoteMessage =>
        remoteMessage ? console.log('remoteMessage') : null,
      );
    PushNotification.createChannel(
      {
        channelId: 'channel-2', // (required)
        channelName: 'My_channel', // (required)
        playSound: true, // (optional) default: true
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        soundName: 'thunder', // (optional) See `soundName` parameter of `localNotification` function
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const {body, title, data} = remoteMessage;
      console.log('messaging', remoteMessage, body, title, data);
      PushNotification.localNotification({
        channelId: 'channel-2',
        title: remoteMessage.notification.title, // (optional)
        message: remoteMessage.notification.body, // (required)
        playSound: true, // (optional) default: true
        soundName: 'thunder', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      });
    });

    return unsubscribe;
  }, []);

  PushNotification.configure({
    onRegister: function (TOKEN) {
      const {os, token} = TOKEN;
      console.warn('TOKEN:', token);
    },
    onNotification: async function (notification) {
      console.log('notification', notification);
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    onAction: function (notification) {
      console.log('onAction', notification);
    },
    onRegistrationError: function (err) {
      console.error('onRegistrationError', err.message, err);
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
};
