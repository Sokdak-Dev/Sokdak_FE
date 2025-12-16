import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import ClubSelector from "../components/ClubSelector/ClubSelector.jsx";
import { useSelectedClub } from "../features/club/useSelectedClub.js";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 80px; /* BottomNav 높이만큼 여백 */
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  background: #222222;
  
  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const Header = styled.div`
  position: relative;
  padding-top: 61px; /* StatusBar 높이 */
  padding-left: 35px;
  padding-right: 35px;
  padding-bottom: 20px;
`;

// 둥둥 떠다니는 애니메이션
const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-25px);
  }
`;

// 둥둥 떠다니는 애니메이션 (뒤집힌 버전)
const floatFlipped = keyframes`
  0%, 100% {
    transform: translateY(0px) scaleX(-1);
  }
  50% {
    transform: translateY(-25px) scaleX(-1);
  }
`;

const BubbleIconsContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 40%; /* 화면 중앙 위쪽에 배치 */
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 16px;
  z-index: 10;
`;

const BubbleIcon = styled.img`
  width: auto;
  height: ${(props) => props.$height || 60}px;
  object-fit: contain;
  pointer-events: none;
  animation: ${(props) => (props.$flip ? floatFlipped : float)} 3s ease-in-out infinite;
  animation-delay: ${(props) => props.$delay || 0}s;
  animation-fill-mode: both;
  align-self: ${(props) => props.$alignSelf || 'flex-start'};
  margin-top: ${(props) => props.$topOffset || 0}px;
  margin-left: ${(props) => props.$leftOffset || 0}px;
`;

const PraiseButton = styled.button`
  position: fixed;
  left: 50%;
  bottom: 120px; /* BottomNav 위에 배치 */
  transform: translateX(-50%);
  width: 330px;
  height: 50px;
  background: white;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 11px 77px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  
  font-family: "Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-weight: 600; /* SemiBold */
  font-size: 16px;
  line-height: 18px;
  color: #222222;
  text-align: center;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:active {
    opacity: 0.8;
    outline: none;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
  
  &:focus-visible {
    outline: none;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
`;

const JoinClubButton = styled.button`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 333px;
  height: 50px;
  background: #2AB7CA;
  border: none;
  border-radius: 10px;
  padding: 11px 77px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  font-family: "Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 18px;
  color: white;
  text-align: center;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:active {
    opacity: 0.8;
    outline: none;
  }
  
  &:focus {
    outline: none;
  }
  
  &:focus-visible {
    outline: none;
  }
`;

const EmptyStateContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const EmptyStateText = styled.p`
  font-family: "Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  color: #cfcfcf;
  margin: 0;
`;

export default function HomePage() {
  const navigate = useNavigate();
  const { selectedClub, userClubs, loading, changeSelectedClub } = useSelectedClub();

  const handlePraiseClick = () => {
    navigate("/praise");
  };

  const handleClubChange = (clubId) => {
    changeSelectedClub(clubId);
  };

  // 로딩 중이거나 동아리가 없을 때
  if (loading) {
    return (
      <Container>
        <Header>
          <p style={{ color: "#cfcfcf" }}>로딩 중...</p>
        </Header>
      </Container>
    );
  }

  const handleJoinClubClick = () => {
    navigate("/club/search");
  };

  if (!selectedClub || userClubs.length === 0) {
    return (
      <Container>
        <EmptyStateContainer>
          <EmptyStateText>가입한 동아리가 없습니다.</EmptyStateText>
          <JoinClubButton onClick={handleJoinClubClick}>
            동아리 가입하러 가기
          </JoinClubButton>
        </EmptyStateContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <ClubSelector
          // university={selectedClub.university || ""}
          clubName={selectedClub.name}
          clubs={userClubs}
          selectedClubId={selectedClub.id}
          onClubChange={handleClubChange}
        />
      </Header>
      <BubbleIconsContainer>
        <BubbleIcon 
          src="/assets/yellow-bubble.svg" 
          alt="Yellow bubble" 
          $delay={0.9} 
          $height={120}
          $topOffset={50}
        />
        <BubbleIcon 
          src="/assets/orenge-smile.svg" 
          alt="Orange smile" 
          $delay={0.3} 
          $height={100}
          $topOffset={180}
        />
        <BubbleIcon 
          src="/assets/blue-bubble.png" 
          alt="Blue bubble" 
          $delay={0} 
          $flip 
          $height={80}
          $topOffset={70}
          $leftOffset={-30}
        />
      </BubbleIconsContainer>
      <PraiseButton onClick={handlePraiseClick}>
        칭찬하러 가기
      </PraiseButton>
    </Container>
  );
}

