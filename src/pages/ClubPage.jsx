import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 80px; /* BottomNav 높이만큼 여백 */
  overflow-y: auto;
`;

export default function ClubPage() {
  return (
    <Container>
      <h1>동아리 페이지</h1>
    </Container>
  );
}

