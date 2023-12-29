import { Button, Form, Select } from "antd";
import { useState } from "react";
import InputField from "../FormFields/InputField";
import { DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { useMutation } from "react-query";
import { getToken } from "../../helpers/auth";
import axios from "axios";

const options = [
  { value: "minimumExperience", label: "Experiencia mínima" },
  { value: "educationRequired", label: "Estudios mínimos" },
  { value: "residenceRequired", label: "Residencia" },
  { value: "availabilityRequired", label: "Disponibilidad" },
  { value: "languagesRequired", label: "Idiomas" },
];
export default function JobRequirementsForm({ jobDetails: { _id } }) {
  const [requirements, setRequirements] = useState([]);
  const [valuesAdded, setValuesAdded] = useState(false);
  const [form] = Form.useForm();

  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()?.token}`,
    },
  };

  const mutation = useMutation({
    mutationFn: (requirements) => {
      const refinedRequirements = {
        _id: _id,
      };
      for (let requirement of requirements) {
        refinedRequirements[requirement.key] = requirement.value;
      }

      // hay que cocinar los requirements aquí
      return axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/application/update`,
        refinedRequirements,
        headers
      );
    },
  });

  const handleSubmit = (formValues) => {
    setValuesAdded(true);

    const requirement = {
      key: formValues.requirement.key,
      label: formValues.requirement.label,
      value: formValues.requirementValue,
    };
    setRequirements((prevState) => [...prevState, requirement]);
    form.resetFields();
    console.log("requirement added", requirement);
  };

  // useEffect(() => {
  //   console.log(requirements);
  // }, [requirements]);

  const getFilteredOptions = () => {
    const filteredOptions = options.filter((option) => {
      return !requirements.some((requirement) => requirement.key === option.value);
    });
    // console.log(filteredOptions);
    return filteredOptions;
  };

  const removeRequirement = (key) => {
    const filteredRequirements = [...requirements].filter((requirement) => requirement.key !== key);
    setRequirements(filteredRequirements);
    if (filteredRequirements.length === 0) {
      setValuesAdded(false);
    }
  };

  const handleSaveRequirements = () => {
    mutation.mutate(requirements);
  };

  return (
    <div>
      <h3>Requirements</h3>
      {valuesAdded ? (
        <Button onClick={handleSaveRequirements}>
          <SaveOutlined />
        </Button>
      ) : null}
      <div>
        <ul>
          {requirements.map((requirement) => (
            <li key={requirement.key}>
              {`${requirement.label}: ${requirement.value}`}{" "}
              <DeleteOutlined onClick={() => removeRequirement(requirement.key)} />
            </li>
          ))}
        </ul>
      </div>
      {getFilteredOptions().length > 0 && (
        <Form onFinish={handleSubmit} form={form}>
          <Form.Item name="requirement" label="Requirement">
            <Select labelInValue options={getFilteredOptions()} placeholder="Select option" />
          </Form.Item>
          <InputField name="requirementValue" />
          <Button htmlType="submit">Add Requirement</Button>
        </Form>
      )}
    </div>
  );
}
