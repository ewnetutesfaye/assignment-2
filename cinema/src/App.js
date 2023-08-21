import React from 'react';
import './App.css';
import Home from './views/Home/Home';
import BookingPage from './views/BookingPage/BookingPage';  // make sure to import BookingPage
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <Link to="/">Home</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/booking/:screeningId" element={<BookingPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
