import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../Store";
import { MdOutlineAdd } from "react-icons/md";

const SelectChatter = ({ setShowUsers,chaters, setChaters  }) => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  console.log(chaters);
  useEffect(() => {
    const fetchUsersAndChaters = async () => {
      try {
        const [usersResponse, chatersResponse] = await Promise.all([
          axios.get(`${BaseUrl}/user/user-all`, config),
          axios.get(`${BaseUrl}/chat/get`, config),
        ]);
        setUsers(usersResponse.data);
        setChaters(chatersResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsersAndChaters();
  }, []);
  
  const handleAdd = async (userId) => {
    try {
      await axios.post(`${BaseUrl}/chat/user`, { userid: userId }, config);
      const updatedChatersResponse = await axios.get(`${BaseUrl}/chat/get`, config);
      setChaters(updatedChatersResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const userList = users?.result;
  console.log(userList);

  const isUserInChatters = (userId) => {
    return chaters.some((chatter) =>
      chatter.users.some((user) => user._id === userId)
    );
  };

  return (
    <>
      <div className="w-72 h-screen overflow-y-auto overflow-x-hidden p-3 bg-slate-700 font-outfit">
        <h1 className="text-3xl text-center my-5 text-slate-50 font-semibold">
          Users
        </h1>
        {userList ? (
          <>
            {userList?.map((user, key) => {
              if (isUserInChatters(user._id)) {
                return null;
              }
              return (
                <ul
                  key={key}
                  className="w-full h-auto border py-1 px-2 m-1 bg-slate-100 hover:bg-slate-300 rounded-md"
                >
                  <li className="flex items-center gap-3">
                    <img
                      className="w-9 h-9 rounded-full"
                      src={
                        user?.photos[0]
                          ? user?.photos[0].url
                          : user?.defaultPhoto?.url
                      }
                      alt="profile"
                    />{" "}
                    <p className="text-base text-slate-800 capitalize">
                      {user?.name}
                    </p>
                    <span
                      onClick={() => {
                        handleAdd(user?._id);
                        setShowUsers(false);
                      }}
                      className="ml-auto p-0.5 bg-slate-500 text-slate-50 rounded-full cursor-pointer"
                    >
                      <MdOutlineAdd />
                    </span>
                  </li>
                </ul>
              );
            })}
          </>
        ) : (
          <p className="text-xl text-red-500">No users Found </p>
        )}
      </div>
      <div
        onClick={() => setShowUsers(false)}
        className="w-full h-screen bg-slate-900 fixed z-30 left-72 inset-0 opacity-30"
      ></div>
    </>
  );
};

export default SelectChatter;
