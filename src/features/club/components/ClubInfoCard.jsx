import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
`;

const ClubIcon = styled.div`
  width: 132px;
  height: 132px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 27px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ClubName = styled.h1`
  font-family: "Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-weight: 600;
  font-size: 24px;
  line-height: 26px;
  color: #cfcfcf;
  margin: 0 0 2px 0;
  text-align: center;
`;

const Subtitle = styled.p`
  font-family: "Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-weight: 600;
  font-size: 24px;
  line-height: 26px;
  color: #cfcfcf;
  margin: 0;
  text-align: center;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 27px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const IconWrapper = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const InfoText = styled.p`
  font-family: "Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  color: #8C8C8C;
  margin: 0;
`;

/**
 * 동아리 정보 카드 컴포넌트
 * @param {object} club - 동아리 정보 { id, name, university, ... }
 */
export default function ClubInfoCard({ club }) {
  if (!club) return null;

  return (
    <Container>
      <ClubIcon>
        <img src="/assets/club-join-img.svg" alt={club.name} />
      </ClubIcon>
      
      <ClubName>{club.name}</ClubName>
      <Subtitle>동아리원을 칭찬해주세요</Subtitle>
      
      <InfoContainer>
        {/* <InfoRow>
          <IconWrapper>
            <img src="/assets/club-join-uni.svg" alt="학교" />
          </IconWrapper>
          <InfoText>{club.university || '학교 정보 없음'}</InfoText>
        </InfoRow> */}
        
        <InfoRow>
          <IconWrapper>
            <img src="/assets/club-join-group.svg" alt="멤버" />
          </IconWrapper>
          <InfoText>{club.name}</InfoText>
        </InfoRow>
      </InfoContainer>
    </Container>
  );
}

