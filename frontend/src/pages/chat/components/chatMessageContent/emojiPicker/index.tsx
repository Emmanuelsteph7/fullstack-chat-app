import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import EmojiIcon from "../../../../../assets/svgs/emoji.svg?react";
import { useEffect, useState } from "react";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleEmojiSelect: (data: any) => void;
}

const EmojiPicker = ({ handleEmojiSelect }: Props) => {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEmoji = (data: any) => {
    handleEmojiSelect(data);
    handleClose();
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleToggle}
        className="w-[25px] h-[25px] flex items-center justify-center rounded-full border border-primary/30"
      >
        <EmojiIcon className="w-[25px] h-[25px]" />
      </button>
      {isOpen && (
        <div
          onBlur={handleClose}
          className="absolute z-10 bottom-[calc(100%+5px)] right-0"
        >
          <Picker
            data={data}
            showPreview={false}
            showSkinTones={false}
            onEmojiSelect={handleEmoji}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;
