import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  InputField,
  ActionButton,
} from "react-native";
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
  HStack,
} from "native-base";

import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import storage from "@react-native-firebase/storage";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import AuthContext from "../../src/context/AuthContext";

export default EditProfileScreen = () => {
  const { user, logout } = useContext(AuthContext);
  const [imageSource, setImageSource] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [userData, setUserData] = useState(null);

  function selectImage() {
    let options = {
      mediaType: "mixed",
      maxWidth: 1200,
      maxHeight: 780,
    };

    launchImageLibrary(options, (response) => {
      console.log({ response });
      if (response.didCancel) {
        console.log("User cancelled photo picker");
        Alert.alert("You did not select an image");
      } else if (response.error) {
        console.log("Image Picker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = response.assets[0].uri;
        console.log(source);
        setImageSource(source);
      }
    });
  }

  function takeImage() {
    let options = {
      mediaType: "mixed",
      maxWidth: 1200,
      maxHeight: 780,
    };

    launchCamera(options, (response) => {
      console.log({ response });

      if (response.didCancel) {
        console.log("User cancelled photo picker");
        Alert.alert("You did not select any image");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = response.assets[0].uri;
        console.log(source);
        setImageSource(source);
      }
    });
  }

  const getUser = async () => {
    const currentUser = await firestore()
      .collection("Profiles")
      .doc(auth().currentUser.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log("Profile Data", documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleUpdate = async () => {
    let imgUrl = await uploadImage();

    if (imgUrl == null && userData.userImg) {
      imgUrl = userData.userImg;
    }

    firestore()
      .collection("Profiles")
      .doc(auth().currentUser.uid)
      .update({
        location: userData.location,
        description: userData.description,
        username: userData.username,
        userImg: imgUrl,
      })
      .then(() => {
        console.log("User Updated!");
        Alert.alert("Update Successful!", "Your profile has been updated.");
      });
  };

  const uploadImage = async () => {
    if (imageSource == null) {
      return null;
    }
    const uploadUri = imageSource;
    let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);

    // Add timestamp to File Name
    const extension = filename.split(".").pop();
    const name = filename.split(".").slice(0, -1).join(".");
    filename = name + Date.now() + "." + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on("state_changed", (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100
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
      <Box safeArea space={1} flex={1} w="90%" mx="auto">
        <VStack>
          <Image


            source={{
              uri: imageSource
                ? imageSource
                : userData
                ? userData.profileImg ||
                  "https://media.vanityfair.com/photos/5ba12e6d42b9d16f4545aa19/3:2/w_1998,h_1332,c_limit/t-Avatar-The-Last-Airbender-Live-Action.jpg"
                : "https://media.vanityfair.com/photos/5ba12e6d42b9d16f4545aa19/3:2/w_1998,h_1332,c_limit/t-Avatar-The-Last-Airbender-Live-Action.jpg",
            }}
            alt="Profile Picture"
            height={130}
            rounded="full"
            width={130}
            mx="auto"
          />
          <Link mx="auto" mt={2} fontWeight="bold" onPress={selectImage}>
            CHANGE PROFILE PHOTO
          </Link>
          <FormControl>
            <Input
              fontSize="2xl"
              justifyContent={"center"}
              textAlign={"center"}
              value={userData ? userData.username : ""}
              onChangeText={(txt) =>
                setUserData({ ...userData, username: txt })
              }
            />
          </FormControl>
          <HStack>
            <FormControl>
              <Input
                textAlign={"center"}
                color="coolGray.800"
                fontWeight="medium"
                placeholder="Enter your location here"
                value={userData ? userData.location : ""}
                onChangeText={(txt) =>
                  setUserData({ ...userData, location: txt })
                }
              />
            </FormControl>
          </HStack>
          <HStack>
            <FormControl>
              <TextArea
                mt={5}
                placeholder="Enter your Bio here"
                value={userData ? userData.description : ""}
                onChangeText={(txt) =>
                  setUserData({ ...userData, description: txt })
                }
                h={20}
              />
            </FormControl>
          </HStack>
          <Button
            mt={10}
            borderColor="black"
            backgroundColor="black"
            onPress={handleUpdate}
          >
            Done
          </Button>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
};
