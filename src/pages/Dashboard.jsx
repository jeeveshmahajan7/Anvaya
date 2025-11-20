import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import useAnvayaContext from "../context/AnvayaContext";
import LeadForm from "../components/LeadForm";

const Dashboard = () => {
  const { openLeadModal, leadsList, loadingLeads, errorLeads } =
    useAnvayaContext();
  const [leadsToRender, setLeadsToRender] = useState();

  useEffect(() => {
    setLeadsToRender(leadsList);
  }, [leadsList]);

  const newLeads = leadsList.filter((lead) => lead.status === "New");
  const contactedLeads = leadsList.filter(
    (lead) => lead.status === "Contacted"
  );
  const qualifiedLeads = leadsList.filter(
    (lead) => lead.status === "Qualified"
  );

  const leadsListing = leadsToRender?.map((lead) => (
    <li key={lead._id} className="lead-list-item">
      <Link to={`/lead/${lead._id}`}>
        <strong>{lead.name}</strong>
      </Link>
    </li>
  ));

  const filterLeads = (statusValue) => {
    const filteredLeads = leadsList.filter(
      (lead) => lead.status === statusValue
    );

    setLeadsToRender(filteredLeads);
  };

  const clearFilters = () => {
    setLeadsToRender(leadsList);
  };

  return (
    <>
      <h1>Anvaya CRM Dashboard</h1>

      <ul className="lead-list">
        {loadingLeads ? (
          <li>Loading leads...</li>
        ) : errorLeads ? (
          <li>No leads found!</li>
        ) : leadsListing?.length > 0 ? (
          leadsListing
        ) : (
          <li>No leads found for selected filters.</li>
        )}
      </ul>
      <div>
        <h2>Lead Status</h2>
        <ul className="lead-list">
          <li className="lead-list-item">New: {newLeads.length} Leads</li>
          <li className="lead-list-item">
            Contacted: {contactedLeads.length} Leads
          </li>
          <li className="lead-list-item">
            Qualified: {qualifiedLeads.length} Leads
          </li>
        </ul>
      </div>
      <div>
        <div>
          Quick Filters:{" "}
          <div className="row">
            <div className="col">
              <button
                className="filter filter-new"
                onClick={() => filterLeads("New")}
              >
                New
              </button>{" "}
              <button
                className="filter filter-contacted"
                onClick={() => filterLeads("Contacted")}
              >
                Contacted
              </button>
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

        <button className="btn btn-primary" onClick={openLeadModal}>
          Add New Lead
        </button>

        <LeadForm />
      </div>
    </>
  );
};

export default Dashboard;
