import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { BaseUrl } from "../Store";
import GroupChatCreate from "../Components/GroupChatCreate";

const ChatersList = () => {
  const [open, setOpen] = useState(false);
  const [chaters, setChaters] = useState([]);
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

console.log(chaters);
  const handleOpen = () => setOpen(true);
  return (
    <div className="w-[450px] p-4 border border-slate-400 bg-slate-100 rounded-xl drop-shadow-lg">
      <button onClick={handleOpen} className="ml-auto mb-5 w-auto h-10 px-5 bg-green-500 hover:bg-green-700 text-slate-50 rounded-lg flex items-center transform transition-all duration-1000 ease-in-out">
        New Chat{" "}
        <span className="text-slate-50 text-xl ml-2">
          <FiPlus />
        </span>
      </button>
      {open && <GroupChatCreate  open={open} setOpen={setOpen}/>}
      {chaters.length > 0 ? (
        <>
          <ul className="max-w-md divide-y divide-gray-300 dark:divide-gray-700">
            {chaters?.map((chater, key) => (
               <React.Fragment key={key}>
                {chater.users?.map((user, key) => (
                  <li key={key} className="py-3 sm:py-4 hover:bg-slate-200">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="w-8 h-8 rounded-full"
                          src={
                            user?.photos[0]
                              ? user?.photos[0]?.url
                              : user?.defaultPhoto?.url
                          }
                          alt="chater"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate capitalize dark:text-white">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          email@flowbite.com
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
                </React.Fragment>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-red-500 text-xl">No chats Selected</p>
      )}
    </div>
  );
};

export default ChatersList;
