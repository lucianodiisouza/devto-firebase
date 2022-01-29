import { UserContext } from "contexts";
import { signInWithPopup } from "firebase/auth";
import { googleAuthProvider, auth } from "lib/firebase";
import { useContext } from "react";

export default function Enter({}) {
  const { user, username } = useContext(UserContext);

  return (
    <main>
      {user ? (
        !username ? (
          <UserNameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
}

const SignInButton = () => {
  const signInWithGoogle = async () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return <button onClick={signInWithGoogle}>Login com Google</button>;
};

const SignOutButton = () => {
  return <button onClick={() => auth.signOut()}>SignOut</button>;
};

const UserNameForm = () => {
  return (
    <form>
      <input type="text" />
    </form>
  );
};
