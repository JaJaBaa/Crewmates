import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import "./EditCrewmate.css";

function EditCrewmate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [speed, setSpeed] = useState("medium");
  const [strength, setStrength] = useState("medium");
  const [intelligence, setIntelligence] = useState("medium");

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const attributes = {
    speed: ["slow", "medium", "fast"],
    strength: ["weak", "medium", "strong"],
    intelligence: ["low", "medium", "high"],
  };

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

      if (data) {
        setName(data.name);
        setRole(data.role);
        setSpeed(data.speed);
        setStrength(data.strength);
        setIntelligence(data.intelligence);
      }
    } catch (error) {
      console.error("Error fetching crewmate:", error);
      setError("Failed to load crewmate. The crewmate might not exist.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error } = await supabase
        .from("crewmates")
        .update({
          name,
          role,
          speed,
          strength,
          intelligence,
        })
        .eq("id", id);

      if (error) {
        throw error;
      }

      // Redirect to the crewmate details page
      navigate(`/crewmate/${id}`);
    } catch (error) {
      console.error("Error updating crewmate:", error);
      setError("Failed to update crewmate. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return <div className="loading">Loading crewmate data...</div>;
  }

  if (error && !isSubmitting) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <button
          onClick={() => navigate("/gallery")}
          className="btn btn-primary"
        >
          Back to Gallery
        </button>
      </div>
    );
  }

  return (
    <div className="edit-crewmate">
      <h1>Update Crewmate</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>

        <div className="attributes">
          <h2>Attributes</h2>

          {Object.entries(attributes).map(([attribute, values]) => (
            <div key={attribute} className="attribute-group">
              <label>
                {attribute.charAt(0).toUpperCase() + attribute.slice(1)}
              </label>
              <div className="attribute-options">
                {values.map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={
                      (attribute === "speed" && speed === value) ||
                      (attribute === "strength" && strength === value) ||
                      (attribute === "intelligence" && intelligence === value)
                        ? "attribute-option selected"
                        : "attribute-option"
                    }
                    onClick={() => {
                      if (attribute === "speed") setSpeed(value);
                      if (attribute === "strength") setStrength(value);
                      if (attribute === "intelligence") setIntelligence(value);
                    }}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="edit-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate(`/crewmate/${id}`)}
          >
            Cancel
          </button>
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Crewmate"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCrewmate;
