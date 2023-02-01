import React from 'react';
import { NativeBaseProvider, VStack, Button } from 'native-base';

import AuthContext from '../../src/context/AuthContext';

function DebugScreen({ navigation }) {
  const {signOut} = React.useContext(AuthContext);

  return (
    <NativeBaseProvider>
      <VStack space={2} mt={5}>
        <Button onPress={() => navigation.navigate('ProfileStack', { screen: 'Availability' })}>
          Availability
        </Button>
        <Button onPress={() => navigation.navigate('VideoChat')}>
          Video Chat
        </Button>
        <Button onPress={() => navigation.navigate('ListOneToOnes')}>
          List 1-1s
        </Button>
        <Button onPress={() => navigation.navigate('Interests')}>
          Chat
        </Button>
        <Button onPress={() => navigation.navigate('Search')}>
          Search &amp; Discovery
        </Button>
        <Button onPress={() => navigation.navigate('ViewProfile')}>
          View Profile
        </Button>
        <Button onPress={() => navigation.navigate('Calendar')}>
          Calendar
        </Button>
        <Button onPress={() => navigation.navigate('Payment')}>Payments</Button>
        <Button onPress={() => navigation.navigate('StripeAccountOnboarding')}>Stripe Account Onboarding</Button>
        <Button onPress={() => navigation.navigate('Tutorial1to1')}>Tutorial1to1</Button>

        <Button onPress={() => signOut()}>Sign out</Button>
      </VStack>
    </NativeBaseProvider>
  );
}

export default DebugScreen;
