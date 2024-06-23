import React, { useState } from "react";
import axios from "axios";
import "./UploadForm.css";
import Sidebar from "./Sidebar";

const UploadForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [uploadedBy, setUploadedBy] = useState("");
  const [grant, setGrant] = useState("");
  const [uploadDeadline, setUploadDeadline] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("uploadedBy", uploadedBy);
    formData.append("Grant", grant);
    formData.append("uploadDeadline", uploadDeadline);
    formData.append("pdfFile", pdfFile);

    try {
      const response = await axios.post(
        "http://localhost:3000/documents/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error uploading document");
    }
  };

  return (
    <div className="upload-form">
      <h2>Upload Document</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Uploaded By:</label>
          <input
            type="text"
            value={uploadedBy}
            onChange={(e) => setUploadedBy(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Grant:</label>
          <input
            type="text"
            value={grant}
            onChange={(e) => setGrant(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Upload Deadline:</label>
          <input
            type="date"
            value={uploadDeadline}
            onChange={(e) => setUploadDeadline(e.target.value)}
            required
          />
        </div>
        <div>
          <label>PDF File:</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf"
            required
          />
        </div>
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadForm;
