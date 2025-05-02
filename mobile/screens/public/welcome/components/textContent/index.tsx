import ButtonLink from "@/components/buttonLink";
import Container from "@/components/container";
import Typography from "@/components/typography";
import React from "react";
import { View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

const TextContent = () => {
  return (
    <View className="flex-1 max-h-[350px]">
      <Container>
        <Typography
          weight={600}
          variant="headline-4"
          className="text-center mb-2 max-w-[300px] mx-auto"
          shouldAnimate
          entering={FadeInUp.delay(300).duration(300)}
        >
          Connect Together With Your Friends
        </Typography>
        <Typography
          variant="paragraph-md"
          weight={300}
          className="text-center max-w-[300px] mx-auto mb-12"
          shouldAnimate
          entering={FadeInDown.delay(500).duration(400)}
        >
          It&apos;s easy to connect with your friends and find our how their day
          is going
        </Typography>
        <Animated.View entering={FadeInDown.delay(700).duration(400)}>
          <ButtonLink
            href="/(public)/login"
            className="w-full max-w-[300px] mx-auto mb-3"
            label="Login"
          />
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(900).duration(400)}>
          <ButtonLink
            href="/(public)/sign-up"
            className="w-full max-w-[300px] mx-auto"
            label="Sign Up"
            variant="primary-outline"
          />
        </Animated.View>
      </Container>
    </View>
  );
};

export default TextContent;
