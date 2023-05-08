import React, { useEffect, useRef, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { MdSend } from "react-icons/md";
import InputEmoji from "react-input-emoji";
import axios from "axios";
import Header from "./Header";
import ChatersList from "./ChatersList";
import { BaseUrl } from "../Store";
import SelectChatter from "./SelectChatter";
import { map } from "lodash";

const ChatPage = () => {
  const [show, setShow] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [menuShow, setMenuShow] = useState(false);
  const [profile, setProfile] = useState();
  const [inputValue, setInputValue] = useState("");
  const [sended, setSended] = useState([]);
  const [chaters, setChaters] = useState([]);
  const [chaterId, setChaterId] = useState();
  const ref = useRef(null);

  const token = localStorage.getItem("token");
  

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
    const chatid = chaterId?.id;
    if (chatid) {
      try {
        const response = await axios.post(
          `${BaseUrl}/message/send`,
          { content: inputValue, chatId: chatid },
          config
        );
        console.log(response);
        fetchMessages(chatid);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchMessages = async (chatid) => {
    try {
      const response = await axios.get(
        `${BaseUrl}/message/get/${chatid}`,
        config
      );
      console.log(response.data);
      setSended(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const chatid = chaterId?.id;
  useEffect(() => {
    if (chatid) {
      // Trigger the GET request initially
      fetchMessages(chatid);
    }
  }, [chatid]);

  console.log(inputValue);
  console.log(sended);

  return (
    <div className="w-full h-auto bg-slate-50 flex flex-col items-center font-poppins relative">
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
        {chaterId && (
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
              {map(sended, (send) => (
                <div className="ml-auto mb-2 w-auto flex items-center px-3 py-1 text-lg h-auto bg-blue-100 rounded-2xl rounded-tr-none drop-shadow-lg text-slate-800">
                  {send?.content}
                </div>
              ))}

              <div className="mr-auto w-auto flex items-center px-3 py-1 text-lg h-auto bg-green-100 rounded-2xl rounded-tl-none drop-shadow-lg text-slate-800">
                hello
              </div>
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
                className="absolute top-16 left-28 w-96 h-auto p-5 flex items-center gap-5 bg-slate-50 rounded-xl"
              >
                <div className="bg-slate-50 w-36 h-36 rounded-full border-4 border-slate-300 overflow-hidden">
            
                    <img
                      className="w-full h-full"
                      src={chaterId?.photo}
                      alt="profile"
                    />

                </div>
                <div>
                  <h5 className="text-2xl text-slate-800 font-semibold ">
                  {chaterId?.name}
                  
                  </h5>
                </div>
              </div>
            )}
            {menuShow && (
              <div
                ref={ref}
                className="absolute top-12 right-8 w-40 h-auto p-2 pt-5 bg-slate-50 rounded drop-shadow-lg"
              ></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
