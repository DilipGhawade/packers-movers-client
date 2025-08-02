import React, { useState, useEffect } from "react";
import { Table, Button, Spinner, Alert, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { authApi } from "../../../Service/api";

const Price = () => {
  const role = localStorage.getItem("role");
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingPrice, setEditingPrice] = useState(null);
  const [formData, setFormData] = useState({
    service: "",
    price: "",
    description: "",
  });

  // Fetch prices from API
  const fetchPrices = async () => {
    try {
      const response = await authApi.getAllPrice();
      // Ensure we're working with an array
      const pricesData = Array.isArray(response.data?.data)
        ? response.data.data
        : [];
      setPrices(pricesData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (price) => {
    setEditingPrice(price);
    setFormData({
      service: price.service,
      price: price.price,
      description: price.description,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPrice) {
        await axios.put(
          `http://localhost:7000/api/prices/${editingPrice._id}`,
          formData
        );
      } else {
        await axios.post("http://localhost:7000/api/prices", formData);
      }
      fetchPrices();
      setShowModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/api/prices/${id}`);
      fetchPrices();
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Our Pricing</h2>
        {role === "admin" && (
          <Button
            variant="primary"
            onClick={() => {
              setEditingPrice(null);
              setFormData({ service: "", price: "", description: "" });
              setShowModal(true);
            }}
          >
            Add New Price
          </Button>
        )}
      </div>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Service</th>
              <th>Price</th>
              <th>Description</th>
              {role === "admin" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {prices.length > 0 ? (
              prices.map((price) => (
                <tr key={price._id}>
                  <td>{price.service}</td>
                  <td>{price.price}</td>
                  <td>{price.description}</td>
                  {role === "admin" && (
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEditClick(price)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(price._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={role === "admin" ? 4 : 3} className="text-center">
                  No prices found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Edit/Add Modal (only for admin) */}
      {role === "admin" && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingPrice ? "Edit Price" : "Add New Price"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Service Name</Form.Label>
                <Form.Control
                  type="text"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                {editingPrice ? "Update" : "Save"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default Price;
