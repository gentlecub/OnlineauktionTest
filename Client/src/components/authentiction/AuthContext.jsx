import { createContext, useEffect, useState } from "react";
import apiRequest from "../apiRequest";
import { ListGroupItem } from "react-bootstrap";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [globalMsg, setGlobalMsg] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("api/users");
        if (!response.ok) throw Error("Did not receive expected data");
        const listUserItem = await response.json();
        setUser(listUserItem);
      } catch (err) {
        setFetchError(err.message);
      }
    };

    fetchUser();
  }, []);
  const bidAuction = (auctionId, price) => {
    if (!currentUser) {
      return setGlobalMsg("Please login first");
    }

    let newPrice = Math.floor((price / 100) * 110);
  };

  const register = async (email, password) => {
    const id = user.length ? parseInt(user[user.length - 1].id) + 1 : 1;
    const idString = id.toString();
    const newUser = {
      id: idString,
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

    const result = await apiRequest("/api/users", postOptions);
    return result;
  };

  const login = async (email, password) => {
    const loginUser = {
      email: email,
      password: password,
    };
    const postOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const result = await apiRequest("/api/users", postOptions);
      if (!result.ok) throw Error("User not found ");
      const loginuser = await result.json();
      const user = loginuser.find(
        (user) => user.email === email && user.password === password
      );
      if (!user) setCurrentUser(null);
      // console.log("LoginUser", user);
      setCurrentUser(user);
    } catch (err) {
      setGlobalMsg(err.message);
    }
  };

  const logout = async () => {
    try {
      const logoutOption = {
        method: "POST",
        credentials: "include",
      };
      const result = await apiRequest("/api/users", logoutOption);

      if (!result.ok) {
        throw new Error("Failed to logout");
      }
      setCurrentUser(null);
    } catch (err) {
      setGlobalMsg(err);
    }
  };

  useEffect(() => {
    const subscribe = async (user) => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) throw Error("Did not receive expected data");
        const listUserItem = await response.json();
        //  console.log(listUserItem);
        const userSubcribe = listUserItem.find(
          (subscribe) => subscribe.id === user.id
        );
        if (userSubcribe) {
          setCurrentUser(userSubcribe);
          setLoading(false);
        } else {
          setGlobalMsg("The inserted data is not correct");
        }
      } catch (err) {
        setGlobalMsg(err.message);
      }
    };
    subscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        register,
        globalMsg,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export { AuthProvider, AuthContext };
