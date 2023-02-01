import React from "react"
import { Button, HStack, Checkbox, Center, Box, Heading, VStack, Text } from "native-base"


export default AvailabilityScreen = () => {


  return (


           <Box flex={1} px={2}  w="90%" mx="auto">
             <Heading fontFamily="heading" fontWeight={200} >1-1 Settings</Heading>
             <VStack space={2} mt={5}>
             <Text fontFamily="heading" fontWeight={600} >
             Pricing
             </Text>

             <Text>
             FEE
             </Text>
             <HStack>
             <Checkbox
                     value="test"
                     accessibilityLabel="This is a dummy checkbox"
                     defaultIsChecked
                   />
             <Text ml={20}>
             Monday
             </Text>
             </HStack>
             <Button

             variant="outline"
             _text= {{color: "black"}}borderColor="black"
             _pressed={{bg:"#e5e5e5"}}
             bg="white"
                             >
             theme
             </Button >
             </VStack>
           </Box>

  );
};