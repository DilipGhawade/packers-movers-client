import { useState } from "react";
import CustomCarousel from "./homeslider/customSlider.js";
import images from "../../data/images.js";
import { Form, Alert, Button, Spinner } from "react-bootstrap";
import { authApi } from "../../Service/api.js";
import { useNavigate, Navigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticte, setAuthenticte] = useState(authApi.isAuthenticte);

  if (isAuthenticte) {
    return <Navigate to="/dashboard" replace />;
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // Basic Validation
    if (!formData.email || !formData.password) {
      setError("Please Enter both email and password");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await authApi.login({
        email: formData.email,
        password: formData.password,
      });
      if (response.data.statusCode === 200) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(`Failed to login error : ${error.message}`);
      setError(
        error.message ||
          "Login failed. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const launchRegister = () => {
    navigate("/register");
  };

  return (
    <div
      className="container mt-5"
      style={{ minHeight: "calc(100vh - 100px)" }}
    >
      <div className="row align-items-center h-100">
        {/* Carousel - Left Side */}
        <div className="col-md-8 mb-4 h-100">
          <div className="carouselContainer h-100">
            <CustomCarousel>
              {images.map((image, index) => (
                <div key={index} className="d-flex justify-content-center">
                  <img
                    src={image.imgURL}
                    alt={image.imgAlt}
                    className="img-fluid h-100"
                    style={{ width: "auto", maxWidth: "100%" }}
                  />
                </div>
              ))}
            </CustomCarousel>
          </div>
        </div>

        {/* Login Form  */}
        <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xxl-4">
          <div
            className="card shadow border-0 rounded-4 overflow-hidden mx-auto"
            style={{ maxWidth: "450px" }}
          >
            <div className="card-body p-4 p-sm-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold mb-2 ">Welcome Back</h2>
                <p className="text-muted mb-0">
                  Sign in to access your account
                </p>
              </div>
              {error && (
                <Alert varient="danger" className="mb-4">
                  {error}
                </Alert>
              )}

              {/*Email password login form */}
              <Form onSubmit={handleLogin} className="mt-4">
                <Form.Group className="mb-3 " controlId="formBasicEmail">
                  <Form.Label className="fw-medium">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter Your email"
                    className="py-2 px-3"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <div className="d-flex justify-content-between align-items-center">
                    <Form.Label className="fw-medium mb-1">
                      Password{" "}
                    </Form.Label>
                    <a
                      href="#forgot-password"
                      className="text-decoration-none small text-primary"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="input-group">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className="py-2 px-3"
                      required
                    />
                    <button
                      className="btn btn-outline-secondary border-start-0 border d-flex align-items-center justify-content-center"
                      type="button"
                      onClick={togglePasswordVisibility}
                      aria-label={
                        showPassword ? "Hide Password" : "Show Password"
                      }
                      style={{ minWidth: "45px" }}
                    >
                      <i
                        className={`bi bi-eye${
                          showPassword ? "-slash" : ""
                        } fs-5 icon-black`}
                      ></i>
                    </button>
                  </div>
                </Form.Group>
                <p className="text-center mt-4">
                  {" "}
                  Don't have an account?{" "}
                  <a
                    href="#register"
                    className="text-decoration-none small text-primary"
                    onClick={() => launchRegister()}
                  >
                    Register
                  </a>
                </p>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 py-2 fw-medium mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner
                        as={"span"}
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Signing in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
