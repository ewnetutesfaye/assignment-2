import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { fetchOccupiedSeats, fetchSeats, fetchAuditoriums } from '../../tools/dataFetcher';
import BookingForm from '../../components/Booking/Booking';
import './BookingPage.css';

const BookingPage = () => {
  const { screeningId } = useParams();
  const [occupiedSeatsData, setOccupiedSeatsData] = useState(null);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const [seatsData, setSeatsData] = useState([]);
  const [auditoriums, setAuditoriums] = useState([]); // For holding the auditoriums


  // Function to generate booking number
  const generateBookingNumber = () => {
    return (
      users[0]?.firstName.charAt(0).toUpperCase() +
      users[0]?.lastName.substring(0, 2).toUpperCase() +
      Math.floor(Math.random() * 1000)
    );
  };

  const getAuditoriumIdByName = (name) => {
    const auditorium = auditoriums.find(aud => aud.name === name);
    return auditorium ? auditorium.id : null;
  };
  const getSeatsInAuditorium = (auditoriumName) => {
    const auditoriumId = getAuditoriumIdByName(auditoriumName);
    return seatsData.filter(seat => seat.auditoriumId === auditoriumId);
  };

  const getNumberOfRows = (auditoriumId) => {
    const seatsInAuditorium = getSeatsInAuditorium(auditoriumId);
    return Math.max(...seatsInAuditorium.map(seat => seat.rowNumber), 0);
  };


  // Function to package booking info
  const packageBookingInfo = () => {
    const totalPrice = calculatePrice();
    const bookingNumber = generateBookingNumber();
    return {
      bookings,
      screeningId,
      totalPrice,
      bookingNumber,
      movie: occupiedSeatsData?.movie, // Adding movie name
      screeningTime: occupiedSeatsData?.screeningTime, // Adding screening time
      auditorium: occupiedSeatsData?.auditorium, // Adding auditorium
    };
  };
  

  const handleProceedOrder = () => {
    const bookingInfo = packageBookingInfo();
    navigate("/receipt", { state: { bookingInfo } });
  };

  useEffect(() => {
    fetchAuditoriums().then(data => setAuditoriums(data)); // Fetch the auditoriums
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allSeatsData = await fetchOccupiedSeats();
        const specificScreeningSeats = allSeatsData.find(seat => seat.screeningId.toString() === screeningId);

        const allSeats = await fetchSeats();
        setSeatsData(allSeats);

        if (specificScreeningSeats) {
          setOccupiedSeatsData(specificScreeningSeats);
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
    setOccupiedSeatsData({
      ...occupiedSeatsData,
      occupiedSeats: occupiedSeatsData.occupiedSeats + ", " + person.seat
    });
    setUsers([...users, person]);

        // Add the new booking information to the bookings state
    const newBooking = {
        screeningId: screeningId,
        ...person,
        seat: parseInt(person.seat) + 1 // Correcting the seat number
    };
    setBookings([...bookings, newBooking]);
  }

  const removePerson = (index) => {
    if (users.length <= 0) return; // Return early if no users to remove
  
    const seatToRemove = users[index].seat;
    const updatedOccupiedSeats = occupiedSeatsData.occupiedSeats.split(", ").filter(seat => seat !== seatToRemove.toString()).join(", ");
    setOccupiedSeatsData({ ...occupiedSeatsData, occupiedSeats: updatedOccupiedSeats });
  
    // Remove the corresponding booking
    const updatedBookings = bookings.filter((_, i) => i !== index);
    setBookings(updatedBookings);
  
    // Remove the user from the users state
    setUsers(users.filter((_, i) => i !== index));
  };




  

  return (
    <div className="bookingPage">
      <h1>{occupiedSeatsData?.movie}</h1>
      <h3>Date: {occupiedSeatsData?.screeningTime.slice(0, 10)}, Time: {occupiedSeatsData?.screeningTime.slice(11, 16)}</h3>
      <h2>{occupiedSeatsData?.auditorium}</h2>

      <hr></hr>

      <div className="seatsContainer">
  {Array.from({ length: getNumberOfRows(occupiedSeatsData?.auditorium) }).map((_, rowIndex) => (
    <div key={rowIndex} className="seatRow">
      {getSeatsInAuditorium(occupiedSeatsData?.auditorium)
        .filter(seat => seat.rowNumber === rowIndex + 1)
        .reverse() // Reversing the order of seats in each row
        .map((seat, seatIndex) => (
          <div
            key={seatIndex}
            className={`seat ${occupiedSeatsData?.occupiedSeats.split(", ").includes(seat.seatNumber.toString()) ? 'occupied' : 'available'}`}
          >
            {seat.seatNumber}
          </div>
        ))}
    </div>
  ))}
</div>

<hr></hr>

      <BookingForm users={users} bookings={bookings} addPerson={addPerson} removePerson={removePerson} occupiedSeatsData={occupiedSeatsData} />
      <hr></hr>
    <div className="totalPrice">
        Total Price: SEK {calculatePrice()}
      </div>
        <button onClick={handleProceedOrder}>Proceed with Order</button>
    </div>
  );
}

export default BookingPage;
