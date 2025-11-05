import { useParams } from "react-router-dom";

import useAnvayaContext from "../context/AnvayaContext";

const LeadDetails = () => {
  const { leadId } = useParams();
  const { leadsList } = useAnvayaContext();

  const selectedLead = leadsList?.find((lead) => lead._id === leadId);

  return (
    <>
      <h1>Lead Details</h1>
      {selectedLead ? (
        <>
          <ul className="lead-list">
            <li className="lead-list-item">
              <strong>Lead Name:</strong> {selectedLead?.name}
            </li>
            <li className="lead-list-item">
              <strong>Sales Agent:</strong> {selectedLead?.salesAgent?.name}
            </li>
            <li className="lead-list-item">
              <strong>Lead Source:</strong> {selectedLead?.source}
            </li>
            <li className="lead-list-item">
              <strong>Lead Status:</strong> {selectedLead?.priority}
            </li>
            <li className="lead-list-item">
              <strong>Priority:</strong> {selectedLead?.status}
            </li>
            <li className="lead-list-item">
              <strong>Time to Close:</strong> {selectedLead?.timeToClose} days
            </li>
          </ul>
          <button className="btn btn-primary">Edit Lead Details</button>
        </>
      ) : (
        <p>Loading Lead Details...</p>
      )}

      <h2>Comments</h2>
    </>
  );
};

export default LeadDetails;
