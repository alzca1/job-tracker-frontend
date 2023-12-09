import { SaveOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import useFormInstance from "antd/es/form/hooks/useFormInstance";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { getToken } from "../../helpers/auth";
import axios from "axios";

const statusOptions = [
  { key: 1, value: "pending", name: "Pending" },
  { key: 2, value: "interview", name: "Interview" },
  { key: 3, value: "accepted", name: "Accepted" },
  { key: 4, value: "rejected", name: "Rejected" },
];

const now = dayjs();
const dateFormat = "DD/MM/YYYY";

export default function BasicDetails({ formStatus, setJobs, jobs, handleShowModal }) {
  const [formValues, setFormValues] = useState({
    position: "",
    companyName: "",
    status: "",
    dateApplied: "",
  });
  const [form] = Form.useForm();

  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()?.token}`,
    },
  };

  const mutation = useMutation({
    mutationFn: () => {
      console.log("headers", headers);
      return axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/application/create`,
        formValues,
        headers
      );
    },
    onSuccess: (data, variables, context) => {
      debugger;
      // setJobs(prevState => )
      console.log(jobs);
      console.log("new Application", data.data.newApplication);
      setJobs((prevState) => [...prevState, data.data.newApplication]);
      handleShowModal();
    },
  });

  const handleCreateBasicJob = (formValues) => {
    mutation.mutate();
  };

  const handleTemporaryChange = () => {
    console.log("handleTemporaryChange");
  };

  useEffect(() => {
    console.log(form);
    console.log("fieldValues", form.getFieldsValue());
  }, [formStatus]);

  const handleFieldChange = (event) => {
    if (event == "pending" || event == "interview" || event == "accepted" || event == "rejected") {
      return setFormValues({
        ...formValues,
        status: event,
      });
    }
    if (event?.$d) {
      console.log("eventDate", event.$d);
      return setFormValues({
        ...formValues,
        dateApplied: event.$d,
      });
    }

    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    console.log("basicDetails", formValues);
  }, [formValues]);

  return (
    <div>
      <Form name="blank-job-form" onFinish={handleCreateBasicJob} form={form}>
        <div className="blank-job-card">
          <div className="blank-job-info">
            <Form.Item name="position">
              <Input
                className="positionInput"
                placeholder="Position"
                name="position"
                // onChange={handleFieldChange}
                onBlur={handleFieldChange}
              />
            </Form.Item>
            <Form.Item name="companyName">
              <Input
                className="companyNameInput"
                placeholder="Company Name"
                name="companyName"
                onBlur={handleFieldChange}
              />
            </Form.Item>
          </div>
          <div className="blank-job-status-date">
            <Form.Item name="status">
              <Select
                size="large"
                bordered={false}
                placeholder="Status"
                suffixIcon={false}
                defaultValue={statusOptions.find((option) => option.value === status)?.value}
                onChange={handleFieldChange}
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
            <DatePicker
              defaultValue={now}
              format={dateFormat}
              name="dateApplied"
              onChange={handleFieldChange}
            ></DatePicker>
          </div>
        </div>
        <Button htmlType="submit" className="saveButton">
          <SaveOutlined type="submit" className="saveIcon" />
        </Button>
      </Form>
    </div>
  );
}
