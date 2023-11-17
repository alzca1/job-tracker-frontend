import { Select } from "antd";
import React from "react";

export default function EditableJob({ jobDetails }) {
  const { position, companyName, dateApplied, status } = jobDetails;

  const statusOptions = [
    { key: 1, value: "pending", name: "Pending" },
    { key: 2, value: "interview", name: "Interview" },
    { key: 3, value: "accepted", name: "Accepted" },
    { key: 4, value: "rejected", name: "Rejected" },
  ];

  return (
    <div className="editable-job-card">
      <div className="editable-job-info">
        <input placeholder="Position" defaultValue={position} name="position" />
        <input placeholder="Company Name" defaultValue={companyName} name="companyName" />
      </div>
      <div className="editable-job-status-date">
        <Select
          size="large"
          dropdownStyle={{ backgroundColor: "#208E58", fontSize: "1.3rem" }}
          style={{ backgroundColor: "#208E58" }}
          bordered={false}
          placeholder="Status"
          suffixIcon={false}
        >
          {statusOptions.map((option) => {
            return (
              <Select.Option key={option.key} value={option.value}>
                {option.name}
              </Select.Option>
            );
          })}
        </Select>
        <span className="date">{dateApplied}</span>
      </div>
    </div>
  );
}
