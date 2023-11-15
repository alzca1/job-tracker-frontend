import { Button, DatePicker, Form, Input, Select } from "antd";
import axios from "axios";
import React from "react";
import { useMutation } from "react-query";
import { getToken } from "../../helpers/auth";

const dateFormat = "DD/MM/YYYY";

export default function JobForm({ handleShowModal, setJobs }) {
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()?.token}`,
    },
  };
  const mutation = useMutation({
    mutationFn: (job) => {
      return axios.post(`${import.meta.env.VITE_BACKEND_URL}/application/create`, job, headers);
    },
    onSuccess: (data, variables, context) => {
      const job = data.data.newApplication;
      job._id = Date.now();
      setJobs((prevState) => [...prevState, job]);
      handleShowModal();
    },
  });

  const handleSubmit = (data) => {
    console.log("jobform data", data);
    mutation.mutate(data);
  };

  return (
    <div className="JobForm">
      <Form
        name="addJobForm"
        layout="vertical"
        size="medium"
        className="addJob-form"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Company"
          name="companyName"
          rules={[{ required: true, message: "Please input the company name!" }]}
        >
          <Input placeholder="Enter company name..." />
        </Form.Item>
        <Form.Item
          label="Position"
          name="position"
          rules={[{ required: true, message: "Please input the company name!" }]}
        >
          <Input placeholder="Enter position..." />
        </Form.Item>
        <Form.Item
          label="Date applied"
          name="dateApplied"
          rules={[{ required: true, message: "Please input the application date!" }]}
        >
          <DatePicker style={{ width: "100%" }} format={dateFormat} />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please input the company name!" }]}
        >
          <Select
            placeholder="Select status"
            style={{ width: "100%" }}
            options={[
              { value: "pending", label: "Pending" },
              { value: "interview", label: "Interviewed" },
              { value: "accepted", label: "Accepted" },
              { value: "rejected", label: "Rejected" },
            ]}
          ></Select>
        </Form.Item>
        <Form.Item label="Job URL" name="jobURL">
          <Input placeholder="Enter job URL..." />
        </Form.Item>
        <Button onClick={handleShowModal}>Cancel</Button>
        <Button htmlType="submit">Save job</Button>
      </Form>
    </div>
  );
}

//"pending", "interview", "accepted", "rejected"
