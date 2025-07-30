import React, { useState } from "react";
import { addPost } from "../api/PostApi";

const Form = ({ posts, setPosts }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });
  const handleInputChange = (event) => {
    setAddData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };
  const addPostData = async () => {
    const newData = {
      id: new Date().getTime().toString(),
      title: addData.title,
      body: addData.body,
    };

    const res = await addPost(newData);

    if (res.status === 201) {
      setPosts([...posts, newData]);
      setAddData({
        id: "",
        title: "",
        body: "",
      });
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await addPostData();
  };
  return (
    <>
      <form className="form" onSubmit={handleFormSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={addData.title}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="body">Body</label>
        <input
          type="text"
          id="body"
          name="body"
          value={addData.body}
          onChange={handleInputChange}
          required
        />
        <button type="submit">ADD</button>
      </form>
    </>
  );
};

export default Form;
