import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ClubSelector from "../components/ClubSelector/ClubSelector.jsx";
import useClub from "../features/club/hooks/useClub.js";
import useClubMembers from "../features/club/hooks/useClubMembers.js";
import { useSelectedClub } from "../features/club/useSelectedClub.js";
import { useAuth } from "../features/auth/useAuth.js";
import ClubInfoCardPage from "../features/club/components/ClubInfoCardPage.jsx";
import RankingSection from "../features/club/components/RankingSection.jsx";

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: ${props => props.$needsScroll ? 'auto' : 'hidden'};
  overflow-x: hidden;
  position: relative;
  background: #222222;
  box-sizing: border-box;
  
  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const Header = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background: #222222;
  padding-top: 61px; /* StatusBar 높이 */
  padding-left: 35px;
  padding-right: 35px;
  padding-bottom: 20px;
`;

const ClubInfoCardWrapper = styled.div`
  margin-top: 20px; /* Header 전체 높이: padding-top(61px) + ClubSelector 높이(약 50px) + padding-bottom(20px) */
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
  z-index: 0;
`;

const SectionTitle = styled.h2`
  font-family: "Inter", "Noto Sans KR", sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 1;
  color: #cfcfcf;
  margin: 0 0 20px 42px;
`;

const ProfileImage = styled.div`
  width: 31px;
  height: 31px;
  border-radius: 50%;
  border: 1px solid #50555C;
  background: none;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  img {
    width: ${props => props.$isPlaceholder ? '70%' : '100%'};
    height: ${props => props.$isPlaceholder ? '70%' : '100%'};
    object-fit: cover;
  }
`;

const MemberName = styled.p`
  font-family: "Inter", "Noto Sans KR", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1;
  color: white;
  margin: 0;
  flex: 1;
`;

const MemberList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 44px 80px 44px; /* BottomNav 높이만큼 하단 여백 */
`;

const MemberItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
  box-sizing: border-box;
`;

export default function ClubPage() {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const { user: profileData, setSelectedClubId } = useAuth();
  const { selectedClub, userClubs, changeSelectedClub } = useSelectedClub();
  const { data: club, loading: clubLoading, error: clubError } = useClub(clubId);
  const { data: membersData, loading: membersLoading, error: membersError } = useClubMembers(clubId);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [needsScroll, setNeedsScroll] = useState(false);

  // URL의 clubId가 변경되면 사용자 정보도 업데이트
  useEffect(() => {
    if (clubId && clubId !== profileData?.selectedClubId) {
      setSelectedClubId(clubId);
    }
  }, [clubId, profileData?.selectedClubId, setSelectedClubId]);

  // 콘텐츠 높이 체크하여 스크롤 필요 여부 결정
  useEffect(() => {
    const checkScroll = () => {
      if (containerRef.current && contentRef.current) {
        const containerHeight = containerRef.current.clientHeight;
        const contentHeight = contentRef.current.scrollHeight;
        setNeedsScroll(contentHeight > containerHeight);
      }
    };

    checkScroll();
    // 리사이즈 이벤트 리스너 추가
    window.addEventListener('resize', checkScroll);
    // 데이터 로딩 후에도 체크
    const timer = setTimeout(checkScroll, 100);

    return () => {
      window.removeEventListener('resize', checkScroll);
      clearTimeout(timer);
    };
  }, [club, membersData, clubLoading, membersLoading]);

  // clubId는 항상 있어야 함 (라우팅에서 보장)
  if (!clubId) {
    return null; // loader에서 리다이렉트되므로 여기 도달하지 않음
  }

  const handleClubChange = (newClubId) => {
    changeSelectedClub(newClubId);
    navigate(`/club/${newClubId}`);
  };

  // 멤버 데이터 추출
  const topMembers = membersData?.rankings || [];
  const members = membersData?.members || [];
  const memberCount = membersData?.memberCount || 0;

  if (clubLoading || membersLoading) {
    return (
      <Container ref={containerRef} $needsScroll={false}>
        <div ref={contentRef}>
          <Header>
            <p style={{ color: "#cfcfcf" }}>로딩 중...</p>
          </Header>
        </div>
      </Container>
    );
  }

  if (clubError || !club) {
    return (
      <Container ref={containerRef} $needsScroll={false}>
        <div ref={contentRef}>
          <Header>
            <p style={{ color: "#cfcfcf" }}>동아리를 찾을 수 없습니다.</p>
          </Header>
        </div>
      </Container>
    );
  }

  if (membersError) {
    return (
      <Container ref={containerRef} $needsScroll={false}>
        <div ref={contentRef}>
          <Header>
            <p style={{ color: "#cfcfcf" }}>멤버 정보를 불러올 수 없습니다.</p>
          </Header>
        </div>
      </Container>
    );
  }

  return (
    <Container ref={containerRef} $needsScroll={needsScroll}>
      <div ref={contentRef}>
        <Header>
          <ClubSelector
            university={selectedClub?.university || club.university || ""}
            clubName={club.name}
            clubs={userClubs}
            selectedClubId={clubId}
            onClubChange={handleClubChange}
          />
        </Header>

        <ClubInfoCardWrapper>
          <ClubInfoCardPage club={club} memberCount={memberCount} />
        </ClubInfoCardWrapper>

        <RankingSection rankings={topMembers} />

        <SectionTitle>우리 동아리 멤버</SectionTitle>
        <MemberList>
          {members.map((member) => (
            <MemberItem key={member.id}>
              <ProfileImage $isPlaceholder={!member.profileImage || member.profileImage.includes('profile.svg')}>
                <img src={member.profileImage || '/assets/profile.svg'} alt={member.name} />
              </ProfileImage>
              <MemberName>{member.name}</MemberName>
            </MemberItem>
          ))}
        </MemberList>
      </div>
    </Container>
  );
}
