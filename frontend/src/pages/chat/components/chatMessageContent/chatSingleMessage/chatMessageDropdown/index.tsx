import { useEffect, useState } from "react";
import ArrowCaretDownIcon from "../../../../../../assets/svgs/arrow-caret-down.svg?react";
import cs from "classnames";
import EditMessage from "../editMessage";
import { Api } from "../../../../../../types";

interface Props {
  isSender: boolean;
  message: Api.General.Message;
  handleDeleteMessage: () => void;
}

const ChatMessageDropdown = ({
  isSender,
  handleDeleteMessage,
  message,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEscape = (event: any) => {
      if (event.key === "Escape") {
        handleClose(); // Call the function when Escape is pressed
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape); // Cleanup
  }, []);

  const handleToggle = () => setIsOpen((prev) => !prev);
  const handleClose = () => setIsOpen(false);

  return (
    <div
      className={cs("absolute z-10 top-[50%] translate-y-[-50%]", {
        "right-[-25px]": isSender,
        "left-[-25px]": !isSender,
      })}
    >
      <div className="relative z-10">
        <button onClick={handleToggle}>
          <ArrowCaretDownIcon className="text-base" />
        </button>
        {isOpen && (
          <div
            className={cs(
              "absolute z-10 top-[-10px] !bg-black text-white text-[12px] text-center rounded-lg px-3 py-2",
              {
                "right-[calc(100%+10px)]": isSender,
                "left-[calc(100%+10px)]": !isSender,
              }
            )}
          >
            <EditMessage message={message} />
            <button type="button" onClick={handleDeleteMessage}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessageDropdown;
