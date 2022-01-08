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

  function other_users_name(chat) {
    if (user.id === chat.receiver.id) {
      return chat.initiator.username;
    } else {
      return chat.receiver.username;
    }
  }

  return (
    <Wrapper>
      {chats.length > 0 ? (
        <ChatWrapper>
          <ChatContainer>
            {chats.map((chat) => (
              <Chat key={chat.id} onClick={() => setSelectedChat(chat)}>
                <Box>
                  <h2>{other_users_name(chat)}</h2>
                </Box>
              </Chat>
            ))}
          </ChatContainer>
          {selectedChat && <ChatInfo user={user} selectedChat={selectedChat} />}
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
