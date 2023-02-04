import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, Text, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
const chatImg = require('../../assets/messenger.png');
const profil = require('../../assets/profile.png');
const catImageUrl =
  'https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';

const Home = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  //  listening for any change on usersData to be called in onSnap Method
  const onResult = QuerySnapshot => {
    let returned_users = [];
    QuerySnapshot.forEach(documentSnapshot => {
      returned_users.push(documentSnapshot.data());
      setUsers(returned_users);
    });
  };

  const onError = error => {
    console.error('error', error);
  };

  //  initializing users in Homescreen
  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await firebase.auth().currentUser;
      firestore()
        .collection('users')
        .where('email', '!=', currentUser.email)
        .onSnapshot(onResult, onError);
      setUsers(users);
    };
    fetchData();
  }, []);

  //  initializing header of Homescreen
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Image
          source={require('../../assets/search.png')}
          style={[styles().icon, {marginHorizontal: 13}]}
        />
      ),
      headerRight: () => (
        <Image source={{uri: catImageUrl}} style={styles().catImg} />
      ),
    });
  }, [navigation]);

  //   rendreing items of flat list
  const renderItem = ({item}) => {
    return (
      users && (
        <TouchableOpacity
          style={styles().userChat}
          onPress={() => console.log(item.displayName)}>
          <View style={styles().imgWrapper}>
            <Image source={profil} style={styles().userImg} />
          </View>
          <Text style={styles().username}>{item.displayName}</Text>
        </TouchableOpacity>
      )
    );
  };

  return (
    <View style={styles().container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item, ind) => ind.toString()}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('Chat')}
        style={styles().chatButton}>
        <Image source={chatImg} style={styles().chatIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default Home;
