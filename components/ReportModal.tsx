import { reportModalTags } from "@/constants";
import ReportModalTag from "./ReportModalTag";

interface ReportModalProps {
  name: string;
  handleSubmit: () => void;
  handleCancel: () => void;
}

const ReportModal = ({
  name,
  handleSubmit,
  handleCancel,
}: ReportModalProps) => {
  return (
    <section className="bg-light_dark-4 flex w-full max-w-[30rem] flex-col gap-[1.875rem] rounded-2xl p-5 md:p-[1.875rem]">
      <header>
        <h2 className="text-sc-2_light-2 semibold-18">
          Why are you reporting this post by @{name}?
        </h2>
      </header>
      <div className="flex flex-wrap gap-5">
        {reportModalTags.map((tag) => (
          <ReportModalTag key={tag} tag={tag} />
        ))}
      </div>
      <footer className="flex gap-5">
        <button
          onClick={handleSubmit}
          className="flex h-[2.875rem] w-40 items-center justify-center rounded-md bg-blue"
        >
          <p className="semibold-18 text-light">Submit</p>
        </button>
        <button className="base-18 text-sc-3" onClick={handleCancel}>
          Cancel
        </button>
      </footer>
    </section>
  );
};

export default ReportModal;
