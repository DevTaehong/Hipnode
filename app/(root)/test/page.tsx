import CategoryFilter from "@/components/CategoryFilter";
import ChatBox from "@/components/ChatBox";

const page = () => {
  return (
    <div className="m-5 flex gap-5 bg-slate-400 p-5">
      <CategoryFilter />
      {/* <ChatBox /> */}
    </div>
  );
};

export default page;
