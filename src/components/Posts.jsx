import React, { useEffect, useState } from "react";
import { deletePost, getpost, updatePost } from "../api/PostApi";
import Form from "./Form";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [updateApiData, setUpdateApiData] = useState({});
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });
  const getPostData = async () => {
    const res = await getpost();
    setPosts(res.data);
  };
  useEffect(() => {
    getPostData();
  }, []);

  const handleUpdatePost = async (post) => {
    const res = await updatePost(post.id, {
      title: addData.title,
      body: addData.body,
    });
    setPosts((prevPosts) =>
      prevPosts.map((p) => (p.id === post.id ? { ...res.data } : p))
    );
  };

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
      <section>
        <Form
          posts={posts}
          setPosts={setPosts}
          updateApiData={updateApiData}
          setUpdateApiData={setUpdateApiData}
          setAddData={setAddData}
          addData={addData}
        />
      </section>
      <ol className="card-list">

        {posts.map((post) => {
          const { id, title, body } = post;
          return (
            <li className="card" key={id}>
              <div className="card-title">{title} </div>
              <div className="card-desc">{body} </div>
              <div className="card-actions">
                <button onClick={() => handleUpdatePost(post)}>Edit</button>
                <button onClick={() => handleDeleteBtn(id)}>Delete</button>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Posts;
