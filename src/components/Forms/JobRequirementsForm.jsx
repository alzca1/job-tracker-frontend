import { Button, Form, Select, Tooltip } from "antd";
import { useEffect, useState } from "react";
import InputField from "../FormFields/InputField";
import {
  CloseOutlined,
  DeleteOutlined,
  PlusOutlined,
  SaveOutlined,
  StopFilled,
} from "@ant-design/icons";
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
  const [valuesAdded, setValuesAdded] = useState(false);
  const [form] = Form.useForm();
  const [mustShowForm, setMustShowForm] = useState(false);
  const [mustShowAddButton, setMustShowAddButton] = useState(false);

  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()?.token}`,
    },
  };

  useEffect(() => {
    for (let requirement in jobRequirements) {
      if (jobRequirements[requirement] == "") {
        setMustShowAddButton(true);
      }
    }
  }, [jobRequirements]);

  const mutation = useMutation({
    mutationFn: (data) => {
      const refinedRequirements = {
        _id: _id,
      };
      for (let requirement in data) {
        refinedRequirements[requirement] = data[requirement];
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
    if (!formValues?.requirementValue || formValues.requirementValue == "") {
      return;
    }
    setValuesAdded(true);
    setMustShowForm(false);

    setJobRequirements((prevState) => ({
      ...prevState,
      [formValues.requirement.key]: formValues.requirementValue,
    }));

    form.resetFields();
  };

  const getFilteredOptions = () => {
    let filteredOptions = {};

    if (Object.keys(jobRequirements).length > 0) {
      filteredOptions = options.filter((option) => jobRequirements[option.value] == "");
    }

    return filteredOptions;
  };

  const removeRequirement = (key) => {
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
  const handleShowForm = () => {
    setMustShowAddButton(false);
    setMustShowForm(true);
  };

  const handleHideForm = () => {
    setMustShowForm(false);
  };

  return (
    <div className="JobRequirements">
      {valuesAdded ? (
        <Button className="saveButton" onClick={handleSaveRequirements}>
          <SaveOutlined />
        </Button>
      ) : null}
      {!mustShowForm && (
        <div className="jobRequirementsList">
          <ul>
            {Object.entries(jobRequirements).map(([key, value]) => {
              if (value)
                return (
                  <li key={key}>
                    <span className="requirementName">
                      <DeleteOutlined onClick={() => removeRequirement(key)} /> {`${labels[key]}:`}
                    </span>
                    <span className="requirementValue">{`${value}`}</span>
                  </li>
                );
            })}
          </ul>
          {mustShowAddButton && !mustShowForm && (
            <Button onClick={handleShowForm}>Add requirement</Button>
          )}
        </div>
      )}

      {mustShowForm && (
        <Form onFinish={handleSubmit} form={form} className="jobRequirementsForm">
          <Form.Item name="requirement" className="optionSelectItem">
            <Select
              className="optionSelector"
              labelInValue
              options={getFilteredOptions()}
              placeholder="Select option"
            />
          </Form.Item>
          <div className="inputFieldContainer">
            <InputField name="requirementValue" />
            <Tooltip title="Add requirement">
              <Button htmlType="submit">
                <PlusOutlined />
              </Button>
            </Tooltip>
            <Tooltip title="Cancel">
              <Button onClick={handleHideForm}>
                <CloseOutlined />
              </Button>
            </Tooltip>
          </div>
        </Form>
      )}
      {/* {Object.values(jobRequirements).some((value) => value == "") && (
        <Form onFinish={handleSubmit} form={form} className="jobRequirementsForm">
          <Form.Item name="requirement" className="optionSelectItem">
            <Select
              className="optionSelector"
              labelInValue
              options={getFilteredOptions()}
              placeholder="Select option"
            />
          </Form.Item>
          <InputField name="requirementValue" />
          <Button htmlType="submit">Add</Button>
        </Form>
      )} */}
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
