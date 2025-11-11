import styled from "styled-components";

const UsersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  margin-top: 20px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
`;

const UserCard = styled.button`
  width: 160px;
  height: 90px;
  background: ${(props) => (props.$selected ? "#2ab7ca" : "#353535")};
  border: ${(props) => (props.$selected ? "none" : "1px solid #2ab7ca")};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 17px;
  padding: 11px 77px 11px 77px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.$selected ? "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" : "none"};
`;

const UserIcon = styled.div`
  width: 36px;
  height: 36px;
  background: ${(props) => (props.$selected ? "white" : "#555")};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  svg {
    width: 24px;
    height: 24px;
    color: ${(props) => (props.$selected ? "#2ab7ca" : "#999")};
  }
`;

const UserName = styled.span`
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
  color: white;
  white-space: nowrap;
`;

// 사용자 프로필 아이콘 SVG
const UserProfileIcon = ({ selected }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
      fill={selected ? "#2ab7ca" : "#999"}
    />
    <path
      d="M12 14C7.58172 14 4 16.6863 4 20V22H20V20C20 16.6863 16.4183 14 12 14Z"
      fill={selected ? "#2ab7ca" : "#999"}
    />
  </svg>
);

/**
 * MemberSelector 컴포넌트
 * 칭찬할 사람을 선택하는 그리드 컴포넌트
 * @param {Array} users - 선택 가능한 사용자 배열 [{ id, name }, ...]
 * @param {number|null} selectedUserId - 현재 선택된 사용자 ID
 * @param {Function} onSelect - 사용자 선택 시 호출되는 콜백 함수 (userId) => void
 */
export default function MemberSelector({ users = [], selectedUserId = null, onSelect }) {
  return (
    <UsersGrid>
      {users.map((user) => (
        <UserCard
          key={user.id}
          $selected={selectedUserId === user.id}
          onClick={() => onSelect?.(user.id)}
        >
          <UserIcon $selected={selectedUserId === user.id}>
            <UserProfileIcon selected={selectedUserId === user.id} />
          </UserIcon>
          <UserName>{user.name}</UserName>
        </UserCard>
      ))}
    </UsersGrid>
  );
}

