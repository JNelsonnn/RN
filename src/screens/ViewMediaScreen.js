import React from "react"
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
  Image,
} from "native-base"


export default ViewMediaScreen = ({ route, navigation }) => {

const { itemId, post, postImage, uid } = route.params;


return(
<NativeBaseProvider>
  <VStack flex={1} >
    <Box  flex={3/4} >
      <Image
        source={{
           uri: postImage
        }}
        alt="Media"

        size="xl"
        resizeMode={'center'}
      />
    </Box>
    <Box mt={4} flex={1/4} >
      <Text>

        {post}

      </Text>
    </Box>
  </VStack>
</NativeBaseProvider>



)
};