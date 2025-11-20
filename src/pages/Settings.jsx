import { useState } from "react";
import useAnvayaContext from "../context/AnvayaContext";
import { Link } from "react-router-dom";

const Settings = () => {
  const {
    leadsList,
    salesAgentsList,
    loadingLeads,
    errorLeads,
    loadingAgents,
    errorAgents,
    API,
    setRefreshLeads,
  } = useAnvayaContext();

  const deleteLead = async (leadId) => {
    try {
      const res = await fetch(`${API}/leads/${leadId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("❌ Failed to delete the lead.");
      }

      const result = await res.json();
      console.log(result);

      setRefreshLeads(prev => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  const leadsListing = leadsList?.map((lead) => (
    <li key={lead._id}>
      <div className="row">
        <div className="col">
          <Link to={`/lead/${lead._id}`}>
            <strong>{lead.name}</strong> - {lead.status} -{" "}
            {lead.salesAgent.name}
          </Link>
        </div>
        <div className="col">
          <button
            className="btn btn-danger"
            onClick={() => deleteLead(lead._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  ));

  const salesAgentListing = salesAgentsList?.map((agent, index) => (
    <li key={index}>
      <p>
        Agent:<strong>{agent.name}</strong>- {agent.email}
      </p>
    </li>
  ));

  if (loadingLeads || loadingAgents) return <p>Loading...</p>;
  if (errorLeads || errorAgents) return <p>Error loading data.</p>;

  return (
    <>
      <h1>Settings</h1>
      <h2>Leads List</h2>
      <ul className="lead-list">{leadsListing}</ul>

      <h2>Agents List</h2>
      <ul className="lead-list">{salesAgentListing}</ul>
    </>
  );
};

export default Settings;
