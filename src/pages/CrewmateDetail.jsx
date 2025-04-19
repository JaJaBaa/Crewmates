import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import "./CrewmateDetail.css";

function CrewmateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCrewmate();
  }, [id]);

  async function fetchCrewmate() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("crewmates")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }

      setCrewmate(data);
    } catch (error) {
      console.error("Error fetching crewmate:", error);
      setError(
        "Failed to load crewmate details. The crewmate might not exist."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this crewmate?")) {
      return;
    }

    try {
      const { error } = await supabase.from("crewmates").delete().eq("id", id);

      if (error) {
        throw error;
      }

      // Redirect to gallery after deletion
      navigate("/gallery");
    } catch (error) {
      console.error("Error deleting crewmate:", error);
      alert("Failed to delete crewmate. Please try again.");
    }
  }

  if (loading) {
    return <div className="loading">Loading crewmate details...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <Link to="/gallery" className="btn btn-primary">
          Back to Gallery
        </Link>
      </div>
    );
  }

  if (!crewmate) {
    return (
      <div className="error-container">
        <div className="error-message">Crewmate not found.</div>
        <Link to="/gallery" className="btn btn-primary">
          Back to Gallery
        </Link>
      </div>
    );
  }

  // Format the created date
  const createdDate = new Date(crewmate.created_at).toLocaleDateString();
  const createdTime = new Date(crewmate.created_at).toLocaleTimeString();

  return (
    <div className="crewmate-detail">
      <div className="detail-header">
        <h1>{crewmate.name}</h1>
        <p className="role">{crewmate.role}</p>
      </div>

      <div className="detail-card">
        <div className="detail-section">
          <h2>Attributes</h2>
          <div className="attribute-bars">
            <div className="attribute-bar">
              <span className="bar-label">Speed</span>
              <div className="bar-container">
                <div
                  className={`bar-fill ${crewmate.speed}`}
                  style={{
                    width:
                      crewmate.speed === "slow"
                        ? "33%"
                        : crewmate.speed === "medium"
                        ? "66%"
                        : "100%",
                  }}
                ></div>
              </div>
              <span className="bar-value">{crewmate.speed}</span>
            </div>

            <div className="attribute-bar">
              <span className="bar-label">Strength</span>
              <div className="bar-container">
                <div
                  className={`bar-fill ${crewmate.strength}`}
                  style={{
                    width:
                      crewmate.strength === "weak"
                        ? "33%"
                        : crewmate.strength === "medium"
                        ? "66%"
                        : "100%",
                  }}
                ></div>
              </div>
              <span className="bar-value">{crewmate.strength}</span>
            </div>

            <div className="attribute-bar">
              <span className="bar-label">Intelligence</span>
              <div className="bar-container">
                <div
                  className={`bar-fill ${crewmate.intelligence}`}
                  style={{
                    width:
                      crewmate.intelligence === "low"
                        ? "33%"
                        : crewmate.intelligence === "medium"
                        ? "66%"
                        : "100%",
                  }}
                ></div>
              </div>
              <span className="bar-value">{crewmate.intelligence}</span>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h2>Additional Information</h2>
          <div className="info-item">
            <span className="info-label">ID:</span>
            <span className="info-value">{crewmate.id}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Created:</span>
            <span className="info-value">
              {createdDate} at {createdTime}
            </span>
          </div>
        </div>

        <div className="detail-actions">
          <Link to="/gallery" className="btn btn-secondary">
            Back to Gallery
          </Link>
          <Link to={`/edit/${crewmate.id}`} className="btn btn-primary">
            Edit Crewmate
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete Crewmate
          </button>
        </div>
      </div>
    </div>
  );
}

export default CrewmateDetail;
