import Modal from "./Modal";
import useAnvayaContext from "../context/AnvayaContext";
import { useState } from "react";

const AgentForm = () => {
  const { isFormModalOpen, closeFormModal, API, onAgentAdded } =
    useAnvayaContext();
  const [newAgentName, setNewAgentName] = useState("");
  const [newAgentEmail, setNewAgentEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const newAgentData = { name: newAgentName, email: newAgentEmail };

    try {
      const response = await fetch(`${API}/agents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify(newAgentData),
      });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const result = await response.json();
      console.log("✅ Agent added successfully:", result);

      // close form modal on success
      closeFormModal();

      // clear input fields
      setNewAgentName("");
      setNewAgentEmail("");

      // trigger to refresh agents
      onAgentAdded();
    } catch (error) {
      console.error("❌ Error adding Agent:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal isOpen={isFormModalOpen} onClose={closeFormModal}>
        <h2>Add New Agent</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="agentName" className="form-label">
              Agent Name:
            </label>
            <input
              type="text"
              id="agentName"
              className="form-control"
              value={newAgentName}
              onChange={(e) => setNewAgentName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="agentEmail" className="form-label">
              Email Address:
            </label>
            <input
              type="email"
              id="agentEmail"
              className="form-control"
              value={newAgentEmail}
              onChange={(e) => setNewAgentEmail(e.target.value)}
            />
          </div>
          <button
            className="btn btn-primary form-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Agent"}
          </button>
          {error && <p className="text-danger">Error: {error}</p>}
        </form>
      </Modal>
    </>
  );
};

export default AgentForm;
