import { useUser } from "reactfire";
import FormProfile from "../../components/FormProfile";

const Profile = () => {
  const { data: user } = useUser();

  if (!user) {
    return <div className="text-red-500">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center mt-10">
      <FormProfile user={user} />
    </div>
  );
};

export default Profile;
