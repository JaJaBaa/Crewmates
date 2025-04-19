import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import "./CreateCrewmate.css";

function CreateCrewmate() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [speed, setSpeed] = useState("medium");
  const [strength, setStrength] = useState("medium");
  const [intelligence, setIntelligence] = useState("medium");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const attributes = {
    speed: ["slow", "medium", "fast"],
    strength: ["weak", "medium", "strong"],
    intelligence: ["low", "medium", "high"],
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      console.log("Attempting to create crewmate:", {
        name,
        role,
        speed,
        strength,
        intelligence,
      });

      const { data, error } = await supabase
        .from("crewmates")
        .insert([
          {
            name,
            role,
            speed,
            strength,
            intelligence,
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Crewmate created successfully:", data);
      // Redirect to the gallery page after successful creation
      navigate("/gallery");
    } catch (error) {
      console.error("Error creating crewmate:", error);
      setError(
        `Failed to create crewmate: ${error.message || "Unknown error"}`
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="create-crewmate">
      <h1>Create a New Crewmate</h1>

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

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Crewmate"}
        </button>
      </form>
    </div>
  );
}

export default CreateCrewmate;
