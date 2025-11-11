import Select from "react-select";
import { useState } from "react";

import useAnvayaContext from "../context/AnvayaContext";

const CommentBox = ({leadId, onCommentAdded}) => {
  const [commentText, setCommentText] = useState("");
  const [commentAuthor, setCommentAuthor] = useState(null);
  const { salesAgentsList, API } = useAnvayaContext();

  const authorOptions = salesAgentsList?.map((agent) => ({
    value: `${agent._id}`,
    label: `${agent.name}`,
  }));

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

        // refresh form fields
        setCommentText("");
        setCommentAuthor(null);

        // trigger parent (LeadDetails) to refresh comments
        onCommentAdded();
      } catch (error) {
        throw new Error(`❌ Failed to add comment: ${error.message}`);
      }
    };

    addComment();
  };

  return (
    <>
      <div className="comment-box">
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
      </div>
    </>
  );
};

export default CommentBox;
