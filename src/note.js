import React, { useState, useEffect } from 'react';
import axios from 'axios';

// MoviesList Component
const MoviesList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get('https://cinema-rest.nodehill.se/showJson/movies')
            .then(response => {
                setMovies(response.data);
            });
    }, []);

    return (
        <div>
            {movies.map(movie => (
                <div key={movie.id}>
                    <h3>{movie.title}</h3>
                    <img src={movie.description.posterImage} alt={movie.title} />
                </div>
            ))}
        </div>
    );
}

// BookingList Component
const BookingList = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get('https://cinema-rest.nodehill.se/showJson/bookings_overview')
            .then(response => {
                setBookings(response.data);
            });
    }, []);

    return (
        <div>
            {bookings.map(booking => (
                <div key={booking.bookingNumber}>
                    <p>{booking.email}</p>
                    <p>{booking.movie}</p>
                </div>
            ))}
        </div>
    );
}

// SeatList Component
const SeatList = () => {
    const [seats, setSeats] = useState([]);

    useEffect(() => {
        axios.get('https://cinema-rest.nodehill.se/showJson/seats')
            .then(response => {
                setSeats(response.data);
            });
    }, []);

    return (
        <div>
            {seats.map(seat => (
                <div key={seat.id}>
                    <p>Row: {seat.rowNumber}, Seat: {seat.seatNumber}</p>
                </div>
            ))}
        </div>
    );
}

// ScreeningList Component
const ScreeningList = () => {
    const [screenings, setScreenings] = useState([]);

    useEffect(() => {
        axios.get('https://cinema-rest.nodehill.se/showJson/screenings_overview')
            .then(response => {
                setScreenings(response.data);
            });
    }, []);

    return (
        <div>
            {screenings.map(screening => (
                <div key={screening.screeningId}>
                    <p>Movie: {screening.movie}, Time: {screening.screeningTime}</p>
                </div>
            ))}
        </div>
    );
}

// App Component to combine everything
const App = () => {
    return (
        <div>
            <h1>Movies</h1>
            <MoviesList />

            <h1>Bookings</h1>
            <BookingList />

            <h1>Seats</h1>
            <SeatList />

            <h1>Screenings</h1>
            <ScreeningList />
        </div>
    );
}

export default App;
