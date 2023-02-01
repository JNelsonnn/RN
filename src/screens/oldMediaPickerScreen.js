import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

export default function SimpleImagePicker() {
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
        console.log(response.assets[0].uri)
        uploadImageToStorage(response.assets[0].uri, response.assets[0].fileName);
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

  return (
    <View>
      <Text>
        Simple Image Picker
      </Text>
      <TouchableOpacity
        onPress={selectImage}
      >
        <Text>Pick an image or video</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={takeImage}
      >
        <Text>Take an image or video</Text>
      </TouchableOpacity>
    </View>
  );
}
