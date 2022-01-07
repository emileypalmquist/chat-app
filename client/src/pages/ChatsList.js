import { useEffect, useState } from "react";
import styled from "styled-components";
import { Box } from "../styles";
import ChatInfo from "../components/ChatInfo";

function ChatsList({ user }) {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    fetch("/chats")
      .then((r) => r.json())
      .then(setChats);
  }, []);

  return (
    <Wrapper>
      {chats.length > 0 ? (
        <ChatWrapper>
          <ChatContainer>
            {chats.map((chat) => (
              <Chat key={chat.id} onClick={() => setSelectedChat(chat)}>
                <Box>
                  <h2>
                    {user.id !== chat.receiver.id
                      ? chat.receiver.username
                      : chat.initiator.username}
                  </h2>
                </Box>
              </Chat>
            ))}
          </ChatContainer>
          <ChatInfo user={user} selectedChat={selectedChat} />
        </ChatWrapper>
      ) : (
        <>
          <h2>You're not a chatty cathy</h2>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  height: 90vh;
`;

const Chat = styled.article`
  margin-bottom: 24px;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChatWrapper = styled.div`
  width: 100vw;
  display: flex;
`;

export default ChatsList;
