// src/components/Blog.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase/supabase";
import DOMPurify from "dompurify";

const Blog = () => {
  const { id } = useParams();

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

  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }

  const post = allBlogs.find((post) => post.id === parseInt(id));

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1>Title:{post.title}</h1>
      <p>subtitle:{post.subtitle}</p>
      <p>subtitle:{post.author}</p>
      <p>subtitle:{post.categories}</p>
      <p>subtitle:{post.tags}</p>
      <div className="" dangerouslySetInnerHTML={createMarkup(post.desc)}></div>
    </div>
  );
};

export default Blog;
