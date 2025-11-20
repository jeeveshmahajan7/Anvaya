import Select from "react-select";
import { useState } from "react";

import useAnvayaContext from "../context/AnvayaContext";
import { toast } from "react-toastify";

const CommentBox = ({ leadId, onCommentAdded }) => {
  const [commentText, setCommentText] = useState("");
  const [commentAuthor, setCommentAuthor] = useState(null);
  const { salesAgentsList, API } = useAnvayaContext();
  // state to manage add comment loading state
  const [isAddingComment, setIsAddingComment] = useState(false);

  const authorOptions = salesAgentsList?.map((agent) => ({
    value: `${agent._id}`,
    label: `${agent.name}`,
  }));

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const addComment = async () => {
      setIsAddingComment(true); // loading starts
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
          toast.error("Error adding the comment!");
          return;
        }

        const data = await res.json();
        toast.success("Comment added successfully!");

        // refresh form fields
        setCommentText("");
        setCommentAuthor(null);

        // trigger parent (LeadDetails) to refresh comments
        onCommentAdded();
      } catch (error) {
        toast.error(`Failed to add comment!`);
      } finally {
        setIsAddingComment(false); // loading stops
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
              className="form-control commentText-input"
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
          <button
            className="btn btn-primary form-submit"
            disabled={isAddingComment}
          >
            {isAddingComment ? (
              <>
                <span className="spinner"></span>Commenting...
              </>
            ) : (
              "Add Comment"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default CommentBox;
