import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
  SafeAreaView,
} from 'react-native';
import styles from './styles';
const backImage = require('../../assets/backImage.png');
// firebase auth
import auth from '@react-native-firebase/auth';
// firestore
import firestore from '@react-native-firebase/firestore';

const SignUp = ({navigation}) => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const HandleSignup = () => {
    if (email !== '' && password !== '') {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .then(
          firestore().collection('Users').add({
            email,
            username,
          }),
        )
        .catch(error => {
          if (error.Error === '[auth/email-already-in-use]') {
            console.log('That email address is already in use!');
          }
          if (
            error.Error === '[auth/invalid-email]' ||
            '[auth/operation-not-allowrd]'
          ) {
            console.log('That email address is invalid!');
          }
        });
    }
  };

  return (
    <View style={styles().container}>
      <Image source={backImage} style={styles().backImage} />
      <View style={styles().whiteSheet} />
      <SafeAreaView style={styles().form}>
        <Text style={styles().title}>Sign Up</Text>
        <TextInput
          style={styles().input}
          placeholder="Enter UserName"
          autoCapitalize="none"
          keyboardType="default"
          textContentType="username"
          autoFocus={true}
          value={username}
          onChangeText={text => setUserName(text)}
        />
        <TextInput
          style={styles().input}
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
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
        <TouchableOpacity style={styles().button} onPress={HandleSignup}>
          <Text style={styles().SignUpBtn}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles().haveNoAccView}>
          <Text style={styles().havNoAcc}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles().SignInBtn}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
};

export default SignUp;
