import { Button } from "antd";
import React from "react";
import {
  CheckOutlined,
  ExclamationOutlined,
  LoadingOutlined,
  SaveOutlined,
} from "@ant-design/icons";

export const statusIcons = {
  idle: () => <SaveOutlined />,
  loading: () => <LoadingOutlined />,
  success: () => <CheckOutlined />,
  error: () => <ExclamationOutlined />,
};

export default function SaveStatusButton({ status }) {
  return (
    <Button className="SaveStatusButton" htmlType={"submit"}>
      {statusIcons[status]()}
    </Button>
  );
}
