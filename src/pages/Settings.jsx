import { useState } from "react";
import useAnvayaContext from "../context/AnvayaContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

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
  // state to manage loading state
  const [isDeleting, setIsDeleting] = useState("");

  const deleteLead = async (leadId) => {
    setIsDeleting(leadId); // start loading
    try {
      const res = await fetch(`${API}/leads/${leadId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        toast.error("Failed to delete the lead!");
        return;
      }

      const result = await res.json();

      toast.success("Successfully deleted the lead!");

      setRefreshLeads((prev) => !prev);
    } catch (error) {
      toast.error("Failed to delete the lead!");
    } finally {
      setIsDeleting("");
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
            className="btn btn-danger delete-lead-btn"
            onClick={() => deleteLead(lead._id)}
            disabled={isDeleting === lead._id}
          >
            {isDeleting === lead._id ? (
              <>
                <span className="spinner"></span> Loading...
              </>
            ) : (
              "Delete"
            )}
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

  return (
    <>
      <h1>Settings</h1>
      <h2>Leads List</h2>
      <ul className="lead-list">
        {loadingAgents ? <li>Loading leads..</li> : leadsListing}
      </ul>

      <h2>Agents List</h2>
      <ul className="lead-list">
        {loadingAgents ? <li>Loading agents...</li> : salesAgentListing}
      </ul>
    </>
  );
};

export default Settings;
