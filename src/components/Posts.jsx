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
   <div className="container">
  <div className="card-list">
    {posts.map(post => (
      <div className="card" key={post.id}>
        <div className="card-title">{post.title}</div>
        <div className="card-desc">{post.body}</div>
        <div className="card-actions">
          <button>Edit</button>
          <button onClick={()=> handleDeleteBtn(post.id)}>Delete</button>
        </div>
      </div>
    ))}
  </div>
</div>
  );
};

export default Posts;
