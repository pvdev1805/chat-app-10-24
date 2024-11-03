import axios from "axios";
import { setMessages } from "../redux/messageSlice.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetMessages = () => {
  const { selectedUser } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `${BASE_URL}/api/v1/message/${selectedUser?._id}`
        );
        dispatch(setMessages(res.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();
  }, [selectedUser?._id, setMessages]);
};

export default useGetMessages;
