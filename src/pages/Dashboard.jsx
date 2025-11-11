import { Link } from "react-router-dom";

import useAnvayaContext from "../context/AnvayaContext";
import LeadForm from "../components/LeadForm";

const Dashboard = () => {
  const { openLeadModal, leadsList } = useAnvayaContext();

  const newLeads = leadsList.filter((lead) => lead.status === "New");
  const contactedLeads = leadsList.filter(
    (lead) => lead.status === "Contacted"
  );
  const qualifiedLeads = leadsList.filter(
    (lead) => lead.status === "Qualified"
  );

  const leadsListing = leadsList?.map((lead) => (
    <li key={lead._id} className="lead-list-item">
      <Link to={`/lead/${lead._id}`}>
        <strong>{lead.name}</strong>
      </Link>
    </li>
  ));

  return (
    <>
      <h1>Anvaya CRM Dashboard</h1>

      <ul className="lead-list">{leadsListing}</ul>

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
        <p>
          Quick Filters: <button className="filter filter-new">New</button>{" "}
          <button className="filter filter-contacted">Contacted</button>
        </p>
        <button className="btn btn-primary" onClick={openLeadModal}>
          Add New Lead
        </button>

        <LeadForm />
      </div>
    </>
  );
};

export default Dashboard;
