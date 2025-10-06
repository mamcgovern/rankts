import React from "react";
import { Row, Col, Button } from "react-bootstrap";

const Comparison = ({ songA, songB, onSelect }) => {
  return (
    <Row className="mb-3" style={{ width: "100%" }}>
      <Col xs={6}>
        <div className="video-container">
          <iframe
            src={`https://www.youtube.com/embed/${songA.youtubeId}`}
            title={songA.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <h3>{songA.title}</h3>
        <Button
          variant="primary"
          onClick={() => onSelect("A")}
          className="w-100 mt-2"
        >
          This One
        </Button>
      </Col>

      <Col xs={6}>
        <div className="video-container">
          <iframe
            src={`https://www.youtube.com/embed/${songB.youtubeId}`}
            title={songB.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <h3>{songB.title}</h3>
        <Button
          variant="primary"
          onClick={() => onSelect("B")}
          className="w-100 mt-2"
        >
          This One
        </Button>
      </Col>
    </Row>
  );
};

export default Comparison;
