import React, {useState, useEffect, useLayoutEffect, useCallback} from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
const logout = require('../../assets/logout.png');
import firestore from '@react-native-firebase/firestore';
import auth, {firebase} from '@react-native-firebase/auth';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const onSignOut = () => {
    auth()
      .signOut()
      .then(() => console.log('signed out Successfully!'));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles().headerRight} onPress={onSignOut}>
          <Image source={logout} style={styles().logOutIcon} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const collectionRef = firestore()
      .collection('chat')
      // .orderBy('createdAt', 'desc')
      .get();

    console.log(collectionRef, 'collectionRef');

    // const unsubscribe = onSnapshot(querySnapshot => {
    // console.log('querySnapshot unsusbscribe');
    // setMessages(
    //   querySnapshot.docs.map(doc => ({
    //     _id: doc.data()._id,
    //     createdAt: doc.data().createdAt.toDate(),
    //     text: doc.data().text,
    //     user: doc.data().user,
    //   })),
    // );
    // });
    // return unsubscribe;
  }, []);

  useEffect(() => {
    const getUSer = async () => {
      const currentUser = await firebase.auth().currentUser;
      console.log(currentUser.displayName, 'id');
    };
    getUSer();
  }, []);
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    // setMessages([...messages, ...messages]);
    const {_id, createdAt, text, user} = messages[0];
    firestore()
      .collection('chat')
      .add({
        _id,
        createdAt,
        text,
        user: {
          _id: '1',
          displayName: 'username1',
        },
      });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      onSend={messages => onSend(messages)}
      messagesContainerStyle={styles().messagesContainerStyle}
      textInputStyle={styles().textInputStyle}
      user={{
        _id: firebase.auth().currentUser?.displayName,
        //   avatar: 'https://i.pravatar.cc/300',
      }}
    />
  );
};

export default Chat;
