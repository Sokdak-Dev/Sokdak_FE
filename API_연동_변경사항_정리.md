# API 연동 코드 변경사항 정리 (2025-12-06 ~ 2025-12-07)

## 📅 커밋 내역

### 12월 6일 (699c011)
**커밋 메시지**: `chore: API 연동 코드 정리`

### 12월 7일 (97c68d6)
**커밋 메시지**: `feat: 온보딩 컴포넌트 분리, 커스텀 훅 생성`

---

## 🔄 주요 변경사항

### 1. 중앙화된 API 클라이언트 생성 (`src/lib/apiClient.js`)

#### 변경 전
- ❌ **API 클라이언트가 없었음**
- 각 컴포넌트/훅에서 직접 `fetch()` 사용
- 인증 토큰 관리가 분산되어 있음
- 에러 처리 로직이 각각 다름

#### 변경 후
- ✅ **`apiClient.js` 새로 생성** (115줄)
- Axios 기반 중앙화된 API 클라이언트
- 전역 인터셉터로 인증 및 에러 처리 자동화

**주요 기능:**
```javascript
// 목 데이터 모드 지원
export const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

// 세션 기반 인증 (쿠키 자동 전송)
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true, // JSESSIONID 쿠키 자동 전송
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// 응답 인터셉터: 401 에러 시 자동 로그아웃 처리
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

**API 엔드포인트 상수 정의:**
```javascript
export const API_ENDPOINTS = {
  MEMBERS: { REGISTER, LOGIN, LOGOUT, ME, INFO, UPDATE, DELETE, ... },
  CLUBS: { CREATE, DELETE, GET, SEARCH, JOIN, MEMBERS, ... },
  COMPLIMENTS: { GIVE, SELECT, EMBEDDING },
  RANKING: { GET },
};
```

---

### 2. 인증 방식 변경

#### 변경 전
```javascript
// AuthProvider.jsx (이전)
async function fetchUserProfile() {
  const res = await fetch('/data/user-profile.json', {
    headers: { 'Accept': 'application/json' }
  });
  return res.json();
}

const login = async (userData) => {
  setUser(userData);  // 단순히 상태만 업데이트
  setError(null);
};

const logout = () => {
  setUser(null);  // 단순히 상태만 초기화
  setError(null);
};
```

#### 변경 후
```javascript
// AuthProvider.jsx (이후)
import { getUserProfile } from '../profile/api/userApi.js';
import { login as loginApi, logout as logoutApi } from './api/authApi.js';

// 실제 API 호출
const userData = await getUserProfile();

const login = async (credentials) => {
  // 1. 로그인 API 호출 (서버가 JSESSIONID 쿠키를 설정함)
  await loginApi(credentials);
  
  // 2. 로그인 성공 후 내 정보 조회
  const userData = await getUserProfile();
  
  setUser(userData);
  return userData;
};

const logout = async () => {
  // 서버에 로그아웃 요청 (세션 무효화)
  await logoutApi();
  setUser(null);
  setError(null);
};
```

**인증 방식:**
- ❌ **변경 전**: Bearer 토큰 방식 (localStorage에 저장)
- ✅ **변경 후**: 세션 쿠키 방식 (JSESSIONID, `withCredentials: true`)

---

### 3. API 파일 구조화

#### 새로 생성된 API 파일들

**인증 관련:**
- `src/features/auth/api/authApi.js` (새로 생성)
  - `login()`: 로그인 API
  - `logout()`: 로그아웃 API

**동아리 관련:**
- `src/features/club/api/clubApi.js` (새로 생성)
  - `getClub()`, `getClubMembers()`, `searchClubs()`, `joinClub()`, 등

**프로필 관련:**
- `src/features/profile/api/userApi.js` (수정/확장)
  - `getUserProfile()`, `getMemberInfo()`, `updateUserProfile()`, `deleteUserProfile()`
- `src/features/profile/api/badgesApi.js` (새로 생성)
- `src/features/profile/api/messageApi.js` (새로 생성)
- `src/features/profile/api/universityApi.js` (새로 생성)

**칭찬 관련:**
- `src/features/praise/api/praiseApi.js` (새로 생성)
  - `giveCompliment()`, `selectCompliment()`, `getComplimentEmbedding()`

**랭킹 관련:**
- `src/features/ranking/api/rankingApi.js` (새로 생성)
  - `getRankings()`

---

### 4. 커스텀 훅 리팩토링

#### 예시: `useClub.js`

**변경 전:**
```javascript
export default function useClub(clubId) {
  const [data, setData] = useState(null);
  const dataUrl = useMemo(() => {
    return '/data/clubs.json';
  }, []);

  useEffect(() => {
    async function load() {
      const res = await fetch(dataUrl, { 
        headers: { 'Accept': 'application/json' } 
      });
      const json = await res.json();
      const club = json.find((c) => c.id.toString() === clubId.toString());
      setData(club);
    }
    load();
  }, [clubId, dataUrl]);

  return { data, loading, error };
}
```

**변경 후:**
```javascript
import { getClub } from '../api/clubApi.js';

export default function useClub(clubId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const result = await getClub(clubId);  // API 함수 사용
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [clubId]);

  return { data, loading, error };
}
```

**변경 사항:**
- ✅ 직접 `fetch()` 호출 제거
- ✅ API 함수(`getClub`) 사용으로 로직 분리
- ✅ 목 데이터/실제 API 전환 로직이 API 함수 내부로 이동

---

### 5. 목 데이터 지원 체계화

#### 변경 전
- 하드코딩된 JSON 파일 경로 (`/data/user-profile.json`)
- 목 데이터와 실제 API 구분 없음

#### 변경 후
```javascript
// 각 API 함수에서 목 데이터 모드 지원
export const getUserProfile = async () => {
  let endpoint;
  if (USE_MOCK_DATA) {
    // 목 데이터 경로: /data/user-profile.json
    endpoint = getApiUrl('/data/user-profile.json');
  } else {
    // 실제 API 경로: /api/members/me
    endpoint = API_ENDPOINTS.MEMBERS.ME;
  }
  const response = await apiClient.get(endpoint);
  return response.data;
};
```

**환경 변수:**
- `.env`에 `VITE_USE_MOCK_DATA=true` 추가
- 목 데이터 모드와 실제 API 모드 전환 가능

---

### 6. 세션 유틸리티 추가 (`src/lib/sessionUtils.js`)

**새로 생성된 파일:**
```javascript
// 개발 모드에서 세션 쿠키 수동 설정 가능
export function setSessionCookie(sessionId, domain, path);
export function clearSessionCookie();
export function getSessionCookie();
```

**용도:**
- 개발 모드에서 로그인 없이 다른 기능 테스트 가능
- 브라우저 콘솔에서 직접 세션 쿠키 설정 가능

---

### 7. 개발 모드 인증 우회 기능

**추가된 기능:**
```javascript
// apiClient.js
export const SKIP_AUTH = import.meta.env.VITE_SKIP_AUTH === 'true' || import.meta.env.DEV;

// 401 에러 시 개발 모드에서는 리다이렉트하지 않음
if (!SKIP_AUTH) {
  window.location.href = '/login';
} else {
  console.warn('401 Unauthorized - 인증이 필요합니다. (개발 모드: 리다이렉트 비활성화)');
}
```

**AuthProvider.jsx:**
```javascript
// 개발 모드에서는 사용자 정보 로드 실패해도 앱이 계속 동작
if (SKIP_AUTH) {
  console.warn('사용자 정보를 불러올 수 없습니다. (개발 모드: 계속 진행)');
  setError(null);
} else {
  setError(err);
}
```

---

### 8. main.jsx 변경사항 (12월 7일)

**추가된 내용:**
```javascript
// 세션 유틸리티 초기화
import "./lib/sessionUtils.js";

// 온보딩 페이지 라우트 추가
{
  path: "onboarding",
  element: <OnboardingPage />,
}
```

---

## 📊 변경 통계

### 12월 6일 커밋 (699c011)
- **36개 파일 변경**
- **1,477줄 추가, 300줄 삭제**
- 주요 변경 파일:
  - `src/lib/apiClient.js` (새로 생성)
  - `src/features/auth/AuthProvider.jsx` (수정)
  - 여러 API 파일들 생성/수정
  - 커스텀 훅들 리팩토링

### 12월 7일 커밋 (97c68d6)
- **8개 파일 변경**
- **1,166줄 추가**
- API 직접 변경은 없지만, `main.jsx`에 세션 유틸리티 import 추가

---

## 🎯 주요 개선점

1. **코드 중앙화**: 모든 API 호출이 `apiClient`를 통해 이루어짐
2. **인증 자동화**: 인터셉터로 토큰/쿠키 자동 추가 및 401 에러 처리
3. **에러 처리 일관성**: 전역 인터셉터로 통일된 에러 처리
4. **목 데이터 지원**: 환경 변수로 목 데이터/실제 API 전환 가능
5. **개발 편의성**: 개발 모드에서 인증 우회 및 세션 쿠키 수동 설정 가능
6. **타입 안정성**: API 엔드포인트를 상수로 관리하여 오타 방지
7. **유지보수성**: API 로직이 별도 파일로 분리되어 관리 용이

---

## 🔍 변경 전후 비교 요약

| 항목 | 변경 전 | 변경 후 |
|------|---------|---------|
| **API 클라이언트** | 없음 (각각 fetch 사용) | `apiClient.js` (Axios 기반) |
| **인증 방식** | Bearer 토큰 (localStorage) | 세션 쿠키 (JSESSIONID) |
| **API 파일 구조** | 분산되어 있음 | 기능별로 구조화 (`/api/` 폴더) |
| **목 데이터 지원** | 하드코딩 | 환경 변수로 제어 |
| **에러 처리** | 각각 다름 | 전역 인터셉터로 통일 |
| **개발 모드** | 인증 필수 | 인증 우회 가능 |

---

## 📝 참고사항

- 모든 API 함수는 `USE_MOCK_DATA` 환경 변수에 따라 목 데이터 또는 실제 API를 사용
- 세션 기반 인증을 사용하므로 `withCredentials: true` 설정 필수
- 개발 모드에서는 `SKIP_AUTH`로 인증 없이 테스트 가능
- 브라우저 콘솔에서 `setSessionCookie()` 함수로 세션 쿠키 수동 설정 가능


