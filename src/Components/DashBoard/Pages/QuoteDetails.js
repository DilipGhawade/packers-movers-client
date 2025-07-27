import React from "react";
import { Card, Button } from "react-bootstrap";

const QuoteDetails = ({ quote, onBack }) => {
  return (
    <div>
      <Button variant="secondary" onClick={onBack} className="mb-3">
        ← Back to List
      </Button>
      <Card>
        <Card.Img
          variant="top"
          src={`http://localhost:7000${quote.imageUrl}`}
          alt={quote.title}
          style={{ height: "250px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{quote.title}</Card.Title>
          <Card.Text>{quote.description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default QuoteDetails;
