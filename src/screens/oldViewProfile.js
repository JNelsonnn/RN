import React, { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";
import Icon from "react-native-vector-icons/Ionicons";

import { TouchableOpacity } from 'react-native';

import {
  NativeBaseProvider,
  Box,
  Button,
  Image,
  Flex,
  Link,
  Heading,
  VStack,
  FormControl,
  Input,
  TextArea,
  FlatList,
  Text,
  HStack,
  Pressable,
} from "native-base";

export default EditProfileScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [postList, setPostList] = useState([]); // Initial empty array of users
  const [userProfile, setUserProfile] = useState(null);

  const getProfile = async () => {
    await firestore()
      .collection("Profiles")
      .doc(auth().currentUser.uid)
      .get()
      .then((documentSnapshot) => {
        console.log("User exists: ", documentSnapshot.exists);

        if (documentSnapshot.exists) {
          console.log(documentSnapshot.data());
          setUserProfile(documentSnapshot.data());
          console.log(userProfile.description);
        }
      });
  };

  const getProfileList = async () => {
    await firestore()
      .collection("posts")
      .doc(auth().currentUser.uid)
      .collection("userPosts")
      .onSnapshot((querySnapshot) => {
        const postList = [];

        querySnapshot.forEach((documentSnapshot) => {
          postList.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.ref,
          });
          console.log(postList);
        });

        setPostList(postList);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => getProfileList();
  };

  useEffect(() => {
    getProfile();
    getProfileList();
  }, []);

  const listHeaderComponent = ({ navigation }) => (
    <VStack alignItems="center">
      <Image
        source={{
          uri: userProfile
            ? userProfile.profileImg ||
              "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg"
            : "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg",
        }}
        alt="Profile Picture"
        height={130}
        rounded="full"
        width={130}
        m="auto"
      />
      <Text mt={3} fontSize="xl" fontWeight="bold">
        {userProfile ? userProfile.username || "Loading.." : "Loading.."}
      </Text>
      <Text mt={7} fontSize="md" fontWeight="bold">
        {userProfile ? userProfile.location || "Loading.." : "Loading.."}
      </Text>

      <HStack mt={7}>
        <Pressable onPress={() => navigation.navigate("Following")}>
          <Text fontSize="sm" fontWeight="bold" mr={10}>
            FOLLOWING 78
          </Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Followers")}>
          <Text fontSize="sm" fontWeight="bold" ml={10}>
            FOLLOWERS 117
          </Text>
        </Pressable>
      </HStack>

      <Box>
        <Button
          borderColor="black"
          backgroundColor="black"
          mt={10}
          onPress={() => navigation.navigate("EditProfile")}
        >
          EDIT PROFILE
        </Button>
        <Button
          variant="outline"
          borderColor="black"
          _text={{ color: "black" }}
          mt={3}
          onPress={() => navigation.navigate("ListOneToOneS")}
        >
          SCHEDULE LIVE 1-1
        </Button>

        <Flex direction="row" mt={3} justifyContent="space-between">
          <HStack>
            <Text fontSize="sm" fontWeight="bold">
              REVIEWS
            </Text>
          </HStack>
          <HStack>
            <Icon as={Icon} name="logo-instagram" color="black" size={30} />
            <Text fontSize="sm" mt={1}>
              Instagram
            </Text>
          </HStack>
        </Flex>
        <Flex direction="row" justifyContent="space-between">
          <Button
            backgroundColor="black"
            flex={1 / 2}
            size="sm"
            onPress={() => navigation.navigate("AddPost")}
          >
            UPLOAD PHOTO/VIDEO
          </Button>
        </Flex>

        <Text my={3} fontSize="sm">
          {userProfile ? userProfile.description || "Loading.." : "Loading.."}
        </Text>
      </Box>
    </VStack>
  );

  return (
    <NativeBaseProvider>
      <Box flex={1} justifyContent={"center"} safeArea>
        <FlatList
          data={postList}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.id}
          ListHeaderComponent={listHeaderComponent({ navigation })}
          renderItem={({ item }) => (

            <TouchableOpacity
               onPress={() => {
                            navigation.navigate('ViewMedia', {
                              id: item.id,
                              postImage: item.postImg,
                              post: item.post
                            });
                            }}>
            <Box
              aspectRatio={1}
              flex={1 / 3}
              flexDirection={"column"}
              m={10 / 21}
            >

              <Image
                source={{
                  uri: item.postImg,
                }}
                alt="Media"
                flex={1}
                justifyContent={"center"}
                alignItems={"center"}
                size="2xl"
              />

            </Box>
           </TouchableOpacity>
          )}
        />
      </Box>
    </NativeBaseProvider>
  );
};
