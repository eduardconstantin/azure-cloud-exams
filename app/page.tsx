import type { NextPage } from "next";
import NameLink from "@azure-fundamentals/components/NameLink";
import exams from "@azure-fundamentals/lib/exams.json";

const Home: NextPage = () => {
  return (
    <div className="mx-auto mb-6 w-full lg:w-[70vw] 2xl:w-[45%] text-center">
      <h2 className="text-white text-5xl text-leading font-bold uppercase md:mt-14">
        Welcome!
      </h2>
      <p className="text-white text-lg mt-4 mb-14 px-5 leading-6">
        Select a Microsoft Azure exam from the list bellow.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 mx-5 lg:mx-0">
        {exams.map((exam) => {
          return (
            <NameLink
              key={exam.name}
              href={{
                pathname: "/modes",
                query: { url: exam.url, name: exam.name },
              }}
              heading={exam.name}
              paragraph={exam.subtitle}
              wrapperClassNames="hover:bg-[#C7D2E2]"
              headingClassNames="group-hover:from-[#fff] group-hover:to-[#fff]"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
