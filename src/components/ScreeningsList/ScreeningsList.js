import React from 'react';
import './ScreeningsList.css';
import { useHistory, Link } from "react-router-dom";
import { Card, Button, Row, Col } from 'react-bootstrap';

const ScreeningsList = ({ screenings, movies, auditoriums }) => {

    const address_base = "https://cinema-rest.nodehill.se"

    return (
        <div className='ScreeningsList-box'>
            <Row className="justify-content-md-center">
                {screenings.map(screening => (
                    <Col key={screening.id} sm={12} md={6} lg={4} className="mb-4">
                        <Card className='ScreeningsList-item'>
                        <Card.Img variant="top" src={address_base + movies[screening.movieId]?.description.posterImage} alt={movies[screening.movieId]?.title} />
<Card.Body>
                                <Card.Title>{movies[screening.movieId]?.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{new Date(screening.time).toLocaleString()}</Card.Subtitle>
                                <Card.Text>
                                    {movies[screening.movieId]?.description.length} minutes<br />
                                    Auditorium: {auditoriums[screening.auditoriumId]?.name}
                                </Card.Text>
                                <Link to={`/booking/${screening.id}`}>
                                    <Button className='book' variant="primary">BOOK</Button>
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
