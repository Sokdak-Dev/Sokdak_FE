/**
 * 세션 쿠키 관련 유틸리티 함수
 * 테스트용 세션 쿠키를 설정할 수 있습니다.
 */

/**
 * JSESSIONID 쿠키를 수동으로 설정
 * 로그인 없이 다른 기능을 테스트할 때 사용
 * 
 * @param {string} sessionId - JSESSIONID 값
 * @param {string} domain - 쿠키 도메인 (기본값: 현재 도메인)
 * @param {string} path - 쿠키 경로 (기본값: '/')
 */
export function setSessionCookie(sessionId, domain = null, path = '/') {
  if (!sessionId) {
    console.warn('세션 ID가 제공되지 않았습니다.');
    return;
  }
  
  const cookieDomain = domain || window.location.hostname;
  // localhost인 경우 도메인 설정 생략 (브라우저 호환성)
  const cookieString = cookieDomain === 'localhost' || cookieDomain === '127.0.0.1'
    ? `JSESSIONID=${sessionId}; path=${path}; SameSite=Lax`
    : `JSESSIONID=${sessionId}; path=${path}; domain=${cookieDomain}; SameSite=Lax`;
  
  document.cookie = cookieString;
  console.log('✅ JSESSIONID 쿠키가 설정되었습니다:', sessionId);
}

/**
 * JSESSIONID 쿠키를 삭제
 */
export function clearSessionCookie() {
  const domain = window.location.hostname;
  document.cookie = `JSESSIONID=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  console.log('JSESSIONID 쿠키가 삭제되었습니다.');
}

/**
 * 현재 JSESSIONID 쿠키 값을 가져옴
 * @returns {string|null} JSESSIONID 값 또는 null
 */
export function getSessionCookie() {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'JSESSIONID') {
      return value;
    }
  }
  return null;
}

/**
 * 환경 변수에서 테스트용 세션 ID를 읽어서 자동으로 설정
 * .env 파일에 VITE_TEST_SESSION_ID=your-session-id 설정 시 자동 적용
 */
function initTestSession() {
  const testSessionId = import.meta.env.VITE_TEST_SESSION_ID;
  
  if (testSessionId) {
    setSessionCookie(testSessionId);
    console.log('📝 환경 변수에서 테스트용 세션 ID를 자동으로 설정했습니다.');
  }
}

// 환경 변수에서 세션 ID가 있으면 자동으로 설정
initTestSession();

/**
 * 브라우저 콘솔에서 사용할 수 있도록 전역 함수로 등록
 * 개발 모드에서만 사용 가능 (보안상 프로덕션에서는 제외)
 */
if (import.meta.env.DEV) {
  window.setSessionCookie = setSessionCookie;
  window.clearSessionCookie = clearSessionCookie;
  window.getSessionCookie = getSessionCookie;
  
  console.log(`
🔧 세션 쿠키 유틸리티가 사용 가능합니다.

📋 사용 방법:
  1. 환경 변수로 설정 (권장):
     .env 파일에 추가: VITE_TEST_SESSION_ID=your-session-id
     앱 시작 시 자동으로 설정됩니다.
  
  2. 브라우저 콘솔에서 수동 설정:
     setSessionCookie('your-session-id') : JSESSIONID 쿠키 설정
     getSessionCookie() : 현재 JSESSIONID 쿠키 값 확인
     clearSessionCookie() : JSESSIONID 쿠키 삭제
  `);
}

