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
import type IConfirmModalProps from "./type";

export default function ConfirmModal({
  children,
  isConfirm = false,
  cancelLabel = "취소",
  confirmLabel = "확인",
  onChange,
}: IConfirmModalProps) {
  const { height: windowHeight } = useWindowDimensions();
  const ref = useRef<BottomSheet | null>(null);
  const style = useStyle();

  const [bottomInset, setBottomInset] = useState<number>(0);

  useEffect(() => {
    if (isConfirm) {
      ref.current?.expand();
    } else {
      ref.current?.close();
    }
  }, [isConfirm]);

  const handleContentLayout = useCallback(
    ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
      setBottomInset((windowHeight - layout.height) / 2);
    },
    [windowHeight]
  );

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
      containerStyle={style.ConfirmModalContainer}
      backgroundStyle={style.ConfirmModalBackground}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="none"
          opacity={0.6}
          style={style.ConfirmModalBackdrop}
        />
      )}
    >
      <BottomSheetView
        onLayout={handleContentLayout}
        style={style.ConfirmModalContent}
      >
        <View>{children}</View>
        <View style={style.ConfirmModalButtonContainer}>
          <BaseButton
            label={cancelLabel}
            variant="warning"
            size="medium"
            style={style.ConfirmModalButton}
            onPress={() => onChange?.(false)}
          />
          <BaseButton
            label={confirmLabel}
            variant="primary"
            size="medium"
            style={style.ConfirmModalButton}
            onPress={() => onChange?.(true)}
          />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}
