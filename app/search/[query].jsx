import { View, Text, SafeAreaView, FlatList, Image } from 'react-native'
import React, { useEffect } from 'react'
import  { useLocalSearchParams } from "expo-router"
import { searchPosts } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import VideoCard from '@/components/VideoCard'
import SearchInput from '@/components/SearchInput'
import { StatusBar } from 'expo-status-bar'

import EmptyState from '@/components/EmptyState'
const Search = () => {
  const {query} = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  console.log(posts,query)

  useEffect(() => {
    refetch();
  }, [query]);
  return (
    <SafeAreaView className="bg-primary h-full ">
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => {
 
        return (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            users={item.creator.username}
            avatar={item.creator.avatar}
          />
        );
      }}
      ListHeaderComponent={() => (
        <>
          <View className="flex my-[20%] px-4">
            <Text className="font-pmedium text-gray-100 text-sm">
              Search Results
            </Text>
            <Text className="text-2xl font-psemibold text-white mt-1">
              {query}
            </Text>

            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} refetch={refetch} />
            </View>
          </View>
        </>
      )}
      ListEmptyComponent={() => (
        <EmptyState
          title="No Videos Found"
          subtitle="No videos found for this search query"
        />
      )}
  
    />

    <StatusBar backgroundColor="#161622" style="light" />
  </SafeAreaView>
  )
}

export default Search