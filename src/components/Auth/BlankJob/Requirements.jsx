import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";

const requirementsOptions = [
  { key: 1, value: "minimumExperience", name: "Experiencia mínima" },
  { key: 2, value: "education", name: "Estudios" },
  { key: 3, value: "desiredLocation", name: "Residencia preferente" },
  { key: 4, value: "availability", name: "Disponibilidad" },
];

export default function Requirements() {
  const [requirements, setRequirements] = useState([]);

  const [addedRequirement, setAddRequirement] = useState({ property: "", value: "" });

  const handleAddRequirement = (type, value) => {
    setAddRequirement((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const removeRequirement = (requirementId) => {
    setRequirements(requirements.filter((requirement) => requirement._id !== requirementId));
  };

  const getAdequateRequirements = (inputValue, option) => {
    const currentUsedRequirements = requirements.map((requirement) => {
      return requirement.property;
    });

    return requirementsOptions.filter((requirement) => {
      return !currentUsedRequirements.includes(requirement.value);
    });
  };

  const consolidateRequirement = () => {
    setRequirements((prevState) => [...prevState, addedRequirement]);
    setAddRequirement({ property: "", value: "" });
  };

  useEffect(() => {
    getAdequateRequirements();
  }, [requirements]);

  useEffect(() => {
    console.log(addedRequirement);
  }, [addedRequirement]);

  return (
    <div>
      <h3>Requisitos</h3>
      <Form.Item name="requirementType">
        <Select
          onChange={(value) => handleAddRequirement("property", value)}
          key={requirements.length}
        >
          {getAdequateRequirements().map((option) => {
            return (
              <Select.Option key={option.key} value={option.value}>
                {option.name}
              </Select.Option>
            );
          })}
        </Select>
        <Form.Item name="requirementValue">
          <Input
            placeholder="Detalle de requisito"
            onChange={(e) => handleAddRequirement("value", e.target.value)}
          />
        </Form.Item>
      </Form.Item>
      <ul>
        {requirements.map((requirement) => {
          return (
            <li key={requirement.value}>
              {requirement.property}: {requirement.value}
            </li>
          );
        })}
      </ul>
      <Button onClick={consolidateRequirement}>Add requirement</Button>
    </div>
  );
}
