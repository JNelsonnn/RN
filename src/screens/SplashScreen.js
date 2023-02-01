import React from 'react';
import {NativeBaseProvider, Box, Button, Text, Image, Flex} from 'native-base';
import LogoComponent from '../assets/images/LogoComponent.js'


function SplashScreen({navigation}) {
  return (
    <NativeBaseProvider>
      <Box flex={1} alignItems="center" h="100%" safeArea>
        <Flex justifyContent="space-between" h="100%" w="100%">
          <Box alignSelf="center" mr={3}  mt={20}>
            < LogoComponent

            />
          </Box>
          <Box>
            <Text mx="auto" mb={80} fontType="heading" fontSize="5xl" textAlign="center">
              Learn from the world
            </Text>
          </Box>
          <Box>
            <Button.Group p={3}>
              <Button
                flex={1}
                variant="outline"
                borderColor="black"
                _text= {{color: "black"}}
                _pressed={{bg:"#e5e5e5"}}
                bg="white"
                onPress={() => navigation.navigate('SignIn')}>
                Log In
              </Button>
              <Button
                flex={1}
                backgroundColor="black"
                onPress={() => navigation.navigate('SignUp')}>
                Register
              </Button>
            </Button.Group>
          </Box>
        </Flex>
      </Box>
    </NativeBaseProvider>
  );
}

export default SplashScreen;
