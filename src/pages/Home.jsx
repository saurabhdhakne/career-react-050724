import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabase";
import { AppContext } from "../context/AppContext";
import Card from "../components/Card";

const Home = () => {
  const navigate = useNavigate();
  const [allBlogs, setAllBlogs] = useState([]);
  console.log("allBlogs: ", allBlogs);
  async function fetchBlogs() {
    let { data: blogs, error } = await supabase.from("blogs").select("*");
    setAllBlogs(blogs);
    console.log("error: ", error);
    console.log("blogs: ", blogs);
  }

  useEffect(() => {
    fetchBlogs();
    console.log("fetchBlogs(): ", fetchBlogs());
  }, []);

  function handleLogout() {
    localStorage.removeItem("accessToken");
    navigate("/login");
  }
  return (
    <div>
      <h1>All Blogs</h1>
      <div className="flex flex-row gap-2 overflow-x-auto">
        {allBlogs.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
