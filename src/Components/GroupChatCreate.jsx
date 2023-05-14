import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { BaseUrl } from "../Store";
import UsersList from "./UsersList";
import { RxCrossCircled } from "react-icons/rx";
import { map } from "lodash";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const GroupChatCreate = ({ open, setOpen,chaters, setChaters }) => {
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName,setGroupName] = useState("");
  const handleClose = () => setOpen(false);

  const token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleUsers = () => {
    axios.get(`${BaseUrl}/user/user-all`, config).then((response) => {
      setUsers(response.data);
    });
  };
  const userList = users?.result;
  const handleOpen = () => setShow(true);

  const handleAddSelectedUsers = (users) => {
    setSelectedUsers(users);
  };
  const handleRemoveUser = (index) => {
    const updatedSelectedUsers = [...selectedUsers];
    updatedSelectedUsers.splice(index, 1);
    setSelectedUsers(updatedSelectedUsers);
  };

const handleCreateGroup = () => {
  const userIds = selectedUsers.map(user => user._id);
  axios.post(`${BaseUrl}/chat/group/create`,{users:userIds,name:groupName},config).then((response) => {
    setChaters([...chaters,response.data]);
   handleClose();
  });
}  
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-slate-800 text-2xl font-semibold">
            Create Group Chat
          </h2>
          <input
            type="text"
            className="mt-4 w-full h-12 border-2 border-slate-200 rounded-lg pl-3 text-slate-800 outline-green-500"
            placeholder="Chat Name"
            onChange={(e)=> setGroupName(e.target.value)}
          />

          <div  className="mt-2 mb-1 w-full h-auto p-1 flex flex-wrap gap-2">
            {map(selectedUsers, (users, index) => (
              <div key={index} className="w-auto flex gap-2 items-center pl-3 pr-1 py-1 bg-slate-700 text-slate-50 rounded-sm">
                {users?.name}
                <span onClick={() => handleRemoveUser(index)} className="ml-auto text-lg text-slate-50 cursor-pointer">
                  <RxCrossCircled />
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              handleOpen();
              handleUsers();
            }}
            className="mr-auto mt-1 w-auto px-3 h-10 bg-blue-500 rounded-lg text-slate-50 hover:bg-blue-600 transform transition-all duration-500 ease-in-out"
          >
            Select Users
          </button>
          <UsersList
            show={show}
            setShow={setShow}
            userList={userList}
            onAddSelectedUsers={handleAddSelectedUsers}
          />
          <button onClick={handleCreateGroup} className="ml-auto w-auto px-3 h-10 bg-green-500 hover:bg-green-600 text-slate-50 rounded-md">
            Create Chat
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default GroupChatCreate;
