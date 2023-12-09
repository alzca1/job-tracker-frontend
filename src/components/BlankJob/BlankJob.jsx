import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Carousel, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import Requirements from "./Requirements";
import BasicDetails from "./BasicDetails";

export default function BlankJob({ setJobs, jobs, handleShowModal }) {
  const [carouselStatus, setCarouselStatus] = useState("idle");

  const [dataToBeSaved, setDataToBeSaved] = useState({
    basicDetails: {
      position: "",
      companyName: "",
      dateApplied: "",
    },
    jobConditions: {
      salary: "",
      variable: "",
      benefits: [],
    },
    requirements: {
      experience: "",
      education: "",
      desiredLocation: "",
      availability: "",
    },
  });

  const handleChangeSlide = () => {
    setCarouselStatus("changed");
  };

  const handleCancel = () => {
    console.log("handleCancel");
  };

  return (
    <div>
      <BasicDetails
        formStatus={carouselStatus}
        setDataToBeSaved={setDataToBeSaved}
        setJobs={setJobs}
        jobs={jobs}
        handleShowModal={handleShowModal}
      />
    </div>
  );
}
