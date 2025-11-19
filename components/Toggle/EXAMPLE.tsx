/**
 * BaseToggle 컴포넌트 사용 예제
 *
 * 이 파일은 Toggle 컴포넌트를 어떻게 사용하는지 보여줍니다.
 */

import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BaseToggle } from "@/components";

/**
 * 예제 1: 기본 사용
 */
export function BasicToggleExample() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View style={styles.section}>
      <Text style={styles.label}>알림 설정</Text>
      <BaseToggle value={isEnabled} onValueChange={setIsEnabled} />
    </View>
  );
}

/**
 * 예제 2: 크기 변형
 */
export function ToggleSizesExample() {
  const [small, setSmall] = useState(false);
  const [medium, setMedium] = useState(false);
  const [large, setLarge] = useState(false);

  return (
    <View style={styles.section}>
      <View style={styles.row}>
        <Text style={styles.label}>Small</Text>
        <BaseToggle value={small} onValueChange={setSmall} size="small" />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Medium (기본)</Text>
        <BaseToggle value={medium} onValueChange={setMedium} size="medium" />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Large</Text>
        <BaseToggle value={large} onValueChange={setLarge} size="large" />
      </View>
    </View>
  );
}

/**
 * 예제 3: 비활성화 상태
 */
export function DisabledToggleExample() {
  return (
    <View style={styles.section}>
      <View style={styles.row}>
        <Text style={styles.label}>비활성화 (OFF)</Text>
        <BaseToggle value={false} onValueChange={() => {}} disabled={true} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>비활성화 (ON)</Text>
        <BaseToggle value={true} onValueChange={() => {}} disabled={true} />
      </View>
    </View>
  );
}

/**
 * 예제 4: 설정 화면 스타일
 */
export function SettingsToggleExample() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.settingsContainer}>
      <View style={styles.settingItem}>
        <View>
          <Text style={styles.settingTitle}>푸시 알림</Text>
          <Text style={styles.settingDescription}>
            새로운 메시지와 업데이트를 받습니다
          </Text>
        </View>
        <BaseToggle
          value={pushNotifications}
          onValueChange={setPushNotifications}
        />
      </View>

      <View style={styles.settingItem}>
        <View>
          <Text style={styles.settingTitle}>이메일 알림</Text>
          <Text style={styles.settingDescription}>
            이메일로 알림을 받습니다
          </Text>
        </View>
        <BaseToggle
          value={emailNotifications}
          onValueChange={setEmailNotifications}
        />
      </View>

      <View style={styles.settingItem}>
        <View>
          <Text style={styles.settingTitle}>다크 모드</Text>
          <Text style={styles.settingDescription}>
            어두운 테마를 사용합니다
          </Text>
        </View>
        <BaseToggle value={darkMode} onValueChange={setDarkMode} />
      </View>
    </View>
  );
}

/**
 * 예제 5: 전체 데모
 */
export function ToggleDemo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Toggle 컴포넌트 데모</Text>

      <Text style={styles.sectionTitle}>1. 기본 사용</Text>
      <BasicToggleExample />

      <Text style={styles.sectionTitle}>2. 크기 변형</Text>
      <ToggleSizesExample />

      <Text style={styles.sectionTitle}>3. 비활성화 상태</Text>
      <DisabledToggleExample />

      <Text style={styles.sectionTitle}>4. 설정 화면 예제</Text>
      <SettingsToggleExample />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  section: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
  },
  settingsContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: "#666",
  },
});

/**
 * 사용법:
 *
 * import { BaseToggle } from "@/components";
 *
 * const [value, setValue] = useState(false);
 *
 * <BaseToggle
 *   value={value}
 *   onValueChange={setValue}
 *   size="medium"        // 선택: "small" | "medium" | "large"
 *   disabled={false}     // 선택: true | false
 *   style={customStyle}  // 선택: 커스텀 스타일
 * />
 *
 * 특징:
 * - 부드러운 300ms 애니메이션
 * - 3가지 크기 옵션 (small, medium, large)
 * - 접근성 지원 (VoiceOver, TalkBack)
 * - Press 상태 시각적 피드백
 * - 확대된 터치 영역 (hitSlop)
 *
 * 색상:
 * - OFF: 배경 GRAY[700], Thumb GRAY[400]
 * - ON: 배경 GRAY[600], Thumb 흰색 (COMMON[100])
 * - Disabled: 배경 GRAY[800], Thumb GRAY[600]
 */
