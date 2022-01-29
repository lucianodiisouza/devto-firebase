import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const user = {
    haveUser: true,
    photoURL: "https://i.pravatar.cc/100",
  };
  const username = true;

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
                <Image
                  width={48}
                  height={48}
                  src={user?.photoURL}
                  alt="change it"
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
