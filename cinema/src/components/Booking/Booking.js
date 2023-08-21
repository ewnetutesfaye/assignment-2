import React, { useState } from 'react';

const BookingForm = ({ users, addPerson, occupiedSeatsData }) => {
  const [form, setForm] = useState({ firstName: '', lastName: '', age: '', seat: '' });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  }

  const handleSubmit = () => {
    addPerson(form);
    setForm({ firstName: '', lastName: '', age: '', seat: '' });
  }

  const getAvailableSeats = () => {
    const occupiedSeats = occupiedSeatsData?.occupiedSeats.split(", ").map(Number);
    return Array.from({ length: occupiedSeatsData?.total || 0 })
      .map((_, i) => i)
      .filter(seat => !occupiedSeats.includes(seat));
  }

  return (
    <div className="bookingForm">
      <div className="newUserForm">
        <input placeholder="First Name" value={form.firstName} onChange={e => handleChange('firstName', e.target.value)} />
        <input placeholder="Last Name" value={form.lastName} onChange={e => handleChange('lastName', e.target.value)} />
        <input placeholder="Age" type="number" value={form.age} onChange={e => handleChange('age', e.target.value)} />
        <select value={form.seat} onChange={e => handleChange('seat', e.target.value)}>
          {getAvailableSeats().map(seat => <option key={seat} value={seat}>{seat + 1}</option>)}
        </select>
        <button onClick={handleSubmit}>Book</button>
      </div>

      <div className="bookedUsers">
        {users.map((user, index) => (
          <div key={index} className="userDetails">
            {user.firstName} {user.lastName} - Seat {user.seat + 1}
          </div>
        ))}
      </div>

      <button onClick={() => setForm({ firstName: '', lastName: '', age: '', seat: '' })}>Add Another Person</button>
    </div>
  );
}

export default BookingForm;
