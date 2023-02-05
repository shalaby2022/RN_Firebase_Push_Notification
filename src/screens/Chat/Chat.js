import React, {useState, useLayoutEffect, useCallback} from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import styles from './styles';
const logout = require('../../assets/logout.png');
import firestore from '@react-native-firebase/firestore';
import auth, {firebase} from '@react-native-firebase/auth';
import {toaster} from '../../utils/Toaster';

const Chat = ({navigation}) => {
  const [messages, setMessages] = useState([]);

  const onSignOut = () => {
    auth()
      .signOut()
      .then(() =>
        toaster('signed out Successfully!', {color: 'orange', duration: 2000}),
      );
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
    const subscribe = firestore()
      .collection('chat')
      .where('user._id', 'in', [
        firebase.auth().currentUser.email,
        navigation?.getState()?.routes[1]?.params?.receiver?.email,
      ])
      .onSnapshot(querySnapshot => {
        setMessages(
          querySnapshot.docs.map(doc => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          })),
        );
      });

    return subscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    const {_id, createdAt, text, user} = messages[0];
    firestore().collection('chat').add({
      _id,
      createdAt,
      text,
      user,
      receiver: navigation?.getState()?.routes[1]?.params?.receiver?.email,
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
        _id: firebase.auth()?.currentUser?.email,
      }}
    />
  );
};

export default Chat;
