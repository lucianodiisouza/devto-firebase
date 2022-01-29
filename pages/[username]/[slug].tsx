import { useDocumentData } from "react-firebase-hooks/firestore";

import { PostContent, MetaTags, AuthCheck, HeartButton } from "components";
import { firestore, getUserWithUsername, postToJson } from "lib/firebase";

import styles from "styles/Home.module.css";

export default function PostPage(props) {
  const postRef = firestore.doc(props.path);
  const [realtimePost] = useDocumentData(postRef);
  const post = realtimePost || props.post;

  return (
    <>
      <MetaTags title={post?.title} />
      <main className={styles.container}>
        <section>
          <PostContent post={post} />
        </section>

        <aside className="card">
          <p>
            <strong>{post.heartCount || 0} ❤️</strong>
          </p>

          <AuthCheck>
            <HeartButton postRef={postRef} />
          </AuthCheck>
        </aside>
      </main>
    </>
  );
}

export async function getStaticProps({ params }) {
  const { username, slug } = params;

  const userDoc = await getUserWithUsername(username);
  let post;
  let path;

  if (userDoc) {
    const postRef = userDoc.ref.collection("posts").doc(slug);

    post = postToJson(await postRef.get());

    path = postRef.path;
  }

  return {
    props: {
      post,
      path,
    },
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  const snapshot = await firestore.collectionGroup("posts").get();

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();

    return {
      params: { username, slug },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}
