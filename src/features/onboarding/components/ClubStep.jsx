import { useState } from 'react';
import styled from 'styled-components';
import useSearchClubs from '../../club/hooks/useSearchClubs.js';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #222222;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

// 진행 바
const ProgressBar = styled.div`
  display: flex;
  gap: 6px;
  padding: 101px 30px 0 30px;
  flex-shrink: 0;
`;

const ProgressStep = styled.div`
  height: 6px;
  width: 50px;
  border-radius: 5px;
  background: ${props => props.$active ? '#2ab7ca' : '#d9d9d9'};
`;

// 제목
const Title = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 24px;
  line-height: 26px;
  color: #cfcfcf;
  margin: 0;
  padding: 0 30px;
  margin-top: 75px;
  flex-shrink: 0;
`;

// 동아리 검색 입력
const SearchContainer = styled.div`
  padding: 28px 30px 0 30px;
  flex-shrink: 0;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 333px;
  height: 60px;
  background: #585858;
  border: none;
  border-radius: 25px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  color: #ffffff;
  padding: 16px 20px;
  outline: none;
  margin: 0 auto;
  display: block;
  
  &:focus {
    background: #666666;
  }
  
  &::placeholder {
    color: #bababa;
  }
`;

// 검색 결과
const SearchResults = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SearchResultItem = styled.button`
  width: 100%;
  max-width: 333px;
  margin: 0 auto;
  padding: 16px 20px;
  background: #585858;
  border: none;
  border-radius: 25px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  color: #ffffff;
  text-align: left;
  cursor: pointer;
  outline: none;
  
  &:active {
    background: #666666;
  }
`;

// 선택된 동아리 표시
const SelectedClub = styled.div`
  padding: 20px 30px;
  flex-shrink: 0;
`;

const SelectedClubText = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  color: #2ab7ca;
  text-align: center;
  margin: 0;
`;

// 건너뛰기 버튼
const SkipButton = styled.button`
  position: absolute;
  bottom: 110px;
  left: 50%;
  transform: translateX(-50%);
  background: none;
  border: none;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  color: #9f9f9f;
  cursor: pointer;
  outline: none;
  
  &:active {
    opacity: 0.8;
  }
`;

// 다음 버튼
const NextButton = styled.button`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 333px;
  max-width: calc(100% - 60px);
  height: 50px;
  background: ${props => props.$disabled ? '#b9d0d3' : '#2ab7ca'};
  border: none;
  border-radius: 10px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 18px;
  color: #ffffff;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  outline: none;
  flex-shrink: 0;
  
  &:active {
    opacity: ${props => props.$disabled ? 1 : 0.8};
  }
`;

export default function ClubStep({ data, onUpdate, onNext, onBack }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClub, setSelectedClub] = useState(data.club);
  const { data: searchResults, loading } = useSearchClubs(searchQuery, !!searchQuery.trim());

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectClub = (club) => {
    setSelectedClub(club);
    onUpdate({ club });
    setSearchQuery('');
  };

  const handleNextClick = () => {
    onNext();
  };

  const handleSkip = () => {
    onUpdate({ club: null });
    onNext();
  };

  return (
    <Container>
      <ProgressBar>
        <ProgressStep $active={true} />
        <ProgressStep $active={true} />
        <ProgressStep $active={true} />
        <ProgressStep $active={false} />
      </ProgressBar>

      <Title>동아리를 선택해주세요</Title>

      <SearchContainer>
        <SearchInput
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="동아리를 검색하세요"
          autoFocus
        />
      </SearchContainer>

      {selectedClub && (
        <SelectedClub>
          <SelectedClubText>선택된 동아리: {selectedClub.name}</SelectedClubText>
        </SelectedClub>
      )}

      {searchQuery.trim() && searchResults && searchResults.length > 0 && (
        <SearchResults>
          {searchResults.map((club) => (
            <SearchResultItem
              key={club.id}
              onClick={() => handleSelectClub(club)}
            >
              {club.name}
            </SearchResultItem>
          ))}
        </SearchResults>
      )}

      <SkipButton onClick={handleSkip}>건너뛰기</SkipButton>

      <NextButton onClick={handleNextClick}>
        다음으로
      </NextButton>
    </Container>
  );
}

