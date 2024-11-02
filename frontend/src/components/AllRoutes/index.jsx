import { routes } from "../../routes/routes.jsx";
import { useRoutes } from "react-router-dom";

const AllRoutes = () => {
  const elements = useRoutes(routes);

  return <>{elements}</>;
};

export default AllRoutes;
