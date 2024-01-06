import { Carousel } from "antd";
import InitialJobDetailsEditForm from "../Forms/InitialJobDetailsEditForm";
import JobRequirementsForm from "../Forms/JobRequirementsForm";
import { useQuery } from "react-query";
import axios from "axios";
import { getToken } from "../../helpers/auth";
import { useEffect, useState } from "react";
import JobConditionsForm from "../Forms/JobConditionsForm";
import HistoricForm from "../Forms/HistoricForm";

export default function EditableJob({ jobDetails, setJobDetails, setTemporaryStatus }) {
  const [requirements, setRequirements] = useState({});
  const [conditions, setConditions] = useState({});
  const [historic, setHistoric] = useState([]);

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

    setConditions({
      salary: details?.data?.salary,
      variable: details?.data?.variable,
      perks: details?.data?.socialBenefits,
    });

    setHistoric(details?.data?.historic);
  };

  useEffect(() => {
    console.log("historic", historic);
  }, [historic]);

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
          <InitialJobDetailsEditForm jobDetails={jobDetails} setJobDetails={setJobDetails} setTemporaryStatus={setTemporaryStatus} />
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
        <div>
          <JobConditionsForm
            _id={jobDetails?._id}
            jobConditions={conditions}
            setJobConditions={setConditions}
          />
        </div>
        <div>
          <HistoricForm historic={historic} setHistoric={setHistoric} _id={jobDetails?._id} />
        </div>
      </Carousel>
    </div>
  );
}
