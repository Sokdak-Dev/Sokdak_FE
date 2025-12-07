import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 0 42px 40px 42px;
`;

const Title = styled.h2`
  font-family: "Inter", "Noto Sans KR", sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 1;
  color: #cfcfcf;
  margin: 0 0 20px 0;
`;

const RankingList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const RankingItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  position: relative;
  margin-right: 0;
  
  &:last-child {
    margin-right: 0;
  }
`;

const RankNumber = styled.p`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  margin: 0;
  position: absolute;
  top: 0;
  left: 2px;
  z-index: 1;
`;

const RankNumber1 = styled(RankNumber)`
  color: #fe4b4a;
`;

const RankNumber2 = styled(RankNumber)`
  color: #2ab7ca;
`;

const RankNumber3 = styled(RankNumber)`
  color: #fed766;
`;

const ProfileImage = styled.div`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  border: 1px solid #50555C;
  background: none;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-top: 4px;
  
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
  margin-top: 10px;
  text-align: center;
  white-space: nowrap;
`;

/**
 * 칭찬왕 랭킹 섹션 컴포넌트 (가로 배치)
 * @param {Array} rankings - 랭킹 데이터 [{ id, name, rank, profileImage }, ...]
 */
export default function RankingSection({ rankings = [] }) {
  // 최대 3개만 표시
  const topThree = rankings.slice(0, 3);

  return (
    <Container>
      <Title>우리 동아리 칭찬왕</Title>
      <RankingList>
        {topThree.map((member) => {
          const RankComponent = member.rank === 1 ? RankNumber1 : 
                                member.rank === 2 ? RankNumber2 : 
                                RankNumber3;
          return (
            <RankingItem key={member.id}>
              <RankComponent>{member.rank}</RankComponent>
              <ProfileImage $isPlaceholder={!member.profileImage || member.profileImage.includes('profile.svg')}>
                <img src={member.profileImage || '/assets/profile.svg'} alt={member.name} />
              </ProfileImage>
              <MemberName>{member.name}</MemberName>
            </RankingItem>
          );
        })}
      </RankingList>
    </Container>
  );
}

