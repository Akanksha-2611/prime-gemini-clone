import React from 'react'
import {Link,Navigate,useNavigate} from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar'
import Main from './Main/Main'
const Home = () => {

  const navigate=useNavigate()
  // axios.defaults.withCredentials=true;
  // const handleLogout=()=>{
  //   axios.get('http://localhost:3000/auth/logout')
  //   .then(res=>{
  //     if(res.data.status){
  //       navigate('/login')
  //     }
  //   }).catch(err=>{
  //     console.log(err)
  //   })
  // }
  return (
    <>
    <Sidebar/>
    <Main/>
    </>
    
  )
}

export default Home