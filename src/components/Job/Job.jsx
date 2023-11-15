import React from "react";
import { formatDate } from "../../helpers/date";

export default function Job({ jobData }) {
  console.log(jobData);
  const { companyName, position, dateApplied, status } = jobData;
  return (
    <div className="Job">
      <div className="job-info">
        <span>{position || "N/A"}</span>
        <span>{companyName || "N/A"}</span>
      </div>
      <div className="job-status-date">
        <span>{status || "N/A"}</span>
        <span>{formatDate(dateApplied) || "N/A"}</span>
      </div>
    </div>
  );
}
