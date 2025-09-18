import { useUser } from "reactfire";

const Dashboard = () => {
  const { data: user } = useUser();

  return (
    <div>
      <h1>Dasboard</h1>
      <p>Welcome, {user!.displayName || "Guest"}</p>
      <p>Email: {user!.email || "Not provided"}</p>
    </div>
  );
};

export default Dashboard;
