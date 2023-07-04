/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "antd";
import { IoMdSend } from "react-icons/io";
import { toast } from "react-toastify";
import axios from "axios";
import { io } from "socket.io-client";
import ChatSidebar from "./ChatSidebar";
import Navbar from "../../Common/CustomNavbar/Index";
import Message from "./Message";
import { API_URL, SOCKET_URL } from "../../utils/contants";
import "../../Stylesheet/Chat/chat.scss";

const ChatPage = () => {
  const socket = useRef();
  const inputRef = useRef(null);
  const sendBtnRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("authUser"));
  const [selected, setSelected] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.current = io(SOCKET_URL);
    socket.current.emit("addUser", user?._id);
    socket.current.on("getUsers", data => console.log(data));
    socket.current.on("getMessage", data => {
      setSelected(prevState => ({
        ...prevState,
        messages: [
          ...prevState?.messages,
          {
            _id: new Date().getMilliseconds(),
            conversationID: selected?.id,
            senderID: data.senderID,
            text: data.text,
          },
        ],
      }));
    });
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          sendBtnRef.current.click();
        }
      });
    }
  }, [inputRef.current]);

  const handleNewMessageSend = () => {
    const receiverID = selected?.members.find(item => item !== user?._id);

    if (newMessage !== "") {
      const data = {
        conversationID: selected?._id,
        sender: user?._id,
        text: newMessage,
      };

      socket.current.emit("sendMessage", {
        senderID: data.sender,
        receiverID,
        text: data.text,
      });

      axios
        .post(API_URL + "messages", data)
        .then(res => {
          setSelected(prevState => ({
            ...prevState,
            messages: [...prevState?.messages, res.data],
          }));
          setNewMessage("");
        })
        .catch(() => toast.error("Message not sent! Try Again"));
    }
  };

  return (
    <>
      <Navbar />
      <Container fluid className="overflow-hidden chatWrapper">
        <Row className="h-100">
          <ChatSidebar setSelected={setSelected} />

          <Col className="px-0 main-chat">
            {selected ? (
              <Row
                className={`chat-message-content px-5 ${
                  selected?.messages.length > 7 ? "d-block" : "d-grid"
                } align-content-end`}
              >
                {selected?.messages
                  .sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1))
                  .map(msg => (
                    <Message message={msg} own={msg?.sender === user?._id} />
                  ))}

                <Row className="msg-bottom-feild bg-appbar-light py-3 align-items-center justify-content-between d-none d-sm-flex">
                  <Col className="px-0" xs={10} sm={10} md={11}>
                    <input
                      className="form-control message-input-feild"
                      ref={inputRef}
                      placeholder="Type a message"
                      value={newMessage}
                      onChange={e => {
                        setNewMessage(e.target.value);
                      }}
                    />
                  </Col>

                  <Col className="px-0 text-center" xs={2} sm={2} md={1}>
                    <Button
                      ref={sendBtnRef}
                      type="link"
                      size="small"
                      onClick={handleNewMessageSend}
                    >
                      <IoMdSend
                        className="me-0 me-sm-0 me-md-2 me-lg-2 msg-send-btn"
                        color="#8696A0"
                        fontSize={22}
                      />
                    </Button>
                  </Col>
                </Row>
              </Row>
            ) : (
              <div className="defaultMessage">
                Select any message to see its chat
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ChatPage;
