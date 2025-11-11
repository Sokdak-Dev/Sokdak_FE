# Sokdak 프론트엔드 프로젝트 진행 상황 보고서

## 📋 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [완료된 작업](#완료된-작업)
3. [프로젝트 구조](#프로젝트-구조)
4. [주요 컴포넌트 상세](#주요-컴포넌트-상세)
5. [다음 단계 작업 항목](#다음-단계-작업-항목)

---

## 프로젝트 개요

**프로젝트명**: Sokdak Frontend  
**기술 스택**: React 19.2.0, React Router DOM 7.9.5, Styled Components 6.1.19, Vite 7.2.2  
**목적**: 칭찬 메시지 기반 소셜 플랫폼 프론트엔드 개발

---

## 완료된 작업

### 1. 프론트엔드 프로젝트 폴더 구조 정의 ✅

프로젝트는 **Feature-based 폴더 구조**를 채택하여 확장성과 유지보수성을 고려한 구조로 설계되었습니다.

```
src/
├── components/          # 공통 컴포넌트
│   ├── BottomNav.jsx
│   ├── ProgressBar.jsx
│   └── ClubSelector/
│       ├── ClubSelector.jsx
│       └── ClubAddModal.jsx
├── features/           # 기능별 모듈
│   ├── auth/
│   ├── club/
│   ├── home/
│   ├── onboarding/
│   ├── praise/
│   ├── profile/       # 프로필 기능 (완료)
│   │   ├── api/
│   │   │   └── userApi.js
│   │   ├── components/
│   │   │   ├── ProfileHeader.jsx
│   │   │   ├── ProfileTabs.jsx
│   │   │   ├── PraiseMessage.jsx
│   │   │   ├── BadgeList.jsx
│   │   │   └── PraiseFeed.jsx
│   │   ├── hooks/
│   │   │   └── useProfile.js
│   │   └── mockData.js
│   └── ranking/
├── pages/              # 페이지 컴포넌트
│   ├── HomePage.jsx
│   ├── RankingPage.jsx
│   ├── ClubPage.jsx
│   └── MyPage.jsx
├── App.jsx
├── AppShell.jsx        # 공통 레이아웃
└── main.jsx
```

**구조의 특징:**
- **Feature-based 구조**: 각 기능별로 독립적인 모듈로 구성
- **관심사 분리**: API, 컴포넌트, 훅, 데이터를 기능별로 분리
- **재사용성**: 공통 컴포넌트와 페이지 컴포넌트 분리
- **확장성**: 새로운 기능 추가 시 features 폴더에 모듈 추가만 하면 됨

---

### 2. 공통 레이아웃과 컴포넌트 추출 및 퍼블리싱 ✅

#### 2.1 AppShell (공통 레이아웃)

**파일**: `src/AppShell.jsx`

모든 페이지에 공통으로 적용되는 레이아웃 컴포넌트입니다.

**주요 기능:**
- 모바일 화면 비율 유지 (iPhone 390×844 기준)
- 반응형 디자인 (데스크톱/모바일 대응)
- iOS 안전 영역 대응
- BottomNav 통합

**코드 구조:**
```jsx
// 핵심 레이아웃 구조
<Page>                    // 전체 화면 래퍼
  <PhoneFrame>            // 모바일 프레임 (aspect-ratio: 500/844)
    <ContentWrapper>       // 콘텐츠 영역 (flex: 1)
      {children}
    </ContentWrapper>
    <BottomNav />          // 하단 네비게이션
  </PhoneFrame>
</Page>
```

**스타일링 특징:**
- `aspect-ratio`를 사용한 반응형 비율 유지
- `100dvh` 사용으로 모바일 주소창 변화 대응
- `env(safe-area-inset-*)`로 iOS 노치 영역 대응

---

#### 2.2 BottomNav (하단 네비게이션)

**파일**: `src/components/BottomNav.jsx`

**주요 기능:**
- 4개 주요 페이지 네비게이션 (홈, 랭킹, 동아리, 마이페이지)
- 현재 경로에 따른 활성 상태 표시
- React Router와 연동된 라우팅
- 커스텀 SVG 아이콘 사용

**구현된 네비게이션 항목:**
1. **홈** (`/`) - HomeIcon
2. **랭킹** (`/ranking`) - RankingIcon
3. **동아리** (`/club`) - ClubIcon
4. **마이페이지** (`/mypage`) - MyPageIcon

**스타일링 특징:**
- 검은색 배경 (`#000000`)
- 활성 상태: 시안색 (`#2ab7ca`)
- 비활성 상태: 흰색 (`#ffffff`)
- 상단 모서리 둥글게 처리 (`border-top-left-radius: 30px`)

**코드 예시:**
```jsx
const isActive = (path) => {
  if (path === "/") {
    return location.pathname === "/";
  }
  return location.pathname.startsWith(path);
};
```

---

#### 2.3 ProgressBar (진행률 표시)

**파일**: `src/components/ProgressBar.jsx`

현재 파일이 비어있으나, 공통 컴포넌트로 구조가 준비되어 있습니다.

---

#### 2.4 ClubSelector (동아리 선택기)

**파일**: `src/components/ClubSelector/ClubSelector.jsx`, `ClubAddModal.jsx`

동아리 선택 및 추가 기능을 위한 컴포넌트 구조가 준비되어 있습니다.

---

### 3. 마이페이지 UI 퍼블리싱 ✅

마이페이지는 완전히 구현되어 있으며, 다음과 같은 기능을 포함합니다.

#### 3.1 MyPage (메인 페이지)

**파일**: `src/pages/MyPage.jsx`

**주요 기능:**
- 프로필 헤더 표시
- 탭 기반 콘텐츠 전환 (보낸/받은/뱃지)
- 스크롤 가능한 메시지 리스트
- 반응형 레이아웃

**레이아웃 구조:**
```jsx
<Container>              // 전체 컨테이너
  <HeaderSection>        // 프로필 헤더 (고정)
    <ProfileHeader />
  </HeaderSection>
  <TabsSection>          // 탭 영역 (고정)
    <ProfileTabs />
  </TabsSection>
  <ScrollableContent>    // 스크롤 가능한 콘텐츠
    {activeTab === "badges" ? (
      <BadgeList />
    ) : (
      <MessagesContainer>
        {messages.map(...)}
      </MessagesContainer>
    )}
  </ScrollableContent>
</Container>
```

---

#### 3.2 ProfileHeader (프로필 헤더)

**파일**: `src/features/profile/components/ProfileHeader.jsx`

**주요 기능:**
- 사용자 프로필 이미지 표시 (원형, 87px)
- 사용자 이름 및 대학교 정보
- 소속 동아리 목록 표시
- 프로필 이미지 추가 버튼
- 설정 및 편집 버튼

**표시되는 정보:**
- 프로필 이미지 (원형, 테두리 포함)
- 사용자 이름 (20px, bold, 흰색)
- 대학교 (12px, 시안색 `#2ab7ca`)
- 동아리 목록 (14px, 흰색)

**액션 버튼:**
- 설정 버튼 (우측 상단)
- 편집 버튼 (우측 상단)
- 프로필 이미지 추가 버튼 (프로필 이미지 하단)

**스타일링 특징:**
- 상단 패딩 90px (상태바 영역 고려)
- 반투명 배경의 아이콘 버튼
- 호버/액티브 상태 처리

---

#### 3.3 ProfileTabs (프로필 탭)

**파일**: `src/features/profile/components/ProfileTabs.jsx`

**주요 기능:**
- 3개 탭 전환 (보낸/받은/뱃지)
- 활성 탭 시각적 표시
- 접근성 고려 (aria-label, role)

**탭 구성:**
1. **보낸** (`sent`) - 사용자가 보낸 칭찬 메시지
2. **받은** (`received`) - 사용자가 받은 칭찬 메시지
3. **뱃지** (`badges`) - 획득한 뱃지 목록

**스타일링 특징:**
- 활성 탭: 흰색 텍스트, 굵은 글씨, 하단 흰색 테두리
- 비활성 탭: 회색 텍스트 (`#9f9f9f`), 얇은 글씨
- 부드러운 전환 효과 (`transition: all 0.2s ease`)

---

#### 3.4 PraiseMessage (칭찬 메시지 카드)

**파일**: `src/features/profile/components/PraiseMessage.jsx`

**주요 기능:**
- 칭찬 메시지 카드 표시
- 성별에 따른 색상 구분 (남자: 시안 `#2AB7CA`, 여자: 빨강 `#FE4B4A`)
- 익명/실명 표시
- 상대적 시간 표시 (방금 전, N분 전, N시간 전, N일 전)

**표시되는 정보:**
- 발신자/수신자 이름 (또는 "익명")
- 성별 아이콘 (파란/주황 버블)
- 메시지 내용
- 타임스탬프

**스타일링 특징:**
- 어두운 배경 (`#353535`)
- 성별에 따른 테두리 색상
- 둥근 모서리 (`border-radius: 10px`)
- 적절한 패딩 및 간격

**코드 예시:**
```jsx
const borderColor = message.gender === "male" ? "#2AB7CA" : "#FE4B4A";
const bubbleIcon = message.gender === "male" 
  ? "/assets/blue-bubble.png" 
  : "/assets/orenge-bubble.png";
```

---

#### 3.5 BadgeList (뱃지 목록)

**파일**: `src/features/profile/components/BadgeList.jsx`

**주요 기능:**
- 3열 그리드 레이아웃으로 뱃지 표시
- 획득/미획득 상태 시각적 구분
- 획득한 뱃지는 오버레이 표시

**레이아웃:**
- 그리드: 3열 (`grid-template-columns: repeat(3, 1fr)`)
- 뱃지 크기: 75px × 75px
- 간격: 행 48px, 열 10px

**상태 표시:**
- 획득한 뱃지: 불투명도 1.0 + 오버레이 아이콘
- 미획득 뱃지: 불투명도 0.5

---

#### 3.6 Mock Data (목 데이터)

**파일**: `src/features/profile/mockData.js`

개발 및 테스트를 위한 목 데이터가 완전히 구현되어 있습니다.

**포함된 데이터:**
- `mockUserProfile`: 사용자 프로필 정보
- `mockReceivedMessages`: 받은 칭찬 메시지 (6개)
- `mockSentMessages`: 보낸 칭찬 메시지 (6개)
- `mockBadges`: 뱃지 목록 (12개)
- `formatTimeAgo`: 상대적 시간 포맷팅 함수

**데이터 구조 예시:**
```javascript
export const mockReceivedMessages = [
  {
    id: 1,
    senderName: "익명",
    senderId: null,
    content: "예쁘고 사랑스럽고...",
    gender: "male",
    timestamp: new Date(...).toISOString(),
    isAnonymous: true,
  },
  // ...
];
```

---

## 프로젝트 구조

### 라우팅 구조

**파일**: `src/main.jsx`

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "ranking", element: <RankingPage /> },
      { path: "club", element: <ClubPage /> },
      { path: "mypage", element: <MyPage /> },
    ],
  },
]);
```

### 전역 스타일

**파일**: `src/App.jsx`

- `createGlobalStyle`을 사용한 전역 스타일 리셋
- 폰트 설정 (Inter, Noto Sans KR)
- 박스 모델 통일 (`box-sizing: border-box`)

---

## 주요 컴포넌트 상세

### 완성도 높은 컴포넌트

1. ✅ **BottomNav** - 완전 구현, 라우팅 연동 완료
2. ✅ **ProfileHeader** - 완전 구현, UI 완성
3. ✅ **ProfileTabs** - 완전 구현, 탭 전환 기능 완료
4. ✅ **PraiseMessage** - 완전 구현, 성별별 스타일링 완료
5. ✅ **BadgeList** - 완전 구현, 그리드 레이아웃 완료
6. ✅ **MyPage** - 완전 구현, 통합 페이지 완성
7. ✅ **AppShell** - 완전 구현, 공통 레이아웃 완성

### 준비된 구조 (구현 필요)

1. ⚠️ **ProgressBar** - 파일 존재하나 내용 비어있음
2. ⚠️ **ClubSelector** - 파일 존재하나 내용 비어있음
3. ⚠️ **ClubAddModal** - 파일 존재하나 내용 비어있음
4. ⚠️ **PraiseFeed** - 파일 존재하나 내용 비어있음 (1줄만)
5. ⚠️ **useProfile** - 파일 존재하나 내용 비어있음
6. ⚠️ **userApi** - 파일 존재하나 내용 비어있음

---

## 다음 단계 작업 항목

### 우선순위 높음 🔴

1. **API 연동**
   - [ ] `src/features/profile/api/userApi.js` 구현
   - [ ] `src/features/profile/hooks/useProfile.js` 구현
   - [ ] Mock Data를 실제 API 호출로 교체

2. **나머지 페이지 구현**
   - [ ] `HomePage.jsx` - 홈 페이지 UI 구현
   - [ ] `RankingPage.jsx` - 랭킹 페이지 UI 구현
   - [ ] `ClubPage.jsx` - 동아리 페이지 UI 구현

3. **공통 컴포넌트 완성**
   - [ ] `ProgressBar.jsx` - 진행률 표시 컴포넌트 구현
   - [ ] `ClubSelector.jsx` - 동아리 선택 컴포넌트 구현
   - [ ] `ClubAddModal.jsx` - 동아리 추가 모달 구현

### 우선순위 중간 🟡

4. **인증 기능**
   - [ ] `src/features/auth/` 모듈 구현
   - [ ] 로그인/회원가입 페이지
   - [ ] 인증 상태 관리

5. **프로필 기능 확장**
   - [ ] 프로필 편집 모달 구현
   - [ ] 설정 페이지 구현
   - [ ] 프로필 이미지 업로드 기능

6. **칭찬 기능**
   - [ ] `src/features/praise/` 모듈 구현
   - [ ] 칭찬 메시지 작성 페이지
   - [ ] `PraiseFeed.jsx` 구현

### 우선순위 낮음 🟢

7. **온보딩**
   - [ ] `src/features/onboarding/` 모듈 구현
   - [ ] 첫 사용자 가이드

8. **동아리 기능**
   - [ ] `src/features/club/` 모듈 구현
   - [ ] 동아리 상세 페이지
   - [ ] 동아리 멤버 관리

9. **랭킹 기능**
   - [ ] `src/features/ranking/` 모듈 구현
   - [ ] 랭킹 알고리즘 연동

10. **홈 기능**
    - [ ] `src/features/home/` 모듈 구현
    - [ ] 피드 기능

---

## 기술적 특징

### 사용된 기술

- **React 19.2.0**: 최신 React 버전 사용
- **React Router DOM 7.9.5**: 클라이언트 사이드 라우팅
- **Styled Components 6.1.19**: CSS-in-JS 스타일링
- **Vite 7.2.2**: 빠른 개발 서버 및 빌드 도구

### 스타일링 접근법

- **Styled Components**: 컴포넌트별 스타일 캡슐화
- **Props 기반 동적 스타일**: `$active`, `$borderColor` 등
- **반응형 디자인**: `aspect-ratio`, `min()`, `max()` 활용
- **모바일 우선**: 모바일 화면 비율 기준 설계

### 코드 품질

- ✅ 컴포넌트 분리 및 재사용성 고려
- ✅ Props 타입 및 기본값 설정
- ✅ 접근성 고려 (aria-label, role)
- ✅ 주석 및 TODO 주석 활용

---

## 현재 상태 요약

### 완료된 작업 ✅
- ✅ 프로젝트 폴더 구조 정의 (Feature-based)
- ✅ 공통 레이아웃 (AppShell) 구현
- ✅ 하단 네비게이션 (BottomNav) 구현
- ✅ 마이페이지 전체 UI 구현
  - ✅ 프로필 헤더
  - ✅ 탭 전환 기능
  - ✅ 칭찬 메시지 카드
  - ✅ 뱃지 목록
- ✅ Mock Data 준비

### 진행 중 / 준비된 구조 ⚠️
- ⚠️ API 연동 준비 (파일 구조만 존재)
- ⚠️ 나머지 페이지들 (파일만 존재)
- ⚠️ 공통 컴포넌트 일부 (파일만 존재)

### 미시작 ❌
- ❌ 인증 기능
- ❌ 실제 API 연동
- ❌ 나머지 기능 모듈들

---

## 결론

프로젝트는 **마이페이지 UI 퍼블리싱**과 **공통 레이아웃 구축**이 완료되었으며, 확장 가능한 **Feature-based 폴더 구조**가 잘 정의되어 있습니다. 다음 단계로는 **API 연동**과 **나머지 페이지 구현**에 집중하면 됩니다.

**완성도**: 약 30-40% (UI/UX 기준)

