import { Button, DatePicker, Form, Input, Select } from "antd";
import React from "react";

const dateFormat = "DD/MM/YYYY";

export default function JobForm() {
  return (
    <div className="JobForm">
      <Form name="addJobForm" layout="vertical" size="medium" className="addJob-form">
        <Form.Item
          label="Company"
          name="companyName"
          rules={[{ required: true, message: "Please input the company name!" }]}
        >
          <Input placeholder="Enter company name..." />
        </Form.Item>
        <Form.Item
          label="Position"
          name="position"
          rules={[{ required: true, message: "Please input the company name!" }]}
        >
          <Input placeholder="Enter position..." />
        </Form.Item>
        <Form.Item
          label="Date applied"
          name="dateApplied"
          rules={[{ required: true, message: "Please input the application date!" }]}
        >
          <DatePicker style={{ width: "100%" }} format={dateFormat} />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please input the company name!" }]}
        >
          <Select
            placeholder="Select status"
            style={{ width: "100%" }}
            options={[
              { value: "pending", label: "Pending" },
              { value: "interview", label: "Interviewed" },
              { value: "accepted", label: "Accepted" },
              { value: "rejected", label: "Rejected" },
            ]}
          ></Select>
        </Form.Item>
        <Form.Item label="Job URL" name="jobURL">
          <Input placeholder="Enter job URL..." />
        </Form.Item>
      </Form>
    </div>
  );
}

//"pending", "interview", "accepted", "rejected"
