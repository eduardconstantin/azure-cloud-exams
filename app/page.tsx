"use client";

import { useState } from "react";
import type { NextPage } from "next";
import NameLink from "@azure-fundamentals/components/NameLink";
import exams from "@azure-fundamentals/lib/exams.json";
import useDebounce from "@azure-fundamentals/hooks/useDebounce";

const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // 300ms debounce delay

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredExams = exams.filter((exam) =>
    exam.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
  );

  return (
    <div className="mx-auto mb-6 w-full lg:w-[70vw] 2xl:w-[45%] text-center">
      <h2 className="text-white text-5xl font-bold uppercase">Welcome!</h2>
      <p className="text-white text-lg mt-4 mb-6 px-5 leading-6">
        Select an exam from the list below.
      </p>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search exams"
        className="mb-6 px-4 py-2 border border-gray-300 rounded-md w-3/4 lg:w-1/2"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 mx-5 lg:mx-0">
        {filteredExams.map((exam) => (
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
        ))}
      </div>
    </div>
  );
};

export default Home;
