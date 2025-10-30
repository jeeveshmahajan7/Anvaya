import useAnvayaContext from "../context/AnvayaContext";
import LeadForm from "../components/LeadForm";

const Leads = () => {
  const { openLeadModal } = useAnvayaContext();
  return (
    <>
      <h1>Lead List</h1>

      <h2>Lead Overview</h2>
      <ul className="lead-list">
        <li>[Lead 1] - [New] - [John Doe]</li>
        <li>[Lead 2] - [Qualified] - [Jane]</li>
        <li>[Lead 3] - [Proposal Sent] - [Mark]</li>
      </ul>

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
