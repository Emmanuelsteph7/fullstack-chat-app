import Container from "../../components/container";
import Avatar from "../../components/avatar";
import { Camera } from "lucide-react";
import useProfile from "./hooks/useProfile";

const Profile = () => {
  const {
    handleUpload,
    initials,
    isUploadPictureLoading,
    profilePic,
    name,
    profileData,
  } = useProfile();
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <Container>
        <div className="w-full max-w-[500px] mx-auto bg-base-300 rounded-lg px-6 py-6">
          <h2 className="text-center mb-1 text-[24px] font-semibold">
            Profile
          </h2>
          <p className="text-center mb-8">Your profile information</p>
          <div className="relative w-max mx-auto mb-4">
            <Avatar
              initials={initials}
              src={profilePic}
              size={100}
              textSize={55}
            />
            <label className="absolute cursor-pointer hover:opacity-90 right-0 bottom-0 w-[35px] h-[35px] rounded-full bg-base-content flex items-center justify-center">
              <Camera size={20} className="text-base-200" />
              <input
                type="file"
                onChange={handleUpload}
                accept="image/*"
                className="hidden"
                disabled={isUploadPictureLoading}
              />
            </label>
          </div>
          <p className="text-center text-[12px]">
            {isUploadPictureLoading
              ? "Uploading picture"
              : "Click the camera icon to update your photo"}
          </p>
          <div className="mt-8">
            <h3 className="text-[20px] mb-4 font-semibold">
              Account information
            </h3>
            <div className="flex py-2 border-b border-zinc-700 justify-between items-center">
              <p>Full name</p>
              <p className="font-medium">{name}</p>
            </div>
            <div className="flex py-2 border-b border-zinc-700 justify-between items-center">
              <p>Email</p>
              <p className="font-medium">{profileData?.email || ""}</p>
            </div>
            <div className="flex py-2 border-b border-zinc-700 justify-between items-center">
              <p>Member since</p>
              <p className="font-medium">
                {profileData?.createdAt?.split("T")[0] || ""}
              </p>
            </div>
            <div className="flex pt-2 justify-between items-center">
              <p>Status</p>
              <p className="text-green-500 font-medium">Active</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Profile;
