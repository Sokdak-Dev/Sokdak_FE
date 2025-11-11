import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 80px; /* BottomNav 높이만큼 여백 */
  overflow-y: auto;
  position: relative;
  background: #222222;
`;

const PraiseButton = styled.button`
  position: absolute;
  left: 50%;
  top: 583px;
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
  
  font-family: "Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-weight: 600; /* SemiBold */
  font-size: 16px;
  line-height: 18px;
  color: #222222;
  text-align: center;
  white-space: nowrap;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:active {
    opacity: 0.8;
  }
`;

export default function HomePage() {
  const navigate = useNavigate();

  const handlePraiseClick = () => {
    navigate("/praise");
  };

  return (
    <Container>
      <h1>홈 페이지</h1>
      <PraiseButton onClick={handlePraiseClick}>
        칭찬하러 가기
      </PraiseButton>
    </Container>
  );
}

