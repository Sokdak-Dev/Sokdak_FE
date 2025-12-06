import styled from "styled-components";

const Card = styled.div`
  background: #353535;
  border-radius: 10px;
  width: 100%;
  max-width: 322px;
  min-height: 121px;
  margin: 0 auto;
  position: relative;
  padding: 16px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0;
  
  @media (max-width: 480px) {
    max-width: calc(100% - 84px);
    padding: 12px 16px;
  }
  
  @media (min-width: 481px) and (max-width: 768px) {
    max-width: 90%;
  }
`;

const CardTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  flex-shrink: 0;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 0;
  position: relative;
  min-height: 32px;
`;

const ClubName = styled.p`
  font-family: "Inter", "Noto Sans KR", sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 1;
  color: white;
  margin: 0;
  text-align: left;
  flex: 1;
`;

const MemberCountContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  flex-shrink: 0;
  margin-right: 10px;
`;

const MemberCountNumber = styled.p`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 1;
  color: white;
  margin: 0;
  text-align: center;
`;

const MemberCountLabel = styled.p`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 8px;
  line-height: 1;
  color: white;
  margin: 0;
  text-align: center;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #585858;
  margin: 12px 0;
  flex-shrink: 0;
`;

const CardBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 0 1 auto;
  min-height: 0;
`;

const Description = styled.p`
  font-family: "Inter", "Noto Sans KR", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.4;
  color: white;
  margin: 0;
  width: 100%;
`;

/**
 * ClubPage에서 사용하는 동아리 정보 카드 컴포넌트
 * @param {object} club - 동아리 정보 { name, description, ... }
 * @param {number} memberCount - 멤버 수
 */
export default function ClubInfoCardPage({ club, memberCount = 0 }) {
  if (!club) return null;

  return (
    <Card>
      <CardTop>
        <CardHeader>
          <ClubName>{club.name}</ClubName>
          <MemberCountContainer>
            <MemberCountNumber>{memberCount}</MemberCountNumber>
            <MemberCountLabel>members</MemberCountLabel>
          </MemberCountContainer>
        </CardHeader>
        <Divider />
      </CardTop>
      <CardBottom>
        <Description>{club.description || "동아리 설명이 없습니다."}</Description>
      </CardBottom>
    </Card>
  );
}

