import { useState } from "react";
import styled from "styled-components";
import ClubAddModal from "./ClubAddModal.jsx";

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  gap: 16px;
  cursor: pointer;
  user-select: none;
`;

const ClubInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

// const UniversityName = styled.p`
//   font-family: "Inter", "Noto Sans KR", sans-serif;
//   font-weight: 400;
//   font-size: 18px;
//   line-height: 1.2;
//   color: #9f9f9f;
//   margin: 0;
// `;

const ClubName = styled.p`
  font-family: "Inter", "Noto Sans KR", sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 1.2;
  color: #9f9f9f;
  margin: 0;
`;

const DropdownIcon = styled.div`
  width: 10px;
  height: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transform: rotate(90deg);
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

// Dropdown arrow SVG (rotated chevron)
const DropdownArrow = () => (
  <svg width="10" height="21" viewBox="0 0 10 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1 1L9 10.5L1 20"
      stroke="#9f9f9f"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * ClubSelector 컴포넌트
 * 동아리 선택 및 변경을 위한 드롭다운 컴포넌트
 * @param {string} university - 대학교 이름 (예: "숭실대학교") - 주석처리됨
 * @param {string} clubName - 동아리 이름 (예: "멋쟁이사자처럼")
 * @param {Array} clubs - 동아리 목록 [{ id, name, university }, ...]
 * @param {string|null} selectedClubId - 현재 선택된 동아리 ID
 * @param {Function} onClubChange - 동아리 변경 시 호출되는 콜백 함수 (clubId) => void
 */
export default function ClubSelector({
  // university = "숭실대학교",
  clubName = "멋쟁이사자처럼",
  clubs = [],
  selectedClubId = null,
  onClubChange,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectClub = (clubId) => {
    onClubChange?.(clubId);
    setIsModalOpen(false);
  };

  return (
    <>
      <Container onClick={handleClick}>
        <ClubInfo>
          {/* {university && <UniversityName>{university}</UniversityName>} */}
          <ClubName>{clubName}</ClubName>
        </ClubInfo>
        <DropdownIcon>
          <DropdownArrow />
        </DropdownIcon>
      </Container>
      
      {isModalOpen && (
        <ClubAddModal
          clubs={clubs}
          selectedClubId={selectedClubId}
          onSelectClub={handleSelectClub}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

