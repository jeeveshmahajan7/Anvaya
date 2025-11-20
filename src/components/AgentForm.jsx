import Modal from "./Modal";
import useAnvayaContext from "../context/AnvayaContext";
import { useState } from "react";
import { toast } from "react-toastify";

const AgentForm = () => {
  const { isFormModalOpen, closeFormModal, API, onAgentAdded } =
    useAnvayaContext();
  const [newAgentName, setNewAgentName] = useState("");
  const [newAgentEmail, setNewAgentEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const newAgentData = { name: newAgentName, email: newAgentEmail };

    try {
      const response = await fetch(`${API}/agents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAgentData),
      });

      if (!response.ok) {
        toast.error("Error adding agent!");
        return;
      }

      const result = await response.json();
      toast.success("Agent added successfully!");

      // close form modal on success
      closeFormModal();

      // clear input fields
      setNewAgentName("");
      setNewAgentEmail("");

      // trigger to refresh agents
      onAgentAdded();
    } catch (error) {
      toast.error("Error adding Agent!");
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
        </form>
      </Modal>
    </>
  );
};

export default AgentForm;
