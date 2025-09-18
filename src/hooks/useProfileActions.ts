import { updateProfile } from "firebase/auth";
import { useState } from "react";
import { useUser } from "reactfire";

const useProfileActions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: user } = useUser();

  const updateUserProfile = async (data: {
    displayName?: string;
    photoURL?: string;
  }) => {
    if (!user) {
      throw new Error("User is not authenticated");
    }

    setIsLoading(true);

    try {
      await updateProfile(user, {
        displayName: data.displayName || user.displayName,
        photoURL: data.photoURL || user.photoURL,
      });

      return {
        success: true,
      };
    } catch (error) {
      console.log("Error updating profile", error);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateProfile: updateUserProfile,
    isLoading,
  };
};

export default useProfileActions;
