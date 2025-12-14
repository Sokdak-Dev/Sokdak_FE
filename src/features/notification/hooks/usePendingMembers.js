import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/useAuth.js';
import { getPendingMembers } from '../../club/api/clubApi.js';

/**
 * 모든 클럽의 승인 대기 중인 멤버를 조회하는 훅
 * @returns {object} { notifications, loading, error, refetch }
 */
export default function usePendingMembers() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPendingMembers = async () => {
    if (!user?.clubs || user.clubs.length === 0) {
      setNotifications([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 모든 클럽에 대해 승인 대기 멤버 조회
      const promises = user.clubs.map(async (club) => {
        try {
          const response = await getPendingMembers(club.id);
          // 각 멤버를 알림 형식으로 변환
          if (response.members && response.members.length > 0) {
            return response.members.map((member) => ({
              id: `${club.id}-${member.id}`, // 고유 ID 생성
              clubId: club.id,
              clubName: club.name,
              userId: member.id,
              userName: member.name,
              member: member,
              // API 응답에 timestamp가 없으면 현재 시간 사용
              timestamp: member.createdAt || new Date().toISOString(),
            }));
          }
          return [];
        } catch (err) {
          console.error(`Failed to fetch pending members for club ${club.id}:`, err);
          return [];
        }
      });

      const results = await Promise.all(promises);
      // 모든 알림을 하나의 배열로 합치기
      const allNotifications = results.flat();
      
      // timestamp 기준으로 정렬 (최신순)
      allNotifications.sort((a, b) => {
        const timeA = new Date(a.timestamp).getTime();
        const timeB = new Date(b.timestamp).getTime();
        return timeB - timeA;
      });

      setNotifications(allNotifications);
    } catch (err) {
      console.error('Failed to fetch pending members:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingMembers();
  }, [user?.clubs]);

  return {
    notifications,
    loading,
    error,
    refetch: fetchPendingMembers,
  };
}

