import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import { BASE_URL, API_URL } from "../../utils/contants";

const Conversation = ({ conversation, myID, setSelected }) => {
  const otherUserID = conversation.members.find(item => item !== myID);
  const [otherUser, setOtherUser] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    let messages = conversation.messages;
    messages.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
    setLastMessage(messages[0]);
  }, [conversation]);

  useEffect(() => {
    axios
      .get(API_URL + "auth/" + otherUserID)
      .then(res => setOtherUser(res.data));
  }, [otherUserID]);

  return (
    <Row
      className="d-flex align-items-center p-2 justify-content-between justify-content-sm-start justify-content-md-start conversation"
      onClick={() => setSelected(conversation)}
    >
      <Col xs={2} sm={3} md={2}>
        <img
          className="sidebarUserImg"
          src={BASE_URL + otherUser?.image?.url}
          alt="User"
        />
      </Col>

      <Col
        xs={9}
        sm={9}
        md={10}
        className="d-flex justify-content-between justify-content-sm-start justify-content-md-between align-items-end"
      >
        <div className="conversation-wrapper">
          <h6 className="mb-0 conversation-text">{otherUser?.fullName}</h6>
          <div className="message-body d-flex align-items-center justify-content-start">
            <p className="m-0 text-muted msg-description conversation-text">
              {lastMessage?.text}
            </p>
          </div>
        </div>

        <div className="d-flex flex-column align-items-end justify-content-start">
          <p className="mb-0 chat-time text-secondary">
            {moment(lastMessage?.createdAt).fromNow()}
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default Conversation;
