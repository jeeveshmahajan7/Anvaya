import { useEffect } from "react";
import AgentForm from "../components/AgentForm";
import useAnvayaContext from "../context/AnvayaContext";
import useFetch from "../hooks/useFetch";

const Agents = () => {
  const { openFormModal, API, setSalesAgentsList } = useAnvayaContext();
  const { data, loading, error } = useFetch(`${API}/agents`);

  useEffect(() => {
    if (data?.agents) {
      setSalesAgentsList(data.agents);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>An error occured!</p>;

  const salesAgentListing = data?.agents?.map((agent, index) => (
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

      <ul className="lead-list">{salesAgentListing}</ul>

      <button onClick={openFormModal} className="btn btn-primary">
        Add New Agent
      </button>

      <AgentForm />
    </>
  );
};

export default Agents;
