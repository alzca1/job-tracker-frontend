import { Button, Form, Tag } from "antd";
import React, { useState } from "react";
import InputField from "../FormFields/InputField";
import { PlusCircleOutlined, SaveOutlined } from "@ant-design/icons";
import { getToken } from "../../helpers/auth";
import { useMutation } from "react-query";
import axios from "axios";
import { useForm } from "antd/es/form/Form";

export default function JobConditionsForm() {
  const [perks, setPerks] = useState([]);
  const [form] = Form.useForm();

  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()?.token}`,
    },
  };

  const mutation = useMutation({
    mutationFn: (data) => {
      let refinedRequirements;
      return axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/application/update`,
        refinedRequirements,
        headers
      );
    },
  });

  const handleSubmit = (formValues) => {
    console.log(formValues);
    // mutation.mutate(formValues);
  };

  const addPerk = () => {
    const perkFieldValue = form.getFieldValue("perk");
    setPerks((prevState) => [...prevState, perkFieldValue]);
    form.resetFields(["perk"]);
  };

  const removePerk = (perk) => {
    const filteredPerks = perks.filter((p) => p !== perk);
    setPerks(filteredPerks);
  };
  const sharedStyles = { display: "flex" };

  return (
    <div>
      <h3>Conditions</h3>
      <Form onFinish={handleSubmit} form={form}>
        <Button htmlType="submit">
          <SaveOutlined />
        </Button>
        <div style={sharedStyles}>
          <InputField name="salary" placeholder="Enter salary" />
          <InputField name="variable" placeholder="Enter variable" />
        </div>
        <div style={sharedStyles}>
          <InputField name="perk" placeholder="Enter perk" />
          <Button onClick={addPerk}>
            <PlusCircleOutlined />
          </Button>
        </div>
      </Form>
      <div>
        {perks.map((perk, index) => (
          <Tag color="#fffff" key={`${perk}${index}`} closeIcon onClose={() => removePerk(perk)}>
            {perk}
          </Tag>
        ))}
      </div>
    </div>
  );
}
