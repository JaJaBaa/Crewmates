import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <h1>Welcome to Crewmates</h1>
      <p>Build and manage your dream team of characters!</p>

      <div className="home-actions">
        <Link to="/create" className="btn btn-primary">
          Create a Crewmate
        </Link>
        <Link to="/gallery" className="btn btn-secondary">
          View Gallery
        </Link>
      </div>

      <div className="home-info">
        <div className="info-card">
          <h2>Create</h2>
          <p>Design your own custom crewmates with unique attributes.</p>
        </div>
        <div className="info-card">
          <h2>Manage</h2>
          <p>Edit, update, or remove crewmates from your collection.</p>
        </div>
        <div className="info-card">
          <h2>View</h2>
          <p>See detailed information about each crewmate in your team.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
