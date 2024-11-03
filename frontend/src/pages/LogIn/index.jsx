import { setAuthUser } from "../../redux/userSlice.js";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      navigate("/");

      console.log(res);

      dispatch(setAuthUser(res.data));
    } catch (error) {
      console.log("Error! Something went wrong with onSubmitHandler in Login!");
      toast.error(error.response.data.message);
      console.log(error);
    }

    setUser({
      username: "",
      password: "",
    });
  };

  return (
    <>
      <div className="min-w-96 mx-auto">
        <div className="p-6 w-full rounded-lg shadow-md bg-gray-400 glassmorphism-effect">
          <h2 className="text-3xl font-bold text-center">Login</h2>

          <form onSubmit={onSubmitHandler} action="">
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Username:</span>
              </label>
              <input
                className="w-full input input-bordered h-10"
                type="text"
                placeholder="Username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text">Password:</span>
              </label>
              <input
                className="w-full input input-bordered h-10"
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>

            <p className="text-center my-2">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>

            <button
              className="btn btn-block btn-sm mt-2 border border-slate-700"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LogIn;
