import React, { useEffect, useState } from 'react';
import ScreeningsList from './ScreeningsList';
import Filter from './Filter';

const Home = () => {
    const [screenings, setScreenings] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        // Fetch screenings from API
        // ... 

        // Filter based on category if filter is not 'all'
        // ...
    }, [filter]);

    return (
        <div>
            <Filter onFilterChange={setFilter} />
            <ScreeningsList screenings={screenings} />
        </div>
    );
}

export default Home;
