import 'react-native-gesture-handler';
import React, {useContext, useEffect, useState} from 'react';
import {View, ActivityIndicator, Text} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Chat from './src/screens/Chat/Chat';
import Home from './src/screens/Home/Home';
import SignIn from './src/screens/SignIn/SignIn';
import SignUp from './src/screens/SignUp/SignUp';
import styles from './styles';
import {
  AuthenticatedUserContext,
  AuthenticatedUserProvider,
} from './src/Context/AuthContext';

// firebase auth
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

const ChatStack = () => {
  return (
    <Stack.Navigator defaultScreenOptions={Home}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={SignIn} />
      <Stack.Screen name="Signup" component={SignUp} />
    </Stack.Navigator>
  );
};

const RootNavigator = () => {
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
      console.log('messaging', remoteMessage);
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

  const {user, setUser, isLoading} = useContext(AuthenticatedUserContext);

  const onAuthStateChanged = user => {
    setUser(user);
  };

  useEffect(() => {
    const unsubscribeAuth = auth().onAuthStateChanged(onAuthStateChanged);
    return unsubscribeAuth;
  }, [user]);

  if (isLoading) {
    return (
      <View style={styles().AcivIndicator}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else
    return (
      <NavigationContainer>
        {user ? <ChatStack /> : <AuthStack />}
      </NavigationContainer>
    );
};

export default () => {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
};
