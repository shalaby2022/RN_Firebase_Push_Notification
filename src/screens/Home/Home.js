import React, {useEffect} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
const catImageUrl =
  'https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d';
const chatImg = require('../../assets/messenger.png');

const Home = () => {
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

  return (
    <View style={styles().container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Chat')}
        style={styles().chatButton}>
        <Image source={chatImg} style={styles().icon} />
      </TouchableOpacity>
    </View>
  );
};

export default Home;
