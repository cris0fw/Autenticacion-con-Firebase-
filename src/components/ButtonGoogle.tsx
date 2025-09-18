import { FcGoogle } from "react-icons/fc";
import useAuthActions from "../hooks/useAuthActions";

interface Props {
  title: string;
}

const ButtonGoogle = ({ title }: Props) => {
  const { LoginWithGoogle } = useAuthActions();

  return (
    <button
      onClick={LoginWithGoogle}
      className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2 
                 border cursor-pointer border-gray-300 rounded-xl shadow-sm bg-white hover:bg-gray-100 
                 transition-all duration-200"
    >
      <FcGoogle size={22} />
      <span className="text-sm font-medium text-gray-700">{title}</span>
    </button>
  );
};

export default ButtonGoogle;
