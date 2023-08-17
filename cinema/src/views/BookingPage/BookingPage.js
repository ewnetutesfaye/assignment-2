import React from 'react';
import Booking from './Booking';

const BookingPage = ({ match }) => {
    // Assume movie ID or some unique identifier is passed via route params
    const movieId = match.params.id;

    return (
        <div>
            Here is the booking Page
        </div>
    );
}

export default BookingPage;
