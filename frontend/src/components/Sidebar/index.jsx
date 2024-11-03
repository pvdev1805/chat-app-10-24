import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from "../OtherUsers/index.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  setAuthUser,
  setOtherUsers,
  setSelectedUser,
} from "../../redux/userSlice.js";
import { setMessages } from "../../redux/messageSlice.js";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const { otherUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/user/logout`);
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
      dispatch(setMessages(null));
      dispatch(setOtherUsers(null));
      dispatch(setSelectedUser(null));
    } catch (error) {
      console.log(error);
    }
  };
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const conversationUser = otherUsers?.find((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversationUser) {
      dispatch(setOtherUsers([conversationUser]));
    } else {
      toast.error("User not found!");
    }
  };

  return (
    <>
      <div className="border-r border-slate-500 p-4 flex flex-col">
        <form
          onSubmit={searchSubmitHandler}
          action=""
          className="flex items-center gap-2"
        >
          <input
            type="text"
            className="input input-bordered rounded-md"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="submit" className="btn bg-zinc-700 text-white">
            <BiSearchAlt2 className="w-6 h-6 outline-none" />
          </button>
        </form>

        <div className="divider px-3"></div>
        <OtherUsers />
        <div className="mt-2">
          <button onClick={logoutHandler} className="btn btn-sm">
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
