import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useAnvayaContext from "../context/AnvayaContext";

const LeadsByAgents = () => {
  const { leadsList, loadingLeads, errorLeads, salesAgentsList } =
    useAnvayaContext();
  const [selectedAgent, setSelectedAgent] = useState("All");
  const [leadsToRender, setLeadsToRender] = useState();
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  useEffect(() => {
    let filtered = leadsList;

    if (statusFilter !== "All") {
      filtered = filtered.filter((lead) => lead.status === statusFilter);
    }
    if (selectedAgent !== "All") {
      filtered = filtered.filter(
        (lead) => lead.salesAgent?.name === selectedAgent
      );
    }
    if (priorityFilter !== "All") {
      filtered = filtered.filter((lead) => lead.priority === priorityFilter);
    }

    setLeadsToRender(filtered);
  }, [leadsList, selectedAgent, statusFilter, priorityFilter]);

  const salesAgentsListing = salesAgentsList?.map((agent) => (
    <option key={agent._id} value={agent.name}>
      {agent.name}
    </option>
  ));

  const leadsListing = leadsToRender?.map((lead) => (
    <li key={lead._id}>
      <Link to={`/lead/${lead._id}`}>
        <strong>{lead.name}</strong> - {lead.status} - {lead.salesAgent.name}
      </Link>
    </li>
  ));

  const clearFilters = () => {
    setLeadsToRender(leadsList);
    setStatusFilter("All");
    setSelectedAgent("All");
    setPriorityFilter("All");
  };

  const sortLeads = () => {
    if (!leadsToRender) return;

    let sorted = [...leadsToRender];
    sorted = sorted.sort((a, b) => a.timeToClose - b.timeToClose);

    setLeadsToRender(sorted);
  };

  if (loadingLeads || !leadsToRender) return <p>Loading leads...</p>;
  if (errorLeads) return <p>Leads not found.</p>;

  return (
    <>
      <h1>Leads by Agents</h1>

      <h2>Lead List by Agents</h2>
      <div className="leads-by-dropdown">
        <label htmlFor="agent" className="form-label">
          Agent:
        </label>

        <select
          id="agent"
          className="form-select"
          onChange={(e) => setSelectedAgent(e.target.value)}
          value={selectedAgent}
        >
          <option key={"All"} value="All">
            All
          </option>
          {salesAgentsListing}
        </select>
      </div>

      <ul className="lead-list">
        {leadsToRender && leadsToRender.length > 0 ? (
          leadsListing
        ) : (
          <li>No leads found for the selected filters.</li>
        )}
      </ul>

      <div>
        Filters:
        <div className="row">
          <div className="col">
            <div className="filter-group">
              <label htmlFor="statusFilter" className="form-label">
                Status:
              </label>
              <select
                onChange={(e) => setStatusFilter(e.target.value)}
                id="statusFilter"
                className="form-select"
                value={statusFilter}
              >
                <option value="All">All</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="priorityFilter" className="form-label">
                Priority:
              </label>
              <select
                onChange={(e) => setPriorityFilter(e.target.value)}
                id="priorityFilter"
                className="form-select"
                value={priorityFilter}
              >
                <option value="All">All</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
          <div className="col">
            <button
              className="filter filter-clear"
              onClick={() => clearFilters()}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <div>
        Sort By:
        <div className="row">
          <div className="col">
            <button
              className="sort sort-close"
              onClick={() => sortLeads("timeToClose")}
            >
              Time to Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadsByAgents;
