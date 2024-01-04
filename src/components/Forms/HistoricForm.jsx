import { Button, Form, Steps } from "antd";
import React from "react";
import InputField from "../FormFields/InputField";
import dayjs from "dayjs";
import { getToken } from "../../helpers/auth";
import axios from "axios";
import { useMutation } from "react-query";

export default function HistoricForm({ historic, setHistoric, _id }) {
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()?.token}`,
    },
  };

  const mutation = useMutation({
    mutationFn: (data) => {
      const newData = {
        _id: _id,
        historic: [...historic, { date: new Date(), content: data.historic }],
      };
      return axios.put(`${import.meta.env.VITE_BACKEND_URL}/application/update`, newData, headers);
    },
  });

  const handleSubmit = (formValues) => {
    mutation.mutate(formValues);
  };

  if (!historic) {
    dayjs().format("DD/MM/YYYY");
    return <p>There was a problem loading the data</p>;
  }
  return (
    <div>
      <h3>Historic</h3>
      <Form style={{ display: "flex" }} onFinish={handleSubmit}>
        <InputField name="historic" placeholder="Add event" />
        <Button htmlType="submit">Add event</Button>
      </Form>
      <div style={{ overflowY: "auto", height: "90px" }}>
        <Steps
          direction="vertical"
          size="small"
          current={historic.length - 1}
          items={historic.map((event) => ({
            title: dayjs(event?.date).format("DD/MM/YYYY HH:mm"),
            description: event?.content,
          }))}
        />
      </div>
    </div>
  );
}
