import { LogOut, MessageSquare, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Path } from "../../navigations/routes";
import { useAuthStore } from "../../store/useAuthStore";
import Avatar from "../avatar";
import { getInitials } from "../../utils/getInitials";
import Container from "../container";

const Navbar = () => {
  const { isAuthenticated, logout, isLogoutLoading, profileData } =
    useAuthStore();

  const name = profileData?.name || "";
  const profilePic = profileData?.profilePic?.url || "";

  const initials = getInitials(name);

  const homePath = isAuthenticated ? Path.Chat : Path.Login;

  return (
    <div className="fixed w-full top-0 left-0 bg-base-100 lg:bg-transparent py-3 z-10">
      <Container
        variant="fluid"
        className="flex items-center justify-between mx-auto"
      >
        <Link
          to={homePath}
          className="flex items-center gap-2 hover:opacity-80 w-max"
        >
          <div className="w-[40px] h-[40px] rounded-lg bg-primary/10 flex justify-center items-center">
            <MessageSquare className="text-primary" />
          </div>
          <h1 className="font-semibold">Eming Chat</h1>
        </Link>
        <div className="flex items-center gap-10">
          {isAuthenticated && (
            <Link
              to={Path.Profile}
              className="flex items-center gap-2 hover:opacity-80 w-max"
            >
              <Avatar initials={initials} src={profilePic} />
              <p className="text-[14px]">Profile</p>
            </Link>
          )}
          <Link
            to={Path.Settings}
            className="flex items-center gap-2 hover:opacity-80 hover:scale-105 duration-150 w-max"
          >
            <Settings size={16} />
            <p className="text-[14px] font-medium">Settings</p>
          </Link>
          {isAuthenticated && (
            <button
              onClick={logout}
              className="flex items-center gap-2 hover:opacity-80 w-max"
            >
              <LogOut size={16} />
              <p className="text-[14px]">
                {isLogoutLoading ? "Loading..." : "Logout"}
              </p>
            </button>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
