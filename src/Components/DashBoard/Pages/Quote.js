import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import QuoteDetails from "./QuoteDetails";
import { authApi } from "../../../Service/api";

const Quote = () => {
  const [quotes, setQuotes] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await authApi.getMyQuote(email);

        setQuotes(res.data.allQuotes); // Adjust according to your API response structure
      } catch (err) {
        console.error("Failed to fetch quotes", err);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Your Requested Quotes</h2>
      {selectedQuote ? (
        <QuoteDetails
          quote={selectedQuote}
          onBack={() => setSelectedQuote(null)}
        />
      ) : (
        <div className="row">
          {quotes.map((quote) => (
            <div className="col-md-4 mb-3" key={quote._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{quote.title}</Card.Title>
                  <Card.Text>{quote.description}</Card.Text>
                  <Button onClick={() => setSelectedQuote(quote)}>
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Quote;
