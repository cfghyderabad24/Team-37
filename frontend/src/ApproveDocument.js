import React, { useState } from "react";
import axios from "axios";
import "./ApproveDocument.css";

const ApproveDocument = () => {
  const [documentId, setDocumentId] = useState("");
  const [approvalLevel, setApprovalLevel] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("documentId", documentId);
    formData.append("approvalLevel", approvalLevel);

    try {
      const response = await axios.post(
        "http://localhost:3000/documents/approve",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error approving document");
    }
  };

  return (
    <div className="approve-document-form">
      <h2>Approve Document</h2>
      <form onSubmit={handleSubmit}>
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
            value={approvalLevel}
            onChange={(e) => setApprovalLevel(e.target.value)}
            required
          />
        </div>
        <button type="submit">Approve</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ApproveDocument;
