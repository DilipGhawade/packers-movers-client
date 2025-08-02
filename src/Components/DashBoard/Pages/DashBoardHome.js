import { useState } from "react";

const DashBoardHome = () => {
  // State to manage which news items are expanded
  const [expandedNews, setExpandedNews] = useState({});

  const toggleNews = (id) => {
    setExpandedNews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <div className="container mt-4">
      {/* LATEST NEWS Section */}
      <section className="mb-5">
        <h2 className="mb-4">LATEST NEWS</h2>

        {/* News Item 1 */}
        <div className="card mb-3">
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">29-07-2025</h6>
            <p className="card-text">
              New Branch Opening! We’re excited to announce our new branch in
              Mumbai to serve you better with seamless relocation services.
              <button
                className="btn btn-link p-0 text-decoration-none"
                onClick={() => toggleNews("news1")}
              >
                {expandedNews["news1"] ? " | less" : " | more"}
              </button>
            </p>
            <div className={`collapse ${expandedNews["news1"] ? "show" : ""}`}>
              <div className="card card-body bg-light">
                <p>
                  Additional details about this news item. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </p>
                <p>More information can go here when expanded.</p>
              </div>
            </div>
          </div>
        </div>

        {/* News Item 2 */}
        <div className="card mb-3">
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">19.07.2025</h6>
            <p className="card-text">
              Special Discount Offer! Avail 10% off on all packing and moving
              services booked this month. Limited slots available!
              <button
                className="btn btn-link p-0 text-decoration-none"
                onClick={() => toggleNews("news2")}
              >
                {expandedNews["news2"] ? " | less" : " | more"}
              </button>
            </p>
            <div className={`collapse ${expandedNews["news2"] ? "show" : ""}`}>
              <div className="card card-body bg-light">
                <p>
                  Additional details about this older news item. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi
                  ut aliquip ex ea commodo consequat.
                </p>
                <p>More historical information can go here when expanded.</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-4" />
      </section>

      {/* TESTIMONIALS Section */}
      <section className="mb-5">
        <h2 className="mb-4">TESTIMONIALS</h2>

        <div className="card mb-3">
          <div className="card-body">
            <p className="card-text">
              - Professional, efficient, and hassle-free! The team handled my
              relocation with care. Highly recommended!" – Rahul Sharma, Delhi
            </p>

            <div className="alert alert-primary">
              <h5 className="alert-heading">WELCOME TO OUR COMPANY!</h5>
              <p>
                Your trusted partner for safe, affordable, and stress-free
                packing and moving services across India. With 10+ years of
                experience, we ensure your belongings reach their destination
                securely.
              </p>
            </div>

            <p className="card-text">
              Why Choose Us? ✓ Fully Insured & Licensed ✓ Expert Handling of
              Fragile Items ✓ Door-to-Door Relocation ✓ 24/7 Customer Support ✓
              Competitive Pricing
              <a href="#" className="text-decoration-none">
                {" "}
                | more
              </a>
            </p>
          </div>
        </div>

        <hr className="my-4" />
      </section>

      {/* OUR SERVICES Section */}
      <section>
        <h2 className="mb-4">OUR SERVICES</h2>

        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Domestic Relocation</h5>
                <ul className="list-unstyled">
                  <li>
                    <strong>Home Shifting</strong> – Safe, timely, and
                    affordable relocation for families.
                  </li>
                  <li>
                    <strong>Office Moving</strong> – Minimal downtime with
                    expert handling of equipment/files.
                  </li>
                  <li>
                    <strong>Packing Services</strong> – Custom solutions using
                    premium materials (boxes, bubble wrap).
                  </li>
                  <li>
                    <strong>Car/Bike Transport</strong> – Insured door-to-door
                    vehicle transportation.
                  </li>
                  <li>
                    <strong>Labor Assistance</strong> – Skilled manpower for
                    loading/unloading.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Specialized Services</h5>
                <ul className="list-unstyled">
                  <li>
                    <strong>International Moving</strong> – Documentation,
                    customs clearance, and global logistics.
                  </li>
                  <li>
                    <strong>Storage Solutions</strong> – Short/long-term secure
                    storage facilities.
                  </li>
                  <li>
                    <strong>Pet Relocation</strong> – Stress-free transport for
                    pets with compliance.
                  </li>
                  <li>
                    <strong>Fragile Handling</strong> – Art, antiques, and
                    electronics packed with extra care.
                  </li>
                  <li>
                    <strong>Insurance</strong> – Full coverage for damaged/lost
                    items.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashBoardHome;
