import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import { authApi } from "../../../Service/api";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false); // ✅ New state

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Optionally restrict mobile input to digits only
    const finalValue =
      name === "mobileNumber" ? value.replace(/\D/g, "") : value;

    setFormdata((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is Required";

    if (!formData.mobileNumber)
      newErrors.mobileNumber = "Mobile Number is Required";
    if (!formData.email) {
      newErrors.email = "Email id is Required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.message)
      newErrors.message =
        "Please provide your message for better understanding";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const hanldeSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setError("");

    try {
      const contactData = {
        name: formData.name,
        email: formData.email,
        mobileNmber: formData.mobileNumber, // ✅ backend expects typo, for now
        message: formData.message,
      };

      await authApi.contact(contactData);
      toast.success(`Contact saved successfully`);
      setIsSubmitted(true); // ✅ Show success message instead of form
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(`Error while submitting the form: ${error.message}`);
      setError(error.message || "Failed to save contact form");
    }
  };

  return (
    <Container className="my-5 d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={8} lg={6} xl={5}>
          <Card className="shadow-sm border-0 rounded-4 overflow-hidden">
            <Card.Body className="p-4 p-sm-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold mb-2">Contact Us</h2>
                <p className="text-muted">
                  If you have any query or need more information about the
                  service, please contact us by filling out the form below.
                </p>
              </div>

              {error && (
                <Alert variant="danger" className="mb-4">
                  {error}
                </Alert>
              )}

              {isSubmitted ? (
                <Alert variant="success" className="text-center">
                  <h4 className="fw-bold">Thank you!</h4>
                  <p>
                    You have contacted us successfully. Our team will get back
                    to you soon.
                  </p>
                  <Link to="/" className="btn btn-primary mt-3">
                    Go to Home
                  </Link>
                </Alert>
              ) : (
                <Form onSubmit={hanldeSubmit}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>
                      Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      isInvalid={!!errors.name}
                      onChange={handleChange}
                      placeholder="Enter Your Name"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>
                      Email Id <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      placeholder="Enter Your Email id"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="mobileNumber">
                    <Form.Label>
                      Mobile Number <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      pattern="\d*"
                      inputMode="numeric"
                      placeholder="Enter 10-digit mobile number"
                      maxLength="10"
                      isInvalid={!!errors.mobileNumber}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.mobileNumber}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="message">
                    <Form.Label>
                      Message <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="message"
                      value={formData.message}
                      isInvalid={!!errors.message}
                      onChange={handleChange}
                      placeholder="Enter your message here"
                      rows={4}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 py-2 fw-medium mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Submit Form...
                      </>
                    ) : (
                      "Submit Form"
                    )}
                  </Button>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
