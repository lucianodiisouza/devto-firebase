import { useDocument } from "react-firebase-hooks/firestore";
import { firestore, auth, increment } from "lib/firebase";

const HeartButton = ({ postRef }) => {
  const heartRef = postRef.collection("hearts").doc(auth.currentUser.uid);
  const [heartDoc] = useDocument(heartRef);

  const batch = firestore.batch();

  const addHeart = async () => {
    const uid = auth.currentUser.uid;

    batch.update(postRef, { heartCount: increment(1) });
    batch.set(heartRef, { uid });

    await batch.commit();
  };

  const removeHeart = async () => {
    batch.update(postRef, { heartCount: increment(-1) });
    batch.delete(heartRef);

    await batch.commit();
  };

  return heartDoc?.exists ? (
    <button onClick={removeHeart}>💔 Unheart</button>
  ) : (
    <button onClick={addHeart}>💗 Heart</button>
  );
};

export default HeartButton;
