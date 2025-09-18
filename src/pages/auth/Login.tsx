import ButtonGoogle from "../../components/ButtonGoogle";
import useAuthActions from "../../hooks/useAuthActions";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  formSchemaLogin,
  type typeSchemaLogin,
  type zodSchemaLogin,
} from "../../schemas/zod.schema";

const Login = () => {
  const { login, isLoading } = useAuthActions();
  const form = useForm<zodSchemaLogin>({
    resolver: zodResolver(formSchemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data: typeSchemaLogin) => {
    await login(data);
  });

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Login
      </h2>

      <form onSubmit={onSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            {...form.register("email")}
            required
            placeholder="ejemplo@correo.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {form.formState.errors?.email?.message && (
          <span className="text-red-500">
            {form.formState.errors.email.message}
          </span>
        )}

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            {...form.register("password")}
            required
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {form.formState.errors?.password?.message && (
          <span className="text-red-500">
            {form.formState.errors.password.message}
          </span>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition duration-300"
        >
          {isLoading ? "Loggin in" : "Login"}
        </button>

        <ButtonGoogle title="Loguearte con google" />
      </form>
    </div>
  );
};

export default Login;
