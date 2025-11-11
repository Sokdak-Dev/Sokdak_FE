// 마이페이지 목 데이터

// 프로필 정보
export const mockUserProfile = {
  id: 1,
  name: "이정안",
  university: "숭실대학교",
  profileImage: "/assets/profile-mock.jpg",
  clubs: [
    {
      id: 1,
      name: "멋쟁이사자처럼",
    },
    {
      id: 2,
      name: "산들바람",
    },
  ],
};

// 받은 메시지 목 데이터
export const mockReceivedMessages = [
  {
    id: 1,
    senderName: "익명",
    senderId: null,
    content: "예쁘고 사랑스럽고 일도 잘하고 성격도 좋고 배고파요 집에 가고싶어요",
    gender: "male", // 남자
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5분 전
    isAnonymous: true,
  },
  {
    id: 2,
    senderName: "익명",
    senderId: null,
    content: "저는 이정안 학우의 다정함을 칭찬할까요 말까요",
    gender: "female", // 여자
    timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(), // 12분 전
    isAnonymous: true,
  },
  {
    id: 3,
    senderName: "익명",
    senderId: null,
    content: "저는 이정안 학우의 다정함을 칭찬할까요 말까요",
    gender: "female", // 여자
    timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(), // 12분 전
    isAnonymous: true,
  },
  {
    id: 4,
    senderName: "익명",
    senderId: null,
    content: "항상 밝은 에너지로 주변을 환하게 만들어주시는 모습이 정말 멋져요!",
    gender: "male", // 남자
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30분 전
    isAnonymous: true,
  },
  {
    id: 5,
    senderName: "익명",
    senderId: null,
    content: "팀 프로젝트에서 리더십이 정말 뛰어나셨어요",
    gender: "male", // 남자
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1시간 전
    isAnonymous: true,
  },
  {
    id: 6,
    senderName: "익명",
    senderId: null,
    content: "항상 긍정적인 마인드가 인상깊어요",
    gender: "female", // 여자
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2시간 전
    isAnonymous: true,
  },
];

// 보낸 메시지 목 데이터
export const mockSentMessages = [
  {
    id: 1,
    receiverName: "이정안",
    receiverId: 2,
    content: "저는 이정안 학우의 다정함을 칭찬합니다 (이런 느낌 맞나요)",
    gender: "female", // 여자
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5분 전
    isAnonymous: false,
  },
  {
    id: 2,
    receiverName: "조수한",
    receiverId: 3,
    content: "저는 이정안 학우의 다정함을 칭찬할까요 말까요",
    gender: "male", // 남자
    timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(), // 12분 전
    isAnonymous: false,
  },
  {
    id: 3,
    receiverName: "김민수",
    receiverId: 4,
    content: "항상 열심히 노력하는 모습이 정말 멋져요!",
    gender: "male", // 남자
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1시간 전
    isAnonymous: false,
  },
  {
    id: 4,
    receiverName: "박지영",
    receiverId: 5,
    content: "프로젝트 발표 준비하시느라 고생 많으셨어요",
    gender: "female", // 여자
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3시간 전
    isAnonymous: false,
  },
  {
    id: 5,
    receiverName: "최동현",
    receiverId: 6,
    content: "팀워크가 좋아서 정말 즐겁게 협업했어요",
    gender: "male", // 남자
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5시간 전
    isAnonymous: false,
  },
  {
    id: 6,
    receiverName: "이서연",
    receiverId: 7,
    content: "항상 밝은 미소로 분위기를 좋게 만들어주셔서 감사해요",
    gender: "female", // 여자
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1일 전
    isAnonymous: false,
  },
];

// 뱃지 목 데이터
export const mockBadges = [
  {
    id: 1,
    name: "첫 칭찬",
    imageUrl: "http://localhost:3845/assets/b78e29d981f00ab476b3b3a00ead5e3f9018c3b4.svg",
    isEarned: true,
  },
  {
    id: 2,
    name: "칭찬 마스터",
    imageUrl: "http://localhost:3845/assets/510210ad5d72382ec47a392bbbf9e2e73364b79a.svg",
    isEarned: false,
  },
  {
    id: 3,
    name: "인기인",
    imageUrl: "http://localhost:3845/assets/59322eeb227f36ef30f3a37921930bc8bd0eacfc.svg",
    isEarned: false,
  },
  {
    id: 4,
    name: "칭찬 전도사",
    imageUrl: "http://localhost:3845/assets/992a63a468f4224c1c0285ed1b2e680c7f34dc1c.svg",
    isEarned: false,
  },
  {
    id: 5,
    name: "배려왕",
    imageUrl: "http://localhost:3845/assets/718c8d4c41c8a31df16af6c6529354083d7e54be.svg",
    isEarned: false,
  },
  {
    id: 6,
    name: "협력자",
    imageUrl: "http://localhost:3845/assets/d422a2e52e3b69f3e9005c3b9856633f96481854.svg",
    isEarned: false,
  },
  {
    id: 7,
    name: "리더십",
    imageUrl: "http://localhost:3845/assets/f69f5e132db4218bb9bb50d83b50459629dc5ebb.svg",
    isEarned: false,
  },
  {
    id: 8,
    name: "창의력",
    imageUrl: "http://localhost:3845/assets/a801a5bfe3adc2fdd73bb6b6667780e46e3086a1.svg",
    isEarned: false,
  },
  {
    id: 9,
    name: "열정",
    imageUrl: "http://localhost:3845/assets/0958ae92b7baa919336b2c71fa3a2fac72200e57.svg",
    isEarned: false,
  },
  {
    id: 10,
    name: "친절함",
    imageUrl: "http://localhost:3845/assets/460fd15a16bcb64ff8d9f7101148efb7e6360e97.svg",
    isEarned: false,
  },
  {
    id: 11,
    name: "전문가",
    imageUrl: "http://localhost:3845/assets/12ee5e1bc067afed7184af3e93293fe4891b4ff7.svg",
    isEarned: false,
  },
  {
    id: 12,
    name: "영향력",
    imageUrl: "http://localhost:3845/assets/6c57efb00efeae1780918f71a3507cee2df0b3f8.svg",
    isEarned: false,
  },
];

// 통합 마이페이지 데이터
export const mockMyPageData = {
  profile: mockUserProfile,
  receivedMessages: mockReceivedMessages,
  sentMessages: mockSentMessages,
  badges: mockBadges,
  stats: {
    receivedCount: mockReceivedMessages.length,
    sentCount: mockSentMessages.length,
    badgeCount: mockBadges.filter((badge) => badge.isEarned).length,
    totalBadgeCount: mockBadges.length,
  },
};

// 시간 포맷 헬퍼 함수
export const formatTimeAgo = (timestamp) => {
  if (!timestamp) return "";
  
  const now = new Date();
  const time = new Date(timestamp);
  const diffInSeconds = Math.floor((now - time) / 1000);

  if (diffInSeconds < 60) {
    return "방금 전";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}분 전`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}시간 전`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}일 전`;
  }
};

