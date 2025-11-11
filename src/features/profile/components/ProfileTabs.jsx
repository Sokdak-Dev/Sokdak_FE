import styled from "styled-components";

const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: #222222;
  border-bottom: 1px solid #3f3f3f;
`;

const Tab = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: ${(props) => (props.$isActive ? "#3f3f3f" : "#282828")};
  border: none;
  border-bottom: ${(props) =>
    props.$isActive ? "1px solid #ffffff" : "1px solid #585858"};
  border-radius: 0;
  cursor: pointer;
  font-family: "Inter", "Noto Sans KR", sans-serif;
  font-size: 14px;
  line-height: normal;
  font-weight: ${(props) => (props.$isActive ? 700 : 500)};
  color: ${(props) => (props.$isActive ? "#ffffff" : "#9f9f9f")};
  white-space: nowrap;
  transition: all 0.2s ease;
  box-sizing: border-box;
  outline: none;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: none;
  }
`;

export default function ProfileTabs({
  activeTab = "received",
  onTabChange,
}) {
  const tabs = [
    { id: "sent", label: "보낸" },
    { id: "received", label: "받은" },
    { id: "badges", label: "뱃지" },
  ];

  const handleTabClick = (tabId) => {
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <TabsContainer>
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          $isActive={activeTab === tab.id}
          onClick={() => handleTabClick(tab.id)}
          aria-label={tab.label}
          aria-selected={activeTab === tab.id}
          role="tab"
        >
          {tab.label}
        </Tab>
      ))}
    </TabsContainer>
  );
}

