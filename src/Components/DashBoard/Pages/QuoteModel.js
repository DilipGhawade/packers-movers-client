import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { authApi } from "../../../Service/api";

const QuoteModal = ({ show, onHide, serviceId }) => {
  const [formData, setFormData] = useState({
    movingFrom: "",
    movingTo: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.movingFrom) tempErrors.movingFrom = "Required";
    if (!formData.movingTo) tempErrors.movingTo = "Required";
    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempErrors = validate();
    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setLoading(true);

    try {
      const quote = {
        movingFrom: formData.movingFrom,
        movingTo: formData.movingTo,
        serviceId,
      };
      const res = await authApi.addQuote(quote);
      console.log("Quote added:", res.data);
      alert("Quote added successfully!");
      onHide(); // Close modal
    } catch (error) {
      console.error("Error submitting quote:", error);
      alert("Failed to add quote.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Request a Quote</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Moving From</Form.Label>
            <Form.Control
              type="text"
              name="movingFrom"
              value={formData.movingFrom}
              onChange={handleChange}
              isInvalid={!!errors.movingFrom}
              placeholder="Enter departure city"
            />
            <Form.Control.Feedback type="invalid">
              {errors.movingFrom}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Moving To</Form.Label>
            <Form.Control
              type="text"
              name="movingTo"
              value={formData.movingTo}
              onChange={handleChange}
              isInvalid={!!errors.movingTo}
              placeholder="Enter destination city"
            />
            <Form.Control.Feedback type="invalid">
              {errors.movingTo}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Submitting..." : "Submit Quote"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default QuoteModal;
