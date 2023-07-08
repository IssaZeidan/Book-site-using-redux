/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Addcomments from "./addcomments";
import { useParams } from "react-router-dom";
import axios from "axios";

function Postdetails() {
  const { post_id } = useParams();
  const [post, setPost] = useState();

  const fetchBlogPost = () => {
    axios
      .get(`http://localhost:5000/getPostById/${post_id}`)
      .then((response) => {
        const result = response.data;
        setPost(result);
      })
      .catch((error) => {
        console.error("Error fetching blog posts:", error);
      });
  };

  useEffect(() => {
    fetchBlogPost();
  }, []);

  function convertDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <>
      <section
        className="overflow-hidden text-gray-100 mt-10"
        style={{ backgroundColor: "#111827" }}
      >
        {post && (
          <div className="container px-5 pt-32 pb-4 mx-auto sm:py-24">
            <div
              className="flex flex-wrap items-center mx-auto lg:max-w-5xl shadow-md rounded-lg p-8 hover:shadow-lg"
              style={{ boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)" }}
            >
              <div className="w-full text-left mt-6 lg:w-full lg:pl-10 py-0 lg:mt-0">
                <div className="flex items-center mb-4">
                  <img
                    src={post.profile_picture}
                    alt="User"
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <h2 className="text-lg font-medium text-gray-100">
                    {post.username}
                  </h2>
                </div>
                <h1 className="text-3xl font-medium text-gray-100 title-font mb-8">
                  {post.title}
                </h1>
                <p className="text-gray-300 mb-4">
                  {convertDate(post.created_at)}
                </p>
                <p className="leading-relaxed">{post.content}</p>
              </div>
            </div>
            <div>
              <Addcomments post_id={post.post_id} />
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Postdetails;
