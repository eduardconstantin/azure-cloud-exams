import React, { forwardRef, InputHTMLAttributes } from "react";

type Props = {
  index?: number;
  type?: "radio" | "checkbox";
  label?: string;
  isAnswer: boolean;
  showCorrectAnswer?: boolean;
  isDisabled?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const SelectionInput = forwardRef<HTMLInputElement, Props>(function SelectionInput(
  {
    index,
    id = `option-${index}`,
    type = "radio",
    label = "Input Label",
    value,
    isAnswer = false,
    showCorrectAnswer = false,
    isDisabled = false,
    ...rest
  },
  ref
) {
  return (
    <>
      <input
        ref={ref}
        type={type}
        disabled={isDisabled}
        value={value}
        id={id}
        className="peer hidden [&:checked_+_label_svg]:block"
        {...rest}
      />
      <label
        htmlFor={id}
        className={`flex cursor-pointer items-center rounded-lg border p-4 text-xs sm:text-sm font-medium shadow-sm ${
          showCorrectAnswer && isAnswer
            ? "border-emerald-500 dark:hover:border-emerald-400 bg-emerald-500/25 peer-checked:border-emerald-500 peer-checked:bg-emerald-500/50"
            : "hover:border-gray-500 border-gray-600 bg-gray-600/25 peer-checked:border-gray-400 peer-checked:bg-gray-500/50 peer-checked:hover:border-gray-300"
        }`}
      >
        <svg
          className={`hidden absolute h-5 w-5 ${showCorrectAnswer && isAnswer ? "text-emerald-500" : "text-gray-200"}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-gray-200 pl-7 break-words inline-block w-full">{label}</span>
      </label>
    </>
  );
});

export default SelectionInput;
