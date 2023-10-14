import ProfileModal from "@/components/ProfileModal";
import ThemeToggle from "@/context/ThemeToggle";

const page = () => {
  return (
    <>
      <div className="flex min-h-screen w-screen flex-col bg-black">
        <div className="flex justify-center bg-slate-500">
          <ThemeToggle />
        </div>
        <div className="mt-12 flex w-full justify-center bg-slate-600">
          <ProfileModal />
        </div>
      </div>
    </>
  );
};

export default page;
