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

const labels = {
  minimumExperience: "Experiencia mínima",
  educationRequired: "Estudios mínimos",
  residenceRequired: "Residencia",
  availabilityRequired: "Disponibilidad",
  languagesRequired: "Idiomas",
};

export default function JobRequirementsForm({ _id, jobRequirements }) {
  const [requirements, setRequirements] = useState(jobRequirements || []);
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
    debugger;
    setValuesAdded(true);

    const requirement = {
      key: formValues.requirement.key,
      label: formValues.requirement.label,
      value: formValues.requirementValue,
    };
    setRequirements((prevState) => [...prevState, requirement]);
    form.resetFields();
  };

  const getFilteredOptions = () => {
    const filteredRequirements = Object.entries(requirements).map(([key, value]) => {
      return { [key]: value };
    });
    console.log("filteredRequirements", filteredRequirements);
    const filteredOptions = options.filter((option) => {
      return !filteredRequirements.some((requirement) => requirement.key === option.value);
    });
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
          {Object.entries(jobRequirements).map(([key, value]) => {
            console.log(key, value);
            if (value)
              return (
                <li key={key}>
                  {`${labels[key]}:${value}`}
                  <DeleteOutlined onClick={() => removeRequirement(key)} />
                </li>
              );
          })}
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

// 1)Tenemos un state en forma de objeto:
//{minimumExperience: "3 years", ...}
// 2) Debemos tener un objeto "labels" o array de objetos "labels" que contengan
// la llave del state y el label que se ha de utilizar
// 3) Cuando se renderiza el componente, debemos recorrer
// el state y generar un span para cada propiedad que tenga
// valor
