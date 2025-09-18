import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonGoogle from "../../components/ButtonGoogle";
import useAuthActions from "../../hooks/useAuthActions";
import Toast from "../../components/Toast";
import {
  formSchemaRegister,
  type typeSchemaRegister,
  type zodSchemaRegister,
} from "../../schemas/zod.schema";

const Register = () => {
  const { registerForm, isOkay } = useAuthActions();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<zodSchemaRegister>({
    resolver: zodResolver(formSchemaRegister),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = handleSubmit((data: typeSchemaRegister) => {
    registerForm(data);
  });

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      {isOkay && <Toast message="Register sucessfully" />}

      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Crear cuenta
      </h2>

      <form onSubmit={onSubmit} className="space-y-5">
        {/* Display name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Display name
          </label>
          <input
            type="text"
            {...register("displayName")}
            required
            placeholder="ejemplo@correo.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {errors?.displayName?.message && (
          <span className="text-red-500">{errors.displayName.message}</span>
        )}

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            required
            placeholder="ejemplo@correo.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {errors?.email?.message && (
          <span className="text-red-500">{errors.email.message}</span>
        )}

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            {...register("password")}
            required
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {errors?.password?.message && (
          <span className="text-red-500">{errors.password.message}</span>
        )}

        {/* Confirm password */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Confirm password
          </label>
          <input
            type="password"
            {...register("confirmPassword")}
            required
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {errors?.confirmPassword?.message && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition duration-300"
        >
          Registrarse
        </button>

        <ButtonGoogle title="Registrarse con google" />
      </form>
    </div>
  );
};

export default Register;
