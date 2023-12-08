import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import { getToken } from "../../helpers/auth";
import JobForm from "../../components/JobForm/JobForm";
import JobPanel from "../../components/JobPanel/JobPanel";
import BlankJob from "../../components/Auth/BlankJob/BlankJob";

export default function UserHome() {
  const userInfo = getToken();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState([]);

  const handleShowModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="UserHome">
      <h2>Welcome back, {userInfo.name}!</h2>
      <JobPanel handleShowModal={handleShowModal} jobs={jobs} setJobs={setJobs} />

      <Modal
        className="addJobModal"
        title="Add job"
        open={isModalOpen}
        maskClosable={true}
        footer={null}
        onCancel={handleShowModal}
        destroyOnClose={true}
      >
        {/* <JobForm handleShowModal={handleShowModal} setJobs={setJobs} /> */}
        <BlankJob setJobs={setJobs} />
      </Modal>
    </div>
  );
}
