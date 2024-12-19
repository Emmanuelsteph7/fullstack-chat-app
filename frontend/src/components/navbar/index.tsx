import { MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Path } from "../../navigations/routes";
import { useAuthStore } from "../../store/useAuthStore";
import Container from "../container";
import NavLinks from "./navLinks";

const Navbar = () => {
  const { isAuthenticated } = useAuthStore();

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
        <NavLinks />
      </Container>
    </div>
  );
};

export default Navbar;
