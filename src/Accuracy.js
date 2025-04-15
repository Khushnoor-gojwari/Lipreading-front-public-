

import React, { useState } from "react";
import {
  Button,
  Spinner,
  Card,
  Navbar,
  Nav,
  Container,
  Col,
  Row,

} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AccuracyPage = () => {
  const [accuracy, setAccuracy] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const checkAccuracy = async (force = false) => {
    setLoading(true);
    const res = await axios.get("http://localhost:8000/calculate-accuracy", {
      params: { force },
    });
    setAccuracy(res.data);
    setLoading(false);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar
        // bg="black"
        style={{ backgroundColor: "#74bef8" }}
        variant="black"
        expand="lg"
        sticky="top"
        className="mb-0 w-100"
      >
        <Container>
          <Navbar.Brand
            href="#home"
            className="d-flex align-items-center gap-2"
            style={{ color: "white" }}
          >
            <h2 className="mb-0">
              <i className="fas fa-robot me-2"></i>
              LipReading
            </h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto" style={{ color: "gray" }}>
              <Nav.Link
                onClick={() => navigate("/")}
                style={{ color: "gray", cursor: "pointer" }}
              >
                Home
              </Nav.Link>

              <Nav.Link href="#about" style={{ color: "gray" }}>
                About
              </Nav.Link>
              <Nav.Link href="#accuracy" className="text-secondary">
                Calculate Accuracy
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <section
        id="home"
        className="min-vh-100 d-flex align-items-center position-relative overflow-hidden mt-0"
      >
        {/* Background image */}
        <div
          className="position-absolute w-100 h-100 mt-0"
          style={{
            backgroundImage: 'url("dl.jpg")',

            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Dark overlay */}
        <div className="position-absolute top-0 start-0 w-100 h-100  opacity-50"></div>

        {/* Content */}
        <div className="container position-relative text-center text-white">
          <h1 className="display-3 fw-bold mb-4  ">
            Accuracy Calculation of Lip Reading
          </h1>
          <p className="lead mb-5">
            Decode speech from silent video using advanced neural networks.
            Empower communication accessibility through AI-driven visual speech
            recognition.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => scrollToSection("about")}
            >
              Explore How It Works
            </button>
          </div>
        </div>
      </section>

      <section id="about" className="mb-5 m-4">
        <h2 className="text-center mb-4">
          Understanding the Accuracy of Lip Reading
        </h2>
        <Card className="shadow-lg mt-4">
          <Card.Body>
            <Row>
              <Col md={6}>
                <bold>
                  <h3 className="mb-3"> How Accuracy is Calculated ?</h3>
                </bold>
                <p>
                  The accuracy of the lip reading model is calculated by
                  evaluating it on the entire test dataset of videos. For each
                  video:
                </p>
                <ul>
                  <li>We extract the real transcript from alignment files.</li>
                  <li>
                    The model predicts a sequence of characters from the video
                    input.
                  </li>
                  <li>
                    Both <strong>character-level</strong> and{" "}
                    <strong>word-level</strong> edit distances are computed
                    using Levenshtein distance.
                  </li>
                  <li>
                    Accuracy is calculated using the formula:
                    <br />
                    <code>(1 - EditDistance / TotalLength) * 100</code>
                  </li>
                </ul>
                <p>This gives us two key metrics:</p>
                <ul>
                  <li>
                    <strong>✔ Character Accuracy</strong>: Measures how
                    accurately each individual letter is predicted.
                  </li>
                  <li>
                    <strong>✔ Word Accuracy</strong>: Measures how accurately
                    whole words are formed.
                  </li>
                </ul>
                <p className="text-muted mt-3">
                  Accuracy is saved after first calculation and can be
                  recalculated anytime using the "Recalculate" button.
                </p>
              </Col>

              <Col
                md={6}
                className="d-flex align-items-center justify-content-center"
              >
                <div className="text-center">
                  <div className="zoom-container">
                    <img
                      style={{ height: "350px", width: "450px" }}
                      src="acc.jpg"
                      alt="Lip Reading AI"
                      className="img-fluid rounded shadow-sm"
                    />
                  </div>
                  <p className="mt-2 text-muted small">
                    Accuracy of Lip Reading
                  </p>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </section>

      <section className="mb-5 m-4" id="accuracy">
        <Card className="shadow-lg border-0">
          <Card.Body className="p-5 text-center">
            <div className="text-center mt-5">
              <h2 className="mb-0 ml-4">📊 Accuracy Checker</h2>
              <div className="d-flex justify-content-center gap-3 mt-4 mb-3">
                <Button
                  variant="primary"
                  onClick={() => checkAccuracy(false)}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Loading...
                    </>
                  ) : (
                    "Check Accuracy"
                  )}
                </Button>

                <Button
                  variant="warning"
                  onClick={() => checkAccuracy(true)}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Recalculating...
                    </>
                  ) : (
                    "🔄 Recalculate"
                  )}
                </Button>
              </div>
              <h3>Recalculate time : 15min Approx</h3>

              {accuracy && (
                <div className="mt-4">
                  <h4>
                    ✔ Character Accuracy:{" "}
                    {accuracy.character_accuracy.toFixed(2)}%
                  </h4>
                  <h4>✔ Word Accuracy: {accuracy.word_accuracy.toFixed(2)}%</h4>
                </div>
              )}
            </div>
          </Card.Body>
        </Card>
      </section>

      <footer className="bg-black w-100 mt-5 overflow-hidden py-5">
  <h2 className="text-center font-semibold text-lg mb-4 text-white">Contributors</h2>
  <hr className="bg-light" />

  <div className="container">
    <div className="row justify-content-center text-center">
      {/* Contributor 1 */}
      <div className="col-md-3 d-flex flex-column align-items-center mb-4">
        <img
          src="khushnoor.png"
          alt="Contributor 1"
          style={{ width: "200px", height: "200px" }}
          className="rounded-circle mb-2 object-fit-cover"
        />
        <p className="fw-bold text-white mb-1">Khushnoor Farooq</p>
        <p className="text-sm" style={{ color: "#74bef8" }}>kkhatim43@gmail.com</p>
        <a
          href="https://www.linkedin.com/in/khushnoor-g-8633bb214/"
          className="text-primary text-sm"
          style={{ textDecoration: "none" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>

      {/* Contributor 2 */}
      <div className="col-md-3 d-flex flex-column align-items-center mb-4">
        <img
          src="khushnoor.png"
          alt="Contributor 2"
          style={{ width: "200px", height: "200px" }}
          className="rounded-circle mb-2 object-fit-cover"
        />
        <p className="fw-bold text-white mb-1">Jahanzaib</p>
        <p className="text-sm" style={{ color: "#74bef8" }}>jahanzaibgojwari@gmail.com</p>
        <a
          href="https://www.linkedin.com/in/rajpatel"
          className="text-primary text-sm"
          style={{ textDecoration: "none" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>

      {/* Contributor 3 */}
      <div className="col-md-3 d-flex flex-column align-items-center mb-4">
        <img
          src="khushnoor.png"
          alt="Contributor 3"
          style={{ width: "200px", height: "200px" }}
          className="rounded-circle mb-2 object-fit-cover"
        />
        <p className="fw-bold text-white mb-1">Waseem</p>
        <p className="text-sm" style={{ color: "#74bef8" }}>kkhatim43@gmail.com</p>
        <a
          href="https://www.linkedin.com/in/khushnoor-g-8633bb214/"
          className="text-primary text-sm"
          style={{ textDecoration: "none" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </div>
  </div>

  <hr className="bg-light" />
  <h4 className="text-center text-white">2025 @ Lip Reading — All rights reserved</h4>
</footer>

    </>
  );
};

export default AccuracyPage;
