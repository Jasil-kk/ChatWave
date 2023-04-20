import React from 'react'
import Box from '@mui/material/Box';
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
  flexDirection: "column",
  alignItems:"center",
  gap: 2,
};
const GroupChatCrate = ({open,setOpen}) => {
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
            <h2 className="text-slate-800 text-2xl font-semibold">Create Group Chat</h2>
           <input type="text" className='w-full h-12 border-2 border-slate-200 rounded-lg pl-3 text-slate-800 outline-green-500' placeholder='Chat Name'/>
            <input type="text" className='w-full h-12 border-2 border-slate-200 rounded-lg pl-3 text-slate-800 outline-green-500' placeholder='Add Users eg: Iyad,Muhsin'/>
            <button className='ml-auto w-auto px-3 h-10 bg-green-500 text-slate-50 rounded-md'>Create Chat</button>
        </Box>
        
      </Modal>
    </div>
  )
}

export default GroupChatCrate