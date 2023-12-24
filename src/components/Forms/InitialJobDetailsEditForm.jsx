import { Form } from "antd";
import InputField from "../FormFields/InputField";
import StatusSelect from "../FormFields/StatusSelect";
import DateField from "../FormFields/DatePicker";

export default function InitialJobDetailsEditForm({ jobData }) {
  const { position, companyName, status, dateApplied } = jobData;
  const handleSubmit = () => {
    console.log("form sent!");
  };

  return (
    <div className="InitialJobDetailsForm">
      <Form onFinish={handleSubmit}>
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
