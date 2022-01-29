import { useContext } from "react";

import { UserContext } from "contexts";
import {
  MetaTags,
  SignOutButton,
  NewUsernameForm,
  AuthButtonGroup,
} from "components";

export default function Enter({}) {
  const { user, username } = useContext(UserContext);

  return (
    <main>
      <MetaTags title="Enter" description="Sign up for this amazing app!" />
      {user ? (
        !username ? (
          <NewUsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <AuthButtonGroup />
      )}
    </main>
  );
}
