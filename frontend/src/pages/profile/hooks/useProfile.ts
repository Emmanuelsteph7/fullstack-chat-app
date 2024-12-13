import React from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { getInitials } from "../../../utils/getInitials";
import { resolveFileReader } from "../../../utils/resolveFileReader";

const useProfile = () => {
  const { profileData, isUploadPictureLoading, updatePicture } = useAuthStore();

  const name = profileData?.name || "";
  const profilePic = profileData?.profilePic?.url || "";

  const initials = getInitials(name);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    resolveFileReader(file, async (base64String) => {
      await updatePicture({ profilePic: base64String });
    });
  };

  return {
    profilePic,
    name,
    profileData,
    isUploadPictureLoading,
    initials,
    handleUpload,
  };
};

export default useProfile;
