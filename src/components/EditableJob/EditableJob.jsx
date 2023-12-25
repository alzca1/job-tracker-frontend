import InitialJobDetailsEditForm from "../Forms/InitialJobDetailsEditForm";

export default function EditableJob({ jobData, setJobs }) {
  return (
    <div>
      <InitialJobDetailsEditForm jobData={jobData} setJobs={setJobs} />
    </div>
  );
}
