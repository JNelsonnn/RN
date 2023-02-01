import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { NativeBaseProvider, Box, Text } from 'native-base';
import { firebase } from "@react-native-firebase/database";

let databaseUrl = null;
if (__DEV__) { databaseUrl = "http://localhost:9000/?ns=piplens-mobile-app" }
const database = () => firebase.app().database(databaseUrl);

export function ChatScreen() {
  const [messages, setMessages] = useState([]);

  const room = '123'

  useEffect(() => {
    const onChildAdd = database()
      .ref(`/room/${room}/messages`)
      .on('child_added', snapshot => {
        console.log('A new node has been added', snapshot.val());
        setMessages(previousMessages => GiftedChat.append(previousMessages, [snapshot.val()]))
      });

      // Stop listening for updates when no longer required
    return () => database().ref(`/room/${room}/messages`).off('child_added', onChildAdd);
  }, [room]);

  const onSend = useCallback((messages = []) => {
    const { _id, text, createdAt, user } = messages[0];
    database()
      .ref(`/room/${room}/messages/${_id}`)
      .set({
        _id: _id,
        text: text,
        createdAt: createdAt.getTime(),
        user: user
      })
      .then(() => {
        console.log('Data saved.')
      })
  }, [])

  return (
    <NativeBaseProvider>
      <Box height={500} bg="primary.400">
        <Text>hello</Text>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        <Text>hello</Text>
      </Box>
    </NativeBaseProvider>
  )
}
