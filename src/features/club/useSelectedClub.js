import { useMemo } from 'react';
import { useAuth } from '../auth/useAuth.js';

/**
 * 선택된 동아리 정보를 사용하는 커스텀 훅
 * @returns {object} { selectedClub, userClubs, loading, changeSelectedClub }
 */
export function useSelectedClub() {
  const { user: profileData, setSelectedClubId, loading: authLoading } = useAuth();

  // 사용자가 가입한 동아리 목록 (user-profile.json의 clubs 기반)
  const userClubs = useMemo(() => {
    if (!profileData?.clubs) return [];
    
    return profileData.clubs.map((userClub) => ({
      id: userClub.id.toString(),
      name: userClub.name,
      university: profileData.university || '',
    }));
  }, [profileData]);

  // 선택된 동아리 정보
  const selectedClub = useMemo(() => {
    if (!profileData?.selectedClubId || !userClubs.length) {
      return userClubs[0] || null;
    }
    return userClubs.find((club) => club.id === profileData.selectedClubId) || userClubs[0] || null;
  }, [profileData?.selectedClubId, userClubs]);

  // 선택된 동아리 변경 함수
  const changeSelectedClub = (clubId) => {
    setSelectedClubId(clubId);
  };

  return {
    selectedClub,
    userClubs,
    loading: authLoading,
    changeSelectedClub,
  };
}
