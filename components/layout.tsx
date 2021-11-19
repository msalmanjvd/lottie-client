import React, { FunctionComponent as FC, useState, useEffect } from "react";
import GlobalContext from "../config/global-context";
import { useRouter } from "next/router";
import NavBar from "./navbar";
import Header from "./header";
import Loader from "./loader";

const Navbar: FC = ({ children }) => {
  /**
   * Get tag search term from query paramters
   */
  const router = useRouter();
  const { tag } = router.query;
  const [UserData, updateUserData] = useState({ name: "" });

  useEffect(() => {
    setTimeout(() => {
      updateUserData({ name: "Salman" });
    }, 1000);
  }, []);
  return (
    <>
      {" "}
      {UserData ? (
        <>
          {/* we can access golabldata liek email and id from context api */}
          <GlobalContext.Provider value={UserData}>
            <>
              <Header />
              <NavBar />
              {children}
            </>
          </GlobalContext.Provider>
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
    </>
  );
};

export default Navbar;
