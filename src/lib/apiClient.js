import axios from 'axios';

// 목 데이터 사용 여부 (환경 변수로 제어)
export const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

// 인증 우회 설정 (로그인 없이 테스트 가능)
// .env 파일에 VITE_SKIP_AUTH=true 설정 시 401 에러 시 리다이렉트하지 않음
export const SKIP_AUTH = import.meta.env.VITE_SKIP_AUTH === 'true';

// 개발 환경에서는 로컬 API 서버, 프로덕션에서는 실제 API 서버
// 목 데이터 모드일 때는 baseURL을 빈 문자열로 설정 (상대 경로 사용)
const API_BASE_URL = USE_MOCK_DATA 
  ? '' 
  : (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080');

/**
 * Axios 인스턴스 생성
 * 전역 설정 및 인터셉터를 추가할 수 있습니다.
 * 세션 기반 인증을 위해 withCredentials를 true로 설정하여 쿠키를 자동으로 전송합니다.
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true, // 쿠키(JSESSIONID) 자동 전송
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 쿠키 전송 확인
apiClient.interceptors.request.use(
  (config) => {
    // 크로스 오리진 요청에서 쿠키 전송 확인
    if (config.withCredentials) {
      const cookies = document.cookie;
      const hasSessionCookie = cookies.includes('JSESSIONID');
      
      if (!hasSessionCookie) {
        console.warn('[Cookie Warning] JSESSIONID 쿠키가 브라우저에 없습니다.');
      } else {
        // 쿠키는 있지만 Request Headers에 포함되지 않을 수 있음 (SameSite 정책 때문)
        console.log('[Cookie Check] JSESSIONID 쿠키가 브라우저에 있습니다.');
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 401 에러 시 자동 로그아웃 처리
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const currentPath = window.location.pathname;
    const publicPaths = ['/onboarding', '/login'];
    const isPublicPath = publicPaths.some(path => currentPath === path || currentPath.startsWith(path));
    
    if (status === 401) {
      // 디버깅: 어떤 API에서 401이 발생했는지 로그 출력
      const requestUrl = error.config?.url || error.config?.baseURL + error.config?.url || 'unknown';
      const requestMethod = error.config?.method?.toUpperCase() || 'UNKNOWN';
      console.error(`[401 Unauthorized] ${requestMethod} ${requestUrl}`);
      console.error('Error details:', {
        url: requestUrl,
        method: requestMethod,
        path: currentPath,
        response: error.response?.data,
      });
      
      // 쿠키 전송 문제 진단
      const cookies = document.cookie;
      const hasSessionCookie = cookies.includes('JSESSIONID');
      const requestOrigin = window.location.origin;
      const apiOrigin = error.config?.baseURL || new URL(requestUrl).origin;
      const isCrossOrigin = requestOrigin !== apiOrigin;
      
      console.error('[401 진단 정보]', {
        '브라우저 쿠키 존재': hasSessionCookie ? '있음' : '없음',
        '쿠키 내용': cookies || '(없음)',
        '요청 Origin': requestOrigin,
        'API Origin': apiOrigin,
        '크로스 오리진 요청': isCrossOrigin ? '예' : '아니오',
        'withCredentials': error.config?.withCredentials,
        '문제 원인': !hasSessionCookie 
          ? 'JSESSIONID 쿠키가 브라우저에 없습니다. 로그인을 다시 시도하세요.'
          : isCrossOrigin 
            ? '크로스 오리진 요청에서 쿠키가 전송되지 않습니다. 백엔드에서 Set-Cookie에 SameSite=None; Secure를 추가해야 합니다.'
            : '알 수 없는 원인'
      });
      
      // SKIP_AUTH가 true이면 리다이렉트하지 않음 (다른 기능 테스트 가능)
      if (!SKIP_AUTH) {
        // 인증이 필요 없는 페이지에서는 리다이렉트하지 않음
        if (!isPublicPath) {
          // AuthProvider가 처리하는 API들은 인터셉터에서 리다이렉트하지 않음
          // 이렇게 하면 각 컴포넌트/훅에서 에러를 처리할 수 있음
          const isAuthProviderManaged = 
            requestUrl.includes('/api/members/me') ||
            requestUrl.includes('/api/compliments/receive') ||
            requestUrl.includes('/api/compliments/send');
          
          if (!isAuthProviderManaged) {
            // 세션 만료 또는 인증 실패 시 처리
            // 로그인 페이지로 리다이렉트
            console.warn('리다이렉트: 로그인 페이지로 이동합니다.');
            window.location.href = '/login';
          } else {
            console.warn('401 에러는 컴포넌트에서 처리됩니다. 리다이렉트하지 않습니다.');
          }
        }
      } else {
        // 인증 우회 모드에서는 콘솔에만 경고 출력
        console.warn('401 Unauthorized - 인증이 필요합니다. (인증 우회 모드: 리다이렉트 비활성화)');
      }
    } else if (status === 404) {
      // 404 에러 진단
      const requestUrl = error.config?.url || error.config?.baseURL + error.config?.url || 'unknown';
      const requestMethod = error.config?.method?.toUpperCase() || 'UNKNOWN';
      console.error(`[404 Not Found] ${requestMethod} ${requestUrl}`);
      console.error('404 진단 정보:', {
        url: requestUrl,
        method: requestMethod,
        '가능한 원인': [
          '엔드포인트 경로가 잘못되었습니다.',
          '백엔드에 해당 엔드포인트가 구현되지 않았습니다.',
          'API 버전이 변경되었을 수 있습니다.'
        ]
      });
    } else if (status >= 500) {
      // 500 에러 진단
      const requestUrl = error.config?.url || error.config?.baseURL + error.config?.url || 'unknown';
      const requestMethod = error.config?.method?.toUpperCase() || 'UNKNOWN';
      console.error(`[${status} Server Error] ${requestMethod} ${requestUrl}`);
      console.error('서버 에러 정보:', {
        url: requestUrl,
        method: requestMethod,
        status: status,
        response: error.response?.data,
        '가능한 원인': [
          '백엔드 서버 내부 오류',
          '데이터베이스 연결 문제',
          '서버 로직 오류',
          '의존성 서비스 오류'
        ],
        '해결 방법': '백엔드 로그를 확인하여 정확한 원인을 파악하세요.'
      });
      
      if (isPublicPath) {
        // 회원가입/로그인 페이지에서 서버 에러는 조용히 처리 (콘솔에 출력하지 않음)
        // 에러는 reject하되, 콘솔에는 표시되지 않도록 함
      }
    }
    
    return Promise.reject(error);
  }
);

/**
 * API 엔드포인트 상수 정의
 * 이미지에 명시된 API 명세를 기반으로 작성
 */
export const API_ENDPOINTS = {
  // 회원 관련
  MEMBERS: {
    REGISTER: '/api/members/register',
    LOGIN: '/api/members/login',
    LOGOUT: '/api/members/logout',
    ME: '/api/members/me',
    INFO: '/api/members',
    UPDATE: '/api/members',
    DELETE: '/api/members',
    CATEGORY_OPTIONS: (category) => `/api/members/categories/options?category=${category}`,
  },

  // 동아리 관련
  CLUBS: {
    CREATE: '/api/clubs',
    DELETE: (clubId) => `/api/clubs/${clubId}`,
    GET: (clubId) => `/api/clubs/${clubId}`,
    SEARCH: (query) => `/api/clubs/search?q=${encodeURIComponent(query)}`,
    JOIN: (clubId) => `/api/clubs/${clubId}/join`,
    MEMBERS: (clubId, active = null) => {
      const base = `/api/clubs/${clubId}/members`;
      return active !== null ? `${base}?active=${active}` : base;
    },
    APPROVE_MEMBER: (clubId, userId) => `/api/clubs/${clubId}/members/${userId}/approve`,
    REJECT_MEMBER: (clubId, userId) => `/api/clubs/${clubId}/members/${userId}/reject`,
  },

  // 칭찬 관련
  COMPLIMENTS: {
    GIVE: (clubId, userId) => `/api/compliments/clubs/${clubId}/users/${userId}`,
    SELECT: '/api/compliments/select',
    EMBEDDING: '/api/compliments/embedding',
    RECEIVE: '/api/compliments/received',
    SEND: '/api/compliments/send',
  },

  // 랭킹 관련
  RANKING: {
    GET: '/api/ranking',
  },
};

/**
 * API URL 생성 헬퍼
 * @param {string} endpoint - API 엔드포인트 경로
 * @returns {string} 완전한 API URL
 */
export function getApiUrl(endpoint) {
  // endpoint가 이미 전체 URL인 경우
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
    return endpoint;
  }
  
  // 상대 경로인 경우
  if (endpoint.startsWith('/')) {
    return API_BASE_URL ? `${API_BASE_URL}${endpoint}` : endpoint;
  }
  
  return `${API_BASE_URL}/${endpoint}`;
}

export default API_BASE_URL;

