import React, { forwardRef, InputHTMLAttributes } from "react";

type Props = {
  index?: string;
  type?: "radio" | "checkbox";
  label?: string;
  isAnswer: boolean;
  showCorrectAnswer?: boolean;
  disabled?: boolean;
  checked?: boolean;
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
            className={`border ${type==="checkbox"?"rounded":"rounded-full"} absolute h-5 w-5 p-0.5 ${
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
              d="M 2 0 a 2 2 0 0 0 -2 2 v 12 a 2 2 0 0 0 2 2 h 12 a 2 2 0 0 0 2 -2 V 2 a 2 2 0 0 0 -2 -2 H 2 z z"
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
