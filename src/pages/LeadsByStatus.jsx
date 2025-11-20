import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAnvayaContext from "../context/AnvayaContext";

const LeadsByStatus = () => {
  const { leadsList, loadingLeads, errorLeads, salesAgentsList } =
    useAnvayaContext();
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [leadsToRender, setLeadsToRender] = useState();
  const [agentFilter, setAgentFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  useEffect(() => {
    let filtered = leadsList;

    if (selectedStatus !== "All") {
      filtered = filtered.filter((lead) => lead.status === selectedStatus);
    }
    if (agentFilter !== "All") {
      filtered = filtered.filter(
        (lead) => lead.salesAgent?.name === agentFilter
      );
    }
    if (priorityFilter !== "All") {
      filtered = filtered.filter((lead) => lead.priority === priorityFilter);
    }

    setLeadsToRender(filtered);
  }, [leadsList, selectedStatus, agentFilter, priorityFilter]);

  const leadsListing = leadsToRender?.map((lead) => (
    <li key={lead._id}>
      <Link to={`/lead/${lead._id}`}>
        <strong>{lead.name}</strong> - {lead.status} - {lead.salesAgent.name}
      </Link>
    </li>
  ));

  const clearFilters = () => {
    setLeadsToRender(leadsList);
    setSelectedStatus("All");
    setAgentFilter("All");
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
      <h1>Leads by Status</h1>

      <h2>Lead List by Status</h2>
      <div className="leads-by-dropdown">
        <label htmlFor="status" className="form-label">
          Status:
        </label>

        <select
          id="status"
          className="form-select"
          onChange={(e) => setSelectedStatus(e.target.value)}
          value={selectedStatus}
        >
          <option value="All">All</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Proposal Sent">Proposal Sent</option>
          <option value="Closed">Closed</option>
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
              <label htmlFor="agentFilter" className="form-label">
                Sales Agent:
              </label>
              <select
                onChange={(e) => setAgentFilter(e.target.value)}
                id="agentFilter"
                className="form-select"
                value={agentFilter}
              >
                <option key="All" value="All">
                  All
                </option>
                {salesAgentsList?.map((agent) => (
                  <option key={agent._id} value={agent.name}>
                    {agent.name}
                  </option>
                ))}
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

export default LeadsByStatus;
