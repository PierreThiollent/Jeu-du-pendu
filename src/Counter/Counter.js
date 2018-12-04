import React from 'react'
import './Counter.css';
import PropTypes from 'prop-types'

const Counter = ({counter, gameState}) => (
    <div className="count">
        <p>Nombre de tentatives : {counter}/10</p>
        <div className="state">
            <p>Partie {gameState}</p>
        </div>
    </div>
);

Counter.propTypes = {
    counter: PropTypes.number.isRequired,
    gameState: PropTypes.oneOf([
        'En cours',
        'Perdue',
        'Gagné',
    ]).isRequired,
};

export default Counter
