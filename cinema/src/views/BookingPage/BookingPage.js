import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchOccupiedSeats } from '../../tools/dataFetcher';
import BookingForm from '../../components/Booking/Booking';
import './BookingPage.css';

const BookingPage = () => {
  const { screeningId } = useParams();
  const [occupiedSeatsData, setOccupiedSeatsData] = useState(null);
  const [users, setUsers] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allSeatsData = await fetchOccupiedSeats();
        const specificScreeningSeats = allSeatsData.find(seat => seat.screeningId.toString() === screeningId);
        if (specificScreeningSeats) {
          setOccupiedSeatsData(specificScreeningSeats);
          setOccupiedSeats(specificScreeningSeats.occupiedSeats);
        } else {
          console.warn(`No occupied seats found for screening ID: ${screeningId}`);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const calculatePrice = () => {
    return users.reduce((total, user) => {
      if (user.age > 65) return total + 75;
      if (user.age < 12) return total + 65;
      return total + 85;
    }, 0);
  }

  const addPerson = (person) => {
    const updatedOccupiedSeats = [...occupiedSeatsData.occupiedSeats, parseInt(person.seat)];
    setOccupiedSeatsData({
      ...occupiedSeatsData,
      occupiedSeats: updatedOccupiedSeats,
    });
    setUsers([...users, person]);
  };
  
  const removePerson = (index) => {
    const seatToRemove = parseInt(users[index].seat);
    const updatedOccupiedSeats = occupiedSeatsData.occupiedSeats.filter(seat => seat !== seatToRemove);
    setOccupiedSeatsData({
      ...occupiedSeatsData,
      occupiedSeats: updatedOccupiedSeats,
    });
    setUsers(users.filter((_, i) => i !== index));
  };
  

  return (
    <div className="bookingPage">
      <h1>{occupiedSeatsData?.movie}</h1>
      <h3>Date: {occupiedSeatsData?.screeningTime.slice(0, 10)}, Time: {occupiedSeatsData?.screeningTime.slice(11, 16)}</h3>
      <h2>{occupiedSeatsData?.auditorium}</h2>
      <div className="seatsContainer">
  {Array.from({ length: occupiedSeatsData?.total || 0 }).map((_, i) => (
    <div 
      key={i}
      className={`seat ${occupiedSeatsData?.occupiedSeats.includes(i) ? 'occupied' : 'available'}`}
      style={{order: i}}
    >
      {i + 1}
    </div>
  ))}
</div>

      <BookingForm users={users} addPerson={addPerson} removePerson={removePerson} occupiedSeatsData={occupiedSeatsData} />
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
