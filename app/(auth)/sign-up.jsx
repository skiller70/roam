import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import { Link, router } from "expo-router";
import CustomButton from "../../components/CustomButton";
import { createUser } from "../../lib/appwrite";
const SignIn = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  // FORM SUBMIT

  const submit = async () => {

   
    if ((!form.email, !form.password, !form.username)) {
      Alert.alert("Error", "Please fill all the fields");
    }

    setSubmitting(true);
    try {
    
      const result = await createUser(form.email, form.password, form.username);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
      throw new Error();
    } finally {
      setSubmitting(false);
    }
    createUser();
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full flex justify-center h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain "
            className="w-[140px] h-[35px]"
          />
          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Sign Up to Roam
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
