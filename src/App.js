import React from 'react';
import './App.css';
import Home from './views/Home/Home';
import BookingPage from './views/BookingPage/BookingPage'; // make sure to import BookingPage
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Receipt from './views/Receipt/Receipt';
import { Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar bg="light" expand="lg" className="navbar-custom">
                    <Container>
                        <Navbar.Brand className="navbar-brand">
                            <Link to="/" className="brand-link">Feature Flicks</Link>
                            <small><Link to="/" className="location-link">Småstad, Sweden</Link></small>
                        </Navbar.Brand>
                    </Container>
                </Navbar>
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
