import { useRouter } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  useWindowDimensions,
} from "react-native";
import SliderItem, { SliderItemProps } from "../components/sliderItem";
import { slidesData } from "../data/slides";

export interface IUseSliderResponse {
  handleNext: () => void;
  handleUpdateCurrentSlide: (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => void;
  renderItem: ({ item }: { item: SliderItemProps }) => React.JSX.Element;
  flatlistRef: React.RefObject<FlatList<SliderItemProps> | null>;
}

const useSlider = (): IUseSliderResponse => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const router = useRouter();
  const { width } = useWindowDimensions();

  const flatlistRef = useRef<FlatList<SliderItemProps>>(null);

  const renderItem = useCallback(
    ({ item }: { item: SliderItemProps }) => {
      return <SliderItem {...item} currentSlide={currentSlide} />;
    },
    [currentSlide]
  );

  const handleUpdateCurrentSlide = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlide(currentIndex);
  };

  const handleCompleteOnboarding = () => {
    router.replace("/login");
  };

  const handleNext = () => {
    if (currentSlide === slidesData.length - 1) {
      handleCompleteOnboarding();
    } else {
      const nextSlideIndex = currentSlide + 1;
      const nextSlideOffset = width * nextSlideIndex;
      flatlistRef.current?.scrollToOffset({ offset: nextSlideOffset });
      setCurrentSlide(nextSlideIndex);
    }
  };

  return { handleNext, handleUpdateCurrentSlide, renderItem, flatlistRef };
};

export default useSlider;
