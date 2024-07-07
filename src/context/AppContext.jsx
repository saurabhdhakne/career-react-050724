// src/contexts/AppContext.js
import React, { createContext, useState } from "react";
import { supabase } from "../supabase/supabase";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const isAuthenticated = () => {
    return localStorage.getItem("accessToken") !== null;
    // return localStorage.getItem("authToken") !== null;
  };

  const isAdmin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("user: ", user);
    return user && user?.email === "ashutoshkaushal2@gmail.com";
  };

  // async function fetchBlogs() {
  //   let { data: blogs, error } = await supabase.from("blogs").select("*");
  //   console.log("error: ", error);
  //   console.log("blogs: ", blogs);
  //   console.log("data: ", data);
  //   if (!error) {
  //     return { status: "SUCCESS", blogs };
  //   } else {
  //     return { status: "FAIL", error };
  //   }
  // }

  return (
    <AppContext.Provider value={{ isAuthenticated, isAdmin }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
