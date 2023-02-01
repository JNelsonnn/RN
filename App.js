import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { NativeBaseProvider } from 'native-base';
import { theme } from './src/NativeBaseTheme';

import AuthStack from './src/navigation/AuthStack';
import AppStack from './src//navigation/AppStack';


import {AuthProvider} from './src/context/AuthContext';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SplashScreen from './src/screens/SplashScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import HomeScreen from './src/screens/HomeScreen';
import VideoChatScreen from './src/screens/VideoChatScreen';
import ListOneToOnesScreen from './src/screens/ListOneToOnesScreen';
import SearchScreen from './src/screens/SearchScreen';
import ViewProfile from './src/screens/ViewProfile';
import CalendarScreen from './src/screens/CalendarScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import StripeAccountOnboardingScreen from './src/screens/StripeAccountOnboardingScreen';
import MediaPickerScreen from './src/screens/MediaPickerScreen';
import {ChatScreen} from './src/screens/ChatScreen';
import {StripeProvider} from '@stripe/stripe-react-native';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicyScreen';
import TermsOfUseScreen from './src/screens/TermsOfUseScreen';
import Tutorial1to1Screen from './src/screens/Tutorial1to1Screen';
import TutorialFollowersScreen from './src/screens/TutorialFollowersScreen';
import TutorialPaymentScreen from './src/screens/TutorialPaymentScreen';
import InterestsScreen from './src/screens/InterestsScreen';


const appID = '190738ef4cd3d0f0';
const region = 'eu';

const Stack = createStackNavigator();

function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <StripeProvider
      publishableKey="pk_test_svYGtqmNZhWVtrYAr7fA25AS"
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    >

      <AuthProvider>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            {user ? (
              <>
               <Stack.Screen
                 name="AppStack"
                 component={AppStack}
                 options={{ headerShown: false }}
               />
               <Stack.Screen
                 name="Tutorial1to1"
                 component={Tutorial1to1Screen}
                 options={{title: '', headerShown: false}}
               />
               <Stack.Screen
                 name="TutorialFollowers"
                 component={TutorialFollowersScreen}
                 options={{title: '', headerShown: false}}
               />
               <Stack.Screen
                 name="TutorialPayment"
                 component={TutorialPaymentScreen}
                 options={{title: '', headerShown: false}}
               />
               <Stack.Screen
                 name="Interests"
                 component={InterestsScreen}
                 options={{title: '', headerShown: false}}
               />
               </>
             ) : (
               <>
                <Stack.Screen
                  name="Splash"
                  component={SplashScreen}
                  options={{title: '', headerShown: false}}
                />
                <Stack.Screen
                  name="SignIn"
                  component={SignInScreen}
                  options={{title: ''}}
                />
                <Stack.Screen
                  name="SignUp"
                  component={SignUpScreen}
                  options={{title: ''}}
                />
                <Stack.Screen
                  name="ResetPassword"
                  component={ResetPasswordScreen}
                  options={{title: ''}}
                />
                <Stack.Screen
                  name="PrivacyPolicy"
                  component={PrivacyPolicyScreen}
                  options={{title: '', headerShown: false}}
                />
                <Stack.Screen
                  name="TermsOfUse"
                  component={TermsOfUseScreen}
                  options={{title: '', headerShown: false}}
                />
              </>
             )}
          </Stack.Navigator>
        </NavigationContainer>
        </NativeBaseProvider>
      </AuthProvider>
    </StripeProvider>
  );
}

export default App;
