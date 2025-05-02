import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Redirect } from "expo-router";

const Home = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Redirect href="/(protected)" />;
  }

  return <Redirect href="/(public)" />;
};

export default Home;

const styles = StyleSheet.create({});
