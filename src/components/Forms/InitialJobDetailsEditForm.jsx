import { Button, Form } from "antd";
import InputField from "../FormFields/InputField";
import StatusSelect from "../FormFields/StatusSelect";
import DateField from "../FormFields/DatePicker";
import { SaveOutlined } from "@ant-design/icons";
import { getToken } from "../../helpers/auth";
import { useMutation } from "react-query";
import axios from "axios";

export default function InitialJobDetailsEditForm({ jobDetails, setJobDetails }) {
  const { _id, position, companyName, status, dateApplied } = jobDetails;

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

    onSuccess: (data, variables) => {
      setJobDetails((prevState) => ({
        ...prevState,
        ...variables,
      }));
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
