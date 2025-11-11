import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 80px; /* BottomNav 높이만큼 여백 */
  overflow-y: auto;
`;

export default function RankingPage() {
  return (
    <Container>
      <h1>랭킹 페이지</h1>
    </Container>
  );
}

