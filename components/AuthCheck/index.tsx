import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "contexts";
import { getStaticProps } from "pages/[username]/[slug]";

const AuthCheck = (props) => {
  const { username } = useContext(UserContext);

  return username
    ? props.children
    : props.fallback || <Link href="/enter">You must to be signed in</Link>;
};

export default AuthCheck;
