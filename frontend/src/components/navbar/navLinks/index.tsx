import { Link } from "react-router-dom";
import { Path } from "../../../navigations/routes";
import Avatar from "../../avatar";
import { LogOut, Menu, Settings, X } from "lucide-react";
import { useAuthStore } from "../../../store/useAuthStore";
import { getInitials } from "../../../utils/getInitials";
import { useState } from "react";
import cs from "classnames";

const NavLinks = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { isAuthenticated, logout, isLogoutLoading, profileData } =
    useAuthStore();

  const handleToggle = () => setIsOpen(!isOpen);

  const name = profileData?.name || "";
  const profilePic = profileData?.profilePic?.url || "";
  const initials = getInitials(name);

  return (
    <div>
      <div className="lg:hidden">
        <button
          onClick={handleToggle}
          className="px-2 border border-primary/40 focus:outline focus:outline-[2px] focus:outline-primary/50  py-2 rounded-xl"
        >
          {!isOpen && <Menu />}
          {isOpen && <X />}
        </button>
      </div>
      <div
        className={cs(
          "fixed duration-150 shadow-lg lg:shadow-none top-[67px] lg:static w-full max-w-[500px] lg:w-auto bg-base-100 lg:bg-transparent py-5 lg:py-0 flex flex-col lg:flex-row items-center gap-10",
          {
            "right-0": isOpen,
            "right-[-100%]": !isOpen,
          }
        )}
      >
        {isAuthenticated && (
          <Link
            to={Path.Profile}
            onClick={handleToggle}
            className="flex items-center gap-2 hover:opacity-80 w-max"
          >
            <Avatar initials={initials} src={profilePic} />
            <p className="text-[14px] font-medium">Profile</p>
          </Link>
        )}
        <Link
          to={Path.Settings}
          onClick={handleToggle}
          className="flex items-center gap-2 hover:opacity-80 hover:scale-105 duration-150 w-max"
        >
          <Settings size={25} />
          <p className="text-[14px] font-medium">Settings</p>
        </Link>
        {isAuthenticated && (
          <button
            onClick={logout}
            className="flex items-center gap-2 hover:opacity-80 w-max"
          >
            <LogOut size={25} />
            <p className="text-[14px] font-medium">
              {isLogoutLoading ? "Loading..." : "Logout"}
            </p>
          </button>
        )}
      </div>
    </div>
  );
};

export default NavLinks;
