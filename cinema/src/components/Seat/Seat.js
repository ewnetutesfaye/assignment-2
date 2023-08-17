import React from 'react';

const Seat = ({ number, onSelect }) => {
    return (
        <button onClick={() => onSelect(number)}>
            {number}
        </button>
    );
}

export default Seat;
