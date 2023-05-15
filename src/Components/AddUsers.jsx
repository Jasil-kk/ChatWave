import { Avatar, Checkbox } from "@mui/material";
import axios from "axios";
import { differenceBy, map } from "lodash";
import React, { useEffect, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { BaseUrl } from "../Store";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const AddUsers = ({ show, setShow, users,config,chaterId,setChaterId }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [nonMembers, setNonMembers] = useState([]);

  useEffect(() => {
    const nonMembersList = differenceBy(users, chaterId?.members, "_id");
    setNonMembers(nonMembersList);
  }, [users, chaterId]);

  const handleCheckboxChange = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };
  const handleClose = () => {
    setShow(false)
  }
  const handleAddUser = () => {
    axios.put(`${BaseUrl}/chat/group/user/add`,{userid:selectedUsers,chatId:chaterId?.chatID},config).then((response)=>{
      console.log(response.data);
      handleClose();
    })
  }
  console.log(selectedUsers);
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-sm">
      <div className="bg-white flex flex-col rounded-lg p-8 w-72 relative">
        <span
          onClick={handleClose}
          className="absolute top-1 right-1 text-2xl cursor-pointer"
        >
          <RxCrossCircled />
        </span>
        {map(nonMembers, (user, key) => (
          <ul key={key} className="mt-2">
            <li className="w-full h-auto pl-2 rounded-lg bg-slate-200 flex items-center text-slate-800">
              <Avatar
                sx={{ width: "30px", height: "30px", marginRight: "15px" }}
                alt="profile"
                src={
                  user?.photos[0]
                    ? user?.photos[0].url
                    : user?.defaultPhoto?.url
                }
              />
              {user?.name}
              <Checkbox
                {...label}
                checked={selectedUsers.includes(user?._id)}
                onChange={() => handleCheckboxChange(user?._id)}
                sx={{ marginLeft: "auto" }}
              />
            </li>
          </ul>
        ))}
        <button onClick={handleAddUser} className="ml-auto mt-3 w-auto h-8 rounded bg-green-500 text-slate-100 px-2">
          Add User
        </button>
      </div>
    </div>
  );
};

export default AddUsers;
