import { useState } from "react";
import { Modal } from "antd";
import { getToken } from "../../helpers/auth";
import JobPanel from "../../components/JobPanel/JobPanel";
import InitialJobDetailsForm from "../../components/Forms/InitialJobDetailsForm";

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
        <InitialJobDetailsForm handleShowModal={handleShowModal} setJobs={setJobs} />
      </Modal>
    </div>
  );
}
