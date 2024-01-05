import { Form } from "antd";
import InputField from "../FormFields/InputField";
import StatusSelect from "../FormFields/StatusSelect";

import { getToken } from "../../helpers/auth";
import { useMutation } from "react-query";
import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import SaveStatusButton from "../Buttons/SaveStatusButton";

export default function InitialJobDetailsEditForm({ jobDetails, setJobDetails }) {
  const { position, companyName, status, dateApplied } = jobDetails;

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
    if (saveStatus != "idle") {
      return false;
    }

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
    <div className="InitialJobDetailsEditForm">
      <SaveStatusButton status={saveStatus} />

      <Form
        onFinish={handleSubmit}
        initialValues={{
          position: position,
          companyName: companyName,
          status: status,
          dateApplied: dayjs(dateApplied),
        }}
      >
        <div className="job-info">
          <InputField name="position" placeholder="Enter position" className="positionInput" />
          <InputField
            name="companyName"
            placeholder="Enter company name"
            className="companyNameInput"
          />
        </div>
        <div className="job-status-date">
          <StatusSelect dropdownStyle="statusSelect" />
          <span className="dateApplied">
            Created: {dayjs(dateApplied).format("DD/MM/YYYY HH:MM")}
          </span>
        </div>
      </Form>
    </div>
  );
}
