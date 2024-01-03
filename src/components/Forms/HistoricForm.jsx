import { Button, Form, Steps } from "antd";
import React from "react";
import InputField from "../FormFields/InputField";
import dayjs from "dayjs";

export default function HistoricForm({ historic, setHistoric, _id }) {
  console.log("historic", historic);
  if (!historic) {
    dayjs().format("DD/MM/YYYY");
    return <p>There was a problem loading the data</p>;
  }
  return (
    <div>
      <h3>Historic</h3>
      <Form style={{ display: "flex" }}>
        <InputField name="historic" placeholder="Add event" />
        <Button>Add event</Button>
      </Form>
      <div style={{ overflowY: "auto", height: "90px" }}>
        <Steps
          direction="vertical"
          items={historic.map((event) => ({
            title: dayjs(event?.date).format("DD/MM/YYYY HH:mm"),
            description: event?.content,
          }))}
        />
      </div>
    </div>
  );
}
