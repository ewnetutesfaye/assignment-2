import React from 'react';

const ScreeningsList = ({ screenings }) => {
    return (
        <div>
            {screenings.map(screening => (
                <div key={screening.id}>
                    {/* Add movie details here */}
                    <h3>Here comes a movie title</h3>
                    {/* ... other details ... */}
                </div>
            ))}
        </div>
    );
}

export default ScreeningsList;
