import React, { forwardRef, ReactNode, useCallback } from "react";
import GorhomBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { colors } from "@/constants/color";
import { useColorScheme } from "nativewind";
import Container from "../container";
import Typography from "../typography";
import { BackdropPressBehavior } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";

interface Props {
  snapPoints?: (string | number)[];
  /**
   * If index is -1, it is closed by defatlt
   * Else, it will show the index of the snap point by default
   */
  index?: number;
  shownView?: "view" | "scroll-view";
  children?: ReactNode;
  header?: string;
  enablePanDownToClose?: boolean;
  backdropPressBehaviour?: BackdropPressBehavior;
}

const defaultSnapPoints = ["50%", "70%"];

// eslint-disable-next-line react/display-name
const BottomSheet = forwardRef<BottomSheetMethods, Props>(
  (
    {
      snapPoints = defaultSnapPoints,
      index = -1,
      shownView = "view",
      children,
      header,
      enablePanDownToClose = true,
      backdropPressBehaviour = "close",
    },
    ref
  ) => {
    const { colorScheme } = useColorScheme();

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          pressBehavior={backdropPressBehaviour}
          style={{
            backgroundColor:
              colorScheme === "dark"
                ? colors["color-dark"]
                : colors["color-primary"],
          }}
        />
      ),
      [backdropPressBehaviour, colorScheme]
    );

    const handleSheetChanges = useCallback((index: number) => {
      //   console.log("handleSheetChanges", index);
    }, []);

    return (
      <GorhomBottomSheet
        snapPoints={snapPoints}
        ref={ref}
        onChange={handleSheetChanges}
        index={index}
        backgroundStyle={{
          backgroundColor:
            colorScheme === "dark" ? colors["color-dark"] : "#fff",
          borderWidth: 1,
          borderColor:
            colorScheme === "dark"
              ? colors["color-grey-light"]
              : colors["color-primary"],
          borderStyle: "solid",
        }}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{
          backgroundColor:
            colorScheme === "dark"
              ? colors["color-grey-light"]
              : colors["color-primary"],
        }}
        enablePanDownToClose={enablePanDownToClose}
      >
        <Container className="flex-1">
          {shownView === "view" && (
            <BottomSheetView className="flex-1 border-t border-color-primary dark:border-color-grey-light py-4">
              {header && (
                <Typography
                  variant="headline-5"
                  weight={600}
                  className="text-center text-color-primary dark:text-white mb-4"
                >
                  {header}
                </Typography>
              )}
              {children}
            </BottomSheetView>
          )}
          {shownView === "scroll-view" && (
            <BottomSheetScrollView className="flex-1 border-t border-color-primary dark:border-color-grey-light py-4">
              {header && (
                <Typography
                  variant="headline-5"
                  weight={600}
                  className="text-center text-color-primary dark:text-white mb-4"
                >
                  {header}
                </Typography>
              )}
              {children}
            </BottomSheetScrollView>
          )}
          {!shownView && children}
        </Container>
      </GorhomBottomSheet>
    );
  }
);

export default BottomSheet;
