import React, { createContext, useEffect, useState } from "react";

import { getAuth } from "firebase/auth";
import App from "../../Firebase/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

export const authContext = createContext();
const auth = getAuth(App);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // set react state 'user' to user
        console.log(currentUser);
        setUser(currentUser);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = { user, loading, createUser };
  return <authContext.Provider value={authInfo}>{children}</authContext.Provider>;
};

export default AuthProvider;
