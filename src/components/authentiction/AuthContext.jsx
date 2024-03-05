import { createContext, useEffect, useState } from "react";
import apiRequest from "../apiRequest";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [globalMsg, setGlobalMsg] = useState("");

  async function register(email, password) {
    const newUser = {
      email: email,
      password: password,
    };
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    };

    const result = await apiRequest("/api/Users", postOptions);
    return result;
  }

  const login = (email, password) => {
    return authApp.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return authApp.signOut();
  };

  const bidAuction = (auctionId, price) => {
    if (!currentUser) {
      return setGlobalMsg("Please login first");
    }

    let newPrice = Math.floor((price / 100) * 110);
    const db = firestoreApp.collection("auctions");

    return db.doc(auctionId).update({
      curPrice: newPrice,
      curWinner: currentUser.email,
    });
  };

  const endAuction = (auctionId) => {
    const db = firestoreApp.collection("auctions");

    return db.doc(auctionId).delete();
  };

  useEffect(() => {
    const subscribe = authApp.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return subscribe;
  }, []);

  useEffect(() => {
    const interval = setTimeout(() => setGlobalMsg(""), 5000);
    return () => clearTimeout(interval);
  }, [globalMsg]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        register,
        globalMsg,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
