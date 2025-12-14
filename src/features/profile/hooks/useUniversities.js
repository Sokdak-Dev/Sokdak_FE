/**
 * @deprecated University 관련 기능은 현재 사용하지 않습니다.
 * 백엔드 API에서 university 정보를 제공하지 않아 주석처리되었습니다.
 * 나중에 필요할 경우 이 파일을 다시 활성화할 수 있습니다.
 * 
 * 마지막 사용: 2024년 (UniversityStep, UniversityFieldEditor에서 사용)
 */
import { useEffect, useState } from 'react';
import { getUniversities } from '../api/universityApi.js';

/**
 * 대학교 목록을 가져오는 커스텀 훅
 * @returns {object} { data, loading, error }
 */
export default function useUniversities() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const result = await getUniversities();
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) {
          setError(err);
          setData([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}

