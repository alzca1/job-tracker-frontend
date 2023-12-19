import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import { getToken } from "../../helpers/auth";
import JobPanel from "../../components/JobPanel/JobPanel";
import InitialJobForm from "../../components/Forms/InitialJobForm";

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
        open={isModalOpen}
        maskClosable={true}
        footer={null}
        onCancel={handleShowModal}
        destroyOnClose={true}
      >
        <InitialJobForm handleShowModal={handleShowModal} setJobs={setJobs} />
      </Modal>
    </div>
  );
}
