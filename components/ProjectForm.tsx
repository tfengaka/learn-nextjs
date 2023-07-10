"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { categoryFilters } from "~/constants";
import { createNewProject, fetchToken } from "~/lib/actions";
import { ProjectForm, SessionInterface } from "~/types";
import Button from "./Button";
import CustomMenu from "./CustomMenu";
import FormField from "./FormField";

interface Props {
	type: string;
	session: SessionInterface;
}

function ProjectForm({ type, session }: Props) {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formState, setFormState] = useState<ProjectForm>({
		image: "",
		title: "",
		description: "",
		liveSite: "",
		github: "",
		category: "",
	});

	const handleChangePoster = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();

		const file = event.target.files?.[0];

		if (!file) return;
		if (!file.type.includes("image")) {
			return alert("Please select an image");
		}
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			const result = reader.result as string;
			handleStateChange("image", result);
		};
	};

	const handleStateChange = (key: string, value: string) => {
		setFormState((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};

	const handleFormSubmit = async (event: FormEvent) => {
		event.preventDefault();

		setIsSubmitting(true);

		const { token } = await fetchToken();
		try {
			if (type === "create") {
				await createNewProject(formState, session.user.id, token);
				router.push("/");
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleFormSubmit} className="flexStart form">
			<div className="flexStart form_image-container">
				<label htmlFor="poster" className="flexCenter form_image-label">
					{!formState.image && "Choose a poster for your project"}
				</label>
				<input
					type="file"
					id="image"
					accept="image/*"
					required={type === "create" ? true : false}
					className="form_image-input"
					onChange={handleChangePoster}
				/>
				{formState.image && (
					<Image
						src={formState.image}
						className="sm:p-10 object-contain"
						alt="Project Poster"
						fill
					/>
				)}
			</div>
			<FormField
				title="Title"
				state={formState.title}
				placeholder="flexibble"
				setState={(value) => handleStateChange("title", value)}
			/>
			<FormField
				title="Description"
				textArea
				state={formState.description}
				placeholder="Showcase and dicover remakable developer project."
				setState={(value) => handleStateChange("description", value)}
			/>
			<FormField
				type="url"
				title="Website"
				state={formState.liveSite}
				placeholder="https://flexibble.com"
				setState={(value) => handleStateChange("liveSite", value)}
			/>
			<FormField
				type="url"
				title="GitHub"
				state={formState.github}
				placeholder="https://github.com/flexibble/flex"
				setState={(value) => handleStateChange("github", value)}
			/>

			<CustomMenu
				title="Category"
				state={formState.category}
				filters={categoryFilters}
				setState={(value) => handleStateChange("category", value)}
			/>

			<div className="flexStart w-full">
				<Button
					type="submit"
					title={
						isSubmitting
							? `${type === "create" ? "Creating" : "Editting"}`
							: `${type === "create" ? "Create" : "Edit"}`
					}
					leftIcon={isSubmitting ? "" : "/plus.svg"}
					isLoading={isSubmitting}
				/>
			</div>
		</form>
	);
}

export default ProjectForm;
