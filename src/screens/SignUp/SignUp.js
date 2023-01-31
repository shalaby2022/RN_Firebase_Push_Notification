import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import styles from './styles';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../config/firebase';
const backImage = require('../../assets/backImage.png');

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const HandleSignup = () => {
    if (email !== '' && password !== '') {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => console.log('Signup success'))
        .catch(err => Alert.alert('Login error', err.message));
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
