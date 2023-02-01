import React, { useState, useEffect } from "react"
import {
  Box,
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
  Center,
  NativeBaseProvider,
} from "native-base"
import { TouchableOpacity } from "react-native"
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export const FollowingScreen = ({route, navigation}) => {

const [loading, setLoading] = useState(true); // Set loading to true on component mount
const [FollowersList, setFollowersList] = useState([]);

   const getFollowersList = async () => {
      await firestore()
        .collection("Profiles")
        .onSnapshot((querySnapshot) => {
          const FollowersList = [];

          querySnapshot.forEach((documentSnapshot) => {
            FollowersList.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.profileImg,
            });
            console.log(FollowersList);
          });

          setFollowersList(FollowersList);
          setLoading(false);
        });

      // Unsubscribe from events when no longer in use
      return () => getFollowersList();
    };

    useEffect(() => {
      getFollowersList();
    }, []);

   //Todo Navigation dependant on params
   /* const navigatetoPage = ({item}) => {
        const page = item.ref == "auth().currentUser.uid" ? "Home" : "ViewProfile";
         this.props.navigation.navigate(page, {
                id: data.id,
                type: data.type
         })
     };*/


  return (
  <NativeBaseProvider>
    <Box
      w={{
        base: "100%",
        md: "25%",
      }}
    >
      <Heading fontSize="xl" p="4" pb="3">
       Following
      </Heading>
      <FlatList
        keyExtractor={(item, index) => item.profileImg}
        data={FollowersList}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "gray.600",
            }}
            borderColor="coolGray.200"
            pl="4"
            pr="5"
            py="2"
          >
            <HStack space={3} justifyContent="space-between">
              <Avatar
                size="48px"
                source={{
                  uri: item.profileImg,
                }}
              />
              <VStack>
              <TouchableOpacity
               onPress={() => {
                                /* 1. Navigate to the Details route with params */
                                navigation.navigate('Profile', {
                                  id: item.id,
                                  usersId: item.userId,
                                });
                                }}>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.username}
                </Text>
                </TouchableOpacity>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  {item.location}
                </Text>
              </VStack>
              <Spacer />
            </HStack>
          </Box>
        )}

      />
    </Box>
  </NativeBaseProvider>
  )
}