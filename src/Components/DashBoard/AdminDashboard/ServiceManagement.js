import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Spinner,
  Alert,
  Form,
  InputGroup,
} from "react-bootstrap";
import { authApi } from "../../../Service/api";
import EditServiceModal from "./EditServiceModal";
import { FaSearch, FaPlus } from "react-icons/fa";

const ServiceManagement = () => {
  const email = localStorage.getItem("email");
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalShow, setModalShow] = useState(false); // Changed from showModal
  const [selectedService, setSelectedService] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchServices = async () => {
    try {
      const response = await authApi.getAllServices(email);
      if (response.data.statucCode === 200) {
        setServices(response.data.allService);
        setFilteredServices(response.data.allService);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    const filtered = services.filter(
      (service) =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(filtered);
  }, [searchTerm, services]);

  const handleEditClick = (service) => {
    setSelectedService(service);
    setIsEditMode(true);
    setModalShow(true);
  };

  const handleAddService = () => {
    setSelectedService(null);
    setIsEditMode(false);
    setModalShow(true);
  };

  const handleDelete = async (id) => {
    try {
      await authApi.delete(`YOUR_API_ENDPOINT/deleteService/${id}`);
      fetchServices();
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
      <h2 className="mb-4">Service Management</h2>

      {/* Modern Search Bar and Add Button */}
      <div className="d-flex justify-content-between mb-4">
        <div style={{ width: "300px" }}>
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderLeft: "none" }}
            />
          </InputGroup>
        </div>

        <Button
          variant="primary"
          onClick={handleAddService}
          className="d-flex align-items-center"
        >
          <FaPlus className="me-2" />
          Add Service
        </Button>
      </div>

      {/* Services Table */}
      <div className="table-responsive">
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.map((service, index) => (
              <tr key={service._id}>
                <td>{index + 1}</td>
                <td>{service.title}</td>
                <td>{service.description.substring(0, 50)}...</td>
                <td>
                  {service.imageUrl && (
                    <img
                      src={`http://localhost:3000/${service.imageUrl}`}
                      alt={service.title}
                      className="rounded"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleEditClick(service)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(service._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Single Modal for both Add/Edit */}
      <EditServiceModal
        service={selectedService}
        show={modalShow}
        handleClose={() => setModalShow(false)}
        refreshServices={fetchServices}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default ServiceManagement;
