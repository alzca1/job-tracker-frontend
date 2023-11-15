import { Button } from "antd";
import React, { useState } from "react";
import { useMutation } from "react-query";
import axiosInstance from "../../helpers/instance";
import Job from "../Job/Job";
import axios from "axios";
import { getToken } from "../../helpers/auth";

export default function JobPanel({ handleShowModal, jobs, setJobs }) {
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()?.token}`,
    },
  };

  const mutation = useMutation({
    mutationFn: () => {
      return axios.get(`${import.meta.env.VITE_BACKEND_URL}/application/getAll`, headers);
    },
    onSuccess: (data, variables, context) => {
      setJobs(data.data);
    },
  });

  const handleGetJobs = () => {
    mutation.mutate();
    console.log("Get jobs");
  };

  return (
    <div className="JobPanel">
      <Button onClick={handleGetJobs}>Get jobs</Button>
      <div className="job-list">
        <button className="add-job" onClick={handleShowModal}>
          Add Job
        </button>
        {jobs.map((job) => {
          return <Job key={job._id} jobData={job} />;
        })}
      </div>
    </div>
  );
}
