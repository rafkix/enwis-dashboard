import { useState, useEffect } from "react";
import { getMyProfileAPI, updateProfileAPI, uploadAvatarAPI } from "@/lib/api/user";
import { toast } from "sonner";

export const useProfile = () => {
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await getMyProfileAPI();
      setUserData(res.data);
    } catch (error) {
      toast.error("Could not load profile");
    } finally {
      setIsLoading(false);
    }
  };

  const updateInfo = async (values: { full_name: string }) => {
    setIsSaving(true);
    try {
      const res = await updateProfileAPI(values);
      setUserData(res.data);
      toast.success("Profile updated successfully");
      return res.data;
    } catch (error) {
      toast.error("Failed to update profile");
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const updateAvatar = async (file: File) => {
    try {
      const res = await uploadAvatarAPI(file);
      setUserData(res.data);
      toast.success("Photo updated");
    } catch (error) {
      toast.error("Upload failed");
    }
  };

  useEffect(() => { fetchProfile(); }, []);

  return { userData, setUserData, isLoading, isSaving, updateInfo, updateAvatar };
};