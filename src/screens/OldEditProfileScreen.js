import React, {useState, useEffect} from 'react';
import {
  NativeBaseProvider,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  TextArea,
} from 'native-base';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import AuthContext from '../../src/context/AuthContext';

function EditProfileScreen() {
  const {updateProfile} = React.useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const subscriber = firestore()
      .collection('profiles')
      .doc(auth().currentUser.uid)
      .onSnapshot(documentSnapshot => {
        const {description, location, username} = documentSnapshot.data();
        setDescription(description);
        setLocation(location);
        setUsername(username);
      });
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <NativeBaseProvider>
      <Box flex={1} p={2} w="90%" mx="auto">
        <Heading size="lg">Edit Profile</Heading>
        <Heading color="muted.400" size="xs">
          Edit your profile
        </Heading>

        <VStack space={2} mt={5}>
          <FormControl>
            <FormControl.Label
              _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
              Username
            </FormControl.Label>
            <Input value={username} onChangeText={setUsername} />
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
              Location
            </FormControl.Label>
            <Input value={location} onChangeText={setLocation} />
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
              Description
            </FormControl.Label>
            <TextArea
              value={description}
              onChangeText={setDescription}
              h={20}
            />
          </FormControl>
          <VStack space={2} mt={5}>
            <Button
              onPress={() => updateProfile({username, location, description})}>
              Update profile
            </Button>
          </VStack>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}

export default EditProfileScreen;
