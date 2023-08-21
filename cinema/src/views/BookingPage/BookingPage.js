import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchOccupiedSeats } from '../../tools/dataFetcher';
import BookingForm from '../../components/Booking/Booking';
import './BookingPage.css';

const BookingPage = () => {
  const { screeningId } = useParams();
  const [occupiedSeatsData, setOccupiedSeats] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allSeatsData = await fetchOccupiedSeats();
        const specificScreeningSeats = allSeatsData.find(seat => seat.screeningId.toString() === screeningId);

        if (specificScreeningSeats) {
          setOccupiedSeats(specificScreeningSeats);
        } else {
          console.warn(`No occupied seats found for screening ID: ${screeningId}`);
        }

      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [screeningId]);

  const addPerson = () => {
    setUsers([...users, { firstName: '', lastName: '', age: '', seat: '' }]);
  }

  const handleInputChange = (index, field, value) => {
    const newUsers = [...users];
    newUsers[index][field] = value;
    setUsers(newUsers);
  }

  return (
    <div className="bookingPage">
      <h2>{occupiedSeatsData?.movie}</h2>
      <h3>{occupiedSeatsData?.screeningTime}</h3>
      <h3>{occupiedSeatsData?.auditorium}</h3>
      <div className="seatsContainer">
        {Array.from({ length: occupiedSeatsData?.total || 0 }).map((_, i) => (
          <div 
            key={i}
            className={`seat ${occupiedSeatsData?.occupiedSeats.split(", ").includes(i.toString()) ? 'occupied' : 'available'}`}
          >
            {i}
          </div>
        ))}
      </div>
      <BookingForm users={users} handleInputChange={handleInputChange} addPerson={addPerson} />

      <div className="totalPrice">
        {/* Calculate and display total price */}
      </div>

      <Link to="/receipt">
        <button>Proceed with Order</button>
      </Link>
    </div>
  );
}

export default BookingPage;
