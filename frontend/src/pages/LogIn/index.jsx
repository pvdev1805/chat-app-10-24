import { Link } from "react-router-dom";

const LogIn = () => {
  return (
    <>
      <div className="min-w-96 mx-auto">
        <div className="p-6 w-full rounded-lg shadow-md bg-gray-400 glassmorphism-effect">
          <h2 className="text-3xl font-bold text-center">Login</h2>

          <form>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Username:</span>
              </label>
              <input
                className="w-full input input-bordered h-10"
                type="text"
                placeholder="Username"
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
