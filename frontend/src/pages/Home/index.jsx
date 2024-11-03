import { useSelector } from "react-redux";
import MessageContainer from "../../components/MessageContainer/index.jsx";
import Sidebar from "../../components/Sidebar/index.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const { authUser } = useSelector((store) => store.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 glassmorphism-effect">
        <Sidebar />
        <MessageContainer />
      </div>
    </>
  );
};

export default Home;
