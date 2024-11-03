import { setOtherUsers } from "../redux/userSlice.js";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`${BASE_URL}/api/v1/user`);
        // store
        console.log("other users -> ", res);
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchOtherUsers();
  }, []);
};

export default useGetOtherUsers;
