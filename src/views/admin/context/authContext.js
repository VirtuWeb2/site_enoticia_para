import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();
export const AuthContexProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const baseUrl = "https://api-sites-en.vercel.app";
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const login = async ({ email, password }) => {
    const res = await axios.post(`${baseUrl}/login`, { email, password });
    // setCurrentUser(res.data);
    // setIsLoggedIn(true);
  };
  async function validateToken() {
    const token = Cookies.get("authToken");
    if (token) {
      setLoading(true);
      try {
        const res = await axios.post(
          `${baseUrl}/validar-token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCurrentUser(res.data.user);
        setIsLoggedIn(true);
      } catch (err) {
        setIsLoggedIn(false);
        console.log(err);
        return <Navigate to="/admin" />;
      } finally {
        setLoading(false);
      }
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null)
      return <Navigate to="/admin" />;
    }
  }

  useEffect(() => {
    validateToken();
  }, []);

  const logout = async () => {
    await axios.post(`${baseUrl}/logout`);
    // setCurrentUser(null);
    //  setIsLoggedIn(false);
  };

  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(currentUser));
  // }, [currentUser]);
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        logout,
        isLoggedIn,
        setIsLoggedIn,
        login,
        validateToken,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
