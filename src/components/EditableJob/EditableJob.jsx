import { Button, Form, Select } from "antd";
import React, { useEffect } from "react";
import { formatDate } from "../../helpers/date";
import { getToken } from "../../helpers/auth";
import { useMutation } from "react-query";
import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import axios from "axios";

export default function EditableJob({ jobDetails, setJob, setIsModalOpen, setTemporaryStatus }) {
  console.log("jobDetails", jobDetails);
  const { position, companyName, dateApplied, status, _id } = jobDetails;

  const [form] = Form.useForm();

  const statusOptions = [
    { key: 1, value: "pending", name: "Pending" },
    { key: 2, value: "interview", name: "Interview" },
    { key: 3, value: "accepted", name: "Accepted" },
    { key: 4, value: "rejected", name: "Rejected" },
  ];

  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()?.token}`,
    },
  };

  const mutation = useMutation({
    mutationFn: (updatedJob) => {
      console.log("updatedJob", updatedJob);
      return axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/application/update`,
        updatedJob,
        headers
      );
    },
    onSuccess: (data, variables, context) => {
      console.log("data success", data, variables);
      setJob((prevState) => ({
        ...prevState,
        ...variables,
      }));
      setIsModalOpen(false);
    },
  });

  const handleSubmit = (data) => {
    if (data) {
      for (let item in data) {
        if (!data[item]) {
          delete data[item];
        }
      }
      data._id = _id;
      console.log(data);
      mutation.mutate(data);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleTemporaryChange = (status) => {
    setTemporaryStatus(status);
  };

  return (
    <div className="EditableJob">
      <Form onFinish={handleSubmit} name="editable-job-form">
        <div className="editable-job-card">
          <div className="editable-job-info">
            <Form.Item name="position">
              <input
                className="positionInput"
                placeholder="Position"
                defaultValue={position}
                name="position"
              />
            </Form.Item>
            <Form.Item name="companyName">
              <input
                className="companyNameInput"
                placeholder="Company Name"
                defaultValue={companyName}
                name="companyName"
              />
            </Form.Item>
          </div>
          <div className="editable-job-status-date">
            <Form.Item name="status">
              <Select
                size="large"
                dropdownStyle={{
                  backgroundColor: "inherit",
                  fontSize: "1.3rem",
                  backdropFilter: "blur(7px)",
                  fontWeight: "600 !important",
                  font: "1rem",
                }}
                style={{ backgroundColor: "inherit" }}
                bordered={false}
                placeholder="Status"
                suffixIcon={false}
                defaultValue={statusOptions.find((option) => option.value === status)?.value}
                onChange={handleTemporaryChange}
              >
                {statusOptions.map((option) => {
                  return (
                    <Select.Option key={option.key} value={option.value}>
                      {option.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <span className="date">{formatDate(dateApplied)}</span>
          </div>
        </div>
        <Button htmlType="submit" className="saveButton">
          <SaveOutlined type="submit" className="saveIcon" />
        </Button>
        <Button className="cancelButton" onClick={handleCancel}>
          <CloseOutlined className="cancelIcon" />
        </Button>
      </Form>
    </div>
  );
}
