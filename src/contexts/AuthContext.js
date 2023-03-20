import { useState, useEffect, useContext } from "react";
import { createContext } from "react";
import { Auth } from "aws-amplify";
import { DataStore } from "aws-amplify";
import { User } from "../models";
const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const sub = authUser?.attributes?.sub;

  // useEffect(() => {
  //   Auth.currentAuthenticatedUser({ bypassCache: true }).then(setAuthUser);
  // }, []);
  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true })
      .then(setAuthUser)
      .catch((err) => {
        setAuthUser(null);
      });
  }, []);

  useEffect(() => {
    if (!sub) {
      return;
    }
    setLoading(true);
    DataStore.query(User, (p) => p.sub.eq(sub)).then((users) => {
      setDbUser(users[0]);
      setLoading(false);
    });
  }, [sub]);

  //   console.log(authUser);

  return (
    <AuthContext.Provider value={{ authUser, dbUser, sub, setDbUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
