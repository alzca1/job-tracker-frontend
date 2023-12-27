import InitialJobDetailsEditForm from "../Forms/InitialJobDetailsEditForm";

export default function EditableJob({ jobDetails, setJobDetails }) {
  return (
    <div>
      <InitialJobDetailsEditForm jobDetails={jobDetails} setJobDetails={setJobDetails} />
    </div>
  );
}
