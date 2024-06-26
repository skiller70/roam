import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import { Link, router } from "expo-router";
import CustomButton from "../../components/CustomButton";
import { signIn } from "../../lib/appwrite";
const SignIn = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // FORM SUBMIT

  const submit = async () => {

   
    if ((!form.email, !form.password)) {
      Alert.alert("Error", "Please fill all the fields")
    }

    setSubmitting(true);
    try {

      const result = await signIn(form.email, form.password);
     
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
        <View className="w-full flex justify-center min-h-[83vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain "
            className="w-[140px] h-[35px]"
          />
          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to Roam
          </Text>

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
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
