import React from 'react';
import { Button, Row, Col, Card } from 'react-bootstrap';

export default function Comparison({ songA, songB, onSelect }) {
  if (!songA || !songB) return null;

  const renderVideo = (youtubeId) => (
    <iframe
      width="100%"
      height="150"
      src={`https://www.youtube.com/embed/${youtubeId}?controls=1`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );

  return (
    <Row className="mb-4">
      <Col md={5} className="mb-3 mb-md-0">
        <Card className="h-100">
          {renderVideo(songA.youtubeId)}
          <Card.Body className="d-flex flex-column align-items-center">
            <Card.Title>{songA.title}</Card.Title>
            <Button variant="success" onClick={() => onSelect('current')}>
              Choose
            </Button>
          </Card.Body>
        </Card>
      </Col>

      <Col md={2} className="d-flex align-items-center justify-content-center">
        <strong>VS</strong>
      </Col>

      <Col md={5}>
        <Card className="h-100">
          {renderVideo(songB.youtubeId)}
          <Card.Body className="d-flex flex-column align-items-center">
            <Card.Title>{songB.title}</Card.Title>
            <Button variant="primary" onClick={() => onSelect('ranked')}>
              Choose
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
