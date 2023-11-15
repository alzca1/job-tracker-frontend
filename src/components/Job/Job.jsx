import React from "react";

export default function Job({ jobData }) {
  const { companyName, position, dateApplied, status } = jobData;
  return (
    <div className="Job">
      <div className="job-info">
        <span>{position || "N/A"}</span>
        <span>{companyName || "N/A"}</span>
      </div>
      <div className="job-status-date">
        <span>{status || "N/A"}</span>
        <span>{dateApplied || "N/A"}</span>
      </div>
    </div>
  );
}
