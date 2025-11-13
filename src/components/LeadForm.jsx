import Select from "react-select";
import { useState, useEffect } from "react";

import useAnvayaContext from "../context/AnvayaContext";
import Modal from "../components/Modal";

const LeadForm = ({ leadId, leadDetails }) => {
  const { API, isLeadModalOpen, closeLeadModal, salesAgentsList, onLeadAdded } =
    useAnvayaContext();
  const [leadName, setLeadName] = useState("");
  const [leadSource, setLeadSource] = useState("Website");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [leadStatus, setLeadStatus] = useState("New");
  const [leadPriority, setLeadPriority] = useState("Medium");
  const [timeToClose, setTimeToClose] = useState(1);
  const [selectedTags, setSelectedTags] = useState([]);

  // creating multi-select dropdowns
  // for sales agent
  const salesAgentOptions = salesAgentsList?.map((agent) => ({
    value: `${agent._id}`,
    label: `${agent.name}`,
  }));

  useEffect(() => {
    if (!selectedAgent && salesAgentOptions?.length) {
      setSelectedAgent(salesAgentOptions[0]);
    }
  }, [salesAgentOptions]);

  // for tags
  const tagsOptions = [
    { value: "High Value", label: "High Value" },
    { value: "Follow-up", label: "Follow-up" },
    { value: "High Interest", label: "High Interest" },
    { value: "Needs Approval", label: "Needs Approval" },
    { value: "Uninterested", label: "Uninterested" },
  ];
  const handleTagsChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
  };

  // Pre-fill form fields if leadId is present (opening LeadForm in editing mode)
  useEffect(() => {
    if (leadDetails) {
      setLeadName(leadDetails?.name || "");
      setLeadSource(leadDetails?.source || "Website");
      setSelectedAgent(
        leadDetails?.salesAgent
          ? {
              value: leadDetails.salesAgent._id,
              label: leadDetails.salesAgent.name,
            }
          : null
      );
      setLeadStatus(leadDetails?.status || "New");
      setLeadPriority(leadDetails?.priority || "Medium");
      setTimeToClose(leadDetails?.timeToClose || 1);
      setSelectedTags(
        leadDetails?.tags?.map((tag) => ({ value: tag, label: tag }))
      ) || [];
    }
  }, [leadDetails]);

  // handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    const url = leadDetails ? `${API}/leads/${leadId}` : `${API}/leads`;

    const submitLead = async () => {
      try {
        const res = await fetch(url, {
          method: leadDetails ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: leadName,
            source: leadSource,
            salesAgent: selectedAgent?.value || null,
            status: leadStatus,
            tags: selectedTags.map((tag) => tag.value),
            timeToClose: Number(timeToClose),
            priority: leadPriority,
          }),
        });

        if (!res.ok) {
          throw new Error("❗️ Error creating the lead.");
        }

        const data = await res.json();
        console.log(
          `✅ Lead ${leadDetails ? "updated" : "created"} successfully!`
        );

        // refresh leads
        onLeadAdded();
      } catch (error) {
        console.error(
          `❌ Failed to ${leadDetails ? "update" : "create"} lead:`,
          error
        );
      }
    };

    submitLead();
    closeLeadModal();
  };

  return (
    <>
      <Modal isOpen={isLeadModalOpen} onClose={closeLeadModal}>
        <h2>{leadDetails ? "Edit Lead Details" : "Add New Lead"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="leadName" className="form-label">
              Lead Name:
            </label>
            <input
              id="leadName"
              type="text"
              className="form-control"
              value={leadName}
              onChange={(e) => setLeadName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="leadSource" className="form-label">
              Lead Source:
            </label>
            <select
              id="leadSource"
              className="form-select"
              value={leadSource}
              onChange={(e) => setLeadSource(e.target.value)}
            >
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
              options={salesAgentOptions}
              onChange={(event) => setSelectedAgent(event)} // in case of the Select react-select, the event itself is the value
              value={selectedAgent}
              placeholder="Select Sales Agent.."
              className="form-select-like"
            />
          </div>
          <div>
            <label htmlFor="leadStatus" className="form-label">
              Lead Status:
            </label>
            <select
              id="leadStatus"
              className="form-select"
              value={leadStatus}
              onChange={(e) => setLeadStatus(e.target.value)}
            >
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
            <select
              id="priority"
              className="form-select"
              value={leadPriority}
              onChange={(e) => setLeadPriority(e.target.value)}
            >
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
              value={timeToClose}
              onChange={(e) => setTimeToClose(e.target.value)}
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

          <button className="btn btn-primary form-submit">
            {leadDetails ? "Update Lead" : "Add Lead"}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default LeadForm;
