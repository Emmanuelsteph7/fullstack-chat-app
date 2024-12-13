import { MessageSquare } from "lucide-react";
import cs from "classnames";

interface Props {
  variant?: "fixed" | "normal";
  show?: boolean;
  showBg?: boolean;
}

const Loader = ({ variant = "normal", show, showBg }: Props) => {
  return (
    <div
      className={cs(
        "flex duration-[2s] z-20 items-center flex-col justify-center",
        {
          "fixed left-0 w-full h-screen": variant === "fixed",
          "top-0": show,
          "top-[-2000px]": !show,
          "bg-base-100": showBg,
        }
      )}
    >
      <div className="w-[50px] h-[50px] rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
        <MessageSquare className="text-primary animate-pulse" />
      </div>
      <span className="loading loading-dots bg-primary loading-lg"></span>
    </div>
  );
};

export default Loader;
