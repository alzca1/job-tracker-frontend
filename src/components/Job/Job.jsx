import React, { useEffect, useState } from "react";
import { formatDate } from "../../helpers/date";
import { Modal, Select } from "antd";
import EditableJob from "../EditableJob/EditableJob";

export default function Job({ jobData, setJobs }) {
  const { companyName, position, dateApplied, status, jobUrl, _id, userId } = jobData;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [job, setJob] = useState({
    _id: _id,
    companyName: companyName,
    position: position,
    dateApplied: dateApplied,
    status: status,
    jobUrl: jobUrl,
    userId: userId,
  });

  useEffect(() => {
    console.log("job updated", job);
  }, [job]);

  return (
    <div className="Job" onDoubleClick={() => setIsModalOpen(true)}>
      <div className="job-info">
        <span>{job?.position || "N/A"}</span>
        <span>{job?.companyName || "N/A"}</span>
      </div>
      <div className="job-status-date">
        <span>{job?.status || "N/A"}</span>
        <span>{formatDate(job?.dateApplied) || "N/A"}</span>
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
        <EditableJob jobDetails={jobData} setJob={setJob} />
      </Modal>
    </div>
  );
}
