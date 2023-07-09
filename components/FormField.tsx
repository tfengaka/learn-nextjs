import React from "react";

interface Props {
	type?: string;
	title: string;
	state: string;
	placeholder: string;
	textArea?: boolean;
	setState: (value: string) => void;
}

function FormField({
	type,
	title,
	state,
	placeholder,
	textArea,
	setState,
}: Props) {
	return (
		<div className="flexStart flex-col w-full gap-1">
			<label className="w-full text-gray-100 font-semibold text-sm">
				{title}
			</label>
			{textArea ? (
				<textarea
					required
					value={state}
					placeholder={placeholder}
					className="form_field-input"
					onChange={(e) => setState(e.target.value)}
				/>
			) : (
				<input
					required
					type={type || "text"}
					value={state}
					placeholder={placeholder}
					className="form_field-input"
					onChange={(e) => setState(e.target.value)}
				/>
			)}
		</div>
	);
}

export default FormField;
