import { useState, useEffect, useMemo } from 'react';
import { AuthContext } from './AuthContext.js';

/**
 * 사용자 프로필 정보를 가져오는 함수
 */
async function fetchUserProfile() {
  const res = await fetch('/data/user-profile.json', {
    headers: { 'Accept': 'application/json' }
  });

  if (!res.ok) {
    throw new Error(`Failed to load user profile: ${res.status}`);
  }

  return res.json();
}

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
        const userData = await fetchUserProfile();
        if (!cancelled) {
          // 성별이 없으면 기본값 설정 (여성)
          if (!userData.gender) {
            userData.gender = '여성';
          }
          setUser(userData);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
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
   * 로그인 함수 (향후 인증 로직 추가 가능)
   */
  const login = async (userData) => {
    setUser(userData);
    setError(null);
  };

  /**
   * 로그아웃 함수
   */
  const logout = () => {
    setUser(null);
    setError(null);
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

  // Context에 제공할 값
  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      logout,
      updateUser,
    }),
    [user, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

