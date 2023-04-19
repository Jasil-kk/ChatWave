import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
  display: "flex",
  alignItems:"center",
  gap: 5,
};

const Profile = ({open,setOpen,profile}) => {

    const handleClose = () => setOpen(false);
  
  return (
 <div>
     <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
          <h5 className="text-2xl text-slate-800 font-semibold capitalize">
              {profile?.name}
            </h5>
        </Box>
      </Modal>
 </div>
  );
};

export default Profile;
