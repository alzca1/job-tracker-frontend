import React, { useState } from "react";
import { formatDate } from "../../helpers/date";
import { Modal, Select } from "antd";

export default function Job({ jobData }) {
  console.log(jobData);
  const { companyName, position, dateApplied, status } = jobData;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dropDownStyle = { backgroundColor: "#208E58 !important" };
  return (
    <div className="Job" onDoubleClick={() => setIsModalOpen(true)}>
      <div className="job-info">
        <span>{position || "N/A"}</span>
        <span>{companyName || "N/A"}</span>
      </div>
      <div className="job-status-date">
        <span>{status || "N/A"}</span>
        <span>{formatDate(dateApplied) || "N/A"}</span>
      </div>
      <Modal
        open={isModalOpen}
        maskClosable={true}
        footer={null}
        destroyOnClose={true}
        onCancel={() => setIsModalOpen(false)}
        closeIcon={false}
        className="job-edit"
      >
        <div className="editable-job-card">
          <div className="editable-job-info">
            <input placeholder="Position"></input>
            <input placeholder="Company Name"></input>
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
              <Select.Option key="1">pending</Select.Option>
              <Select.Option key="2">interview</Select.Option>
              <Select.Option key="3">accepted</Select.Option>
              <Select.Option key="4">rejected</Select.Option>
            </Select>
            <span className="date">Date</span>
          </div>
        </div>
      </Modal>
    </div>
  );
}
