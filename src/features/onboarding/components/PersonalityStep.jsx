import { useState } from 'react';
import styled from 'styled-components';

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

// 성격 옵션 컨테이너
const OptionsContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 28px 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const OptionItem = styled.button`
  width: 100%;
  max-width: 333px;
  margin: 0 auto;
  padding: 16px 20px;
  background: ${props => props.$selected ? '#2ab7ca' : '#585858'};
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
    opacity: 0.8;
  }
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

// 완료 버튼
const CompleteButton = styled.button`
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

// 성격 옵션 목록 (예시)
const PERSONALITY_OPTIONS = [
  '활발한',
  '조용한',
  '친근한',
  '진지한',
  '유머러스한',
  '책임감 있는',
  '창의적인',
  '논리적인',
];

export default function PersonalityStep({ data, onUpdate, onNext, onBack }) {
  const [selectedPersonality, setSelectedPersonality] = useState(data.personality || '');

  const handleSelectPersonality = (personality) => {
    setSelectedPersonality(personality);
    onUpdate({ personality });
  };

  const handleComplete = () => {
    onNext(); // 마지막 단계이므로 완료 처리
  };

  const handleSkip = () => {
    onUpdate({ personality: '' });
    onNext();
  };

  return (
    <Container>
      <ProgressBar>
        <ProgressStep $active={true} />
        <ProgressStep $active={true} />
        <ProgressStep $active={true} />
        <ProgressStep $active={true} />
      </ProgressBar>

      <Title>성격을 선택해주세요</Title>

      <OptionsContainer>
        {PERSONALITY_OPTIONS.map((personality) => (
          <OptionItem
            key={personality}
            $selected={selectedPersonality === personality}
            onClick={() => handleSelectPersonality(personality)}
          >
            {personality}
          </OptionItem>
        ))}
      </OptionsContainer>

      <SkipButton onClick={handleSkip}>건너뛰기</SkipButton>

      <CompleteButton onClick={handleComplete}>
        완료하기
      </CompleteButton>
    </Container>
  );
}

