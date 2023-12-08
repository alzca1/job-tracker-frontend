import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Carousel, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import Requirements from "./Requirements";
import BasicDetails from "./BasicDetails";

export default function BlankJob({ setJobs }) {
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
      <Carousel
        afterChange={handleChangeSlide}
        style={{ padding: "3rem 0rem !important" }}
        fade={true}
      >
        <BasicDetails
          formStatus={carouselStatus}
          setDataToBeSaved={setDataToBeSaved}
          setJobs={setJobs}
        />
        <Requirements />

        <div>Notas</div>
        <div>Slide 5</div>
      </Carousel>
    </div>
  );
}
