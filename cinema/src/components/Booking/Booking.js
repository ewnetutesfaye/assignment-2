import React, { useState } from 'react';

const BookingForm = ({ users, bookings, addPerson, removePerson, occupiedSeatsData }) => {
  const [form, setForm] = useState({ firstName: '', lastName: '', age: '', seat: '' });
  const isFormValid = form.firstName && form.lastName && form.age && form.seat;


  const availableSeats = Array.from({ length: occupiedSeatsData?.total || 0 })
  .map((_, i) => i + 1) // Start seats numbering from 1
  .filter(i => !occupiedSeatsData?.occupiedSeats.split(", ").includes(i.toString()));


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  }

  const handleBook = () => {
    addPerson(form);
    setForm({ firstName: '', lastName: '', age: '', seat: '' });
  }
  
  
  return (
    <div className="bookingForm">
      <form>
        <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} />
        <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} />
        <select name="seat" value={form.seat} onChange={handleChange}>
  <option value="" disabled>Select Seat</option>
  {availableSeats.map(seat => (
    <option key={seat} value={seat}>{seat}</option>
  ))}
</select>

<button id='book' type="button" onClick={handleBook} disabled={!isFormValid}>Book</button>
    
      </form>
      <div className='list-booked'>
        {bookings.length > 0 && (
          <>
            <h2>Booked Customers</h2>
            {bookings.map((booking, i) => (
              <div className='item' key={i}>
                {booking.firstName}, {booking.lastName}, Seat: {booking.seat}, Price: SEK {booking.age > 65 ? 75 : booking.age < 12 ? 65 : 85}
                <button onClick={() => removePerson(i)}>Remove</button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
  
};

export default BookingForm;
