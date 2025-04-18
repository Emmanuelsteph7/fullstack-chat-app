import Avatar from "../../../../../components/avatar";
import useProfile from "../../hooks/useProfile";
import { Camera } from "lucide-react";

const ProfileContent = () => {
  const {
    handleUpload,
    initials,
    isUploadPictureLoading,
    profilePic,
    name,
    profileData,
  } = useProfile();
  return (
    <div className="w-full max-w-[500px] mx-auto bg-base-300/60 rounded-lg px-6 py-6">
      <h2 className="text-center mb-1 text-[20px] lg:text-[24px] font-semibold">
        Profile
      </h2>
      <p className="text-center text-[14px] lg:text-[16px] mb-8">
        Your profile information
      </p>
      <div className="relative w-max mx-auto mb-4">
        <Avatar initials={initials} src={profilePic} size={100} textSize={55} />
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
        <h3 className="text-[18px] lg:text-[20px] mb-4 font-semibold">
          Account information
        </h3>
        <div className="flex py-2 border-b border-zinc-700 justify-between items-center">
          <p className="text-[14px] lg:text-[16px]">Full name</p>
          <p className="text-[14px] lg:text-[16px] font-medium">{name}</p>
        </div>
        <div className="flex py-2 border-b border-zinc-700 justify-between items-center">
          <p className="text-[14px] lg:text-[16px]">Email</p>
          <p className="text-[14px] lg:text-[16px] font-medium">
            {profileData?.email || ""}
          </p>
        </div>
        <div className="flex py-2 border-b border-zinc-700 justify-between items-center">
          <p className="text-[14px] lg:text-[16px]">Member since</p>
          <p className="text-[14px] lg:text-[16px] font-medium">
            {profileData?.createdAt?.split("T")[0] || ""}
          </p>
        </div>
        <div className="flex pt-2 justify-between items-center">
          <p className="text-[14px] lg:text-[16px]">Status</p>
          <p className="text-[14px] lg:text-[16px] text-green-500 font-medium">
            Active
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
