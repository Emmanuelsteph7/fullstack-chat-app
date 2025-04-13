import { Search } from "lucide-react";
import FormInput from "../../../../../../components/formInput";

const ChatUserSearch = () => {
  return (
    <div>
      <FormInput
        placeholder="Search user..."
        icon={<Search size={16} />}
        type="search"
      />
    </div>
  );
};

export default ChatUserSearch;
