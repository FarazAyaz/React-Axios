import React, { useEffect, useState } from 'react'
import { deletePost, getpost } from '../api/PostApi';
import Form from './Form';

const Posts = () => {
  const [posts, setPosts] = useState([]);
   const getPostData = async ()=> {
    const res = await getpost();
    setPosts(res.data);
    console.log(res.data);
  }
  const handleDeleteBtn = async (id) => {
     try {
       const res = await deletePost(id)
      if(res.status === 200) {
        const updatedPosts = posts.filter(post => post.id !== id);
        setPosts(updatedPosts);
        console.log("Post deleted successfully");
      }
      
     } catch (error) {
      console.log("Error deleting post:", error);
     }
    
  }
  useEffect(()=> {
    getPostData();
  },[])
  return (
    <>
    <section>
      <Form key={posts} setPosts={setPosts}/>
    </section>

    <ol>
         {
          posts.map((curElem) => {
            return <li key={curElem.id} curElem={curElem}>
              <h2>{curElem.title}</h2>
              <p>{curElem.body}</p>
              <button>Edit</button>
              <button onClick={()=>handleDeleteBtn(curElem.id)}>Delete</button>
            </li>
          })
         }
    </ol>
      
    </>
  )
}
export default Posts
