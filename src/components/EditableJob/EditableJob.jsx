import { Carousel } from "antd";
import InitialJobDetailsEditForm from "../Forms/InitialJobDetailsEditForm";
import JobRequirementsForm from "../Forms/JobRequirementsForm";

export default function EditableJob({ jobDetails, setJobDetails }) {
  return (
    <div>
      <Carousel>
        <div>
          <InitialJobDetailsEditForm jobDetails={jobDetails} setJobDetails={setJobDetails} />
        </div>
        <div>
          <JobRequirementsForm jobDetails={jobDetails} />
        </div>
      </Carousel>
    </div>
  );
}
