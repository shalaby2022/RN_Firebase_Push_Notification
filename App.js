import React, {useContext, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Chat from './src/screens/Chat/Chat';
import Home from './src/screens/Home/Home';
import SignIn from './src/screens/SignIn/SignIn';
import SignUp from './src/screens/SignUp/SignUp';
import styles from './styles';
import {
  AuthenticatedUserContext,
  AuthenticatedUserProvider,
} from './src/Context/AuthContext';
import auth from '@react-native-firebase/auth';
import PushNotification from './src/utils/PushNotification';

const Stack = createNativeStackNavigator();

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
  PushNotification();
  const {user, setUser, isLoading} = useContext(AuthenticatedUserContext);
  const onAuthStateChanged = user => {
    setUser(user);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

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
