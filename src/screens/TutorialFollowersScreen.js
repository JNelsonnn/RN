import React from "react";
import {
  Box,
  VStack,
  Text,
  NativeBaseProvider,
  Flex,
  Center,
  Pressable,
  HStack,
  Wrap,
  Heading,
} from "native-base";

import Ionicons from "react-native-vector-icons/Ionicons";

export default TutorialFollowersScreen = ({ navigation }) => {
  return (
    <Box flex={1} p={1} justifyContent="space-between" m="auto" safeArea>
      <Box flex={1 / 6}>

      </Box>

      <Box flex={2 / 3}>


        <VStack flex={1 / 3} space={2} m={2} alignItems="center">
        <Ionicons
                  flex={5 / 9}
                  name="ios-person-add"
                  size={150}
                  color="black"

                />
          <Heading mt={3}>5 followers</Heading>
          <Text>
           To activate your live 1-1 schedule button.
           All users are required to gain 5 followers.
           Feel free to share our app with family & friends
           using the share button on your profile.
          </Text>
        </VStack>
      </Box>

      <Box>
        <Pressable mb={7} flex-end onPress={() => navigation.navigate("Home")}>
          <Text bold alignSelf="flex-end" mr={5}>
            Done
          </Text>
        </Pressable>
      </Box>
    </Box>
  );
};
