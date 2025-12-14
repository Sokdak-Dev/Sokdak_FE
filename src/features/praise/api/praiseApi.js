import { apiClient, API_ENDPOINTS, getApiUrl, USE_MOCK_DATA } from '../../../lib/apiClient.js';

/**
 * 백엔드 멤버 데이터를 프론트엔드 형식으로 변환하는 헬퍼 함수
 * avatarUrl → profileImage, userId → id
 * @param {object|Array} memberOrMembers - 멤버 객체 또는 멤버 배열
 * @returns {object|Array} 변환된 멤버 객체 또는 멤버 배열
 */
const transformMemberData = (memberOrMembers) => {
  if (Array.isArray(memberOrMembers)) {
    return memberOrMembers.map(member => {
      const { userId, avatarUrl, ...rest } = member;
      return {
        ...rest,
        id: userId !== undefined ? userId : member.id,
        profileImage: avatarUrl !== undefined ? avatarUrl : member.profileImage,
      };
    });
  } else if (memberOrMembers && typeof memberOrMembers === 'object') {
    const { userId, avatarUrl, ...rest } = memberOrMembers;
    return {
      ...rest,
      id: userId !== undefined ? userId : memberOrMembers.id,
      profileImage: avatarUrl !== undefined ? avatarUrl : memberOrMembers.profileImage,
    };
  }
  return memberOrMembers;
};

/**
 * 칭찬 목록을 가져오는 API 함수
 * @param {string|number} clubId - 동아리 ID
 * @param {string|number} userId - 사용자 ID (보낸 사람 ID)
 * @returns {Promise} 칭찬 목록 데이터
 */
export const getPraiseCategories = async (clubId, userId) => {
  if (USE_MOCK_DATA) {
    // 목 데이터 경로: /data/praise-categories.json
    const endpoint = getApiUrl('/data/praise-categories.json');
    const response = await apiClient.get(endpoint);
    return response.data;
  } else {
    // POST /api/compliments/clubs/{club_id}/users/{user_id}를 사용하여 칭찬 목록 조회
    const endpoint = API_ENDPOINTS.COMPLIMENTS.GIVE(clubId, userId);
    const response = await apiClient.post(endpoint, {});
    const data = response.data;
    
    // 백엔드 응답을 프론트엔드 형식으로 변환
    // 각 카테고리의 candidates 또는 users 배열 변환
    if (Array.isArray(data)) {
      return data.map(category => ({
        ...category,
        candidates: category.candidates ? transformMemberData(category.candidates) : [],
        users: category.users ? transformMemberData(category.users) : [],
      }));
    } else if (data && typeof data === 'object') {
      return {
        ...data,
        candidates: data.candidates ? transformMemberData(data.candidates) : [],
        users: data.users ? transformMemberData(data.users) : [],
      };
    }
    return data;
  }
};

/**
 * 칭찬하기
 * @param {string|number} complimentId - 칭찬 ID
 * @param {string|number} userId - 칭찬받을 사용자 ID
 * @param {boolean} isAnonymous - 익명 여부 (기본값: true)
 * @returns {Promise}
 */
export const giveCompliment = async (complimentId, userId, isAnonymous = true) => {
  if (USE_MOCK_DATA) {
    throw new Error('Give compliment is not supported in mock data mode');
  }
  const response = await apiClient.post(API_ENDPOINTS.COMPLIMENTS.SELECT, {
    complimentId,
    userId,
    isAnonymous,
  });
  return response.data;
};

