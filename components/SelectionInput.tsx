import React, { forwardRef, InputHTMLAttributes } from "react";

type Props = {
  index?: string;
  type?: "radio" | "checkbox";
  label?: string;
  isAnswer: boolean;
  showCorrectAnswer?: boolean;
  disabled?: boolean;
  checked?: boolean;
  handleChange?: (e: React.MouseEvent<HTMLInputElement>) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const SelectionInput = forwardRef<HTMLInputElement, Props>(
  function SelectionInput(
    {
      index,
      id = `option-${index}`,
      type = "radio",
      label = "Input Label",
      value,
      isAnswer = false,
      showCorrectAnswer,
      disabled = false,
      defaultChecked,
      handleChange = () => {},
      ...rest
    },
    ref,
  ) {
    return (
      <>
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          value={label}
          id={id}
          className={`peer hidden [&:checked_+_label_svg_path]:block `}
          defaultChecked={defaultChecked}
          onClick={handleChange}
          {...rest}
        />
        <label
          htmlFor={id}
          className={`m-[1px] flex cursor-pointer items-center rounded-lg border hover:bg-slate-600 p-4 text-xs sm:text-sm font-medium shadow-sm ${
            showCorrectAnswer && isAnswer
              ? defaultChecked
                ? "border-emerald-500 bg-emerald-500/25 hover:border-emerald-400 hover:bg-emerald-600/50"
                : "peer-checked:border-emerald-500 peer-checked:bg-emerald-500/50 border-emerald-500 bg-emerald-500/25 hover:border-emerald-400 hover:bg-emerald-600/50"
              : defaultChecked
              ? "border-gray-400 bg-gray-500/25 hover:border-gray-300 hover:bg-gray-600"
              : "peer-checked:border-gray-400 peer-checked:hover:border-slate-300 peer-checked:bg-gray-600 border-slate-500 bg-gray-600/25 hover:border-gray-400/75 hover:bg-gray-600/75"
          }`}
        >
          <svg
            className={`border rounded-full absolute h-5 w-5 p-0.5 ${
              showCorrectAnswer && isAnswer
                ? "text-emerald-500 border-emerald-600"
                : "text-gray-200 border-slate-500"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path
              className={`${defaultChecked ? "block" : "hidden"}`}
              fillRule="evenodd"
              d={
                type === "radio"
                  ? "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
                  : "M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
              }
              clipRule="evenodd"
            />
          </svg>

          <span className="text-gray-200 pl-7 break-words inline-block w-full">
            {label}
          </span>
        </label>
      </>
    );
  },
);

export default SelectionInput;
