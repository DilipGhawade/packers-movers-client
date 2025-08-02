import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { FaImage, FaUpload } from "react-icons/fa";
import axios from "axios";

const EditServiceModal = ({
  service,
  show,
  handleClose,
  refreshServices,
  isEditMode,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageFile: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);

  // Initialize form
  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title,
        description: service.description,
        imageFile: null,
      });
      setImagePreview(service.imageUrl || "");
    } else {
      // Reset for add mode
      setFormData({ title: "", description: "", imageFile: null });
      setImagePreview("");
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imageFile: file }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      if (formData.imageFile) {
        formDataToSend.append("image", formData.imageFile);
      }

      const url = isEditMode
        ? `YOUR_API_ENDPOINT/updateService/${service._id}`
        : `YOUR_API_ENDPOINT/createService`;

      const method = isEditMode ? "PUT" : "POST";

      await axios({
        method,
        url,
        data: formDataToSend,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      refreshServices();
      handleClose();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (isEditMode ? "Failed to update service" : "Failed to create service")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditMode ? "Edit Service" : "Add New Service"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title*</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Home Relocation"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description*</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the service..."
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <FaImage className="me-2" />
              Service Image
            </Form.Label>
            <div className="d-flex flex-column align-items-center">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: "none" }}
              />

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="img-thumbnail mb-2"
                  style={{
                    maxHeight: "150px",
                    maxWidth: "100%",
                  }}
                />
              )}

              <Button
                variant="outline-primary"
                onClick={triggerFileInput}
                className="d-flex align-items-center"
              >
                <FaUpload className="me-2" />
                {imagePreview ? "Change Image" : "Upload Image"}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={isLoading || !formData.title || !formData.description}
        >
          {isLoading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              {isEditMode ? "Updating..." : "Creating..."}
            </>
          ) : isEditMode ? (
            "Update Service"
          ) : (
            "Add Service"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditServiceModal;
