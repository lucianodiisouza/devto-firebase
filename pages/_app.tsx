import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Toaster } from "react-hot-toast";

import { Navbar } from "components";
import { UserContext } from "contexts";
import { useUserData } from "hooks";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  
  return (
    <UserContext.Provider value={userData}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;
