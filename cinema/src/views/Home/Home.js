import React, { useEffect, useState } from 'react';
import ScreeningsList from '../../components/ScreeningsList/ScreeningsList';
import Filter from '../../components/Filter/Filter';
import { fetchScreenings, fetchMovies, fetchAuditoriums, fetchCategories } from '../../tools/dataFetcher';
import './Home.css';
import { Container, Alert } from 'react-bootstrap';

const Home = () => {
    const [screenings, setScreenings] = useState([]);
    const [movies, setMovies] = useState({});
    const [auditoriums, setAuditoriums] = useState({});
    const [categories, setCategories] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [error, setError] = useState(null);

    const filteredScreenings = screenings.filter(screening => {
        if (selectedFilter === 'all') return true;
        const movie = movies[screening.movieId];
        return movie?.description?.categories?.includes(selectedFilter);
    });

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const screeningsData = await fetchScreenings();
                setScreenings(screeningsData);
    
                const moviesData = await fetchMovies();
                setMovies(Object.fromEntries(moviesData.map(movie => [movie.id, movie])));

                const auditoriumsData = await fetchAuditoriums();
                setAuditoriums(Object.fromEntries(auditoriumsData.map(auditorium => [auditorium.id, auditorium])));
    
                const categoriesData = await fetchCategories();
                setCategories(categoriesData);
            } catch (err) {
                setError('Error fetching data. Please try again later.');
                console.error("Error fetching data: ", err);
            }
        };
        fetchData();
    }, []);

    if (error) {
        return <Alert variant="danger" className="errorDiv">{error}</Alert>;
    }

    return (
        <Container fluid className="homeDiv">
            <Filter setFilter={setSelectedFilter} categories={categories} />
            <ScreeningsList screenings={filteredScreenings} movies={movies} auditoriums={auditoriums} />
        </Container>
    );
}

export default Home;
