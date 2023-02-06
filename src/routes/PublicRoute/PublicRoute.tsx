import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Home from '@/views/home/Home';
import PageNotFound from '@/views/errors/PageNotFound';



const PublicRoute = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="*" element={<PageNotFound/>} />
            </Routes>
        </Router>
    )
}

export default PublicRoute