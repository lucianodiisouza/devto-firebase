import { Navbar } from "components";
import { UserContext } from "contexts";
import { Toaster } from "react-hot-toast";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserContext.Provider value={{ user: {}, username: "lombardy " }}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;
