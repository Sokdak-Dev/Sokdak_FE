import styled from 'styled-components';

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 30px 35px;
  flex-shrink: 0;
`;

const OptionItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background: none;
  border: none;
  border-bottom: 2px solid #585858;
  border-radius: 0;
  cursor: pointer;
  outline: none;
  width: 100%;
  
  &:hover {
    opacity: 0.8;
  }
  
  &:active {
    opacity: 0.6;
  }
  
  &:focus,
  &:focus-visible {
    outline: none;
  }
`;

const OptionText = styled.span`
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  color: #cfcfcf;
  text-align: left;
`;

const RadioButton = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #cfcfcf;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: ${props => props.$selected ? '#222222' : 'transparent'};
  
  ${props => props.$selected && `
    &::after {
      content: '';
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #cfcfcf;
    }
  `}
`;

const GENDER_OPTIONS = [
  { value: '남성', label: '남성' },
  { value: '여성', label: '여성' },
];

export default function GenderFieldEditor({ value, onChange }) {
  const handleOptionClick = (optionValue) => {
    console.log('GenderFieldEditor - 선택:', optionValue, '현재 값:', value);
    onChange(optionValue);
  };

  return (
    <OptionsContainer>
      {GENDER_OPTIONS.map((option) => (
        <OptionItem
          key={option.value}
          onClick={() => handleOptionClick(option.value)}
        >
          <OptionText>{option.label}</OptionText>
          <RadioButton $selected={value === option.value} />
        </OptionItem>
      ))}
    </OptionsContainer>
  );
}

