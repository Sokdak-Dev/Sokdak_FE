import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 47px 30px 28px 30px;
  flex-shrink: 0;
`;

const Input = styled.input`
  width: 333px;
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
  text-align: center;
  
  &:focus {
    background: #666666;
  }
  
  &::placeholder {
    color: #9f9f9f;
  }
`;

export default function NameFieldEditor({ value, onChange }) {
  const handleChange = (e) => {
    console.log('NameFieldEditor - onChange:', e.target.value);
    onChange(e.target.value);
  };

  return (
    <InputContainer>
      <Input
        type="text"
        value={value || ''}
        onChange={handleChange}
        placeholder="이름을 입력하세요"
        autoFocus
      />
    </InputContainer>
  );
}

