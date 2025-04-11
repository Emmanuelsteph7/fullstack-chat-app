import cs from "classnames";
import { getInitials } from "../../../../../../utils/getInitials";
import Avatar from "../../../../../../components/avatar";
import { IUsersWithMessages } from "../../../../../../store/useChatStore";
import Button from "../../../../../../components/button";
import CheckIcon from "../../../../../../assets/svgs/check.svg?react";

interface Props {
  usersWithMessages: IUsersWithMessages[];
  selectedUsers: IUsersWithMessages[];
  handleToggleSelectedUsers: (user: IUsersWithMessages) => void;
  isLoading: boolean;
  handleForwardMessage: () => void;
}

const ForwardMessageContent = ({
  usersWithMessages,
  selectedUsers,
  handleToggleSelectedUsers,
  handleForwardMessage,
  isLoading,
}: Props) => {
  return (
    <>
      <h3 className="text-[24px] text-base-content font-semibold text-center">
        Forward Message
      </h3>
      <div className="overflow-y-auto my-3 max-h-[300px]">
        {usersWithMessages.map((user) => {
          const initials = getInitials(user.name);
          const isSelected = selectedUsers.find(
            (item) => item._id === user._id
          );
          return (
            <button
              key={user._id}
              onClick={() => handleToggleSelectedUsers(user)}
              className={cs(
                "text-base-content hover:bg-base-content/10 rounded-lg px-5 flex items-center justify-between gap-2 w-full py-3",
                {
                  "bg-base-content/5": isSelected,
                }
              )}
            >
              <div className="flex items-center gap-3">
                <Avatar initials={initials} src={user.profilePic?.url || ""} />
                <div>
                  <h4>{user.name}</h4>
                </div>
              </div>
              <div
                className={cs(
                  "w-[20px] h-[20px] flex items-center justify-center border border-base-content rounded-full",
                  {
                    "bg-base-content": isSelected,
                  }
                )}
              >
                {isSelected && <CheckIcon className="text-primary-content" />}
              </div>
            </button>
          );
        })}
      </div>
      <div className="flex justify-end">
        <Button
          onClick={handleForwardMessage}
          loading={isLoading}
          label="Forward"
        />
      </div>
    </>
  );
};

export default ForwardMessageContent;
