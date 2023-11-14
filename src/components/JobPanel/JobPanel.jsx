import { Button } from "antd";
import React from "react";

export default function JobPanel() {
  const handleGetJobs = () => {
    console.log("Get jobs");
  };

  return (
    <div className="JobPanel">
      <Button onClick={handleGetJobs}>Get jobs</Button>
    </div>
  );
}
