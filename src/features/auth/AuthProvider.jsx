import { useState, useEffect, useMemo } from 'react';
import { AuthContext } from './AuthContext.js';
import { getUserProfile } from '../profile/api/userApi.js';
import { login as loginApi, logout as logoutApi } from './api/authApi.js';
import { SKIP_AUTH } from '../../lib/apiClient.js';

/**
 * 인증 상태와 사용자 정보를 제공하는 Provider 컴포넌트
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 사용자 프로필 로드
  useEffect(() => {
    let cancelled = false;

    async function loadUser() {
      setLoading(true);
      setError(null);

      try {
        const userData = await getUserProfile();
        if (!cancelled) {
          // selectedClubId가 없으면 첫 번째 동아리로 설정
          if (!userData.selectedClubId && userData.clubs && userData.clubs.length > 0) {
            userData.selectedClubId = userData.clubs[0].id.toString();
          }
          setUser(userData);
        }
      } catch (err) {
        if (!cancelled) {
          // 인증 우회 모드에서는 사용자 정보 로드 실패해도 앱이 계속 동작하도록 함
          if (SKIP_AUTH) {
            console.warn('사용자 정보를 불러올 수 없습니다. (인증 우회 모드: 계속 진행)');
            setError(null); // 에러를 null로 설정하여 앱이 계속 동작하도록
          } else {
            setError(err);
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadUser();

    return () => {
      cancelled = true;
    };
  }, []);

  /**
   * 로그인 함수
   * @param {object} credentials - 로그인 정보 { username, password } 또는 { email, password }
   * @returns {Promise} 로그인 성공 시 사용자 정보
   */
  const login = async (credentials) => {
    setError(null);
    try {
      // 1. 로그인 API 호출 (서버가 JSESSIONID 쿠키를 설정함)
      await loginApi(credentials);
      
      // 2. 로그인 성공 후 내 정보 조회
      const userData = await getUserProfile();
      
      if (!userData.selectedClubId && userData.clubs && userData.clubs.length > 0) {
        userData.selectedClubId = userData.clubs[0].id.toString();
      }
      
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  /**
   * 로그아웃 함수
   */
  const logout = async () => {
    try {
      // 서버에 로그아웃 요청 (세션 무효화)
      await logoutApi();
    } catch (err) {
      // 로그아웃 API 호출 실패해도 클라이언트 상태는 초기화
      console.error('Logout API error:', err);
    } finally {
      // 클라이언트 상태 초기화
      setUser(null);
      setError(null);
    }
  };

  /**
   * 사용자 정보 업데이트 함수
   */
  const updateUser = (updatedUserData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedUserData,
    }));
  };

  /**
   * 선택된 동아리 변경 함수
   */
  const setSelectedClubId = (clubId) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser;
      return {
        ...prevUser,
        selectedClubId: clubId.toString(),
      };
    });
  };

  // Context에 제공할 값
  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      logout,
      updateUser,
      setSelectedClubId,
    }),
    [user, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

