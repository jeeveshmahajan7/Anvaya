import AgentForm from "../components/AgentForm";
import useAnvayaContext from "../context/AnvayaContext";

const Agents = () => {
  const { openFormModal } = useAnvayaContext();

  return (
    <>
      <h1>Sales Agent Management</h1>
      <h2>Sales Agent List</h2>

      <ul className="lead-list">
        <li>Agent: [John Doe] - [Email]</li>
        <li>Agent: [Jane Smith] - [Email]</li>
      </ul>

      <button onClick={openFormModal} className="btn btn-primary">
        Add New Agent
      </button>

      <AgentForm />
    </>
  );
};

export default Agents;
