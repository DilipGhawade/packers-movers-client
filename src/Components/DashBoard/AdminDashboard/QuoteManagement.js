import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Spinner, Alert } from "react-bootstrap";
import { authApi } from "../../../Service/api";
import EditQuoteModal from "./EditQuoteModal";

const QuoteManagement = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);

  const fetchQuotes = async () => {
    try {
      const response = await authApi.getAllQuote();
      if (response.data.statusCode === 200) {
        setQuotes(response.data.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleEditClick = (quote) => {
    console.log(`the selected quote is Quote : ${JSON.stringify(quote)}`);

    setSelectedQuote(quote);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`YOUR_API_ENDPOINT/deleteQuote/${id}`);
      fetchQuotes();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-3">
        Error: {error}
      </Alert>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Quote Management</h2>
      <div className="table-responsive">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Moving From</th>
              <th>Moving To</th>
              <th>Service ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote, index) => (
              <tr key={quote._id}>
                <td>{index + 1}</td>
                <td>{quote.movingFrom}</td>
                <td>{quote.movingTo}</td>
                <td>{quote.service}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleEditClick(quote)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(quote._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Move the modal outside the table */}
      {selectedQuote && (
        <EditQuoteModal
          key={selectedQuote?._id || "modal"} // Force re-render
          quote={selectedQuote}
          show={showModal}
          handleClose={() => setShowModal(false)}
          refreshQuotes={fetchQuotes}
        />
      )}
    </div>
  );
};

export default QuoteManagement;
