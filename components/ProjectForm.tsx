"use client";
import Image from "next/image";
import { ChangeEvent, FormEvent } from "react";
import { SessionInterface } from "~/types";
import FormField from "./FormField";

interface Props {
	type: string;
	session: SessionInterface;
}

function ProjectForm({ type, session }: Props) {
	const handleChangePoster = (event: ChangeEvent<HTMLInputElement>) => {};

	const handleStateChange = (key: string, value: string) => {};

	const handleFormSubmit = (event: FormEvent) => {};

	const form = {
		image: "",
		title: "",
		description: "",
		liveSite: "",
		github: "",
	};

	return (
		<form onSubmit={handleFormSubmit} className="flexStart form">
			<div className="flexStart form_image-container">
				<label htmlFor="poster" className="flexCenter form_image-label">
					{!form.image && "Choose a poster for your project"}
				</label>
				<input
					type="file"
					id="image"
					accept="image/*"
					required={type === "create" ? true : false}
					className="form_image-input"
					onChange={handleChangePoster}
				/>
				{form.image && (
					<Image
						src={form.image}
						className="sm:p-10 object-contain"
						alt="Project Poster"
						fill
					/>
				)}
			</div>
			<FormField
				title="Title"
				state={form.title}
				placeholder="flexibble"
				setState={(value) => handleStateChange("title", value)}
			/>
			<FormField
				title="Description"
				textArea
				state={form.description}
				placeholder="Showcase and dicover remakable developer project."
				setState={(value) => handleStateChange("description", value)}
			/>
			<FormField
				type="url"
				title="Website"
				state={form.liveSite}
				placeholder="https://flexibble.com"
				setState={(value) => handleStateChange("liveSite", value)}
			/>
			<FormField
				type="url"
				title="GitHub"
				state={form.github}
				placeholder="https://github.com/flexibble/flex"
				setState={(value) => handleStateChange("github", value)}
			/>

			{/* Custom Input Category.. */}

			<div className="flexStart w-full">
				<button type="submit">Create</button>
			</div>
		</form>
	);
}

export default ProjectForm;
