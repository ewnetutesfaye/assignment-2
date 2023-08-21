import React, { useState } from 'react';

const BookingForm = ({ users, addPerson, removePerson, occupiedSeatsData }) => {
  const [form, setForm] = useState({ firstName: '', lastName: '', age: '', seat: '' });

  const availableSeats = Array.from({ length: occupiedSeatsData?.total || 0 })
  .map((_, i) => i)
  .filter(i => !occupiedSeatsData?.occupiedSeats.includes(i));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  }

  const handleBook = () => {
    if (form.firstName && form.lastName && form.age && form.seat !== '') {
      addPerson({ ...form, seat: form.seat });
      setForm({ firstName: '', lastName: '', age: '', seat: '' });
    } else {
      alert('Please fill all the fields before booking');
    }
  }
  

  return (
    <div className="bookingForm">
      <form>
        <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} />
        <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} />
        <select name="seat" value={form.seat} onChange={handleChange}>
          <option value="" disabled>Select Seat</option>
          {availableSeats.map((seat, index) => (
            <option key={index} value={seat}>{seat + 1}</option>
          ))}
        </select>
        <button type="button" onClick={handleBook}>Book</button>
      </form>

      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.firstName} {user.lastName}, Seat: {parseInt(user.seat) + 1} 
            <button onClick={() => removePerson(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookingForm;
