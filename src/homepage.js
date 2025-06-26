import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Navbar,
  Nav,
  Card,
  Form,
  Spinner,
} from "react-bootstrap";

function HomePage() {
  const [videoList, setVideoList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState("");
  // const [videoUrl, setVideoUrl] = useState("");
  const [realText, setRealText] = useState("");
  const [predictedText, setPredictedText] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://lipreadingbackend-public-9.onrender.com/videos/")
      .then((res) => {
        setVideoList(res.data);
      })
      .catch((error) => {
        console.error("Error fetching video list:", error);
      });
  }, []);

  // const handleGenerate = async () => {
  //   if (!selectedVideo) {
  //     alert("Please select a video first");
  //     return;
  //   }

  //   setLoading(true);
  //   const formData = new FormData();
  //   formData.append("file", selectedVideo); // Ensure selectedVideo is a File object

  //   try {
  //     console.log("▶️ Sending request with:", selectedVideo);
  //     const res = await axios.post("https://lipreadingbackend-public-9.onrender.com/predict", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     console.log("✅ Response:", res.data);
  //     setRealText(res.data.real_text);
  //     setPredictedText(res.data.predicted_text);
  //     setVideoUrl(res.data.video_url);
  //   } catch (err) {
  //     console.error("❌ Error during generation:", err.response?.data || err.message);
  //     alert("Error generating subtitle. See console for more info.");
  //     setRealText("");
  //     setPredictedText("");
  //     setVideoUrl("");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleGenerate = async () => {
  if (!selectedVideo) {
    alert("Please select a video first");
    return;
  }

  setLoading(true);

  try {
    const res = await axios.post(
      "https://lipreadingbackend-public-9.onrender.com/predict",
      null, // no body
      { params: { video_name: selectedVideo } }
    );
    setRealText(res.data.real_text);
    setPredictedText(res.data.predicted_text);
  } catch (err) {
  if (err.response) {
    console.error("❌ Server responded with error:", err.response.data);
  } else if (err.request) {
    console.error("❌ No response received:", err.request);
  } else {
    console.error("❌ Error setting up request:", err.message);
  }
  alert("Error generating subtitle. Check console for more info.");
  setRealText("");
  setPredictedText("");

  } finally {
    setLoading(false);
  }
};


    const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar style={{ backgroundColor: "#74bef8" }} variant="black" expand="lg" sticky="top" className="mb-0 w-100">
        <Container>
          <Navbar.Brand href="#home" className="d-flex align-items-center gap-2" style={{ color: "white" }}>
            <h2 className="mb-0">
              <i className="fas fa-robot me-2"></i>
              LipReading
            </h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto" style={{ color: "#1c2667" }}>
              <Nav.Link href="#home" style={{ color: "#1c2667" }}>Home</Nav.Link>
              <Nav.Link href="#about" style={{ color: "#1c2667" }}>About</Nav.Link>
              <Nav.Link href="#try" style={{ color: "#1c2667" }}>Try LipReading</Nav.Link>
              <Nav.Link onClick={() => navigate("/accuracy")} style={{ color: "#1c2667", cursor: "pointer" }}>
                Go to Accuracy
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <section id="home" className="min-vh-100 d-flex align-items-center position-relative overflow-hidden mt-0">
        <div className="position-absolute w-100 h-100 mt-0" style={{
          backgroundImage: 'url("lip2.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}></div>
        <div className="position-absolute top-0 start-0 w-100 h-100 opacity-50"></div>
        <div className="container position-relative text-center text-white">
          <h1 className="display-3 fw-bold mb-4">Lip Reading with Deep Learning Technology</h1>
          <p className="lead mb-5">
            Decode speech from silent video using advanced neural networks.
            Empower communication accessibility through AI-driven visual speech recognition.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-primary btn-lg" onClick={() => scrollToSection("about")}>
              Explore How It Works
            </button>
            <button className="btn btn-outline-light btn-lg" onClick={() => scrollToSection("try")}>
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      <section id="about" className="mb-5 m-4">
        <h2 className="text-center mb-4">Understanding Lip Reading with Deep Learning</h2>
        <Card className="bg-light border-0 shadow-sm">
          <Card.Body className="p-4">
            <Row>
              <Col md={6}>
                <h3>What is AI-Based Lip Reading?</h3>
                <p>
                  <strong>Lip Reading using Deep Learning</strong> is a cutting-edge technology that interprets spoken language by analyzing lip movements in videos. It enables accurate transcription of speech without any audio.
                </p>
                <p>
                  This system is trained on thousands of video sequences to understand patterns in facial movement, making it incredibly useful for silent communication, surveillance, and accessibility for the hearing impaired.
                </p>
                <h4 className="mt-4">Key Features:</h4>
                <ul>
                  <li>Audio-independent speech recognition</li>
                  <li>Real-time processing of lip movements</li>
                  <li>Boosts accessibility for deaf and hard-of-hearing users</li>
                  <li>Enhances human-computer interaction in silent environments</li>
                </ul>
              </Col>
              <Col md={6} className="d-flex align-items-center justify-content-center">
                <div className="text-center">
                  <div className="zoom-container">
                    <img style={{ height: "350px", width: "450px" }} src="./lip.png" alt="Lip Reading AI" className="img-fluid rounded shadow-sm" />
                  </div>
                  <p className="mt-2 text-muted small">AI interprets lip movements to decode speech without sound</p>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </section>

<section id="try" className="m-4 mb-5">
  <Card className="shadow-lg border-0">
    <Card.Body className="p-5">
      <h2 className="text-center mb-4">🎬 Lip Reading Subtitle Generator</h2>
      <Form>
        <Form.Group className="mb-4">
          <Form.Label><strong>Select a Video File</strong></Form.Label>
          <Form.Select
            id="videoSelect"
            name="video_name"
            value={selectedVideo}
            onChange={(e) => {
              console.log("Selected video:", e.target.value);
              setSelectedVideo(e.target.value);
            }}
          >
            <option value="">-- Choose a video --</option>
            {videoList.map((video, idx) => (
              <option key={idx} value={video}>{video}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <div className="d-flex justify-content-center mb-4">
          <Button
            variant="primary"
            size="lg"
            onClick={handleGenerate}
            disabled={loading || !selectedVideo}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Generating...
              </>
            ) : (
              "Generate Subtitle"
            )}
          </Button>
        </div>
      </Form>

      <Row className="mt-4">
        <Col md={6}>
          <h5>📌 Real Text (Ground Truth)</h5>
          <Form.Control type="text" value={realText} readOnly className="bg-light" />
        </Col>
        <Col md={6}>
          <h5>🤖 Predicted Text</h5>
          <Form.Control type="text" value={predictedText} readOnly className="bg-light" />
        </Col>
      </Row>
    </Card.Body>
  </Card>
</section>

    </>
  );
}

export default HomePage;
