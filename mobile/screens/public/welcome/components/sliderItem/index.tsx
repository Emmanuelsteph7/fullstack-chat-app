import { useWindowDimensions, View } from "react-native";
import React from "react";
import { SvgProps } from "react-native-svg";
import Indicator from "../indicator";
import TextContent from "../textContent";

export interface SliderItemProps {
  icon: React.FC<SvgProps>;
  id: string;
  currentSlide?: number;
}

const SliderItem = ({ icon: Icon, currentSlide }: SliderItemProps) => {
  const { width } = useWindowDimensions();

  return (
    <View className="flex-1" style={{ width }}>
      <View className="flex-1 justify-between py-10">
        <View className="items-center">
          <Icon width={width - 100} height={400} />
        </View>
        <Indicator currentSlide={currentSlide || 0} />
      </View>
      <TextContent key={currentSlide} />
    </View>
  );
};

export default SliderItem;
