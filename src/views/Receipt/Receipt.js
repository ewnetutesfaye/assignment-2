import React from 'react';
import { useLocation } from 'react-router-dom';
import "./Receipt.css"

const ReceiptPage = () => {
  const location = useLocation();
  const { bookingInfo } = location.state;

  return (
    <div className="receipt-container">
      <h1>Booking Confirmation</h1>

      <hr></hr>
      <p>Movie: {bookingInfo.movie}</p>
      <p>Date: {bookingInfo.screeningTime.slice(0, 10)}, Time: {bookingInfo.screeningTime.slice(11, 16)}</p>
      <p>Auditorium: {bookingInfo.auditorium}</p>
      <h4>Screening ID: {bookingInfo.screeningId}</h4>
      <h4>Total Price: SEK {bookingInfo.totalPrice}</h4>
      <h3>Booking Number: {bookingInfo.bookingNumber}</h3>
      <hr></hr>
      <div>
        <h2>Booked Customers</h2>
        {bookingInfo.bookings.map((booking, i) => (
          <div key={i}>
            {booking.firstName}, {booking.lastName}, Seat: {booking.seat}, Price: SEK {booking.age > 65 ? 75 : booking.age < 12 ? 65 : 85}
          </div>
        ))}
      </div>
      <hr></hr>
      <p>Please note that the payment will be done at the cinema. Show your booking number to the staff when you arrive.</p>
    </div>
  );
};

export default ReceiptPage;
