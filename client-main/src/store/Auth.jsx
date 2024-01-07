import { createContext,useContext ,useState,useEffect} from "react";
import axios from "axios";
export const AuthContext = createContext();
export const  AuthProvider = ({children}) => {
    const [isloading,setLoading] = useState(true);
    const [token,setToken] = useState(localStorage.getItem("token"));
    const [user,setUser] = useState("");
    const [services,setService] = useState("");
    const storeToken = (token) => {
        setToken(token);
        return localStorage.setItem("token",token);
    }
    const authorization = `Bearer ${token}`;
    let isLoggedIn = !!token;
    const userAuthnticate = async () => {
        setLoading(true);
        try{
            const response = await axios.get("http://localhost:9000/api/v2/user",{
                headers:{
                    Authorization: authorization
                }
            });
            if(response.status === 200)
            {
                const data = await response.data.user;
                console.log(data)
                setUser(data);
                setLoading(false);
            }
            else{
                setLoading(false);
            }
        }catch(err){
            console.log(err);
        }   
    }
    const getservicedata = async () => {
        try{
            const response = await axios.get("http://localhost:9000/api/data/service");
            if(response.status === 200)
            {
                const data = await response.data.service;
                setService(data);
            }
            
        }catch(err){
            console.log(err);
        }   
    }
    useEffect(()=>{
        getservicedata();
        userAuthnticate();
    },[])
    console.log(user.username);
    const LogoutUser = () => {
        setToken(null);
        return localStorage.removeItem("token");
    }
    return (
        <AuthContext.Provider value={{isLoggedIn,storeToken,LogoutUser,user,services,authorization,isloading}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
    return useContext(AuthContext);
}
