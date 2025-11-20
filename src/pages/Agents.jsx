import AgentForm from "../components/AgentForm";
import useAnvayaContext from "../context/AnvayaContext";

const Agents = () => {
  const { openFormModal, loadingAgents, errorAgents, salesAgentsList } =
    useAnvayaContext();

  const salesAgentListing = salesAgentsList?.map((agent, index) => (
    <li key={index}>
      <p>
        Agent: <strong>{agent.name}</strong> - {agent.email}
      </p>
    </li>
  ));

  return (
    <>
      <h1>Sales Agent Management</h1>
      <h2>Sales Agent List</h2>

      <ul className="lead-list">
        {loadingAgents ? (
          <li>Loading agents...</li>
        ) : errorAgents ? (
          <li>An error occured</li>
        ) : (
          salesAgentListing
        )}
      </ul>

      <button onClick={openFormModal} className="btn btn-primary">
        Add New Agent
      </button>

      <AgentForm />
    </>
  );
};

export default Agents;
