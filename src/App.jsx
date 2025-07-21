import React, { useEffect } from 'react'
import { getpost } from './api/PostApi';


const App = () => {
  const getPostData = async ()=> {
    const res = await getpost();
    console.log(res);
  }
  useEffect(()=> {
    getPostData();
  },[])
  return (
    <div>
     
    </div>
  )
}

export default App
