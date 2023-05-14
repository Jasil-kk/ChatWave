import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { BaseUrl } from "../Store";
import GroupChatCreate from "../Components/GroupChatCreate";
import group from "../assets/group.svg";

const ChatersList = ({ chaters, setChaters, chaterId, setChaterId }) => {
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

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

  const handleOpen = () => setOpen(true);

  const updateChaters = (newChaters) => {
    setChaters(newChaters);
  };
  console.log("chats:", chaters);
  return (
    <div className="w-[450px] p-4 border border-slate-400 bg-slate-100 rounded-xl drop-shadow-lg">
      <button
        onClick={handleOpen}
        className="ml-auto mb-5 w-auto h-10 px-5 bg-green-500 hover:bg-green-700 text-slate-50 rounded-lg flex items-center transform transition-all duration-1000 ease-in-out"
      >
        New Chat{" "}
        <span className="text-slate-50 text-xl ml-2">
          <FiPlus />
        </span>
      </button>
      {open && (
        <GroupChatCreate
          open={open}
          setOpen={setOpen}
          chaters={chaters}
          setChaters={setChaters}
        />
      )}
      {chaters.length > 0 ? (
        <>
          <ul className="max-w-md divide-y divide-gray-300 dark:divide-gray-700">
            {chaters?.map((chater, key) => (
              <React.Fragment key={key}>
                <li
                  onClick={() =>
                    chater?.isGroupChat === false
                      ? setChaterId({
                          ...chaterId,
                          chatID: chater?._id,
                          id: chater?.users[0]?._id,
                          name: chater?.users[0]?.name,
                          photo: chater?.users[0]?.photos[0]
                            ? chater?.users[0]?.photos[0]?.url
                            : chater?.users[0]?.defaultPhoto?.url,
                            isGroupChat : chater?.isGroupChat
                        })
                      : setChaterId({
                          ...chaterId,
                          chatID: chater?._id,
                          id: chater?.users[0]?._id,
                          name: chater?.chatName,
                          photo: group,
                          groupAdmin:chater?.groupAdmin,
                          members: chater?.users,
                          isGroupChat : chater?.isGroupChat
                        })
                  }
                  className="py-3 sm:py-4 hover:bg-slate-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={
                          chater?.isGroupChat === false
                            ? chater?.users[0]?.photos[0]
                              ? chater?.users[0]?.photos[0]?.url
                              : chater?.users[0]?.defaultPhoto?.url
                            : group
                        }
                        alt="chater"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate capitalize dark:text-gray  -900">
                        {chater?.chatName === "sender"
                          ? chater?.users[0]?.name
                          : chater?.chatName}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {chater?.isGroupChat === false
                          ? chater?.latestMessage?.content
                          : `${chater?.latestMessage?.sender?.name}: ${chater?.latestMessage?.content}`}
                      </p>
                    </div>
                  </div>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-red-500 text-xl">No users Selected</p>
      )}
    </div>
  );
};

export default ChatersList;
