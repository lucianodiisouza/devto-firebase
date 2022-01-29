import { FormEvent, useCallback, useContext, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { UserContext } from "contexts";
import { auth, googleAuthProvider, firestore } from "lib/firebase";

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
    await auth.signInWithPopup(googleAuthProvider);
  };
  return (
    <button onClick={signInWithGoogle} className="btn-google">
      Login com Google
    </button>
  );
};

const SignOutButton = () => {
  return <button onClick={() => auth.signOut()}>SignOut</button>;
};

const UserNameForm = () => {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onChange = (e) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const userDoc = firestore.doc(`users/$user.uid`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    const batch = firestore.batch();

    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue, checkUsername]);

  return (
    !username && (
      <section>
        <h3>Choose your username</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="username"
            placeholder="type your username"
            value={formValue}
            onChange={onChange}
          />

          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />

          <button type="submit" className="btn-green" disabled={!isValid}>
            Choose
          </button>

          <h3>DebugState</h3>
          <div>
            UserName: {formValue} <br />
            Loading: {loading.toString()} <br />
            Username Valid: {isValid.toString()}
          </div>
        </form>
      </section>
    )
  );
};

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking ...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is already taken!</p>;
  } else {
    return <p></p>;
  }
}
