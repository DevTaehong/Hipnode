<<<<<<< HEAD
import Categories from "@/components/podcast-components/Categories";

const page = () => {
  return (
    <div className="flex h-screen w-screen">
      <div className="flex w-full max-w-[13.125rem]">
        <Categories />
      </div>
=======
import CategoryFilter from "@/components/CategoryFilter";
import ChatBox from "@/components/ChatBox";

const page = () => {
  return (
    <div className="m-5 flex gap-5 bg-slate-400 p-5">
      <CategoryFilter />
      <ChatBox />
>>>>>>> main
    </div>
  );
};

export default page;
