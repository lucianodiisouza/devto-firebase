/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { useContext } from "react";
import { UserContext } from "contexts";

export default function Navbar() {
  const { user, username } = useContext(UserContext);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/" passHref>
            <button className="btn-logo">DEV</button>
          </Link>
        </li>
        {username && (
          <>
            <li className="push-left">
              <Link href="/admin" passHref>
                <button className="btn-blue">Write Posts</button>
              </Link>
              <Link href={`/${username}`} passHref>
                <img
                  width={48}
                  height={48}
                  src={user?.photoURL}
                  alt={username}
                />
              </Link>
            </li>
          </>
        )}

        {!username && (
          <li>
            <Link href="/enter" passHref>
              <button className="btn-blue">Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
