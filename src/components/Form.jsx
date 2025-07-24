import React, { useState } from "react";
import { addPost } from "../api/PostApi";

// eslint-disable-next-line no-unused-vars
const Form = ({posts, setPosts}) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddData({
      ...addData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addPost(addData);
      if (response.status === 201) {
        setPosts(prevData => [...prevData, response.data]);
      }
      console.log("Post added successfully:", response.data);
      setAddData({ title: "", body: "" });
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
          value={addData.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          id="body"
          name="body"
          placeholder="Enter body"
          value={addData.body}
          onChange={handleInputChange}
        />
        <button>ADD</button>
      </form>
    </>
  );
};

export default Form;
