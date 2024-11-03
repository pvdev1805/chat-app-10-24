import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const scroll = useRef();

  const { authUser, selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      <div
        ref={scroll}
        className={`chat ${
          message?.senderId === authUser?._id ? "chat-end" : "chat-start"
        }`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              src={
                message?.senderId === authUser?._id
                  ? authUser?.profilePhoto
                  : selectedUser?.profilePhoto
              }
              alt="TailwindCSS chat bubble component"
            />
          </div>
        </div>

        <div className="chat-header">
          <time className="text-xs opacity-50">12:45</time>
        </div>

        <div
          className={`chat-bubble ${
            message?.senderId === auth?._id ? "bg-gray-200 text-black" : ""
          }`}
        >
          {message?.message}
        </div>
      </div>
    </>
  );
};

export default Message;