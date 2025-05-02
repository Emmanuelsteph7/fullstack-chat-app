import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import SliderItem, { SliderItemProps } from "../sliderItem";
import { slidesData } from "../../data/slides";
import { useRouter } from "expo-router";
import { IUseSliderResponse } from "../../hooks/useSlider";

interface Props {
  sliderLogic: IUseSliderResponse;
}

const Slider = ({ sliderLogic }: Props) => {
  const { flatlistRef, renderItem, handleUpdateCurrentSlide } = sliderLogic;

  return (
    <View className="flex-1">
      <FlatList
        data={slidesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={handleUpdateCurrentSlide}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        contentContainerStyle={{ height: "100%" }}
      />
    </View>
  );
};

export default Slider;
