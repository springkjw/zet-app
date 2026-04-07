import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef, useState } from "react";
import { View } from "react-native";

import { BaseButton } from "@/components/Button";
import { useWindowDimensions } from "@/hooks";
import useStyle from "./style";

import type { LayoutChangeEvent } from "react-native";
import type IBaseModalProps from "./type";

export default function BaseModal({
  children,
  isVisible = false,
  buttons = [],
  enableBackdropDismiss = false,
  onClose,
}: IBaseModalProps) {
  const { height: windowHeight } = useWindowDimensions();
  const ref = useRef<BottomSheet | null>(null);
  const style = useStyle();

  const [bottomInset, setBottomInset] = useState<number>(0);

  useEffect(() => {
    if (isVisible) {
      ref.current?.expand();
    } else {
      ref.current?.close();
    }
  }, [isVisible]);

  const handleContentLayout = useCallback(
    ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
      setBottomInset((windowHeight - layout.height) / 2);
    },
    [windowHeight]
  );

  const handleBackdropPress = useCallback(() => {
    if (enableBackdropDismiss) {
      onClose?.();
    }
  }, [enableBackdropDismiss, onClose]);

  return (
    <BottomSheet
      ref={ref}
      detached
      index={-1}
      enableDynamicSizing
      bottomInset={bottomInset}
      enablePanDownToClose={false}
      enableContentPanningGesture={false}
      handleComponent={null}
      containerStyle={style.BaseModalContainer}
      backgroundStyle={style.BaseModalBackground}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior={enableBackdropDismiss ? "close" : "none"}
          opacity={0.6}
          style={style.BaseModalBackdrop}
          onPress={handleBackdropPress}
        />
      )}
    >
      <BottomSheetView
        onLayout={handleContentLayout}
        style={style.BaseModalContent}
      >
        <View>{children}</View>
        {buttons.length > 0 && (
          <View style={style.BaseModalButtonContainer}>
            {buttons.map((button, index) => (
              <BaseButton
                key={index}
                label={button.label}
                variant={button.variant}
                size="medium"
                style={style.BaseModalButton}
                onPress={button.onPress}
              />
            ))}
          </View>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
}
