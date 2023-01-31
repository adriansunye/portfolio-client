import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Home from '@/views/home/Home';
import RecordList from '@/views/records/RecordList';
import Create from '@/views/records/Create';



const PublicRoute = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/list" element={<RecordList />} />
                <Route path="/create" element={<Create />} />
                <Route path="*" element="" />
            </Routes>
        </Router>
    )
}

export default PublicRoute