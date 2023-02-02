import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
const catImageUrl =
  'https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d';
const chatImg = require('../../assets/messenger.png');
const profil = require('../../assets/profile.png');
// firestore
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';

const Home = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Image
          source={require('../../assets/search.png')}
          style={[styles().icon, {marginLeft: 15}]}
        />
      ),
      headerRight: () => (
        <Image source={{uri: catImageUrl}} style={styles().catImg} />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await firebase.auth().currentUser;
      console.log(currentUser.email, 'currentUser');
      console.log(currentUser, 'currentUser');
      const users = await (
        await firestore()
          .collection('Users')
          .where('email', '!=', currentUser.email)
          .get()
      ).docs;
      setUsers(users);
    };
    fetchData();
  }, []);

  return (
    <View style={styles().container}>
      {users &&
        users.map((user, ind) => (
          <TouchableOpacity
            key={ind}
            style={styles().userChat}
            onPress={() => console.log(user.data().username)}>
            <View style={styles().imgWrapper}>
              <Image source={profil} style={styles().userImg} />
            </View>
            <Text style={styles().username}>{user.data().username}</Text>
          </TouchableOpacity>
        ))}
      <TouchableOpacity
        onPress={() => navigation.navigate('Chat')}
        style={styles().chatButton}>
        <Image source={chatImg} style={styles().chatIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default Home;
