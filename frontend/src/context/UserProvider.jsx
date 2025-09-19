import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { UserContext } from "./UserContext";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      setIsLoading(false);
      return;
    }
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data);
      } catch (error) {
        console.error("user not authenticated", error);
        clearUser();
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const updateUser = (userData) => {
    setUser(userData || null);
    if (userData?.token) {
      localStorage.setItem("token", userData.token);
    }
    setIsLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, isLoading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
