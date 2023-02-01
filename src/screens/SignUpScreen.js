import React from 'react';
import {
  NativeBaseProvider,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Text,
  Link
} from 'native-base';

import AuthContext from '../../src/context/AuthContext';

function SignUpScreen({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');

  const {signUp} = React.useContext(AuthContext);

  return (
    <NativeBaseProvider>
      <Box flex={1} p={2} w="90%" mx="auto">
        <Heading color="black" fontFamily="Comfortaa" size="3xl">Register</Heading>
        <VStack space={2} mt={5}>
          <FormControl>
            <Input
              pt={1}
              borderColor="black"
              _focus="black"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
          </FormControl>
          <FormControl>
            <Input
              mt={5}
              pt={1}
              borderColor="black"
              _focus="black"
              placeholder="Password"
              type="password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </FormControl>
          <VStack space={2} mt={5}>
            <Button
              backgroundColor="black"
              onPress={() => signUp({email, password})}>
              Register
            </Button>
            <Box>
            <Text fontSize="md" fontWeight="500" color="black">
              By signing up, you agree to PipLen’s
                <Link
                  onPress={() => navigation.navigate('TermsOfUse')}
                  isUnderlined
                  _text={{ fontSize: 'md', fontWeight: '500', color:'black' }}>
                    Terms Of Service
                </Link>
                                      and
                <Link
                  onPress={() => navigation.navigate('PrivacyPolicy')}
                  isUnderlined
                  _text={{ fontSize: 'md', fontWeight: '500', color:'black' }}>
                                            Privacy Policy.
                </Link>
              </Text>
            </Box>
          </VStack>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}

export default SignUpScreen;
