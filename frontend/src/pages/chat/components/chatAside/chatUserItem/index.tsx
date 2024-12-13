import { useSearchParams } from "react-router-dom";
import Avatar from "../../../../../components/avatar";
import { useChatStore } from "../../../../../store/useChatStore";
import { Api } from "../../../../../types";
import { getInitials } from "../../../../../utils/getInitials";
import cs from "classnames";

interface Props {
  user: Api.General.User;
}

export const CHAT_QUERY_KEY = "id";

const ChatUserItem = ({ user }: Props) => {
  const { name, profilePic, _id } = user;

  const [searchParams, setSearchParams] = useSearchParams();
  const { handleSelectedUser, selectedUser } = useChatStore();

  const handleClick = () => {
    handleSelectedUser(user);
    searchParams.set(CHAT_QUERY_KEY, user._id);
    setSearchParams(searchParams);
  };

  const initials = getInitials(name);
  const isSelected = _id === selectedUser?._id;

  const msg = "This is a message from john doe about the football match";
  return (
    <button
      type="button"
      onClick={handleClick}
      className={cs(
        "flex w-full justify-between focus:outline-2 focus:outline-primary px-3 py-2 rounded-lg items-center",
        {
          "bg-primary/10 hover:bg-primary/10": isSelected,
          "hover:bg-primary/5": !isSelected,
        }
      )}
    >
      <Avatar
        initials={initials}
        size={50}
        textSize={25}
        src={profilePic?.url || ""}
      />
      <div className="w-[calc(100%-60px)]">
        <h6 className="font-semibold text-[16px] text-left capitalize">
          {name}
        </h6>
        <p className="truncate text-[12px] w-full text-left" title={msg}>
          {msg}
        </p>
      </div>
    </button>
  );
};

export default ChatUserItem;
