/* eslint-disable @next/next/no-img-element */
const UserProfile = ({ user }) => {
  return (
    <div className="box-center">
      <img
        src={user.photoURL || "/hacker.png"}
        alt="user picture"
        className="card-img-center"
      />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName || "Anonymous user"}</h1>
    </div>
  );
};

export default UserProfile;
