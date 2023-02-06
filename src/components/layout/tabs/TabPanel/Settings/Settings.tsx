import React, { useCallback, useContext, useEffect, useState } from "react"
import { UserContext } from '@/services/providers/UserProvider';
import Loader from "@/components/layout/loader/Loader";
import AdminControl from "@/components/layout/tabs/TabPanel/Settings/AdminControl/AdminControl";
import Login from "@/components/layout/tabs/TabPanel/Settings/Login/Login";

const Settings = () => {
    const [userContext, setUserContext] = useContext(UserContext);

    const verifyUser = useCallback(() => {
        fetch("/users/refreshToken", {
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
                <AdminControl/> :
                <Loader />
            }
        </React.Fragment>
    )
}

export default Settings