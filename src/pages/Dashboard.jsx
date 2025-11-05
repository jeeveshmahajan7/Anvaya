import { Link } from "react-router-dom";

import useAnvayaContext from "../context/AnvayaContext";
import LeadForm from "../components/LeadForm";

const Dashboard = () => {
  const { openLeadModal, leadsList } = useAnvayaContext();

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
          <li className="lead-list-item">New: 5 Leads</li>
          <li className="lead-list-item">Contacted: 3 Leads</li>
          <li className="lead-list-item">Qualified: 2 Leads</li>
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
