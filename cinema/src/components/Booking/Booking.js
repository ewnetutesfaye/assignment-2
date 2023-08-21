import React from 'react';

const BookingForm = ({ users, handleInputChange, addPerson }) => {
  return (
    <div className="bookingForm">
      {users.map((user, index) => (
        <div key={index} className="userForm">
          <input
            placeholder="First Name"
            value={user.firstName}
            onChange={e => handleInputChange(index, 'firstName', e.target.value)}
          />
          <input
            placeholder="Last Name"
            value={user.lastName}
            onChange={e => handleInputChange(index, 'lastName', e.target.value)}
          />
          <input
            placeholder="Age"
            type="number"
            value={user.age}
            onChange={e => handleInputChange(index, 'age', e.target.value)}
          />
          <select
            value={user.seat}
            onChange={e => handleInputChange(index, 'seat', e.target.value)}
          >
            {/* Populate dropdown with available seats */}
          </select>
        </div>
      ))}
      <button onClick={addPerson}>Add Another Person</button>
      <button>Book</button>
    </div>
  );
}

export default BookingForm;
