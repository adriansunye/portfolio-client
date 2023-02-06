import React, { useCallback, useContext, useEffect, useState } from "react"
import { UserContext } from '@/services/providers/UserProvider';
import Layout from '@/components/layout/Layout'
import Loader from "@/components/layout/loader/Loader";
import Create from "../create/Create";

import Login from "../login/Login";

const Config = () => {
    const [userContext, setUserContext] = useContext(UserContext);

    const verifyUser = useCallback(() => {
        fetch("/users/refreshToken", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            withCredentials: true
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
    const syncLogout = useCallback(event => {
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
        <Layout>
            {userContext.token === null ?
                <Login /> :  
                userContext.token ? 
                <Create /> :
                <Loader />
            }
        </Layout>
    )
}

export default Config