import { useEffect, useState } from 'react';
import { getReceivedMessages, getSentMessages } from '../api/messageApi.js';

/**
 * 프로필 메시지(받은/보낸)를 가져오는 커스텀 훅
 * @param {string} type - 'received' 또는 'sent'
 * @returns {object} { data, loading, error }
 */
export default function useProfileMessages(type = 'received') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const result = type === 'sent' 
          ? await getSentMessages() 
          : await getReceivedMessages();
        
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) {
          const status = err.response?.status;
          // 401 에러는 인증 문제이므로 빈 배열로 처리 (에러 표시하지 않음)
          // 다른 에러만 표시
          if (status === 401) {
            console.warn(`[${type === 'sent' ? '보낸' : '받은'} 메시지] 인증이 필요합니다. 빈 목록을 표시합니다.`);
            setData([]); // 빈 배열로 설정하여 에러 대신 빈 목록 표시
            setError(null);
          } else {
            setError(err);
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [type]);

  return { data, loading, error };
}

