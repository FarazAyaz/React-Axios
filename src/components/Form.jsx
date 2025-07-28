/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { addPost, updatePost } from "../api/PostApi";

const Form = ({ posts, setPosts, updateApi, setUpdateApi }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  //  get the updated data and add into input fields
  let isEmpty = Object.keys(updateApi).length === 0;
  useEffect(() => {
    if (!isEmpty) {
      setTitle(updateApi?.title || "");
      setBody(updateApi?.body || "");
    }
  }, [updateApi]);

  //  Form submission
  const updatePostData = async () => {
    try {
      const res = await updatePost(updateApi.id, title, body);
      if (res.status === 200) {
        setPosts((prev) =>
          prev.map((curElem) =>
            curElem.id === res.data.id ? res.data : curElem
          )
        );
        setTitle("");
        setBody("");
        setUpdateApi({});
        console.log("Post updated successfully:", res.data);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      try {
        const response = await addPost({ title, body });
        if (response.status === 201) {
          setPosts((prevData) => [
            ...prevData,
            { ...response.data, id: prevData.length + 1 },
          ]);
          setTitle("");
          setBody("");
          console.log("Post added successfully:", response.data);
        }
      } catch (error) {
        console.error("Error adding post:", error);
      }
    } else if (action === "Edit") {
      await updatePostData();
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
        <button type="submit" value={isEmpty ? "Add" : "Edit"}>
          {isEmpty ? "Add" : "Edit"}
        </button>
      </form>
    </>
  );
};

export default Form;
