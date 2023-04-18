import React, { useEffect, useRef, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { TiUser } from "react-icons/ti";
import { MdSend } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import InputEmoji from "react-input-emoji";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import ChatersList from "./ChatersList";

const ChatPage = () => {
  const [show, setShow] = useState(false);
  const [menuShow, setMenuShow] = useState(false);
  const [profile, setProfile] = useState();
  const [text, setText] = useState("");
  const [textShow, setTextShow] = useState("");
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

  const handleOnEnter = (text) => {
    console.log("message :", text);
    setTextShow(text);
  };
  const handleSend = () => {
    console.log("message :", text);
    setTextShow(text);
    setText("");
  };
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  useEffect(() => {
    axios
      .get("http://192.168.29.54:4001/user/get", config)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="w-full h-auto bg-slate-50 flex flex-col items-center font-poppins">
      <Header profile={profile} />
      <div className="mt-16 p-5 flex items-center gap-7">
        <ChatersList/>
      <div className="w-[600px] h-[700px] drop-shadow-lg flex flex-col bg-slate-200 rounded-xl overflow-hidden relative">
        <div className="w-full h-20 bg-green-700 flex items-center px-5">
          <div
            onClick={() => setShow(true)}
            className="w-12 h-12 rounded-full border-2 border-slate-400 bg-slate-300 text-slate-500 cursor-pointer overflow-hidden"
          >
            {profile?.photos[0] ? (
              <img
                className="w-full h-full"
                src={profile?.photos[0]?.url}
                alt="profile"
              />
            ) : (
              <img
                className="w-full h-full"
                src={profile?.defaultPhoto?.url}
                alt="profile"
              />
            )}
          </div>
          <h2 className="ml-5 text-slate-100 text-2xl font-semibold">
            {profile?.name}
          </h2>
          <span
            onClick={() => setMenuShow(true)}
            className="ml-auto text-slate-50 text-3xl cursor-pointer"
          >
            <CiMenuKebab />
          </span>
        </div>

        <div className="w-full h-full flex flex-col font-outfit bg-slate-50 overflow-y-auto relative bg-cover bg-no-repeat bg-[url('https://i.pinimg.com/originals/39/cf/bc/39cfbc81276720ddf5003854e42c2769.jpg')]">
          {textShow ? (
            <div className="absolute top-5 right-5 w-auto flex items-center px-3 py-1 text-lg h-auto bg-blue-100 rounded-2xl rounded-tr-none drop-shadow-lg text-slate-800">
              {textShow}
            </div>
          ) : (
            ""
          )}
          <div className="absolute top-5 left-5 w-auto flex items-center px-3 py-1 text-lg h-auto bg-green-100 rounded-2xl rounded-tl-none drop-shadow-lg text-slate-800">
            hello
          </div>
        </div>
        <div className="w-full h-20 flex gap-2 items-center px-5 bg-slate-300">
          <InputEmoji
            fontSize="18px"
            fontFamily="outfit"
            value={text}
            onChange={setText}
            cleanOnEnter
            onEnter={handleOnEnter}
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
              {profile?.photos[0] ? (
                <img
                  className="w-full h-full"
                  src={profile?.photos[0]?.url}
                  alt="profile"
                />
              ) : (
                <img
                  className="w-full h-full"
                  src={profile?.defaultPhoto?.url}
                  alt="profile"
                />
              )}
            </div>
            <div>
              <h5 className="text-2xl text-slate-800 font-semibold ">
                {profile?.name}
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
      </div>
    </div>
  );
};

export default ChatPage;
