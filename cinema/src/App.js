import React from 'react';
import './App.css';
import Home from './views/Home/Home';
import BookingPage from './views/BookingPage/BookingPage';  // make sure to import BookingPage
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Receipt from './views/Receipt/Receipt'

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
                    <Route path="/receipt" element={<Receipt />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
