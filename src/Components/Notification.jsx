import React, { useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import {TbSquareRoundedFilled} from "react-icons/tb"
import { map } from "lodash";

const Notification = ({ notification,chaterId }) => {
  const [show, setshow] = useState(false);
  return (
    <div className="pr-5 relative w-full flex">
      <span
        onClick={() => setshow(!show)}
        className="ml-auto text-slate-800 text-3xl cursor-pointer relative"
      >
        <IoIosNotifications />
        {notification.length > 0 &&
        <span className="absolute top-1 right-1 w-[10px] h-[10px] rounded-full bg-red-500 text-slate-50 text-sm"></span>}
      </span>
      
      {show && (
        <div className="absolute top-6 right-3 w-auto bg-slate-50 p-3 rounded-lg border border-slate-500">
          {notification.length > 0 ? (
            <>
              {map(notification, (notif, index) => (
                <p key={index}>
                  New message from <strong> {notif?.sender?.name}</strong>
                </p>
              ))}
            </>
          ) : (
            <p className="text-slate-800">No new messages</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
