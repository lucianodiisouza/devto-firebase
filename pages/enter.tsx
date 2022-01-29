import { useContext } from "react";

import { UserContext } from "contexts";
import { auth, googleAuthProvider } from "lib/firebase";

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
  const signInWithGoogle = () => {
    auth
      .signInWithPopup(googleAuthProvider)
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
