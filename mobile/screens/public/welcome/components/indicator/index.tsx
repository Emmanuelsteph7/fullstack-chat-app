import { View } from "react-native";
import React from "react";
import Container from "@/components/container";
import { slidesData } from "../../data/slides";
import cs from "classnames";

interface Props {
  currentSlide: number;
}

const Indicator = ({ currentSlide }: Props) => {
  return (
    <View>
      <Container>
        <View className="flex-row justify-center items-center gap-3">
          {slidesData.map((_, index) => (
            <View
              key={index}
              className={cs("rounded-full w-2 h-2", {
                "bg-color-primary": currentSlide >= index,
                "bg-color-primary/20": currentSlide < index,
              })}
            />
          ))}
        </View>
      </Container>
    </View>
  );
};

export default Indicator;
