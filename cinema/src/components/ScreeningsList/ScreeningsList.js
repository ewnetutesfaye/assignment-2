import React from 'react';
import "./ScreeningsList.css";

const ScreeningsList = ({ screenings, movies, auditoriums }) => {
    return (
        <div className='ScreeningsList-box'>
            {screenings.map(screening => (
                <div key={screening.id} className='ScreeningsList-item'>
                    <h3>{movies[screening.movieId]?.title}</h3>
                    <img src={movies[screening.movieId]?.description.posterImage} alt={movies[screening.movieId]?.title} />
                    <p>{new Date(screening.time).toLocaleString()}</p>
                    <p>{movies[screening.movieId]?.description.length} minutes</p>
                    <p>Auditorium: {auditoriums[screening.auditoriumId]?.name}</p>
                    {/* Link to booking page can be added here */}
                </div>
            ))}
        </div>
    );
};

export default ScreeningsList;
