import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { router, usePathname } from 'expo-router';

import { icons } from "../constants";


const SearchInput = ({initialQuery}) => {
const pathname = usePathname();
const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="flex flex-row items-center space-x-4 w-full h-14 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder="Search Place"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity onPress={()=>{
        if (query === "")return Alert.alert("Missing Query","pleas enter something for search")

        if(pathname.startsWith("/search")) router.setParams({query})
          else router.push(`/search/${query}`)




      }}  >


      <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  )
}

export default SearchInput