import { View, Text, FlatList } from "react-native";
import React from "react";

const Category = ({ data }) => {
  // const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        horizontal
        renderItem={({ item }) => {
          return (
            <View className="   w-ful h-12  bg-secondary-200 justify-center items-center rounded-md px-4  shadow-md m-4">
              <Text className="text-lg   text-black-100  font-pmedium ">
                {item.name}
              </Text>

           
            </View>
          );
        }}
        ListHeaderComponent={() => <View></View>}
      />
    </View>
  );
};

export default Category;
