# CI/CD 설정 가이드

이 문서는 fastlane과 GitHub Actions를 사용하여 iOS/Android 앱을 자동으로 빌드하고 배포하는 CI/CD 파이프라인 설정 방법을 설명합니다.

## 📋 목차

1. [개요](#개요)
2. [사전 요구사항](#사전-요구사항)
3. [Self-hosted Runner 설정](#self-hosted-runner-설정)
4. [Firebase App Distribution 설정](#firebase-app-distribution-설정)
5. [iOS 설정](#ios-설정)
6. [Android 설정](#android-설정)
7. [GitHub Secrets 설정](#github-secrets-설정)
8. [배포 방법](#배포-방법)
9. [문제 해결](#문제-해결)

---

## 개요

### CI/CD 파이프라인 구조

```
┌──────────────────────┐
│   GitHub Actions     │
│ (Self-hosted Runner) │
└──────────┬───────────┘
           │
           ├─> main 브랜치 푸시
           │   ├─> iOS Build → Firebase App Distribution
           │   └─> Android Build → Firebase App Distribution
           │
           └─> 태그 푸시 (v1.0.0)
               ├─> iOS Build → TestFlight
               └─> Android Build → Play Store
```

### 워크플로우

- **main 브랜치 푸시**: Firebase App Distribution으로 내부 테스터에게 배포
- **태그 푸시** (`v*.*.*`): TestFlight 및 Play Store로 릴리스 배포

---

## 사전 요구사항

### 맥미니 환경 준비

Self-hosted runner로 사용할 맥미니에 다음 도구들이 설치되어 있어야 합니다:

1. **Xcode** (최신 버전 권장)
   ```bash
   # Xcode 설치 확인
   xcodebuild -version

   # Command Line Tools 설치
   xcode-select --install
   ```

2. **Node.js** (v20 이상)
   ```bash
   # nvm 사용 권장
   brew install nvm
   nvm install 20
   nvm use 20
   ```

3. **Yarn**
   ```bash
   npm install -g yarn
   ```

4. **Ruby** (3.2 이상, fastlane용)
   ```bash
   # rbenv 사용 권장
   brew install rbenv
   rbenv install 3.2.0
   rbenv global 3.2.0
   ```

5. **Bundler**
   ```bash
   gem install bundler
   ```

6. **Android Studio** (Android SDK 포함)
   - Android Studio 다운로드: https://developer.android.com/studio
   - SDK 설치 경로 확인: `~/Library/Android/sdk`
   - 환경변수 설정:
     ```bash
     export ANDROID_HOME=$HOME/Library/Android/sdk
     export PATH=$PATH:$ANDROID_HOME/emulator
     export PATH=$PATH:$ANDROID_HOME/platform-tools
     ```

7. **Java 17**
   ```bash
   brew install openjdk@17
   ```

---

## Self-hosted Runner 설정

### 1. GitHub Runner 다운로드 및 설치

1. GitHub 레포지토리 → **Settings** → **Actions** → **Runners** → **New self-hosted runner**
2. macOS 선택 후 표시되는 명령어 실행:

```bash
# 예시 (실제 토큰은 GitHub에서 제공됨)
mkdir actions-runner && cd actions-runner
curl -o actions-runner-osx-x64-2.311.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.311.0/actions-runner-osx-x64-2.311.0.tar.gz
tar xzf ./actions-runner-osx-x64-2.311.0.tar.gz
./config.sh --url https://github.com/YOUR_USERNAME/zet-app --token YOUR_TOKEN
./run.sh
```

### 2. 서비스로 등록 (선택사항)

맥미니 재부팅 시에도 자동으로 실행되도록 설정:

```bash
cd ~/actions-runner
./svc.sh install
./svc.sh start
```

### 3. Runner 확인

GitHub 레포지토리 → Settings → Actions → Runners에서 runner가 **Active** 상태인지 확인

---

## Firebase App Distribution 설정

### 1. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/) 접속
2. **프로젝트 추가** 클릭
3. 프로젝트 이름 입력 (예: `zet-app`)
4. Google Analytics 설정 (선택사항)
5. 프로젝트 생성 완료

### 2. iOS 앱 추가

1. Firebase 프로젝트 → **프로젝트 설정**
2. **앱 추가** → **iOS** 선택
3. Bundle ID 입력: `com.geniusproject.zet`
4. 앱 등록 완료
5. **앱 ID** 복사 (형식: `1:123456789:ios:abcdef`)

### 3. Android 앱 추가

1. Firebase 프로젝트 → **프로젝트 설정**
2. **앱 추가** → **Android** 선택
3. Package name 입력: `com.anonymous.zet`
4. 앱 등록 완료
5. **앱 ID** 복사 (형식: `1:123456789:android:abcdef`)

### 4. App Distribution 설정

1. Firebase Console → **App Distribution**
2. **테스터 그룹 만들기**
   - 그룹 이름: `internal-testers`
   - 테스터 이메일 추가

### 5. Firebase CLI 토큰 생성

```bash
# Firebase CLI 설치
npm install -g firebase-tools

# 로그인 및 토큰 생성
firebase login:ci
```

토큰이 출력되면 복사해두기 (GitHub Secrets에 저장할 예정)

---

## iOS 설정

### 1. Apple Developer 계정

- [Apple Developer Program](https://developer.apple.com/programs/) 가입 필요 (연간 $99)

### 2. Bundle ID 등록

1. [Apple Developer Portal](https://developer.apple.com/account/) 접속
2. **Certificates, Identifiers & Profiles** → **Identifiers**
3. **+** 버튼 클릭 → **App IDs** 선택
4. Bundle ID 입력: `com.geniusproject.zet`
5. Capabilities 설정 (필요한 기능 체크)

### 3. Distribution Certificate 생성

#### 로컬 맥미니에서:

```bash
# Certificate Signing Request (CSR) 생성
openssl req -new -newkey rsa:2048 -nodes -keyout ios_distribution.key -out CertificateSigningRequest.certSigningRequest

# Apple Developer Portal로 이동
```

1. **Certificates** → **+** 버튼
2. **Apple Distribution** 선택
3. CSR 파일 업로드
4. 생성된 인증서 다운로드 (`distribution.cer`)

```bash
# .p12 파일로 변환
openssl x509 -in distribution.cer -inform DER -out distribution.pem -outform PEM
openssl pkcs12 -export -out ios_distribution.p12 -inkey ios_distribution.key -in distribution.pem -password pass:YOUR_CERTIFICATE_PASSWORD

# Base64 인코딩 (GitHub Secrets용)
base64 -i ios_distribution.p12 -o ios_distribution_base64.txt
```

### 4. Provisioning Profile 생성

#### Ad-Hoc Profile (Firebase용):

1. **Profiles** → **+** 버튼
2. **Ad Hoc** 선택
3. App ID 선택
4. Certificate 선택
5. 테스트 디바이스 선택 (등록된 디바이스만 설치 가능)
6. Profile 이름 입력 (예: `Zet AdHoc`)
7. 다운로드 후 Base64 인코딩:

```bash
base64 -i Zet_AdHoc.mobileprovision -o provisioning_profile_base64.txt
```

#### App Store Profile (TestFlight용):

1. **Profiles** → **+** 버튼
2. **App Store** 선택
3. App ID, Certificate 선택
4. Profile 이름 입력 (예: `Zet AppStore`)
5. 다운로드 후 Base64 인코딩

### 5. App Store Connect API Key 생성

TestFlight 자동 업로드를 위해 필요:

1. [App Store Connect](https://appstoreconnect.apple.com/) 접속
2. **Users and Access** → **Keys** → **+** 버튼
3. Key Name 입력, **Developer** 권한 선택
4. API Key 다운로드 (`AuthKey_XXXXXXXXXX.p8`)
5. **Issuer ID**와 **Key ID** 복사

```bash
# Base64 인코딩
base64 -i AuthKey_XXXXXXXXXX.p8 -o app_store_connect_api_key_base64.txt
```

---

## Android 설정

### 1. Android Keystore 생성

```bash
# Keystore 생성
keytool -genkeypair -v -storetype PKCS12 -keystore release.keystore -alias zet-key -keyalg RSA -keysize 2048 -validity 10000

# 정보 입력
# - 비밀번호 입력 (KEYSTORE_PASSWORD)
# - 이름, 조직 등 정보 입력
# - Key 비밀번호 입력 (KEY_PASSWORD, 보통 keystore와 동일하게)

# Base64 인코딩 (GitHub Secrets용)
base64 -i release.keystore -o android_keystore_base64.txt
```

**중요**: `release.keystore` 파일은 안전하게 백업하세요! 분실 시 앱 업데이트 불가능!

### 2. Google Play Console 설정

#### 앱 등록:

1. [Google Play Console](https://play.google.com/console/) 접속
2. **앱 만들기**
3. 앱 이름, 기본 언어, 앱/게임 선택
4. 앱 만들기 완료

#### 내부 테스트 트랙 설정:

1. **출시** → **테스트** → **내부 테스트**
2. **새 릴리스 만들기**
3. 테스터 목록 추가

#### Service Account 생성:

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 프로젝트 선택 (Play Console과 연동된 프로젝트)
3. **IAM 및 관리자** → **서비스 계정**
4. **서비스 계정 만들기**
   - 이름: `fastlane-deploy`
   - 역할: **Service Account User**
5. **키 만들기** → **JSON** 선택 → 다운로드

#### Play Console에 서비스 계정 연결:

1. Play Console → **설정** → **API 액세스**
2. **서비스 계정 연결**
3. 위에서 만든 서비스 계정 선택
4. **권한 부여** → **출시 관리** 권한 추가

```bash
# JSON 키 파일 Base64 인코딩
base64 -i google-play-service-account.json -o google_play_json_key_base64.txt
```

---

## GitHub Secrets 설정

### Secrets 추가 방법

1. GitHub 레포지토리 → **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret** 클릭
3. 아래 목록의 각 secret을 추가

### 필수 Secrets 목록

#### iOS Secrets

| Secret Name | Description | 예시 |
|------------|-------------|------|
| `IOS_BUNDLE_ID` | iOS 앱 Bundle ID | `com.geniusproject.zet` |
| `APPLE_ID` | Apple Developer 계정 이메일 | `developer@example.com` |
| `APPLE_TEAM_ID` | Apple Developer Team ID | `ABC123XYZ` |
| `IOS_PROVISIONING_PROFILE_NAME` | Provisioning Profile 이름 | `Zet AdHoc` |
| `IOS_CERTIFICATE_BASE64` | Distribution Certificate (.p12) Base64 | `MIIKmQIBA...` |
| `IOS_CERTIFICATE_PASSWORD` | Certificate 비밀번호 | `your-password` |
| `IOS_PROVISIONING_PROFILE_BASE64` | Provisioning Profile Base64 | `MIIOYwYJKo...` |
| `APP_STORE_CONNECT_API_KEY_BASE64` | App Store Connect API Key (.p8) Base64 | `MIGTAgEAMB...` |

#### Android Secrets

| Secret Name | Description | 예시 |
|------------|-------------|------|
| `ANDROID_KEYSTORE_BASE64` | Keystore 파일 Base64 | `/u3+7QAAAA...` |
| `ANDROID_KEYSTORE_PASSWORD` | Keystore 비밀번호 | `your-keystore-password` |
| `ANDROID_KEY_ALIAS` | Key alias | `zet-key` |
| `ANDROID_KEY_PASSWORD` | Key 비밀번호 | `your-key-password` |
| `GOOGLE_PLAY_JSON_KEY_BASE64` | Google Play Service Account JSON Base64 | `ewogICJ0eXB...` |

#### Firebase Secrets

| Secret Name | Description | 예시 |
|------------|-------------|------|
| `FIREBASE_TOKEN` | Firebase CLI 토큰 | `1//0abcdef...` |
| `FIREBASE_IOS_APP_ID` | Firebase iOS 앱 ID | `1:123456789:ios:abcdef` |
| `FIREBASE_ANDROID_APP_ID` | Firebase Android 앱 ID | `1:123456789:android:abcdef` |

---

## 배포 방법

### 1. Firebase App Distribution 배포 (내부 테스트)

```bash
# main 브랜치에 푸시
git checkout main
git add .
git commit -m "feat: 새로운 기능 추가"
git push origin main
```

자동으로:
- GitHub Actions가 트리거됨
- iOS/Android 빌드 생성
- Firebase App Distribution에 업로드
- `internal-testers` 그룹에 알림 전송

### 2. TestFlight & Play Store 배포 (릴리스)

```bash
# 버전 태그 생성 및 푸시
git tag v1.0.0
git push origin v1.0.0
```

자동으로:
- GitHub Actions가 트리거됨
- iOS 빌드 → TestFlight 업로드
- Android 빌드 → Play Store Internal Testing 트랙 업로드

### 3. 배포 상태 확인

- GitHub: **Actions** 탭에서 워크플로우 진행 상황 확인
- Firebase: App Distribution 페이지에서 빌드 확인
- TestFlight: App Store Connect에서 처리 상태 확인
- Play Store: Play Console에서 릴리스 상태 확인

---

## 문제 해결

### 일반적인 문제

#### 1. Self-hosted Runner 연결 안 됨

```bash
# Runner 재시작
cd ~/actions-runner
./svc.sh stop
./svc.sh start

# 로그 확인
tail -f ~/actions-runner/_diag/*.log
```

#### 2. iOS 빌드 실패: "No profiles for 'com.geniusproject.zet' were found"

- Provisioning Profile이 올바르게 설치되었는지 확인
- Profile Base64 인코딩이 정확한지 확인
- Bundle ID가 일치하는지 확인

```bash
# Profile 확인
ls ~/Library/MobileDevice/Provisioning\ Profiles/
```

#### 3. Android 빌드 실패: "Keystore was tampered with"

- Keystore 비밀번호가 올바른지 확인
- Base64 인코딩/디코딩이 정확한지 확인

```bash
# Keystore 검증
keytool -list -v -keystore release.keystore
```

#### 4. Firebase 업로드 실패: "Invalid token"

```bash
# 새 토큰 생성
firebase login:ci
```

#### 5. expo prebuild 실패

```bash
# 로컬에서 테스트
npx expo prebuild --platform ios --clean
npx expo prebuild --platform android --clean
```

### 로그 확인

GitHub Actions 워크플로우 로그에서 상세한 오류 메시지 확인 가능

---

## 추가 리소스

- [Fastlane 문서](https://docs.fastlane.tools/)
- [Expo Prebuild 문서](https://docs.expo.dev/workflow/prebuild/)
- [GitHub Actions 문서](https://docs.github.com/en/actions)
- [Firebase App Distribution 문서](https://firebase.google.com/docs/app-distribution)
- [App Store Connect API 문서](https://developer.apple.com/documentation/appstoreconnectapi)
- [Google Play Console 문서](https://support.google.com/googleplay/android-developer)

---

## 버전 관리

앱 버전 관리는 `app.json`에서 수동으로 관리:

```json
{
  "expo": {
    "version": "1.0.0",
    ...
  }
}
```

빌드 번호는 fastlane이 자동으로 증가시킴:
- iOS: `increment_build_number`
- Android: `increment_version_code`

---

## 보안 주의사항

1. ✅ **모든 인증서와 키는 GitHub Secrets에 Base64로 저장**
2. ✅ **로컬 `.env` 파일은 절대 커밋하지 않기** (이미 `.gitignore`에 포함됨)
3. ✅ **Keystore 파일은 안전하게 백업**
4. ✅ **Firebase 토큰, API 키 등은 주기적으로 갱신**
5. ✅ **Self-hosted runner는 신뢰할 수 있는 기기에서만 실행**

---

이제 CI/CD 파이프라인 구축이 완료되었습니다! 🎉

궁금한 점이 있으면 이슈를 생성하거나 팀에 문의하세요.
