import Container from "../../../components/container";
import ProfileContent from "./components/profileContent";

const Profile = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <Container>
        <ProfileContent />
      </Container>
    </div>
  );
};

export default Profile;
