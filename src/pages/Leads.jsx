import { Link } from "react-router-dom";

import useAnvayaContext from "../context/AnvayaContext";
import LeadForm from "../components/LeadForm";

const Leads = () => {
  const { openLeadModal, leadsList } = useAnvayaContext();

  const leadsListing = leadsList?.map((lead) => (
    <li key={lead._id}>
      <Link to={`/lead/${lead._id}`}>
        <strong>{lead.name}</strong> - {lead.status} - {lead.salesAgent.name}
      </Link>
    </li>
  ));

  return (
    <>
      <h1>Lead List</h1>

      <h2>Lead Overview</h2>
      <ul className="lead-list">{leadsListing}</ul>

      <div>
        <p>
          Filters: <button className="filter filter-status">Status</button>{" "}
          <button className="filter filter-agent">Sales Agent</button>
        </p>
        <p>
          Sort By: <button className="sort sort-priority">Priority</button>{" "}
          <button className="sort sort-close">Time to Close</button>
        </p>
        <button className="btn btn-primary" onClick={openLeadModal}>
          Add New Lead
        </button>

        <LeadForm />
      </div>
    </>
  );
};

export default Leads;
