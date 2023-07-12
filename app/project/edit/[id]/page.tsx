import React from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "~/lib/session";
import Modal from "~/components/Modal";
import ProjectForm from "~/components/ProjectForm";
import { getProjectDetails } from "~/lib/actions";
import { ProjectInterface } from "~/types";

async function EditProject({ params: { id } }: { params: { id: string } }) {
	const session = await getCurrentUser();
	if (!session) redirect("/");
	const { project } = (await getProjectDetails(id)) as {
		project: ProjectInterface;
	};
	return (
		<Modal>
			<h3 className="modal-head-text">Edit Project</h3>
			<ProjectForm type="edit" session={session} project={project} />
		</Modal>
	);
}

export default EditProject;
