import React, {useState, useContext} from 'react';
import {
  View,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  InputField
} from 'react-native';
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
  Actionsheet,
  useDisclose
} from 'native-base';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AuthContext from '../../src/context/AuthContext';


const AddPostScreen = () => {

  const [imageSource, setImageSource] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclose()

    function selectImage() {
      let options = {
        mediaType: 'mixed',
        maxWidth: 1200,
        maxHeight: 780
      };

      launchImageLibrary(options, response => {
        console.log({ response });
        if (response.didCancel) {
          console.log('User cancelled photo picker');
          Alert.alert('You did not select an image');
        } else if (response.error) {
          console.log('Image Picker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = (response.assets[0].uri );
          console.log(source);
          setImageSource(source);
        }
      });
    }

    function takeImage() {
      let options = {
        mediaType: 'mixed',
        maxWidth: 1200,
        maxHeight: 780
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
          const source = (response.assets[0].uri );
          console.log(source);
          setImageSource(source);
        }
      });
    }


  const submitPost = async () => {
    const imageUrl = await uploadImage();
    console.log('Image Url: ', imageUrl);
    console.log('Post: ', post);

    firestore()
    .collection('posts')
    .doc(auth().currentUser.uid)
    .collection('userPosts')
    .add({
      userId: auth().currentUser.uid,
      post: post,
      postImg: imageUrl,
      postTime: firestore.Timestamp.fromDate(new Date()),
    })
    .then(() => {
      console.log('Post Uploaded');
      Alert.alert(
        'Upload Successful!',
      );
      setPost(null);
    })
    .catch((error) => {
      console.log('Unable to add post to firestore.', error);
    });
  }

  const uploadImage = async () => {
      if( imageSource == null ) {
        return null;
      }
      const uploadUri = imageSource;
      let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

      // Add timestamp to File Name
      const extension = filename.split('.').pop();
      const name = filename.split('.').slice(0, -1).join('.');
      filename = name + Date.now() + '.' + extension;

      setUploading(true);
      setTransferred(0);

      const storageRef = storage().ref(`photos/${filename}`);
      const task = storageRef.putFile(uploadUri);

      // Set transferred state
      task.on('state_changed', (taskSnapshot) => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );

        setTransferred(
          Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100,
        );
      });

      try {
        await task;

        const url = await storageRef.getDownloadURL();

        setUploading(false);
        setImageSource(null);

        return url;

      } catch (e) {
        console.log(e);
        return null;
      }

    };

  return (
    <NativeBaseProvider>
      <Box flex={1} alignItems="center" w="100%" h="100%" safeArea>
        <Flex justifyContent="space-between" h="100%" w="100%">
          <Box flex={1/2} p={3}>
            <Image
              source={
                 imageSource ? {uri: imageSource} : require('../assets/images/placeholderupload.png')
              }
              alt="Upload Image"
              m="auto"
              size="xl"
              resizeMode="contain"
            />
            </Box>
                 <VStack space={2} mt={2} p={3}>
                         <Button
                           mt={10}
                           backgroundColor="black"
                           onPress={onOpen}>
                           UPLOAD MEDIA FROM PHONE
                         </Button>
                         <Actionsheet isOpen={isOpen} onClose={onClose}>
                           <Actionsheet.Content>
                             <Box w="100%" h={60} px={4} justifyContent="center">
                               <Text
                                 fontSize="md"
                                 color="black">
                                 Upload
                               </Text>
                             </Box>
                             <Actionsheet.Item onPress={selectImage}>Photo from Gallery</Actionsheet.Item>
                             <Actionsheet.Item onPress={takeImage}>Photo from Camera</Actionsheet.Item>
                           </Actionsheet.Content>
                         </Actionsheet>
                   <FormControl>
                     <FormControl.Label
                       _text={{color: 'black', fontSize: 'sm', fontWeight: 600}}>
                       Description
                     </FormControl.Label>
                     <TextArea
                       borderColor="black"
                       _focus="black"
                       numberOfLines={5}
                       value={post} onChangeText={(content) => setPost(content)}
                     />
                   </FormControl>

                     <Button
                       variant="outline"
                       borderColor="black"
                       _text= {{color: "black", fontWeight: "900"}}
                       _pressed={{bg:"#e5e5e5"}}
                       bg="white"
                       onPress={submitPost}>
                       CREATE POST
                     </Button>

                 </VStack>
                 </Flex>
                </Box>

          </NativeBaseProvider>
    );
  };

  export default AddPostScreen;

