import { Select } from "antd";
import React from "react";

export default function StatusSelect() {
  const status = ["pending", "interview", "accepted", "rejected"];
  return (
    <Select style={{ width: "100%" }}>
      {status.map((status) => (
        <Select.Option key={status} value={status}>
          {status}
        </Select.Option>
      ))}
    </Select>
  );
}
