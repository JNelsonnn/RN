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

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default Tutorial1to1Screen = ({ navigation }) => {
  return (
    <Box flex={1} p={1} justifyContent="space-between" m="auto" safeArea>
      <Box flex={1 / 6}>
        <Pressable mt={7} onPress={() => navigation.navigate("Home")}>
          <Text mr={5} bold alignSelf="flex-end">
            Skip
          </Text>
        </Pressable>
      </Box>

      <Box flex={2 / 3}>


        <VStack flex={1 / 3} space={2} m={2} alignItems="center">
        <MaterialCommunityIcons
                  flex={5 / 9}
                  name="calendar-clock"
                  size={150}
                  color="black"

                />
          <Heading mt={3}>Schedule live 1-1 </Heading>
          <Text>
            You can schedule live 1-1 from your profile by simply adding the
            dates and times you are available.
          </Text>
        </VStack>
      </Box>

      <Box>
        <Pressable mb={7} flex-end onPress={() => navigation.navigate("TutorialPayment")}>
          <Text bold alignSelf="flex-end" mr={5}>
            Next
          </Text>
        </Pressable>
      </Box>
    </Box>
  );
};
