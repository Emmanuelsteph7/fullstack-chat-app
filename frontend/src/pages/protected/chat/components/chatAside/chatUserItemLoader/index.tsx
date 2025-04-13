const ChatUserItemLoader = () => {
  return (
    <button
      type="button"
      className="flex w-full justify-between hover:bg-primary/10 px-3 py-2 rounded-lg items-center"
    >
      <div className="skeleton h-[50px] w-[50px] rounded-full" />
      <div className="w-[calc(100%-55px)]">
        <div className="skeleton w-[80px] h-4 mb-2" />
        <div className="skeleton w-full h-4" />
      </div>
    </button>
  );
};

export default ChatUserItemLoader;
