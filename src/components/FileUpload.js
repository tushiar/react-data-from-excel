import React from "react";

const FileUpload = ({ onFileUpload }) => {
  return (
    <div>
      <div className="mb-3">
        <label htmlFor="formFile" className="form-label">
          Import Excel File
        </label>
        <input
          className="form-control"
          type="file"
          id="formFile"
          onChange={onFileUpload}
          accept=".xls, .xlsx"
        />
      </div>
    </div>
  );
};

export default FileUpload;
