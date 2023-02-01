import React, {useState, useEffect} from 'react';
import {
  NativeBaseProvider,
  View,
  FlatList,
  Box,
  Button,
  Text,
  Image,
  Flex,
  Stack,
  HStack,
  Center,
  Heading,
} from 'native-base';
import functions from '@react-native-firebase/functions';

if (__DEV__) {
  functions().useFunctionsEmulator('http://localhost:5001');
}

function ListOneToOnesScreen({navigation}) {
  const [loading, setLoading] = useState(true);
  const [lives, setLives] = useState([
    {category: 'Sport', items: [1, 2, 3, 4, 5, 6]},
    {category: 'Music', items: [4, 5, 6]},
  ]);

  // useEffect(() => {
  //   functions()
  //     .httpsCallable('listLives')('someParameter')
  //     .then(response => {
  //       setLives(response.data);
  //       console.log(lives)
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     })
  // }, []);

  if (loading) {
    () => <Text>Loading</Text>;
  }

  return (
    <NativeBaseProvider>
      <Text>{lives.length}</Text>

      <Stack space={3} alignItems="center">
        <FlatList
          data={lives}
          renderItem={({item}) => (
            <View>
              <Text>{item.category}</Text>
            </View>
          )}
          numColumns={2}
        />

        {lives.map((live, index) => (
          <>
            <Heading key={index}>{live.category}</Heading>

            <FlatList
              data={live.items}
              renderItem={({item}) => (
                <Center
                  size={16}
                  bg="primary.400"
                  rounded="md"
                  _text={{
                    color: 'white',
                  }}
                  shadow={3}>
                  <Text>{item}</Text>
                </Center>
              )}
              numColumns={3}
            />
          </>
        ))}

        <Heading>HStack</Heading>
        <HStack space={3} alignItems="center">
          <Center
            size={16}
            bg="primary.400"
            rounded="md"
            _text={{
              color: 'white',
            }}
            shadow={3}>
            Box 1
          </Center>
          <Center
            bg="secondary.400"
            size={16}
            rounded="md"
            _text={{
              color: 'white',
            }}
            shadow={3}>
            Box 2
          </Center>
          <Center
            size={16}
            bg="emerald.400"
            rounded="md"
            _text={{
              color: 'white',
            }}
            shadow={3}>
            Box 3
          </Center>
        </HStack>
      </Stack>
    </NativeBaseProvider>
  );
}

export default ListOneToOnesScreen;
