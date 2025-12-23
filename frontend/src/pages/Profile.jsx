import PageLayout from "../components/PageLayout";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("shieldai_user"));

  return (
    <PageLayout>
      <h1 className="text-3xl font-bold text-blue-500 mb-6">
        Admin Profile
      </h1>

      {user ? (
        <div className="bg-gray-900 p-6 rounded-xl max-w-xl">
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Role:</b> {user.role}</p>
        </div>
      ) : (
        <p className="text-gray-400">No user logged in</p>
      )}
    </PageLayout>
  );
};

export default Profile;

