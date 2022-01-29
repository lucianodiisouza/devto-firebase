import { signInWithPopup } from "firebase/auth";
import { googleAuthProvider, auth } from "lib/firebase";

export default function Enter({}) {
  const user = null;
  const username = null;

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
