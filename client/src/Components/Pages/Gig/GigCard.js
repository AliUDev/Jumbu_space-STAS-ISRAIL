import React from "react";
import { Card, Button } from "react-bootstrap";
const GigCard = ({ image, title, dec }) => {
  return (
    <Card className="m-3 p-2 rounded shadow">
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{dec}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default GigCard;
