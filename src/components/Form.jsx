/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { addPost } from "../api/PostApi";

const Form = ({ posts, setPosts, updateApi, setUpdateApi }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  //  get the updated data and add into input fields
  useEffect(() => {
    setTitle(updateApi?.title || "");
    setBody(updateApi?.body || "");
  }, [updateApi]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addPost({ title, body });
      if (response.status === 201) {
        setPosts((prevData) => [
          ...prevData,
          { ...response.data, id: prevData.length + 1 },
        ]);
      }
      console.log("Post added successfully:", response.data);
      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          id="body"
          name="body"
          placeholder="Enter body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button>Edit</button>
        <button>ADD</button>
      </form>
    </>
  );
};

export default Form;
