import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/Auth';
import { toast } from 'react-toastify';
const Logout = () => {
    const {LogoutUser} = useAuth();
    useEffect(()=>{
        LogoutUser();
    },[LogoutUser]);
    const navigate = useNavigate();
  return (
    toast.success("Logout Successfully"),
    navigate("/login")
  )
}

export default Logout
