import React, { useEffect, useState } from 'react';
import ScreeningsList from '../../components/ScreeningsList/ScreeningsList';
import Filter from '../../components/Filter/Filter';
import { fetchScreenings, fetchMovies, fetchAuditoriums } from '../../tools/dataFetcher';
import './Home.css';

const Home = () => {
    const [screenings, setScreenings] = useState([]);
    const [movies, setMovies] = useState({});
    const [auditoriums, setAuditoriums] = useState({});
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const screeningsData = await fetchScreenings();
                setScreenings(screeningsData);

                const moviesData = await fetchMovies();
                const moviesObj = {};
                moviesData.forEach(movie => {
                    moviesObj[movie.id] = movie;
                });
                setMovies(moviesObj);

                const auditoriumsData = await fetchAuditoriums();
                const auditoriumsObj = {};
                auditoriumsData.forEach(auditorium => {
                    auditoriumsObj[auditorium.id] = auditorium;
                });
                setAuditoriums(auditoriumsObj);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Handle logic for filtering screenings based on category
        // ... 

    }, [filter]);

    return (
        <div className='homeDiv'>
            
            <ScreeningsList screenings={screenings} movies={movies} auditoriums={auditoriums} />
        </div>
    );
}

export default Home;
