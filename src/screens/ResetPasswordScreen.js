import React from 'react';
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

import AuthContext from '../../src/context/AuthContext';

function ResetPasswordScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn, sendPasswordResetEmail } = React.useContext(AuthContext);

  return (
    <NativeBaseProvider>
      <Box flex={1} p={2} w="90%" mx="auto">
        <Heading color="black" font="Comfortaa" size="3xl">Reset Password</Heading>
        <VStack space={2} mt={5}>
          <FormControl>
            <Input
              pt={1}
              borderColor="black"
              _focus="black"
              placeholder="Email"
              value={email} onChangeText={setEmail}
            />
          </FormControl>

          <VStack space={2} mt={5}>
            <Button
             backgroundColor="black"
             onPress={() => sendPasswordResetEmail({email})}>
              Send Password Reset Email
            </Button>
          </VStack>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}

export default ResetPasswordScreen;
