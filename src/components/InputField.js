import React from "react";
import { DebounceInput } from "react-debounce-input";
import ValidIcon from "../assets/done.png";

import WarningIcon from "../assets/error.png";

function InputField({
	label,
	placeholder,
	valid,
	value,
	setValue,
	className,
	multiline,
	maxLength,
	disabled,
	loading,
}) {
	return (
		<div className={`${loading ? "animate-pulse" : ""} ${className}`}>
			<label
				className="block text-green-400 phone:text-caption-3 screen:text-caption-3 screen:leading-caption-2 desktop:text-caption-3 twok:text-caption-2 desktop:font-semibold twok:font-bold mb-2"
				for={label}
			>
				{label} *
			</label>
			<div className="relative">
				{multiline ? (
					<DebounceInput
						disabled={disabled}
						className={`${
							value && valid && "shadow-input-validated"
						} appearance-none text-caption-4 desktop:text-caption-2   ${
							loading
								? "ring-2 ring-success-color-400"
								: value && valid
								? "ring-2 ring-success-color-400"
								: "ring-2 ring-warning-color-400"
						} ${
							!disabled
								? ""
								: "pointer-events-none opacity-50 z-10 cursor-not-allowed"
						} focus:border-transparent rounded-md tablet:rounded-lg screen:h-24 desktop:h-30 twok:h-36 w-full py-4 px-3 pr-6 text-white bg-dark-300 focus:outline-none focus:shadow-outline text-caption-4 leading-caption-4 screen:text-caption-2 screen:leading-caption-2 desktop:text-paragraph-1 desktop:leading-paragraph-1 resize-none`}
						id={label}
						type="text"
						value={
							placeholder === "Contract Address" ? value : loading ? "" : value
						}
						onChange={(e) => setValue(e.target.value)}
						placeholder={placeholder}
						element="textarea"
					/>
				) : (
					<DebounceInput
						className={`${
							value && valid && "shadow-input-validated"
						} appearance-none text-caption-3 desktop:text-caption-2  ${
							loading
								? "ring-2 ring-success-color-400"
								: value && valid
								? "ring-2 ring-success-color-400"
								: "ring-2 ring-warning-color-400"
						} ${
							!disabled
								? ""
								: "pointer-events-none opacity-50 z-10 cursor-not-allowed"
						} focus:border-transparent rounded-lg w-full phone:px-4 phone:py-3.5 screen:py-2 screen:px-3 text-white bg-dark-300 screen:h-12 desktop:h-12 twok:h-14 focus:outline-none focus:shadow-outline text-caption-4 leading-caption-4 screen:text-caption-2 screen:leading-caption-2 desktop:text-paragraph-1 desktop:leading-paragraph-1`}
						id={label}
						type="text"
						value={
							placeholder === "Contract Address" ? value : loading ? "" : value
						}
						onChange={(e) => setValue(e.target.value)}
						placeholder={placeholder}
						maxLength={`${maxLength ? 42 : ""}`}
					/>
				)}
				{value && !loading && (
					<img
						alt="status"
						src={valid ? ValidIcon : WarningIcon}
						className="w-4 bg-dark-300 tablet:w-5 desktop:w-6  pointer-events-none absolute top-1/2 transform -translate-y-1/2 right-3"
					/>
				)}
			</div>
		</div>
	);
}

export default InputField;
