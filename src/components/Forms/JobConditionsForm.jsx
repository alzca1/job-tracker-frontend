import { Button, Form, Tag } from "antd";
import { useState } from "react";
import InputField from "../FormFields/InputField";
import { PlusCircleOutlined, SaveOutlined } from "@ant-design/icons";
import { getToken } from "../../helpers/auth";
import { useMutation } from "react-query";
import axios from "axios";
import Chip from "../Chip/Chip";

export default function JobConditionsForm({ _id }) {
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
      return axios.put(`${import.meta.env.VITE_BACKEND_URL}/application/update`, data, headers);
    },
  });

  const handleSubmit = (formValues) => {
    formValues.perk = perks;
    formValues._id = _id;
    console.log(formValues);
    mutation.mutate(formValues);
  };

  const addPerk = () => {
    const perkFieldValue = form.getFieldValue("perk");
    if (perks.includes(perkFieldValue)) {
      return;
    }
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
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {perks.map((perk, index) => (
          // <Tag
          //   key={`${perk}${index}`}
          //   style={{ border: "1px solid white !important", backgroundColor: "white !important" }}
          //   closeIcon
          //   onClose={() => removePerk(perk)}
          //   bordered={true}
          // >
          //   {perk}
          // </Tag>
          <Chip text={perk} callback={removePerk} key={`${perk}${index}`} />
        ))}
      </div>
    </div>
  );
}
