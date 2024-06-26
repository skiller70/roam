import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useGlobalContext } from '@/context/GlobalProvider'

const Profile = () => {

  const {user} = useGlobalContext()

  return (
    <View className='w-full justify-center items-center flex-1'>
      <Text className=' text-2xl' >
      {user.email}
        
      </Text>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})