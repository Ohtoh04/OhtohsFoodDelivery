import {createContext, useContext, useEffect, useState} from "react";

export const AuthorizationContext = createContext();

export const AuthorizationProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);

    const fetchUserData = async () => {
        const response = await fetch("http://localhost:3000/profile", {
            credentials: "include",
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
            setProfile(data.profile);
            console.log("profile set successfully");
        } else {
            console.log("rprofile set failure");
        }

    };

    useEffect(() => {
        fetchUserData();
    }, []);


    return <AuthorizationContext.Provider
        value={{
            profile,
            setProfile
        }}>
        {children}
    </AuthorizationContext.Provider>
};

export const useAuthorization = () => useContext(AuthorizationContext);