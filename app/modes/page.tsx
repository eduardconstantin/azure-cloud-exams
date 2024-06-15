import type { NextPage } from "next";
import ExamLink from "@azure-fundamentals/components/ExamLink";

const Modes: NextPage<{ searchParams: { url: string; name: string } }> = ({
  searchParams,
}) => {
  const { url, name } = searchParams;

  return (
    <div className="mx-auto mb-6 w-full md:w-[90vw] lg:w-[70vw] 2xl:w-[45%] text-center">
      <h2 className="text-white text-4xl text-leading font-bold uppercase md:mt-14">
        {name}
      </h2>
      <p className="text-white text-lg mt-4 mb-14 px-5 leading-6">
        Test your knowledge under pressure with our timed exam mode or explore
        and master all the questions at your own pace with our practice mode.
      </p>
      <div className="flex max-sm:flex-col max-sm:align-center justify-center gap-10 mx-5 md:mx-16">
        <ExamLink
          href={{
            pathname: "/practice",
            query: { url },
          }}
          heading="Practice mode"
          paragraph="Learn and familiarize yourself with the questions and answers without any time constraint."
          subparagraph="You can copy URL to comeback to the same question later."
          wrapperClassNames="from-[#0284C7] to-[#2DD48F]"
          headingClassNames="group-hover:from-[#0284C7] group-hover:to-[#2DD48F]"
        />
        <ExamLink
          href={{
            pathname: "/exam",
            query: { url },
          }}
          heading="Exam mode"
          paragraph="Put your knowledge to the test by answering a fixed number of randomly selected questions under a time
            limit."
          wrapperClassNames="from-[#F97316] to-[#FACC15]"
          headingClassNames="group-hover:from-[#F97316] group-hover:to-[#FACC15]"
        />
      </div>
    </div>
  );
};

export default Modes;
