import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import styles from './styles';
const backImg = require('../../assets/backImage.png');
import {AuthenticatedUserContext} from '../../Context/AuthContext';
// firebase auth
import auth from '@react-native-firebase/auth';
import {toaster} from '../../utils/Toaster';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setIsLoading} = useContext(AuthenticatedUserContext);

  const HandleLogin = () => {
    if (email !== '' && password !== '') {
      setIsLoading(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          setIsLoading(false);
          toaster('Login Success', {color: '#000', duration: 2000});
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            setIsLoading(false);
            toaster('That email address is already in use!', {
              color: '#000',
              duration: 2000,
            });
          } else if (
            error.code === 'auth/invalid-email' ||
            'auth/operation-not-allowrd'
          ) {
            setIsLoading(false);
            toaster('That email address is invalid!', {
              color: '#000',
              duration: 2000,
            });
          }
        });
    }
  };
  return (
    <SafeAreaView style={styles().container}>
      <Image source={backImg} style={styles().backImage} resizeMode="cover" />
      <View style={styles().whiteSheet} />
      <View style={styles().form}>
        <Text style={styles().title}>Log In</Text>
        <TextInput
          style={styles().input}
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles().input}
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity style={styles().button} onPress={HandleLogin}>
          <Text style={styles().SignInBtn}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles().haveNoAccView}>
          <Text style={styles().havNoAcc}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles().SignUpBtn}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar barStyle="light-content" />
    </SafeAreaView>
  );
};

export default SignIn;
