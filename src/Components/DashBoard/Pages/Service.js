import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { authApi } from "../../../Service/api";
import QuoteModal from "./QuoteModel";

const Service = () => {
  const [services, setServices] = useState([]);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const isEmail = localStorage.getItem("email");
  console.log(`the user email is ${isEmail}`);

  // Fetch services on load
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await authApi.getAllServices(isEmail);
        console.log(`the service response is :${res}`);

        setServices(res.data.allService);
      } catch (err) {
        console.error("Failed to fetch services", err);
      }
    };
    fetchServices();
  }, [isEmail]);

  return (
    <div className="container mt-4">
      <h2>Our Services</h2>
      <div className="row">
        {services.map((service) => (
          <div key={service._id} className="col-md-4 mb-3">
            <Card>
              <Card.Img
                variant="top"
                src={`http://localhost:7000${service.imageUrl}`}
                alt={service.title}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{service.title}</Card.Title>
                <Card.Text>{service.description}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => {
                    console.log(`The clicked service is ${service}`);

                    setSelectedService(service);
                    setShowQuoteModal(true);
                  }}
                >
                  Request Quote
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Modal for quotation */}
      {selectedService && (
        <QuoteModal
          show={showQuoteModal}
          onHide={() => setShowQuoteModal(false)}
          serviceId={selectedService._id}
        />
      )}
    </div>
  );
};

export default Service;
