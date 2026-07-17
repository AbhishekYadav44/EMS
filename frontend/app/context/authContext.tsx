"use client";

import {
    createContext,
    useContext,
    useState,
    ReactNode
} from "react";


interface User {

    id: string;
    name: string;
    email: string;
    role: string;

}


interface AuthContextType {

    user: User | null;
    login: (token: string, user: User) => void;
    logout: () => void;

}



const AuthContext = createContext<AuthContextType | null>(null);



export const AuthProvider = ({
    children
}: {
    children: ReactNode
}) => {


    const [user, setUser] = useState<User | null>(null);



    const login = (token: string, user: User) => {


        localStorage.setItem(
            "token",
            token
        );


        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );


        setUser(user);

    }




    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);

    }



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



export const useAuth = () => {

    const context = useContext(AuthContext);

    if (!context)
        throw new Error("Auth provider missing");


    return context;

}