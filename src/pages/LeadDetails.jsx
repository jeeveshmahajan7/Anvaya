import { useParams } from "react-router-dom";
import Select from "react-select";

import useAnvayaContext from "../context/AnvayaContext";
import useFetch from "../hooks/useFetch";
import { useState } from "react";

const LeadDetails = () => {
  const { leadId } = useParams();
  const { leadsList, API, salesAgentsList } = useAnvayaContext();

  const [commentText, setCommentText] = useState("");
  const [commentAuthor, setCommentAuthor] = useState(null);
  const authorOptions = salesAgentsList?.map((agent) => ({
    value: `${agent._id}`,
    label: `${agent.name}`,
  }));

  const selectedLead = leadsList?.find((lead) => lead._id === leadId);
  const { data, loading, error } = useFetch(`${API}/leads/${leadId}/comments`);

  const commentsListing = data?.comments.map((comment) => (
    <li className="lead-list-item comment" key={comment._id}>
      <strong>{comment.author?.name}</strong> -{" "}
      {new Date(comment.createdAt).toLocaleString()} <br />
      Comment: {comment.commentText}
    </li>
  ));

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const addComment = async () => {
      try {
        const res = await fetch(`${API}/leads/${leadId}/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            commentText: `${commentText}`,
            author: `${commentAuthor.value}`,
          }),
        });

        if (!res.ok) {
          throw new Error("❌ Error adding the comment.");
        }

        const data = await res.json();
        console.log("✅ Comment added successfully:", data);
      } catch (error) {
        throw new Error(`❌ Failed to add comment: ${error.message}`);
      }
    };

    addComment();
  };

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
              <strong>Lead Status:</strong> {selectedLead?.status}
            </li>
            <li className="lead-list-item">
              <strong>Priority:</strong> {selectedLead?.priority}
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

      <div className="comment-section">
        <h2>Comments</h2>
        {loading ? (
          <p>Loading Comments...</p>
        ) : data?.comments?.length > 0 ? (
          <ul className="lead-list">{commentsListing}</ul>
        ) : (
          <p>No Comments yet.</p>
        )}
      </div>

      <h2 className="add-comment-header">Add a Comment:</h2>
      <form onSubmit={handleCommentSubmit}>
        <div>
          <label className="form-label" htmlFor="commentText">
            Comment:
          </label>
          <input
            id="commentText"
            type="text"
            placeholder="Type comment here..."
            className="form-control"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </div>
        <div>
          <label className="form-label" htmlFor="author">
            Author:
          </label>
          <Select
            id="author"
            options={authorOptions}
            placeholder="Select your name.."
            className="form-select-like"
            value={commentAuthor}
            onChange={(e) => setCommentAuthor(e)} // in case of Select, the e itself is the value
          />
        </div>
        <button className="btn btn-primary form-submit">Submit</button>
      </form>
    </>
  );
};

export default LeadDetails;
