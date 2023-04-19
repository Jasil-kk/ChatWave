import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Profile from "../Components/Profile";

const Header = ({ profile }) => {
  const [show, setShow] = useState(false);
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
      setShow(false);
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

  return (
    <div className="w-full h-16 bg-slate-800 flex items-center pr-5 pl-10 fixed z-10">
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
      <h2 className="ml-10 text-slate-100 text-3xl font-semibold capitalize">
        {profile?.name}
      </h2>
      {show && (
        <Profile />
        // <div
        //   ref={ref}
        //   className="absolute top-16 left-28 w-96 h-auto p-5 flex items-center gap-5 drop-shadow-xl bg-slate-200 rounded-xl"
        // >
        //   <div className="bg-slate-50 w-36 h-36 rounded-full border-4 border-slate-300 overflow-hidden">
        //     {profile?.photos[0] ? (
        //       <img
        //         className="w-full h-full"
        //         src={profile?.photos[0]?.url}
        //         alt="profile"
        //       />
        //     ) : (
        //       <img
        //         className="w-full h-full"
        //         src={profile?.defaultPhoto?.url}
        //         alt="profile"
        //       />
        //     )}
        //   </div>
        //   <div>
        //     <h5 className="text-2xl text-slate-800 font-semibold ">
        //       {profile?.name}
        //     </h5>
        //   </div>
        // </div>
      )}
      {menuShow && (
        <div
          ref={ref}
          className="absolute top-12 right-8 w-40 h-auto flex flex-col gap-2 p-2 pt-5 bg-slate-50 rounded drop-shadow-lg"
        >
              <button
            onClick={() => setShow(true)}
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
