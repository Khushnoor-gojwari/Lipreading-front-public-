
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./homepage"; // Your main page
import AccuracyPage from "./Accuracy"; // The page you want to navigate to

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/accuracy" element={<AccuracyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
