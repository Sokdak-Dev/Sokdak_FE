import { useState } from 'react';
import styled from 'styled-components';
import ProgressBar from '../../../components/ProgressBar.jsx';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #222222;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

// 진행 바 wrapper
const ProgressBarWrapper = styled.div`
  padding: 101px 30px 0 30px;
  flex-shrink: 0;
  width: 100%;
`;

// 제목
const Title = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  color: #cfcfcf;
  margin: 0;
  padding: 0 30px;
  margin-top: 75px;
  flex-shrink: 0;
  text-align: center;
`;

// 입력 필드 컨테이너
const InputContainer = styled.div`
  padding: 28px 30px 0 30px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Input = styled.input`
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

// 다음 버튼
const NextButton = styled.button`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 333px;
  max-width: calc(100% - 60px);
  height: 50px;
  background: ${props => props.$disabled ? '#B9D0D3' : '#2ab7ca'};
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
  padding: 11px 77px;
  
  &:active {
    opacity: ${props => props.$disabled ? 1 : 0.8};
  }
`;

export default function EmailPasswordStep({ currentStep = 1, totalSteps = 7, data, onUpdate, onNext }) {
  const [email, setEmail] = useState(data.email || '');
  const [password, setPassword] = useState(data.password || '');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    onUpdate({ email: value });
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    onUpdate({ password: value });
  };

  const handlePasswordConfirmChange = (e) => {
    const value = e.target.value;
    setPasswordConfirm(value);
  };

  const handleNextClick = () => {
    if (email.trim() && password.trim() && password === passwordConfirm) {
      onNext();
    }
  };

  // 이메일 형식 검증
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 비밀번호 일치 검증
  const isPasswordMatch = password === passwordConfirm && passwordConfirm.trim() !== '';

  const isNextDisabled = !email.trim() || !password.trim() || !passwordConfirm.trim() || !isValidEmail(email) || password.length < 6 || !isPasswordMatch;

  return (
    <Container>
      <ProgressBarWrapper>
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </ProgressBarWrapper>

      <Title>이메일과 비밀번호를 입력해주세요</Title>

      <InputContainer>
        <Input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="이메일을 입력하세요"
          autoFocus
        />
        <Input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="비밀번호를 입력하세요 (6자 이상)"
        />
        <Input
          type="password"
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
          placeholder="비밀번호를 다시 입력하세요"
        />
      </InputContainer>

      <NextButton
        $disabled={isNextDisabled}
        onClick={handleNextClick}
        disabled={isNextDisabled}
      >
        다음으로
      </NextButton>
    </Container>
  );
}

