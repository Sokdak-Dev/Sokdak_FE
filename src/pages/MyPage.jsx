import styled from "styled-components";
import { useState } from "react";
import ProfileHeader from "../features/profile/components/ProfileHeader.jsx";
import ProfileTabs from "../features/profile/components/ProfileTabs.jsx";
import PraiseMessage from "../features/profile/components/PraiseMessage.jsx";
import BadgeList from "../features/profile/components/BadgeList.jsx";
import {
  mockReceivedMessages,
  mockSentMessages,
} from "../features/profile/mockData.js";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #222222;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const HeaderSection = styled.div`
  flex-shrink: 0;
  width: 100%;
`;

const TabsSection = styled.div`
  flex-shrink: 0;
  width: 100%;
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  min-height: 0;
`;

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 46px;
  padding-bottom: 16px;
  width: 100%;
`;

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("received");

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  // 탭에 따라 표시할 메시지 결정
  const getMessages = () => {
    switch (activeTab) {
      case "sent":
        return mockSentMessages;
      case "received":
        return mockReceivedMessages;
      case "badges":
        return []; // 뱃지는 나중에 구현
      default:
        return [];
    }
  };

  const messages = getMessages();

  return (
    <Container>
      <HeaderSection>
        <ProfileHeader />
      </HeaderSection>
      <TabsSection>
        <ProfileTabs activeTab={activeTab} onTabChange={handleTabChange} />
      </TabsSection>
      <ScrollableContent>
        {activeTab === "badges" ? (
          <BadgeList />
        ) : (
          <MessagesContainer>
            {messages.map((message) => (
              <PraiseMessage key={message.id} message={message} />
            ))}
          </MessagesContainer>
        )}
      </ScrollableContent>
    </Container>
  );
}

