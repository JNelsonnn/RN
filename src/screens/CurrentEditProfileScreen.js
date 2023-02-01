import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import {
  NativeBaseProvider,
  Box,
  Button,
  Text,
  Image,
  Flex,
  Link,
  Heading,
  VStack,
  FormControl,
  Input,
  TextArea,
} from 'native-base';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AuthContext from '../../src/context/AuthContext';

export default function EditProfileScreen() {
  const [imageSource, setImageSource] = useState(null);

  function uploadImageToStorage(path, imageName) {
    let reference = storage().ref(imageName);
    let task = reference.putFile(path, { customMetadata: { userId: auth().currentUser.uid }});

    task.then(() => {
      console.log('Image uploaded to the bucket!');
    }).catch((e) => console.log('uploading image error => ', e));
  }

  function selectImage() {
    let options = {
      mediaType: 'mixed',
      maxWidth: 256,
      maxHeight: 256
    };

    launchImageLibrary(options, response => {
      console.log({ response });
      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select an image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response);
      }
    });
  }

  function takeImage() {
    let options = {
      mediaType: 'mixed',
      maxWidth: 256,
      maxHeight: 256
    };

    launchCamera(options, response => {
      console.log({ response });

      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response.assets[0].uri)
        uploadImageToStorage(response.assets[0].uri, response.assets[0].fileName);
      }
    });
  }

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



  return(
    <NativeBaseProvider>
      <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
        <Image
          source={{ uri: 'https://media.vanityfair.com/photos/5ba12e6d42b9d16f4545aa19/3:2/w_1998,h_1332,c_limit/t-Avatar-The-Last-Airbender-Live-Action.jpg',
          }}
          alt="Aang flying and surrounded by clouds"
          height={120}
          rounded="full"
          width={120}
          m="auto"
        />
        <Link onPress={selectImage}>
          Change Profile Picture
        </Link>
        </Box>
      <Box flex={1} p={2} w="90%" mx="auto">
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
      )
  };