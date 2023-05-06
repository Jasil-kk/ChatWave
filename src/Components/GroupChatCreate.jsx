import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { BaseUrl } from "../Store";
import UsersList from "./UsersList";
import { RxCrossCircled } from "react-icons/rx";

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
  gap: 2,
};
const GroupChatCreate = ({ open, setOpen }) => {
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);
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
            className="w-full h-12 border-2 border-slate-200 rounded-lg pl-3 text-slate-800 outline-green-500"
            placeholder="Chat Name"
          />
          <div className="w-full h-auto p-1 flex flex-wrap gap-2">
            <div className="w-auto flex gap-2 items-center pl-3 pr-1 py-1 bg-slate-700 text-slate-50 rounded-sm">
              jasil{" "}
              <span className="ml-auto text-lg text-slate-50 cursor-pointer">
                <RxCrossCircled />
              </span>
            </div>
            <div className="w-auto flex gap-2 items-center pl-3 pr-1 py-1 bg-slate-700 text-slate-50 rounded-sm">
              jasil{" "}
              <span className="ml-auto text-lg text-slate-50 cursor-pointer">
                <RxCrossCircled />
              </span>
            </div>
            <div className="w-auto flex gap-2 items-center pl-3 pr-1 py-1 bg-slate-700 text-slate-50 rounded-sm">
              jasil{" "}
              <span className="ml-auto text-lg text-slate-50 cursor-pointer">
                <RxCrossCircled />
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              handleOpen();
              handleUsers();
            }}
            className="mr-auto w-auto px-3 h-10 bg-blue-500 rounded-lg text-slate-50 hover:bg-blue-600 transform transition-all duration-500 ease-in-out"
          >
            Add Users
          </button>
          <UsersList show={show} setShow={setShow} userList={userList} />
          <button className="ml-auto w-auto px-3 h-10 bg-green-500 hover:bg-green-600 text-slate-50 rounded-md">
            Create Chat
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default GroupChatCreate;
