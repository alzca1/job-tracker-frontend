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

export default function JobRequirementsForm({ _id, jobRequirements, setJobRequirements }) {
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
    mutationFn: (data) => {
      console.log("data in mutation", data);
      const refinedRequirements = {
        _id: _id,
      };
      for (let requirement in data) {
        console.log("requirement", requirement);
        refinedRequirements[requirement] = data[requirement];
      }
      console.log("refinedRequirements", refinedRequirements);

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

    setJobRequirements((prevState) => ({
      ...prevState,
      [formValues.requirement.key]: formValues.requirementValue,
    }));

    form.resetFields();
  };

  const getFilteredOptions = () => {
    const filteredOptions = options.filter((option) => jobRequirements[option.value] == "");
    return filteredOptions;
  };

  const removeRequirement = (key) => {
    // const filteredRequirements = [...jobRequirements].filter(
    //   (requirement) => requirement.key !== key
    // );
    const filteredRequirements = { ...jobRequirements };
    for (let requirement in filteredRequirements) {
      if (requirement === key) {
        filteredRequirements[requirement] = "";
      }
    }
    setJobRequirements(filteredRequirements);
    if (filteredRequirements.length === 0) {
      setValuesAdded(false);
    }
  };

  const handleSaveRequirements = () => {
    mutation.mutate(jobRequirements);
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
      {Object.values(jobRequirements).some((value) => value == "") && (
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
