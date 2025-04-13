import Container from "../../../components/container";
import ChatContent from "./components/chatContent";

const Chat = () => {
  return (
    <div className="pt-20 pb-5 min-h-screen">
      <Container>
        <ChatContent />
      </Container>
    </div>
  );
};

export default Chat;
