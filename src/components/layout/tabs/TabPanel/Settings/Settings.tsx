import React, { useCallback, useContext, useEffect, useState } from "react"
import { UserContext } from '@/services/providers/UserProvider';
import Loader from "@/components/layout/loader/Loader";
import Create from "@/views/create/Create";

import Login from "@/views/login/Login";

const Settings = () => {
    const [userContext, setUserContext] = useContext(UserContext);

    const verifyUser = useCallback(() => {
        fetch(import.meta.env.VITE_REACT_APP_API_ENDPOINT + "users/refreshToken", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        }).then(async (response) => {
            if (response.ok) {
                const data = await response.json();
                setUserContext((oldValues) => {
                    return { ...oldValues, token: data.token };
                });
            } else {
                setUserContext((oldValues) => {
                    return { ...oldValues, token: null };
                });
            }
            // call refreshToken every 5 minutes to renew the authentication token.
            setTimeout(verifyUser, 5 * 60 * 1000);
        });
    }, [setUserContext]);

    useEffect(() => {
        verifyUser();
    }, [verifyUser]);

    /**
      * Sync logout across tabs
      */
    const syncLogout = useCallback((event:StorageEvent) => {
        if (event.key === "logout") {
            // If using react-router-dom, you may call history.push("/")
            window.location.reload()
        }
    }, [])

    useEffect(() => {
        window.addEventListener("storage", syncLogout)
        return () => {
            window.removeEventListener("storage", syncLogout)
        }
    }, [syncLogout])

    return  (
        <React.Fragment>
            {userContext.token === null ?
                <Login /> :  
                userContext.token ? 
                <Create/> :
                <Loader />
            }
        </React.Fragment>
    )
}

export default Settings