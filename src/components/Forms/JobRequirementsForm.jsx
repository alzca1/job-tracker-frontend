import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import InputField from "../FormFields/InputField";

const options = [
  { value: "experience", label: "Experiencia mínima" },
  { value: "education", label: "Estudios mínimos" },
  { value: "residence", label: "Residencia" },
  { value: "availability", label: "Disponibilidad" },
  { value: "languages", label: "Idiomas" },
];
export default function JobRequirementsForm() {
  const [requirements, setRequirements] = useState([]);
  const [form] = Form.useForm();

  const handleSubmit = (formValues) => {
    console.log("i was clicked", formValues);
    const requirement = {
      key: formValues.requirement.key,
      label: formValues.requirement.label,
      value: formValues.requirementValue,
    };
    setRequirements((prevState) => [...prevState, requirement]);
    form.resetFields();
    console.log("requirement added", requirement);
  };

  useEffect(() => {
    console.log(requirements);
  }, [requirements]);

  const getFilteredOptions = () => {
    const filteredOptions = options.filter((option) => {
      return !requirements.some((requirement) => requirement.key === option.value);
    });
    console.log(filteredOptions);
    return filteredOptions;
  };

  return (
    <div>
      <div>
        <h3>Requirements</h3>
        <ul>
          {requirements.map((requirement) => (
            <li key={requirement.key}>{`${requirement.label}: ${requirement.value}`}</li>
          ))}
        </ul>
      </div>
      <Form onFinish={handleSubmit} form={form}>
        <Form.Item name="requirement" label="Requirement">
          <Select labelInValue options={getFilteredOptions()} placeholder="Select option" />
        </Form.Item>
        <InputField name="requirementValue" />
        <Button htmlType="submit">Add Requirement</Button>
      </Form>
    </div>
  );
}
