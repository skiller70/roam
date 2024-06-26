import { View, Text, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PopularPlace from "../../components/PopularPlace";
import SearchInput from "../../components/SearchInput";
import Category from "../../components/Category";
import useAppwrite from "@/lib/useAppwrite";
import { getAllPlace } from "../../lib/appwrite";
import PlaceCard from "../../components/PlaceCard";

const popular = () => {
  const { data: posts } = useAppwrite(getAllPlace);
  const category = [
    { id: 1, name: "Popular" },
    { id: 2, name: "Snow fall" },
    { id: 3, name: "Relax" },
  ];

  //   const posts = [{ id: 1 }, { id: 2 }, { id: 3 }];

  return (
    <SafeAreaView className="bg-primary">
      <View className=" w-full ">
        <FlatList
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => {
            return (
              <View className="border-2 flex justify-center items-center my-4  ">
                <PlaceCard
                  data={{ imgUrl: item.imgUrl, title: item.placeName }}
                />
              </View>
            );
          }}
          ListHeaderComponent={() => {
            return (
              <View className="px-4 py-2.5">
                <View className="flex py-3">
                  <Text className="text-2xl text-gray-100 font-psemibold">
                    Popular Place{" "}
                  </Text>
                </View>
                <SearchInput />

                <View className=" flex flex-col w-full ">
                  <Text className="text-xl text-gray-100 mt-4">Category</Text>

                  <Category data={category} />
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default popular;
