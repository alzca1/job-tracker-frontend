import React, { useState } from "react";
import { formatDate } from "../../helpers/date";
import { Modal } from "antd";
import EditableJob from "../EditableJob/EditableJob";

export default function Job({ jobData, setJobs }) {
  const { companyName, position, dateApplied, status } = jobData;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [temporaryStatus, setTemporaryStatus] = useState(status);

  const stateColors = {
    pending: "#10A4FF",
    interview: "#FF8C00",
    accepted: "#3CB371",
    rejected: "#ff6b6dff",
  };

  const modalStyles = {
    header: {},
    body: {
      background: "red",
      backgroundColor: stateColors[temporaryStatus],
      transition: "all 1s",
    },
    mask: {
      backdropFilter: "blur(10px)",
    },
    footer: {
      borderTop: "1px solid #333",
      backgroundColor: stateColors[temporaryStatus],
      transition: "all 1s",
    },
    content: {
      backgroundColor: stateColors[temporaryStatus],
      transition: "all 1s",
    },
  };

  return (
    <div
      className="Job"
      onDoubleClick={() => setIsModalOpen(true)}
      style={{ backgroundColor: stateColors[status] }}
    >
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
        // className="job-edit"
        styles={modalStyles}
      >
        <EditableJob jobData={jobData} setJobs={setJobs} />
      </Modal>
    </div>
  );
}
