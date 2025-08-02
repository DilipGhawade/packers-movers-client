import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const EditQuoteModal = ({ quote, show, handleClose, refreshQuotes }) => {
  const [formData, setFormData] = useState({
    movingFrom: quote.movingFrom,
    movingTo: quote.movingTo,
    service: quote.service,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`YOUR_API_ENDPOINT/updateQuote/${quote._id}`, formData);
      refreshQuotes(); // Refresh the quotes list
      handleClose(); // Close the modal
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Quote</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Moving From</Form.Label>
            <Form.Control
              type="text"
              name="movingFrom"
              value={formData.movingFrom}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Moving To</Form.Label>
            <Form.Control
              type="text"
              name="movingTo"
              value={formData.movingTo}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Service ID</Form.Label>
            <Form.Control
              type="text"
              name="service"
              value={formData.service}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Update Quote
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditQuoteModal;
