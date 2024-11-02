import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/register`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(
        "Error! Something went wrong about onSubmitHandler in SignUp!"
      );
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-w-96 mx-auto">
        <div className="p-6 w-full rounded-lg shadow-md bg-gray-400 glassmorphism-effect">
          <h2 className="text-3xl font-bold text-center">Sign Up</h2>

          <form onSubmit={onSubmitHandler} action="">
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Full Name:</span>
              </label>
              <input
                className="w-full input input-bordered h-10"
                type="text"
                placeholder="e.g.: John Smith"
                onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              />
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text">Username:</span>
              </label>
              <input
                className="w-full input input-bordered h-10"
                type="text"
                placeholder="e.g.: johnsmith123"
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
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text">Confirm Password:</span>
              </label>
              <input
                className="w-full input input-bordered h-10"
                type="password"
                placeholder="Confirm Password"
                onChange={(e) =>
                  setUser({ ...user, confirmPassword: e.target.value })
                }
              />
            </div>

            <div className="flex items-center my-4">
              <div className="flex items-center">
                <p>Male</p>
                <input
                  className="checkbox mx-2"
                  type="checkbox"
                  checked={user.gender === "male"}
                  onChange={() => handleCheckbox("male")}
                  defaultChecked
                />
              </div>
              <div className="flex items-center">
                <p>Female</p>
                <input
                  className="checkbox mx-2"
                  type="checkbox"
                  checked={user.gender === "female"}
                  onChange={() => handleCheckbox("female")}
                  defaultChecked
                />
              </div>
            </div>

            <p className="text-center my-2">
              Already have an account? <Link to="/login">Login</Link>
            </p>

            <button
              className="btn btn-block btn-sm mt-2 border border-slate-700"
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
