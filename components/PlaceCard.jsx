import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const PlaceCard = (props) => {
  const { imgUrl, title } = props.data;

  return (
    <TouchableOpacity className=" w-full aspect-[1/1.5] relative  ">
      <Image
        className=" w-full   h-full   rounded-lg  opacity-80  "
        source={{ uri: imgUrl }}
      />
      <View className="absolute bottom-0 w-full  flex py-3 px-3   ">
        <Text className=" text-2xl text-white   font-pbold  self-start bg-opacity-10  ">
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlaceCard;
