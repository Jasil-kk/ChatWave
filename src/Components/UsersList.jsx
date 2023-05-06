import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { map } from "lodash";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
  paddingX: 3,
  gap: 2,
  textAlign: "center",
};
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const UsersList = ({ show, setShow, userList, onAddSelectedUsers }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const handleClose = () => {
    setShow(false);
  };
  const handleUserSelect = (user) => {
    const isSelected = selectedUsers.includes(user);
    if (isSelected) {
      setSelectedUsers(
        selectedUsers.filter((selectedUser) => selectedUser !== user)
      );
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleAddSelectedUsers = () => {
    onAddSelectedUsers(selectedUsers);
    setSelectedUsers([]);
    handleClose();
  };

  return (
    <div>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-slate-800 text-lg font-semibold">Select User</h2>
          {map(userList, (user, key) => (
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
                  checked={selectedUsers.includes(user)}
                  onChange={() => handleUserSelect(user)}
                  sx={{ marginLeft: "auto" }}
                />
              </li>
            </ul>
          ))}
          <button
            onClick={handleAddSelectedUsers}
            className="mt-3 w-auto px-3 py-1 rounded-md bg-blue-500 text-slate-50 hover:bg-blue-600 transform transition-all duration-500 ease-in-out"
          >
            Add Selected Users
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default UsersList;
