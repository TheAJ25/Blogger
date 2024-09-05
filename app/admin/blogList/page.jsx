"use client";
import BlogTableItem from "@/Components/AdminComponents/BlogTableItem";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blog");
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (mongoId) => {
    const response = await axios.delete("/api/blog", {
      params: {
        id: mongoId,
      },
    });
    toast.success(response.data.msg);
    fetchBlogs();
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All Blogs</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border-2 border-black scrollbar-hide">
          <table className="w-full text-sm text-black">
            <thead className="text-sm text-black bg-red-200 text-left uppercase">
              <tr>
                <th scope="col" className="hidden sm:block px-6 py-3">
                  Author name
                </th>
                <th scope="col" className="px-6 py-3">
                  Blog title
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((item, index) => (
                <BlogTableItem
                  key={index}
                  mongoId={item._id}
                  title={item.title}
                  author={item.author}
                  authorImg={item.authorImg}
                  date={item.date}
                  deleteBlog={deleteBlog}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Page;
