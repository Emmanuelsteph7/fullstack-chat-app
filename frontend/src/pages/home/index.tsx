import { useAuthStore } from "../../store/useAuthStore";
import { Navigate } from "react-router-dom";
import { Path } from "../../navigations/routes";

const Home = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to={Path.Chat} replace />;
  }

  return <Navigate to={Path.Login} replace />;
};

export default Home;
