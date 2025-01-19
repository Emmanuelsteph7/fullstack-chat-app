import Avatar from "../../../../../components/avatar";
import { Api } from "../../../../../types";
import cs from "classnames";
import useChatUserItem from "../../../hooks/useChatUserItem";

interface Props {
  user: Api.General.User;
}

const ChatUserItem = ({ user }: Props) => {
  const {
    handleClick,
    initials,
    isOnline,
    isSelected,
    isUserTyping,
    profilePic,
    displayedMessage,
    name,
    areMessagesLoading,
    unreadMessagesCount,
  } = useChatUserItem({ user });

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cs(
        "flex w-full justify-between focus:outline-2 gap-2 border-b border-primary/10 focus:outline-primary px-3 py-2 rounded-lg items-center",
        {
          "bg-primary/10 hover:bg-primary/10": isSelected,
          "hover:bg-primary/5": !isSelected,
        }
      )}
    >
      <div className="relative">
        <Avatar
          initials={initials}
          size={40}
          textSize={20}
          src={profilePic?.url || ""}
        />
        {isOnline && (
          <div className="absolute bottom-0 right-0 bg-success w-3 h-3 rounded-full" />
        )}
      </div>
      <div
        className={cs({
          "w-[calc(100%-91px)]": !!unreadMessagesCount,
          "w-[calc(100%-56px)]": !unreadMessagesCount,
        })}
      >
        <h6 className="font-semibold text-[16px] text-left capitalize">
          {name}
        </h6>
        <div
          className="truncate text-[12px] w-full text-left"
          title={displayedMessage}
        >
          {areMessagesLoading && (
            <div className="skeleton w-full max-w-[100px] h-4 rounded" />
          )}
          {!areMessagesLoading && (
            <>
              {isUserTyping && <span className="text-primary">Typing...</span>}
              {!isUserTyping && displayedMessage}
            </>
          )}
        </div>
      </div>
      <div>
        <div
          className={cs({
            "w-[35px] flex justify-end": !!unreadMessagesCount,
          })}
        >
          {unreadMessagesCount ? (
            <p className="w-max px-2 text-[12px] h-6 flex justify-center items-center bg-primary rounded-full text-primary-content">
              <span className="relative top-[0px]">{unreadMessagesCount}</span>
            </p>
          ) : null}
        </div>
      </div>
    </button>
  );
};

export default ChatUserItem;
