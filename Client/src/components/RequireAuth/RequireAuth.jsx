import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { addUser } from '../../features/userSlice';

const RequireAuth = (Component) => {

  
  const AuthenticatedComponent = () => {
    const dispatch = useDispatch()
    const [cookies] = useCookies(['token']);
    const cookiesToken = cookies.token
    const user = useSelector((state) => state.user.id)
    if(user){
        return <Component />;
    }
    else {
        if(!cookiesToken){
          return <Navigate to="/auth" replace={true} />;
        }else{
          const axiosHead = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${cookiesToken}`
            }
          }
          axios.get(`${process.env.REACT_APP_DOMAIN}${process.env.REACT_APP_TOKEN}`, axiosHead)
          .then(function (response) {
            console.log(response);
            dispatch(addUser(response.data.decoded))
          })
          .catch(function (error) {
            console.warn(error);
          });
        }
    }
  }
  return AuthenticatedComponent;
}

export default RequireAuth