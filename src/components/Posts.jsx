import React, { useEffect, useState } from "react";
import { deletePost, getpost } from "../api/PostApi";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const getPostData = async () => {
    const res = await getpost();
    setPosts(res.data);
  };
  useEffect(() => {
    getPostData();
  }, []);

  const handleDeleteBtn = async (id) => {
    try {
      const response = await deletePost(id);
      if (response.status === 200) {
        setPosts(posts.filter((post) => post.id !== id));
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
      {posts.map((curPost) => {
        return (
          <div key={curPost.id}>
            <h2>{curPost.title}</h2>
            <p>{curPost.body}</p>
            <button>Edit</button>
            <button onClick={() => handleDeleteBtn(curPost.id)}>Delete</button>
          </div>
        );
      })}
    </>
  );
};

export default Posts;
