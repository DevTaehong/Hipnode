"use client";

import NavModalBG from "@/components/icons/NavModalBG";
import OutlineIcon from "@/components/icons/outline-icons";
import Image from "next/image";

const page = () => {
  return (
    <div className="m-5 flex  flex-wrap items-center gap-5 bg-slate-500 fill-white p-5">
      center
      {/* <div className="relative h-[187px] w-[450px] bg-[url('/navbar/user_modal_light.svg')] bg-center bg-no-repeat">
        test
      </div> */}
      <div className="relative flex h-[150px] w-[150px] bg-red-500">
        <div className="relative top-[-50px] h-[50%] w-[50%] rounded-[20px]" />

        <div className="h-[50%] w-[50%] rounded-[20px] bg-white" />
      </div>
    </div>
  );
};

export default page;
