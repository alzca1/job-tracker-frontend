import { useState } from "react";
import { formatDate } from "../../helpers/date";
import { Modal } from "antd";
import EditableJob from "../EditableJob/EditableJob";

export default function Job({ jobData }) {
  const { _id, companyName, position, dateApplied, status } = jobData;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobDetails, setJobDetails] = useState({
    _id: _id,
    companyName: companyName || "",
    position: position || "",
    dateApplied: dateApplied || "",
    status: status || "",
  });

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
        <span>{jobDetails?.position || "N/A"}</span>
        <span>{jobDetails?.companyName || "N/A"}</span>
      </div>
      <div className="job-status-date">
        <span>{jobDetails?.status || "N/A"}</span>
        <span>{formatDate(jobDetails?.dateApplied) || "N/A"}</span>
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
        <div>
          <EditableJob jobDetails={jobDetails} setJobDetails={setJobDetails} setTemporaryStatus={setTemporaryStatus} />
        </div>
      </Modal>
    </div>
  );
}
