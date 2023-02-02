import React, {useState, useEffect, useLayoutEffect, useCallback} from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
const logout = require('../../assets/logout.png');
// firebase auth
import auth from '@react-native-firebase/auth';
// firestore
import firestore from '@react-native-firebase/firestore';

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
    const collectionRef = firestore().collection('chat');

    // const q = query(collectionRef, orderBy('createdAt', 'desc'));

    // const unsubscribe = onSnapshot(q, querySnapshot => {
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
    console.log('first');
  }, []);

  const onSend = useCallback((messages = []) => {
    // setMessages(previousMessages =>
    //   GiftedChat.append(previousMessages, messages)
    // );
    // // setMessages([...messages, ...messages]);
    // const { _id, createdAt, text, user } = messages[0];
    // addDoc(collection(database, 'chats'), {
    //   _id,
    //   createdAt,
    //   text,
    //   user
    // });
  }, []);

  return (
    <GiftedChat
      // messages={messages}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      // onSend={messages => onSend(messages)}
      messagesContainerStyle={styles().messagesContainerStyle}
      textInputStyle={styles().textInputStyle}
      // user={{
      //   _id: auth?.currentUser?.email,
      //   avatar: 'https://i.pravatar.cc/300',
      // }}
    />
  );
};

export default Chat;
