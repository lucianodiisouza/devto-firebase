import { auth } from "lib/firebase";

const SignOutButton = () => {
  return <button onClick={() => auth.signOut()}>SignOut</button>;
};

export default SignOutButton;
