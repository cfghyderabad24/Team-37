//DocumentStatus.js
import React, { useState } from "react";
import axios from "axios";

const DocumentStatus = () => {
  const [documentId, setDocumentId] = useState("");
  const [document, setDocument] = useState(null);
  const [message, setMessage] = useState("");

  const handleCheckStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/documents/status/${documentId}`
      );
      setDocument(response.data);
    } catch (error) {
      setMessage("Error retrieving document status");
    }
  };

  return (
    <div>
      <h2>Check Document Status</h2>
      <div>
        <label>Document ID:</label>
        <input
          type="text"
          value={documentId}
          onChange={(e) => setDocumentId(e.target.value)}
        />
        <button onClick={handleCheckStatus}>Check Status</button>
      </div>
      {message && <p>{message}</p>}
      {document && (
        <div>
          <h3>Document Details:</h3>
          <p>Title: {document.title}</p>
          <p>Content: {document.content}</p>
          <p>Uploaded By: {document.uploadedBy}</p>
          <p>
            Upload Deadline:{" "}
            {new Date(document.uploadDeadline).toLocaleDateString()}
          </p>
          <p>Status: {document.status}</p>
        </div>
      )}
    </div>
  );
};

export default DocumentStatus;
