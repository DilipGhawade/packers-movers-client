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
            <h6 className="card-subtitle mb-2 text-muted">20.01.08</h6>
            <p className="card-text">
              - consistent said lorem sed et ea consetetur said pacing pacing
              elit, sed lorem diam
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
            <h6 className="card-subtitle mb-2 text-muted">19.01.08</h6>
            <p className="card-text">
              - consistent said lorem sed et ea consetetur said pacing pacing
              elit, sed diam
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
            <p className="card-text">- Dolores et ea lorem said pacing elit</p>

            <div className="alert alert-primary">
              <h5 className="alert-heading">WELCOME TO OUR COMPANY!</h5>
              <p>
                This is a free XHTML/CSS-based website template designed by
                TemplatesLand.com
              </p>
            </div>

            <p className="card-text">
              - consistent said lorem sed et ea consetetur said consetetur said
              lorem sed et ea consetetur said pacing consetetur consetetur said
              lorem sed et ea consetetur said pacing consetetur pacing elit, sed
              diam
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
                <h5 className="card-title">
                  - Aosing etilDolores et ea consetetur
                </h5>
                <ul className="list-unstyled">
                  <li>- consistent said lorem sed et ea</li>
                  <li>- consistent said pacing consetetur</li>
                  <li>- pacing elit, sed diam consequat said</li>
                  <li>- lorem sed et ea consetetur said pacing</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">
                  - Aosing etilDolores et ea consetetur
                </h5>
                <ul className="list-unstyled">
                  <li>- consistent said lorem sed et ea</li>
                  <li>- consistent said pacing consetetur</li>
                  <li>- pacing elit, sed diam consequat said</li>
                  <li>- lorem sed et ea consetetur said pacing</li>
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
