import React, { useEffect, useState } from 'react'
import { getpost } from '../api/PostApi';

const Posts = () => {
  const [posts, setPosts] = useState([]);
   const getPostData = async ()=> {
    const res = await getpost();
    setPosts(res.data);
    console.log(res.data);
  }
  useEffect(()=> {
    getPostData();
  },[])
  return (
    <>
    <ol>
         {
          posts.map((curElem) => {
            return <li key={curElem.id} curElem={curElem}>
              <h2>{curElem.title}</h2>
              <p>{curElem.body}</p>
              <button>Edit</button>
              <button>Delete</button>

            </li>
          })
         }
    </ol>
      
    </>
  )
}

export default Posts
