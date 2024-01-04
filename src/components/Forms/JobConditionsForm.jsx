import { Button, Form } from "antd";
import { useEffect } from "react";
import InputField from "../FormFields/InputField";
import { PlusCircleOutlined, SaveOutlined } from "@ant-design/icons";
import { getToken } from "../../helpers/auth";
import { useMutation } from "react-query";
import axios from "axios";
import Chip from "../Chip/Chip";

export default function JobConditionsForm({ _id, jobConditions, setJobConditions }) {
  const { salary, variable, perks } = jobConditions;
  const [form] = Form.useForm();

  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()?.token}`,
    },
  };

  const mutation = useMutation({
    mutationFn: (data) => {
      return axios.put(`${import.meta.env.VITE_BACKEND_URL}/application/update`, data, headers);
    },
  });

  const handleSubmit = (formValues) => {
    formValues.socialBenefits = perks;
    formValues._id = _id;
    console.log(formValues);
    mutation.mutate(formValues);
  };

  const addPerk = () => {
    const perkFieldValue = form.getFieldValue("perk");
    if (perks.includes(perkFieldValue)) {
      return;
    }
    setJobConditions((prevState) => ({
      ...prevState,
      perks: [...prevState.perks, perkFieldValue],
    }));
    form.resetFields(["perk"]);
  };

  const removePerk = (perk) => {
    const filteredPerks = jobConditions.filter((p) => p !== perk);
    setJobConditions(filteredPerks);
  };
  const sharedStyles = { display: "flex" };

  useEffect(() => {
    console.log("jobConditions", jobConditions);
  }, [jobConditions]);

  console.log("perkkkkssss", perks);

  if (!perks) {
    return <p>There was a problem loading the data</p>;
  }
  return (
    <div>
      <h3>Conditions</h3>
      <Form
        onFinish={handleSubmit}
        form={form}
        initialValues={{ salary: salary, variable: variable }}
      >
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
        {perks.length &&
          perks.map((perk, index) => (
            <Chip text={perk} callback={removePerk} key={`${perk}${index}`} />
          ))}
      </div>
    </div>
  );
}
