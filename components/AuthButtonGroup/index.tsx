import Image from "next/image";
import { auth, googleAuthProvider } from "lib/firebase";

const AuthButtonGroup = () => {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <>
      <button className="btn-google" onClick={signInWithGoogle}>
        <Image src={"/google.png"} width={30} height={30} alt="Google" /> Sign
        in with Google
      </button>
      <button onClick={() => auth.signInAnonymously()}>
        Sign in Anonymously
      </button>
    </>
  );
};

export default AuthButtonGroup;
