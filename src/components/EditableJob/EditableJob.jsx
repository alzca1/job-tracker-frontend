import { Carousel } from "antd";
import InitialJobDetailsEditForm from "../Forms/InitialJobDetailsEditForm";
import JobRequirementsForm from "../Forms/JobRequirementsForm";
import { useQuery } from "react-query";
import axios from "axios";
import { getToken } from "../../helpers/auth";
import { useEffect, useState } from "react";

export default function EditableJob({ jobDetails, setJobDetails }) {
  console.log("jobDetails", jobDetails);
  const [requirements, setRequirements] = useState({
    minimumExperience: "3 years",
    educationRequired: "ESO",
    residenceRequired: "Barcelona",
    availabilityRequired: "Monday to Friday, 9am to 18pm",
    languagesRequired: "English, Spanish",
  });
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()?.token}`,
    },
  };

  const { isLoading, data } = useQuery("jobInfo", async () => {
    const details = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/application/${jobDetails?._id}`,
      headers
    );

    //TODO:  qué pasa si el status no es 200???
    if (details.status === 200) {
      setRequirements({
        minimumExperience: details?.data?.minimumExperience,
        educationRequired: details?.data?.educationRequired,
        residenceRequired: details?.data?.residenceRequired,
        availabilityRequired: details?.data?.availabilityRequired,
        languagesRequired: details?.data?.languagesRequired,
      });
    }
  });

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  return (
    <div>
      <Carousel>
        <div>
          <InitialJobDetailsEditForm jobDetails={jobDetails} setJobDetails={setJobDetails} />
        </div>
        <div>
          <JobRequirementsForm jobRequirements={requirements} _id={jobDetails?._id} />
        </div>
      </Carousel>
    </div>
  );
}
