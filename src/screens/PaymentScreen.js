// import React, { Component } from 'react';

// import { WebView } from 'react-native-webview';

// function HomeScreen({ navigation }) {
//   return <WebView source={{ uri: 'https://reactnative.dev/' }} />;
// }

// export default HomeScreen;
import {useStripe} from '@stripe/stripe-react-native';
import React, {useState, useEffect} from 'react';
import {View, NativeBaseProvider} from 'native-base';
import {Button, Alert} from 'react-native';

export default function CheckoutScreen() {
  const API_URL = 'http://192.168.1.103:4242';
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/payment-sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const {paymentIntent, ephemeralKey, customer} = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer} =
      await fetchPaymentSheetParams();

    const {error} = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();
    console.log('on payment sheet');
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <NativeBaseProvider>
      <View>
        <Button
          variant="primary"
          disabled={!loading}
          title="Checkout"
          onPress={openPaymentSheet}
        />
      </View>
    </NativeBaseProvider>
  );
}
