import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import useAnvayaContext from "../context/AnvayaContext";
import LeadForm from "../components/LeadForm";

const Leads = () => {
  const {
    openLeadModal,
    leadsList,
    salesAgentsList,
    loadingLeads,
    errorLeads,
  } = useAnvayaContext();
  const [statusFilter, setStatusFilter] = useState("All");
  const [agentFilter, setAgentFilter] = useState("All");
  const [leadsToRender, setLeadsToRender] = useState();

  const filterLeads = (status, agent) => {
    let filtered = leadsList;
    // if filter by lead is selected
    if (status !== "All") {
      filtered = filtered.filter((lead) => lead.status === status);
    }
    //if filter by agent is selected
    // both will be applied one by one if both are selected
    if (agent !== "All") {
      filtered = filtered.filter((lead) => lead.salesAgent?.name === agent);
    }

    return filtered;
  };

  useEffect(() => {
    const filtered = filterLeads(statusFilter, agentFilter);
    setLeadsToRender(filtered);
  }, [statusFilter, agentFilter, leadsList]);

  const leadsListing = leadsToRender?.map((lead) => (
    <li key={lead._id}>
      <Link to={`/lead/${lead._id}`}>
        <strong>{lead.name}</strong> - {lead.status} - {lead.salesAgent.name}
      </Link>
    </li>
  ));

  const clearFilters = () => {
    setLeadsToRender(leadsList);
    setAgentFilter("All");
    setStatusFilter("All");
  };

  const sortLeads = (sortValue) => {
    if (!leadsToRender) return;

    let sorted = [...leadsToRender];

    if (sortValue === "priority") {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      sorted.sort(
        (a, b) =>
          (priorityOrder[a.priority] || 999) -
          (priorityOrder[b.priority] || 999)
      );
    }

    if (sortValue === "timeToClose") {
      sorted.sort((a, b) => a.timeToClose - b.timeToClose);
    }

    setLeadsToRender(sorted); // updated state to trigger re-render
  };

  if (loadingLeads || !leadsToRender) return <p>Loading leads...</p>;
  if (errorLeads) return <p>Leads not found.</p>;

  return (
    <>
      <h1>Lead List</h1>

      <h2>Lead Overview</h2>
      <ul className="lead-list">
        {leadsToRender?.length > 0 ? (
          leadsListing
        ) : (
          <p>No leads match the selected filters.</p>
        )}
      </ul>

      <div>
        <div>
          Filter By:
          <div className="row">
            <div className="col">
              <div className="filter-group">
                <label htmlFor="statusFilter" className="form-label">
                  Lead Status:
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
            </div>
            <div className="col">
              <button
                onClick={() => clearFilters()}
                className="filter filter-clear"
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
                className="sort sort-priority"
                onClick={() => sortLeads("priority")}
              >
                Priority
              </button>
              <button
                className="sort sort-close"
                onClick={() => sortLeads("timeToClose")}
              >
                Time to Close
              </button>
            </div>
          </div>
        </div>

        <button className="btn btn-primary" onClick={openLeadModal}>
          Add New Lead
        </button>

        <LeadForm />
      </div>
    </>
  );
};

export default Leads;
