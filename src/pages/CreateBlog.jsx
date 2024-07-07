// CreateBlog.jsx
import React, { useEffect, useState } from "react";
import RichTextEditor from "../components/RichTextEditor";
import { supabase } from "../supabase/supabase";

const CreateBlog = () => {
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({});
  console.log("formData: ", formData);

  const handleCoverImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("blogs")
      .insert([{ ...formData }])
      .select();
    console.log("data: ", data);
    console.log("error: ", error);
    if (!error) {
      setStatus("SUCCESS");
      setFormData({});
    } else {
      setStatus("FAILED");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setStatus("");
    }, 2000);
  }, [status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container mx-auto p-4 w-full h-[calc(100vh-124px)] overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="bg-cyan-600 col-span-2 p-3 my-3 rounded-md text-white text-center flex flex-row items-center justify-between">
          Create a new career guide{" "}
          <div className="col-span-1 md:col-span-2 text-right">
            <button
              type="submit"
              className=" inline-flex justify-center py-1 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-slate-500  bg-white hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 outline-none"
            >
              {`Create Post`}
            </button>
          </div>
        </div>{" "}
        {status && (
          <div className="col-span-2 ">
            <div
              className={`flex items-center p-2 text-sm ${
                status === "SUCCESS" ? "bg-green-100" : "bg-red-100"
              } text-slate-500 rounded-lg `}
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">
                  {status === "SUCCESS"
                    ? "Saved Successfully"
                    : status === "FAILED"
                    ? "Something went wrong, please try again!"
                    : ""}
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="col-span-1 md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={formData?.title || ""}
            name="title"
            onChange={handleChange}
            className=" block w-full border border-gray-300 rounded-md shadow-sm focus:border-2 focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm p-2 outline-none"
            required
          />
        </div>{" "}
        <div className="col-span-1 md:col-span-1 ">
          <label className="block text-sm font-medium text-gray-700">
            Cover Image
          </label>
          <input
            type="file"
            name="coverImage"
            onChange={handleCoverImageChange}
            className=" block bg-slate-200 w-full  rounded-md text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100 cursor-pointer"
          />
        </div>
        <div className="col-span-1 md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Sub Title
          </label>
          <input
            type="text"
            value={formData?.subtitle || ""}
            name="subtitle"
            onChange={handleChange}
            className=" block w-full border border-gray-300 rounded-md shadow-sm focus:border-2 focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm p-2 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            type="text"
            name="author"
            value={formData?.author || ""}
            onChange={handleChange}
            className=" block w-full border border-gray-300 rounded-md shadow-sm focus:border-2 focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm p-2 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Categories
          </label>
          <input
            type="text"
            value={formData?.categories || ""}
            name="categories"
            onChange={handleChange}
            className=" block w-full border border-gray-300 rounded-md shadow-sm focus:border-2 focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm p-2 outline-none"
            required
          />
        </div>
        <div className="col-span-1 md:col-span-1  ">
          <label className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <input
            type="text"
            value={formData?.tags || ""}
            name="tags"
            onChange={handleChange}
            className=" block w-full border border-gray-300 rounded-md shadow-sm focus:border-2 focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm p-2 outline-none"
            required
          />
        </div>
        <div className="col-span-2  ">
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>

          <RichTextEditor
            handleChange={handleChange}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
