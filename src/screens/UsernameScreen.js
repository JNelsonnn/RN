import React { useState } from 'react';
import {
  NativeBaseProvider,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Text
} from 'native-base';

import storage from "@react-native-firebase/storage";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import AuthContext from "../../src/context/AuthContext";

export default ViewMediaScreen = ({ navigation }) => {

  const [ProfileName, setProfileName] = React.useState(null);


  const handleUsername = async () => {


      firestore()
        .collection("Profiles")
        .doc(auth().currentUser.uid)
        .update({
          username: ProfileName.username,

        })
        .then(() => {
          console.log("Username Updated!");
          Alert.alert("Update Successful!", "Your username has been updated.");
        });
        .then(() => {
                  console.log("Username Updated!");
                  Alert.alert("Update Successful!", "Your username has been updated.");
                });
    };

  return (
    <NativeBaseProvider>
      <Box flex={1} p={2} w="90%" mx="auto">
        <Heading color="black" font="Comfortaa" size="3xl">Register</Heading>
        <VStack space={2} mt={5}>
          <FormControl>
            <Input
              pt={1}
              borderColor="black"
              _focus="black"
              placeholder="Username"
              onChangeText={setUsername}
            />
          </FormControl>

          <VStack space={2} mt={5}>
            <Button
             backgroundColor="black"
             onPress={onPress={() => navigation.navigate('Tutorial1to1')}>
              SIGN UP
            </Button>
          </VStack>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
};
