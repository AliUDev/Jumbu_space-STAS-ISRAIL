import React from "react";

const Message = ({ message, own }) => {
  return (
    <div
      key={message._id}
      className={`msg-content d-inline-flex ${
        own ? "justify-content-end" : "justify-content-start"
      } align-items-start h-auto`}
    >
      <div
        className={`${
          own ? "here" : "there"
        } my-2 d-flex flex-column p-2 text-white mw-75`}
      >
        <h6 className="mb-1 reciever color-primary">{message?.name}</h6>
        <p className="mb-0">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
