import { Carousel } from "antd";
import InitialJobDetailsEditForm from "../Forms/InitialJobDetailsEditForm";
import JobRequirementsForm from "../Forms/JobRequirementsForm";
import { useQuery } from "react-query";
import axios from "axios";
import { getToken } from "../../helpers/auth";
import { useEffect, useState } from "react";

export default function EditableJob({ jobDetails, setJobDetails }) {
  const [requirements, setRequirements] = useState({});

  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()?.token}`,
    },
  };

  const fetchRequirements = async () => {
    const details = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/application/${jobDetails?._id}`,
      headers
    );
    setRequirements({
      minimumExperience: details?.data?.minimumExperience,
      educationRequired: details?.data?.educationRequired,
      residenceRequired: details?.data?.residenceRequired,
      availabilityRequired: details?.data?.availabilityRequired,
      languagesRequired: details?.data?.languagesRequired,
    });
  };

  const { status } = useQuery("jobInfo", fetchRequirements, {
    refetchOnWindowFocus: false,
  });

  if (status === "loading") {
    console.log("loading");
    return <span>Loading...</span>;
  }

  if (status === "error") {
    console.log("loading error");
    return <span>There was an error while fetching the data...</span>;
  }

  return (
    <div>
      {console.log("content loaded")}
      <Carousel>
        <div>
          <InitialJobDetailsEditForm jobDetails={jobDetails} setJobDetails={setJobDetails} />
        </div>
        <div>
          {Object.keys(requirements).length && (
            <JobRequirementsForm
              jobRequirements={requirements}
              _id={jobDetails?._id}
              setJobRequirements={setRequirements}
            />
          )}
        </div>
      </Carousel>
    </div>
  );
}
