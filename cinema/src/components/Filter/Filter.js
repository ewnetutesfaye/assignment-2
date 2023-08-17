import React from 'react';

const Filter = ({ onFilterChange }) => {
    return (
        <div>
            <select onChange={(e) => onFilterChange(e.target.value)}>
                {/* Categories should be dynamic, but here's a basic dropdown for now */}
                <option value="all">All</option>
                <option value="action">Action</option>
                <option value="comedy">Comedy</option>
                {/* ... other categories ... */}
            </select>
        </div>
    );
}

export default Filter;
