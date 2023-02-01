import React from 'react';
import {
  NativeBaseProvider,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Pressable,
  Link,
  Text
} from 'native-base';

import AuthContext from '../../src/context/AuthContext';

function SignInScreen({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {signIn, sendPasswordResetEmail} = React.useContext(AuthContext);

  return (
    <NativeBaseProvider>
      <Box flex={1} p={2} w="90%" mx="auto">
        <Heading color="black" font="Comfortaa" size="3xl">Log in</Heading>
        <VStack space={2} mt={5}>
          <FormControl>
            <Input
              pt={1}
              borderColor="black"
              _focus="black"
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
            />        
          </FormControl>
          <FormControl>
            <Input
              pt={1}
              borderColor="black"
              _focus="black"
              mt={5}
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
              onPress={() => signIn({email, password})}>
              Log in
              </Button>
            <Link
              onPress={() => navigation.navigate('ResetPassword')}
              _text={{ fontSize: 'md', fontWeight: '500', color:'black' }}
              mt="1">
              I forgot my password
            </Link>
          </VStack>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}

export default SignInScreen;
