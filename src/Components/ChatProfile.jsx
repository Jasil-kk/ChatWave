import axios from "axios";
import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { BaseUrl } from "../Store";

const ChatProfile = ({ profile, chaterId,setChaterId,config }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  const handleClose = () => setShow(!show);
  const [groupName, setGroupName] = useState("");
  const handleEdit = () => {
    axios.put(`${BaseUrl}/chat/group/rename`,{chatId:chaterId?.chatID,chatName:groupName},config).then((response) => {
      console.log(response.data);
      setChaterId({...chaterId,name : response.data.chatName});
      handleClose();
    });
  };
  return (
    <div>
      <div className="flex items-center gap-5">
        <div className="bg-slate-50 w-36 h-36 rounded-full border-4 border-slate-300 overflow-hidden">
          <img className="w-full h-full" src={chaterId?.photo} alt="profile" />
        </div>
        <div>
          <h5 className="text-2xl text-slate-800 font-semibold ">
            {chaterId?.name}
          </h5>
        </div>
        <span onClick={handleShow} className="text-xl mt-1 text-slate-500 cursor-pointer">
          <MdEdit />
        </span>
      </div>
      {show && (
        <div className="w-full flex flex-col gap-3 h-auto p-3 pr-5">
          <h3 className="text-slate-800 ">Change Group Name</h3>
          <input
            className="h-10 px-3 border border-slate-300"
            type="text"
            defaultValue={chaterId?.name}
            onChange={(e)=> setGroupName(e.target.value)}
          />
          <button onClick={handleEdit} className="ml-auto rounded bg-green-500 w-auto h-8 px-2 text-slate-50">
            change
          </button>
        </div>
      )}
      <div className="w-full">
        <h5 className="mt-5 mb-2 text-base text-slate-600">Memebers : </h5>
        <span className="ml-2 mb-2 pr-5 flex items-center text-lg text-slate-800 capitalize">
          <img
            className="w-8 h-8 rounded-full mr-3"
            src={
              chaterId?.groupAdmin?.photos[0]
                ? chaterId?.groupAdmin?.photos[0]?.url
                : chaterId?.groupAdmin?.defaultPhoto?.url
            }
            alt="pic"
          />
          {chaterId?.groupAdmin?.name === profile?.name
            ? "You"
            : chaterId?.groupAdmin?.name}{" "}
          <p className="ml-auto text-xs text-slate-700 bg-green-300 px-[2px] py-[2px] rounded">
            Group Admin
          </p>
        </span>
        {Array.isArray(chaterId.members) &&
          chaterId.members.map((member, index) => (
            <span
              key={index}
              className="ml-2 mb-2 flex items-center text-lg text-slate-800 capitalize"
            >
              <img
                className="w-8 h-8 rounded-full mr-3"
                src={
                  member?.photos[0]
                    ? member?.photos[0]?.url
                    : member?.defaultPhoto?.url
                }
                alt="pic"
              />
              {member?.name}
            </span>
          ))}
      </div>
    </div>
  );
};

export default ChatProfile;
