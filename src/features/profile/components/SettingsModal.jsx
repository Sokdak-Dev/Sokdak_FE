import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useAuth } from '../../auth/useAuth.js';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const ModalContainer = styled.div`
  background: #222222;
  border-radius: 20px 20px 0 0;
  padding: 28px;
  width: 100%;
  max-width: 500px;
  position: relative;
`;

const ModalTitle = styled.h2`
  font-family: 'Inter', 'Noto Sans KR', sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: #ffffff;
  margin: 0 0 24px 0;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const MenuItem = styled.button`
  width: 100%;
  padding: 16px 0;
  background: none;
  border: none;
  border-bottom: 1px solid #333333;
  color: #ffffff;
  font-family: 'Inter', 'Noto Sans KR', sans-serif;
  font-size: 16px;
  text-align: left;
  cursor: pointer;
  outline: none;
  
  &:hover {
    background: #2a2a2a;
  }
  
  &:active {
    background: #333333;
  }
  
  &:last-child {
    border-bottom: none;
    color: #ff4444;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #9f9f9f;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  
  &:hover {
    background: #333333;
    color: #ffffff;
  }
`;

/**
 * 설정 모달 컴포넌트
 * logout() 함수를 사용하여 로그아웃 기능을 제공합니다
 */
export default function SettingsModal({ isOpen, onClose }) {
  const { user, logout } = useAuth();

  // ESC 키로 모달 닫기
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // 오버레이 클릭 시 모달 닫기
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 로그아웃 처리 (logout 사용)
  const handleLogout = () => {
    if (confirm('로그아웃하시겠습니까?')) {
      // logout()으로 사용자 정보 초기화
      logout();
      
      // 로그인 페이지로 이동 (또는 홈으로)
      // navigate('/login');
      
      alert('로그아웃되었습니다.');
      onClose();
    }
  };

  if (!isOpen || !user) {
    return null;
  }

  const modalContent = (
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} aria-label="닫기">
          ×
        </CloseButton>
        
        <ModalTitle>설정</ModalTitle>

        <MenuList>
          <MenuItem onClick={() => {
            alert('알림 설정 기능은 준비 중입니다.');
            onClose();
          }}>
            알림 설정
          </MenuItem>
          <MenuItem onClick={() => {
            alert('개인정보 처리방침 기능은 준비 중입니다.');
            onClose();
          }}>
            개인정보 처리방침
          </MenuItem>
          <MenuItem onClick={() => {
            alert('이용약관 기능은 준비 중입니다.');
            onClose();
          }}>
            이용약관
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            로그아웃
          </MenuItem>
        </MenuList>
      </ModalContainer>
    </Overlay>
  );

  return createPortal(modalContent, document.body);
}

