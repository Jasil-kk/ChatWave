import React, { useCallback, useEffect, useRef, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { MdSend } from "react-icons/md";
import InputEmoji from "react-input-emoji";
import axios from "axios";
import Header from "./Header";
import ChatersList from "./ChatersList";
import { BaseUrl } from "../Store";
import SelectChatter from "./SelectChatter";
import { map } from "lodash";
import { io } from "socket.io-client";
import Notification from "../Components/Notification";
import ChatProfile from "../Components/ChatProfile";

const ENDPOINT = "http://localhost:4001";
var socket, selectedChatCompare;

const ChatPage = () => {
  const [show, setShow] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [menuShow, setMenuShow] = useState(false);
  const [profile, setProfile] = useState();
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chaters, setChaters] = useState([]);
  const [chaterId, setChaterId] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [notification, setNotification] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const ref = useRef(null);

  const token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  useEffect(() => {
    axios
      .get(`${BaseUrl}/user/get`, config)

      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", profile);
    socket.on("connected", () => setSocketConnected(true));
  }, [profile]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShow(false);
      setMenuShow(false);
    }
  };

  const handlepen = () => setShowUsers(true);

  useEffect(() => {
    axios
      .get(`${BaseUrl}/chat/get`, config)
      .then((response) => {
        setChaters(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleSend = async () => {
    try {
      const { data } = await axios.post(
        `${BaseUrl}/message/send`,
        { content: inputValue, chatId: chaterId?.chatID },
        config
      );
      // console.log(response);
      socket.emit("new message", data);
      setMessages([...messages, data]);
      fetchMessages(chaterId?.chatID);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}/message/get/${chaterId?.chatID}`,
        config
      );
      setMessages(response.data);
      socket.emit("join chat", chaterId?.chatID);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = chaterId;
  }, [chaterId]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare.chatID !== newMessageRecieved.chaterId.chatID
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });
  console.log(messages);
  return (
    <div className="w-full min-h-screen h-auto bg-slate-50 flex flex-col items-center font-poppins relative">
      <Header profile={profile} />

      <button
        onClick={handlepen}
        className="absolute top-20 left-10 w-auto px-3 h-10 bg-green-500 hover:bg-green-600 text-slate-50 rounded-md"
      >
        Add New Chatter
      </button>

      {showUsers && (
        <div className="fixed top-0 left-0 z-50">
          <SelectChatter
            setShowUsers={setShowUsers}
            chaters={chaters}
            setChaters={setChaters}
          />
        </div>
      )}
      <div className="mt-16 p-5 flex items-center gap-7">
        <ChatersList
          chaters={chaters}
          setChaters={setChaters}
          chaterId={chaterId}
          setChaterId={setChaterId}
        />
        <div className="flex flex-col">
          {chaterId ? null : (
            <Notification notification={notification} chaterId={chaterId} />
          )}

          {chaterId ? (
            <div className="w-[600px] h-[700px] drop-shadow-lg flex flex-col bg-slate-200 rounded-xl overflow-hidden relative">
              <div className="w-full h-20 bg-green-700 flex items-center px-5">
                <div
                  onClick={() => setShow(true)}
                  className="w-12 h-12 rounded-full border-2 border-slate-400 bg-slate-300 text-slate-500 cursor-pointer overflow-hidden"
                >
                  <img
                    className="w-full h-full"
                    src={chaterId?.photo}
                    alt="photo"
                  />
                </div>
                <h2 className="ml-5 text-slate-100 text-2xl font-semibold">
                  {chaterId?.name}
                </h2>
                <span
                  onClick={() => setMenuShow(true)}
                  className="ml-auto text-slate-50 text-3xl cursor-pointer"
                >
                  <CiMenuKebab />
                </span>
              </div>

              <div className="w-full h-full p-4 flex flex-col font-outfit bg-slate-50 overflow-y-auto relative bg-cover bg-no-repeat bg-[url('https://i.pinimg.com/originals/39/cf/bc/39cfbc81276720ddf5003854e42c2769.jpg')]">
                {map(messages, (message, index) => (
                  <React.Fragment key={index}>
                    {profile?._id === message?.sender?._id ? (
                      <div
                        key={index}
                        className="ml-auto mb-1 w-auto flex items-center px-3 py-1 text-lg h-auto bg-blue-100 rounded-2xl rounded-tr-none drop-shadow-lg text-slate-800"
                      >
                        {message?.content}
                      </div>
                    ) : (
                      ""
                    )}
                    {message?.chat?.isGroupChat === "false" ? (
                      <>
                        {chaterId?.id === message?.sender?._id ? (
                          <div className="mr-auto mb-1 w-auto flex items-center px-3 py-1 text-lg h-auto bg-green-100 rounded-2xl rounded-tl-none drop-shadow-lg text-slate-800">
                            {message?.content}
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      <>
                        {profile?._id === message?.sender?._id ? (
                          ""
                        ) : (
                          <div className="mr-auto mb-1 w-auto flex flex-col items-center px-3 py-1 text-lg h-auto bg-green-100 rounded-2xl rounded-tl-none drop-shadow-lg text-slate-800">
                            <h6 className="text-sm text-blue-600 mr-auto">
                              {message?.sender?.name}
                            </h6>
                            <p>{message?.content}</p>
                          </div>
                        )}
                      </>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="w-full h-20 flex gap-2 items-center px-5 bg-slate-300">
                <InputEmoji
                  fontSize="18px"
                  fontFamily="outfit"
                  value={inputValue}
                  onChange={handleInputChange}
                  cleanOnEnter
                  onEnter={handleSend}
                  placeholder="Type a message"
                />
                <span
                  onClick={handleSend}
                  className="text-3xl text-slate-600 cursor-pointer"
                >
                  <MdSend />
                </span>
              </div>
              {show && (
                <div
                  ref={ref}
                  className="absolute top-16 left-28 w-96 h-auto p-5 flex flex-col gap-5 bg-slate-50 rounded-xl"
                >
                  <ChatProfile
                    profile={profile}
                    chaterId={chaterId}
                    setChaterId={setChaterId}
                    config={config}
                  />
                </div>
              )}
              {menuShow && (
                <div
                  ref={ref}
                  className="absolute top-12 right-8 w-40 h-auto p-2 pt-5 bg-slate-50 rounded drop-shadow-lg"
                ></div>
              )}
            </div>
          ) : (
            <div className="bg-green-200 p-16 text-slate-800">
              click on a user to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
