import { useEffect, useState } from "react";
import EmojiIcon from "../../../../../../assets/svgs/emoji.svg?react";
import cs from "classnames";

interface Props {
  isSender: boolean;
  handleEmojiUpdate: (emoji: string) => Promise<void>;
}

const emojis = ["✅", "👍", "👀", "😂"];

const MiniEmojiPicker = ({ isSender, handleEmojiUpdate }: Props) => {
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

  const handleEmoji = async (emoji: string) => {
    await handleEmojiUpdate(emoji);
    handleClose();
  };

  return (
    <div
      className={cs("absolute top-[50%] translate-y-[-50%]", {
        "left-[-25px]": isSender,
        "right-[-25px]": !isSender,
      })}
    >
      <div className="relative">
        <button type="button" onClick={handleToggle}>
          <EmojiIcon className="w-[20px] h-[20px] text-base-content" />
        </button>
        {isOpen && (
          <div className="absolute bottom-[calc(100%+6px)] left-[50%] translate-x-[-50%] flex items-center gap-3 bg-primary-content rounded-lg py-1 px-3">
            {emojis.map((item) => (
              <button onClick={() => handleEmoji(item)} key={item}>
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniEmojiPicker;
