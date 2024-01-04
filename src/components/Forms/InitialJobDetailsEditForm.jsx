import { Button, Form } from "antd";
import InputField from "../FormFields/InputField";
import StatusSelect from "../FormFields/StatusSelect";
import DateField from "../FormFields/DatePicker";
import {
  CheckOutlined,
  ExclamationOutlined,
  LoadingOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { getToken } from "../../helpers/auth";
import { useMutation } from "react-query";
import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";

const statusIcons = {
  idle: () => <SaveOutlined />,
  loading: () => <LoadingOutlined />,
  success: () => <CheckOutlined />,
  error: () => <ExclamationOutlined />,
};

export default function InitialJobDetailsEditForm({ jobDetails, setJobDetails }) {
  const { _id, position, companyName, status, dateApplied } = jobDetails;

  const [saveStatus, setSaveStatus] = useState("idle");

  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()?.token}`,
    },
  };

  const mutation = useMutation({
    mutationFn: (formValues) => {
      setSaveStatus("loading");
      return axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/application/update`,
        formValues,
        headers
      );
    },

    onSuccess: (data, variables) => {
      setSaveStatus("success");
      setJobDetails((prevState) => ({
        ...prevState,
        ...variables,
      }));
      setTimeout(() => {
        setSaveStatus("idle");
      }, 2000);
    },
    onError: (error) => {
      setSaveStatus("error");
      setTimeout(() => {
        setSaveStatus("idle");
      }, 2000);
      console.log("error", error);
    },
  });
  const handleSubmit = (formValues) => {
    for (let key in formValues) {
      if (!formValues[key]) {
        delete formValues[key];
      }
    }
    if (jobDetails._id) {
      formValues._id = jobDetails._id;
    }
    mutation.mutate(formValues);
  };

  return (
    <div className="InitialJobDetailsForm">
      <h3>Basic Details</h3>
      <Form
        onFinish={handleSubmit}
        initialValues={{
          position: position,
          companyName: companyName,
          status: status,
          dateApplied: dayjs(dateApplied),
        }}
      >
        <Button htmlType="submit">
          {/* <SaveOutlined /> */}
          {statusIcons[saveStatus]()}
        </Button>
        <InputField name="position" placeholder="Enter position" className="" />
        <InputField name="companyName" placeholder="Enter company name" className="" />
        <StatusSelect />
        <DateField name="dateApplied" />
      </Form>
    </div>
  );
}
