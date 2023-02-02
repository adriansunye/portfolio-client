import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Home from '@/views/home/Home';
import Config from '@/views/config/Config';


const PublicRoute = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                    <Route path="/configuration" element={<Config />} />
                <Route path="*" element="" />
            </Routes>
        </Router>
    )
}

export default PublicRoute