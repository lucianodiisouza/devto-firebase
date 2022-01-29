import { useEffect, useState } from "react";
import { auth, firestore } from "lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function useUserdata() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsubscribe: any;

    if (user) {
      const usersRef = firestore.collection("users").doc(user.uid);
      unsubscribe = usersRef.onSnapshot((doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
}
