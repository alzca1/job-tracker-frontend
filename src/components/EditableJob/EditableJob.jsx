import { Button, Form, Select } from "antd";
import React, { useEffect } from "react";
import { formatDate } from "../../helpers/date";
import { getToken } from "../../helpers/auth";
import { useMutation } from "react-query";
import { SaveOutlined } from "@ant-design/icons";
import axios from "axios";
import { useForm } from "antd/es/form/Form";

export default function EditableJob({ jobDetails, setJob }) {
  console.log("jobDetails", jobDetails);
  const { position, companyName, dateApplied, status, _id } = jobDetails;

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

  return (
    <Form onFinish={handleSubmit} name="editable-job-form">
      <div className="editable-job-card">
        <div className="editable-job-info">
          <Form.Item name="position">
            <input placeholder="Position" defaultValue={position} name="position" />
          </Form.Item>
          <Form.Item name="companyName">
            <input placeholder="Company Name" defaultValue={companyName} name="companyName" />
          </Form.Item>
        </div>
        <div className="editable-job-status-date">
          <Form.Item name="status">
            <Select
              size="large"
              dropdownStyle={{ backgroundColor: "#208E58", fontSize: "1.3rem" }}
              style={{ backgroundColor: "#208E58" }}
              bordered={false}
              placeholder="Status"
              suffixIcon={false}
              defaultValue={statusOptions.find((option) => option.value === status)?.value}
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
      <Button htmlType="submit">
        <SaveOutlined />
      </Button>
    </Form>
  );
}
