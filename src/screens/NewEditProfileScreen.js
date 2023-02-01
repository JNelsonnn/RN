import React, {useState, useEffect} from 'react';
import storage from '@react-native-firebase/storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {
  NativeBaseProvider,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Image,
  Center,
  Button,
  TextArea,
  Text,
  Link,
  TouchableOpacity,
  Alert,
} from 'native-base';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import AuthContext from '../../src/context/AuthContext';

export default function EditProfileScreen({navigation}) {

 const [imageSource, setImageSource] = useState(null);

  function uploadImageToStorage(path, imageName) {
    let reference = storage().ref(imageName);
    let task = reference.putFile(path, { customMetadata: { userId: auth().currentUser.uid }});

    task.then(() => {
      console.log('Image uploaded to the bucket!');
    }).catch((e) => console.log('uploading image error => ', e));
  }
const ImageUploader = ({ image, onImagePicked }) => {

  const [selectedImage, setSelectedImage] = useState();

  function selectImage() {
    let options = {
      mediaType: 'mixed',
      maxWidth: 256,
      maxHeight: 256,
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
        console.log("Image:" + response.uri)
        setSelectedImage({ uri: response.uri });
        onImagePicked({ uri: response.uri });

      }
    });
  }
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
        let source = { uri: response.uri };
                console.log({ source });
      }
    });
    }



  return(
  <NativeBaseProvider>
  <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
    <Image
      source={{        uri: 'https://media.vanityfair.com/photos/5ba12e6d42b9d16f4545aa19/3:2/w_1998,h_1332,c_limit/t-Avatar-The-Last-Airbender-Live-Action.jpg',
}}
      alt="Aang flying and surrounded by clouds"
      height={120}
      rounded="full"
      width={120}
      m="auto"
    />
    <Link onPress={selectImage}
                                  >
                                  Change Profile Picture
                                </Link>


    <Text m="auto">
     Jane
    </Text>
    <Text m="auto">
     Artist - Painter
    </Text>
    </Box>
    </NativeBaseProvider>
    )


};