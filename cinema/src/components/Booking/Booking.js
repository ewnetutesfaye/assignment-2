import React, { useState } from 'react';

const BookingForm = ({ users, addPerson, removePerson, occupiedSeatsData }) => {
  const [form, setForm] = useState({ firstName: '', lastName: '', age: '', seat: '' });

  const availableSeats = Array.from({ length: occupiedSeatsData?.total || 0 })
    .map((_, i) => i)
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
            <option key={seat} value={seat}>{seat + 1}</option>
          ))}
        </select>
        <button type="button" onClick={handleBook}>Book</button>
      </form>
      <div>
        <h2>Booked Customers</h2>
        {users.map((user, i) => (
          <div key={i}>
            {user.firstName}, {user.lastName}, Seat: {user.seat + 1}, Price: SEK {user.age > 65 ? 75 : user.age < 12 ? 65 : 85}
            <button onClick={() => removePerson(i)}>Remove</button>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default BookingForm;
