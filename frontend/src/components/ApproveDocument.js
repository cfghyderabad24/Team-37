import React, { useState } from "react";
import axios from "axios";

const ApproveDocument = () => {
  const [documentId, setDocumentId] = useState("");
  const [level, setLevel] = useState("");
  const [message, setMessage] = useState("");

  const handleApprove = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/documents/approve/${documentId}/${level}`
      );
      setMessage(response.data.message || "Document approved successfully");
    } catch (error) {
      setMessage("Error approving document");
    }
  };

  return (
    <div>
      <h2>Approve Document</h2>
      <div>
        <label>Document ID:</label>
        <input
          type="text"
          value={documentId}
          onChange={(e) => setDocumentId(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Approval Level:</label>
        <input
          type="text"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          required
        />
      </div>
      <button onClick={handleApprove}>Approve</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ApproveDocument;
