import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Home from '@/views/home/Home';
import Create from '@/views/records/Create';
import Landing from '@/views/landing/Landing';
import Login from '@/views/login/Login';
import Register from '@/views/register/Register';

const PublicRoute = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/landing" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                <Route path="*" element="" />
            </Routes>
        </Router>
    )
}

export default PublicRoute