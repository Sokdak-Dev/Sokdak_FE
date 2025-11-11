import styled from "styled-components";

const ProgressBarContainer = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
  align-items: center;
  height: 6px;
  width: 333px;
`;

const ProgressStep = styled.div`
  width: 50px;
  height: 6px;
  border-radius: 5px;
  background: ${(props) => (props.$active ? "#2ab7ca" : "#d9d9d9")};
`;

/**
 * ProgressBar 컴포넌트
 * @param {number} currentStep - 현재 진행 단계 (1부터 시작)
 * @param {number} totalSteps - 전체 단계 수
 */
export default function ProgressBar({ currentStep = 1, totalSteps = 6 }) {
  return (
    <ProgressBarContainer>
      {Array.from({ length: totalSteps }, (_, index) => (
        <ProgressStep key={index} $active={index + 1 <= currentStep} />
      ))}
    </ProgressBarContainer>
  );
}

