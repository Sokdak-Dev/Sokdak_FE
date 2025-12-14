import { useState } from 'react';
import { createClub } from '../api/clubApi.js';

/**
 * 동아리 생성을 위한 커스텀 훅
 * @returns {object} { create: function, loading, error }
 */
export default function useCreateClub() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (clubData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await createClub(clubData);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
}

