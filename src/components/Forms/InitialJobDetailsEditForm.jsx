import { Button, Form } from "antd";
import InputField from "../FormFields/InputField";
import StatusSelect from "../FormFields/StatusSelect";
import DateField from "../FormFields/DatePicker";
import { SaveOutlined } from "@ant-design/icons";
import { getToken } from "../../helpers/auth";
import { useMutation } from "react-query";
import axios from "axios";

export default function InitialJobDetailsEditForm({ jobData }) {
  const { position, companyName, status, dateApplied } = jobData;

  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()?.token}`,
    },
  };

  const mutation = useMutation({
    mutationFn: (formValues) => {
      return axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/application/update`,
        formValues,
        headers
      );
    },

    onSuccess: (data) => {
      console.log("job basic details successfully updated", data);
      // setJobs((prevState) => [...prevState, data.data.newApplication]);
      // handleShowModal();
    },
  });
  const handleSubmit = (formValues) => {
    for (let key in formValues) {
      if (!formValues[key]) {
        delete formValues[key];
      }
    }
    if (jobData._id) {
      formValues._id = jobData._id;
    }
    console.log("form sent!", formValues, jobData);
    mutation.mutate(formValues);
  };

  return (
    <div className="InitialJobDetailsForm">
      <Form onFinish={handleSubmit}>
        <Button htmlType="submit">
          <SaveOutlined />
        </Button>
        <InputField
          name="position"
          placeholder="Enter position"
          className=""
          defaultValue={position}
        />
        <InputField
          name="companyName"
          placeholder="Enter company name"
          className=""
          defaultValue={companyName}
        />
        <StatusSelect defaultValue={status} />
        <DateField name="dateApplied" defaultValue={dateApplied} />
      </Form>
    </div>
  );
}
