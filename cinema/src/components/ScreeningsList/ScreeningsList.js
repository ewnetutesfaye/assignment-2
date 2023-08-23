import React from 'react';
import './ScreeningsList.css';
import { useHistory, Link } from "react-router-dom";
import { Card, Button, Row, Col } from 'react-bootstrap';

const ScreeningsList = ({ screenings, movies, auditoriums }) => {

    return (
        <div className='ScreeningsList-box'>
            <Row className="justify-content-md-center">
                {screenings.map(screening => (
                    <Col key={screening.id} sm={12} md={6} lg={4} className="mb-4">
                        <Card className='ScreeningsList-item'>
                            <Card.Img variant="top" src={movies[screening.movieId]?.description.posterImage} alt={movies[screening.movieId]?.title} />
                            <Card.Body>
                                <Card.Title>{movies[screening.movieId]?.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{new Date(screening.time).toLocaleString()}</Card.Subtitle>
                                <Card.Text>
                                    {movies[screening.movieId]?.description.length} minutes<br />
                                    Auditorium: {auditoriums[screening.auditoriumId]?.name}
                                </Card.Text>
                                <Link to={`/booking/${screening.id}`}>
                                    <Button variant="primary">BOOK</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ScreeningsList;
