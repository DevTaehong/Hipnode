"use client";

import { useState } from "react";

import { interviewFormLinkProps } from "@/constants/interview";
import FormLink from "../FormLink";
import { Categories } from "../podcast-components";
import InterviewPageFilter from "./InterviewPageFilter";
import { InterviewFilterAndContentWrapperProps } from "@/types/interview.index";

const InterviewFilterAndContentWrapper = ({
  tags,
  interviewsExample,
  interviewArray,
}: InterviewFilterAndContentWrapperProps) => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <section
        className="
      flex w-full flex-col gap-5 lg:w-[13.125rem]"
      >
        <FormLink {...interviewFormLinkProps} className="flex lg:hidden" />
        <Categories
          setLoading={setLoading}
          filters={tags}
          page="interviews"
          urlFilter="interview"
          className="lg:w-[13.125rem]"
        />
      </section>

      <InterviewPageFilter
        loading={loading}
        setLoading={setLoading}
        interviews={interviewsExample}
        interviewArray={interviewArray}
      />
    </>
  );
};

export default InterviewFilterAndContentWrapper;
