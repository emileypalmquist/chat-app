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
    // handle creating new message
    setMessage("");
  }

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
