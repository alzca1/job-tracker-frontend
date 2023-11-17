import React, { useState } from "react";
import { formatDate } from "../../helpers/date";
import { Modal, Select } from "antd";
import EditableJob from "../EditableJob/EditableJob";

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
        <EditableJob jobDetails={jobData} />
      </Modal>
    </div>
  );
}
