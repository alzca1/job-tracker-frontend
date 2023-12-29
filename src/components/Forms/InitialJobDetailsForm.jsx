import { Button, Form } from "antd";
import InputField from "../FormFields/InputField";
import DateField from "../FormFields/DatePicker";
import StatusSelect from "../FormFields/StatusSelect";
import { useMutation } from "react-query";
import axios from "axios";
import { getToken } from "../../helpers/auth";
import dayjs from "dayjs";

const today = dayjs();

export default function InitialJobDetailsForm({ handleShowModal, setJobs }) {
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()?.token}`,
    },
  };

  //name, className, placeholder, defaultValue
  const mutation = useMutation({
    mutationFn: (formValues) => {
      return axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/application/create`,
        formValues,
        headers
      );
    },
    onSuccess: (data) => {
      setJobs((prevState) => [...prevState, data.data.newApplication]);
      handleShowModal();
    },
  });

  const handleSubmit = (formValues) => {
    mutation.mutate(formValues);
  };

  return (
    <div className="InitialJobDetailsForm">
      <Form onFinish={handleSubmit} initialValues={{ status: "pending", dateApplied: today }}>
        <InputField name="position" placeholder="Enter position" className="" />
        <InputField name="companyName" placeholder="Enter company name" className="" />
        <StatusSelect />
        <DateField name="dateApplied" />
        <Button htmlType="submit">Create job</Button>
      </Form>
    </div>
  );
}
