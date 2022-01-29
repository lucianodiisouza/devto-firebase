import { useState } from "react";

import { Loader, MetaTags, PostFeed } from "components";
import { firestore, fromMillis, postToJson } from "lib/firebase";

const LIMIT = 5;

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);

    const last = posts && posts[posts.length - 1];

    const cursor =
      last && typeof last.createdAt === "number"
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const query = firestore
      .collectionGroup("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));

    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <>
      <MetaTags title="DevTo Clone w/ NextJS+Firebase" />
      <main>
        <PostFeed posts={posts} />
        {posts.length === 0 && "Nothing to see yet 😅"}
        {!loading && !postsEnd && (
          <button onClick={getMorePosts}>Load more</button>
        )}
        <Loader show={loading} />
        {postsEnd && "That's all folks!"}
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const postsQuery = firestore
    .collectionGroup("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJson);

  return {
    props: {
      posts,
    },
  };
}
