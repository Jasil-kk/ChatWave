import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Profile from "../Components/Profile";

const Header = ({ profile }) => {
  const [open, setOpen] = useState(false);
  const [menuShow, setMenuShow] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setMenuShow(false);
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post("http://192.168.43.209:4001/auth/user-logout")
      .then((response) => {
        console.log(response.data);
        localStorage.removeItem("token");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOpen = () => setOpen(true);

  return (
    <div className="w-full h-16 bg-slate-800 flex items-center px-10 fixed z-10">
      <h1 className="text-xl text-slate-50 font-semibold">Chat app</h1>
      <div
        onClick={() => setMenuShow(true)}
        className="w-12 h-12 ml-auto rounded-full bg-slate-300 border-2 border-slate-50 text-slate-500 cursor-pointer overflow-hidden"
      >
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
      {open && <Profile open={open} setOpen={setOpen} profile={profile} />}
      {menuShow && (
        <div
          ref={ref}
          className="absolute top-12 right-8 w-40 h-auto flex flex-col gap-2 p-2 pt-5 bg-slate-50 rounded drop-shadow-lg"
        >
          <button
            onClick={handleOpen}
            className="w-full h-8 text-slate-500 border-2 border-slate-200 rounded-md hover:bg-slate-400 hover:text-slate-50 flex items-center justify-center gap-3"
          >
            My Profile
          </button>
          <button
            onClick={handleLogout}
            className="w-full h-8 text-red-500 border-2 border-red-200 rounded-md hover:bg-red-400 hover:text-slate-50 flex items-center justify-center gap-3"
          >
            <span className="-ml-2 text-xl">
              <HiOutlineLogout />
            </span>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
