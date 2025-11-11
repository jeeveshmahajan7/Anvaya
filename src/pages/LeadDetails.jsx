import { useParams } from "react-router-dom";

import useAnvayaContext from "../context/AnvayaContext";
import useFetch from "../hooks/useFetch";
import CommentBox from "../components/CommentBox";
import { useState } from "react";

const LeadDetails = () => {
  const { leadId } = useParams();
  const { leadsList, API } = useAnvayaContext();

  const [refreshComments, setRefreshComments] = useState(false); // state to toggle refresh comments

  const selectedLead = leadsList?.find((lead) => lead._id === leadId);
  const { data, loading, error } = useFetch(
    `${API}/leads/${leadId}/comments`,
    [refreshComments] // refreshComments passed down as dependency to trigger useFetch
  );

  const commentsListing = data?.comments.map((comment) => (
    <li className="lead-list-item comment" key={comment._id}>
      <strong>{comment.author?.name}</strong> -{" "}
      {new Date(comment.createdAt).toLocaleString()} <br />
      Comment: {comment.commentText}
    </li>
  ));

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

      <CommentBox
        leadId={leadId}
        onCommentAdded={() => setRefreshComments((prev) => !prev)} // function to toggle refresh comments passed down as prop
      />
    </>
  );
};

export default LeadDetails;
