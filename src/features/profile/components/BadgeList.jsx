import styled from "styled-components";
import { mockBadges } from "../mockData.js";

const BadgeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 48px;
  column-gap: 10px;
  padding: 46px 20px 16px 20px;
  justify-items: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

const BadgeItem = styled.div`
  position: relative;
  width: 75px;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BadgeImage = styled.img`
  width: 75px;
  height: 75px;
  object-fit: contain;
`;

const LockOverlay = styled.img`
  position: absolute;
  width: 60px;
  height: 60px;
  object-fit: contain;
  z-index: 1;
`;

export default function BadgeList({ badges = mockBadges }) {
  return (
    <BadgeGrid>
      {badges.map((badge) => (
        <BadgeItem key={badge.id}>
          {/* 뱃지 기본 이미지 */}
          <BadgeImage 
            src={badge.imageUrl} 
            alt={badge.name}
            style={{
              opacity: badge.isEarned ? 1 : 0.5,
            }}
          />
          {/* isEarned에 따라 오버레이 표시 */}
          {badge.isEarned ? (
            <LockOverlay src="/assets/badge.png" alt="획득" />
          ) : (
            null
          )}
        </BadgeItem>
      ))}
    </BadgeGrid>
  );
}

