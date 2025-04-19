import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from "../supabaseClient";
import "./Gallery.css";

function Gallery() {
  const [crewmates, setCrewmates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCrewmates();
  }, []);

  async function fetchCrewmates() {
    try {
      console.log("Fetching crewmates...");
      setLoading(true);

      const { data, error } = await supabase
        .from("crewmates")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase fetch error:", error);
        throw error;
      }

      console.log("Crewmates fetched successfully:", data);
      setCrewmates(data || []);
    } catch (error) {
      console.error("Error fetching crewmates:", error);
      setError(`Failed to load crewmates: ${error.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this crewmate?")) {
      return;
    }

    try {
      const { error } = await supabase.from("crewmates").delete().eq("id", id);

      if (error) {
        throw error;
      }

      // Update the crewmates list after deletion
      setCrewmates(crewmates.filter((crewmate) => crewmate.id !== id));
    } catch (error) {
      console.error("Error deleting crewmate:", error);
      alert("Failed to delete crewmate. Please try again.");
    }
  }

  return (
    <div className="gallery">
      <h1>Crewmate Gallery</h1>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading crewmates...</div>
      ) : crewmates.length === 0 ? (
        <div className="empty-gallery">
          <p>No crewmates found. Create your first crewmate!</p>
          <Link to="/create" className="btn btn-primary">
            Create a Crewmate
          </Link>
        </div>
      ) : (
        <div className="crewmate-grid">
          {crewmates.map((crewmate) => (
            <div key={crewmate.id} className="crewmate-card">
              <h2>{crewmate.name}</h2>
              <p className="role">{crewmate.role}</p>

              <div className="attributes">
                <div className="attribute">
                  <span className="attribute-label">Speed:</span>
                  <span className="attribute-value">{crewmate.speed}</span>
                </div>
                <div className="attribute">
                  <span className="attribute-label">Strength:</span>
                  <span className="attribute-value">{crewmate.strength}</span>
                </div>
                <div className="attribute">
                  <span className="attribute-label">Intelligence:</span>
                  <span className="attribute-value">
                    {crewmate.intelligence}
                  </span>
                </div>
              </div>

              <div className="crewmate-actions">
                <Link to={`/crewmate/${crewmate.id}`} className="view-btn">
                  View
                </Link>
                <Link to={`/edit/${crewmate.id}`} className="edit-btn">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(crewmate.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;
