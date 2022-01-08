import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Error, Input, FormField, Label } from "../styles";

function ChatInfo({ user, selectedChat }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      content: message,
      user_id: user.id,
      chat_id: selectedChat.id,
    };

    fetch("/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    setMessage("");
  }

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000/cable");
    socket.addEventListener("open", (event) => {
      const message = {
        command: "subscribe",
        identifier: JSON.stringify({
          channel: "ChatsChannel",
          chat_id: selectedChat.id,
        }),
      };
      socket.send(JSON.stringify(message));
    });

    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "ping") return;
      if (!data.message) return;
      if (data.message.type === "all_messages") {
        setMessages(data.message.messages);
      } else if (data.message.type === "new_message") {
        setMessages((currentMessages) => [
          data.message.new_message,
          ...currentMessages,
        ]);
      }
      console.log(data.message);
    });
  }, [selectedChat]);

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <FormField>
          {errors.map((err) => (
            <Error key={err}>{err}</Error>
          ))}
        </FormField>
        <FormField>
          <Label htmlFor="newMessage">New Message</Label>
          <Input
            type="text"
            id="newMessage"
            autoComplete="off"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </FormField>
        <FormField>
          <Button variant="fill" color="primary" type="submit">
            {isLoading ? "Loading..." : "Send"}
          </Button>
        </FormField>
      </Form>
      {messages.map(({ id, content, user_id }) => (
        <p
          key={id}
          style={
            user.id === user_id
              ? { textAlign: "right", padding: "20px" }
              : { textAlign: "left", padding: "20px" }
          }
        >
          {content}
        </p>
      ))}
    </Wrapper>
  );
}

const Form = styled.form`
  width: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
`;

export default ChatInfo;
