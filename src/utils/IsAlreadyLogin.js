import React from 'react';

import {Navigate, Outlet} from 'react-router-dom'

const useAuth=()=>{
  const user=localStorage.getItem('authTokens')
  if(user){
    return false
  } else {
    return true
  }
}

const  PrivateRoute=() =>{

  const auth=useAuth()

  return auth?<Outlet/>: <Navigate to="/"/>
}

export default PrivateRoute;