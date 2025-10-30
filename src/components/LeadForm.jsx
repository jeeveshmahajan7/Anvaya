import Select from "react-select";

import useAnvayaContext from "../context/AnvayaContext";
import Modal from "../components/Modal";
import { useState } from "react";

const LeadForm = () => {
  const { isLeadModalOpen, closeLeadModal } = useAnvayaContext();

  // creating multi-select dropdowns
  // for sales agent
  const salesAgentOptions = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "add", label: "Add these.." },
  ];
  const [selectedAgents, setSelectedAgents] = useState([]);
  const handleSalesAgentChange = (selectedOptions) => {
    setSelectedAgents(selectedOptions);
  };

  // for tags
  const tagsOptions = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "add", label: "Add these.." },
  ];
  const [selectedTags, setSelectedTags] = useState([]);
  const handleTagsChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
  };

  // handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission logic here
    console.log("Lead Form Submitted!");
    closeLeadModal();
  };

  return (
    <>
      <Modal isOpen={isLeadModalOpen} onClose={closeLeadModal}>
        <h2>Add New Lead</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="leadName" className="form-label">
              Lead Name:
            </label>
            <input id="leadName" type="text" className="form-control" />
          </div>
          <div>
            <label htmlFor="leadSource" className="form-label">
              Lead Source:
            </label>
            <select id="leadSource" className="form-select">
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Cold Call">Cold Call</option>
              <option value="Advertisement">Advertisement</option>
              <option value="Email">Email</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="salesAgent" className="form-label">
              Sales Agent:
            </label>
            <Select
              id="salesAgent"
              isMulti // to enable multi-selection
              options={salesAgentOptions}
              onChange={handleSalesAgentChange}
              value={selectedAgents}
              placeholder="Select Sales Agents.."
              className="form-select-like"
            />
          </div>
          <div>
            <label htmlFor="leadStatus" className="form-label">
              Lead Status:
            </label>
            <select id="leadStatus" className="form-select">
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div>
            <label htmlFor="priority" className="form-label">
              Priority:
            </label>
            <select id="priority" className="form-select">
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div>
            <label htmlFor="timeToClose" className="form-label">
              Time to Close:
            </label>
            <input
              type="number"
              placeholder="Input No. of Days"
              className="form-control"
            />
          </div>
          <div>
            <label htmlFor="tags" className="form-label">
              Tags:
            </label>
            <Select
              id="tags"
              isMulti // to enable multi-selection
              options={tagsOptions}
              onChange={handleTagsChange}
              value={selectedTags}
              placeholder="Select Tags.."
              className="form-select-like"
            />
          </div>

          <button className="btn btn-primary form-submit">Add Lead</button>
        </form>
      </Modal>
    </>
  );
};

export default LeadForm;
