import { Input } from "@/components/ui/input";
import Image from "next/image";

const tags = ["#onepay", "#payment", "#online payment"];

const PostMainContent = () => (
  <main className="rounded-2xl bg-light dark:bg-dark-3">
    <div className="flex justify-center pb-[1.25rem] ">
      <Image
        src="/images/get-shit-done.png"
        height={117}
        width={335}
        alt="post-image"
      />
    </div>
    <h1 className="pb-[0.875rem] pl-[4.8rem] font-[1.625rem] leading-[2.375rem] text-sc-2 dark:text-light-2 lg:pb-[1.25rem]">
      OnePay - Online Payment Processing Web App
    </h1>
    <div className="flex pb-[0.875rem] pl-[4.8rem] lg:pb-[1.25rem] ">
      {tags.map((tag) => (
        <p
          key={tag}
          className="pr-[1.5rem] text-[1rem] leading-[1.5rem] text-yellow-90"
        >
          {tag}
        </p>
      ))}
    </div>
    <p className="pb-[1.875rem] pl-[4.8rem] pr-[1.25rem] text-[1rem] leading-[1.625rem]  text-sc-3 lg:pb-[2.5rem]">
      OnePay is a modern, easy-to-use Online Payment Processing Web App UI Kit
      template that will help you build a web app for your payment/marketplace
      platform. OnePay, a multi-payment platform to facilitate payments online.
      In this app, you can submit a request for a certain product or service
      online and one of our agents will contact you back with an offer. You can
      also pay merchants directly through the app. After successfully any
      transaction you can see details about your payment. History details
      include: -Transaction ID. What will you get? - 200+ Beautiful Screens
      design - Figma, XD & Sketch Files 100% editable and scalable. Thank You
      For Your Time.
    </p>
    <div className="flex items-center justify-center pb-[1.25rem] pr-[1.25rem]">
      <div className="flex items-center justify-center px-[1.25rem]">
        <Image
          src="/images/emoji_2.png"
          alt="profile-image"
          width={40}
          height={40}
        />
      </div>
      <div className="flex grow rounded-[1.4rem] border border-solid border-sc-5 pr-[1.25rem] ">
        <Input
          type="text"
          placeholder="Say something nice ....."
          value={""}
          className="bg-transparent px-[0.938rem] py-[0.625rem] text-sc-5"
        />
        <Image
          src={"/smiley.svg"}
          alt="search icon"
          width={24}
          height={24}
          className="rounded-full"
        />
      </div>
    </div>
  </main>
);

export default PostMainContent;
