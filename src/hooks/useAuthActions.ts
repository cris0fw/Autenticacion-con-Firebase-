import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  type AuthError,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { useAuth } from "reactfire";

interface AuthActionsResponse {
  success: boolean;
  error: AuthError | null;
}

// ACA ESTAMOS HACIENDO EL LOGIN Y REGISTER
const useAuthActions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOkay, setIsOkay] = useState(false);
  const auth = useAuth();

  const login = async (data: {
    email: string;
    password: string;
    displayName?: string;
  }): Promise<AuthActionsResponse> => {
    setIsLoading(true);

    try {
      const currentUser = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      if (currentUser.user) {
        await updateProfile(currentUser.user, {
          displayName: data.displayName,
        });

        //Forzar la recarga del usuario para sincronizar con react fire
        await currentUser.user.reload();
      }

      setIsOkay(true);

      return {
        success: true,
        error: null,
      };
    } catch (error) {
      setIsOkay(false);
      const authError = error as AuthError;
      return {
        success: false,
        error: authError,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const registerForm = async (data: {
    displayName: string | null | undefined;
    email: string;
    password: string;
  }): Promise<AuthActionsResponse> => {
    setIsLoading(true);

    try {
      const currentUser = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      if (currentUser.user) {
        await updateProfile(currentUser.user, {
          displayName: data.displayName,
        });

        //Forzar la recarga del usuario para sincronizar con react fire
        await currentUser.user.reload();
      }

      return {
        success: true,
        error: null,
      };
    } catch (error) {
      const authError = error as AuthError;
      return {
        success: false,
        error: authError,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const LoginWithGoogle = async (): Promise<AuthActionsResponse> => {
    setIsLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      return {
        success: true,
        error: null,
      };
    } catch (error) {
      const authError = error as AuthError;
      return {
        success: false,
        error: authError,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const Logout = async (): Promise<AuthActionsResponse> => {
    setIsLoading(true);

    try {
      await signOut(auth);

      return {
        success: true,
        error: null,
      };
    } catch (error) {
      const errorAuth = error as AuthError;
      return {
        success: false,
        error: errorAuth,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    login,
    registerForm,
    LoginWithGoogle,
    Logout,
    isOkay,
  };
};

export default useAuthActions;
