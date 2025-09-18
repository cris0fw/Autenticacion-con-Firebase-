import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  profileZodSchema,
  type ProfileZodSchemaType,
} from "../schemas/zod.schema";
import type { User } from "firebase/auth";
import useProfileActions from "../hooks/useProfileActions";
import Toast from "../components/Toast";

interface Props {
  user: User;
}

const FormProfile = ({ user }: Props) => {
  const { isLoading, updateProfile } = useProfileActions();
  const data = useForm<ProfileZodSchemaType>({
    resolver: zodResolver(profileZodSchema),
    defaultValues: {
      displayName: user?.displayName || "",
      photoURL: user?.photoURL || "",
    },
  });

  const onSubmit = async (values: ProfileZodSchemaType) => {
    const result = await updateProfile(values);
    if (result.success) {
      return <Toast message="Profile updating sucessfully" />;
    }

    return <Toast message="Error updating profile" />;
  };

  return (
    <form
      onSubmit={data.handleSubmit(onSubmit)}
      className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md"
    >
      <h2 className="text-2xl font-semibold text-center mb-6">
        Actualizar Perfil
      </h2>

      {/* Display Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre de usuario
        </label>
        <input
          type="text"
          {...data.register("displayName")}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tu nombre..."
        />
      </div>

      {/* Image Upload */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Imagen de perfil
        </label>
        <input
          {...data.register("photoURL")}
          type="text"
          accept="image/*"
          className="w-full"
        />

        <img
          src={data.getValues("photoURL") || "/example.jpg"}
          alt="Preview"
          className="mt-3 w-24 h-24 rounded-full object-cover border"
        />
      </div>

      {/* Submit */}
      <button
        disabled={isLoading}
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
      >
        {isLoading ? "Updating" : "Update profile"}
      </button>
    </form>
  );
};

export default FormProfile;
