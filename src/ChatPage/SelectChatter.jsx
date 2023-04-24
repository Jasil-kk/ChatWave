import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../Store";
import { MdOutlineAdd } from "react-icons/md";

const SelectChatter = () => {
  const [users, setUsers] = useState();
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState();
  const token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const handleShow = () => {
    axios
      .get(`${BaseUrl}/user/user-all`, config)

      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAdd = () => {
    axios
      .post(`${BaseUrl}/chat/user`, userId, config)
      
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const userList = users?.result;
  console.log(userList);

  return (
    <div className="">
      <button
        onClick={() => {
          handleShow();
          setShow(!show);
        }}
        className="w-auto h-10 px-5 bg-green-500 hover:bg-green-700 rounded-lg text-slate-50 transform transition-all duration-1000 ease-in-out"
      >
        Add a Chatter
      </button>
      {show && (
        <>
          {userList ? (
            <>
              {userList?.map((user, key) => (
                <ul
                  key={key}
                  className="w-52 h-auto border py-1 px-2 m-1 bg-slate-100 hover:bg-slate-300 rounded-md"
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
                      onClick={()=>{setUserId({...userId,userid:user?._id}); handleAdd();}}
                      className="ml-auto p-0.5 bg-slate-500 text-slate-50 rounded-full cursor-pointer"
                    >
                      <MdOutlineAdd />
                    </span>
                  </li>
                </ul>
              ))}
            </>
          ) : (
            <p className="text-xl text-red-500">No users Found </p>
          )}
        </>
      )}
    </div>
  );
};

export default SelectChatter;
