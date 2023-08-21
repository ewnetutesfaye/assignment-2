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

  const calculatePrice = () => {
    return users.reduce((total, user) => {
      if (user.age > 65) return total + 75;
      if (user.age < 12) return total + 65;
      return total + 85;
    }, 0);
  }

  const addPerson = (person) => {
    setUsers([...users, person]);
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
            {i + 1}
          </div>
        ))}
      </div>
      <BookingForm users={users} addPerson={addPerson} occupiedSeatsData={occupiedSeatsData} />
      <div className="totalPrice">
        Total Price: SEK {calculatePrice()}
      </div>
      <Link to="/receipt">
        <button>Proceed with Order</button>
      </Link>
    </div>
  );
}

export default BookingPage;
