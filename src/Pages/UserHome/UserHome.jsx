import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import { getToken } from "../../helpers/auth";
import JobForm from "../../components/JobForm/JobForm";
import { useMutation } from "react-query";

export default function UserHome() {
  const navigate = useNavigate();
  const userInfo = getToken();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="UserHome">
      <h2>Welcome back, {userInfo.name}!</h2>
      <Button type="primary" onClick={handleShowModal}>
        Add Job
      </Button>
      <Modal
        className="addJobModal"
        title="Add job"
        open={isModalOpen}
        maskClosable={true}
        footer={null}
        onCancel={handleShowModal}
        destroyOnClose={true}
      >
        <JobForm handleShowModal={handleShowModal} />
      </Modal>
    </div>
  );
}
