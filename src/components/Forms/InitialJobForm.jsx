import { Button, Form } from "antd";
import InputField from "../FormFields/InputField";
import DateField from "../FormFields/DatePicker";
import StatusSelect from "../FormFields/StatusSelect";
import { useMutation } from "react-query";
import axios from "axios";
import { getToken } from "../../helpers/auth";

export default function InitialJobForm({ handleShowModal, setJobs }) {
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
      console.log(data);
      setJobs((prevState) => [...prevState, data.data.newApplication]);
      handleShowModal();
    },
  });

  const handleSubmit = (formValues) => {
    console.log("formdata", formValues);
    mutation.mutate(formValues);
  };

  return (
    <div className="InitialJobForm">
      <Form onFinish={handleSubmit}>
        <InputField name="position" placeholder="Enter position" className="" />
        <InputField name="companyName" placeholder="Enter company name" className="" />
        <StatusSelect defaultValue="pending" />
        <DateField name="dateApplied" defaultValue={new Date()} />
        <Button htmlType="submit">Create job</Button>
      </Form>
    </div>
  );
}
