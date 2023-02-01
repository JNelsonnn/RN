import React from 'react';
import { NativeBaseProvider, Box, Input, Icon, Button, Text, Image, Flex } from 'native-base';
import { SectionList, StyleSheet, StatusBar, View, FlatList } from "react-native";
import Ion from 'react-native-vector-icons/Ionicons';

const DATA = [
  {
    title: "Photography",
    data: ["Pizza", "Burger", "Risotto", "French Fries", "Onion Rings", "Fried Shrimps", "French Fries", "Onion Rings", "Fried Shrimps"]
  },
  {
    title: "Fashion",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"]
  },
  {
    title: "Architecture",
    data: ["Water", "Coke", "Beer"]
  },
  {
    title: "Desserts",
    data: ["Cheese Cake", "Ice Cream"]
  },
  {
    title: "Fashion",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"]
  },
  {
    title: "Architecture",
    data: ["Water", "Coke", "Beer"]
  },
  {
    title: "Desserts",
    data: ["Cheese Cake", "Ice Cream"]
  },
  {
    title: "Photography",
    data: ["Pizza", "Burger", "Risotto"]
  },
  {
    title: "Fashion",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"]
  },
  {
    title: "Architecture",
    data: ["Water", "Coke", "Beer"]
  },
  {
    title: "Desserts",
    data: ["Cheese Cake", "Ice Cream"]
  },
  {
    title: "Fashion",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"]
  },
  {
    title: "Architecture",
    data: ["Water", "Coke", "Beer"]
  },
  {
    title: "Desserts",
    data: ["Cheese Cake", "Ice Cream"]
  }
];

const ListItem = ({item}) => (
  <View style={styles.item}>
    <Text>{item}</Text>
  </View>
)

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginLeft: 10
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24
  }
});

function SearchScreen({ navigation }) {
  return (
    <NativeBaseProvider>
      <Box alignItems="flex-start" h="100%" safeArea>
        <Flex h="100%" w="100%">
          <Input
            placeholder="Search"
            variant="filled"
            width="100%"
            bg="gray.200"
            borderRadius={10}
            py={1}
            px={2}
            _web={{
              _focus: { borderColor: 'muted.300', style: { boxShadow: 'none' } },
            }}
            InputLeftElement={<Icon  color="gray.400" as={<Ion name="search-circle-outline" />} />}
          />
          <SectionList
            sections={DATA}
            stickySectionHeadersEnabled={false}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => null}
            renderSectionHeader={({ section }) => (
              <>
                <Text>{section.title}</Text>
                <FlatList
                  horizontal
                  data={section.data}
                  renderItem={({ item }) => <ListItem item={item} />}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => item + index}
                />
              </>
            )}
          />
        </Flex>
      </Box>
    </NativeBaseProvider>
  );
}

export default SearchScreen;
