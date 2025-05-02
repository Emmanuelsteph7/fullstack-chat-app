import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Redirect } from "expo-router";

const ProtectedLayout = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Redirect href="/(public)" />;
  }

  return (
    <View>
      <Text>ProtectedLayout</Text>
    </View>
  );
};

export default ProtectedLayout;
