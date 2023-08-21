import axios from 'axios';

const BASE_URL = 'https://cinema-rest.nodehill.se/api';

const handleResponse = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    console.log("data -> ", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${BASE_URL}${endpoint}: `, error);
    throw error;
  }
};

export const fetchBookingsOverview = () => handleResponse(`/bookings_overview`);

export const fetchOccupiedSeats = () => handleResponse(`/occupied_seats`);

export const fetchScreeningsOverview = () => handleResponse(`/screenings_overview`);

export const fetchSeatsPerAuditorium = () => handleResponse(`/seats_per_auditorium`);

export const fetchTablesAndViews = () => handleResponse(`/tables_and_views`);

export const fetchTotals = () => handleResponse(`/totals`);

export const fetchAuditoriums = () => handleResponse(`/auditoriums`);

export const fetchBookings = () => handleResponse(`/bookings`);

export const fetchBookingsXSeats = () => handleResponse(`/bookingsXseats`);

export const fetchCategories = () => handleResponse(`/categories`);

export const fetchMovies = () => handleResponse(`/movies`);

export const fetchMoviesXCategories = () => handleResponse(`/moviesXcategories`);

export const fetchScreenings = () => handleResponse(`/screenings`);

export const fetchSeats = () => handleResponse(`/seats`);

export const fetchSessions = () => handleResponse(`/sessions`);

export const fetchTicketTypes = () => handleResponse(`/ticketTypes`);

export const fetchUsers = () => handleResponse(`/users`);
