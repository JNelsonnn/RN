import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider, Text, StyleSheet, View } from "native-base";
import auth from "@react-native-firebase/auth";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Icon from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

import EditProfileScreen from "../screens/EditProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import VideoChatScreen from "../screens/VideoChatScreen";
import ListOneToOnesScreen from "../screens/ListOneToOnesScreen";
import SearchScreen from "../screens/SearchScreen";
import ViewProfile from "../screens/ViewProfile";
import CalendarScreen from "../screens/CalendarScreen";
import PaymentScreen from "../screens/PaymentScreen";
import StripeAccountOnboardingScreen from "../screens/StripeAccountOnboardingScreen";
import MediaPickerScreen from "../screens/MediaPickerScreen";
import { ChatScreen } from "../screens/ChatScreen";
import DebugScreen from "../screens/DebugScreen";
import AddPostScreen from "../screens/AddPostScreen";
import { FollowersScreen } from "../screens/FollowersScreen";
import { FollowingScreen } from "../screens/FollowingScreen";
import ViewMediaScreen from "../screens/ViewMediaScreen";
import UserMediaScreen from "../screens/UserMediaScreen";
import AvailabilityScreen from "../screens/AvailabilityScreen";






const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{ title: "" }}>
      <ProfileStack.Screen name="Home" component={HomeScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
      <ProfileStack.Screen name="AddPost" component={AddPostScreen} />
      <ProfileStack.Screen name="Calendar" component={CalendarScreen} />
      <ProfileStack.Screen name="Followers" component={FollowersScreen} />
      <ProfileStack.Screen name="Following" component={FollowingScreen} />
      <ProfileStack.Screen name="ViewMedia" component={ViewMediaScreen} />
      <ProfileStack.Screen name="UserMedia" component={UserMediaScreen} />
      <ProfileStack.Screen name="Profile" component={ViewProfile} />
      <ProfileStack.Screen name="Availability" component={AvailabilityScreen} />
    </ProfileStack.Navigator>
  );
}

const ListOneToOnesStack = createStackNavigator();

function ListOneToOnesStackScreen() {
  return (
    <ListOneToOnesStack.Navigator screenOptions={{ title: "" }}>
      <ListOneToOnesStack.Screen
        name="ListOneToOne"
        component={ListOneToOnesScreen}
      />
    </ListOneToOnesStack.Navigator>
  );
}

const DebugStack = createStackNavigator();

function DebugStackScreen() {
  return (
    <DebugStack.Navigator screenOptions={{ title: "" }}>
      <DebugStack.Screen name="Debug" component={DebugScreen} />
    </DebugStack.Navigator>
  );
}

const VideoChatStack = createStackNavigator();

function VideoChatStackScreen() {
  return (
    <VideoChatStack.Navigator screenOptions={{ headerShown: false, title: "" }}>
      <VideoChatStack.Screen name="VideoChat" component={VideoChatScreen} />
    </VideoChatStack.Navigator>
  );
}

const SearchStack = createStackNavigator();

function SearchStackScreen() {
  return (
    <SearchStack.Navigator screenOptions={{ title: "" }}>
      <SearchStack.Screen name="Search" component={SearchScreen} />
    </SearchStack.Navigator>
  );
}

const Tabs = createBottomTabNavigator();

const AppStack = () => {
  return (
    <NativeBaseProvider>
      <Tabs.Navigator
        screenOptions={{ headerShown: false, tabBarShowLabel: false }}
        initialRouteName={'ProfileStack'}
      >
        <Tabs.Screen
          name="SearchStack"
          component={SearchStackScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="search" size={32} color="black" />
            ),
          }}
        />
        <Tabs.Screen
          name="DebugStack"
          component={DebugStackScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="share-outline" size={34} color="black" />
            ),
          }}
        />
        <Tabs.Screen
          name="VideoChatStack"
          component={VideoChatStackScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="radio" size={40} color="black" />
            ),
          }}
        />
        <Tabs.Screen
          name="ListOneToOnes"
          component={ListOneToOnesStackScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <EvilIcons name="calendar" size={47} color="black" />
            ),
          }}
        />
        <Tabs.Screen
          name="ProfileStack"
          component={ProfileStackScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="person-outline" size={30} color="black" />
            ),
          }}
        />
      </Tabs.Navigator>
    </NativeBaseProvider>
  );
};

export default AppStack;


/*const UserStack = createStackNavigator();

function UserStackScreen({ route, navigation }) {

const { itemId, uid, post, postImage } = route.params;

  return (
    <UserStack.Navigator screenOptions={{ title: "" }}>
     {auth().currentUser.uid === {uid}? (
                   <>

      <UserStack.Screen name="Home" component={HomeScreen} />
      </>
                   ) : (
                     <>
      <UserStack.Screen name="Profile" component={ViewProfile} />
      </>
      )}
    </UserStack.Navigator>
  );
}*/

