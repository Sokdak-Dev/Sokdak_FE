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
 * 랭킹 데이터를 가져오는 API 함수
 * @returns {Promise} 랭킹 데이터 (complimentKings, clubRankings 포함)
 */
export const getRankings = async () => {
  let endpoint;
  if (USE_MOCK_DATA) {
    // 목 데이터 경로: /data/rankings.json
    endpoint = getApiUrl('/data/rankings.json');
  } else {
    // 실제 API 경로: /api/ranking
    endpoint = API_ENDPOINTS.RANKING.GET;
  }
  const response = await apiClient.get(endpoint);
  const data = response.data;
  
  // 백엔드 응답을 프론트엔드 형식으로 변환
  return {
    ...data,
    complimentKings: data.complimentKings ? transformMemberData(data.complimentKings) : [],
    clubRankings: data.clubRankings || [],
  };
};

