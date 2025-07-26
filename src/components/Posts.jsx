import React, { useEffect, useState } from 'react'
import { deletePost, getpost } from '../api/PostApi';
import Form from './Form';

const Posts = () => {
const [posts, setPosts] = useState([]);
const [updateApi, setUpdateApi] = useState({});
const getPost = async () => {
  try {
    const response = await getpost();
    setPosts(response.data);
  } catch (error) {
    console.error("Error fetching posts:", error);
  } 
   
}
const handleDeleteBtn = async (id) => {
  try {
    await deletePost(id);
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  } catch (error) { 
    console.error("Error deleting post:", error);
  }

}
const handleUpdateBtn = (curElement) => setUpdateApi(curElement);
useEffect(()=> {
  getPost();
},[])

  return (
    <>
    <section>
      <Form key={posts} setPosts={setPosts} updateApi = {updateApi} setUpdateApi= {setUpdateApi} />
    </section>

     <ol>
      
        {posts.map((curElement,index) => {
          return (
            <li key={curElement.id}>
              <h3>{curElement.title}</h3>
              <p>{curElement.body}</p>
              <button onClick={()=>handleUpdateBtn(curElement)}>Edit</button>
              <button onClick={()=>handleDeleteBtn(index)}>Delete</button>
            </li>

          )
        })}
     </ol>
      
    </>
  )
}
export default Posts
