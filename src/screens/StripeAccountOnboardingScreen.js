import { useStripe } from '@stripe/stripe-react-native';
import React, { useState, useEffect } from "react";
import { View, NativeBaseProvider } from 'native-base';
import { Button, Alert } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { WebView } from 'react-native-webview';

export default function StripeAccountOnboardingScreen() {
  const [url, setUrl] = useState(null);

  const API_URL = `http://192.168.1.103:4242`

  const fetchCreateAccountOnboardingLink = async () => {
    const {uid} =  auth().currentUser;
    const doc = await firestore().collection('profiles').doc(uid).get()
    const {stripeAccountId} = doc.data()
    const response = await fetch(`${API_URL}/create-account-onboarding-link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        stripeAccountId: stripeAccountId,
      })
    });
    const res = await response.json();
    console.log(res)
    console.log('------------')
    setUrl(res.url)
  }

  if (url) {
    return (
      <NativeBaseProvider>
        <WebView source={{ uri: url }} />
      </NativeBaseProvider>
    )
  } else {
    return (
      <NativeBaseProvider>
        <View>
          <Button
            variant="primary"
            title="Stripe account onboarding"
            onPress={fetchCreateAccountOnboardingLink}
          />
        </View>
      </NativeBaseProvider>
    );
  }


}
