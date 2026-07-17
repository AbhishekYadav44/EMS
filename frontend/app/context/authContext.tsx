"use client";
import { useRouter } from "next/navigation";
import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect
} from "react";


interface User {
    id:string;
    name:string;
    email:string;
    role:string;
}


interface AuthContextType {

    user:User | null;
    login:(token:string,user:User)=>void;
    logout:()=>void;

}


const AuthContext = createContext<AuthContextType | null>(null);



export const AuthProvider = ({
    children
}:{
    children:ReactNode
})=>{


    const [user,setUser] = useState<User | null>(null);


const router = useRouter()
    // load user after refresh/navigation
    useEffect(()=>{

        const savedUser = localStorage.getItem("user");

        if(savedUser){

            setUser(JSON.parse(savedUser));

        }

    },[]);



    const login = (
        token:string,
        user:User
    )=>{


        localStorage.setItem(
            "token",
            token
        );


        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );


        setUser(user);

    };



    const logout = ()=>{

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        

        setUser(null);
        router.push("/")

    };



    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    )

}



export const useAuth = ()=>{

    const context = useContext(AuthContext);


    if(!context)
        throw new Error("Auth provider missing");


    return context;

}